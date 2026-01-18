import Draggable from 'react-draggable';
import useAppStore from '@/store/useAppStore';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PropTypes from 'prop-types';
import './styles.scss';

const ExitButton = ({ handleClick }) => {
  const { exitButtonPosition, setExitButtonPosition } = useAppStore(
    (state) => ({
      exitButtonPosition: state.exitButtonPosition,
      setExitButtonPosition: state.setExitButtonPosition,
    }),
  );

  const handleDrag = (e, ui) => {
    setExitButtonPosition({ x: ui.x, y: ui.y });
  };

  const label = 'Q.Exit';

  return (
    <Draggable
      position={exitButtonPosition}
      onStop={handleDrag}
      handle=".exit-btn"
    >
      <div className='exit-wrap label'>
        <div
          className={'exit-btn'}
          onClick={handleClick}
        >
          <ExitToAppOutlinedIcon className='icon' />
        </div>
        <div className='label'>{label}</div>
      </div>
    </Draggable>
  );
};

ExitButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

ExitButton.displayName = 'ExitButton';
export default ExitButton;
