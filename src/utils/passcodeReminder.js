// src/utils/passcodeReminder.js
// Imperative scheduler for the "add a passcode" nudge.
//
// Owns:
//   - the once-per-day cap
//   - the "skip while a modal is open" rule
//   - the idle-delay so we don't interrupt active typing
//   - dry-run awareness (delegated to securityGate's storage key)
//
// Callers:
//   schedulePasscodeReminder()  — after a meaningful data write
//   cancelPasscodeReminder()    — when the user resumes interacting with data

import useAppStore from '@store/useAppStore'
import { hasPasscode, hasPasscodeReminderBeenShownToday, markPasscodeReminderShown } from './securityGate'
import { isModalOpen } from './modalDepth'

const IDLE_DELAY_MS = 500

let pendingTimer = null

function clearPending() {
  if (pendingTimer !== null) {
    clearTimeout(pendingTimer)
    pendingTimer = null
  }
}

function canShowNow() {
  return !hasPasscode() && !hasPasscodeReminderBeenShownToday() && !isModalOpen()
}

function showSnackbar() {
  const store = useAppStore.getState()

  store.setSnackbarAction({
    label: 'Create passcode',
    onAction: () => {
      // The user is engaging with the passcode flow — don't nudge again today.
      markPasscodeReminderShown()
      store.clearSnackbar()
      store.requestPasscodeDialog()
    },
  })

  store.setMessage('Your data is saved on this device. Add a passcode to keep it private?')
}

export function schedulePasscodeReminder() {
  if (!canShowNow()) return

  // Reset the idle window on every new schedule call so a burst of saves
  // only ever produces one nudge.
  clearPending()
  pendingTimer = setTimeout(() => {
    pendingTimer = null
    if (!canShowNow()) return // world changed during the delay — drop it
    markPasscodeReminderShown() // claim today before we even render
    showSnackbar()
  }, IDLE_DELAY_MS)
}

export function cancelPasscodeReminder() {
  clearPending()
}
