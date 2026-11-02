// src/components/security/PasscodeDialog.jsx
import { useEffect, useState } from "react"
import {
  changePasscode,
  createPasscode,
  disableBiometric,
  disablePasscode,
  enableBiometric,
  hasPasscode,
  isBiometricAvailable,
  isBiometricEnabled,
  lock,
  MIN_PASSCODE_LENGTH,
} from "../../utils/securityGate"
import IconChangeCircle from "@icons/IconChangeCircle"
import IconLock from "@icons/IconLock"
import IconLockOpenRight from "@icons/IconLockOpenRight"
import IconFingerprint from "@icons/IconFingerprint"
import { useRegisterModal } from "@utils/modalDepth"
import PasscodeField, { MAX_LENGTH } from "./PasscodeField"
import Modal from "@ui/modal/Modal"
// import CloseBtn from "@buttons/close/CloseBtn"
import "./passcodeDialog.scss"

function DialogShell({ title, onClose, children }) {
  return (
      <Modal title={title} onCancel={onClose} showConfirm={false} showCancel={false}>
      {children}
      </Modal>
    
  )
}

function CreateView({ onDone, onCancel }) {
  const [passcode, setPasscode] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    if (passcode.length < MIN_PASSCODE_LENGTH) {
      setError(`Use at least ${MIN_PASSCODE_LENGTH} digits.`)
      return
    }
    if (passcode !== confirm) {
      setError("The two passcodes do not match.")
      return
    }
    setBusy(true)
    try {
      await createPasscode(passcode)
      onDone()
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="pc-form">
       <p className='pc-dialog__lede'>
          Secure your data with a passcode. Passcode enabled features require it to be entered correctly before accessing features.
        </p>
      <div className='pc-dialog__warning pc-dialog__lede warning'> 
        <strong>WARNING:</strong>      
        If you forget your passcode, it cannot be reset or recovered. Save a copy of your passcode in a safe place.
       
      </div>

      <div className='pc-dialog__fields'>
        
          <PasscodeField
            id='pc-create'
            label='Passcode'
            value={passcode}
            onChange={setPasscode}
            hint={`${MIN_PASSCODE_LENGTH}–${MAX_LENGTH} digits`}
            autoFocus
          />
       
      </div>
      <div className='pc-dialog__fields'>
       
          <PasscodeField id='pc-create-confirm' label='Confirm Passcode' value={confirm} onChange={setConfirm} />
        
        {error && (
          <p className='pc-dialog__error' role='alert'>
            {error}
          </p>
        )}
      </div>
      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onCancel}>
          Cancel
        </button>
        <button type='submit' className='pc-dialog__btn pc-dialog__btn--primary' disabled={busy}>
          {busy ? "Creating…" : "Secure"}
        </button>
      </div>
    </form>
  )
}

function SettingsView({ onNavigate, onClose, biometricAvailable, biometricEnabled }) {
  return (
    <>
      <p className='pc-dialog__lede'>Your passcode further protects the data on this device.</p>
      <div className='pc-dialog__menu'>
        <button
          type='button'
          className='pc-dialog__menu-item'
          onClick={() => {
            lock()
            onClose()
          }}>
          <div>
            <IconLock />
            <span className='pc-dialog__menu-title'>Lock now</span>
          </div>
          <span className='pc-dialog__menu-sub'>Use passcode to open features.</span>
        </button>
          <button
            type='button'
            className='pc-dialog__menu-item'
            onClick={() => onNavigate(biometricEnabled ? "disable-biometric" : "enable-biometric")}>
            <div>
              <IconFingerprint />
              <span className='pc-dialog__menu-title'>{biometricEnabled ? "Disable biometrics" : "Biometrics"}</span>
            </div>
            <span className='pc-dialog__menu-sub'>
              {!biometricAvailable
                ? 'Not supported on this device.'
                : biometricEnabled
                  ? 'Stop using your device biometrics to unlock.'
                  : 'Unlock with fingerprint, face, or device unlock.'}
            </span>
          </button>
        <button type='button' className='pc-dialog__menu-item' onClick={() => onNavigate("change")}>
          <div>
            <IconChangeCircle />
            <span className='pc-dialog__menu-title'>Change </span>
          </div>
          <span className='pc-dialog__menu-sub'>Change your passcode.</span>
        </button>
        <button type='button' className='pc-dialog__menu-item' onClick={() => onNavigate("disable")}>
          <div>
            <IconLockOpenRight />
            <span className='pc-dialog__menu-title'>Disable</span>
          </div>
          <span className='pc-dialog__menu-sub'>Keep your data, remove the passcode lock.</span>
        </button>
       
      </div>
      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onClose}>
          Close
        </button>
      </div>
    </>
  )
}

function BiometricView({ mode, onDone, onBack }) {
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    setBusy(true)
    try {
      if (mode === "enable") {
        const result = await enableBiometric(passcode)
        if (!result.ok) {
          setError(
            result.reason === "prf-unsupported"
              ? "This device does not support secure biometric keys. Use your passcode instead."
              : `Could not enable biometrics: ${result.reason}`,
          )
          return
        }
      } else {
        await disableBiometric(passcode)
      }
      onDone()
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="pc-form">
      <p className='pc-dialog__lede'>
        {mode === "enable"
          ? "Enter your current passcode to enable biometric unlock."
          : "Enter your current passcode to disable biometric unlock."}
      </p>

      <PasscodeField
        id='pc-biometric-pass'
        label='Current passcode'
        value={passcode}
        onChange={setPasscode}
        autoFocus
      />

      {error && (
        <p className='pc-dialog__error' role='alert'>
          {error}
        </p>
      )}

      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onBack}>
          Back
        </button>
        <button type='submit' className='pc-dialog__btn pc-dialog__btn--primary' disabled={busy}>
          {busy ? "Working…" : mode === "enable" ? "Enable" : "Disable"}
        </button>
      </div>
    </form>
  )
}

