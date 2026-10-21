// Shared IndexedDB plumbing for ummi-db.
// Owns the schema; bumps version when stores are added.

export const ENTRIES_STORE = 'smallWinsEntries'
export const PEOPLE_STORE = 'smallWinsPeople'
export const SETTINGS_STORE = 'settings'

const DB_NAME = 'ummi-db'
const DRY_RUN_DB_NAME = 'ummi-db-dryrun'

let dbPromise = null
let currentName = null

function targetName(dryRun) {
  return dryRun ? DRY_RUN_DB_NAME : DB_NAME
}

export function createMissingStores(db) {
  if (!db.objectStoreNames.contains(ENTRIES_STORE)) {
    const store = db.createObjectStore(ENTRIES_STORE, { keyPath: 'id' })
    store.createIndex('by-date', 'date', { unique: false })
    store.createIndex('by-created', 'createdAt', { unique: false })
    store.createIndex('by-modified', 'modifiedAt', { unique: false })
  }
  if (!db.objectStoreNames.contains(PEOPLE_STORE)) {
    db.createObjectStore(PEOPLE_STORE, { keyPath: 'id' })
  }
  if (!db.objectStoreNames.contains(SETTINGS_STORE)) {
    db.createObjectStore(SETTINGS_STORE, { keyPath: 'key' })
  }
}

export function openDb(dryRun = false) {
  const name = targetName(dryRun)
  if (dbPromise && currentName === name) return dbPromise

  dbPromise = new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is not available in this browser.'))
      return
    }

    const first = indexedDB.open(name)
    first.onupgradeneeded = () => createMissingStores(first.result)
    first.onerror = () => reject(first.error)
    first.onsuccess = () => {
      const db = first.result
      const complete =
        db.objectStoreNames.contains(ENTRIES_STORE) &&
        db.objectStoreNames.contains(PEOPLE_STORE) &&
        db.objectStoreNames.contains(SETTINGS_STORE)
      if (complete) {
        resolve(db)
        return
      }

      const nextVersion = db.version + 1
      db.close()

      const second = indexedDB.open(name, nextVersion)
      second.onupgradeneeded = () => createMissingStores(second.result)
      second.onerror = () => reject(second.error)
      second.onsuccess = () => resolve(second.result)
    }
  }).catch((err) => {
    dbPromise = null
    currentName = null
    throw err
  })

  currentName = name
  return dbPromise
}

export function resetDbConnection() {
  dbPromise = null
  currentName = null
}

export function promisify(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export function withStore(storeName, mode, fn, { dryRun = false } = {}) {
  return openDb(dryRun).then(
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
