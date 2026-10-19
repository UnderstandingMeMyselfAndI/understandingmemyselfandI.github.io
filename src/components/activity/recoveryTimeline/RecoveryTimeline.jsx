import { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import CloseBtn from '@components/ui/buttons/close/CloseBtn'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import RecoveryDayCount from './RecoveryDayCount'
import { useGSAP } from '@gsap/react'
import { isOdd } from '@js/utils.js'
import './styles.scss'
// function debounce(func, delay) {
//   let timeoutId

//   return function (...args) {
//     // Clear the previous timeout
//     clearTimeout(timeoutId)

//     // Set a new timeout
//     timeoutId = setTimeout(() => {
//       func.apply(this, args)
//     }, delay)
//   }
// }
const RecoveryTimeline = ({ data, config, onClose }) => {
  gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother)

  const [timelineData, setTimelineData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  // const [enableScrollEffects, setEnableScrollEffects] = useState(false)
  const [error, setError] = useState(null)
  const componentRef = useRef(null)
  // const [groupMaxDays, setGroupMaxDays] = useState(1)
  const [currentDay, setCurrentDay] = useState(-1)
  const scrollContainerRef = useRef()
  // const containerRef = useRef()
  // const layerOneRef = useRef(null);
  // const layerTwoRef = useRef(null);
  const scrollerRef = useRef()
  // const mainTimeline = useRef(null);
  // const timePeriodRefs = useRef([])
  // const categoryRefs = useRef([[]])
  // const smoother = useRef()

  useEffect(() => {
    try {
      if (data) {
        setTimelineData(data)
      }
      setIsLoading(false)
    } catch {
      setError('Failed to load timeline data.')
      setIsLoading(false)
    }
  }, [data])

  // useEffect(() => {
  //   if (!isLoading && timelineData && config) {
  //     setEnableScrollEffects(true)
  //   }
  // }, [isLoading, timelineData, config, error])

  // const setGroup = (i) => {
  //   const groups = gsap.utils.toArray('.change-group-wrap')
  //   if (!groups[i]) return
  //   const maxDays = parseInt(groups[i].getAttribute('@data-day-range'))
  //   maxDays ? setGroupMaxDays(maxDays) : null
  // }

  const scrollContainer = document.querySelector('.box-scroller')
  scrollContainer?.addEventListener('scroll', () => {
    // console.log('scrollTop ');
  })

  // const calculateDay = () => {
  //   const computedStyle = window.getComputedStyle(scrollContainer)

  //   const transform = computedStyle.transform || computedStyle.webkitTransform

  //   if (transform && transform !== 'none') {
  //     const matrix = transform.match(/matrix\(([^)]+)\)/)

  //     // Split the matrix values
  //     const values = matrix[1].split(',').map(Number)
  //     // // In matrix, the Y translation is at index 5 (0-based)

  //     const yTranslation = values[5]
  //     // // The scroll position (top) would be the negative of this value
  //     const scrollTop = -yTranslation

  //     if (!scrollTop) return

  //     // console.log('scrollTop ', scrollTop);

  //     const pos = scrollTop / (scrollContainer.scrollHeight - window.innerHeight)
  //     const day = Math.ceil(groupMaxDays * pos)
  //     day !== currentDay && setCurrentDay(day)
  //     // console.log('day', day, ' pos ', pos);
  //     // console.log(
  //     //   'scrollTop ',
  //     //   scrollTop,
  //     //   'scrollContainer.scrollHeight ',
  //     //   scrollContainer.scrollHeight,
  //     // );
  //   }
  // }

  // const addTimePeriodRef = (el) => {
  //   if (el && !timePeriodRefs.current.includes(el)) {
  //     timePeriodRefs.current.push(el)
  //   }
  // }
  // Handle retry
  const handleRetry = () => {
    setIsLoading(true)
    setError(null)
    if (data) {
      setTimelineData(data)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className='timeline-loading'>Loading...</div>
  }

  if (error) {
    return (
      <div className='timeline-error'>
        <p>{error}</p>
        <button onClick={handleRetry}>Retry</button>
      </div>
    )
  }
  if (!timelineData || !Array.isArray(timelineData.timeline) || timelineData.timeline.length === 0) {
    return <div className='timeline-empty'>No timeline data available.</div>
  } else {
    // console.log('timelineData', timelineData);
  }
  function getSymptoms(which) {
    let symptonCount = 0
    let pushNext = false
    const odd = which === 'odd' ? false : true
    return timelineData.timeline.map((period, index) => {
      return (
        <div className={`symptoms-column ${which} ` + period.id} data-speed='clamp(1.5)' key={index}>
          {period.symptoms.map((symptom, i) => {
            if (i === period.symptoms.length - 1 && isOdd(i) === !odd) {
              pushNext = true
            } else if (i === period.symptoms.length - 1) {
              pushNext = false
            }

            symptonCount++
            return isOdd(symptonCount) === odd ? (
              <div className={'symptom-title' + (pushNext ? ' push' : '')} key={'sym-' + i}>
                <div>{period.id}</div>
                <div data-period={period.id}>{symptom}</div>
              </div>
            ) : null
          })}
        </div>
      )
    })
  }

  let boxCount = 0

  return (
    <div className='timeline-container' ref={componentRef} role='feed' aria-busy={isLoading}>
      {/* Fixed Header */}
      <header className='timeline-header'>
        <div>
          <h1>{timelineData?.header?.title}</h1>
          <p>{timelineData?.header?.description}</p>
        </div>
        <CloseBtn onClick={onClose} aria-label='Close timeline' />
      </header>

      {/* Scrollable Content */}

      <div>
        <div className='timeline-scroll-container' ref={scrollerRef}>
          <RecoveryDayCount currentDay={currentDay} startDay={-1} />

          {/* Layer One: Time Period Headers */}
          <div id='smooth-wrapper'>
            <div id='smooth-content' ref={scrollContainerRef}>
              <div className='scroller'>
                <div
                  className='box-column '
                  // style={{ height: 160 * symptonCount + 'px' }}
                >
                  {timelineData.timeline.map((period, timeIndex) => (
                    <div className='box-column-wrap even ' data-speed='clamp(1.5)' key={timeIndex}>
                      {period.symptoms.map((symptom, grpIndex) => {
                        boxCount++

                        return (
                          <div className='box-wrapper' key={'p-' + grpIndex}>
                            <div className='box' data-period={period.id}>
                              {boxCount}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
                {}
                <div className='symptoms-time-period-columns' data-speed='clamp(1.5)'>
                  {timelineData.timeline.map((period, pI) => (
                    <div className='symptoms-time-period-column' key={pI}>
                      {period.symptoms.map((symptom, gI) => {
                        return (
                          <div key={'sym-' + gI} data-period={period.id} className={'period-title'}>
                            {period.timePeriod}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
                <div className={'symptoms-column-wrap odd'}>{getSymptoms('odd')}</div>
                <div className={'symptoms-column-wrap even'}>{getSymptoms('even')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

RecoveryTimeline.propTypes = {
  /**
   * The data object containing all timeline information.
   */
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    timePeriods: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        header: PropTypes.string.isRequired,
        numDays: PropTypes.number.isRequired,
        offset: PropTypes.number.isRequired,
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['physical', 'lifestyle', 'mental']).isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
          }),
        ).isRequired,
      }),
    ),
  }),
  /**
   * Configuration for the timeline.
   */
  config: PropTypes.object,
  /**
   * Function to handle closing the timeline view.
   */
  onClose: PropTypes.func.isRequired,
}

export default RecoveryTimeline
