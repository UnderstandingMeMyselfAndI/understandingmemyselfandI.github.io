import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import parse from 'html-react-parser'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import Dialog from '@/components/ui/dialog/Dialog'
import './styles.scss'

const Settings = () => {
	const name = 'settings'
	const [open, setOpen] = useState(false)
	const [showDeleteDialog, setShowDeleteDialog] = useState(false)
	const setActivity = useAppStore((s) => s.setActivity)
	const activity = useAppStore((s) => s.activity)
	const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))

	useEffect(() => {
		setOpen(activityID.id === activity)
	}, [activity, activityID])

	//--------------------------------------------------------------------------
	// Quick Exit Settings
	//--------------------------------------------------------------------------
	// Show quick exit button

	const exitShowButton = useAppStore((state) => state.exitShowButton)
	const setExitShowButton = useAppStore((state) => state.setExitShowButton)
	const [showExitButton, setShowExitButton] = useState(exitShowButton)
	const showExitButtonInstruction = 'Show quick exit button'
	const handleSetShowExitButton = (e) => {
		setShowExitButton(e.target.checked)
		setExitShowButton(e.target.checked)
	}

	//--------------------------------------------------------------------------
	// Dialog message before quick exit

	const exitShowDialogue = useAppStore((state) => state.exitShowDialogue)
	const setExitShowDialogue = useAppStore((state) => state.setExitShowDialogue)
	const [showDialogBeforeExit, setShowDialogBeforeExit] = useState(exitShowDialogue)
	const dialogBeforeExitInstruction = 'Show message before quick exit'
	const handleSetShowDialogBeforeExit = (e) => {
		setShowDialogBeforeExit(e.target.checked)
		setExitShowDialogue(e.target.checked)
	}
	//--------------------------------------------------------------------------
	// Tools Settings
	//--------------------------------------------------------------------------
	// Show quick exit button

	const toolsShowFilterButton = useAppStore((state) => state.toolsShowFilterButton)
	const setToolsShowFilterButton = useAppStore((state) => state.setToolsShowFilterButton)
	const [showToolsFilterButton, setShowToolsFilterButton] = useState(toolsShowFilterButton)
	const showToolsFilterButtonInstruction = 'Show "Your Tools" filter button'
	const handleSetShowToolFilterButton = (e) => {
		setShowToolsFilterButton(e.target.checked)
		setToolsShowFilterButton(e.target.checked)
	}
	//--------------------------------------------------------------------------
	// Privacy
	//--------------------------------------------------------------------------
	// Analytics Cookies
	//TODO this needs moving from it's own store to here
	const allowCookies = useAppStore((state) => state.allowCookies)
	const setAllowCookies = useAppStore((state) => state.setAllowCookies)
	const [userAllowCookies, setUserAllowCookies] = useState(allowCookies)
	const allowCookiesInstruction = 'Allow cookies'
	const handleSetAllowCookies = (e) => {
		setUserAllowCookies(e.target.checked)
		setAllowCookies(e.target.checked)
	}

	//--------------------------------------------------------------------------
	// Newsletter Cookies
	//TODO this needs moving from it's own store to here
	// const allowNewsletterAnalytics = useAppStore((state) => state.allowCookiesAnalytics)
	// const setAllowCookies = useAppStore((state) => state.setAllowCookies)
	// const [userAllowCookies, setUserAllowCookies] = useState(allowNewsletterAnalytics)
	// const allowCookiesInstruction = 'Allow Newsletter cookies'
	// const handleSetAllowCookiesNewsletter = (e) => {
	// 	setAllowCotoolsShowFilterButtonokiessNewsletter(e.target.checked)
	// 	setUserAllowNewsletterCookies(e.target.checked)
	// }

	//--------------------------------------------------------------------------
	// Use PON Lock
	//TODO this needs moving from it's own store to here
	const usePINLock = useAppStore((state) => state.usePINLock)
	const setUsePINLock = useAppStore((state) => state.setUsePINLock)
	const [userUsePINLock, setUserUsePINLock] = useState(usePINLock)
	const usePINLockInstruction = 'Use Pin Lock for personal data'
	const handleSetUsePINLock = (e) => {
		setUserUsePINLock(e.target.checked)
		setUsePINLock(e.target.checked)
	}

	//--------------------------------------------------------------------------
	// Show Days Counter
	//TODO this needs moving from it's own store to here
	const showDaysCounter = useAppStore((state) => state.showDaysCounter)
	const setShowDaysCounter = useAppStore((state) => state.setShowDaysCounter)
	const [userShowDaysCounter, setUserShowDaysCounter] = useState(showDaysCounter)
	const showDaysCounterInstruction = 'Show Days Counter'
	const handleSetShowDaysCounter = (e) => {
		setUserShowDaysCounter(e.target.checked)
		setShowDaysCounter(e.target.checked)
	}
	//--------------------------------------------------------------------------
	// Enable Your Tools

	const enableYourTools = useAppStore((state) => state.enableYourTools)
	const setEnableYourTools = useAppStore((state) => state.setEnableYourTools)
	const [userEnableYourTools, setUserEnableYourTools] = useState(enableYourTools)
	const enableYourToolsInstruction = 'Enable "Your Tools"'
	const handleSetEnableYourTools = (e) => {
		setEnableYourTools(e.target.checked)
		setUserEnableYourTools(e.target.checked)
	}
	const handleClearUserData = () => {
		setShowDeleteDialog(true)
	}
	const handleClose = () => {
		setActivity(-1)
		setOpen(false)
	}

	const handleConfirmDeleteData = () => {
		setShowDeleteDialog(false)
	}
	const handleCloseDeleteData = () => {
		setShowDeleteDialog(false)
	}

	return (
		<div className={'activity' + ' ' + name + (open ? ' show' : ' hide')}>
			<Dialog
				show={showDeleteDialog}
				title='Confirm Delete All Data'
				instruction='Do you want to delete all data?<br />This cannot be undone.'
				confirmLabel='Yes'
				cancelLabel='Cancel'
				classes={['delete-dialog']}
				onCancel={handleCloseDeleteData}
				onConfirm={handleConfirmDeleteData}
			/>
			<section className={name}>
				<h3>Settings</h3>
				<CloseBtn handleClick={handleClose} />
				<div className='section'>
					<div className='title'>Tools</div>
					<div className='row'>
						{/* <div className='setting-title'>Filter Button</div> */}
						<div className='checkBox-row'>
							<label htmlFor='showToolsFilterButton' className={showToolsFilterButton ? 'checked' : ''}>
								{parse(showToolsFilterButtonInstruction)}
							</label>
							<input type='checkbox' id='showToolsFilterButton' value='showToolsFilterButton' checked={showToolsFilterButton} onChange={handleSetShowToolFilterButton} />
						</div>
					</div>
					<div className='row'>
						{/* <div className='setting-title'>Filter Button</div> */}
						<div className='checkBox-row'>
							<label htmlFor='userEnableYourTools' className={userEnableYourTools ? 'checked' : ''}>
								{parse(enableYourToolsInstruction)}
							</label>
							<input type='checkbox' id='userEnableYourTools' value='userEnableYourTools' checked={userEnableYourTools} onChange={handleSetEnableYourTools} />
						</div>
					</div>
				</div>
				<div className='section'>
					<div className='title'>Days Counter</div>
					<div className='row'>
						{/* <div className='setting-title'>Filter Button</div> */}
						<div className='checkBox-row'>
							<label htmlFor='showDaysCounter' className={userShowDaysCounter ? 'checked' : ''}>
								{parse(showDaysCounterInstruction)}
							</label>
							<input type='checkbox' id='showDaysCounter' value='showDaysCounter' checked={userShowDaysCounter} onChange={handleSetShowDaysCounter} />
						</div>
					</div>
				</div>
				<div className='section'>
					<div className='title'>Quick Exit</div>
					<div className='row'>
						{/* <div className='setting-title'>Button</div> */}
						<div className='checkBox-row'>
							<label htmlFor='showExitButton' className={showExitButton ? 'checked' : ''}>
								{parse(showExitButtonInstruction)}
							</label>
							<input type='checkbox' id='showExitButton' value='showExitButton' checked={showExitButton} onChange={handleSetShowExitButton} />
						</div>
					</div>
					<div className='row'>
						{/* <div className='setting-title'>Show Message</div> */}
						<div className='checkBox-row'>
							<label htmlFor='showAgain' className={showDialogBeforeExit ? 'checked' : ''}>
								{parse(dialogBeforeExitInstruction)}
							</label>
							<input type='checkbox' id='showAgain' value='showAgain' checked={showDialogBeforeExit} onChange={handleSetShowDialogBeforeExit} />
						</div>
					</div>
				</div>

				<div className='section'>
					<div className='title'>Privacy &amp; Your Data</div>
					{/* <div className='setting-title'>PIN Lock</div> */}
					<div className='row'>
						{/* <div className='setting-title'>Filter Button</div> */}
						<div className='checkBox-row'>
							<label htmlFor='usePINLock' className={userUsePINLock ? 'checked' : ''}>
								{parse(usePINLockInstruction)}
							</label>
							<input type='checkbox' id='usePINLock' value='usePINLock' checked={userUsePINLock} onChange={handleSetUsePINLock} />
						</div>
					</div>

					{/* <div className='setting-title'>Cookies</div> */}
					<div className='row'>
						{/* <div className='setting-title'>Filter Button</div> */}
						<div className='checkBox-row'>
							<label htmlFor='allowAnalytics' className={userAllowCookies ? 'checked' : ''}>
								{parse(allowCookiesInstruction)}
							</label>
							<input type='checkbox' id='allowAnalytics' value='allowAnalytics' checked={userAllowCookies} onChange={handleSetAllowCookies} />
						</div>
					</div>
					{/* <div className='row'>

						<div className='checkBox-row'>
							<label htmlFor='allowNewsletterCookies' className={userAllowNewsletterCookies ? 'checked' : ''}>
								{parse(allowNewsletterCookiesInstruction)}
							</label>
							<input type='checkbox' id='allowNewsletterCookies' value='allowNewsletterCookies' checked={userAllowNewsletterCookies} onChange={handleSetAllowCookiesNewsletter} />
						</div>
					</div> */}
					{/* <div className='setting-title delete'>Your data</div> */}
					<div className='row'>
						<div className='setting-title'></div>
						<div className='checkBox-row'>
							<button className='btn btn-delete' onClick={handleClearUserData}>
								Delete Your Data
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Settings

