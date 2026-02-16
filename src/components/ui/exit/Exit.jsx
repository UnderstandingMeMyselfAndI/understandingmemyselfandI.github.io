import { useState, useEffect } from 'react'
import useAppStore from '@/store/useAppStore'
import ExitButton from 'buttons/exit/ExitButton'
import Dialog from 'components/ui/dialog/Dialog'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

import PropTypes from 'prop-types'
import './styles.scss'
import { clear } from 'console'
const Exit = () => {
  const quickExitMessageEnabled = useAppStore((state) => state.quickExitMessageEnabled)
  const [showDialog, setShowDialog] = useState(false)
  const [show, setShow] = useState(false)
  const showAfterMillis = 10000
  const enableQuickExitMessage = useAppStore((state) => state.enableQuickExitMessage)

  const message =
    '<p>Your privacy matters.</p><p>This button lets you leave the app immediately and open google.com if you need to.</p><p>Use it whenever that feels helpful.</p><p>This message can be turned off below and also controlled in settings.</p>'

  const checkBoxInstruction = '<p>Show this message again</p>'
  useEffect(() => {
    const interval = setTimeout(() => {
      setShow(true)
      clearINterval(interval)
    }, showAfterMillis)
  })

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
    const url = 'https://google.com'
    window.location.replace(url)
    window.location = url
    exitFullscreen()
    window.close()
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
