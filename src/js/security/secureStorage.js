import { get, set, del } from 'idb-keyval'
// --- Password hint ---
export function setPasswordHint(hint) {
  // Stored in plaintext locally, only to remind user
  localStorage.setItem('password-hint', hint || '')
}

export function getPasswordHint() {
  return localStorage.getItem('password-hint') || ''
}

export function clearKeyOnLeave() {
  window.addEventListener('beforeunload', () => {
    cryptoKey = null // erase AES key from memory
  })
}

let cryptoKey = null // AES key derived from password
let passwordMemory = null // Password kept in memory for PIN unlock

// --- Password AES key ---
export async function setPasswordKey(password) {
  if (!password) return

  passwordMemory = password

  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  )

  cryptoKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('password-salt-v1'),
      iterations: 150_000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

// --- PIN storage & verification ---
export async function setPin(pin) {
  if (!passwordMemory) throw new Error('Set password first')
  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(pin),
    'PBKDF2',
    false,
    ['deriveKey'],
  )

  const pinHash = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('pin-salt-v1'),
      iterations: 100_000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )

  const raw = await crypto.subtle.exportKey('raw', pinHash)
  await set('pin-hash', btoa(String.fromCharCode(...new Uint8Array(raw))))
}

export async function verifyPin(pin) {
  const stored = await get('pin-hash')
  if (!stored) return false

  if (!passwordMemory) return false // PIN cannot derive AES key yet

  const encoder = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(pin),
    'PBKDF2',
    false,
    ['deriveKey'],
  )

  const pinHash = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: encoder.encode('pin-salt-v1'),
      iterations: 100_000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )

  const raw = await crypto.subtle.exportKey('raw', pinHash)
  const b64 = btoa(String.fromCharCode(...new Uint8Array(raw)))
  return b64 === stored
}

// --- Encrypt / decrypt JSON ---
export async function encryptJSON(obj) {
  if (!cryptoKey) throw new Error('Password key not set')
  const str = JSON.stringify(obj)
  const encoder = new TextEncoder()
  const data = encoder.encode(str)
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data,
  )
  const buffer = new Uint8Array(encrypted)
  const combined = new Uint8Array(iv.byteLength + buffer.byteLength)
  combined.set(iv, 0)
  combined.set(buffer, iv.byteLength)
  return btoa(String.fromCharCode(...combined))
}

export async function decryptJSON(b64) {
  if (!cryptoKey) throw new Error('Password key not set')
  const combined = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))
  const iv = combined.slice(0, 12)
  const data = combined.slice(12)
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data,
  )
  const decoder = new TextDecoder()
  return JSON.parse(decoder.decode(decrypted))
}

// --- Store / retrieve data ---
export async function storeData(key, obj) {
  const encrypted = cryptoKey ? await encryptJSON(obj) : JSON.stringify(obj)
  await set(key, encrypted)
}

export async function retrieveData(key) {
  const raw = await get(key)
  if (!raw) return null
  try {
    return cryptoKey ? await decryptJSON(raw) : JSON.parse(raw)
  } catch {
    return null
  }
}

// --- Export / import ---
export async function exportData(key) {
  const raw = await get(key)
  if (!raw) return null
  return raw // already encrypted if password set
}

export async function importData(key, rawData) {
  await set(key, rawData)
}
export async function deriveKey(password) {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey'],
  )
  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: enc.encode('unique-salt'),
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt'],
  )
}
