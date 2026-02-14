import { useEffect, useState } from 'react'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CTA from '@/components/ui/cta/CTA'
import './styles.scss'
import './stylesCTA.scss'

const YourPrivacyCTA = () => {
  const id = 20
  const activityName = 'privacy'
  const activityUrl = 'privacy'
  const activityID = -1

  const isModal = useAppStore((state) => state.isModal)
  const setIsModal = useAppStore((state) => state.setIsModal)
  const activity = useAppStore((state) => state.activity)
  const [open, setOpen] = useState(false)

  const bgImg = {
    src: '/ui/bg-privacy.avif',
    alt: 'Picture of a martial arts master bowing before pupil',
  }

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal])

  const setActivity = useAppStore((s) => s.setActivity)

  const content =
    strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + activityName + '"')
  }

  const handlePrivacyClick = () => {
    setActivity(10)
  }

  const handleSettingsClick = () => {
    setActivity(12)
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
        <button
          className={`${activityName}-cta-btn btn`}
          onClick={() => handlePrivacyClick()}
        >
          {content?.cta?.btnLabel}
        </button>

        <button
          className={`${activityName}-cta-btn btn `}
          onClick={() => handleSettingsClick()}
        >
          Settings
        </button>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default YourPrivacyCTA
