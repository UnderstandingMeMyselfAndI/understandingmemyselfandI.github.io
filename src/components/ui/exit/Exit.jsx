import { useState, useEffect } from 'react'
import useAppStore from '@store/useAppStore'
import ExitButton from '@buttons/exit/ExitButton'
import Dialog from '@components/ui/dialog/Dialog'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

import PropTypes from 'prop-types'
import './styles.scss'

const Exit = () => {
  const quickExitMessageEnabled = useAppStore((state) => state.quickExitMessageEnabled)
  const [showDialog, setShowDialog] = useState(false)
  const [show, setShow] = useState(false)
  const showAfterMillis = quickExitMessageEnabled ? 0 : 10000
  const enableQuickExitMessage = useAppStore((state) => state.enableQuickExitMessage)

  const message = [
    'Your privacy matters.',
    'This button lets you leave the app immediately and open google.com if you need to.',
    'Use it whenever that feels helpful.',
    'This message can be turned off below and also controlled in settings.',
  ]

  const checkBoxInstruction = '<p>Show this message again</p>'
  useEffect(() => {
    const interval = setTimeout(() => {
      setShow(true)
      clearInterval(interval)
    }, showAfterMillis)
  })

  const handleClick = () => {
    if (quickExitMessageEnabled || quickExitMessageEnabled === undefined) {
      setShowDialog(true)
    } else {
      doExit()
    }
  }
  const exitFullscreen = async () => {
    console.log('Document.fullscreenElement ', Document.fullscreenElement)
  if (document.fullscreenElement) {
    try {
      await document.exitFullscreen()
    } catch (e) {
      console.error(e)
    }
  } else if (document.webkitExitFullscreen) {
    try {
      await document.webkitExitFullscreen()
    } catch (e) {
      console.error(e)
    }
  } else if (document.mozCancelFullScreen) {
    try {
      await document.mozCancelFullScreen()
    } catch (e) {
      console.error(e)
    }
  } else if (document.msExitFullscreen) {
    try {
      await document.msExitFullscreen()
    } catch (e) {
      console.error(e)
    }
  }
  }
  const doExit = () => {
    const url = 'https://google.com'
    window.location.replace(url)
    window.location = url
    exitFullscreen()
  }
  const handleDialogueCancel = () => {
    setShowDialog(false)
  }
  const handleDialogueConfirm = () => {
    setShowDialog(false)
    enableQuickExitMessage(false)
    doExit()
  }
  const handleCheckboxChange = (e) => {
    setShowDialog(e.target.checked)
    enableQuickExitMessage(e.target.checked)
  }

  return show ? (
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
          classes={['exit-dialog']}>
          <div className='checkBox-row'>
            <input
              type='checkbox'
              id='showAgain'
              value='showAgain'
              checked={showDialog}
              onChange={handleCheckboxChange}
            />
            <label htmlFor='showAgain'>{parse(DOMPurify.sanitize(checkBoxInstruction))}</label>
          </div>
        </Dialog>
      )}

      <ExitButton handleClick={handleClick} />
    </div>
  ) : null
}
Exit.propTypes = {}
Exit.displayName = 'Exit'
export default Exit
