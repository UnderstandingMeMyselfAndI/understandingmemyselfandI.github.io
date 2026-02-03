// Quiz.jsx (updated with simplified analytics)
import { useState, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import QuizProgress from './quizProgress/QuizProgress'
import QuizQuestion from './quizQuestion/QuizQuestion'
import QuizStart from './quizStart/QuizStart'
import questions from './questions-dev-2.js'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import useQuizStore from './useQuizStore'
import useAppStore from '@/store/appStore'
import { trackEvent } from '@/js/analytics/analytics'
import './styles.scss'

const Quiz = () => {
  const [open, setOpen] = useState(false)
  const [started, setStarted] = useState(false)
  const [currentLevel, setCurrentLevel] = useState(null)
  const [optInAnalytics, setOptInAnalytics] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const setActivity = useAppStore((state) => state.setActivity)

  const { activity } = useAppStore(
    useShallow((state) => ({ activity: state.activity })),
  )
  const { incrementPlayCount, getPlayCount, saveScore } = useQuizStore()

  const levelQuestions = currentLevel ? questions.levels[currentLevel] : []
  const totalQuestions = levelQuestions.length

  // Track when the quiz component is mounted (page view equivalent)
  useEffect(() => {
    trackEvent('quiz_view', {}, optInAnalytics)
  }, [optInAnalytics])

  const handleStart = (level, analyticsOptIn) => {
    setCurrentLevel(level)
    setOptInAnalytics(analyticsOptIn)
    setStarted(true)
    setCurrentIndex(0)
    setScore(0)
    setTotalAnswered(0)

    trackEvent(
      'quiz_start',
      { level, question_count: totalQuestions },
      analyticsOptIn,
    )
  }

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore((prev) => prev + 1)
    if (totalAnswered < totalQuestions) {
      setTotalAnswered((prev) => prev + 1)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleRestart = () => {
    // Record completion
    trackEvent(
      'quiz_complete',
      {
        level: currentLevel,
        score,
        total_questions: totalQuestions,
        accuracy:
          totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
        play_number: getPlayCount() + 1, // upcoming play count
      },
      optInAnalytics,
    )

    // Save best score if user opted in for recording scores
    if (optInAnalytics && currentLevel) {
      saveScore(currentLevel, score)
    }

    // Increment play count (both in store and analytics)
    incrementPlayCount()

    // Reset quiz
    setStarted(false)
    setCurrentLevel(null)
    setOptInAnalytics(false)
  }

  const getCompletionStatus = () => {
    if (!questions.completionStatus) return null
    return (
      questions.completionStatus
        .slice()
        .reverse()
        .find((status) => score >= status.minScore) ||
      questions.completionStatus[0]
    )
  }

  const status = currentIndex >= totalQuestions ? getCompletionStatus() : null
  const isComplete = currentIndex >= totalQuestions
  useEffect(() => {
    setOpen(activity === 2)
  }, [activity])
  const handleClose = () => {
    setActivity(-1)
  }

  return (
    <div
      id='quiz'
      className={'activity activity-quiz fixed' + (open ? ' show' : '')}>
      <CloseBtn className='close-btn' handleClick={handleClose} />
      <div className='inner'>
        {!started ? (
          <QuizStart onStart={handleStart} levels={questions.levels} />
        ) : isComplete ? (
          <div className='quiz-complete'>
            <QuizProgress
              current={currentIndex}
              complete={true}
              total={totalQuestions}
              score={score}
              totalAnswered={totalAnswered}
            />

            {status && (
              <div className='completion-status'>
                <h2 className='status-title'>{status.title}</h2>
                <p className='status-description'>{status.description}</p>
              </div>
            )}
            <div className='final-score'>
              <h3>Final Results</h3>
              <div className='score-details'>
                <p>
                  Score: {score} / {totalQuestions}
                </p>
                <p>
                  Accuracy:{' '}
                  {totalQuestions > 0
                    ? Math.round((score / totalQuestions) * 100)
                    : 0}
                  %
                </p>
              </div>
            </div>
            <button className='restart-button' onClick={handleRestart}>
              Play Again
            </button>
          </div>
        ) : (
          <QuizQuestion
            data={levelQuestions[currentIndex]}
            onNext={handleNext}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            score={score}
            totalAnswered={totalAnswered}
          />
        )}
      </div>
    </div>
  )
}

export default Quiz
