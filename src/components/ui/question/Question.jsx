import React from 'react'
import { useOnboardingStore } from '../stores/onboardingStore'
import './styles.scss'

const QuestionComponent = ({ question, options, followUp }) => {
  const { setResponse, nextQuestion } = useOnboardingStore()

  const handleSelect = (answer) => {
    setResponse(question, answer)
    nextQuestion()
    // TODO: Optionally display followUp as a toast or message (implement as needed)
  }

  return (
    <div className='question-container'>
      <p className='question-text'>{question}</p>
      <div className='options'>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(option)}
            className='option-button'
          >
            {option}
          </button>
        ))}
      </div>
      {/* Add a Skip button if desired: <button onClick={nextQuestion}>Skip</button> */}
    </div>
  )
}

export default QuestionComponent
