import { useState } from 'react'
import { setPin, verifyPin } from '../utils/secureStorage'
import PropTypes from 'prop-types'
const ChangePin = ({ onSuccess }) => {
  const [currentPin, setCurrentPin] = useState('')
  const [newPin, setNewPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (currentPin && !(await verifyPin(currentPin))) {
      setError('Current PIN incorrect')
      return
    }

    if (!/^\d{4,6}$/.test(newPin)) {
      setError('New PIN must be 4-6 digits')
      return
    }

    if (newPin !== confirmPin) {
      setError('New PIN and confirmation do not match')
      return
    }

    await setPin(newPin)
    setError('')
    if (onSuccess) onSuccess()
  }

  return (
    <div className='change-pin'>
      <h3>Change PIN</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Current PIN (if any)
          <input
            type='text'
            value={currentPin}
            onChange={(e) => setCurrentPin(e.target.value)}
          />
        </label>

        <label>
          New PIN (4-6 digits)
          <input
            type='text'
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
          />
        </label>

        <label>
          Confirm New PIN
          <input
            type='text'
            value={confirmPin}
            onChange={(e) => setConfirmPin(e.target.value)}
          />
        </label>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type='submit'>Save PIN</button>
      </form>
    </div>
  )
}
ChangePin.propTypes = { onSuccess: PropTypes.func }
export default ChangePin
