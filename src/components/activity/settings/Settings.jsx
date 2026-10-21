import { useState } from 'react'
import useAppStore from '@store/useAppStore'
import { strings } from '@data/config.js'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import CloseBtn from '@buttons/close/CloseBtn'
import Dialog from '@ui/dialog/Dialog'
import settingsData from '@data/dataSettings.js'
import './settings.scss'

const Setting = (name, getStateSelector, setStateAction, instruction, help = '', classNames) => {
  const settingName = name
  const appState = useAppStore(getStateSelector)
  const setAppState = useAppStore(setStateAction)
  const [localState, setLocalState] = useState(appState)
  const handlers = [] // handlers of other settings
  const classes = classNames && Array.isArray(classNames) ? classNames.join(' ') : ''

  const getClasses = (classes) => {
    return classes.toString()
  }
  const addHandler = (cb) => {
    handlers.push(cb)
  }
  const handler = (e) => {
    setLocalState(e.target.checked)
    handlers.forEach((cb) => {
      cb(e)
    })
  }

  const update = () => {
    setAppState(localState)
  }
  return {
    name: settingName,
    instruction,
    help,
    appState,
    setState: setAppState,
    state: localState,
    classes,
    getClasses,
    addHandler,
    set: setLocalState,
    handler,
    update,
  }
}

const Settings = () => {
  const name = 'settings'
  const strings_component = strings.activity.find((activity) => activity.url === name)
  const [showDeleteIDBDialog, setShowDeleteIDBDialog] = useState(false)
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)
  const setActivity = useAppStore((s) => s.setActivity)
  const setShowToolsOnly = useAppStore((s) => s.setShowToolsOnly)
  const clearIDB = useAppStore((s) => s.clearIDB)

  const settingsDataWithStateObjects = settingsData.map((group) => {
    return {
      ...group,
      settings: group.settings.map((setting) => {
        return {
          // ...setting,
          stateObject: Setting(
            setting.name,
            setting.stateSelector,
            setting.setStateAction,
            setting.label,
            setting.information,
            setting.classnames,
          ),
        }
      }),
    }
  })
  //--------------------------------------------------------------------------
  // Settings
  //--------------------------------------------------------------------------

  const handleClearIDB = () => {
    setShowDeleteIDBDialog(true)
  }

  const handleClose = () => {
    settingsDataWithStateObjects.forEach((settings) => {
      settings.settings.forEach((setting) => {
        setting.stateObject.name === 'YourToolbox' && setShowToolsOnly(setting.stateObject.state)
      })
    })

    settingsDataWithStateObjects.forEach((settings) => {
      settings.settings.forEach((setting) => {
        setting.stateObject.setState(setting.stateObject.state)
      })
    })

    // setOpen(false)
    setActivity(-1)
  }
  const handleCloseConfirmDeleteDialog = () => {
    setShowConfirmDeleteDialog(false)
  }

  const handleConfirmDeleteIDB = () => {
    clearIDB()
    setShowDeleteIDBDialog(false)
  }

  const handleCloseDeleteIDB = () => {
    setShowDeleteIDBDialog(false)
  }

  return (
    <div id='settings' className={`activity activity-${name} fixed show`}>
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
      <section className='settings'>
        <h3>{parse(strings_component.title)}</h3>
        <div className='settings__head'>
          <div className='settings__section-title'>{parse(strings_component.content.section.title)}</div>
          <div className='settings__section-content'>{parse(strings_component.content.section.content)}</div>
        </div>
        <CloseBtn onClick={handleClose} />

        {settingsDataWithStateObjects.map((group, key) => (
          <div className='settings__group' key={key}>
            <div className='settings__group-title'>{group.groupTitle}</div>
            <div>
              {group.settings.map((setting, index) => (
                <div
                  className={
                    'settings__group-row ' +
                    setting.stateObject.classes +
                    (setting.stateObject.state ? ' feature-active' : ' feature-inactive')
                  }
                  key={index}>
                  <div className={'settings__group-check-box-row'}>
                    <label htmlFor={setting.stateObject.name} className={setting.stateObject.state ? 'checked' : ''}>
                      {parse(DOMPurify.sanitize(setting.stateObject.instruction))}
                    </label>
                    <input
                      type='checkbox'
                      id={setting.stateObject.name}
                      value={setting.stateObject.name}
                      checked={setting.stateObject.state}
                      onChange={setting.stateObject.handler}
                    />
                  </div>
                  {setting.stateObject.help && (
                    <div className='settings_group-info'>{parse(DOMPurify.sanitize(setting.stateObject.help))}</div>
                  )}
                </div>
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

              <button className='settings__group-btn btn' onClick={() => handleClose()}>
                {parse(strings_component.actions.buttons.closeActivity)}
              </button>
            </div>

            <div className='settings__group-check-box-row'>
              <div className='settings__group-help'> {parse(strings_component.actions.buttons.footer)}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Settings
