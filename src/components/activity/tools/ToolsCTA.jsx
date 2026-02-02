import { useState, useEffect } from 'react'
import ToolsBtn from './ToolsBtn'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CTA from '@/components/ui/cta/CTA'

// import './stylesCTA.scss'

const ToolsCTA = () => {
  const activityName = 'Tools'
  const activityUrl = 'recovery-tools'
  const activityID = -1
  const id = -1
  const targetActivityID = 1
  const [open, setOpen] = useState(false)
  const setActivity = useAppStore((state) => state.setActivity)
  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, activityID])

  const content =
    strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + activityName + '"')
  }

  const handleClick = () => {
    setActivity(targetActivityID)
  }

  return (
    <section
      className={
        `activity activity-${activityUrl}-cta` + (open ? ' show' : '')
      }>
      <CTA
        name={activityName}
        open={open}
        title={content?.cta?.title}
        content={content?.cta?.content}>
        <ToolsBtn
          label={content?.cta.btn?.label.unused}
          clickHander={handleClick}
        />
      </CTA>
    </section>
  )
}

export default ToolsCTA
