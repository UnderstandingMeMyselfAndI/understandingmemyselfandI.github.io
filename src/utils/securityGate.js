// src/utils/securityGate.js
// Passcode lifecycle + in-memory key custody.
//
// Two key sources:
//   1. Passcode-derived key (PBKDF2 + salt) — used when a passcode is set.
//   2. Device key (random 32 bytes, base64 in localStorage) — used when no
//      passcode is set. Data is still encrypted; it is not protected against
//      anyone with access to this device's storage.

import {
  PBKDF2_ITERATIONS,
  SALT_BYTES,
  base64ToBytes,
  bytesToBase64,
  checkVerifier,
  deriveKey,
  makeVerifier,
  randomBytes,
} from './crypto'

export const MIN_PASSCODE_LENGTH = 6
export const MAX_PASSCODE_LENGTH = 12

const DEVICE_KEY_BYTES = 32

const memoryFallback = new Map()

function readRaw(key) {
  try {
    const value = localStorage.getItem(key)
    return value === null ? (memoryFallback.get(key) ?? null) : value
  } catch {
    return memoryFallback.get(key) ?? null
  }
}

function writeRaw(key, value) {
  memoryFallback.set(key, value)
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

function removeRaw(key) {
  memoryFallback.delete(key)
  try {
    localStorage.removeItem(key)
  } catch {
    /* ignore */
  }
}

let dryRun = false

export function initDryRunFromLocation() {
  try {
    const params = new URLSearchParams(window.location.search)
    dryRun = params.get('dryRun') === 'true'
  } catch {
    dryRun = false
  }
  return dryRun
}

export function isDryRun() {
  return dryRun
}
export function setDryRun(value) {
  dryRun = !!value
  activeKey = null
}

function prefix() {
  return dryRun ? 'ummi.dryrun.' : 'ummi.'
}

const KEYS = {
  salt: () => `${prefix()}security.salt`,
  verifier: () => `${prefix()}security.verifier`,
  iterations: () => `${prefix()}security.iterations`,
  reminder: () => `${prefix()}security.reminderShownAt`,
  deviceKey: () => `${prefix()}security.deviceKey`,
}

let activeKey = null
const subscribers = new Set()

function notify() {
  subscribers.forEach((fn) => {
    try {
      fn({ unlocked: activeKey !== null, hasPasscode: hasPasscode() })
    } catch {
      /* ignore */
    }
  })
}

export function subscribeLockState(fn) {
  subscribers.add(fn)
  return () => subscribers.delete(fn)
}

export function isUnlocked() {
  return activeKey !== null
}

export function lock() {
  if (!hasPasscode()) return // nothing to lock with
  activeKey = null
  notify()
}

// --- credentials --------------------------------------------------------

export function hasPasscode() {
  return Boolean(readRaw(KEYS.salt()) && readRaw(KEYS.verifier()))
}

export function getStoredIterations() {
  return Number(readRaw(KEYS.iterations())) || PBKDF2_ITERATIONS
}

// --- device key ---------------------------------------------------------

async function importRawAesKey(bytes) {
  return crypto.subtle.importKey('raw', bytes, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
}

async function getOrCreateDeviceKey() {
  const raw = readRaw(KEYS.deviceKey())
  if (raw) {
    try {
      return await importRawAesKey(base64ToBytes(raw))
    } catch {
      /* fall through and regenerate */
    }
  }
  const bytes = randomBytes(DEVICE_KEY_BYTES)
  writeRaw(KEYS.deviceKey(), bytesToBase64(bytes))
  return importRawAesKey(bytes)
}

/**
 * Return the active key, deriving one from the device when no passcode is set.
 * Storage layers call this instead of getActiveKey() so the same code path
 * works in both protected and unprotected mode.
 */
export async function ensureKey() {
  if (activeKey) return activeKey
  if (hasPasscode()) {
    const err = new Error('Vault requires passcode')
    err.code = 'LOCKED'
    throw err
  }
  activeKey = await getOrCreateDeviceKey()
  notify()
  return activeKey
}

// --- passcode lifecycle -------------------------------------------------

async function deriveFromStored(passcode) {
  const saltB64 = readRaw(KEYS.salt())
  if (!saltB64) return null
  return deriveKey(passcode, base64ToBytes(saltB64), getStoredIterations())
}

export async function verifyPasscode(passcode) {
  const verifierRaw = readRaw(KEYS.verifier())
  if (!verifierRaw) return false
  const key = await deriveFromStored(passcode)
  if (!key) return false
  return checkVerifier(key, JSON.parse(verifierRaw))
}

export async function unlock(passcode) {
  const verifierRaw = readRaw(KEYS.verifier())
  if (!verifierRaw) return false
  const key = await deriveFromStored(passcode)
  if (!key) return false
  const ok = await checkVerifier(key, JSON.parse(verifierRaw))
  if (ok) {
    activeKey = key
    notify()
  }
  return ok
}

/**
 * Enable or replace the passcode.
 *
 * When there is existing data encrypted under the device key, it is
 * re-encrypted with the new passcode key. If re-encryption fails, we abort
 * before writing credentials, so the previous state is preserved.
 */
export async function createPasscode(passcode) {
  const trimmed = String(passcode || '')
  if (trimmed.length < MIN_PASSCODE_LENGTH) {
    throw new Error(`Passcode must be at least ${MIN_PASSCODE_LENGTH} digits.`)
  }
  if (trimmed.length > MAX_PASSCODE_LENGTH) {
    throw new Error(`Passcode must be at most ${MAX_PASSCODE_LENGTH} digits.`)
  }
  if (!/^\d+$/.test(trimmed)) {
    throw new Error('Passcode must be digits only.')
  }

  const wasUnprotected = !hasPasscode()
  const oldKey = wasUnprotected ? await getOrCreateDeviceKey() : null

  const salt = randomBytes(SALT_BYTES)
  const iterations = PBKDF2_ITERATIONS
  const newKey = await deriveKey(trimmed, salt, iterations)

  if (oldKey) {
    const { reencryptAll } = await import('./smallWinsStorage')
    await reencryptAll(oldKey, newKey)
  }

  writeRaw(KEYS.salt(), bytesToBase64(salt))
  writeRaw(KEYS.iterations(), String(iterations))
  writeRaw(KEYS.verifier(), JSON.stringify(await makeVerifier(newKey)))

  activeKey = newKey
  notify()
  return true
}

export async function changePasscode(currentPasscode, newPasscode) {
  const trimmedNew = String(newPasscode || '')
  if (trimmedNew.length < MIN_PASSCODE_LENGTH) {
    throw new Error(`New passcode must be at least ${MIN_PASSCODE_LENGTH} digits.`)
  }
  if (!/^\d+$/.test(trimmedNew)) {
    throw new Error('New passcode must be digits only.')
  }

  const oldKey = await deriveFromStored(currentPasscode)
  if (!oldKey) throw new Error('Vault is not initialised.')

  const verifierRaw = readRaw(KEYS.verifier())
  const ok = await checkVerifier(oldKey, JSON.parse(verifierRaw))
  if (!ok) throw new Error('Current passcode is incorrect.')

  const salt = randomBytes(SALT_BYTES)
  const iterations = PBKDF2_ITERATIONS
  const newKey = await deriveKey(trimmedNew, salt, iterations)

  const { reencryptAll } = await import('./smallWinsStorage')
  await reencryptAll(oldKey, newKey)

  writeRaw(KEYS.salt(), bytesToBase64(salt))
  writeRaw(KEYS.iterations(), String(iterations))
  writeRaw(KEYS.verifier(), JSON.stringify(await makeVerifier(newKey)))

  activeKey = newKey
  notify()
  return true
}

/**
 * Remove the passcode and re-encrypt existing data with the device key.
 * Requires the current passcode so someone who finds an unlocked device
 * cannot silently downgrade protection.
 */
export async function disablePasscode(currentPasscode) {
  if (!hasPasscode()) return true

  const oldKey = await deriveFromStored(currentPasscode)
  if (!oldKey) throw new Error('Vault is not initialised.')

  const verifierRaw = readRaw(KEYS.verifier())
  const ok = await checkVerifier(oldKey, JSON.parse(verifierRaw))
  if (!ok) throw new Error('Current passcode is incorrect.')

  const deviceKey = await getOrCreateDeviceKey()

  const { reencryptAll } = await import('./smallWinsStorage')
  await reencryptAll(oldKey, deviceKey)

  removeRaw(KEYS.salt())
  removeRaw(KEYS.verifier())
  removeRaw(KEYS.iterations())

  activeKey = deviceKey
  notify()
  return true
}

/**
 * Wipe all encrypted data and clear the passcode. Data is unrecoverable.
 */
export async function resetPasscode() {
  const { deleteAllData, resetDbConnection } = await import('./smallWinsStorage')
  await deleteAllData()
  resetDbConnection()

  removeRaw(KEYS.salt())
  removeRaw(KEYS.verifier())
  removeRaw(KEYS.iterations())

  activeKey = null
  notify()
  return true
}

// --- daily reminder -----------------------------------------------------

function isSameLocalDay(a, b) {
  const da = new Date(a)
  const db = new Date(b)
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate()
}
// --- passcode-set reminder (once per calendar day) ----------------------

function sameLocalDay(a, b) {
  const da = new Date(a)
  const db = new Date(b)
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate()
}

export function hasPasscodeReminderBeenShownToday(now = Date.now()) {
  const last = Number(readRaw(KEYS.reminder())) || 0
  return last > 0 && sameLocalDay(last, now)
}

export function markPasscodeReminderShown(now = Date.now()) {
  writeRaw(KEYS.reminder(), String(now))
}

export function clearCredentials() {
  removeRaw(KEYS.salt())
  removeRaw(KEYS.verifier())
  removeRaw(KEYS.iterations())
  activeKey = null
  notify()
}
