import './styles.scss';
import AddIcon from '@mui/icons-material/Add';
const CloseBtn = ({ handleClick }) => {
  return (
    <button className='close-btn' onClick={handleClick}>
      <div>
        <div></div>
        <div></div>
      </div>
    </button>
  );
};
// CloseBtn.propTypes = {
// 	handleClick:function
// };
export default CloseBtn;
