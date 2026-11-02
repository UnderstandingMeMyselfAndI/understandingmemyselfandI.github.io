// src/components/security/SecurityGate.jsx

import { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"

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
import Modal from "@ui/modal/Modal"
import PasscodeField from "./PasscodeField"
import "./securityGate.scss"

const CONFIRM_PHRASE = 'DELETE MY DATA'
const COOLDOWN_SECONDS = 30

function initialMode() {
  if (!cryptoAvailable()) return "unsupported"
  if (!hasPasscode()) return "open"
  if (isUnlocked()) return "open"
  return "locked"
}

export default function SecurityGate({ children, onLocked, onClose }) {
  const [mode, setMode] = useState(initialMode)
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(isBiometricEnabled)
  const [biometricBusy, setBiometricBusy] = useState(false)
  const biometricAttempted = useRef(false)

  // Reset flow
  const [resetting, setResetting] = useState(false)
  const [resetStep, setResetStep] = useState(0) // 0=warn, 1=type, 2=cooldown
  const [typedConfirm, setTypedConfirm] = useState("")
  const [cooldown, setCooldown] = useState(COOLDOWN_SECONDS)

  useRegisterModal(resetting)

  useEffect(() => {
    return subscribeLockState(({ unlocked }) => {
      if (!unlocked && hasPasscode()) {
        setMode("locked")
        setPasscode("")
        setError("")
        setBiometricEnabled(isBiometricEnabled())
        biometricAttempted.current = false
        if (onLocked) onLocked()
      } else if (unlocked) {
        setMode("open")
      }
    })
  }, [onLocked])

  useEffect(() => {
    if (mode !== "locked" || !biometricEnabled || biometricAttempted.current) return
    biometricAttempted.current = true
    let cancelled = false
    ;(async () => {
      setBiometricBusy(true)
      try {
        const ok = await unlockWithBiometric()
        if (!cancelled && ok) setMode("open")
      } catch { /* silent */ }
      finally { if (!cancelled) setBiometricBusy(false) }
    })()
    return () => { cancelled = true }
  }, [mode, biometricEnabled])

  // Cooldown timer
  useEffect(() => {
    if (resetStep !== 2) return undefined
    setCooldown(COOLDOWN_SECONDS)
    const interval = setInterval(() => {
      setCooldown((c) => (c <= 1 ? (clearInterval(interval), 0) : c - 1))
    }, 1000)
    return () => clearInterval(interval)
  }, [resetStep])

  const closeResetFlow = () => {
    setResetting(false)
    setResetStep(0)
    setTypedConfirm("")
    setCooldown(COOLDOWN_SECONDS)
  }

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
      closeResetFlow()
      setBiometricEnabled(isBiometricEnabled())
      setMode("open")
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  const confirmLabel = () => {
    if (resetStep === 0 || resetStep === 1) return 'Continue'
    return cooldown > 0 ? `Wait ${cooldown}s` : 'Delete everything'
  }

  const confirmDisabled = () => {
    if (busy) return true
    if (resetStep === 1) return typedConfirm !== CONFIRM_PHRASE
    if (resetStep === 2) return cooldown > 0
    return false
  }

  const handleResetConfirm = () => {
    if (resetStep === 0) setResetStep(1)
    else if (resetStep === 1 && typedConfirm === CONFIRM_PHRASE) setResetStep(2)
    else if (resetStep === 2 && cooldown === 0) handleReset()
  }

  const handleResetCancel = () => {
    if (resetStep === 0) closeResetFlow()
    else setResetStep(resetStep - 1)
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
      <>
        <Modal
          title='Locked Content'
          showCancel={!!onClose}
          onCancel={onClose ?? (() => {})}
          cancelLabel='Close'>
          <div className='security-gate security-gate--centered'>
            <form className='security-gate__card' onSubmit={handleUnlock}>
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
                {error && <p className='security-gate__error' role='alert'>{error}</p>}
                <button
                  className={`security-gate__submit${busy ? ' wide' : ''}`}
                  type='submit'
                  disabled={busy}>
                  {busy ? 'Unlocking…' : 'Unlock'}
                </button>
              </div>
              <div className='security-gate__row' role='note'>
                <button
                  type='button'
                  className='security-gate__link'
                  onClick={() => setResetting(true)}>
                  Forgot passcode?
                </button>
              </div>
            </form>
          </div>
        </Modal>

        {resetting && (
          <Modal
            title='Reset passcode'
            showConfirm
            showCancel
            confirmLabel={confirmLabel()}
            confirmDisabled={confirmDisabled()}
            cancelLabel={resetStep === 0 ? 'Cancel' : 'Back'}
            onConfirm={handleResetConfirm}
            onCancel={handleResetCancel}>
            {resetStep === 0 && (
              <div className='security-gate__reset-body'>
                <p className='pc-dialog__lede'>
                  If you have forgotten your passcode, the only way to use this app again is to reset it. Resetting will <strong>permanently delete every win and all settings</strong> on this device. This cannot be undone.
                </p>
                <p className='pc-dialog__lede'>
                  If you remember your passcode, cancel and try again.
                </p>
              </div>
            )}

            {resetStep === 1 && (
              <div className='security-gate__reset-body'>
                <p className='pc-dialog__lede'>
                  To confirm you want to delete everything, type <strong>{CONFIRM_PHRASE}</strong> below:
                </p>
                <input
                  type='text'
                  className='security-gate__input'
                  value={typedConfirm}
                  onChange={(e) => setTypedConfirm(e.target.value)}
                  autoComplete='off'
                  spellCheck={false}
                  autoFocus
                />
              </div>
            )}

            {resetStep === 2 && (
              <div className='security-gate__reset-body'>
                <div className='security-gate__warning security-gate__warning--strong'>
                  Last chance. All data will be deleted in {cooldown}s.
                </div>
                {error && <p className='security-gate__error' role='alert'>{error}</p>}
              </div>
            )}
          </Modal>
        )}
      </>
    )
  }

  return (
    <div className='security-gate security-gate--open'>
      <div className='security-gate__content'>{children}</div>
    </div>
  )
}

SecurityGate.propTypes = {
  children: PropTypes.node,
  onLocked: PropTypes.func,
  onClose: PropTypes.func,
}