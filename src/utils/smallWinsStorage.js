// src/utils/smallWinsStorage.js
// IndexedDB CRUD + encryption for the two Small Wins stores.

import { decryptJson, encryptJson } from './crypto'
import { ensureKey, isDryRun } from './securityGate'
import { updateStorageUsage } from './storageQuota'
import { todayIso } from './formatSmallWinDate'
import { LIMITS } from '@data/smallWinsData.js'
export const ENTRIES_STORE = 'smallWinsEntries'
export const PEOPLE_STORE = 'smallWinsPeople'

const SCHEMA_VERSION = 1
const BASE_DB_NAME = 'ummi-db'

function dbName() {
  return isDryRun() ? `${BASE_DB_NAME}-dryrun` : BASE_DB_NAME
}

let dbPromise = null

function createMissingStores(db) {
  if (!db.objectStoreNames.contains(ENTRIES_STORE)) {
    const store = db.createObjectStore(ENTRIES_STORE, { keyPath: 'id' })
    store.createIndex('by-date', 'date', { unique: false })
    store.createIndex('by-created', 'createdAt', { unique: false })
    store.createIndex('by-modified', 'modifiedAt', { unique: false })
  }
  if (!db.objectStoreNames.contains(PEOPLE_STORE)) {
    db.createObjectStore(PEOPLE_STORE, { keyPath: 'id' })
  }
}

export function openDb() {
  if (dbPromise) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available in this browser.'))
      return
    }

    const first = indexedDB.open(dbName())
    first.onupgradeneeded = () => createMissingStores(first.result)
    first.onerror = () => reject(first.error)
    first.onsuccess = () => {
      const db = first.result
      const complete = db.objectStoreNames.contains(ENTRIES_STORE) && db.objectStoreNames.contains(PEOPLE_STORE)
      if (complete) {
        resolve(db)
        return
      }

      const nextVersion = db.version + 1
      db.close()

      const second = indexedDB.open(dbName(), nextVersion)
      second.onupgradeneeded = () => createMissingStores(second.result)
      second.onerror = () => reject(second.error)
      second.onsuccess = () => resolve(second.result)
    }
  }).catch((err) => {
    dbPromise = null
    throw err
  })

  return dbPromise
}

export function resetDbConnection() {
  dbPromise = null
}

function promisify(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function withStore(storeName, mode, fn) {
  return openDb().then(
    (db) =>
      new Promise((resolve, reject) => {
        let tx
        try {
          tx = db.transaction(storeName, mode)
        } catch (err) {
          reject(err)
          return
        }

        const store = tx.objectStore(storeName)
        let result

        tx.oncomplete = () => resolve(result)
        tx.onerror = () => reject(tx.error)
        tx.onabort = () => reject(tx.error || new Error('Transaction aborted'))

        try {
          result = fn(store)
        } catch (err) {
          reject(err)
        }
      }),
  )
}

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
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.put(record)))
  await updateStorageUsage()
  return entry
}

export async function saveEntry(entry) {
  const key = await ensureKey()
  const updated = { ...entry, modifiedAt: Date.now(), version: SCHEMA_VERSION }
  const record = await sealEntry(updated, key)
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.put(record)))
  await updateStorageUsage()
  return updated
}

export async function getEntry(id) {
  const key = await ensureKey()
  const record = await withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.get(id)))
  if (!record) return null
  try {
    return await openEntry(record, key)
  } catch {
    return null
  }
}

export async function listEntries() {
  const key = await ensureKey()
  const records = await withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.getAll()))
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
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.delete(id)))
  await updateStorageUsage()
  return true
}

export async function countEntries() {
  return withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.count()))
}

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
  await withStore(PEOPLE_STORE, 'readwrite', (store) => promisify(store.put(record)))
  return person
}

export async function listPeople() {
  const key = await ensureKey()
  const records = await withStore(PEOPLE_STORE, 'readonly', (store) => promisify(store.getAll()))
  const people = []
  for (const record of records) {
    try {
      people.push(await decryptJson(key, record.payload))
    } catch {
      /* skip */
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
  const records = await withStore(PEOPLE_STORE, 'readonly', (store) => promisify(store.getAll()))

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

  // Store is at capacity: existing people can still be reused (handled
  // above), but we won't create any new ones. The caller may still attach
  // this name to a win entry; it just won't become a suggestion going forward.
  if (records.length >= LIMITS.peopleMax) return null

  const now = Date.now()
  return putPerson({ id: makeId(), name: display, createdAt: now, lastUsedAt: now }, key)
}

export async function deletePerson(id) {
  await withStore(PEOPLE_STORE, 'readwrite', (store) => promisify(store.delete(id)))
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

export async function reencryptAll(oldKey, newKey) {
  const entryRecords = await withStore(ENTRIES_STORE, 'readonly', (store) => promisify(store.getAll()))
  const peopleRecords = await withStore(PEOPLE_STORE, 'readonly', (store) => promisify(store.getAll()))

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

  await withStore(ENTRIES_STORE, 'readwrite', (store) => {
    nextEntries.forEach((r) => store.put(r))
    return null
  })
  await withStore(PEOPLE_STORE, 'readwrite', (store) => {
    nextPeople.forEach((r) => store.put(r))
    return null
  })
}

export async function exportAll() {
  const [entries, people] = await Promise.all([listEntries(), listPeople()])
  return { exportedAt: Date.now(), version: SCHEMA_VERSION, entries, people }
}

export async function deleteAllData() {
  await withStore(ENTRIES_STORE, 'readwrite', (store) => promisify(store.clear()))
  await withStore(PEOPLE_STORE, 'readwrite', (store) => promisify(store.clear()))
  await updateStorageUsage()
}
