import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import useAppStore from '@store/useAppStore'
import ButtonSimple from '@buttons/ButtonSimple'
import Backdrop from '@components/backdrop/Backdrop'
import parse from 'html-react-parser'
import { isArrayOfStrings } from '@js/utils'
import DOMPurify from 'dompurify'
import './dialog.scss'

const Dialog = ({
  children,
  // show,
  title = '',
  instruction = '',
  confirmLabel = 'Okay',
  onConfirm,
  cancelLabel = 'Cancel',
  onCancel,
  classes = [],
  showCancel = true,
}) => {
  // const [open, setOpen] = useState(show)
  const contentEl = document.getElementById('dialog-instruction')
  const setShowBurgerStack = useAppStore((state) => state.setShowBurgerStack)
  const handleCancel = () => {
    // setOpen(false)
    onCancel()
  }
  // useEffect(() => {
  //   setShowBurgerStack(!show)
  // }, [open])
  useEffect(() => {
    // setOpen(show)

    const elScrollTop = () => {
      contentEl && contentEl.scrollTo(0, 0)
    }

    // if (show) {
    setTimeout(elScrollTop, 50)
    // elScrollTop()
    // }
  }, [contentEl])

  const handleConfirm = () => {
    onConfirm()
    // setOpen(false)
  }

  return (
    <div className={'dialog' + (classes.length > 0 ? ' ' + classes.join(' ') : '')}>
      <div className='dialog__wrap'>
        <div className='dialog__inner'>
          <div className='dialog__title'>{title}</div>
          {instruction && (
            <div className='dialog__instruction' id='dialog-instruction'>
              {typeof instruction === 'string' && parse(DOMPurify.sanitize(instruction))}
              {isArrayOfStrings(instruction) && instruction.map((part) => parse(DOMPurify.sanitize(`<p>${part}</p>`)))}
            </div>
          )}
          {children && <div className='dialog__content'>{children}</div>}
          <div className='dialog__actions'>
            <ButtonSimple label={confirmLabel} handleClick={handleConfirm} classes={['confirm']} />
            {showCancel && <ButtonSimple label={cancelLabel} handleClick={handleCancel} classes={['cancel']} />}
          </div>
        </div>
      </div>
    </div>
  )
}
Dialog.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  instruction: PropTypes.string || PropTypes.arrayOf(PropTypes.string),
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.array,
  show: PropTypes.bool.isRequired,
  showCancel: PropTypes.bool,
}
Dialog.displayName = 'Dialog'
export default Dialog
