import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { clamp } from '@src/js/utils.js'
import FitText from './FitText'
import './Motivation.css'

gsap.registerPlugin(ScrollTrigger)

const Motivation = () => {
  const phrases = [
    'KNOW YOU ARE LOVED',
    'BELIEVE IN YOURSELF',
    "YOU'VE GOT THIS",
    'GOOD THINGS TAKE TIME',
    'NEVER GIVE UP',
    'YOU ARE ENOUGH',
    'WORK IN PROGRESS',
    "YOU'RE NOT LOST YOU'RE HERE",
    'YOU ARE IMPORTANT',
    'YOU ARE AMAZING',
    'YOU ARE BEAUTIFUL',
    'MAKE TODAY A GOOD DAY',
    'WAKE UP BOSS IT REPEAT',
    'BE PATIENT WITH YOURSELF',
    'TAKE IT EASY',
    'BE KIND TO YOURSELF',
    'YOU ARE YOUR ONLY LIMIT',
    'BE YOUR OWN BEST BUDDY',
    'DO WHATEVER IT TAKES',
    'YOU WILL BE OKAY',
    'GOOD THINGS TAKE TIME',
    'CELEBRATE THE SMALL WINS',
    'BE THE CHANGE YOU WANT TO SEE',
    'MISTAKES ARE OKAY',
    "IT CAN SEEM IMPOSSIBLE UNTIL IT'S DONE",
    'YOU ARE DOING AMAZING',
    'YOU ARE DOING GREAT',
    'KEEP UP THE WORK',
    'GO YOU',
    'YOU ARE AWESOME',
    'YOU ARE AMAZING',
    'YOU ARE FANTASTIC',
    'YOU ARE MAGIC',
    'YOU ARE GREAT',
    'LEARN FLOURISH GROW',
    'YOU ARE STRONG TO FACE IT',
    'THERE IS ALWAYS HOPE',
    'DONT COUNT THE DAYS, MAKE THE DAYS COUNT',
  ].flatMap((phrase) => phrase.split(' '))

  const container = useRef(null)
  const wordsRefs = useRef([])
  wordsRefs.current = []

  const addToRefs = (el) => {
    if (el && !wordsRefs.current.includes(el)) {
      wordsRefs.current.push(el)
    }
  }
  function floatToRadians(value) {
    // Multiply the 0-1 value by 2 * PI to get radians (0 to 2*PI)
    return value * Math.PI * 2
  }
  function clamp(input, min, max) {
    return input < min ? min : input > max ? max : input
  }
  function map(current, in_min, in_max, out_min, out_max) {
    const mapped =
      ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    return clamp(mapped, out_min, out_max)
  }
  const boundingBox = document.querySelector('.motivation-trigger')
  console.log('boundingBox', boundingBox)
  useGSAP(
    () => {
      wordsRefs.current.forEach((word, i) => {
        gsap.to(word, {
          scrollTrigger: {
            trigger: word,
            start: 'top bottom',
            end: 'bottom top',
            startTrigger: boundingBox,
            endTrigger: boundingBox,
            scrub: 0.1,
            markers: i == 0 ? true : false,
            id: 'word',
            onUpdate: (self) => {
              const progress = self.progress

              const rotation = Math.cos(floatToRadians(progress)) * -89
              const opacity = 1 - Math.abs(Math.cos(floatToRadians(progress)))
              //map(Math.abs(progress), -1, 1, 0, 1);
              const scale = Math.sin(floatToRadians(progress))
              //map(Math.abs(progress), -1, 1, -1, 1);
              if (i == 0) {
                // console.log(
                //   'progress ',
                //   i,
                //   ' ',
                //   Math.sin(floatToRadians(progress)),
                // );
                // console.log('opacity ', i, ' ', opacity);
                // console.log('rotation ', i, ' ', rotation);
                // console.log('scale ', i, ' ', scale);
                console.log(
                  'progress ',
                  i,
                  ' ',
                  Math.abs(Math.sin(floatToRadians(progress))),
                )
              }

              // console.log('rotation ', i, ' ', rotation);
              // console.log('scale ', i, ' ', scale);

              gsap.set(word, {
                rotationX: rotation,
                translateY: Math.sin(floatToRadians(progress)) * -150,
                opacity: opacity,
                scale: scale * 1.2,
                lineHeight: 1,
                // marginBottom: Math.sin(floatToRadians(progress)) * -35,
                // marginTop: Math.cos(floatToRadians(progress)) * -35,
                paddingBottom: 0,
                paddingTop: 0,
              })
            },
          },
          y: 0,
          ease: 'none',
        })
      })
    },
    { scope: container },
  )

  return (
    <div id='motivation' className='activity motivation-wrapper'>
      <div className='motivation-trigger'></div>
      <div ref={container} className='motivation-container'>
        <div className='motivation-words'>
          {phrases.map((word, i) => (
            <div
              key={i}
              ref={addToRefs}
              className='motivation-word'
              style={{ transform: 'translateY(100vh)' }}
            >
              {/* {word} */}
              <FitText text={word} containerRef={container} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Motivation
