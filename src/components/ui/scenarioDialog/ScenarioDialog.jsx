import parse from "html-react-parser";
import { useState, useEffect } from 'react'
import PropTypes from "prop-types";
import ButtonSimple from "../buttons/ButtonSimple";
import "./styles.scss";

const ScenarioDialog = ({ title, content = '', show = false}) => {
	const [open, setOpen] = useState(show)

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		setOpen(true)
	}, [title,content])

	return (
		<div className={'dialog-backdrop' + (open ? '  show' : '')}>
			<div className='scenario-dialog'>
				<div className='scenario-inner'>
					<div className='scenario-title'>{title}</div>
					<div className='scenario-dialog-instruction'>{parse(content)}</div>
					<div className='scenario-dialog-actions'>
						<ButtonSimple label={'Close'} handleClick={handleClose} classes={['close']} />
					</div>
				</div>
			</div>
		</div>
	)
}
ScenarioDialog.propTypes = {
    scenario: PropTypes.object,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	show: PropTypes.bool.isRequired,
}
ScenarioDialog.displayName = 'ScenarioDialog'
export default ScenarioDialog