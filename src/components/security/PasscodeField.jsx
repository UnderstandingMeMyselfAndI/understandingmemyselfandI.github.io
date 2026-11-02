// src/components/security/PasscodeField.jsx
// Numeric passcode input with an eye toggle. Shared by SecurityGate and
// PasscodeDialog. Owns its own visibility state.

import { useRef, useState } from 'react'
import IconView from '@icons/IconView'
import IconViewOff from '@icons/IconViewOff'
import './passcodeDialog.scss'
export const MAX_LENGTH = 12

function digitsOnly(value) {
  return String(value || '')
    .replace(/\D+/g, '')
    .slice(0, MAX_LENGTH)
}

export default function PasscodeField({ id, label, value, onChange, autoFocus = false, hint }) {
  const [visible, setVisible] = useState(false)
  const inputRef = useRef(null)

  const handleChange = (event) => onChange(digitsOnly(event.target.value))

  const toggle = () => {
    setVisible((v) => !v)
    requestAnimationFrame(() => {
      const el = inputRef.current
      if (!el) return
      const end = el.value.length
      el.focus()
      try {
        el.setSelectionRange(end, end)
      } catch {
        /* ignore */
      }
    })
  }

  return (
    <>
      <div className='pc-field__row'>
        <div className='pc-field__field-title'>
          <label className='pc-field__label' htmlFor={id}>
            {label}
            {hint && <span className='pc-field__hint'>{hint}</span>}
          </label>
          <button
            type='button'
            className={'pc-field__toggle' + (visible ? ' view' : '')}
            onClick={toggle}
            aria-label={visible ? `Hide ${label || 'passcode'}` : `Show ${label || 'passcode'}`}
            aria-pressed={visible}
            aria-controls={id}>
            {visible ? <IconView /> : <IconViewOff />}
          </button>
        </div>
        <input
          id={id}
          ref={inputRef}
          className='pc-field__input'
          type={visible ? 'text' : 'password'}
          inputMode='numeric'
          pattern='[0-9]*'
          autoComplete='off'
          value={value}
          onChange={handleChange}
          maxLength={MAX_LENGTH}
          required
          autoFocus={autoFocus}
          spellCheck={false}
          autoCapitalize='off'
          autoCorrect='off'
        />
      </div>
    </>
  )
}
