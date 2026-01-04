// QuizProgress.jsx
import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const QuizProgress = ({
  current,
  total,
  score,
  totalAnswered,
  complete = false,
}) => {
  const progressPercentage = complete
    ? 100
    : total > 0
      ? ((current - 1) / total) * 100
      : 0;

  return (
    <div className='quiz-progress'>
      <div className='progress-header'>
        <span className='question-counter'>
          Question {current} of {total}
        </span>
        {/* {totalAnswered > 0 && ( */}
        <span className='score-display'>
          Score: {score} / {totalAnswered}
        </span>
        {/* )} */}
      </div>
      <div className='progress-bar-container'>
        <div
          className='progress-bar-fill'
          style={{ '--target-width': `${progressPercentage}%` }}
        />
      </div>
      {/* {totalAnswered > 0 && <div className='accuracy'>Accuracy: {Math.round((score / totalAnswered) * 100)}%</div>} */}
      <div className='accuracy'>
        Accuracy: {Math.round((score / totalAnswered) * 100)}%
      </div>
    </div>
  );
};

QuizProgress.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  totalAnswered: PropTypes.number.isRequired,
  complete: PropTypes.bool,
};

export default QuizProgress;
