import React from 'react'
import QuestionComponent from './QuestionComponent'
import { useOnboardingStore } from '../stores/onboardingStore'
import './PostInteractionPhase.scss'

const questions = [
  {
    question:
      "If you're up for sharing, what's one thing you're focusing on most these days?",
    options: [
      'Managing cravings or triggers',
      'Building emotional strength',
      'Improving daily routines',
      'Connecting with support',
      'Celebrating wins and staying motivated',
      'Something else/Not ready to say',
    ],
    followUp:
      "Thanks for letting me know – you're doing amazing just by being here!",
  },
  {
    question: 'Are you teaming up with anyone else on this journey?',
    options: [
      'Yeah, working with a therapist or group',
      'Getting help from friends/family',
      'Going it solo for now',
      'A mix of things',
      'Prefer not to share',
    ],
    followUp: "No matter what, you've got this – and I'm here too!",
  },
  {
    question: 'Out of these, which therapy style are you most curious about?',
    options: [
      'CBT (thought patterns)',
      'ACT (acceptance and values)',
      'DBT (emotions and skills)',
      'REBT (rational thinking)',
      'SMART (self-management)',
      'All of them!/Not sure',
    ],
    followUp: "Cool choice – I've got some great starting points for that!",
  },
]

const PostInteractionPhase = () => {
  const { currentQuestionIndex, nextPhase } = useOnboardingStore()

  if (currentQuestionIndex >= questions.length) {
    // Auto-advance or wait for app trigger
    return null
  }

  return <QuestionComponent {...questions[currentQuestionIndex]} />
}

export default PostInteractionPhase
