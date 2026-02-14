import Backdrop from '../backdrop/Backdrop'
import useAppStore from '@/store/useAppStore'
import { useEffect } from 'react'
import './styles.scss'

const UmmiAgeGate = () => {
  const ageVerified = useAppStore((state) => state.ageVerified)
  const setAgeVerified = useAppStore((state) => state.setAgeVerified)

  const handleYes = () => {
    if (setAgeVerified) {
      setAgeVerified(true)
    } else {
      console.error('Store action missing. Force reloading...')
      window.location.reload()
    }
  }

  const handleNo = () => {
    // Redirect to google.com immediately
    window.location.href = 'https://google.com'
  }

  // Effect to lock scroll when gate is active
  useEffect(() => {
    if (!ageVerified) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [ageVerified])

  // If age is verified, don't render anything
  if (ageVerified) return null

  // To change the background image, update this path
  const BACKGROUND_IMAGE = '/bgs/3.avif'

  return ( !ageVerified ?
    <div
      className='age-gate-container'
      role='dialog'
      aria-modal='true'
      aria-labelledby='age-gate-title'
      aria-describedby='age-gate-desc'
    >
      <Backdrop
        initialImageId={2} // Use specific image ID or logic for the gate background if needed, or default
        initialDelay={0}
        interval={10000} // Keep it static or slow moving if preferred
        parallaxStrength={0}
        className='backdrop age-gate-backdrop'
        staticImage={BACKGROUND_IMAGE} // Force specific image for age gate if Backdrop supports it, otherwise generic backdrop
      />

      {/* Explicit overlay to ensure it's on top and blocking */}
      <div className='age-gate-content'>
        <div className='logo-container'>
          <img
            src='/icons/UmmiIcon2.svg'
            alt='Ummi Logo'
            className='age-gate-logo'
          />
        </div>

        <div className='text-container'>
          <h1 id='age-gate-title'>Age Verification</h1>
          <p id='age-gate-desc'>
            Due to the sensitive nature of some topics and content, you need to
            be 18 or older to use this app.
          </p>
          <p className='question'>Are you 18 years of age or older?</p>
        </div>

        <div className='button-container'>
          <button onClick={handleNo} className='age-gate-btn no-btn'>
            No
          </button>
          <button onClick={handleYes} className='age-gate-btn yes-btn'>
            Yes
          </button>
        </div>
      </div>
    </div> : null
  )
}

export default UmmiAgeGate
