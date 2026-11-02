import PropTypes from "prop-types"
import ButtonSimple from "@buttons/ButtonSimple"
import "./modal.scss"

const Modal = ({
  children,
  title = "",
  instruction = "",
  confirmLabel = "Okay",
  confirmDisabled = false,
  onConfirm,
  cancelLabel = "Cancel",
  onCancel,
  classes,
  showCancel = false,
  showConfirm = false,
}) => {
  const handleCancel = () => {
    if (!onCancel) { console.warn("No cancel handler passed to modal"); return }
    onCancel()
  }

  const handleConfirm = () => {
    if (!onConfirm) { console.warn("No confirm handler passed to modal"); return }
    onConfirm()
  }

  return (
    <div className={"modal" + (classes && classes.length > 0 ? " " + classes.join(" ") : "")}>
      <div className='modal__inner'>
        <div className='modal__title'>
          <h4>{title}</h4>
        </div>
        {instruction && <div className='modal__instruction'>{instruction}</div>}
        {children && <div className='modal__content'>{children}</div>}
        <div className='modal__actions'>
          {showConfirm && (
            <ButtonSimple
              label={confirmLabel}
              handleClick={handleConfirm}
              classes={["confirm"]}
              disabled={confirmDisabled}
            />
          )}
          {showCancel && <ButtonSimple label={cancelLabel} handleClick={handleCancel} classes={["cancel"]} />}
        </div>
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  instruction: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  confirmDisabled: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  classes: PropTypes.array,
  showCancel: PropTypes.bool,
  showConfirm: PropTypes.bool,
}

Modal.displayName = "Modal"
export default Modal