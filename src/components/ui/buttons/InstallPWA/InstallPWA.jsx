import Logo from 'ui/logo/Logo'
import './InstallPWA.scss'
import PropTypes from 'prop-types'

const InstallPWA = ({ handleClick, label }) => {
  return (
    <div>
      <button
        aria-label='install'
        className='install btn'
        onClick={handleClick}
      >
        <Logo classes='small' showText={false} />
        <div>{label}</div>
      </button>
    </div>
  )
}
InstallPWA.propTypes = {
  handleClick: PropTypes.func,
  label: PropTypes.string,
}
export default InstallPWA
