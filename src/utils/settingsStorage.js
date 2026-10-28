// Encrypted settings storage in ummi-db/settings.
// Three keys:
//   'config' — plaintext JSON of non-sensitive fields
//   'app'    — encrypted JSON of sensitive fields
//   '_meta'  — migration bookkeeping (plaintext)

import { decryptJson, encryptJson } from './crypto'
import { ensureKey, isDryRun } from './securityGate'
import { SETTINGS_STORE, promisify, withStore } from './db'
import { updateStorageUsage } from './storageQuota'

const CONFIG_KEY = 'config'
const APP_KEY = 'app'
const META_KEY = '_meta'

async function readRecord(key) {
  return withStore(SETTINGS_STORE, 'readonly', (s) => promisify(s.get(key)), {
    dryRun: isDryRun(),
  })
}

async function putRecord(record) {
  await withStore(SETTINGS_STORE, 'readwrite', (s) => promisify(s.put(record)), {
    dryRun: isDryRun(),
  })
}

async function deleteRecord(key) {
  await withStore(SETTINGS_STORE, 'readwrite', (s) => promisify(s.delete(key)), {
    dryRun: isDryRun(),
  })
}

export async function loadConfig() {
  const record = await readRecord(CONFIG_KEY)
  return record?.value ?? null
}

export async function saveConfig(config) {
  await putRecord({ key: CONFIG_KEY, value: config })
}

export async function loadApp() {
  const record = await readRecord(APP_KEY)
  if (!record) return null
  try {
    const key = await ensureKey()
    return await decryptJson(key, record.payload)
  } catch {
    return null
  }
}

export async function saveApp(app) {
  const key = await ensureKey()
  const payload = await encryptJson(key, app)
  await putRecord({ key: APP_KEY, payload })
  await updateStorageUsage()
}

export async function deleteApp() {
  await deleteRecord(APP_KEY)
  await updateStorageUsage()
}

export async function loadMeta() {
  const record = await readRecord(META_KEY)
  return record?.value ?? {}
}

export async function saveMeta(meta) {
  await putRecord({ key: META_KEY, value: meta })
}

export async function clearAllSettings() {
  await deleteRecord(CONFIG_KEY)
  await deleteRecord(APP_KEY)
  await deleteRecord(META_KEY)
  await updateStorageUsage()
}
export async function reencryptApp(oldKey, newKey) {
  const record = await readRecord(APP_KEY)
  if (!record) return false
  try {
    const plaintext = await decryptJson(oldKey, record.payload)
    const newPayload = await encryptJson(newKey, plaintext)
    await putRecord({ key: APP_KEY, payload: newPayload })
    return true
  } catch {
    // Blob was encrypted with a different key (e.g. stale after reset).
    // Delete rather than corrupt; hydrate will use defaults.
    await deleteRecord(APP_KEY)
    return false
  }
}