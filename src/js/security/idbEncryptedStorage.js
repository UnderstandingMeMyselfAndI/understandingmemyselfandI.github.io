import { get, set, del } from 'idb-keyval'

let cryptoKey = null

/**
 * Derive AES-GCM key from user password
 */
export async function setPasswordKey(password) {
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
      salt: encoder.encode('unique-salt-v1'), // fixed salt; can enhance per user
      iterations: 150000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt'],
  )
}

/**
 * Encrypt JSON string
 */
async function encryptString(str) {
  if (!cryptoKey) throw new Error('Encryption key not set')

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

/**
 * Decrypt JSON string
 */
async function decryptString(base64) {
  if (!cryptoKey) throw new Error('Encryption key not set')

  const combined = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0))

  const iv = combined.slice(0, 12)
  const data = combined.slice(12)

  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    cryptoKey,
    data,
  )

  const decoder = new TextDecoder()
  return decoder.decode(decrypted)
}

/**
 * Storage adapter for Zustand persist
 */
export const idbEncryptedStorage = {
  getItem: async (name) => {
    const raw = await get(name)
    if (!raw) return null

    try {
      const decrypted = await decryptString(raw)
      return decrypted
    } catch (err) {
      console.error('Decryption failed:', err)
      return null
    }
  },

  setItem: async (name, value) => {
    try {
      const encrypted = await encryptString(value)
      await set(name, encrypted)
    } catch (err) {
      console.error('Encryption failed:', err)
    }
  },

  removeItem: async (name) => {
    await del(name)
  },
}
