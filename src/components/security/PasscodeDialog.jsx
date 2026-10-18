// src/components/security/PasscodeDialog.jsx
import { useEffect, useState } from 'react'
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
  resetPasscode,
  MIN_PASSCODE_LENGTH,
} from '../../utils/securityGate'
import { useRegisterModal } from '../../utils/modalDepth'
import PasscodeField, { MAX_LENGTH } from './PasscodeField'
import CloseBtn from '@ui/buttons/close/CloseBtn'
import './passcodeControls.scss'

function DialogShell({ title, onClose, children }) {
  return (
    <section className='pc-dialog' role='dialog' aria-modal='true' aria-label={title}>
      <div className='pc-dialog__backdrop' onClick={onClose} />
      <div className='pc-dialog__panel'>
        <header className='pc-dialog__head'>
          <h3 className='pc-dialog__title'>{title}</h3>
          <CloseBtn onClick={onClose} aria-label='Close' />
        </header>
        <div className='pc-dialog__body'>{children}</div>
      </div>
    </section>
  )
}

function CreateView({ onDone, onCancel }) {
  const [passcode, setPasscode] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (passcode.length < MIN_PASSCODE_LENGTH) {
      setError(`Use at least ${MIN_PASSCODE_LENGTH} digits.`)
      return
    }
    if (passcode !== confirm) {
      setError('The two passcodes do not match.')
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
    <form onSubmit={submit}>
      <div className='pc-dialog__header'>
        <div className='pc-dialog__subtitle'>Further secure your data.</div>
        <p className='pc-dialog__lede'>
          Using a passcode means you will need to enter it before you can read your data.
        </p>
      </div>
      <div className='pc-dialog__warning'>
        Only you know your passcode. <br /> <br />
        If you forget it, it cannot be recovered or reset.
      </div>
      <div className='pc-dialog__fields'>
        <div>
          <PasscodeField
            id='pc-create'
            label='Passcode'
            value={passcode}
            onChange={setPasscode}
            hint={`${MIN_PASSCODE_LENGTH}–${MAX_LENGTH} digits`}
            autoFocus
          />
        </div>
        <div>
          <PasscodeField id='pc-create-confirm' label='Confirm passcode' value={confirm} onChange={setConfirm} />
        </div>
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
          {busy ? 'Creating…' : 'Create a passcode'}
        </button>
      </div>
    </form>
  )
}

function SettingsView({ onNavigate, onClose, biometricAvailable, biometricEnabled }) {
  return (
    <>
      <p className='pc-dialog__lede'>Your passcode further protects the data on this device.</p>
      <ul className='pc-dialog__menu'>
        <li>
          <button type='button' className='pc-dialog__menu-item' onClick={() => onNavigate('change')}>
            <span className='pc-dialog__menu-title'>Change passcode</span>
            <span className='pc-dialog__menu-sub'>Enter your current passcode, then choose a new one.</span>
          </button>
        </li>
        <li>
          <button
            type='button'
            className='pc-dialog__menu-item'
            onClick={() => {
              lock()
              onClose()
            }}>
            <span className='pc-dialog__menu-title'>Lock now</span>
            <span className='pc-dialog__menu-sub'>Require your passcode the next time this activity opens.</span>
          </button>
        </li>
        {biometricAvailable && (
          <li>
            <button
              type='button'
              className='pc-dialog__menu-item'
              onClick={() => onNavigate(biometricEnabled ? 'disable-biometric' : 'enable-biometric')}>
              <span className='pc-dialog__menu-title'>
                {biometricEnabled ? 'Disable biometric unlock' : 'Enable biometric unlock'}
              </span>
              <span className='pc-dialog__menu-sub'>
                {biometricEnabled
                  ? 'Stop using your device biometrics to unlock.'
                  : 'Use fingerprint, face, or device biometrics instead of typing your passcode.'}
              </span>
            </button>
          </li>
        )}

        <li>
          <button type='button' className='pc-dialog__menu-item' onClick={() => onNavigate('disable')}>
            <span className='pc-dialog__menu-title'>Disable passcode</span>
            <span className='pc-dialog__menu-sub'>Keep your data, remove the passcode lock.</span>
          </button>
        </li>
        <li>
          <button
            type='button'
            className='pc-dialog__menu-item pc-dialog__menu-item--danger'
            onClick={() => onNavigate('reset')}>
            <span className='pc-dialog__menu-title'>Reset passcode</span>
            <span className='pc-dialog__menu-sub'>Delete all wins and start fresh.</span>
          </button>
        </li>
      </ul>
      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onClose}>
          Close
        </button>
      </div>
    </>
  )
}

