import { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { activities } from '@/data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
import './ExpandableContent.css'

const ExpandableContent = ({
  children,
  maxHeight = 200,
  showButton = true,
  buttonText = { more: 'Show More', less: 'Show Less' },
  fadeHeight = 60,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [needsExpand, setNeedsExpand] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      setNeedsExpand(contentHeight > maxHeight)
    }
  }, [children, maxHeight])

  const setIsModal = useAppStore((s) => s.setIsModal)
  const id = -1
  useEffect(() => {
    setIsModal(true)
  }, [isExpanded])

  return (
    <div className='expandable-content-container'>
      <div
        ref={contentRef}
        className={`expandable-content ${isExpanded ? 'expanded' : ''}`}>
        {children}
      </div>

      {/* Gradient overlay when collapsed */}
      {!isExpanded && needsExpand && (
        <div
          className='content-fade-overlay'
          style={{ height: `${fadeHeight}px` }}
        />
      )}

      {/* Toggle button */}
      {showButton && needsExpand && (
        <button
          className='expand-toggle-button'
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}>
          {isExpanded ? buttonText.less : buttonText.more}
        </button>
      )}
    </div>
  )
}

ExpandableContent.propTypes = {
  children: PropTypes.node.isRequired,
  maxHeight: PropTypes.number,
  showButton: PropTypes.bool,
  buttonText: PropTypes.shape({
    more: PropTypes.string,
    less: PropTypes.string,
  }),
  fadeHeight: PropTypes.number,
}

export default ExpandableContent
