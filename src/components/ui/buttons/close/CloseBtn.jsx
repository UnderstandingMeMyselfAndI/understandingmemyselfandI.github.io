import PropTypes from 'prop-types';
import './styles.scss';

const CloseBtn = ({ handleClick, classes = '' }) => {
  return (
    <button className={'close-btn'+ (classes ? ' ' + classes : '')} onClick={handleClick}>
      <div className='close-btn-inner'>
        <div></div>
        <div></div>
      </div>
    </button>
  );
};

CloseBtn.propTypes = {
  classes: PropTypes.string,
  handleClick: PropTypes.func,
};

export default CloseBtn;
