import { useState, useRef, useEffect } from 'react'
import Logo from 'ui/logo/Logo.jsx'
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined'
import useAppStore from '@/store/useAppStore'
import { ErrorBoundary } from 'react-error-boundary'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useOnInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import './styles.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Header = () => {
  const [open, setOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [isFirstCall, setIsFirstCall] = useState(true)

  const cont = useRef()
  const groupRef = useRef()
  const arrowsCont = useRef()

  const aniLoopRefs = useRef([])
  const aniLeaveRefs = useRef([])
  const loopTimelines = useRef([])
  const leaveTimeline = useRef()

  aniLoopRefs.current = []
  aniLeaveRefs.current = []

  const addLeaveRef = (el) => {
    if (el && !aniLeaveRefs.current.includes(el)) {
      aniLeaveRefs.current.push(el)
    }
  }

  const addLoopRef = (el) => {
    if (el && !aniLoopRefs.current.includes(el)) {
      aniLoopRefs.current.push(el)
    }
  }

  const activity = useAppStore((s) => s.activity)

  useEffect(() => {
    setOpen(activity === -1)
  }, [activity])

  useGSAP(
    () => {
      if (!open) return

      if (!isLeaving && leaveTimeline.current) {
        leaveTimeline.current.kill()
      }

      if (isLeaving) {
        // --- SMOOTHLY END LOOP ANIMATIONS ---
        loopTimelines.current.forEach((tl) => {
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
            y: -60,
            rotateX: '60deg',
            rotateY: '0',
            rotateZ: '0deg',
            x: 0,
            duration: 0.5,
            ease: 'power4.out',
          }, // Logo
          {
            y: 710,
            rotateX: '0',
            autoAlpha: 0.95,
            rotateY: '0deg',
            rotateZ: '90deg',
            scale: 2,
            x: -55,
            duration: 0.35,
            transformOrigin: '100% 10%',
            ease: 'power4.out',
          }, // Understanding
          {
            y: 0,
            rotateX: '0deg',
            autoAlpha: 0,
            rotateY: '0deg',
            rotateZ: '0deg',
            x: 0,
            duration: 0.85,
            ease: 'power4.out',
          }, // Me
          {
            y: 570,
            rotateX: '0deg',
            autoAlpha: 0.95,
            rotateY: '0',
            rotateZ: '90deg',
            scale: 2,
            x: -75,
            duration: 0.35,
            transformOrigin: '100% 10%',
            ease: 'power4.out',
          }, // Myself
          {
            y: 0,
            rotateX: '0deg',
            autoAlpha: 0,
            rotateY: '0',
            rotateZ: '0deg',
            x: 0,
            duration: 0.85,
            transformOrigin: '100% 10%',
            ease: 'power4.out',
          }, // &
          {
            y: 0,
            rotateX: '0',
            autoAlpha: 0,
            rotateY: '0deg',
            rotateZ: '0deg',
            x: 0,
            duration: 0.85,
            transformOrigin: '100% 10%',
            ease: 'power4.out',
          }, // I
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
          transformOrigin: (i) =>
            leaveAnimations[i].transformOrigin || '50% 50%',
          x: (i) => leaveAnimations[i].x,
          y: (i) => leaveAnimations[i].y,
        })
      } else {
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

        // --- LOOP ANIMATIONS ---
        loopTimelines.current.forEach((tl) => tl && tl.restart())

        if (loopTimelines.current.length > 0) return

        const logoTl = gsap
          .timeline({
            repeat: 5,
            repeatDelay: 2,
            yoyo: true,
            defaults: { duration: 0.65, ease: 'power3.inOut' },
          })
          .fromTo(
            aniLoopRefs.current[0],
            { autoAlpha: 0, scale: 1.2 },
            { autoAlpha: 1, scale: 1, duration: 0.85, ease: 'back.inOut' },
          )
          .to(aniLoopRefs.current[0], { autoAlpha: 1, delay: 9.4 })
          .to(aniLoopRefs.current[0], {
            autoAlpha: 0,
            scale: 0.8,
            duration: 0.6,
          })
        loopTimelines.current[0] = logoTl

        const loopAnimations = [
          null, // logo handled above
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

        aniLoopRefs.current.forEach((el, i) => {
          if (i === 0) return // Skip logo
          const tl = gsap.timeline({ ...config, delay: 2 })
          tl.fromTo(el, loopAnimations[i][0], loopAnimations[i][1])
          if (loopAnimations[i][2]) tl.to(el, loopAnimations[i][2])
          if (loopAnimations[i][3]) tl.to(el, loopAnimations[i][3])
          loopTimelines.current[i] = tl
        })
      }
    },
    { dependencies: [open, isLeaving], scope: cont },
  )

  // TODO #25 Maybe use ScrollTrigger isInViewport and drop thei library
  //https://gsap.com/docs/v3/Plugins/ScrollTrigger/static.positionInViewport()
  const inViewRef = useOnInView(
    (inView) => {
      if (isFirstCall) {
        setIsFirstCall(false)
        return
      }
      setIsLeaving(!inView)
    },
    {
      threshold: 0.1,
      rootMargin: '-35% 0% -45% 0%',
    },
  )

  return (
    <section
      id='header'
      className={'activity header' + (open ? ' show' : ' hide')}
      ref={cont}
    >
      <div className='leavingWrap' ref={inViewRef}>
        <div className={'group-wrap'}>
          <div className='home-grp'>
            <ErrorBoundary FallbackComponent={<>Logo had an error</>}>
              <div className='home-logo-wrap' ref={addLeaveRef}>
                <div className='home-logo homelogo' ref={addLoopRef}>
                  <Logo />
                </div>
              </div>
            </ErrorBoundary>
            <div className={`wgrp ss-0`} ref={groupRef}>
              <div>
                <div className='logoType'>
                  <ErrorBoundary FallbackComponent={<>W0 had an error</>}>
                    <div className='w0w' ref={addLeaveRef}>
                      <div
                        className={'r1 w0' + (isLeaving ? ' leaving' : '')}
                        ref={addLoopRef}
                      >
                        Understanding
                      </div>
                    </div>
                  </ErrorBoundary>
                  <div className='r2'>
                    <ErrorBoundary FallbackComponent={<>W1 had an error</>}>
                      <div className='w1w' ref={addLeaveRef}>
                        <div
                          className={'w1' + (isLeaving ? ' leaving' : '')}
                          ref={addLoopRef}
                        >
                          Me
                        </div>
                      </div>
                    </ErrorBoundary>
                    <ErrorBoundary FallbackComponent={<>W2 had an error</>}>
                      <div className='w2w' ref={addLeaveRef}>
                        <div
                          className={'w2' + (isLeaving ? ' leaving' : '')}
                          ref={addLoopRef}
                        >
                          Myself
                        </div>
                      </div>
                    </ErrorBoundary>
                    <ErrorBoundary FallbackComponent={<>W3 had an error</>}>
                      <div className='w3w' ref={addLeaveRef}>
                        <div className='w3' ref={addLoopRef}>
                          &
                        </div>
                      </div>
                    </ErrorBoundary>
                    <ErrorBoundary FallbackComponent={<>W4 had an error</>}>
                      <div className='w4w' ref={addLeaveRef}>
                        <div className='w4' ref={addLoopRef}>
                          I
                        </div>
                      </div>
                    </ErrorBoundary>
                  </div>
                </div>
              </div>
            </div>
            <div className='arrow-grp-1' ref={arrowsCont}>
              <div className='arrow-cont a1'>
                <ArrowDownwardOutlinedIcon className='arrow' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

Header.propTypes = {}

export default Header
