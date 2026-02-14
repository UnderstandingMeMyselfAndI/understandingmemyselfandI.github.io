import { useState } from 'react'
import { setPasswordHint, getPasswordHint } from '@/src/js/utils/secureStorage'
import PropTypes from 'prop-types'
const PasswordHintSetup = ({ onSuccess }) => {
  const [hint, setHint] = useState(getPasswordHint())

  const handleSubmit = (e) => {
    e.preventDefault()
    setPasswordHint(hint)
    if (onSuccess) onSuccess()
  }

  return (
    <div className='password-hint-setup'>
      <h3>Password Hint (optional)</h3>
      <p>
        This hint will be shown if you forget your password. It should help you
        remember it.
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          placeholder='Enter a password hint'
        />
        <button type='submit'>Save Hint</button>
      </form>
    </div>
  )
}

PasswordHintSetup.propTypes = {
  onSuccess: PropTypes.func.isRequired,
}

export default PasswordHintSetup
