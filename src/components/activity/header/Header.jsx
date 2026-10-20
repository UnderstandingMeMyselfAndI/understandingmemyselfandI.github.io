import { useState, useRef, useEffect } from 'react'
import Logo from '@ui/logo/Logo.jsx'
// import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
// import useAppStore from '@store/useAppStore'
import { ErrorBoundary } from 'react-error-boundary'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import gsap from 'gsap'
import { useOnInView } from 'react-intersection-observer'

// import { activities } from '@data/config'
// const activitiesById = activities.reduce((acc, activity) => {
//   acc[activity.id] = activity
//   return acc
// }, {})
import './header.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Header = () => {
  const name = 'header'
  const [isLeaving, setIsLeaving] = useState(false)
  const [isFirstCall, setIsFirstCall] = useState(true)
  const cont = useRef()
  const groupRef = useRef()

  const aninamtionRefs = useRef([])
  const aniLeaveRefs = useRef([])
  const timelines = useRef([])
  const leaveTimeline = useRef()
  const logoRef = useRef()
  const logoImgRef = useRef()

  const addLeaveRef = (el) => {
    if (el && !aniLeaveRefs.current.includes(el)) {
      aniLeaveRefs.current.push(el)
    }
  }

  const addLoopRef = (el) => {
    if (el && !aninamtionRefs.current.includes(el)) {
      aninamtionRefs.current.push(el)
    }
  }

  useGSAP(
    () => {
      console.log('logoTimeline')
      const config = {
        repeat: -1,
        repeatDelay: 2,
        delay: 0,
        yoyo: false,
        defaults: { duration: 0.65, ease: 'power3.inOut' },
      }
      let logoTimeline = gsap.timeline(config)
      // let tl = gsap.timeline()
      logoTimeline
        // .to('.ummi-logo-img', { autoAlpha: 0, rotation: -45, duration: 0.01, delay: 0 })
        // .to(logoRef.current, { autoAlpha: 0, scale: 0.95, duration: 0.01 }, '-=0.1')
        .to('.ummi-logo-img', { autoAlpha: 1, rotation: 0, duration: 0.6, delay: 0, ease: 'power3.inOut' })
        .to(logoRef.current, { autoAlpha: 1, scale: 1, duration: 0.85, delay: 0, ease: 'power3.inOut' }, '-=0.6')
        .to(logoRef.current, { autoAlpha: 1, delay: 6 })
        .to('.ummi-logo-img', { rotation: 35, duration: 0.3, delay: 0, ease: 'elastic.inOut' }, '-=0.3')
        .to('.ummi-logo-img', { rotation: -15, duration: 0.3, delay: 0, ease: 'elastic.inOut' }, '-=0.0')
        .to('.ummi-logo-img', { rotation: 0, duration: 0.3, delay: 0, ease: 'elastic.inOut' }, '-=0.0')
        .to(
          logoRef.current,
          {
            autoAlpha: 0,
            scale: 0.9,
            duration: 0.6,
          },
          '-=0.2',
        )
    },
    { dependencies: [logoRef, logoImgRef] },
  )
  useGSAP(
    () => {
      // if (!open) return
      console.log('isLeaving', isLeaving)
      if (!isLeaving && leaveTimeline.current) {
        leaveTimeline.current.kill()
      }

      if (isLeaving) {
        // --- SMOOTHLY END LOOP ANIMATIONS ---
        timelines.current.forEach((tl) => {
          if (tl) {
            gsap.to(tl, {
              progress: 1,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                tl.pause()
              },
            })
          }
        })

        // --- LEAVE ANIMATION ---
        const leaveAnimations = [
          {
            // Understanding
            rotateX: '0',
            autoAlpha: 0.95,
            rotateY: '0deg',
            rotateZ: '90deg',
            scale: 2,
            x: -55,
            y: '80vh',
            duration: 0.75,
            transformOrigin: '100% 10%',
            ease: 'circ.inOut',
          },
          {
            // Me
            rotateX: '0deg',
            autoAlpha: 0,
            rotateY: '0deg',
            rotateZ: '0deg',
            x: 0,
            y: 0,
            duration: 0.85,
            ease: 'power4.out',
          },
          {
            // Myself
            rotateX: '0deg',
            autoAlpha: 0.95,
            rotateY: '0',
            rotateZ: '90deg',
            scale: 2,
            x: -75,
            y: '60vh',
            duration: 0.75,
            transformOrigin: '100% 10%',
            ease: 'circ.inOut',
          },
          {
            // &
            rotateX: '0deg',
            autoAlpha: 0,
            rotateY: '0',
            rotateZ: '0deg',
            x: 0,
            y: 0,
            duration: 0.85,
            transformOrigin: '100% 10%',
            ease: 'power4.out',
          },
          {
            // I
            y: 0,
            rotateX: '0',
            autoAlpha: 0,
            rotateY: '0deg',
            rotateZ: '0deg',
            x: 0,
            duration: 0.85,
            transformOrigin: '100% 10%',
            ease: 'power4.out',
          },
        ]

        leaveTimeline.current = gsap.timeline()

        leaveTimeline.current.to(aniLeaveRefs.current, {
          duration: (i) => leaveAnimations[i].duration || 1.85,
          autoAlpha: (i) => leaveAnimations[i].autoAlpha || 0,
          ease: 'power4.out',
          stagger: 0.075,
          overwrite: 'auto',
          force3D: 'auto',
          rotateX: (i) => leaveAnimations[i].rotateX,
          scale: (i) => leaveAnimations[i].scale || 1,
          rotateY: (i) => leaveAnimations[i].rotateY,
          rotateZ: (i) => leaveAnimations[i].rotateZ,
          transformOrigin: (i) => leaveAnimations[i].transformOrigin || '50% 50%',
          x: (i) => leaveAnimations[i].x,
          y: (i) => leaveAnimations[i].y,
        })
      } else {
        // console.log('start aniLeaveRefs ', aniLeaveRefs)
        // console.log('start aniLeaveRefs.current ', aniLeaveRefs.current)
        // console.log('start loopTimelines.current.length ', timelines.current.length)
        // --- RETURN ANIMATION ---
        gsap.killTweensOf(aniLeaveRefs.current)
        gsap.to(aniLeaveRefs.current, {
          duration: 0.5,
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          scale: 1,
          transformOrigin: '50% 50%',
          x: 0,
          ease: 'power3.out',
          stagger: 0.05,
          force3D: 'auto',
        })
        // --- Logo Timelines ---

        const animations = [
          [
            // Understanding
            { autoAlpha: 0, rotateX: '-80deg', y: -50 },
            { autoAlpha: 1, rotateX: 0, y: 0, ease: 'back.inOut' },
            { delay: 3 },
          ],
          [
            // Me
            { autoAlpha: 0, rotateY: '-80deg', x: -15, delay: 0.5 },
            { autoAlpha: 1, rotateY: '0deg', x: 0, delay: 0.7 },
            { delay: 3 },
          ],
          [
            // Myself
            { autoAlpha: 0, scale: 0.9, rotateX: '0deg' },
            { autoAlpha: 1, scale: 1, duration: 0.75, delay: 0.35 },
            { delay: 3 },
          ],
          [
            // &
            { autoAlpha: 0, rotateX: '80deg', y: 30 },
            { autoAlpha: 1, rotateX: '0deg', y: 0 },
            { duration: 1.5, rotateY: '2160deg', delay: 0.65 },
          ],
          [
            // I
            {
              autoAlpha: 0,
              y: 30,
              rotateZ: '-115deg',
              transformOrigin: 'left top',
            },
            {
              autoAlpha: 1,
              y: 0,
              rotateZ: '0deg',
              delay: 0.95,
              duration: 1,
              ease: 'bounce.out',
              transformOrigin: 'left top',
            },
            { delay: 3 },
          ],
        ]

        const config = {
          repeat: -1,
          repeatDelay: 3,
          yoyo: true,
          defaults: { duration: 0.5, ease: 'power3.out', force3D: 'auto' },
        }

        aninamtionRefs.current.forEach((el, i) => {
          const tl = gsap.timeline({ ...config, delay: 2 })
          if (i !== 0) {
            tl.fromTo(el, animations[i][0], animations[i][1])
            if (animations[i][2]) tl.to(el, animations[i][2])
            if (animations[i][3]) tl.to(el, animations[i][3])
            timelines.current[i] = tl
          }
        })
      }
    },
    { dependencies: [isLeaving], scope: cont },
  )

  // TODO #25 Maybe use ScrollTrigger isInViewport and drop the library
  //https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.positionInViewport()
  const inViewData = useRef(true)

  const inViewRef = useOnInView(
    (inView) => {
      inViewData.current = inView
      if (isFirstCall) {
        setIsFirstCall(false)
        return
      }
      setIsLeaving((prev) => !prev)
    },
    {
      threshold: 0.1,
      rootMargin: '-55% 0% 5% 0%',
    },
  )

  // Sync isLeaving when isModal changes
  useEffect(() => {
    setIsLeaving(!inViewData.current)
  }, [])

  return (
    <section id='header' className={`activity activity-${name}`} ref={cont}>
      <div className='header' ref={inViewRef}>
        <div className={'header__group-wrap'}>
          <div className='header__home-group'>
            <div className='header__home-logo-wrap'>
              <div className='header__logo-animation-wrap' ref={logoRef}>
                <Logo ref={logoImgRef} />
              </div>
            </div>

            <div className={`header__wgrp ss-0`} ref={groupRef}>
              <div>
                <div className='header__logo-type'>
                  <ErrorBoundary FallbackComponent={<></>}>
                    <div className='header__w0w' ref={addLeaveRef}>
                      <div className={'header__r1 header__w0' + (isLeaving ? ' leaving' : '')} ref={addLoopRef}>
                        Understanding
                      </div>
                    </div>
                  </ErrorBoundary>
                  <div className='header__r2'>
                    <ErrorBoundary FallbackComponent={<></>}>
                      <div className='header__w1w' ref={addLeaveRef}>
                        <div className={'header__w1' + (isLeaving ? ' leaving' : '')} ref={addLoopRef}>
                          Me
                        </div>
                      </div>
                    </ErrorBoundary>
                    <ErrorBoundary FallbackComponent={<></>}>
                      <div className='header__w2w' ref={addLeaveRef}>
                        <div className={'header__w2' + (isLeaving ? ' leaving' : '')} ref={addLoopRef}>
                          Myself
                        </div>
                      </div>
                    </ErrorBoundary>
                    <ErrorBoundary FallbackComponent={<></>}>
                      <div className='header__w3w' ref={addLeaveRef}>
                        <div className='header__w3' ref={addLoopRef}>
                          &
                        </div>
                      </div>
                    </ErrorBoundary>
                    <ErrorBoundary FallbackComponent={<></>}>
                      <div className='header__w4w' ref={addLeaveRef}>
                        <div className='header__w4' ref={addLoopRef}>
                          I
                        </div>
                      </div>
                    </ErrorBoundary>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='header__arrow-group-1' ref={arrowsCont}>
              <div className='header__arrow-cont a1'>
                <ArrowDownwardOutlinedIcon className='header__arrow' />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}

Header.propTypes = {}

export default Header
