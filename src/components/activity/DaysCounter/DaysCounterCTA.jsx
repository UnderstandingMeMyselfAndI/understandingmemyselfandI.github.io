import { useState, useEffect } from 'react'
import DaysCounterBtn from './DaysCounterBtn'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CTA from '@/components/ui/cta/CTA'
import { is } from 'zod/v4/locales'

const DaysCounterCTA = () => {
  const activityName = 'DaysCounter'
  const activityUrl = 'days-counter'
  const activityID = -1
  const id = -1
  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(activity === id)
  }, [activity])

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
        open={open}
        content={content.cta.content ? content.cta.content : null}
        title={content?.cta?.title}
        label={content?.cta.btn?.label}>
        <DaysCounterBtn label={content?.cta.btn?.label.unused} />
      </CTA>
    </section>
  )
}

export default DaysCounterCTA
