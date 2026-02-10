import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ButtonSimple from '../buttons/ButtonSimple'
import parse from 'html-react-parser'
import './styles.scss'

const Confirm = ({
  title = '',
  instruction = '',
  confirmLabel = 'Okay',
  onConfirm,
  cancelLabel = 'Cancel',
  onCancel,
  showCancel = true,
  classes = [],
  showConfirm = false,
  isfullscreen = true,
}) => {
  const [show, setShow] = useState(false)
  const handleConfirm = () => {
    setShow(false)
    onConfirm()
  }

  const handleCancel = () => {
    setShow(false)
    onCancel()
  }

  useEffect(() => {
    setShow(showConfirm)
  }, [showConfirm])

  return (
    <div
      className={
        'confirm-pop-up show ' +
        classes.map((c) => ' ' + c) +
        ' ' +
        (isfullscreen ? 'fullscreen' : '')
      }>
      <div className='confirm-pop-up-inner'>
        <div className='confirm-pop-up-title'>{parse(title)}</div>
        <div className='confirm-pop-up-instruction'>{parse(instruction)}</div>
        <div className='confirm-pop-up-buttons'>
          {showCancel && (
            <ButtonSimple
              classes={['cancel']}
              label={cancelLabel ? cancelLabel : 'Cancel'}
              handleClick={handleCancel}
            />
          )}{' '}
          <ButtonSimple
            classes={['confirm']}
            label={confirmLabel ? confirmLabel : 'Ok'}
            handleClick={handleConfirm}
          />
        </div>
      </div>
    </div>
  )
}

Confirm.propTypes = {
  title: PropTypes.string.isRequired,
  instruction: PropTypes.string,
  confirmLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  classes: PropTypes.array,
  showCancel: PropTypes.bool,
  onCancel: PropTypes.func,
  cancelLabel: PropTypes.string,
  isfullscreen: PropTypes.bool,
  showConfirm: PropTypes.bool,
}
Confirm.displayName = 'Confirm'
export default Confirm
