import { useState } from 'react'
import { setPasswordKey } from '../utils/idbOptionalEncryptedStorage'

export default function PasswordOptionalSetup({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [hint, setHint] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!password) {
      await setPasswordKey(null)
      onSuccess()
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    await setPasswordKey(password)
    localStorage.setItem('passwordHint', hint) // optional plaintext hint
    onSuccess()
  }

  return (
    <div className='password-setup'>
      <h2>Set a password (optional)</h2>
      <p>
        Setting a password encrypts your data. Recommended if your device may be
        lost or shared.
        <strong> Warning:</strong> If you forget your password, encrypted data
        cannot be recovered.
      </p>

      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {password && (
          <label>
            Confirm Password
            <input
              type='password'
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </label>
        )}

        <label>
          Password Hint (optional)
          <input
            type='text'
            value={hint}
            onChange={(e) => setHint(e.target.value)}
            placeholder='Something to remind you'
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type='submit'>Continue</button>
        <button
          type='button'
          onClick={() => {
            setPasswordKey(null)
            onSuccess()
          }}
        >
          Skip Password
        </button>
      </form>
    </div>
  )
}
