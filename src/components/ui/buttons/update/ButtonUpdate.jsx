import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined'
import './styles.css'
import PropTypes from 'prop-types'
const ButtonUpdate = ({ handleUpdate, updating, label }) => {
  // const version = useAppStore((state) => state.version)
  // const setVersion = useAppStore((state) => state.setVersion) // Update version
  // const [updating, setUpdating] = useState(false)
  // async function getVersion() {
  // 	const url = 'https://ummi.now/metadata.json'

  // 	const reqResponse = await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-cache' })
  // 		.then((response) => {
  // 			if (!response.ok) {
  // 				throw new Error(`Response status: ${response.status}`)
  // 			}
  // 			console.log('getVersion', response.json())
  // 			return response.json()
  // 		})
  // 		.catch((error) => {
  // 			console.log('getVersion error', error)
  // 			return false //error.message
  // 		})
  // }

  // const handleUpdate = async () => {
  // 	setUpdating(true)
  // 	const versionRemote = getVersion()
  // 	if (versionRemote) {
  // 		const versionRemoteString = JSON.stringify(versionRemote)
  // 		setVersion(versionRemoteString)
  // 	}

  // 	// const registration = await navigator.serviceWorker.getRegistration()
  // 	// if (registration && registration.waiting) {
  // 	// 	console.log('handleUpdate')
  // 	// 	// Send message to SW to skip waiting
  // 	// 	registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  // 	// 	// setNeedUpdate(false)
  // 	// }
  // 	// window.location.reload()
  // }

  // const handleUpdate = () => {}
  return (
    <button
      onClick={handleUpdate}
      className={'update-btn btn' + (updating ? ' updating' : '')}
      aria-label={'Update App'}
    >
      <RefreshOutlinedIcon className={updating ? 'spin' : ''} />
      <div>{label}</div>
    </button>
  )
}
ButtonUpdate.propTypes = {
  label: PropTypes.string,
  handleUpdate: PropTypes.func,
  updating: PropTypes.bool,
}
export default ButtonUpdate
