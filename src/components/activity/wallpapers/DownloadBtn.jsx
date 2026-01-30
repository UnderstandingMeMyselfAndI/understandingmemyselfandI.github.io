import './styles.scss'
import PropTypes from 'prop-types'

const DownloadBtn = ({
  label = '',
  classes = [],
  handleClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      className={'btn' + classes.map((c) => ' ' + c)}
      onClick={handleClick}
    >
      {label}
    </button>
  )
}
DownloadBtn.propTypes = {
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  classes: PropTypes.array,
  disabled: PropTypes.bool,
}
DownloadBtn.displayName = 'DownloadBtn'
export default DownloadBtn
