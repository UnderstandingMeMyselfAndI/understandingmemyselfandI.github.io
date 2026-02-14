// Quiz.jsx (updated with stats)
import {useState, useEffect} from 'react'
import { useShallow } from 'zustand/react/shallow'
import QuizProgress from './quizProgress/QuizProgress'
import QuizQuestion from './quizQuestion/QuizQuestion'
import QuizStart from './quizStart/QuizStart'
import QuizStats from './quizStats/QuizStats'
import questions from '@/data/quiz.js'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import useQuizStore from './useQuizStore'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import { trackEvent } from '@/js/analytics/analytics'
import { activities } from '@/data/config'

const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
const activityStringsByName = strings.activity.reduce((acc, activity) => {
  acc[activity.name] = activity
  return acc
}, {})

import './styles.scss'

const Quiz = () => {
  const name = 'quiz'
  const id = 23
  const [open, setOpen] = useState(false)
  const [started, setStarted] = useState(false)
  const [view, setView] = useState('start') // 'start', 'question', 'stats'
  const [currentLevel, setCurrentLevel] = useState(null)
  const { 
    incrementPlayCount, 
    getPlayCount, 
    saveScore, 
    addToHistory,
    optIn
  } = useQuizStore()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [activeQuestions, setActiveQuestions] = useState([])
  const setActivity = useAppStore((state) => state.setActivity)
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isModal = useAppStore((s) => s.isModal)
  const strings = activityStringsByName[name]
  const { activity } = useAppStore(
    useShallow((state) => ({ activity: state.activity })),
  )

  const totalQuestions = activeQuestions.length

  // Helper to shuffle and pick 15
  const getRandomSubset = (questionsArray, count = 15) => {
    const shuffled = [...questionsArray].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  // Track when the quiz component is mounted (page view equivalent)
  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open])

  useEffect(() => {
    setOpen(activity === id)
  }, [activity, isModal, id, setOpen])

  const handleStart = (level, analyticsOptIn) => {
    if (level === 'stats') {
      setView('stats')
      return
    }
    const subset = getRandomSubset(questions.levels[level], 15)
    setActiveQuestions(subset)
    setCurrentLevel(level)
    setStarted(true)
    setView('question')
    setCurrentIndex(0)
    setScore(0)
    setTotalAnswered(0)

    trackEvent(
      'quiz_start',
      { level, question_count: subset.length },
      optIn,
    )
  }

  const handleNext = (wasCorrect) => {
    if (wasCorrect) setScore((prev) => prev + 1)
    if (totalAnswered < totalQuestions) {
      setTotalAnswered((prev) => prev + 1)
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const resetQuiz = () => {
    console.log("resetQuiz")
    setStarted(false)
    setCurrentLevel(null)
    setCurrentIndex(0)
    setScore(0)
    setTotalAnswered(0)
    setTotalAnswered(0)
    setActiveQuestions([])
    setView('start')
  }

  const handleRestart = () => {
    // Increment play count (both in store and analytics)
    incrementPlayCount()
    
    trackEvent(
      'quiz_restart',
      { level: currentLevel },
      optIn,
    )

    // Reset quiz
    resetQuiz()
  }

  const getCompletionStatus = () => {
    if (!questions.completionStatus) return null
    return (
      questions.completionStatus
        .find((status) => score >= status.minScore) ||
      questions.completionStatus[questions.completionStatus.length - 1]
    )
  }

  const status = currentIndex >= totalQuestions ? getCompletionStatus() : null
  const isComplete = currentIndex >= totalQuestions

  // Immediate save on completion
  useEffect(() => {
    if (isComplete && currentLevel) {
       // Record completion event
       trackEvent(
         'quiz_complete',
         {
           level: currentLevel,
           score,
           total_questions: totalQuestions,
           accuracy: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
           play_number: getPlayCount() + 1,
         },
         optIn,
       )

       // Save to history/scores if opted in
       if (optIn) {
         saveScore(currentLevel, score)
         addToHistory({
           level: currentLevel,
           score,
           total: totalQuestions,
           accuracy: totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0,
         })
       }
    }
  }, [isComplete])

  const handleClose = () => {
    resetQuiz()    
    setOpen(false)
    setActivity(-1)
  }

  return ( open ?
    <section
      id={name}
      className={'activity activity-quiz fixed' + (open ? ' show' : ' hide')}
    >
      
     
      <div className='inner'>
        <CloseBtn
          className='close-btn'
          onClick={view === 'stats' ? () => setView('start') : handleClose}
        />
        {started && (
          <button className='cancel-btn' onClick={resetQuiz}>
            Quit
          </button>
        )}
        {view === 'start' ? (
          <QuizStart onStart={handleStart} levels={questions.levels} />
        ) : view === 'stats' ? (
          <QuizStats onBack={() => setView('start')} />
        ) : isComplete ? (
          <div className='quiz-complete'>          

            {status && (
              <div className='completion-status'>
                <h2 className='status-title'>{status.title}</h2>
                <p className='status-description'>{status.description}</p>
              </div>
            )}
            <div className='final-score'>
              <h3>Final Results</h3>
              <div className='score-details'>
                <div className='score-metric'>
                  <div className='score-metric-label'>Score: </div>
                  <div className='score-metric-value'>
                    <span>{score}</span> / <span>{totalQuestions}</span>
                  </div>
                </div>
                <div className='score-metric'>
                  <div className='score-metric-label'>Accuracy: </div>
                  <div className='score-metric-value'>
                    <span>
                      {totalQuestions > 0
                        ? Math.round((score / totalQuestions) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button className='restart-button' onClick={handleRestart}>
              Play Again
            </button>
          </div>
        ) : (
          <QuizQuestion
            data={activeQuestions[currentIndex]}
            onNext={handleNext}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            score={score}
            totalAnswered={totalAnswered}
          />
        )}
        
      </div>
    </section> : null
  )
}

export default Quiz
