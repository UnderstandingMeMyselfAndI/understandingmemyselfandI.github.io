import PropTypes from 'prop-types';
import './styles.scss';

const CloseBtn = ({ handleClick, classes = '', width=40, thickness=3}) => {
  return (
    <button className={'close-btn'+ (classes ? ' ' + classes : '')} style={{width:(width*1.5)+'px',height:(width*1.5)+'px'}} onClick={handleClick}>
      <div className='close-btn-wrap'>
        <div className='close-btn-inner'>
          <div className="line" style={{width:width+'px', height:thickness+'px'}}></div>
          <div className="line" style={{width:width+'px', height:thickness+'px'}}></div>
        </div>
      </div>
    </button>
  );
};

CloseBtn.propTypes = {
  classes: PropTypes.string,
  handleClick: PropTypes.func,
  width: PropTypes.number,
  thickness: PropTypes.number
};

export default CloseBtn;
