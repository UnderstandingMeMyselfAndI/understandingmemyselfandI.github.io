import React from 'react'
import { useOnboardingStore } from '../stores/onboardingStore'
import WelcomePhase from './WelcomePhase'
import PostInteractionPhase from './PostInteractionPhase'
import DeepEngagementPhase from './DeepEngagementPhase'
import './OnboardingFlow.scss'

const OnboardingFlow = () => {
  const { phase } = useOnboardingStore()

  // Render as a modal or inline based on your app; e.g., use a library like react-modal for popups
  return (
    <div className='onboarding-flow'>
      {phase === 'phase1' && <WelcomePhase />}
      {phase === 'phase2' && <PostInteractionPhase />}
      {phase === 'phase3' && <DeepEngagementPhase />}
    </div>
  )
}

export default OnboardingFlow
