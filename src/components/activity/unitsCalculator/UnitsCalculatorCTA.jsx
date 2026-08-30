import { useState, useEffect } from 'react'
import UnitsCalculatorBtn from './UnitsCalculatorBtn'
import useAppStore from '@store/useAppStore'
import CTA from '@ui/cta/CTA'
import { strings, activities } from '@data/config.js'
import './stylesCTA.scss'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})

const UnitsCalculatorCTA = () => {
  const activityName = 'UnitsCalculator'
  const activityUrl = 'units-calculator'
  const activityID = -1
  const id = -1

  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)
  const [open, setOpen] = useState(false)
  const setIsModal = useAppStore((s) => s.setIsModal)

  const bgImg = {
    src: '/ui/bg-units-calculator.avif',
    alt: 'Picture of numbers',
  }

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal, id, setIsModal])

  const content = strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + activityName + '"')
  }

  return (
    <section className={`activity activity-${activityUrl}-cta` + (open ? ' show' : '')}>
      <CTA name={activityName} title={content.title} open={open} content={content.cta.content}>
        <UnitsCalculatorBtn label={content?.cta.btn?.label.unused} />
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default UnitsCalculatorCTA
