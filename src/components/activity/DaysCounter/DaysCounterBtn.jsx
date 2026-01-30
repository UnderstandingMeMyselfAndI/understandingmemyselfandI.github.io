import MoreTimeIcon from '@mui/icons-material/MoreTime'
import useAppStore from '@/store/useAppStore'
import PropTypes from 'prop-types'

import './stylesBTN.scss'
const DaysCounterBtn = ({ label = 'Days Counter' }) => {
  const setActivity = useAppStore((state) => state.setActivity)

  const handleClick = () => {
    setActivity(2)
  }
  return (
    <button
      onClick={() => handleClick()}
      className='days-counter btn'
      aria-label='Days Counter'
    >
      <MoreTimeIcon className='icon' />
      <div>{label}</div>
    </button>
  )
}
DaysCounterBtn.propTypes = {
  label: PropTypes.string,
}

export default DaysCounterBtn
