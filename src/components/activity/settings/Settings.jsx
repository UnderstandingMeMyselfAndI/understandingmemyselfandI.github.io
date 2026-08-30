import { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import useAppStore from '@store/useAppStore'
import { activities } from '@data/config.js'
import CloseBtn from '@buttons/close/CloseBtn'
import Dialog from '@ui/dialog/Dialog'
import settingsData from './settingsData.js'
import './styles.scss'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
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
  const id = 12
  const [open, setOpen] = useState(false)
  // const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteIDBDialog, setShowDeleteIDBDialog] = useState(false)
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)
  const setActivity = useAppStore((s) => s.setActivity)
  // const showToolsOnly = useAppStore((s) => s.showToolsOnly)
  const setShowToolsOnly = useAppStore((s) => s.setShowToolsOnly)
  const activity = useAppStore((s) => s.activity)
  const clearIDB = useAppStore((s) => s.clearIDB)
  const isModal = useAppStore((s) => s.isModal)
  const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))
  const setIsModal = useAppStore((s) => s.setIsModal)

  // TODO: The settingsDataWithStateObjects contains the configs that need implements
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

  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open, setIsModal, activitiesById, id])

  useEffect(() => {
    setOpen(id === activity)
  }, [activity, id])

  //--------------------------------------------------------------------------
  // Settings
  //--------------------------------------------------------------------------

  const handleClearIDB = () => {
    setShowDeleteIDBDialog(true)
  }

  const handleClose = () => {
    console.log(' YourToolsSettings ', settingsDataWithStateObjects)

    const YouurToolsSettings = settingsDataWithStateObjects.find((stateObject) => stateObject.name === 'YourToolbox')

    settingsDataWithStateObjects.forEach((settings) => {
      settings.settings.forEach((setting) => {
        setting.stateObject.name === 'YourToolbox' && setShowToolsOnly(setting.stateObject.state)
      })
    })

    settingsDataWithStateObjects.forEach((settings) => {
      settings.settings.forEach((setting) => {
        console.log(' ----------------------------------------- ')
        console.log(' setting.stateObject.state ', setting.stateObject.state)
        console.log(' setting.stateObject.setState ', setting.stateObject.setState)

        console.log(' setting.stateObject.name ', setting.stateObject.name)
        setting.stateObject.setState(setting.stateObject.state)
      })
    })

    // const YourToolsSettings = settingsDataWithStateObjects.settings.find((setting) => setting.name === 'YourToolbox')
    // console.log(' YourToolsSettings ', YourToolsSettings)
    // if (!YourToolsSettings.state) {
    //   setShowToolsOnly(false)
    // }
    // Set all state here to avoid repaint when changing individual settings

    // group.settings.map((setting) => setting.stateObject.update())

    setOpen(false)
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

  return open ? (
    <div id='settings' className={'activity activity-settings fixed' + ' ' + name + (open ? ' show' : ' hide')}>
      <Dialog
        show={showDeleteIDBDialog}
        title='Confirm Clear Data'
        instruction='Are you sure you want to clear all data?<br /><br />This will reset some settings to their default values and cannot be undone.'
        confirmLabel='Yes'
        cancelLabel='Cancel'
        classes={['delete-dialog']}
        onCancel={handleCloseDeleteIDB}
        onConfirm={handleConfirmDeleteIDB}
      />
      <Dialog
        show={showConfirmDeleteDialog}
        title='Data Cleared'
        instruction='All data has been permanently cleared.'
        confirmLabel='Close'
        cancelLabel=''
        classes={['delete-dialog']}
        showCancel={false}
        onConfirm={handleCloseConfirmDeleteDialog}
      />
      <section className={name}>
        <h3>Settings</h3>
        <div className='head'>
          <p>
            <b>
              <u>Your privacy is very important to us.</u>
            </b>
          </p>
          <p>For complete privacy you can disable and hide all customisable features.</p>
          <p>You can show and enable features whenever that feels helpful. </p>
          <p>Features that are disabled are completely hidden.</p>
          <p>
            To remove all data use the &quot;Clear Your Data &quot; button
            <br /> at the bottom.
          </p>
        </div>
        <CloseBtn onClick={handleClose} />

        {settingsDataWithStateObjects.map((group, key) => (
          <div className='section' key={key}>
            <div className='title'>{group.groupTitle}</div>
            <div>
              {group.settings.map((setting, index) => (
                <div className={'row ' + setting.stateObject.classes} key={index}>
                  <div className={'checkBox-row '}>
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
                    <div className='help'>{parse(DOMPurify.sanitize(setting.stateObject.help))}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className='section'>
          <div className='row'>
            <div className='setting-title'></div>
            <div className='checkBox-row btns-bottom'>
              <button className='btn btn-delete' onClick={handleClearIDB}>
                Clear Your Data
              </button>

              <button className='btn' onClick={() => handleClose()}>
                Close
              </button>
            </div>

            <div className='checkBox-row'>
              <div className='help'>The app will reload shortly after data is cleared.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : null
}

export default Settings
