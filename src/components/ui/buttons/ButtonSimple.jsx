import './buttonStyles.css'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'

const ButtonSimple = ({ label = '', classes = [], handleClick }) => {
  return (
    <button
      className={'btn' + classes.map((c) => ' ' + c)}
      onClick={handleClick}>
      {parse(label)}
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
