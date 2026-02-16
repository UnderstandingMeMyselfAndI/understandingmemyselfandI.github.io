import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import CurvedLineAnimation from './CurvedLineAnimation'
import Dialog from 'components/ui/dialog/Dialog'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import useAppStore from '@/store/useAppStore'
import './QuickExitOnboarding.scss'

const QuickExitOnboarding = ({ children, showOnboarding = true }) => {
  const showQuickExitOnboarding = useAppStore((state) => state.showQuickExitOnboarding)
  const setShowQuickExitOnboarding = useAppStore((state) => state.setShowQuickExitOnboarding)
  const [show, setShow] = useState(false)
  const [timeouts, setTimeouts] = useState([])

  const stopOnboarding = () => {
    console.log('stopOnboarding')
    setShow(false)
    setShowQuickExitOnboarding(false)
  }
  useEffect(() => {
    if (!showQuickExitOnboarding) stopOnboarding()
  }, [showQuickExitOnboarding])

  useEffect(() => {
    if (!showQuickExitOnboarding) {
      timeouts.forEach((timeout) => clearTimeout(timeout))
      setTimeouts([])
      return
    }

    const msgTimeoutShow = setTimeout(() => {
      setShow(true)
      const msgTimeoutHide = setTimeout(() => {
        setShow(false)
      }, 120000)
      setTimeouts((prev) => [...prev, msgTimeoutHide])
    }, 300) // show after 30 seconds
    setTimeouts((prev) => [...prev, msgTimeoutShow])
  }, [showQuickExitOnboarding])

  //&#8630;
  return show ? (
    <div className={'quick-exit-onboarding-wrap' + (show ? ' show' : ' ')}>
      <div>{children}</div>
      <div className='quick-exit-onboarding'>
        <div className='quick-exit-onboarding-arrow-wrap'>
          <div className='quick-exit-onboarding-arrow'>
            <CurvedLineAnimation />
          </div>
        </div>
        <div className='quick-exit-onboarding-message' onClick={stopOnboarding}>
          <div>This is the quick exit button</div>
          <div>Click it to exit fast to google.com</div>
          <div>Drag to position it</div>
          <div>Hide it in settings</div>
          <div>Access settings from the menu</div>
          <div>Tap to here hide this message</div>
        </div>
      </div>
    </div>
  ) : (
    <div>{children}</div>
  )
}

QuickExitOnboarding.propTypes = {
  children: PropTypes.func.isRequired,
  showOnboarding: PropTypes.bool,
}

QuickExitOnboarding.displayName = 'QuickExitOnboarding'

export default QuickExitOnboarding
