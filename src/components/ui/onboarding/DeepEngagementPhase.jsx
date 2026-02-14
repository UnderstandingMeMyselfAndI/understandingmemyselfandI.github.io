import React from 'react'
import QuestionComponent from './QuestionComponent'
import { useOnboardingStore } from '../stores/onboardingStore'
import './DeepEngagementPhase.scss'

const questions = [
  {
    question: "If it feels right, what's been your main challenge area?",
    options: [
      'Substances like alcohol or drugs',
      'Behaviors like gaming or shopping',
      'Emotional stuff like anxiety',
      'A combination',
      'Rather not specify',
    ],
    followUp:
      "I appreciate you sharing – remember, every step counts, and there's no judgment here.",
  },
  {
    question: "How's your energy feeling for making changes lately?",
    options: [
      'Just starting to think about it',
      'Getting ready and planning',
      'In the thick of it and pushing forward',
      'Keeping things steady',
      'Bouncing back from a rough patch',
      'All good/Not sure',
    ],
    followUp:
      "You're incredible for where you're at – let's keep that momentum going!",
  },
]

const DeepEngagementPhase = () => {
  const { currentQuestionIndex } = useOnboardingStore()

  if (currentQuestionIndex >= questions.length) {
    return null // Phase complete
  }

  return <QuestionComponent {...questions[currentQuestionIndex]} />
}

export default DeepEngagementPhase
