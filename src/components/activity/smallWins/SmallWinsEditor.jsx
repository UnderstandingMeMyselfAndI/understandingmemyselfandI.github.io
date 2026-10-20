// src/components/activity/smallWins/SmallWinsEditor.jsx

import { useEffect, useMemo, useRef, useState } from 'react'
import { useSmallWinsStore } from '@store/smallWinsStore'
import { LIMITS, STRINGS } from '@data/dataSmallWins.js'
import { isFutureIso, todayIso } from '@utils/formatSmallWinDate.js'
import WhoWithTypeahead from './components/WhoWithTypeahead'
import { useRegisterModal } from '@utils/modalDepth'
import './smallWinsEditor.scss'

function countWords(text) {
  const trimmed = String(text || '').trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

function ConfirmDialog({ title, body, confirmLabel, cancelLabel, onConfirm, onCancel, destructive }) {
  useRegisterModal()
  return (
    <div className='small-wins-confirm' role='dialog' aria-modal='true' aria-label={title}>
      <div className='small-wins-confirm__backdrop' onClick={onCancel} />
      <div className='small-wins-confirm__panel'>
        <h3 className='small-wins-confirm__title'>{title}</h3>
        <p className='small-wins-confirm__body'>{body}</p>
        <div className='small-wins-confirm__actions'>
          <button type='button' className='small-wins-confirm__cancel' onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type='button'
            className={`small-wins-confirm__confirm${destructive ? ' is-destructive' : ''}`}
            onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function SmallWinsEditor() {
  const draft = useSmallWinsStore((s) => s.draft)
  const people = useSmallWinsStore((s) => s.people)
  const saveStatus = useSmallWinsStore((s) => s.saveStatus)
  const setSaveStatus = useSmallWinsStore((s) => s.setSaveStatus)
  const updateDraft = useSmallWinsStore((s) => s.updateDraft)
  const addWhoWith = useSmallWinsStore((s) => s.addWhoWith)
  const removeWhoWith = useSmallWinsStore((s) => s.removeWhoWith)
  const requestClose = useSmallWinsStore((s) => s.requestClose)
  const discardAndClose = useSmallWinsStore((s) => s.discardAndClose)
  const deleteEntry = useSmallWinsStore((s) => s.deleteEntry)

  const [confirmLeave, setConfirmLeave] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const titleRef = useRef(null)
  const wasEmptyRef = useRef(!draft?.title)

  useEffect(() => {
    if (wasEmptyRef.current && titleRef.current) {
      titleRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (saveStatus !== 'saved') return undefined
    const timer = window.setTimeout(() => setSaveStatus('idle'), 1600)
    return () => window.clearTimeout(timer)
  }, [saveStatus, setSaveStatus])

  const suggestionNames = useMemo(() => people.map((p) => p.name), [people])

  if (!draft) return null

  const titleLength = draft.title.length
  const descriptionWords = countWords(draft.description)
  const today = todayIso()

  const handleBack = async () => {
    const closed = await requestClose()
    if (!closed) setConfirmLeave(true)
  }

  const handleDateChange = (event) => {
    const next = event.target.value
    if (!next || isFutureIso(next)) return
    updateDraft({ date: next })
  }

  return (
    <div className='small-wins-editor'>
      <header className='small-wins-editor__header'>Edit your win</header>
      <div className='small-wins-editor__bar'>
        <button type='button' className='small-wins-editor__back' onClick={handleBack}>
          ← {STRINGS.done}
        </button>

        <span
          className={`small-wins-editor__status small-wins-editor__status--${saveStatus}`}
          role='status'
          aria-live='polite'>
          {saveStatus === 'saving' && STRINGS.saving}
          {saveStatus === 'saved' && STRINGS.saved}
          {saveStatus === 'error' && STRINGS.saveError}
        </span>

        <button type='button' className='small-wins-editor__delete' onClick={() => setConfirmDelete(true)}>
          {STRINGS.deleteWin}
        </button>
      </div>

      <div className='small-wins-editor__fields'>
        <div className='small-wins-editor__field'>
          <label className='small-wins-editor__label' htmlFor='sw-title'>
            {STRINGS.titleLabel}
          </label>
          <input
            id='sw-title'
            ref={titleRef}
            className='small-wins-editor__input'
            type='text'
            maxLength={LIMITS.titleMax}
            placeholder={STRINGS.titlePlaceholder}
            value={draft.title}
            onChange={(event) => updateDraft({ title: event.target.value })}
          />
          <span className={`small-wins-editor__counter${titleLength > LIMITS.titleMax * 0.9 ? ' is-near-limit' : ''}`}>
            {titleLength} / {LIMITS.titleMax}
          </span>
        </div>

        <div className='small-wins-editor__field'>
          <label className='small-wins-editor__label' htmlFor='sw-description'>
            {STRINGS.descriptionLabel}
          </label>
          <textarea
            id='sw-description'
            className='small-wins-editor__textarea'
            rows={5}
            placeholder={STRINGS.descriptionPlaceholder}
            value={draft.description}
            onChange={(event) => updateDraft({ description: event.target.value })}
          />
          <span
            className={`small-wins-editor__counter${
              descriptionWords > LIMITS.descriptionMaxWords * 0.9 ? ' is-near-limit' : ''
            }`}>
            {descriptionWords} / {LIMITS.descriptionMaxWords} words
          </span>
        </div>

        <div className='small-wins-editor__field'>
          <label className='small-wins-editor__label' htmlFor='sw-date'>
            {STRINGS.dateLabel}
          </label>
          <input
            id='sw-date'
            className='small-wins-editor__input small-wins-editor__input--date'
            type='date'
            value={draft.date}
            max={today}
            onChange={handleDateChange}
          />
        </div>

        <div className='small-wins-editor__field'>
          <WhoWithTypeahead
            value={draft.whoWith}
            suggestions={suggestionNames}
            onAdd={addWhoWith}
            onRemove={removeWhoWith}
          />
        </div>
      </div>

      {confirmLeave && (
        <ConfirmDialog
          title={STRINGS.discardTitle}
          body={STRINGS.discardBody}
          confirmLabel={STRINGS.discardConfirm}
          cancelLabel={STRINGS.discardCancel}
          destructive
          onCancel={() => setConfirmLeave(false)}
          onConfirm={() => {
            setConfirmLeave(false)
            discardAndClose()
          }}
        />
      )}

      {confirmDelete && (
        <ConfirmDialog
          title={STRINGS.deleteConfirmTitle}
          body={STRINGS.deleteConfirmBody}
          confirmLabel={STRINGS.deleteWin}
          cancelLabel={STRINGS.cancel}
          destructive
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            setConfirmDelete(false)
            deleteEntry(draft.id)
          }}
        />
      )}
    </div>
  )
}
