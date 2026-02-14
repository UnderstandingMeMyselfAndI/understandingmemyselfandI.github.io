import './buttonStyles.css'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

const ButtonSimple = ({ children, label = '', classes = [], handleClick }) => {
  return (
    <button
      className={'btn' + classes.map((c) => ' ' + c)}
      onClick={handleClick}
    >
      {children}
      {parse(DOMPurify.sanitize(label))}
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
