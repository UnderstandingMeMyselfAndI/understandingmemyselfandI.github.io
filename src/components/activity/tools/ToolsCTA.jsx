import { useState, useEffect } from 'react'
import ToolsBtn from './ToolsBtn'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'

import CTA from '@/components/ui/cta/CTA'
import './stylesCTA.scss'

const ToolsCTA = () => {
  const name = 'Tools CTA'
  const activityUrl = 'recovery-tools'
  const activityID = -1
  const id = -1
  const targetID = 1
  const [open, setOpen] = useState(false)
  const setActivity = useAppStore((state) => state.setActivity)
  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)

  const bgImg = {
    src: '/ui/bg-tools.avif',
    alt: 'Picture of tools',
  }

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal, id, setOpen])

  const content =
    strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + name + '"')
  }

  const handleClick = () => {
    console.log('handleClick activityUrl ', activityUrl)
    setActivity(targetID)
  }

  return (
    <section
      className={`activity activity-${activityUrl}-cta` + (open ? ' show' : '')}
    >
      <CTA
        name={name}
        open={open}
        title={content?.cta?.title}
        content={content?.cta?.content}
      >
        <ToolsBtn
          label={content?.cta.btn?.label.unused}
          clickHandler={handleClick}
        />
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default ToolsCTA
