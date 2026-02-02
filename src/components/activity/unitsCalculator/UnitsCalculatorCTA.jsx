import { useState, useEffect } from 'react'
import UnitsCalculatorBtn from './UnitsCalculatorBtn'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CTA from '@/components/ui/cta/CTA'
import { activities } from '@/data/config'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
// import './stylesCTA.scss'

const UnitsCalculatorCTA = () => {
  const activityName = 'UnitsCalculator'
  const activityUrl = 'units-calculator'
  const activityID = -1
  const id = -1

  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)
  const [open, setOpen] = useState(false)
  const setIsModal = useAppStore((s) => s.setIsModal)

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal])

  const content =
    strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + activityName + '"')
  }

  return (
    <section
      className={
        `activity activity-${activityUrl}-cta` + (open ? ' show' : '')
      }>
      <CTA
        name={activityName}
        title={content.title}
        open={open}
        content={content.cta.content}>
        <UnitsCalculatorBtn label={content?.cta.btn?.label.unused} />
      </CTA>
    </section>
  )
}

export default UnitsCalculatorCTA
