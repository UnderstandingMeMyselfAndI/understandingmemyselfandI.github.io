import React, { useState, useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'
import PasscodeDialog from './PasscodeDialog'

const PasscodeGate = ({ children }) => {
  const store = useAppStore()
  const [showDialog, setShowDialog] = useState(false)

  useEffect(() => {
    if (store.hasPasscode && !store.isPasscodeVerified) {
      setShowDialog(true)
    }
  }, [store.hasPasscode, store.isPasscodeVerified])

  const handleVerificationSuccess = () => {
    setShowDialog(false)
  }

  if (!store.hasPasscode) {
    return children
  }

  if (store.isPasscodeVerified && Date.now() < store.passcodeVerifiedUntil) {
    return children
  }

  return <div className='passcode-gate'>{showDialog && <PasscodeDialog onSuccess={handleVerificationSuccess} />}</div>
}

export default PasscodeGate
