// src/components/security/PasscodeField.jsx
// Numeric passcode input with an eye toggle. Shared by SecurityGate and
// PasscodeDialog. Owns its own visibility state.

import { useRef, useState } from 'react'
import IconView from '@icons/IconView'
import IconViewOff from '@icons/IconViewOff'
import './passcodeField.scss'
export const MAX_LENGTH = 12

function digitsOnly(value) {
  return String(value || '')
    .replace(/\D+/g, '')
    .slice(0, MAX_LENGTH)
}

function EyeIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  )
}

function EyeOffIcon() {
  return (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'>
      <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94' />
      <path d='M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19' />
      <path d='M14.12 14.12a3 3 0 1 1-4.24-4.24' />
      <line x1='1' y1='1' x2='23' y2='23' />
    </svg>
  )
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
