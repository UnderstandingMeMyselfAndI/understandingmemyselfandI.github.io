import { useRef } from 'react'
import PropTypes from 'prop-types'
// import { debounce } from '@js/utils.js'

import './feature.scss'
// import { useOnInView } from 'react-intersection-observer'
import gsap from 'gsap' // <-- import GSAP
import { useGSAP } from '@gsap/react' // <-- import the hook from our React package
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

const Feature = ({ children = null, headline = '', classes = '' }) => {
  const ref = useRef()

  return (
    <div className={'feature ' + classes}>
      <div className='feature__inner' ref={ref}>
        <div>{headline}</div>
        {children && <div className='feature__st'>{children}</div>}
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
