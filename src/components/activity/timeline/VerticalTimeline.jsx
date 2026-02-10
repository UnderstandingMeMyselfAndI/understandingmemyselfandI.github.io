import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { TIMELINE_DATA } from '@/data/timelineData'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import { strings } from '@/data/config'
import parse from 'html-react-parser'
import Confirm from 'ui/confirm/Confirm'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
const activityStringsByName = strings.activity.reduce((acc, activity) => {
  acc[activity.name] = activity
  return acc
}, {})

import './styles.scss'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const VerticalTimeline = () => {
  const name = 'recovery-timeline'
  const id = 21
  const [show, setShow] = useState(false)
  const activity = useAppStore((s) => s.activity)
  const setActivity = useAppStore((s) => s.setActivity)
  // const isModal = useAppStore((s) => s.isModal)
  // const activityID = activities.find((activity) =>
  //   activity.url === name ? activity.id : null,
  // )
  const strings = activityStringsByName[name]
  const setIsModal = useAppStore((s) => s.setIsModal)

  const containerRef = useRef(null)
  const minimapRef = useRef(null)
  const markerRef = useRef(null)

  const [showConfirm, setShowConfirm] = useState(true)

  useEffect(() => {
    show && setIsModal(activitiesById[id]?.modal)
  }, [show, activitiesById, id, setIsModal])

  useEffect(() => {
    setShow(id === activity)
    setShowConfirm(id === activity)
  }, [activity])

  const handleClose = () => {
    setShow(false)
    setActivity(-1)
  }

  const handleConfirm = () => {
    setShowConfirm(false)
    ScrollTrigger.refresh()
  }
  const handleConfirmCancel = () => {
    setShowConfirm(false)
    setActivity(-1)
  }

  useGSAP(
    () => {
      if (!show) return
      const scrollContainer = containerRef.current

      // 1. MINIMAP TRACKER
      ScrollTrigger.create({
        scroller: scrollContainer,
        trigger: '.content-wrapper',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const trackH = minimapRef.current?.clientHeight || 0
          const markerH = markerRef.current?.clientHeight || 0
          gsap.set(markerRef.current, { y: self.progress * (trackH - markerH) })
        },
      })

      // 2. PINNING SECTIONS
      const sections = gsap.utils.toArray('.timeline-section')
      sections.forEach((section) => {
        const backgroundLayer = section.querySelector(
          '.section-background-layer',
        )

        ScrollTrigger.create({
          scroller: scrollContainer,
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          pin: backgroundLayer,
          pinType: 'transform',
          scrub: true,
        })
      })
    },
    { dependencies: [showConfirm, show], scope: containerRef },
  )

  // 3. MINIMAP CLICK
  const handleClick = (e) => {
    const track = minimapRef.current
    const scrollContainer = containerRef.current
    if (!track || !scrollContainer) return

    const rect = track.getBoundingClientRect()
    const clickY = e.clientY - rect.top
    const percentage = clickY / rect.height

    const targetScroll =
      (scrollContainer.scrollHeight - scrollContainer.clientHeight) * percentage

    gsap.to(scrollContainer, {
      scrollTop: targetScroll,
      duration: 1,
      ease: 'power2.out',
    })
  }

  // Generate small background ticks
  const minimapTicks = Array.from({ length: 100 }).map((_, i) => i)

  return (
    <div
      id={name}
      className={
        'activity activity-' + name + (show ? ' show' : ' hide') + ' fixed'
      }>
      {showConfirm ? (
        <Confirm
          title={strings.confirm.title}
          instruction={strings.confirm.instruction}
          confirmLabel={strings.confirm.confirmBtnLabel}
          onConfirm={handleConfirm}
          onCancel={handleConfirmCancel}
          showCancel={true}
          cancelLabel={strings.confirm.cancelBtnLabel}
          showConfirm={true}
        />
      ) : (
        <>
          <CloseBtn onClick={handleClose} />
          {/* MINIMAP */}
          <div className='minimap-container'>
            <div
              className='minimap-track'
              ref={minimapRef}
              onClick={handleClick}>
              {/* A. The Moving Marker */}
              <div className='minimap-marker' ref={markerRef}></div>

              {/* B. The Background Ticks (Subtle) */}
              <div className='minimap-ticks-layer'>
                {minimapTicks.map((tick) => (
                  <div key={tick} className='mini-tick' />
                ))}
              </div>

              {/* C. NEW: The Thicker Section Lines */}
              <div className='minimap-sections-layer'>
                {TIMELINE_DATA.map((section, index) => (
                  <div
                    key={section.id}
                    className='section-divider-line'
                    // Distribute lines evenly based on section count
                    style={{ top: `${(index / TIMELINE_DATA.length) * 100}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* SCROLL AREA */}
          <div
            className='main-scroll-container scroll-container'
            ref={containerRef}>
            <div className='content-wrapper'>
              {/* 2. NEW: CENTRAL DOTTED LINE */}
              <div className='central-dotted-line'></div>
              {/* --- NEW: INTRO SECTION --- */}
              <div className='intro-section'>
                <div className='intro-content'>
                  <h1>{parse(strings.title)}</h1>
                  {strings.content.map((content, i) => (
                    <p key={i}>{parse(content)}</p>
                  ))}

                  <div className='scroll-indicator'>↓</div>
                </div>
              </div>
              {/* -------------------------- */}
              <div className='global-spacer'></div>

              {TIMELINE_DATA.map((section) => (
                <div key={section.id} className='timeline-section'>
                  <div className='section-background-layer'>
                    <div className='background-content'>
                      <div className='marker-label start'>
                        {section.startLabel}
                      </div>
                      <div>
                        <h1 className='huge-year'>{parse(section.period)}</h1>
                        <h2 className='huge-title'>{parse(section.title)}</h2>
                      </div>
                      <div className='marker-label end'>{section.endLabel}</div>
                    </div>
                  </div>
                  <div className='events-grid'>
                    {section.events.map((event) => (
                      <div key={event.id} className='event-card'>
                        <h3>{parse(event.title)}</h3>
                        <p>{parse(event.description)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className='global-spacer'>
                Enjoy being a better version of yourself
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default VerticalTimeline
