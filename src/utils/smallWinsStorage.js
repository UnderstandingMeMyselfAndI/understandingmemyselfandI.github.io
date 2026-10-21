// src/utils/smallWinsStorage.js
// IndexedDB CRUD + encryption for the two Small Wins stores.
// Plumbing (openDb, withStore, schema) lives in ./db.js.

import { decryptJson, encryptJson } from './crypto'
import { ensureKey, isDryRun } from './securityGate'
import { updateStorageUsage } from './storageQuota'
import { todayIso } from './formatSmallWinDate'
import { LIMITS } from '@data/dataSmallWins.js'
import { ENTRIES_STORE, PEOPLE_STORE, openDb, resetDbConnection, promisify, withStore } from './db'

// Re-export so callers that historically imported these from here keep working.
export { ENTRIES_STORE, PEOPLE_STORE, openDb, resetDbConnection }

const SCHEMA_VERSION = 1

export function makeId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function normaliseName(name) {
  return String(name || '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function nameKey(name) {
  return normaliseName(name).toLowerCase()
}

function entryPayload(entry) {
  return {
    title: entry.title ?? '',
    description: entry.description ?? '',
    whoWith: Array.isArray(entry.whoWith) ? entry.whoWith : [],
    date: entry.date,
  }
}

async function sealEntry(entry, key) {
  return {
    id: entry.id,
    date: entry.date,
    createdAt: entry.createdAt,
    modifiedAt: entry.modifiedAt,
    version: SCHEMA_VERSION,
    payload: await encryptJson(key, entryPayload(entry)),
  }
}

async function openEntry(record, key) {
  const payload = await decryptJson(key, record.payload)
  return {
    id: record.id,
    title: payload.title || '',
    description: payload.description || '',
    whoWith: Array.isArray(payload.whoWith) ? payload.whoWith : [],
    date: payload.date || record.date,
    createdAt: record.createdAt,
    modifiedAt: record.modifiedAt,
    version: record.version ?? SCHEMA_VERSION,
  }
}

function byDateDesc(a, b) {
  if (a.date !== b.date) return a.date < b.date ? 1 : -1
  return (b.modifiedAt || 0) - (a.modifiedAt || 0)
}

// --- entries --------------------------------------------------------------

export async function createEntry({ date } = {}) {
  const key = await ensureKey()
  const now = Date.now()

  const entry = {
    id: makeId(),
    title: '',
    description: '',
    whoWith: [],
    date: date || todayIso(),
    createdAt: now,
    modifiedAt: now,
    version: SCHEMA_VERSION,
  }

  const record = await sealEntry(entry, key)
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.put(record)), {
    dryRun: isDryRun(),
  })
  await updateStorageUsage()
  return entry
}

export async function saveEntry(entry) {
  const key = await ensureKey()
  const updated = { ...entry, modifiedAt: Date.now(), version: SCHEMA_VERSION }
  const record = await sealEntry(updated, key)
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.put(record)), {
    dryRun: isDryRun(),
  })
  await updateStorageUsage()
  return updated
}

export async function getEntry(id) {
  const key = await ensureKey()
  const record = await withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.get(id)), { dryRun: isDryRun() })
  if (!record) return null
  try {
    return await openEntry(record, key)
  } catch {
    return null
  }
}

export async function listEntries() {
  const key = await ensureKey()
  const records = await withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.getAll()), {
    dryRun: isDryRun(),
  })
  const entries = []
  for (const record of records) {
    try {
      entries.push(await openEntry(record, key))
    } catch {
      /* skip undecryptable rows */
    }
  }
  entries.sort(byDateDesc)
  return entries
}

export async function deleteEntry(id) {
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.delete(id)), {
    dryRun: isDryRun(),
  })
  await updateStorageUsage()
  return true
}

export async function countEntries() {
  return withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.count()), { dryRun: isDryRun() })
}

// --- people ---------------------------------------------------------------

