import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import parse from 'html-react-parser'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import Dialog from '@/components/ui/dialog/Dialog'
import './styles.scss'

const Setting = (name, getStateSelector, setStateAction, instruction, help = '') => {
	const settingName = name
	const appState = useAppStore(getStateSelector)
	const setAppState = useAppStore(setStateAction)
	const [localState, setLocalState] = useState(appState)
	const handlers = [] // handlers of other settings
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
		addHandler,
		set: setLocalState,
		handler,
		update,
	}
}


const Settings = () => {
	const name = 'settings'
	const [open, setOpen] = useState(false)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false)
	const setActivity = useAppStore((s) => s.setActivity)
	const showToolsOnly = useAppStore((s) => s.showToolsOnly)
	const setShowToolsOnly = useAppStore((s) => s.setShowToolsOnly)
	const activity = useAppStore((s) => s.activity)
	const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))

	useEffect(() => {
		setOpen(activityID.id === activity)
	}, [activity, activityID])

	//--------------------------------------------------------------------------
	// Settings
	//--------------------------------------------------------------------------

	const settings = []

	const YourToolboxSettings = Setting(
		'YourToolbox',
		(state) => state.toolboxFilterEnabled,
		(state) => state.enableToolboxFilter,
		'Enable "Your Toolbox" filter button',
		'Shows only the tools in your toolbox.',
	)
	settings.push(YourToolboxSettings)
	const YourToolsSettings = Setting(
		'YourTools',
		(state) => state.yourToolsEnabled,
		(state) => state.enableYourTools,
		'Enable "Your Tools"',
		'Favourite tools you like, and add them to your "toolbox" for quick access.',
	)
	YourToolsSettings.addHandler(YourToolboxSettings.handler)
	settings.push(YourToolsSettings)

	const DaysCounterSettings = Setting(
		'DaysCounter',
		(state) => state.daysCounterEnabled,
		(state) => state.enableDaysCounter,
		'Enable Days Counter',
		'Set up to two dates and see how many days since the dates.',
	)
	settings.push(DaysCounterSettings)

	const QuickExitSettings = Setting(
		'QuickExit',
		(state) => state.quickExitEnabled,
		(state) => state.enableQuickExit,
		'Enable Quick Exit',
		'Lets you leave the app immediately and open a website whenever you need to',
	)
	settings.push(QuickExitSettings)

	const QuickExitMessageSettings = Setting(
		'QuickExitMessage',
		(state) => state.quickExitMessageEnabled,
		(state) => state.enableQuickExitMessage,
		'Show help message before Quick Exit',
		'',
	)
	QuickExitSettings.addHandler(QuickExitMessageSettings.handler)
	settings.push(QuickExitMessageSettings)

	const PINLockSettings = Setting(
		'PINLock',
		(state) => state.PINLockEnabled,
		(state) => state.enablePINLock,
		'Use Pin Lock for personal data',
		'PIN Lock requires a valid PIN number to access personal data.',
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

	const handleClearUserData = () => {
		setShowDeleteDialog(true)
	}
	const resetAll = () => {
		YourToolboxSettings.set(true)
		YourToolsSettings.set(true)
		DaysCounterSettings.set(true)
		QuickExitSettings.set(true)
		QuickExitMessageSettings.set(true)
		PINLockSettings.set(true)
		AnalyticsCookiesSettings.set(true)
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
	const handleConfirmDeleteData = () => {
		localStorage.clear()
		resetAll()
		setShowConfirmDeleteDialog(true)
		setShowDeleteDialog(false)
	}
	const handleCloseDeleteData = () => {
		setShowDeleteDialog(false)
	}

	return (
		<div className={'activity' + ' ' + name + (open ? ' show' : ' hide')}>
			<Dialog
				show={showDeleteDialog}
				title='Confirm Clear All Data'
				instruction='Do you want to clear all data?<br /><br />This will reset all settings to their default values and cannot be undone.'
				confirmLabel='Yes'
				cancelLabel='Cancel'
				classes={['delete-dialog']}
				onCancel={handleCloseDeleteData}
				onConfirm={handleConfirmDeleteData}
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
					<p>For complete privacy you can disable all customisable features.</p>
					<p>You can re-enable features whenever that feels helpful. </p>
					<p>
						Features that are disabled are hidden. <br />
						You can re-enable features at any time when you need them.
					</p>
					<p>
						To remove all data use the "Clear Your Data" button
						<br /> at the bottom.
					</p>
				</div>
				<CloseBtn handleClick={handleClose} />
				<div className='section'>
					<div className='title'>Your Tools</div>
					<div className='row'>
						<div className='checkBox-row'>
							<label htmlFor={YourToolsSettings.name} className={YourToolsSettings.state ? 'checked' : ''}>
								{parse(YourToolsSettings.instruction)}
							</label>
							<input type='checkbox' id={YourToolsSettings.name} value={YourToolsSettings.name} checked={YourToolsSettings.state} onChange={YourToolsSettings.handler} />
						</div>
						{YourToolsSettings.help && <div className='help'>{parse(YourToolsSettings.help)}</div>}
					</div>
					<div className='row'>
						<div className='checkBox-row'>
							<label htmlFor={YourToolboxSettings.name} className={YourToolboxSettings.state ? 'checked' : ''}>
								{parse(YourToolboxSettings.instruction)}
							</label>
							<input type='checkbox' id={YourToolboxSettings.name} value={YourToolboxSettings.name} checked={YourToolboxSettings.state} onChange={YourToolboxSettings.handler} />
						</div>
						{YourToolboxSettings.help && <div className='help'>{parse(YourToolboxSettings.help)}</div>}
					</div>
				</div>
				<div className='section'>
					<div className='title'>Days Counter</div>
					<div className='row'>
						<div className='checkBox-row'>
							<label htmlFor={DaysCounterSettings.name} className={DaysCounterSettings.state ? 'checked' : ''}>
								{parse(DaysCounterSettings.instruction)}
							</label>
							<input type='checkbox' id={DaysCounterSettings.name} value={DaysCounterSettings.name} checked={DaysCounterSettings.state} onChange={DaysCounterSettings.handler} />
						</div>
						{DaysCounterSettings.help && <div className='help'>{parse(DaysCounterSettings.help)}</div>}
					</div>
				</div>
				<div className='section'>
					<div className='title'>Quick Exit</div>
					<div className='row'>
						<div className='checkBox-row'>
							<label htmlFor={QuickExitSettings.name} className={QuickExitSettings.state ? 'checked' : ''}>
								{parse(QuickExitSettings.instruction)}
							</label>
							<input type='checkbox' id={QuickExitSettings.name} value={QuickExitSettings.name} checked={QuickExitSettings.state} onChange={QuickExitSettings.handler} />
						</div>
						{QuickExitSettings.help && <div className='help'>{parse(QuickExitSettings.help)}</div>}
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
					<div className='row'>
						<div className='checkBox-row'>
							<label htmlFor={QuickExitMessageSettings.name} className={QuickExitMessageSettings.state ? 'checked' : ''}>
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
						{QuickExitMessageSettings.help && <div className='help'>{parse(QuickExitMessageSettings.help)}</div>}
					</div>
				</div>

				<div className='section'>
					<div className='title'>Privacy &amp; Your Data</div>

					<div className='row'>
						<div className='checkBox-row strikethrough'>
							<label htmlFor={PINLockSettings.name} className={PINLockSettings.state ? 'strikethrough checked' : 'strikethrough'}>
								{parse(PINLockSettings.instruction)}
							</label>
							<input type='checkbox' id={PINLockSettings.name} value={PINLockSettings.name} checked={PINLockSettings.state} onChange={PINLockSettings.handler} />
						</div>
						{PINLockSettings.help && <div className='help'>{parse(PINLockSettings.help)}</div>}
					</div>

					<div className='row'>
						<div className='checkBox-row'>
							<label htmlFor={AnalyticsCookiesSettings.name} className={AnalyticsCookiesSettings.state ? 'checked' : ''}>
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
						{AnalyticsCookiesSettings.help && <div className='help'>{parse(AnalyticsCookiesSettings.help)}</div>}
					</div>

					<div className='row'>
						<div className='setting-title'></div>
						<div className='checkBox-row'>
							<button className='btn btn-delete' onClick={handleClearUserData}>
								Clear Your Data
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Settings

