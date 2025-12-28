import { useState, useEffect } from 'react'
import useAppStore from '@/store/useAppStore'
import ExitButton from 'buttons/exit/ExitButton'
import Dialog from 'components/ui/dialog/Dialog'
import parse from 'html-react-parser'
import PropTypes from 'prop-types'
import './styles.scss'
const Exit = () => {
	
	const quickExitMessageEnabled = useAppStore((state) => state.quickExitMessageEnabled)
	const [showDialog, setShowDialog] = useState(false)
	// const [checked, setChecked] = useState(false)
	
	const enableQuickExitMessage = useAppStore((state) => state.enableQuickExitMessage)

	const message =
		'<p>Your privacy matters.</p><p>This button lets you leave the app immediately and open a neutral website if you need to.</p><p>Use it whenever that feels helpful.</p>'

	const checkBoxInstruction = '<p>Show this message again</p>'

	const handleClick = () => {
	
		if (quickExitMessageEnabled || quickExitMessageEnabled === undefined) {
			setShowDialog(true)
		} else {
			doExit()
		}
	}
	const exitFullscreen = () => {
		if (document.exitFullscreen) {
			document.exitFullscreen()
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen()
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen()
		} else if (document.msExitFullscreen) {
			document.msExitFullscreen()
		}

	}
	const doExit = () => {
		window.open('https://google.com', '_blank', 'noopener,noreferrer,resizable')
		exitFullscreen();
		window.close()
	}
	const handleDialogueCancel = () => {
		setShowDialog(false)
	}
	const handleDialogueConfirm = () => {
		setShowDialog(false)
		enableQuickExitMessage(false)
		doExit();
	}
	const handleCheckboxChange = (e) => {
		setShowDialog(e.target.checked)
		enableQuickExitMessage(e.target.checked)
	}

	return (
		<div className={'quick-exit ' + (showDialog ? ' exit-dialog-open' : ' ')}>
			{showDialog && (
				<Dialog
					show={showDialog}
					title='Quick Exit'
					instruction={message}
					onConfirm={handleDialogueConfirm}
					onCancel={handleDialogueCancel}
					confirmLabel='Continue'
					cancelLabel='Back'
					classes={['exit-dialog']}
				>
					<div className='checkBox-row'>
						<input type='checkbox' id='showAgain' value='showAgain' checked={showDialog} onChange={handleCheckboxChange} />
						<label htmlFor='showAgain'>{parse(checkBoxInstruction)}</label>
					</div>
				</Dialog>
			)}

			<ExitButton handleClick={handleClick} />
		</div>
	)
}
Exit.propTypes = {}
Exit.displayName = 'Exit'
export default Exit
