import { useState, useEffect } from 'react'
import ButtonSimple from '@/components/ui/buttons/ButtonSimple'
import { strings } from '@/data/config'
import useAppStore from '@/store/useAppStore'
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined'
import CTA from '@/components/ui/cta/CTA'
import './stylesCTA.scss'

const QuizCTA = () => {
  const name = 'Recovery Quiz CTA'
  const activityUrl = 'recovery-quiz'
  const activityID = -1
  const id = -1
  const targetID = 23
  const [open, setOpen] = useState(false)
  const setActivity = useAppStore((state) => state.setActivity)
  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)

  const bgImg = {
    src: '/ui/bg-timeline.avif',
    alt: 'Picture of tarmac road surface leading to mountains',
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
    <section className={`activity cta activity-${activityUrl}-cta` + (open ? ' show' : '')}>
      <CTA name={name} open={open} title={content?.cta?.title} content={content?.cta?.content}>
        <ButtonSimple label={content?.cta.btn?.label.unused} handleClick={handleClick}>
          <QuizOutlinedIcon />
        </ButtonSimple>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default QuizCTA
