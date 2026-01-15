import useAppStore from '@/store/useAppStore';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PropTypes from 'prop-types';
import './styles.scss';
const ExitButton = ({ handleClick }) => {
  // const exitShowDialogue = useAppStore((state) => state.exitShowMessage)

  const classes = [];
  const label = 'Q.Exit';
  return (
    <div className='exit-wrap label'>
      <div
        className={'exit-btn' + classes.map((c) => ' ' + c)}
        onClick={handleClick}
      >
        <ExitToAppOutlinedIcon className='icon' />
      </div>
      <div className='label'>{label}</div>
    </div>
  );
};
ExitButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
ExitButton.displayName = 'ExitButton';
export default ExitButton;