function ChangeView({ onDone, onBack }) {
  const [current, setCurrent] = useState("")
  const [next, setNext] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    if (next.length < MIN_PASSCODE_LENGTH) {
      setError(`New passcode must be at least ${MIN_PASSCODE_LENGTH} digits.`)
      return
    }
    if (next !== confirm) {
      setError("The two new passcodes do not match.")
      return
    }
    setBusy(true)
    try {
      await changePasscode(current, next)
      onDone()
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="pc-form">
      <PasscodeField id='pc-change-current' label='Current passcode' value={current} onChange={setCurrent} autoFocus />
      <PasscodeField
        id='pc-change-new'
        label='New passcode'
        value={next}
        onChange={setNext}
        hint={`${MIN_PASSCODE_LENGTH}–${MAX_LENGTH} digits`}
      />
      <PasscodeField id='pc-change-confirm' label='Confirm new passcode' value={confirm} onChange={setConfirm} />

      {error && (
        <p className='pc-dialog__error' role='alert'>
          {error}
        </p>
      )}

      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onBack}>
          Back
        </button>
        <button type='submit' className='pc-dialog__btn pc-dialog__btn--primary' disabled={busy}>
          {busy ? "Updating…" : "Change"}
        </button>
      </div>
    </form>
  )
}

function DisableView({ onDone, onBack }) {
  const [current, setCurrent] = useState("")
  const [error, setError] = useState("")
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError("")
    setBusy(true)
    try {
      await disablePasscode(current)
      onDone()
    } catch (err) {
      setError(String(err?.message || err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="pc-form">
      <p className='pc-dialog__lede warning'>
        <strong className="warning">WARNING</strong> Unless you use other login methods, disabling your passcode removes protection of your data.  Your data will remain on this device but could be accessed by other users of this device.
      </p>
      <PasscodeField id='pc-disable-current' label='Current passcode' value={current} onChange={setCurrent} autoFocus />

      {error && (
        <p className='pc-dialog__error' role='alert'>
          {error}
        </p>
      )}

      <div className='pc-dialog__actions '>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onBack}>
          Cancel
        </button>
        <button type='submit' className='pc-dialog__btn pc-dialog__btn--danger' disabled={busy}>
          {busy ? "Disabling…" : "Disable"}
        </button>
      </div>
    </form>
  )
}


function DoneView({ message, onClose }) {
  return (
    <>
      <p className='pc-dialog__lede'>{message}</p>
      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn done pc-dialog__btn--primary' onClick={onClose}>
          Close
        </button>
      </div>
    </>
  )
}

export default function PasscodeDialog({ startView = "settings", onClose }) {
  useRegisterModal()

  const [view, setView] = useState(startView)
  const [doneMessage, setDoneMessage] = useState("")
  const [biometricAvailable, setBiometricAvailable] = useState(false)
  const [biometricEnabled, setBiometricEnabled] = useState(isBiometricEnabled)

  useEffect(() => {
    let cancelled = false
    isBiometricAvailable().then((available) => {
      if (!cancelled) setBiometricAvailable(available)
    })
    return () => {
      cancelled = true
    }
  }, [])

  const titles = {
    create: "Create a Passcode",
    settings: "Passcode Settings",
    change: "Change Passcode",
    disable: "Disable Passcode",
    "enable-biometric": "Enable Biometric Unlock",
    "disable-biometric": "Disable Biometric Unlock",
    done: "Passcode",
  }

  const goBack = () => setView(hasPasscode() ? "settings" : "done")

  const finish = (message) => {
    setDoneMessage(message)
    setView("done")
  }

  const refreshBiometric = () => {
    setBiometricEnabled(isBiometricEnabled())
  }

  return (
    <DialogShell title={titles[view]} onClose={onClose}>
      {view === "create" && <CreateView onDone={() => finish("Passcode is now set.")} onCancel={onClose} />}

      {view === "settings" && (
        <SettingsView
          onNavigate={setView}
          onClose={onClose}
          biometricAvailable={biometricAvailable}
          biometricEnabled={biometricEnabled}
        />
      )}

      {view === "change" && <ChangeView onDone={() => finish("Passcode changed.")} onBack={goBack} />}

      {view === "disable" && <DisableView onDone={() => finish("Passcode disabled.")} onBack={goBack} />}

      {view === "enable-biometric" && (
        <BiometricView
          mode='enable'
          onDone={() => {
            refreshBiometric()
            finish("Biometric unlock is enabled.")
          }}
          onBack={goBack}
        />
      )}

      {view === "disable-biometric" && (
        <BiometricView
          mode='disable'
          onDone={() => {
            refreshBiometric()
            finish("Biometric unlock is disabled.")
          }}
          onBack={goBack}
        />
      )}

      {view === "done" && <DoneView message={doneMessage} onClose={onClose} />}
    </DialogShell>
  )
}
