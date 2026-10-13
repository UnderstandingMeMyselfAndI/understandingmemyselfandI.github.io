// src/components/security/PasscodeButton.jsx
// Reusable "Create passcode" / "Passcode settings" button. Fires a global
// request; the actual dialog is mounted by <PasscodeDialogController>.
//
// The button may be rendered anywhere; the controller only needs to exist
// once at app root.

import { useEffect, useState } from 'react'
import useAppStore from '@store/useAppStore'
import { hasPasscode, isUnlocked, subscribeLockState } from '../../utils/securityGate'
import './passcodeControls.scss'

export default function PasscodeButton({
  className = '',
  variant = 'default', // 'default' | 'ghost' | 'compact'
  createLabel = 'Enable Security',
  settingsLabel = 'Passcode Settings',
}) {
  const requestOpen = useAppStore((s) => s.requestPasscodeDialog)
  const [state, setState] = useState(() => ({
    hasPasscode: hasPasscode(),
    unlocked: isUnlocked(),
  }))

  useEffect(() => subscribeLockState(({ hasPasscode: hp, unlocked }) => setState({ hasPasscode: hp, unlocked })), [])

  const label = state.hasPasscode ? settingsLabel : createLabel

  return (
    <button
      type='button'
      className={`pc-button pc-button--${variant}${className ? ` ${className}` : ''}`}
      onClick={requestOpen}
      aria-haspopup='dialog'>
      {/* {!state.hasPasscode && <div className='pc-button__badge' aria-hidden='true'></div>} */}
      <span className='pc-button__label'>{label}</span>
    </button>
  )
}
