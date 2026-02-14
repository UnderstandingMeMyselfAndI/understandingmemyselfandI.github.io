import PropTypes from 'prop-types'
import './styles.scss'

const CloseBtn = ({ onClick, classes = '', width = 30, thickness = 3 }) => {
  return (
    <button
      className={'close-btn' + (classes ? ' ' + classes : '')}
      onClick={onClick}
    >
      <div className='close-btn-wrap'>
        <div className='close-btn-inner'>
          <div className='line'></div>
          <div className='line'></div>
        </div>
      </div>
    </button>
  )
}

CloseBtn.propTypes = {
  classes: PropTypes.string,
  onClick: PropTypes.func,
  width: PropTypes.number,
  thickness: PropTypes.number,
}

export default CloseBtn
