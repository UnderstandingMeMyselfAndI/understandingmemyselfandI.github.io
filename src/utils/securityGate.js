// src/utils/securityGate.js
// Passcode + biometric lifecycle via keystore-kit.
// PIN and biometric are independent slots; both may be usable at once.
// When neither is configured, the existing device-key fallback applies.

import { Keystore, browserStorage, browserWebAuthn } from 'keystore-kit'

export const MIN_PASSCODE_LENGTH = 6
export const MAX_PASSCODE_LENGTH = 12

// 32-byte app-constant PRF salt. Must never change for a given app.
const APP_PRF_SALT = new Uint8Array([
  0x55, 0x4d, 0x4d, 0x49, 0x2d, 0x73, 0x6d, 0x61, 0x6c, 0x6c, 0x2d, 0x77, 0x69, 0x6e, 0x73, 0x2d, 0x70, 0x72, 0x66,
  0x2d, 0x73, 0x61, 0x6c, 0x74, 0x2d, 0x76, 0x31, 0x2d, 0x30, 0x30, 0x30, 0x31,
])

const BIOMETRIC_FLAG = 'ummi.biometric.enabled'
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

// --- dry-run -------------------------------------------------------------

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
  keystoreInstance = null
}

function prefix() {
  return dryRun ? 'ummi.dryrun.' : 'ummi.'
}

// --- keystore ------------------------------------------------------------

let keystoreInstance = null

function getKeystore() {
  if (keystoreInstance) return keystoreInstance

  const config = {
    rpId: typeof location !== 'undefined' ? location.hostname : 'localhost',
    rpName: 'UMMI',
    prfSalt: APP_PRF_SALT,
    namespace: dryRun ? 'ummi-dryrun' : 'ummi',
  }

  let webauthn
  try {
    webauthn = browserWebAuthn()
  } catch {
    webauthn = undefined
  }

  keystoreInstance = new Keystore(browserStorage(), config, webauthn)
  return keystoreInstance
}

// --- biometric flag ------------------------------------------------------

function hasBiometricFlag() {
  return readRaw(BIOMETRIC_FLAG) === 'true'
}

function setBiometricFlag(value) {
  if (value) writeRaw(BIOMETRIC_FLAG, 'true')
  else removeRaw(BIOMETRIC_FLAG)
}

function clearBiometricFlag() {
  setBiometricFlag(false)
}

// --- in-memory key custody ----------------------------------------------

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
  if (!hasPasscode()) return
  activeKey = null
  notify()
}

export function getActiveKey() {
  if (!activeKey) {
    const err = new Error('Vault is locked')
    err.code = 'LOCKED'
    throw err
  }
  return activeKey
}

// --- secret ↔ CryptoKey -------------------------------------------------

async function importSecretAsKey(secretHex) {
  const bytes = new Uint8Array(secretHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
  return crypto.subtle.importKey('raw', bytes, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
}

// --- device key (no-security fallback) ----------------------------------

async function importRawAesKey(bytes) {
  return crypto.subtle.importKey('raw', bytes, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
}

async function getOrCreateDeviceKey() {
  const raw = readRaw(`${prefix()}security.deviceKey`)
  if (raw) {
    try {
      return await importRawAesKey(base64ToBytes(raw))
    } catch {
      /* regenerate */
    }
  }
  const bytes = crypto.getRandomValues(new Uint8Array(DEVICE_KEY_BYTES))
  writeRaw(`${prefix()}security.deviceKey`, bytesToBase64(bytes))
  return importRawAesKey(bytes)
}

function bytesToBase64(bytes) {
  let binary = ''
  const chunk = 0x8000
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk))
  }
  return btoa(binary)
}

function base64ToBytes(base64) {
  const binary = atob(base64)
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i)
  return out
}

// --- lifecycle -----------------------------------------------------------

export function hasPasscode() {
  return getKeystore().isSetUp()
}

export async function ensureKey() {
  if (activeKey) return activeKey

  const ks = getKeystore()
  if (ks.isSetUp()) {
    const err = new Error('Vault requires unlock')
    err.code = 'LOCKED'
    throw err
  }

  activeKey = await getOrCreateDeviceKey()
  notify()
  return activeKey
}

// --- PIN -----------------------------------------------------------------

