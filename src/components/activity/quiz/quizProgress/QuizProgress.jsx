// QuizProgress.jsx
import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

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
      : 0

  return (
    <div className='quiz-progress'>
      <div className='progress-header'>
        <div className='question-stat question-counter'>
          <span>Question</span> {current} of {total}
        </div>
        <div className='question-stat accuracy'>
        <span>Accuracy </span>
        {Math.round((score / totalAnswered) * 100)
          ? Math.round((score / totalAnswered) * 100)
          : 0}
        %
      </div>
        <div className='question-stat score-display'>
          <span>Score</span> {score} / {totalAnswered}
        </div>

      </div>
      <div className='progress-bar-container'>
        
        <div
          className='progress-bar-fill'
          style={{ '--target-width': `${progressPercentage}%` }}
        />
      </div>
      {/* {totalAnswered > 0 && <div className='accuracy'>Accuracy: {Math.round((score / totalAnswered) * 100)}%</div>} */}
      
    </div>
  )
}

QuizProgress.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  totalAnswered: PropTypes.number.isRequired,
  complete: PropTypes.bool,
}

export default QuizProgress
