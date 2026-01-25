import { useEffect, useState, useRef } from 'react';
import Draggable from 'react-draggable';
import useAppStore from '@/store/useAppStore';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PropTypes from 'prop-types';
import './styles.scss';

const ExitButton = ({ handleClick }) => {
  const restrictPos = (data) => {
    const maxX = 65;
    const minX = 15;
    const maxY = 90;
    const minY = 15;
    const menuBoundsX = 120;
    const menuBoundsY = 60;

    if (data.x < minX) data.x = minX;
    if (data.x > window.innerWidth - maxX) data.x = window.innerWidth - maxX;
    if (data.y < minY) data.y = minY;
    if (data.y > window.innerHeight - maxY) data.y = window.innerHeight - maxY;

    if (data.y < menuBoundsY && data.x > window.innerWidth - menuBoundsX) {
      data.x = window.innerWidth - menuBoundsX;
      data.y = menuBoundsY;
    }
    return data;
  };

  const nodeRef = useRef(null);
  const [buttonPosition, setButtonPosition] = useState(
    restrictPos({ x: 0, y: window.innerHeight * 0.5 }),
  );
  const [touchCount, setTouchCount] = useState(0);
  const exitButtonPosition = useAppStore((s) => s.exitButtonPosition);
  const setExitButtonPosition = useAppStore((s) => s.setExitButtonPosition);

  const isMobile = window.innerWidth < 600;

  useEffect(() => {
    setButtonPosition(exitButtonPosition);
  }, [exitButtonPosition]);

  const handleDragStop = (e, data) => {
    data = restrictPos(data);
    setExitButtonPosition({ x: data.x, y: data.y });
  };
  const handleDrag = (e, data) => {
    // data = restrictPos(data);
    // setButtonPosition({ x: data.x, y: data.y });
  };

  const eventHandler = (cb) => {
    return (event) => {
      if (isMobile && event.type === 'touchstart') {
        console.log('touchCount', touchCount);
        setTouchCount(touchCount + 1);
        if (touchCount > 1) {
          cb(event);
          setTouchCount(0);
        }
        s;
        setTimeout(() => setTouchCount(0), 1000);
      } else if (!isMobile && event.type === 'click') {
        cb(event);
      }
    };
  };
  const label = 'Q.Exit';

  return (
    <Draggable
      position={buttonPosition}
      defaultPosition={buttonPosition}
      onDrag={handleDrag}
      onStop={handleDragStop}
      handle='.exit-wrap'
      nodeRef={nodeRef}
    >
      <div
        className='exit-wrap label'
        ref={nodeRef}
        onClick={eventHandler(handleClick)}
        onTouchStart={eventHandler(handleClick)}
      >
        <div className={'exit-btn'}>
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
