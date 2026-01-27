import { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { debounce } from '@/js/utils.js'

import './featureStyles.scss'
import { useOnInView } from 'react-intersection-observer'
import gsap from 'gsap' // <-- import GSAP
import { useGSAP } from '@gsap/react' // <-- import the hook from our React package
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const Feature = ({ children = null, headline = '', classes = '' }) => {
  const [hasDisplayed, setHasDisplayed] = useState(false)
  const [componentInView, setComponentInView] = useState(false)
  const [hasSplit, setHasSplit] = useState(false)
  const [scrollDirection, setScrollDirection] = useState(0)
  const ref = useRef()
  const animatable = []
  const selector = '.st'

  const classesInt = {
    inTop: 'inTop',
    inBottom: 'inBottom',
    outTop: 'outTop',
    outBottom: 'outBottom',
    show: 'show',
    line: 'line',
  }

  return (
    <div
      className={
        (!hasDisplayed && componentInView ? ' initial' : '') +
        (componentInView ? ' in' : ' out') +
        ' ' +
        classes
      }
    >
      <div className='feature-inner' ref={ref}>
        <div>{headline}</div>
        {children && <div className='st'>{children}</div>}
      </div>
    </div>
  )
}
Feature.propTypes = {
  children: PropTypes.node,
  headline: PropTypes.string,
  classes: PropTypes.string,
}

export default Feature
