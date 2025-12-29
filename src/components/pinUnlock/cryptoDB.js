// cryptoDB.js
export const DB_NAME = 'recovery-db'
export const STORE = 'secure'

const enc = new TextEncoder()
const dec = new TextDecoder()

// IndexedDB Helpers
export function openDB() {
	return new Promise((resolve, reject) => {
		const req = indexedDB.open(DB_NAME, 1)
		req.onupgradeneeded = () => req.result.createObjectStore(STORE)
		req.onsuccess = () => resolve(req.result)
		req.onerror = () => reject(req.error)
	})
}

export async function dbSet(key, value) {
	const db = await openDB()
	return new Promise((resolve) => {
		const tx = db.transaction(STORE, 'readwrite')
		tx.objectStore(STORE).put(value, key)
		tx.oncomplete = resolve
	})
}

export async function dbGet(key) {
	const db = await openDB()
	return new Promise((resolve) => {
		const tx = db.transaction(STORE, 'readonly')
		const req = tx.objectStore(STORE).get(key)
		req.onsuccess = () => resolve(req.result)
	})
}

export async function dbClear() {
	const db = await openDB()
	return new Promise((resolve) => {
		const tx = db.transaction(STORE, 'readwrite')
		tx.objectStore(STORE).clear()
		tx.oncomplete = resolve
	})
}

// Crypto Helpers
export async function deriveKey(pin, salt) {
	const baseKey = await crypto.subtle.importKey('raw', enc.encode(pin), 'PBKDF2', false, ['deriveKey'])
	return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations: 150000, hash: 'SHA-256' }, baseKey, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt'])
}

export async function encryptData(key, dataObj) {
	const iv = crypto.getRandomValues(new Uint8Array(12))
	const data = enc.encode(JSON.stringify(dataObj))
	const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)
	return { iv: Array.from(iv), data: Array.from(new Uint8Array(cipher)) }
}

export async function decryptData(key, encrypted) {
	const iv = new Uint8Array(encrypted.iv)
	const data = new Uint8Array(encrypted.data)
	const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data)
	return JSON.parse(dec.decode(plain))
}
