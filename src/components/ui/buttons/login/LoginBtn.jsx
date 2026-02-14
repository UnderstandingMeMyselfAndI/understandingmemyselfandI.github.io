import './buttonStyles.css'
import PropTypes from 'prop-types'

const RegisterBtn = ({ handleClick }) => {
  return (
    <button className={'register btn'} onClick={handleClick}>
      Login
    </button>
  )
}
RegisterBtn.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
RegisterBtn.displayName = 'RegisterBtn'
export default RegisterBtn
