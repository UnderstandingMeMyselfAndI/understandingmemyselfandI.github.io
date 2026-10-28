// src/components/security/SecurityGate.jsx

import { useEffect, useRef, useState } from "react"
import {
  hasPasscode,
  isBiometricEnabled,
  isUnlocked,
  resetPasscode,
  unlock,
  unlockWithBiometric,
  subscribeLockState,
} from "../../utils/securityGate"
import { cryptoAvailable } from "../../utils/crypto"
import { useRegisterModal } from "../../utils/modalDepth"
import PasscodeField from "./PasscodeField"
import "./securityGate.scss"

function initialMode() {
  if (!cryptoAvailable()) return "unsupported"
  if (!hasPasscode()) return "open"
  if (isUnlocked()) return "open"
  return "locked"
}

export default function SecurityGate({ children, activityName = "this activity", onLocked }) {
  const [mode, setMode] = useState(initialMode)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const [resetting, setResetting] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(isBiometricEnabled)
  const [biometricBusy, setBiometricBusy] = useState(false)
  const biometricAttempted = useRef(false)

  useRegisterModal(resetting)

  // React to session-wide lock events. When `lock()` is called from anywhere
  // (manual lock in PasscodeDialog, sessionLock timeout, reset), the gate
  // flips back to locked and notifies the parent to drop decrypted data.
  useEffect(() => {
    return subscribeLockState(({ unlocked }) => {
      if (!unlocked && hasPasscode()) {
        setMode("locked")
        setPasscode("")
        setError("")
        // Refresh biometric state — the user may have enabled or disabled it
        // while unlocked, so the mount-time value is stale.
        setBiometricEnabled(isBiometricEnabled())
        // Allow biometric to auto-attempt again on this fresh lock cycle.
        // Without this, `biometricAttempted` would stay true after the first
        // attempt and the user would never get an auto-prompt after a timeout.
        biometricAttempted.current = false
        if (onLocked) onLocked()
      } else if (unlocked) {
        setMode("open")
      }
    })
  }, [onLocked])

  // Auto-attempt biometric on entering locked state if it is enabled.
  useEffect(() => {
    if (mode !== "locked" || !biometricEnabled || biometricAttempted.current) return
    biometricAttempted.current = true

    let cancelled = false
    ;(async () => {
      setBiometricBusy(true)
      try {
        const ok = await unlockWithBiometric()
        if (!cancelled && ok) setMode("open")
      } catch {
        // Silent — user can fall back to the passcode.
      } finally {
        if (!cancelled) setBiometricBusy(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [mode, biometricEnabled])

  const handleUnlock = async (event) => {
    event.preventDefault()
    setError("")
    setBusy(true)
    try {
      const ok = await unlock(passcode)
      if (!ok) {
        setError("That passcode is not correct.")
        setPasscode("")
        return
      }
      setPasscode("")
      setMode("open")
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  const handleBiometricUnlock = async () => {
    setError("")
    setBiometricBusy(true)
    try {
      const ok = await unlockWithBiometric()
      if (!ok) setError("Biometric unlock was cancelled.")
      else setMode("open")
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBiometricBusy(false)
    }
  }

  const handleReset = async () => {
    setBusy(true)
    setError("")
    try {
      await resetPasscode()
      if (onLocked) onLocked()
      setResetting(false)
      setResetConfirm(false)
      // Reset leaves the app in an unprotected state — no passcode remains,
      // so show children immediately. Also refresh biometric availability
      // (it may have been burned by the reset).
      setBiometricEnabled(isBiometricEnabled())
      setMode("open")
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  if (mode === "unsupported") {
    return (
      <div className='security-gate security-gate--centered' role='alert'>
        <h2>Browser not supported</h2>
        <p>Ummi needs Web Crypto enabled to encrypt your data. Please update your browser.</p>
      </div>
    )
  }

  if (mode === "locked") {
    return (
      <div className='security-gate security-gate--centered'>
        <form className='security-gate__card' onSubmit={handleUnlock}>
          <h2 className='security-gate__title'>Locked Content</h2>

          {biometricEnabled && (
            <button
              type='button'
              className='security-gate__biometric'
              onClick={handleBiometricUnlock}
              disabled={biometricBusy}>
              {biometricBusy ? "Waiting for biometrics…" : "Unlock with biometrics"}
            </button>
          )}

          <div className='security-gate__row-wrap inputs' role='note'>
            <PasscodeField
              id='sg-unlock-pass'
              label='Passcode'
              value={passcode}
              onChange={setPasscode}
              autoFocus={!biometricEnabled}
            />

            {error && (
              <p className='security-gate__error' role='alert'>
                {error}
              </p>
            )}

            <button
              className={`security-gate__submit${busy ? ' wide' : ''}`}
              type='submit'
              disabled={busy}>
              {busy ? 'Unlocking…' : 'Unlock'}
            </button>
          </div>
          <div className='security-gate__row' role='note'>
            <button type='button' className='security-gate__link' onClick={() => setResetting(true)}>
              Forgot passcode?
            </button>
          </div>
        </form>

        {resetting && (
          <div className='security-gate__modal' role='dialog' aria-modal='true'>
            <div className='security-gate__modal-panel'>
              <h3 className='security-gate__title'>Reset passcode</h3>
              {!resetConfirm ? (
                <>
                  <p className='security-gate__lede'>
                    Resetting will permanently delete every win on this device. There is no other way to regain access.
                  </p>
                  <div className='security-gate__actions'>
                    <button type='button' className='security-gate__cancel' onClick={() => setResetting(false)}>
                      Cancel
                    </button>
                    <button type='button' className='security-gate__danger' onClick={() => setResetConfirm(true)}>
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className='security-gate__warning security-gate__warning--strong'>
                    Last chance. All wins will be deleted immediately.
                  </div>
                  {error && (
                    <p className='security-gate__error' role='alert'>
                      {error}
                    </p>
                  )}
                  <div className='security-gate__actions'>
                    <button
                      type='button'
                      className='security-gate__cancel'
                      onClick={() => setResetConfirm(false)}
                      disabled={busy}>
                      Back
                    </button>
                    <button type='button' className='security-gate__danger' onClick={handleReset} disabled={busy}>
                      {busy ? "Resetting…" : "Delete everything"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className='security-gate security-gate--open'>
      <div className='security-gate__content'>{children}</div>
    </div>
  )
}