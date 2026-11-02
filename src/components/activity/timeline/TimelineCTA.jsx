import ButtonSimple from '@components/ui/buttons/ButtonSimple'
import { strings } from '@data/config'
import useAppStore from '@store/useAppStore'
import FormatLineSpacingOutlinedIcon from '@mui/icons-material/FormatLineSpacingOutlined'
import CTA from '@components/ui/cta/CTA'
import IconDayView from '../../icons/IconDayView'
// import './timelineCTA.scss'

const TimelineCTA = () => {
  const name = 'Timeline CTA'
  const url = 'recovery-timeline'
  const targetActivityID = 21
  const setActivity = useAppStore((state) => state.setActivity)


  const bgImg = {
    src: '/ui/bg-timeline.avif',
    alt: 'Picture of tarmac road surface leading to mountains',
  }

  const content = strings.activity.find((activity) => activity.url === url) || null

  const handleClick = () => {
    setActivity(targetActivityID)
  }

  return (
    <section className={`activity cta activity-${url}-cta` }>
      <CTA name={name} title={content?.cta?.title} content={content?.cta?.content}>
        <ButtonSimple label={content?.cta.btn?.label.unused} handleClick={handleClick}>
          <IconDayView />
        </ButtonSimple>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default TimelineCTA
