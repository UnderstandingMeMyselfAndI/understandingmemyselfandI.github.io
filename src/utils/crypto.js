// src/utils/crypto.js
// Web Crypto helpers: PBKDF2 key derivation + AES-GCM JSON encryption.

const encoder = new TextEncoder()
const decoder = new TextDecoder()

export const PBKDF2_ITERATIONS = 310000
export const SALT_BYTES = 16
export const IV_BYTES = 12
export const CIPHER_VERSION = 1

function cryptoAvailable() {
  return (
    typeof crypto !== 'undefined' &&
    typeof crypto.subtle !== 'undefined' &&
    typeof crypto.getRandomValues === 'function'
  )
}

function randomBytes(length) {
  const bytes = new Uint8Array(length)
  crypto.getRandomValues(bytes)
  return bytes
}

function bytesToBase64(bytes) {
  let binary = ''
  const chunkSize = 0x8000
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunkSize))
  }
  return btoa(binary)
}

function base64ToBytes(base64) {
  const binary = atob(base64)
  const out = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i += 1) out[i] = binary.charCodeAt(i)
  return out
}

async function deriveKey(passcode, salt, iterations = PBKDF2_ITERATIONS) {
  const baseKey = await crypto.subtle.importKey('raw', encoder.encode(passcode), 'PBKDF2', false, ['deriveKey'])

  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

async function encryptJson(key, value) {
  const iv = randomBytes(IV_BYTES)
  const plaintext = encoder.encode(JSON.stringify(value))
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext)
  return {
    v: CIPHER_VERSION,
    iv: bytesToBase64(iv),
    ct: bytesToBase64(new Uint8Array(ciphertext)),
  }
}

async function decryptJson(key, blob) {
  if (!blob || blob.v !== CIPHER_VERSION || typeof blob.iv !== 'string' || typeof blob.ct !== 'string') {
    throw new Error('Unsupported or corrupt ciphertext')
  }
  const iv = base64ToBytes(blob.iv)
  const ciphertext = base64ToBytes(blob.ct)
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ciphertext)
  return JSON.parse(decoder.decode(plaintext))
}

// --- Passcode verifier ---------------------------------------------------
const VERIFIER_PLAINTEXT = 'ummi-vault-check-v1'

async function makeVerifier(key) {
  return encryptJson(key, VERIFIER_PLAINTEXT)
}

async function checkVerifier(key, blob) {
  try {
    const value = await decryptJson(key, blob)
    return value === VERIFIER_PLAINTEXT
  } catch {
    return false
  }
}
export {
  checkVerifier,
  makeVerifier,
  decryptJson,
  encryptJson,
  deriveKey,
  bytesToBase64,
  base64ToBytes,
  randomBytes,
  cryptoAvailable,
}
