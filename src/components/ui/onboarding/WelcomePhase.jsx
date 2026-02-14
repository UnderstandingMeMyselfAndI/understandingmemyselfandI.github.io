import React, { useEffect } from 'react'
import QuestionComponent from './QuestionComponent'
import { useOnboardingStore } from '../stores/onboardingStore'
import './WelcomePhase.scss'

const questions = [
  {
    question: 'Hey, where are you joining us from today?',
    options: [
      'United States',
      'United Kingdom',
      'Canada',
      'Australia',
      'Other/Not sure',
    ],
    followUp:
      'Awesome, that helps me point you to stuff that might feel more familiar!',
  },
  {
    question: "What's bringing you here right now? (Pick what feels closest)",
    options: [
      'Just curious about therapy tools',
      'Looking for ways to build better habits',
      'Needing a bit of motivation during tough times',
      'Tracking my progress and staying on course',
      'Dealing with a setback and getting back up',
      'Not sure yet/Skip',
    ],
    followUp:
      "Got it – sounds like you're taking a great step. Let's start with some tools that might help!",
  },
]

const WelcomePhase = () => {
  const { currentQuestionIndex, nextPhase, loadResponses } =
    useOnboardingStore()

  useEffect(() => {
    loadResponses()
  }, [])

  if (currentQuestionIndex >= questions.length) {
    // Auto-advance or wait for app trigger
    return null // Or show a completion message
  }

  return <QuestionComponent {...questions[currentQuestionIndex]} />
}

export default WelcomePhase
