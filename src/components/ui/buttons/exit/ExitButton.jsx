import useAppStore from '@/store/useAppStore';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import PropTypes from "prop-types";
import './styles.scss'
const ExitButton = ({ handleClick }) => {
	// const exitShowDialogue = useAppStore((state) => state.exitShowMessage)

	const classes = []
	const label = 'Exit'
	// const handleClick = () => {
	// 	if (!exitShowDialogue) {
	// 		window.open('https://google.com', '_blank')
	// 		window.close()
	// 	}
	// }

	return (
		<div className={'exit-btn' + classes.map((c) => ' ' + c)} onClick={handleClick}>
			<ExitToAppOutlinedIcon className='icon' />
			{/* <div>{label}</div> */}
		</div>
	)
}
ExitButton.propTypes = {
	handleClick: PropTypes.func.isRequired
}
ExitButton.displayName = 'ExitButton'
export default ExitButton
