// Session lock: ends the vault session after the page has been hidden for
// longer than the configured timeout.
//
// Sessions start on unlock. They end on:
//   - manual lock (via lock())
//   - reset
//   - this timer firing after the page has been hidden
//
// When the session ends, PII stores are reset by the subscriber in main.jsx.
// SecurityGate instances flip back to 'locked' mode via subscribeLockState,
// so anything currently open shows the gate.

import { hasPasscode, isUnlocked, lock, subscribeLockState } from './securityGate'

const DEFAULT_TIMEOUT_MS = 2 * 60 * 1000

let timeoutMs = DEFAULT_TIMEOUT_MS
let timerId = null
let hiddenAt = 0
let unsubscribeLock = null
let initialized = false

const beforeLockCallbacks = new Set()
export function onBeforeLock(fn) {
  beforeLockCallbacks.add(fn)
  return () => beforeLockCallbacks.delete(fn)
}

async function lockIfSessionActive() {
  if (!hasPasscode() || !isUnlocked()) return
  for (const fn of beforeLockCallbacks) {
    try { await fn() } catch { /* ignore */ }
  }
  lock()
}

function scheduleLock() {
  cancelLock()
  if (!hasPasscode() || !isUnlocked()) return
  timerId = setTimeout(() => {
    timerId = null
    lockIfSessionActive()
  }, timeoutMs)
}

function cancelLock() {
  if (timerId !== null) {
    clearTimeout(timerId)
    timerId = null
  }
}

function handleBackgrounded() {
  // Already backgrounded — don't restart the clock.
  if (hiddenAt > 0) return
  hiddenAt = Date.now()
  scheduleLock()
}

function handleForegrounded() {
  cancelLock()
  if (hiddenAt === 0) return
  const elapsed = Date.now() - hiddenAt
  hiddenAt = 0

  // The timer covers the "hidden but tab is running" case. This elapsed
  // check covers the "tab was frozen/bfcached" case, where the timer was
  // paused and did not fire.
  if (elapsed > timeoutMs) {
    lockIfSessionActive()
  }
}

function handleVisibility() {
  if (document.visibilityState === 'hidden') handleBackgrounded()
  else handleForegrounded()
}

function handlePageHide() {
  handleBackgrounded()
}

function handlePageShow(event) {
  // event.persisted is true when restored from bfcache.
  if (event.persisted) handleForegrounded()
}

/**
 * Initialise the session lock. Call once at app boot, after store subscriptions.
 *
 * @param {object} [options]
 * @param {number} [options.timeoutMs] milliseconds hidden before auto-lock.
 * @returns {() => void} cleanup
 */
export function initSessionLock({ timeoutMs: customTimeout } = {}) {
  if (initialized) return () => {}
  initialized = true

  if (Number.isFinite(customTimeout) && customTimeout > 0) {
    timeoutMs = customTimeout
  }

  document.addEventListener('visibilitychange', handleVisibility)
  window.addEventListener('pagehide', handlePageHide)
  window.addEventListener('pageshow', handlePageShow)

  // If the vault is locked for any reason, cancel any pending timer.
  unsubscribeLock = subscribeLockState(({ unlocked }) => {
    if (!unlocked) {
      cancelLock()
      hiddenAt = 0
    }
  })

  if (document.visibilityState === 'hidden') handleBackgrounded()

  return () => {
    document.removeEventListener('visibilitychange', handleVisibility)
    window.removeEventListener('pagehide', handlePageHide)
    window.removeEventListener('pageshow', handlePageShow)
    if (unsubscribeLock) unsubscribeLock()
    cancelLock()
    hiddenAt = 0
    initialized = false
  }
}
