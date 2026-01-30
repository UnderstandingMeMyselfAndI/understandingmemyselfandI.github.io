import { useState, useEffect } from 'react'
import UnitsCalculatorBtn from './UnitsCalculatorBtn'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CTA from '@/components/ui/cta/CTA'
// import './stylesCTA.scss'

const UnitsCalculatorCTA = () => {
  const activityName = 'UnitsCalculator'
  const activityUrl = 'units-calculator'
  const activityID = -1

  const activity = useAppStore((state) => state.activity)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(activity === activityID)
  }, [activity, activityID])

  const content =
    strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + activityName + '"')
  }

  return (
    <section
      className={`activity activity-${activityUrl}-cta` + (open ? ' show' : '')}
    >
      <CTA
        name={activityName}
        title={content.title}
        open={open}
        content={content.cta.content}
      >
        <UnitsCalculatorBtn label={content?.cta.btn?.label.unused} />
      </CTA>
    </section>
  )
}

export default UnitsCalculatorCTA
