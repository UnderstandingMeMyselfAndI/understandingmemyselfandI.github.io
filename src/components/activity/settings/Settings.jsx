import { useState } from 'react'
import useAppStore from '@store/useAppStore'
import { usePrivateStore } from '@store/usePrivateStore'
import { strings } from '@data/config.js'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import CloseBtn from '@buttons/close/CloseBtn'
import Dialog from '@ui/dialog/Dialog'
import settingsData from '@data/dataSettings.js'
import './settings.scss'

/**
 * One settings row. Reads from the store declared by `setting.store`
 * ('app' | 'private'). Defensive: if the setter doesn't exist, log a clear
 * error and disable the row rather than throwing.
 */
function SettingRow({ setting }) {
  const isPrivate = setting.store === 'private'
  const store = isPrivate ? usePrivateStore : useAppStore

  const value = store(setting.stateSelector)
  const setter = store(setting.setStateAction)

  if (typeof setter !== 'function' && import.meta.env.DEV) {
    console.error(
      `[Settings] No setter for "${setting.name}". ` +
        `Store: ${isPrivate ? 'private' : 'app'}. ` +
        `Check dataSettings.js: does "${setting.store ?? 'app'}" store have this action?`,
    )
  }

  const onToggle = (event) => {
    if (typeof setter !== 'function') return
    setter(event.target.checked)
  }

  const extraClasses = Array.isArray(setting.classnames) ? setting.classnames.join(' ') : ''
  const rowClasses = ['settings__group-row', extraClasses, value ? 'feature-active' : 'feature-inactive']
    .filter(Boolean)
    .join(' ')

  return (
    <div className={rowClasses}>
      <div className='settings__group-check-box-row'>
        <label htmlFor={setting.name} className={value ? 'checked' : ''}>
          {parse(DOMPurify.sanitize(setting.label))}
        </label>
        <input
          type='checkbox'
          id={setting.name}
          value={setting.name}
          checked={Boolean(value)}
          onChange={onToggle}
          disabled={typeof setter !== 'function'}
        />
      </div>
      {setting.information && (
        <div className='settings_group-info'>{parse(DOMPurify.sanitize(setting.information))}</div>
      )}
    </div>
  )
}

const Settings = () => {
  const name = 'settings'
  const strings_component = strings.activity.find((activity) => activity.url === name)

  const [showDeleteIDBDialog, setShowDeleteIDBDialog] = useState(false)
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)

  const setActivity = useAppStore((s) => s.setActivity)
  const clearIDB = useAppStore((s) => s.clearIDB)

  const handleClearIDB = () => setShowDeleteIDBDialog(true)

  const handleClose = () => {
    // Sync the ephemeral `showToolsOnly` carousel filter with the persisted
    // `yourToolsEnabled` flag so the carousel matches the setting on next open.
    const yourToolsEnabled = usePrivateStore.getState().yourToolsEnabled
    useAppStore.getState().setShowToolsOnly(yourToolsEnabled)
    setActivity(-1)
  }

  const handleCloseConfirmDeleteDialog = () => setShowConfirmDeleteDialog(false)
  const handleConfirmDeleteIDB = () => {
    clearIDB()
    setShowDeleteIDBDialog(false)
  }
  const handleCloseDeleteIDB = () => setShowDeleteIDBDialog(false)

  return (
    <section id='settings' className={`activity activity-${name} bg `}>
      {showDeleteIDBDialog && (
        <Dialog
          show={showDeleteIDBDialog}
          title={strings_component.actions.data.delete.title}
          instruction={strings_component.actions.data.delete.msg}
          confirmLabel={strings_component.actions.data.delete.buttons.confirm}
          cancelLabel={strings_component.actions.data.delete.buttons.cancel}
          classes={['delete-dialog']}
          onCancel={handleCloseDeleteIDB}
          onConfirm={handleConfirmDeleteIDB}
        />
      )}
      {showConfirmDeleteDialog && (
        <Dialog
          show={showConfirmDeleteDialog}
          title={strings_component.actions.data.delete.confirm.title}
          instruction={strings_component.actions.data.delete.confirm.msg}
          confirmLabel={strings_component.actions.data.delete.confirm.buttons.confirm}
          cancelLabel={strings_component.actions.data.delete.confirm.buttons.cancel}
          classes={['delete-dialog']}
          showCancel={false}
          onConfirm={handleCloseConfirmDeleteDialog}
        />
      )}

      <div className='settings'>
        <h3>{parse(strings_component.title)}</h3>
        <div className='settings__head'>
          <div className='settings__section-title'>{parse(strings_component.content.section.title)}</div>
          <div className='settings__section-content'>{parse(strings_component.content.section.content)}</div>
        </div>
        <CloseBtn onClick={handleClose} />

        {settingsData.map((group, groupKey) => (
          <div className='settings__group' key={groupKey}>
            <div className='settings__group-title'>{group.groupTitle}</div>
            <div>
              {group.settings.map((setting, index) => (
                <SettingRow key={setting.name ?? index} setting={setting} />
              ))}
            </div>
          </div>
        ))}

        <div className='settings__group'>
          <div className='settings__group-row'>
            <div className='settings__group-check-box-row settings__group-btns'>
              <button className='settings__group-btn btn btn-delete' onClick={handleClearIDB}>
                {parse(strings_component.actions.buttons.deleteData)}
              </button>

              <button className='settings__group-btn btn' onClick={handleClose}>
                {parse(strings_component.actions.buttons.closeActivity)}
              </button>
            </div>

            <div className='settings__group-check-box-row'>
              <div className='settings__group-help'>{parse(strings_component.actions.buttons.footer)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
