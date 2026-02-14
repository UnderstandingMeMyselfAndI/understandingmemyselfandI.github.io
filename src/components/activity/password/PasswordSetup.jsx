import { useState } from 'react'
import { setPasswordKey } from '../utils/idbEncryptedStorage'

export default function PasswordSetup({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    try {
      await setPasswordKey(password)
      onSuccess() // unlocks app
    } catch (err) {
      console.error(err)
      setError('Failed to set password. Try again.')
    }
  }

  return (
    <div className='password-setup'>
      <h2>Set a password</h2>
      <p>This will protect your data on this device.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            type='password'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type='submit'>Set Password</button>
      </form>
    </div>
  )
}
