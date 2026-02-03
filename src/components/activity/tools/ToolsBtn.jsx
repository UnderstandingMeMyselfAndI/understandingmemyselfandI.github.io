import MoreTimeIcon from '@mui/icons-material/MoreTime'
import useAppStore from '@/store/useAppStore'
import PropTypes from 'prop-types'

import './stylesBTN.scss'
const ToolsBtn = ({ label = 'Tools', clickHandler }) => {
  return (
    <button
      onClick={clickHandler}
      className={`${label.toLowerCase()}-btn btn`}
      aria-label={label}>
      <MoreTimeIcon className='icon' />
      <div>{label}</div>
    </button>
  )
}
ToolsBtn.propTypes = {
  label: PropTypes.string,
  clickHandler: PropTypes.func,
}
export default ToolsBtn
