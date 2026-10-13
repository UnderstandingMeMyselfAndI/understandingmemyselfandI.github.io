import React from 'react'
import './iconArrowChevron.scss'
import './iconDec.css'
const IconArrowChevronLeft = ({ className = '' }) => {
  return (
    <div className={'icon icon-arrow-chevron-left ' + className}>
      <svg xmlns='http://www.w3.org/2000/svg' height='48px' viewBox='0 -960 960 960' width='48px' fill='#fff'>
        <path d='M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z' />
      </svg>
    </div>
  )
}
export default IconArrowChevronLeft
