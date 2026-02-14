import { useState } from 'react'
import { setPasswordKey, setPin } from '@/src/js/utils/secureStorage'
import PropTypes from 'prop-types'
const FirstTimeSetup = ({ onSuccess }) => {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [pin, setPinInput] = useState('')
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

    await setPasswordKey(password)

    if (pin) {
      if (!/^\d{4,6}$/.test(pin)) {
        setError('PIN must be 4-6 digits.')
        return
      }
      await setPin(pin)
    }

    onSuccess()
  }

  return (
    <div className='setup'>
      <h2>Secure your data</h2>
      <p>
        Password is required to encrypt your data. PIN is optional for fast
        unlock.
      </p>
      <form onSubmit={handleSubmit}>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <label>
          PIN (optional, 4-6 digits)
          <input
            type='text'
            value={pin}
            onChange={(e) => setPinInput(e.target.value)}
          />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Continue</button>
      </form>
    </div>
  )
}

FirstTimeSetup.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default FirstTimeSetup
