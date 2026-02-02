import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import parse from 'html-react-parser'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import Dialog from '@/components/ui/dialog/Dialog'

import './styles.scss'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
const Setting = (
  name,
  getStateSelector,
  setStateAction,
  instruction,
  help = '',
  classNames,
) => {
  const settingName = name
  const appState = useAppStore(getStateSelector)
  const setAppState = useAppStore(setStateAction)
  const [localState, setLocalState] = useState(appState)
  const handlers = [] // handlers of other settings
  const classes = classNames

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
  const activityID = activities.find((activity) =>
    activity.url === name ? activity.id : null,
  )
  const setIsModal = useAppStore((s) => s.setIsModal)

  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open])

  useEffect(() => {
    setOpen(id === activity)
  }, [activity, isModal])

  //--------------------------------------------------------------------------
  // Settings
  //--------------------------------------------------------------------------

  const settings = []

  const YourToolboxSettings = Setting(
    'YourToolbox',
    (state) => state.toolboxFilterEnabled,
    (state) => state.enableToolboxFilter,
    'Enable "Your Toolbox" filter',
    'Shows a button that filters "the tools" so you see only the tools you favourited.',
    '',
  )
  settings.push(YourToolboxSettings)
  const YourToolsSettings = Setting(
    'YourTools',
    (state) => state.yourToolsEnabled,
    (state) => state.enableYourTools,
    'Enable "Your Tools"',
    'Favourite tools you like, and add them to your "toolbox" for quick access.',
    '',
  )
  YourToolsSettings.addHandler(YourToolboxSettings.handler)
  settings.push(YourToolsSettings)

  const DaysCounterSettings = Setting(
    'DaysCounter',
    (state) => state.daysCounterEnabled,
    (state) => state.enableDaysCounter,
    'Enable Days Counter',
    'Set up to two dates and see how many days since the dates.',
    'new',
  )
  settings.push(DaysCounterSettings)

  const unitsCalculatorSettings = Setting(
    'UnitsCalculator',
    (state) => state.unitsCalculatorEnabled,
    (state) => state.enableUnitsCalculator,
    'Enable Units Calculator',
    'Calculate the total amount of units for different types and measures of alcoholic drinks.',
    'new',
  )
  settings.push(unitsCalculatorSettings)

  const QuickExitSettings = Setting(
    'QuickExit',
    (state) => state.quickExitEnabled,
    (state) => state.enableQuickExit,
    'Enable Quick Exit',
    'Lets you leave the app immediately and open a website whenever you need to',
    'new',
  )
  settings.push(QuickExitSettings)

  const QuickExitMessageSettings = Setting(
    'QuickExitMessage',
    (state) => state.quickExitMessageEnabled,
    (state) => state.enableQuickExitMessage,
    'Show info before Quick Exit',
    '',
    '',
  )
  QuickExitSettings.addHandler(QuickExitMessageSettings.handler)
  settings.push(QuickExitMessageSettings)

  const ShowPhraseViewsSettings = Setting(
    'PhraseViews',
    (state) => state.spv,
    (state) => state.setSpv,
    'Show Lingo & Phrase Views',
    'Changes the buttons when Lingo & Phrases are viewed so that view history can be seen.',
    '',
  )
  settings.push(ShowPhraseViewsSettings)
  const PINLockSettings = Setting(
    'PINLock',
    (state) => state.PINLockEnabled,
    (state) => state.enablePINLock,
    'Use Pin Lock for personal data',
    '*Coming Soon** PIN Lock enables a valid PIN number to access personal data.',
    'soon',
  )
  settings.push(PINLockSettings)

  const AnalyticsCookiesSettings = Setting(
    'AnalyticsCookies',
    (state) => state.allowCookies,
    (state) => state.setAllowCookies,
    'Allow cookies',
    'Accepts the use of anayltics cookies to improve your experience.',
  )
  settings.push(AnalyticsCookiesSettings)

  const handleClearIDB = () => {
    setShowDeleteIDBDialog(true)
  }

  const resetAll = () => {
    YourToolboxSettings.set(true)
    YourToolsSettings.set(true)
    DaysCounterSettings.set(true)
    QuickExitSettings.set(true)
    QuickExitMessageSettings.set(true)
    PINLockSettings.set(true)
    AnalyticsCookiesSettings.set(true)
    unitsCalculatorSettings.set(true)
  }
  const handleClose = () => {
    if (!YourToolsSettings.state) {
      setShowToolsOnly(false)
    }
    // Set all state here to avoid repaint when changin individual settings
    settings.forEach((setting) => setting.update())

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

  return (
    <div
      id='settings'
      className={
        'activity activity-settings fixed' +
        ' ' +
        name +
        (open ? ' show' : ' hide')
      }>
      {/* <Dialog
        show={showDeleteDialog}
        title='Confirm Clear All Data'
        instruction='Do you want to clear all data?<br /><br />This will reset all settings to their default values and cannot be undone.'
        confirmLabel='Yes'
        cancelLabel='Cancel'
        classes={['delete-dialog']}
        onCancel={handleCloseDeleteData}
        onConfirm={handleConfirmDeleteData}
      /> */}
      <Dialog
        show={showDeleteIDBDialog}
        title='Confirm Clear IndexedDB'
        instruction='Do you want to clear all data?<br /><br />This will reset some settings to their default values and cannot be undone.'
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
        // onCancel={handleCloseDeleteData}
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
          <p>
            For complete privacy you can disable and hide all customisable
            features.
          </p>
          <p>You can show and enable features whenever that feels helpful. </p>
          <p>Features that are disabled are completely hidden.</p>
          <p>
            To remove all data use the &quot;Clear Your Data &quot; button
            <br /> at the bottom.
          </p>
        </div>
        <CloseBtn onClick={handleClose} />
        <div className='section'>
          <div className='title'>Your Tools</div>
          <div className={'row ' + YourToolsSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={YourToolsSettings.name}
                className={YourToolsSettings.state ? 'checked' : ''}>
                {parse(YourToolsSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={YourToolsSettings.name}
                value={YourToolsSettings.name}
                checked={YourToolsSettings.state}
                onChange={YourToolsSettings.handler}
              />
            </div>
            {YourToolsSettings.help && (
              <div className='help'>{parse(YourToolsSettings.help)}</div>
            )}
          </div>
          <div className={'row ' + YourToolboxSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={YourToolboxSettings.name}
                className={YourToolboxSettings.state ? 'checked' : ''}>
                {parse(YourToolboxSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={YourToolboxSettings.name}
                value={YourToolboxSettings.name}
                checked={YourToolboxSettings.state}
                onChange={YourToolboxSettings.handler}
              />
            </div>
            {YourToolboxSettings.help && (
              <div className='help'>{parse(YourToolboxSettings.help)}</div>
            )}
          </div>
        </div>
        <div className='section'>
          <div className='title'>Days Counter</div>
          <div className={'row ' + DaysCounterSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={DaysCounterSettings.name}
                className={DaysCounterSettings.state ? 'checked' : ''}>
                {parse(DaysCounterSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={DaysCounterSettings.name}
                value={DaysCounterSettings.name}
                checked={DaysCounterSettings.state}
                onChange={DaysCounterSettings.handler}
              />
            </div>
            {DaysCounterSettings.help && (
              <div className='help'>{parse(DaysCounterSettings.help)}</div>
            )}
          </div>
        </div>
        <div className='section'>
          <div className='title'>Units Calculator</div>
          <div className={'row ' + unitsCalculatorSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={unitsCalculatorSettings.name}
                className={unitsCalculatorSettings.state ? 'checked' : ''}>
                {parse(unitsCalculatorSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={unitsCalculatorSettings.name}
                value={unitsCalculatorSettings.name}
                checked={unitsCalculatorSettings.state}
                onChange={unitsCalculatorSettings.handler}
              />
            </div>
            {unitsCalculatorSettings.help && (
              <div className='help'>{parse(unitsCalculatorSettings.help)}</div>
            )}
          </div>
        </div>

        <div className='section'>
          <div className='title'>Quick Exit</div>
          <div className={'row ' + QuickExitSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={QuickExitSettings.name}
                className={QuickExitSettings.state ? 'checked' : ''}>
                {parse(QuickExitSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={QuickExitSettings.name}
                value={QuickExitSettings.name}
                checked={QuickExitSettings.state}
                onChange={QuickExitSettings.handler}
              />
            </div>
            {QuickExitSettings.help && (
              <div className='help'>{parse(QuickExitSettings.help)}</div>
            )}
          </div>
          {/* <div className='row'>
						<div className='checkBox-row'>
							<label htmlFor={QuickExitURLSettings.name} className={'quick-exit-url'}>
								{parse(QuickExitURLSettings.instruction)}
							</label>
							<input
								type='url'
								className='quick-exit-url'
								id={QuickExitURLSettings.name}
								value={QuickExitURLSettings.state}
								placeholder='https://google.com'
								onKeyUp={QuickExitURLSettings.handler}
							/>
						</div>
						{QuickExitURLSettings.help && <div className='help'>{parse(QuickExitURLSettings.help)}</div>}
					</div> */}
          <div className={'row ' + QuickExitMessageSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={QuickExitMessageSettings.name}
                className={QuickExitMessageSettings.state ? 'checked' : ''}>
                {parse(QuickExitMessageSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={QuickExitMessageSettings.name}
                value={QuickExitMessageSettings.name}
                checked={QuickExitMessageSettings.state}
                onChange={QuickExitMessageSettings.handler}
              />
            </div>
            {QuickExitMessageSettings.help && (
              <div className='help'>{parse(QuickExitMessageSettings.help)}</div>
            )}
          </div>
        </div>

        <div className='section'>
          <div className='title'>Privacy & Your Data</div>

          <div className={'row ' + PINLockSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={PINLockSettings.name}
                className={
                  PINLockSettings.state
                    ? 'strikethrough checked'
                    : 'strikethrough'
                }>
                {parse(PINLockSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={PINLockSettings.name}
                value={PINLockSettings.name}
                checked={PINLockSettings.state}
                onChange={PINLockSettings.handler}
              />
            </div>
            {PINLockSettings.help && (
              <div className='help'>{parse(PINLockSettings.help)}</div>
            )}
          </div>

          <div className={'row ' + AnalyticsCookiesSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={AnalyticsCookiesSettings.name}
                className={AnalyticsCookiesSettings.state ? 'checked' : ''}>
                {parse(AnalyticsCookiesSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={AnalyticsCookiesSettings.name}
                value={AnalyticsCookiesSettings.name}
                checked={AnalyticsCookiesSettings.state}
                onChange={AnalyticsCookiesSettings.handler}
              />
            </div>
            {AnalyticsCookiesSettings.help && (
              <div className='help'>{parse(AnalyticsCookiesSettings.help)}</div>
            )}
          </div>

          <div className={'row ' + ShowPhraseViewsSettings.classes}>
            <div className={'checkBox-row '}>
              <label
                htmlFor={ShowPhraseViewsSettings.name}
                className={ShowPhraseViewsSettings.state ? 'checked' : ''}>
                {parse(ShowPhraseViewsSettings.instruction)}
              </label>
              <input
                type='checkbox'
                id={ShowPhraseViewsSettings.name}
                value={ShowPhraseViewsSettings.name}
                checked={ShowPhraseViewsSettings.state}
                onChange={ShowPhraseViewsSettings.handler}
              />
            </div>
            {ShowPhraseViewsSettings.help && (
              <div className='help'>{parse(ShowPhraseViewsSettings.help)}</div>
            )}
          </div>

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
              <div className='help'>
                The app will reload shortly after data is cleared.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Settings
