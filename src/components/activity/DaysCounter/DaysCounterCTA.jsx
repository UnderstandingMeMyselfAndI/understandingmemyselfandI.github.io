import { useState, useEffect } from 'react'
import DaysCounterBtn from './DaysCounterBtn'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CTA from '@/components/ui/cta/CTA'
import './stylesCTA.scss'
const DaysCounterCTA = () => {
  const activityName = 'DaysCounter'
  const activityUrl = 'days-counter'
  const activityID = -1
  const id = -1
  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)
  const [open, setOpen] = useState(false)

  const bgImg = {
    src: '/ui/bg-days-counter-8.avif',
    alt: 'Picture of clock',
  }

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
        `activity cta activity-${activityUrl}-cta ` + (open ? ' show' : '')
      }
    >
      <CTA
        name={activityName}
        open={open}
        content={content.cta.content ? content.cta.content : null}
        title={content?.cta?.title}
        label={content?.cta.btn?.label}
      >
        <DaysCounterBtn label={content?.cta.btn?.label.unused} />
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default DaysCounterCTA
