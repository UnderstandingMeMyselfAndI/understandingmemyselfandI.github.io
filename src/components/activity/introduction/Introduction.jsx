import { useEffect, useState, useRef } from 'react'
import useAppStore from '@/store/useAppStore'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import { strings } from '@/data/config'
import Feature from './Feature'
import gsap from 'gsap' // <-- import GSAP
import { useGSAP } from '@gsap/react' // <-- import the hook from our React package
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
import { activities } from '@/data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
import '@/utils/IsMobile.js'
import './styles.scss'

const Introduction = () => {
  const name = 'introduction'
  const id = 0
  const [open, setOpen] = useState(true)
  const activity = useAppStore((s) => s.activity)
  const isModal = useAppStore((state) => state.isModal)
  const setIsModal = useAppStore((s) => s.setIsModal)
  // TODO: #46 #45 These content thresholds need revisiting
  const curiousThreshold = 16
  const newThreshold = 60
  const userThreshold = 120

  const sectionRefs = useRef([])
  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal, id, setOpen])

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  sectionRefs.current = []

  const content = strings.activity.find((activity) => activity.name === name) || null
  if (content === null) {
    console.warn(`No content found for activity "${name}"`)
  }

  const isInstalled = useAppStore((state) => state.isInstalled)
  const vc = useAppStore((state) => state.vc) // visit count

  function getRand(max) {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1
  }

  useGSAP(() => {}, { scope: sectionRefs, revertOnUpdate: true })

  if (!open) return null

  return (
    <section id='intro' className={'activity intro' + (open ? ' show' : ' hide')}>
      <div className='introduction-inner'>
        <div className='inner'>
          <h1 style={{ fontSize: '68px' }}>
            {(!isInstalled || (isInstalled && vc < curiousThreshold)) && (
              <b>
                <u>{content?.title}</u>
              </b>
            )}

            {isInstalled && vc >= curiousThreshold && (
              <u>
                {parse(
                  DOMPurify.sanitize(
                    content?.returning?.content?.titles[getRand(content?.returning?.content?.titles?.length - 1)],
                  ),
                )}
              </u>
            )}
          </h1>

          {isInstalled &&
            vc > newThreshold &&
            vc < curiousThreshold &&
            content?.installed.content?.map((cnt, i) => {
              return (
                <div key={`intro-${i}`} className={'subsection installed'} ref={addToRefs}>
                  {cnt?.title && (
                    <div className='subsection-title'>
                      <h2>{parse(DOMPurify.sanitize(cnt?.title))}</h2>
                    </div>
                  )}

                  {cnt?.content?.map((para, k) => {
                    return (
                      <Feature key={'p-' + k}>
                        {i === 1 && <DoneOutlineIcon className='icon' />}
                        <div key={k}>{parse(DOMPurify.sanitize(para))}</div>
                      </Feature>
                    )
                  })}
                </div>
              )
            })}

          {isInstalled && vc >= newThreshold && (
            <div key={`intro`} className={'subsection'}>
              <div className=' returning'>
                <h1>
                  {parse(
                    DOMPurify.sanitize(
                      content?.returning?.content?.contents[getRand(content?.returning?.content?.contents?.length - 1)],
                    ),
                  )}
                </h1>
              </div>
            </div>
          )}

          {(!isInstalled || (isInstalled && vc < newThreshold)) &&
            content?.content &&
            content?.content?.map((cnt, i) => {
              return (
                <div key={`intro-${i}`} className={'subsection notinstalled '} ref={addToRefs}>
                  {cnt?.title && (
                    <div className='subsection-title'>
                      <h2 className='intro-title'>{parse(DOMPurify.sanitize(cnt?.title))}</h2>
                    </div>
                  )}
                  {cnt?.content?.map((para, k) => {
                    return para ? (
                      <Feature classes={'feature'} key={'feat-' + k}>
                        <div key={'p-' + k} className='st'>
                          {parse(DOMPurify.sanitize(para))}
                        </div>
                      </Feature>
                    ) : null
                  })}
                </div>
              )
            })}
        </div>
      </div>
    </section>
  )
}

export default Introduction