function personPayload(person) {
  return {
    id: person.id,
    name: person.name,
    createdAt: person.createdAt,
    lastUsedAt: person.lastUsedAt,
  }
}

async function putPerson(person, key) {
  const record = { id: person.id, payload: await encryptJson(key, personPayload(person)) }
  await withStore(PEOPLE_STORE, 'readwrite', (store) => promisify(store.put(record)), {
    dryRun: isDryRun(),
  })
  return person
}

export async function listPeople() {
  const key = await ensureKey()
  const records = await withStore(PEOPLE_STORE, 'readonly', (store) => promisify(store.getAll()), {
    dryRun: isDryRun(),
  })
  const people = []
  for (const record of records) {
    try {
      people.push(await decryptJson(key, record.payload))
    } catch {
      /* skip undecryptable rows */
    }
  }
  people.sort((a, b) => (b.lastUsedAt || 0) - (a.lastUsedAt || 0) || a.name.localeCompare(b.name))
  return people
}

export async function upsertPerson(rawName) {
  const display = normaliseName(rawName)
  if (!display) return null

  const key = await ensureKey()
  const target = nameKey(display)
  const records = await withStore(PEOPLE_STORE, 'readonly', (store) => promisify(store.getAll()), {
    dryRun: isDryRun(),
  })

  for (const record of records) {
    try {
      const existing = await decryptJson(key, record.payload)
      if (nameKey(existing.name) === target) {
        return putPerson({ ...existing, name: display, lastUsedAt: Date.now() }, key)
      }
    } catch {
      /* ignore corrupt row */
    }
  }

  if (records.length >= LIMITS.peopleMax) return null

  const now = Date.now()
  return putPerson({ id: makeId(), name: display, createdAt: now, lastUsedAt: now }, key)
}

export async function deletePerson(id) {
  await withStore(PEOPLE_STORE, 'readwrite', (store) => promisify(store.delete(id)), {
    dryRun: isDryRun(),
  })
  await updateStorageUsage()
  return true
}

export async function pruneUnusedPeople(entries) {
  const used = new Set()
  ;(entries || []).forEach((entry) => {
    ;(entry.whoWith || []).forEach((name) => used.add(nameKey(name)))
  })
  const people = await listPeople()
  let removed = 0
  for (const person of people) {
    if (!used.has(nameKey(person.name))) {
      await deletePerson(person.id)
      removed += 1
    }
  }
  return removed
}

// --- maintenance ----------------------------------------------------------

export async function reencryptAll(oldKey, newKey) {
  const entryRecords = await withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.getAll()), {
    dryRun: isDryRun(),
  })
  const peopleRecords = await withStore(PEOPLE_STORE, 'readonly', (store) => promisify(store.getAll()), {
    dryRun: isDryRun(),
  })

  const nextEntries = []
  for (const record of entryRecords) {
    const payload = await decryptJson(oldKey, record.payload)
    nextEntries.push({ ...record, payload: await encryptJson(newKey, payload) })
  }
  const nextPeople = []
  for (const record of peopleRecords) {
    const payload = await decryptJson(oldKey, record.payload)
    nextPeople.push({ ...record, payload: await encryptJson(newKey, payload) })
  }

  await withStore(
    ENTRIES_STORE,
    'readwrite',
    (store) => {
      nextEntries.forEach((r) => store.put(r))
      return null
    },
    { dryRun: isDryRun() },
  )
  await withStore(
    PEOPLE_STORE,
    'readwrite',
    (store) => {
      nextPeople.forEach((r) => store.put(r))
      return null
    },
    { dryRun: isDryRun() },
  )
}

export async function exportAll() {
  const [entries, people] = await Promise.all([listEntries(), listPeople()])
  return { exportedAt: Date.now(), version: SCHEMA_VERSION, entries, people }
}

export async function deleteAllData() {
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.clear()), {
    dryRun: isDryRun(),
  })
  await withStore(PEOPLE_STORE, 'readwrite', (store) => promisify(store.clear()), {
    dryRun: isDryRun(),
  })
  await updateStorageUsage()
}
