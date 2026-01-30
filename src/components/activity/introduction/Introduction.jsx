import { useEffect, useState, useRef } from 'react'
import useAppStore from '@/store/useAppStore'
import parse from 'html-react-parser'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline'
import { strings } from '@/data/config'
import Feature from './Feature'
import gsap from 'gsap' // <-- import GSAP
import { useGSAP } from '@gsap/react' // <-- import the hook from our React package
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)
import '@/utils/IsMobile.js'
import './styles.scss'

const Introduction = () => {
  const name = 'introduction'
  const [open, setOpen] = useState(true)
  const activity = useAppStore((s) => s.activity)

  const sectionRefs = useRef([])

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  sectionRefs.current = []

  const content =
    strings.activity.find((activity) => activity.name === name) || null
  if (content === null) {
    console.warn(`No content found for activity "${name}"`)
  }

  const isInstalled = useAppStore((state) => state.isInstalled)
  const vc = useAppStore((state) => state.vc) // visit count

  useEffect(() => {
    setOpen(activity === -1)
  }, [activity])

  function getRand(max) {
    return Math.floor(Math.random() * (max - 1 + 1)) + 1
  }

  useGSAP(() => {}, { scope: sectionRefs, revertOnUpdate: true })

  return (
    <section
      id='intro'
      className={'activity intro' + (open ? ' show' : ' hide')}
    >
      <div className='introduction-inner'>
        <div className='inner'>
          <h1 style={{ fontSize: '68px' }}>
            {(!isInstalled || (isInstalled && vc < 3)) && (
              <b>
                {' '}
                <u>{content?.title}</u>
              </b>
            )}

            {isInstalled && vc >= 3 && (
              <u>
                {parse(
                  content?.returning?.content?.titles[
                    getRand(content?.returning?.content?.titles?.length - 1)
                  ],
                )}
              </u>
            )}
          </h1>

          {isInstalled &&
            vc > 20 &&
            vc < 33 && // if app is installed show different content
            content?.installed.content?.map((cnt, i) => {
              return (
                <div
                  key={`intro-${i}`}
                  className={'subsection installed'}
                  ref={addToRefs}
                >
                  {cnt?.title && (
                    <div className='subsection-title'>
                      <h2>{parse(cnt?.title)}</h2>
                    </div>
                  )}

                  {cnt?.content?.map((para, k) => {
                    return (
                      <Feature key={'p-' + k}>
                        {i === 1 && <DoneOutlineIcon className='icon' />}
                        <p key={k}>{parse(para)}</p>
                      </Feature>
                    )
                  })}
                </div>
              )
            })}

          {isInstalled && vc >= 20 && (
            <div key={`intro`} className={'subsection'}>
              <div className=' returning'>
                <h1>
                  {parse(
                    content?.returning?.content?.contents[
                      getRand(content?.returning?.content?.contents?.length - 1)
                    ],
                  )}
                </h1>
              </div>
            </div>
          )}

          {(!isInstalled || (isInstalled && vc < 20)) &&
            content?.content &&
            content?.content?.map((cnt, i) => {
              return (
                <div
                  key={`intro-${i}`}
                  className={'subsection notinstalled '}
                  ref={addToRefs}
                >
                  {cnt?.title && (
                    <div className='subsection-title'>
                      <h2 className='title2'>{parse(cnt?.title)}</h2>
                    </div>
                  )}
                  {cnt?.content?.map((para, k) => {
                    return para ? (
                      <Feature classes={'feature'} key={'feat-' + k}>
                        <p key={'p-' + k} className='st'>
                          {parse(para)}
                        </p>
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
