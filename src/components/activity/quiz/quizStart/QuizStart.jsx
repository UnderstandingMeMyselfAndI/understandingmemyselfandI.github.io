// quizStart/QuizStart.jsx
import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'

const QuizStart = ({ onStart, levels }) => {
  const [selectedLevel, setSelectedLevel] = React.useState(
    Object.keys(levels)[0],
  )
  const [optIn, setOptIn] = React.useState(false)

  const handleStart = () => {
    onStart(selectedLevel, optIn)
  }

  const levelKeys = Object.keys(levels)

  return (
    <div className='quiz-start'>
      <h1>Welcome to the Quiz!</h1>

      <div className='level-selection'>
        <p className='level-label'>Select Difficulty Level:</p>
        <div className='radio-group'>
          {levelKeys.map((level) => (
            <label key={level} className='radio-option'>
              <input
                type='radio'
                name='difficulty'
                value={level}
                checked={selectedLevel === level}
                onChange={(e) => setSelectedLevel(e.target.value)}
              />
              <span className='radio-custom' />
              <span className='radio-text'>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className='opt-in'>
        <input
          type='checkbox'
          id='record-scores'
          checked={optIn}
          onChange={(e) => setOptIn(e.target.checked)}
        />
        <label htmlFor='record-scores'>
          Record my scores and track progress*
        </label>
      </div>
      <div className='opt-in-info'>
        *Scores are only saved to your device and will not be shared anywhere
        else. Top-tip: Try a harder level becauseyou can't loose. Just by being here you're a winner already. 
      </div>
      
      <button className='start-button' onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  )
}

QuizStart.propTypes = {
  onStart: PropTypes.func.isRequired,
  levels: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        correctMessage: PropTypes.string.isRequired,
        incorrectMessage: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            isCorrect: PropTypes.bool.isRequired,
          }),
        ).isRequired,
      }),
    ),
  ).isRequired,
}

export default QuizStart
