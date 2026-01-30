import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined'
import useAppStore from '@/store/useAppStore'
import PropTypes from 'prop-types'

const UnitsCalculatorBtn = ({ label = 'Units Calculator' }) => {
  const setActivity = useAppStore((state) => state.setActivity)

  const handleClick = () => {
    setActivity(5)
  }
  return (
    <button
      onClick={() => handleClick()}
      className='units-calculator btn'
      aria-label='Units Calculator'
    >
      <AddchartOutlinedIcon className='icon' />
      <div>{label}</div>
    </button>
  )
}
UnitsCalculatorBtn.propTypes = {
  label: PropTypes.string,
}
export default UnitsCalculatorBtn
