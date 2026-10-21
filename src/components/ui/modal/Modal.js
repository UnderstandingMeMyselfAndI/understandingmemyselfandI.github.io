import PropTypes from 'prop-types'
import ButtonSimple from '@buttons/ButtonSimple'
import parse from 'html-react-parser'
import { isArrayOfStrings } from '@js/utils'
import DOMPurify from 'dompurify'
import './modal.scss'

const Modal = ({
  children,
  // show,
  title = '',
  instruction,
  confirmLabel = 'Okay',
  onConfirm,
  cancelLabel = 'Cancel',
  onCancel,
  classes,
  showCancel = true,
}) => {
  const handleCancel = () => {
    if (!onCancel) {
      console.warn('No cancel handler passed to modal')
      return
    }

    onCancel()
  }

  const handleConfirm = () => {
    if (!onConfirm) {
      console.warn('No confirm handler passed to modal')
      return
    }
    onConfirm()
  }

  return (
    <div className={'modal' + (classes && classes.length > 0 ? ' ' + classes.join(' ') : '')}>
      <div className='modal__wrap'>
        <div className='modal__inner'>
          <div className='modal__title'>{title}</div>
          {instruction && (
            <div className='modal__instruction' id='modal-instruction'>
              {typeof instruction === 'string' && parse(DOMPurify.sanitize(instruction))}
              {isArrayOfStrings(instruction) && instruction.map((part) => parse(DOMPurify.sanitize(`<p>${part}</p>`)))}
            </div>
          )}
          {children && <div className='modal__content'>{children}</div>}
          <div className='modal__actions'>
            <ButtonSimple label={confirmLabel} handleClick={handleConfirm} classes={['confirm']} />
            {showCancel && <ButtonSimple label={cancelLabel} handleClick={handleCancel} classes={['cancel']} />}
          </div>
        </div>
      </div>
    </div>
  )
}
Modal.propTypes = {
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
Modal.displayName = 'Modal'
export default Modal
