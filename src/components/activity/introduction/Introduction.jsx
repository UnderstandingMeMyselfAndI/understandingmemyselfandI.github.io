import { useRef } from 'react'
import useAppStore from '@store/useAppStore'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import IconTaskComplete from '@icons/IconTaskComplete'
import { getRand } from '@js/utils.js'
import { strings } from '@data/config'
import Feature from './Feature'
import gsap from 'gsap' // <-- import GSAP
import { useGSAP } from '@gsap/react' // <-- import the hook from our React package
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(useGSAP, ScrollTrigger)

import '@utils/IsMobile.js'
import './introduction.scss'
//TODO: This is preventing touch events

const Introduction = () => {
  const name = 'introduction'

  // TODO: #46 #45 These content thresholds need revisiting
  const curiousThreshold = 16
  const newThreshold = 60
  // const userThreshold = 120

  const sectionRefs = useRef([])

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el)
    }
  }

  // sectionRefs.current = []

  const content = strings.activity.find((activity) => activity.name === name) || null
  if (content === null) {
    console.warn(`No content found for activity "${name}"`)
  }

  const isInstalled = useAppStore((state) => state.isInstalled)
  const vc = useAppStore((state) => state.vc) // visit count

  useGSAP(() => {}, { scope: sectionRefs, revertOnUpdate: true })

  return (
    <section id='intro' className={`activity activity-${name}`}>
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
                        {i === 1 && <IconTaskComplete className='icon' />}
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
