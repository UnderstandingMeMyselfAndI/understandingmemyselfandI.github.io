import PropTypes from 'prop-types';
import './styles.scss';

const CloseBtn = ({ handleClick }) => {
  return (
    <button className='close-btn' onClick={handleClick}>
      <div className='close-btn-inner'>
        <div></div>
        <div></div>
      </div>
    </button>
  );
};

CloseBtn.propTypes = {
  handleClick: PropTypes.func,
};

export default CloseBtn;
