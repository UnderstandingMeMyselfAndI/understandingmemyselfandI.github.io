// src/components/security/PasscodeDialog.jsx
import { useState } from 'react'
import {
  changePasscode,
  createPasscode,
  disablePasscode,
  hasPasscode,
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
      </div>{' '}
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
        )}{' '}
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

function SettingsView({ onNavigate, onClose }) {
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
  useRegisterModal() // hides this dialog from the reminder scheduler

  const [view, setView] = useState(startView)
  const [doneMessage, setDoneMessage] = useState('')

  const titles = {
    create: 'Create a passcode',
    settings: 'Passcode settings',
    change: 'Change passcode',
    disable: 'Disable passcode',
    reset: 'Reset passcode',
    done: 'Done',
  }

  const goBack = () => setView(hasPasscode() ? 'settings' : 'done')

  const finish = (message) => {
    setDoneMessage(message)
    setView('done')
  }

  return (
    <DialogShell title={titles[view]} onClose={onClose}>
      {view === 'create' && <CreateView onDone={() => finish('Passcode is set..')} onCancel={onClose} />}
      {view === 'settings' && <SettingsView onNavigate={setView} onClose={onClose} />}
      {view === 'change' && <ChangeView onDone={() => finish('Passcode changed.')} onBack={goBack} />}
      {view === 'disable' && <DisableView onDone={() => finish('Passcode disabled')} onBack={goBack} />}
      {view === 'reset' && <ResetView onDone={() => finish('Passcode reset.')} onBack={goBack} />}
      {view === 'done' && <DoneView message={doneMessage} onClose={onClose} />}
    </DialogShell>
  )
}
