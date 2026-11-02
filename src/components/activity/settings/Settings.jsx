import { useState } from 'react'
import useAppStore from '@store/useAppStore'
import { usePrivateStore } from '@store/usePrivateStore'
import { hasPasscode } from '@utils/securityGate'
import { strings } from '@data/config.js'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import CloseBtn from '@buttons/close/CloseBtn'
import Modal from '@ui/modal/Modal'
import settingsData from '@data/dataSettings.js'
import './settings.scss'

function SettingRow({ setting }) {
  const isPrivate = setting.store === 'private'
  const store = isPrivate ? usePrivateStore : useAppStore

  const value = store(setting.stateSelector)
  const setter = store(setting.setStateAction)

  if (typeof setter !== 'function' && import.meta.env.DEV) {
    console.error(
      `[Settings] No setter for "${setting.name}". Store: ${isPrivate ? 'private' : 'app'}.`,
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
  const [alsoClearPasscode, setAlsoClearPasscode] = useState(false)
  const hasPasscodeSet = hasPasscode()

  const setActivity = useAppStore((s) => s.setActivity)
  const clearIDB = useAppStore((s) => s.clearIDB)

  const handleClearIDB = () => setShowDeleteIDBDialog(true)

  const handleClose = () => {
    const yourToolsEnabled = usePrivateStore.getState().yourToolsEnabled
    useAppStore.getState().setShowToolsOnly(yourToolsEnabled)
    setActivity(-1)
  }

  const handleConfirmDeleteIDB = async () => {
    try {
      await clearIDB({ alsoClearPasscode: hasPasscodeSet && alsoClearPasscode })
    } catch (err) {
      console.error('[Settings] clearIDB failed:', err)
    }
    setShowDeleteIDBDialog(false)
    setAlsoClearPasscode(false)
  }

  const handleCloseDeleteIDB = () => {
    setShowDeleteIDBDialog(false)
    setAlsoClearPasscode(false)
  }

  return (
    <section id='settings' className={`activity activity-${name} bg `}>
      {showDeleteIDBDialog && (
        <Modal
          title={strings_component.actions.data.delete.title}
          showConfirm
          showCancel
          confirmLabel={strings_component.actions.data.delete.buttons.confirm}
          cancelLabel={strings_component.actions.data.delete.buttons.cancel}
          onConfirm={handleConfirmDeleteIDB}
          onCancel={handleCloseDeleteIDB}>
          <p className='pc-dialog__lede'>
            {parse(DOMPurify.sanitize(strings_component.actions.data.delete.msg))}
          </p>

          {hasPasscodeSet && (
            <>
              <label className='settings__delete-checkbox'>
                <input
                  type='checkbox'
                  checked={alsoClearPasscode}
                  onChange={(e) => setAlsoClearPasscode(e.target.checked)}
                />
                <span>Also remove passcode protection</span>
              </label>
              <p className='pc-dialog__menu-sub'>
                {alsoClearPasscode
                  ? 'Your passcode and biometric unlock will be removed. The app will be unprotected.'
                  : 'Your passcode will remain set. You will need it next time you open the app.'}
              </p>
            </>
          )}
        </Modal>
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