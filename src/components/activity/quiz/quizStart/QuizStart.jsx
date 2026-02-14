// quizStart/QuizStart.jsx
import React from 'react'
import PropTypes from 'prop-types'
import useAppStore from '@/store/useAppStore'
import useQuizStore from '../useQuizStore'
import './styles.scss'

const QuizStart = ({ onStart, levels }) => {
  const [selectedLevel, setSelectedLevel] = React.useState(
    Object.keys(levels)[0],
  )
  const { history, optIn, setOptIn } = useQuizStore()
  const hasStats = history && history.length > 0

  const handleStart = () => {
    onStart(selectedLevel, optIn)
  }

  const levelKeys = Object.keys(levels)

  return (
    <div className='quiz-start'>
      <h1>Welcome to the BIG Recovery Quiz!</h1>

      <div className='intro-text'>
        <p>
         Choose
          your level.
        </p>
      </div>

      <div className='level-selection'>
        <div className='radio-group'>
          {levelKeys.map((level) => (
            <label key={level} className='radio-option'>
              <input
                type='radio'
                name='difficulty'
                value={level}
                checked={selectedLevel === level}
                onChange={() => setSelectedLevel(level)}
              />
              <span className='radio-custom' />
              <span className='radio-text'>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className='opt-in-section'>
        <div className='stats-row'>
          <div className='opt-in'>
            <input
              type='checkbox'
              id='record-scores'
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
            />
            <label htmlFor='record-scores'>
              Record my scores and track progress
            </label>
          </div>
          <button
            className='stats-button'
            onClick={() => onStart('stats', false)}
            disabled={!hasStats}
            title={
              !optIn
                ? 'Enable tracking to view stats'
                : !hasStats
                ? 'No stats recorded yet'
                : 'View your progress'
            }
          >
            Stats
          </button>
        </div>
      </div>

      <div className='actions'>
        <button className='start-button' onClick={handleStart}>
          Start Quiz
        </button>
      </div>

      <button
        className='debug-btn'
        onClick={() => {
          const levelsArr = ['easy', 'medium', 'hard']
          const mockHistory = []
          for (let i = 0; i < 30; i++) {
            const level = levelsArr[i % levelsArr.length]
            const total = 15
            const score = Math.floor(Math.random() * 14) + 2 // 2 to 15 correct
            const date = new Date(
              Date.now() - (29 - i) * 8 * 60 * 60 * 1000,
            ).toISOString()
            mockHistory.push({
              date,
              level,
              score,
              total,
              accuracy: Math.round((score / total) * 100),
            })
          }
          useQuizStore.setState((s) => ({
            playCount: s.playCount + 30,
            history: [...s.history, ...mockHistory],
            optIn: true,
          }))
          alert('30 varied games generated! Click "Stats" to view.')
        }}
        style={{
          marginTop: '2rem',
          opacity: 0.3,
          fontSize: '0.7rem',
          background: 'none',
          border: '1px dashed var(--grey)',
          color: 'var(--grey)',
          cursor: 'pointer',
          padding: '4px 8px',
          borderRadius: '4px',
        }}
      >
        [Debug] Generate 30 Mock Games
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
