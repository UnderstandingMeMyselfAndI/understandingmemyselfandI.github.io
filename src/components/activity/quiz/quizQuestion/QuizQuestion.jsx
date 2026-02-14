// QuizQuestion.jsx
import React, { useState, useEffect, useMemo, memo } from 'react'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import QuizProgress from '../quizProgress/QuizProgress'
import PropTypes from 'prop-types'
import './styles.scss'

const answerShape = PropTypes.shape({
  text: PropTypes.string.isRequired,
  isCorrect: PropTypes.bool.isRequired,
})

const questionShape = PropTypes.shape({
  question: PropTypes.string.isRequired,
  correctMessage: PropTypes.string.isRequired,
  incorrectMessage: PropTypes.string.isRequired,
  answers: PropTypes.arrayOf(answerShape).isRequired,
})

const QuizQuestion = memo(({
  data,
  onNext,
  currentIndex,
  totalQuestions,
  score,
  totalAnswered,
}) => {
  const { question, correctMessage, incorrectMessage, answers } = data

  // Reset state whenever the question (data) changes
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isNew, setIsNew] = useState(false)

  useEffect(() => {
    setSelected(null)
    setSubmitted(false)
    setIsCorrect(false)
  }, [data])

  useEffect(() => {
    setIsNew(false)
    setTimeout(() => {
      setIsNew(true)
    }, 250)
  }, [question])

  const handleSelect = (index) => {
    if (!submitted) {
      setSelected(index)
    }
  }

  const handleSubmit = () => {
    if (selected !== null && !submitted) {
      setIsCorrect(answers[selected].isCorrect)
      setSubmitted(true)
    }
  }

  const wrapSpan = (text) => {
    const split = text.split(' ')
    return split.map((word) => `<span>${word}</span>`).join(' ')
  }

  const parsedCorrect = useMemo(() => 
    parse(wrapSpan(DOMPurify.sanitize(correctMessage))), 
    [correctMessage]
  )
  
  const parsedIncorrect = useMemo(() => 
    parse(wrapSpan(DOMPurify.sanitize(incorrectMessage))), 
    [incorrectMessage]
  )

  const handleNext = () => {
    setIsNew(false)
    if (submitted) {
      onNext(isCorrect)
      setSubmitted(false)
    }
  }

  return (
    <div className='quiz-container'>
     
      <div className={'question-container'}>
        {!submitted && (
          <div className={'question' + (isNew ? ' in' : ' ')}>{isNew && question}</div>
        )}
        <div className={'feedback-message' + (submitted ? ' show' : '')}>
          {submitted && (
            <p>
              {isCorrect ? parsedCorrect : parsedIncorrect}
            </p>
          )}
        </div>
      </div>
      <QuizProgress
        current={currentIndex + 1}
        total={totalQuestions}
        score={score}
        totalAnswered={totalAnswered}
      />
      <form className='answers-form'>
        {answers.map((answer, index) => {
          const isSelected = selected === index
          const isThisCorrect = answer.isCorrect

          let optionClass = 'option'
          if (submitted) {
            if (isThisCorrect) optionClass += ' correct-answer'
            if (isSelected) {
              optionClass += isCorrect
                ? ' selected-correct'
                : ' selected-incorrect'
            }
          } else if (isSelected) {
            optionClass += ' selected-pending'
          }

          return (
            <label key={index} className={optionClass}>
              <input
                type='radio'
                name='answer'
                checked={isSelected}
                onChange={() => handleSelect(index)}
                disabled={submitted}
              />
              <span className='answer-text'>{answer.text}</span>
            </label>
          )
        })}
      </form>

      <div className='button-group'>
        <button
          className='submit-button'
          disabled={selected === null || submitted}
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className='next-button'
          disabled={!submitted}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  )
})

QuizQuestion.displayName = 'QuizQuestion'

QuizQuestion.propTypes = {
  data: questionShape.isRequired,
  onNext: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  totalAnswered: PropTypes.number.isRequired,
}

export default QuizQuestion
