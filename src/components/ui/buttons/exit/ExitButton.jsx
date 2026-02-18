import { useEffect, useState, useRef } from 'react'
import Draggable from 'react-draggable'
import useAppStore from '@/store/useAppStore'
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined'
import QuickExitOnboarding from '../../exit/QuickExitOnboarding'
import PropTypes from 'prop-types'
import './styles.scss'

const ExitButton = ({ handleClick }) => {
  const maxX = 80
  const minX = 0
  const maxY = 90
  const minY = 15
  const menuBoundsX = 120
  const menuBoundsY = 60

  // Threshold to distinguish between a tap and a drag
  const DRAG_THRESHOLD = 5

  const restrictPos = (data) => {
    if (data.x < minX) data.x = minX
    if (data.x > window.innerWidth - maxX) data.x = window.innerWidth - maxX
    if (data.y < minY) data.y = minY
    if (data.y > window.innerHeight - maxY) data.y = window.innerHeight - maxY

    if (data.y < menuBoundsY && data.x > window.innerWidth - menuBoundsX) {
      data.x = window.innerWidth - menuBoundsX
      data.y = menuBoundsY
    }
    return data
  }

  const nodeRef = useRef(null)
  // Store start position to calculate drag distance
  const dragStartPos = useRef({ x: 0, y: 0 })

  const [buttonPosition, setButtonPosition] = useState(restrictPos({ x: minX, y: window.innerHeight * 0.5 }))

  const exitButtonPosition = useAppStore((s) => s.exitButtonPosition)
  const setExitButtonPosition = useAppStore((s) => s.setExitButtonPosition)
  const showQuickExitOnboarding = useAppStore((state) => state.showQuickExitOnboarding)
  const setShowQuickExitOnboarding = useAppStore((state) => state.setShowQuickExitOnboarding)

  useEffect(() => {
    setButtonPosition(exitButtonPosition)
  }, [exitButtonPosition])

  const handleDragStart = (e, data) => {
    // if (showQuickExitOnboarding) setShowQuickExitOnboarding(false)
    dragStartPos.current = { x: data.x, y: data.y }
  }

  const handleDragStop = (e, data) => {
    const restrictedData = restrictPos({ x: data.x, y: data.y })
    setExitButtonPosition({ x: restrictedData.x, y: restrictedData.y })

    // Calculate distance moved
    const deltaX = Math.abs(data.x - dragStartPos.current.x)
    const deltaY = Math.abs(data.y - dragStartPos.current.y)

    // If movement is within threshold, treat it as a click
    if (deltaX < DRAG_THRESHOLD && deltaY < DRAG_THRESHOLD) {
      handleClick()
    }
  }

  const label = 'Q.Exit'

  return (
    <Draggable
      position={buttonPosition}
      defaultPosition={buttonPosition}
      onStart={handleDragStart}
      onStop={handleDragStop}
      handle='.exit-wrap'
      nodeRef={nodeRef}>
      <div ref={nodeRef}>
        <QuickExitOnboarding showOnboarding={true}>
          <div className='exit-wrap label'>
            <div className={'exit-btn'} onClick={handleClick}>
              <ExitToAppOutlinedIcon className='icon' />
            </div>
            <div className='label'>{label}</div>
          </div>
        </QuickExitOnboarding>
      </div>
    </Draggable>
  )
}

ExitButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

ExitButton.displayName = 'ExitButton'
export default ExitButton
