import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const RecoveryDayCount = ({ startDay = 0, currentDay = 0, classes = '' }) => {
  const [displayDay, setDisplayDay] = useState(startDay);
  useEffect(() => {
    setDisplayDay(currentDay);
  }, [currentDay]);

  // useEffect(() => {
  // //   setMaxDays(range);
  //   console.log('range ', range, ' pos ', pos);
  // }, [range]);
  // scroller?.current?.addEventListener('scroll', (e) => {
  //   const pos =
  //     e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);
  //   const day = Math.ceil(maxDays * pos);
  //   console.log('day', day, ' pos ', pos);
  //   setDisplayDay(day);
  // });

  return (
    <div className={'day-count' + (classes ? ' ' + classes : '')}>
      <div>day</div>
      <div>{displayDay}</div>
    </div>
  );
};
RecoveryDayCount.propTypes = {
  classes: PropTypes.string,
  startDay: PropTypes.number,
  currentDay: PropTypes.number,
};

export default RecoveryDayCount;
