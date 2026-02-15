import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Dialog from 'components/ui/dialog/Dialog'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import useAppStore from '@/store/useAppStore'
import './QuickExitOnboarding.scss'

const QuickExitOnboarding = ({ children }) => {
  const quickExitMessageEnabled = useAppStore((state) => state.quickExitMessageEnabled)
  const [show, setShow] = useState(false)

  const handleClick = () => {
    setShow(false)
  }
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 90000)
    }, 10000)
  })
  return show ? (
    <div className={'quick-exit-onboarding-wrap' + (show ? ' show' : ' ')} onClick={handleClick}>
      <div>{children}</div>
      <div className='quick-exit-onboarding'>
        <div className='quick-exit-onboarding-arrow-wrap'>
          <div className='quick-exit-onboarding-arrow'>&#8630;</div>
        </div>
        <div className='quick-exit-onboarding-message'>
          <div>This is the quick exit button.</div>
          <div>Click it to exit fast.</div>
          <div>Drag to position it.</div>
          <div>Hide it in settings.</div>
          <div>Tap to hide this message</div>
        </div>
      </div>
    </div>
  ) : (
    <div>{children}</div>
  )
}

QuickExitOnboarding.propTypes = {
  children: PropTypes.func.isRequired,
}

QuickExitOnboarding.displayName = 'QuickExitOnboarding'

export default QuickExitOnboarding
