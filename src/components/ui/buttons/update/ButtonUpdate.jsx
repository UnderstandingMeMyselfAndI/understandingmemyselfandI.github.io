import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import useAppStore from '@/store/useAppStore'
import './styles.css'
import PropTypes from 'prop-types'
const ButtonUpdate = () => {
	// const needUpdate = useAppStore((state) => state.needUpdate)
	// const setNeedUpdate = useAppStore((state) => state.setNeedUpdate)
	// if (!needUpdate) return null

	const handleUpdate = async () => {
		const registration = await navigator.serviceWorker.getRegistration()
		if (registration && registration.waiting) {
			console.log('handleUpdate')
			// Send message to SW to skip waiting
			registration.waiting.postMessage({ type: 'SKIP_WAITING' })
			// setNeedUpdate(false)
		}
		window.location.reload()
	}

	// const handleUpdate = () => {}
	return (
		<button onClick={() => handleUpdate()} className='update-btn btn' aria-label={'Update App'}>
			<RefreshOutlinedIcon />
			<div>Update</div>
		</button>
	)
}
ButtonUpdate.propTypes = {
	label: PropTypes.string,
}
export default ButtonUpdate
