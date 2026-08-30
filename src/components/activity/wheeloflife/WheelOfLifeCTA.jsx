import { useState, useEffect } from 'react'
import ButtonSimple from '@buttons/ButtonSimple'
import { strings } from '@data/config.js'
import useAppStore from '@store/useAppStore'
import FilterTiltShiftOutlinedIcon from '@mui/icons-material/FilterTiltShiftOutlined'
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined'
import CTA from '@ui/cta/CTA'
import './stylesCTA.scss'

const WheelOfLifeCTA = () => {
  const name = 'wheel-of-life'
  const activityUrl = 'wheel-of-life'
  const activityID = -1
  const id = -1
  const targetID = 22
  const [open, setOpen] = useState(false)
  const setActivity = useAppStore((state) => state.setActivity)
  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)

  const bgImg = {
    src: '/ui/bg-wheel-of-life-2.avif',
    alt: 'Picture of the conter of a vinyl record with a black and white spinning graphic',
  }

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal, id, setOpen])

  const content = strings.activity.find((activity) => activity.url === activityUrl) || null
  if (content === null) {
    console.warn('No content found for activity "' + name + '"')
  }

  const handleClick = () => {
    setActivity(targetID)
  }

  return (
    <section className={`activity activity-${activityUrl}-cta cta` + (open ? ' show' : '')}>
      <CTA name={name} open={open} title={content?.cta?.title} content={content?.cta?.content}>
        <ButtonSimple
          classes={['wheel-of-life-cta-btn']}
          label={content?.cta.btn?.label.unused}
          handleClick={handleClick}>
          <FilterTiltShiftOutlinedIcon />
        </ButtonSimple>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default WheelOfLifeCTA
