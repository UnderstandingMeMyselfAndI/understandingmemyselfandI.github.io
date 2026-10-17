// src/components/activity/smallWins/components/WhoWithTypeahead.jsx

import { useId, useMemo, useRef, useState } from 'react'
import { LIMITS, STRINGS } from '@data/smallWinsData.js'
import { normaliseName } from '@utils/smallWinsStorage'
import { rankSuggestions } from '@utils/rankSuggestions'
import './whoWithTypeahead.scss'

export default function WhoWithTypeahead({
  value = [],
  suggestions = [],
  label = STRINGS.whoWithLabel,
  placeholder = STRINGS.whoWithPlaceholder,
  onAdd,
  onRemove,
  disabled = false,
}) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  const inputRef = useRef(null)
  const listboxId = useId()
  const inputId = `${listboxId}-input`

  const options = useMemo(() => rankSuggestions(suggestions, query, value), [suggestions, query, value])

  const atCapacity = value.length >= LIMITS.whoWithMax

  const safeActiveIndex = options.length === 0 ? -1 : Math.min(activeIndex, options.length - 1)

  const commit = (rawName) => {
    const name = normaliseName(rawName)
    if (!name) return
    onAdd?.(name)
    setQuery('')
    setOpen(false)
    setActiveIndex(-1)
    inputRef.current?.focus()
  }

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!open) setOpen(true)
      setActiveIndex((i) => Math.min(i + 1, options.length - 1))
      return
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
      return
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      if (open && safeActiveIndex >= 0 && options[safeActiveIndex]) {
        commit(options[safeActiveIndex])
      } else if (query.trim()) {
        commit(query)
      }
      return
    }
    if (event.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      return
    }
    if (event.key === 'Backspace' && !query && value.length > 0) {
      onRemove?.(value[value.length - 1])
    }
  }

  return (
    <div className='who-with'>
      <label className='who-with__label' htmlFor={inputId}>
        {label}
      </label>

      {value.length > 0 && (
        <ul className='who-with__chips'>
          {value.map((name) => (
            <li key={name} className='who-with__chip'>
              <span className='who-with__chip-text'>{name}</span>
              <button
                type='button'
                className='who-with__chip-remove'
                aria-label={`${STRINGS.removePerson} ${name}`}
                onClick={() => onRemove?.(name)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className='who-with__field'>
        <input
          id={inputId}
          ref={inputRef}
          className='who-with__input'
          type='text'
          role='combobox'
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete='list'
          aria-activedescendant={open && safeActiveIndex >= 0 ? `${listboxId}-option-${safeActiveIndex}` : undefined}
          autoComplete='off'
          placeholder={atCapacity ? 'Limit reached' : placeholder}
          value={query}
          disabled={disabled || atCapacity}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
            setActiveIndex(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 120)
          }}
          onKeyDown={handleKeyDown}
        />

        {query.trim() && !atCapacity && (
          <button type='button' className='who-with__add' onClick={() => commit(query)}>
            {STRINGS.addPerson}
          </button>
        )}
      </div>

      {open && options.length > 0 && (
        <ul className='who-with__suggestions' id={listboxId} role='listbox' aria-label={STRINGS.suggestionsLabel}>
          {options.map((name, index) => (
            <li
              key={name}
              id={`${listboxId}-option-${index}`}
              role='option'
              aria-selected={index === safeActiveIndex}
              className={`who-with__suggestion${index === safeActiveIndex ? ' is-active' : ''}`}
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => commit(name)}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
