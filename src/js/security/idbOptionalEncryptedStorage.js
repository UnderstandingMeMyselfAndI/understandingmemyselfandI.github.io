import { get, set, del } from "idb-keyval";

let cryptoKey = null;

/**
 * Set optional password key.
 * If not set, data will remain unencrypted.
 */
export async function setPasswordKey(password) {
  if (!password) {
    cryptoKey = null;
    return;
  }

  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  cryptoKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: encoder.encode("optional-salt-v1"),
      iterations: 150000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypt string if key exists
 */
async function encryptString(str) {
  if (!cryptoKey) return str;

  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    data
  );

  const buffer = new Uint8Array(encrypted);
  const combined = new Uint8Array(iv.byteLength + buffer.byteLength);
  combined.set(iv, 0);
  combined.set(buffer, iv.byteLength);

  return btoa(String.fromCharCode(...combined));
}

/**
 * Decrypt string if key exists
 */
async function decryptString(str) {
  if (!cryptoKey) return str;

  try {
    const combined = Uint8Array.from(
      atob(str),
      (c) => c.charCodeAt(0)
    );

    const iv = combined.slice(0, 12);
    const data = combined.slice(12);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      cryptoKey,
      data
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch (err) {
    console.error("Decryption failed", err);
    return null;
  }
}

/**
 * Storage adapter for Zustand persist
 */
export const idbOptionalEncryptedStorage = {
  getItem: async (name) => {
    const raw = await get(name);
    if (!raw) return null;
    return decryptString(raw);
  },

  setItem: async (name, value) => {
    const encrypted = await encryptString(value);
    await set(name, encrypted);
  },

  removeItem: async (name) => {
    await del(name);
  },
};