function BiometricView({ mode, onDone, onBack }) {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      if (mode === 'enable') {
        const result = await enableBiometric(passcode)
        if (!result.ok) {
          setError(
            result.reason === 'prf-unsupported'
              ? 'This device does not support secure biometric keys. Use your passcode instead.'
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
    <form onSubmit={submit}>
      <p className='pc-dialog__lede'>
        {mode === 'enable'
          ? 'Enter your current passcode to enable biometric unlock.'
          : 'Enter your current passcode to disable biometric unlock.'}
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
          {busy ? 'Working…' : mode === 'enable' ? 'Enable biometric' : 'Disable biometric'}
        </button>
      </div>
    </form>
  )
}

function ChangeView({ onDone, onBack }) {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    if (next.length < MIN_PASSCODE_LENGTH) {
      setError(`New passcode must be at least ${MIN_PASSCODE_LENGTH} digits.`)
      return
    }
    if (next !== confirm) {
      setError('The two new passcodes do not match.')
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
    <form onSubmit={submit}>
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
          {busy ? 'Updating…' : 'Change passcode'}
        </button>
      </div>
    </form>
  )
}

function DisableView({ onDone, onBack }) {
  const [current, setCurrent] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async (event) => {
    event.preventDefault()
    setError('')
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
    <form onSubmit={submit}>
      <p className='pc-dialog__lede'>
        Your wins will stay on this device, but they will no longer be protected by a passcode.
      </p>
      <PasscodeField id='pc-disable-current' label='Current passcode' value={current} onChange={setCurrent} autoFocus />

      {error && (
        <p className='pc-dialog__error' role='alert'>
          {error}
        </p>
      )}

      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onBack}>
          Back
        </button>
        <button type='submit' className='pc-dialog__btn pc-dialog__btn--danger' disabled={busy}>
          {busy ? 'Disabling…' : 'Disable passcode'}
        </button>
      </div>
    </form>
  )
}

function ResetView({ onDone, onBack }) {
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const doReset = async () => {
    setBusy(true)
    setError('')
    try {
      await resetPasscode()
      onDone()
    } catch (err) {
      setError(String(err?.message || err))
      setBusy(false)
    }
  }

  if (!confirming) {
    return (
      <>
        <div className='pc-dialog__warning pc-dialog__warning--strong'>
          Resetting will permanently delete every win on this device. This cannot be undone.
        </div>
        <div className='pc-dialog__actions'>
          <button type='button' className='pc-dialog__btn pc-dialog__btn--ghost' onClick={onBack}>
            Back
          </button>
          <button type='button' className='pc-dialog__btn pc-dialog__btn--danger' onClick={() => setConfirming(true)}>
            I understand, continue
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='pc-dialog__warning pc-dialog__warning--strong'>
        Last chance. All wins will be deleted immediately.
      </div>

      {error && (
        <p className='pc-dialog__error' role='alert'>
          {error}
        </p>
      )}

      <div className='pc-dialog__actions'>
        <button
          type='button'
          className='pc-dialog__btn pc-dialog__btn--ghost'
          onClick={() => setConfirming(false)}
          disabled={busy}>
          Cancel
        </button>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--danger' onClick={doReset} disabled={busy}>
          {busy ? 'Resetting…' : 'Delete everything and reset'}
        </button>
      </div>
    </>
  )
}

function DoneView({ message, onClose }) {
  return (
    <>
      <p className='pc-dialog__lede'>{message}</p>
      <div className='pc-dialog__actions'>
        <button type='button' className='pc-dialog__btn pc-dialog__btn--primary' onClick={onClose}>
          Done
        </button>
      </div>
    </>
  )
}

export default function PasscodeDialog({ startView = 'settings', onClose }) {
  useRegisterModal()

  const [view, setView] = useState(startView)
  const [doneMessage, setDoneMessage] = useState('')
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
    create: 'Create a passcode',
    settings: 'Passcode settings',
    change: 'Change passcode',
    disable: 'Disable passcode',
    reset: 'Reset passcode',
    'enable-biometric': 'Enable biometric unlock',
    'disable-biometric': 'Disable biometric unlock',
    done: 'Done',
  }

  const goBack = () => setView(hasPasscode() ? 'settings' : 'done')

  const finish = (message) => {
    setDoneMessage(message)
    setView('done')
  }

  const refreshBiometric = () => {
    setBiometricEnabled(isBiometricEnabled())
  }

  return (
    <DialogShell title={titles[view]} onClose={onClose}>
      {view === 'create' && <CreateView onDone={() => finish('Passcode is set.')} onCancel={onClose} />}

      {view === 'settings' && (
        <SettingsView
          onNavigate={setView}
          onClose={onClose}
          biometricAvailable={biometricAvailable}
          biometricEnabled={biometricEnabled}
        />
      )}

      {view === 'change' && <ChangeView onDone={() => finish('Passcode changed.')} onBack={goBack} />}

      {view === 'disable' && <DisableView onDone={() => finish('Passcode disabled.')} onBack={goBack} />}

      {view === 'reset' && <ResetView onDone={() => finish('Everything has been reset.')} onBack={goBack} />}

      {view === 'enable-biometric' && (
        <BiometricView
          mode='enable'
          onDone={() => {
            refreshBiometric()
            finish('Biometric unlock is enabled.')
          }}
          onBack={goBack}
        />
      )}

      {view === 'disable-biometric' && (
        <BiometricView
          mode='disable'
          onDone={() => {
            refreshBiometric()
            finish('Biometric unlock is disabled.')
          }}
          onBack={goBack}
        />
      )}

      {view === 'done' && <DoneView message={doneMessage} onClose={onClose} />}
    </DialogShell>
  )
}
