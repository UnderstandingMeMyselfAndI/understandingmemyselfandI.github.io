import React, { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { TIMELINE_DATA } from './data'
import parse from 'html-react-parser'
import './styles.scss'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// REMOVED: ScrollTrigger.normalizeScroll(true) -> This was breaking your scroll

const VerticalTimeline = () => {
  const containerRef = useRef(null)
  const minimapRef = useRef(null)
  const markerRef = useRef(null)

  useGSAP(
    () => {
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
    { scope: containerRef },
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
      id='activity-timeline'
      className='timeline-wrapper activity activity-timeline  fixed'>
      {/* MINIMAP */}
      <div className='minimap-container'>
        <div className='minimap-track' ref={minimapRef} onClick={handleClick}>
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

      {/* 2. NEW: CENTRAL DOTTED LINE */}
      {/* Positioned absolute/fixed behind the scroll container */}
      <div className='central-dotted-line'></div>

      {/* SCROLL AREA */}
      <div className='main-scroll-container' ref={containerRef}>
        <div className='content-wrapper'>
          <div className='global-spacer'>
            <div>Detox &amp; Recovery Timeline</div>
            <div>
              <p>
                Information provided is for support purposes only and is not
                considered medical advice.
              </p>
              <p>For medical advice please consult a medical professional.</p>
            </div>
          </div>

          {TIMELINE_DATA.map((section) => (
            <div key={section.id} className='timeline-section'>
              <div className='section-background-layer'>
                <div className='background-content'>
                  <div className='marker-label start'>{section.startLabel}</div>
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
            Continue to enjoy Alcohol-free life
          </div>
        </div>
      </div>
    </div>
  )
}

export default VerticalTimeline
