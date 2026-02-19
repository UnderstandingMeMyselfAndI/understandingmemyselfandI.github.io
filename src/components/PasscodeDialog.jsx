import React, { useState } from 'react'
import { useAppStore } from '../store/useAppStore'

const PasscodeDialog = ({ onSuccess }) => {
  const store = useAppStore()
  const [input, setInput] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState('')
  const [isVerified, setIsVerified] = useState(false)

  const handleInputChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    if (input.length === 4) {
      const verified = store.verifyPasscode(input)
      if (verified) {
        setIsVerified(true)
        setMessage('Passcode verified successfully!')
        onSuccess()
        setInput('')
      } else {
        setAttempts((prev) => prev + 1)
        setMessage(`Incorrect attempt ${attempts + 1}/10`)
        if (attempts >= 10) {
          setMessage('Account locked for 5 minutes')
          // Handle lockout here (e.g., show lockout timer)
        }
      }
    }
  }

  return (
    <div className='passcode-dialog'>
      <h3>Enter 4-digit passcode</h3>
      <div className='input-field'>
        <input type='number' min='0' max='9999' value={input} onChange={handleInputChange} placeholder='0000' />
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <p className='message'>{message}</p>
    </div>
  )
}

export default PasscodeDialog
