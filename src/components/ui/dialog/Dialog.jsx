import {useState,useEffect} from "react";
import PropTypes from "prop-types";
import ButtonSimple from "../buttons/ButtonSimple";
import "./styles.scss";

const Dialog = ({show , title = '', instruction = '', confirmLabel = 'Okay', onConfirm, cancelLabel = 'Cancel', onCancel  }) => {

    const [open, setOpen] = useState(show);
    
    const handleCancel = () => {
        setOpen(!open);
        onCancel();
    };
    const handleConfirm = () => {
        onConfirm();
        setOpen(false);
    };
    
    return (
			<div className={'dialog-backdrop' + (open ? '  show' : '')}>
				<div className='dialog'>
					<div className='dialog-inner'>
						<div className='dialog-title'>{title}</div>
						<div className='dialog-instruction'>{instruction}</div>
						<div className='dialog-actions'>
							<ButtonSimple label={confirmLabel} handleClick={handleConfirm} classes={['confirm']} />
							<ButtonSimple label={cancelLabel} handleClick={handleCancel} classes={['cancel']} />
						</div>
					</div>
				</div>
			</div>
		)
}
Dialog.propTypes = {
    title: PropTypes.string.isRequired,
    instruction: PropTypes.string,
    cancelLabel: PropTypes.string,
    confirmLabel: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    classes: PropTypes.array,
    show: PropTypes.bool.isRequired
};
Dialog.displayName = 'Dialog'
export default Dialog;