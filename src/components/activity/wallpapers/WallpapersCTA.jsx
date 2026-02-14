import { useEffect, useState } from 'react'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import CTA from '@/components/ui/cta/CTA'
import './styles.scss'
import './stylesCTA.scss'

const WallpapersCTA = () => {
  const id = -1
  const activityName = 'wallpapers'
  const activityUrl = 'wallpapers'
  const targetID = 6

  const isModal = useAppStore((state) => state.isModal)
  const setIsModal = useAppStore((state) => state.setIsModal)
  const activity = useAppStore((state) => state.activity)
  const setActivity = useAppStore((s) => s.setActivity)
  const [open, setOpen] = useState(false)

  const bgImg = {
    src: '/ui/bg-wallpapers-5.avif',
    alt: 'Picture of a motivation message on wall - never give up',
  }

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal])

  const content =
    strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + activityName + '"')
  }

  const handleClick = () => {
    setActivity(targetID)
  }

  return (
    <section
      className={
        `activity activity-${activityUrl}-cta cta` + (open ? ' show' : '')
      }
    >
      <CTA
        name={activityName}
        title={content.title}
        open={open}
        content={content.cta.content}
      >
        <button
          className={`${activityName}-cta-btn btn`}
          onClick={() => handleClick()}
        >
          {content?.cta?.btn?.label?.unused}
        </button>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default WallpapersCTA
