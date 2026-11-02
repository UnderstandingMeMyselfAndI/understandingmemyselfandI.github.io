import './buttonStyles.scss'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

const ButtonSimple = ({ children, label = '', classes = [], handleClick, disabled = false }) => {
  return (
    <button
      className={'btn' + classes.map((c) => ' ' + c).join('')}
      onClick={handleClick}
      disabled={disabled}>
      {children}
      {parse(DOMPurify.sanitize(label))}
    </button>
  )
}
ButtonSimple.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.array,
  disabled: PropTypes.bool,
}
ButtonSimple.displayName = '@buttonsimple'
export default ButtonSimple