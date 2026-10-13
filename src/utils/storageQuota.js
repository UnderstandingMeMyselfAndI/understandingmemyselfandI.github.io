// src/utils/storageQuota.js
// Shared storage-quota watcher. Any feature can call updateStorageUsage()
// after a mutation and subscribe() to react to low-space conditions.

const listeners = new Set()

let lastSnapshot = null

export const LOW_THRESHOLD = 0.75
export const CRITICAL_THRESHOLD = 0.9

export function levelForRatio(ratio) {
  if (!Number.isFinite(ratio) || ratio <= 0) return 'ok'
  if (ratio >= CRITICAL_THRESHOLD) return 'critical'
  if (ratio >= LOW_THRESHOLD) return 'low'
  return 'ok'
}

export async function measureStorage() {
  if (typeof navigator === 'undefined' || !navigator.storage || !navigator.storage.estimate) {
    return { usage: 0, quota: 0, remaining: 0, ratio: 0, level: 'unknown' }
  }
  try {
    const { usage = 0, quota = 0 } = await navigator.storage.estimate()
    const remaining = Math.max(0, quota - usage)
    const ratio = quota > 0 ? usage / quota : 0
    return { usage, quota, remaining, ratio, level: levelForRatio(ratio) }
  } catch {
    return { usage: 0, quota: 0, remaining: 0, ratio: 0, level: 'unknown' }
  }
}

function emit(snapshot) {
  listeners.forEach((fn) => {
    try {
      fn(snapshot)
    } catch {
      /* a broken listener must never break a write */
    }
  })
}

export async function updateStorageUsage() {
  lastSnapshot = await measureStorage()
  emit(lastSnapshot)
  return lastSnapshot
}

export function getLastStorageSnapshot() {
  return lastSnapshot
}

export function subscribeStorage(listener) {
  listeners.add(listener)
  if (lastSnapshot) listener(lastSnapshot)
  return () => listeners.delete(listener)
}

export function storageAdvice(level) {
  if (level === 'critical') {
    return 'Storage is nearly full. Delete old wins or export and remove entries you no longer need.'
  }
  if (level === 'low') {
    return 'Storage is filling up. Consider removing unused names or older wins you no longer need.'
  }
  return ''
}

export function formatBytes(bytes) {
  if (!bytes) return '0 MB'
  const mb = bytes / (1024 * 1024)
  if (mb < 1) return `${(bytes / 1024).toFixed(0)} KB`
  if (mb < 1024) return `${mb.toFixed(1)} MB`
  return `${(mb / 1024).toFixed(2)} GB`
}
