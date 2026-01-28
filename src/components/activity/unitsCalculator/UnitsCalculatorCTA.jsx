import { useState, useEffect } from 'react'

import UnitsCalculatorBtn from './UnitsCalculatorBtn'
import parse from 'html-react-parser'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import './stylesCTA.scss'
const UnitsCalculatorCTA = () => {
  const [open, setOpen] = useState(false)
  const activity = useAppStore((s) => s.activity)

  useEffect(() => {
    setOpen(activity === -1)
  }, [activity])

  const content =
    strings.activity.find((activity) => activity.name === 'UnitsCalculator') ||
    null
  if (content === null) {
    console.warn('No content found for activity "UnitsCalculator"')
  }

  return open ? (
    <div
      className={
        'activity activity-units-calculator-cta ' + (open ? ' show' : '')
      }
    >
      <div className='inner'>
        <div className='title'>
          <h3>
            <b>
              <u>{content?.cta?.title}</u>
            </b>
          </h3>
        </div>
        {content?.cta?.content?.map((html, i) => {
          return <p key={i}>{parse(html)}</p>
        })}
        <UnitsCalculatorBtn />
      </div>
    </div>
  ) : (
    <> </>
  )
}

export default UnitsCalculatorCTA