export async function createPasscode(passcode) {
  if (passcode.length < MIN_PASSCODE_LENGTH) {
    throw new Error(`Passcode must be at least ${MIN_PASSCODE_LENGTH} digits.`)
  }
  if (!/^\d+$/.test(passcode)) {
    throw new Error('Passcode must be digits only.')
  }

  const ks = getKeystore()
  const wasUnprotected = !ks.isSetUp()
  const oldKey = wasUnprotected ? await getOrCreateDeviceKey() : null

  const secret = ks.generateSecret()
  const newKey = await importSecretAsKey(secret)

  if (oldKey) {
    const { reencryptAll } = await import('./smallWinsStorage')
    await reencryptAll(oldKey, newKey)
  }

  await ks.setupPIN(passcode, secret)
  activeKey = newKey
  notify()
  return true
}

export async function unlock(passcode) {
  const ks = getKeystore()
  const secret = await ks.unlockPIN(passcode)
  if (!secret) return false

  activeKey = await importSecretAsKey(secret)
  notify()
  return true
}

export async function verifyPasscode(passcode) {
  const ks = getKeystore()
  const secret = await ks.unlockPIN(passcode)
  return secret !== null
}

export async function changePasscode(currentPasscode, newPasscode) {
  if (newPasscode.length < MIN_PASSCODE_LENGTH) {
    throw new Error(`New passcode must be at least ${MIN_PASSCODE_LENGTH} digits.`)
  }
  if (!/^\d+$/.test(newPasscode)) {
    throw new Error('New passcode must be digits only.')
  }

  const ks = getKeystore()
  const ok = await ks.changePIN(currentPasscode, newPasscode)
  if (!ok) throw new Error('Current passcode is incorrect.')
  return true
}

export async function disablePasscode(currentPasscode) {
  const ks = getKeystore()
  const secret = await ks.unlockPIN(currentPasscode)
  if (!secret) throw new Error('Current passcode is incorrect.')

  const oldKey = await importSecretAsKey(secret)
  const deviceKey = await getOrCreateDeviceKey()

  const { reencryptAll } = await import('./smallWinsStorage')
  await reencryptAll(oldKey, deviceKey)

  await ks.burn()
  clearBiometricFlag()

  activeKey = deviceKey
  notify()
  return true
}

export async function resetPasscode() {
  const ks = getKeystore()
  const { deleteAllData, resetDbConnection } = await import('./smallWinsStorage')

  await deleteAllData()
  resetDbConnection()
  await ks.burn()
  clearBiometricFlag()

  activeKey = null
  notify()
  return true
}

// --- biometric -----------------------------------------------------------

export async function isBiometricAvailable() {
  try {
    return await getKeystore().isBiometricAvailable()
  } catch {
    return false
  }
}

export function isBiometricEnabled() {
  return hasBiometricFlag()
}

export async function enableBiometric(passcode) {
  const ks = getKeystore()
  const secret = await ks.unlockPIN(passcode)
  if (!secret) throw new Error('Current passcode is incorrect.')

  const result = await ks.enableBiometric(secret)
  if (result.ok) {
    setBiometricFlag(true)
  }
  return result
}

export async function unlockWithBiometric() {
  const ks = getKeystore()
  const secret = await ks.unlockBiometric()
  if (!secret) return false

  activeKey = await importSecretAsKey(secret)
  notify()
  return true
}

export async function disableBiometric(currentPasscode) {
  const ks = getKeystore()
  const secret = await ks.unlockPIN(currentPasscode)
  if (!secret) throw new Error('Current passcode is incorrect.')

  await ks.disableBiometric(secret, currentPasscode)
  clearBiometricFlag()
  return true
}

// --- reminder ------------------------------------------------------------

const REMINDER_KEY = () => `${prefix()}security.reminderShownAt`

function sameLocalDay(a, b) {
  const da = new Date(a)
  const db = new Date(b)
  return da.getFullYear() === db.getFullYear() && da.getMonth() === db.getMonth() && da.getDate() === db.getDate()
}

export function hasPasscodeReminderBeenShownToday(now = Date.now()) {
  const last = Number(readRaw(REMINDER_KEY())) || 0
  return last > 0 && sameLocalDay(last, now)
}

export function markPasscodeReminderShown(now = Date.now()) {
  writeRaw(REMINDER_KEY(), String(now))
}

// --- misc ----------------------------------------------------------------

export function clearCredentials() {
  keystoreInstance = null
  clearBiometricFlag()
  activeKey = null
  notify()
}
