// src/components/security/PasscodeDialogController.jsx
// Renders <PasscodeDialog> whenever anything calls requestPasscodeDialog()
// on the app store. Mount once near the app root.

import { useEffect, useRef, useState } from 'react'
import useAppStore from '@store/useAppStore'
import PasscodeDialog from './PasscodeDialog'
import { hasPasscode, markPasscodeReminderShown } from '../../utils/securityGate'

export default function PasscodeDialogController() {
  const [open, setOpen] = useState(false)
  const request = useAppStore((s) => s.passcodeDialogRequest)
  const lastRequestRef = useRef(request)

  useEffect(() => {
    if (request === lastRequestRef.current) return
    lastRequestRef.current = request
    setOpen(true)
  }, [request])

  // Any interaction with the passcode dialog counts as "user has been reminded".
  useEffect(() => {
    if (open) markPasscodeReminderShown()
  }, [open])

  if (!open) return null

  return <PasscodeDialog startView={hasPasscode() ? 'settings' : 'create'} onClose={() => setOpen(false)} />
}
