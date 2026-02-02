import './buttonStyles.css'
import PropTypes from 'prop-types'

const ButtonSimple = ({ label = '', classes = [], handleClick }) => {
  return (
    <button
      className={'btn' + classes.map((c) => ' ' + c)}
      onClick={handleClick}>
      {label}
    </button>
  )
}
ButtonSimple.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.array,
}
ButtonSimple.displayName = 'ButtonSimple'
export default ButtonSimple
