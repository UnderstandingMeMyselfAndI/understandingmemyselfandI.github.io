import { useState } from 'react'
import { setPasswordKey } from '../utils/idbEncryptedStorage'

export default function PasswordUnlock({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await setPasswordKey(password) // will allow decryption of IndexedDB
      onSuccess()
    } catch {
      setError('Incorrect password or corrupted data.')
    }
  }

  return (
    <div className='password-unlock'>
      <h2>Enter your password</h2>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Unlock</button>
      </form>
    </div>
  )
}
