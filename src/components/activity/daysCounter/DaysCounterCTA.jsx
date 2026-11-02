import { strings } from '@data/config.js'
import useAppStore from '@store/useAppStore'
import ButtonSimple from '@ui/buttons/ButtonSimple'
import CTA from '@ui/cta/CTA'
import MoreTimeIcon from '@mui/icons-material/MoreTime'
import IconNestFarsightDigital from '@icons/IconNestFarsightDigital'
import './daysCounterCTA.scss'
const DaysCounterCTA = () => {
  const name = 'DaysCounter'
  const url = 'days-counter'
  const targetActivityID = 2
  const setActivity = useAppStore((state) => state.setActivity)

  const bgImg = {
    src: '/ui/bg-days-counter-8.avif',
    alt: 'Picture of clock',
  }

  const content = strings.activity.find((activity) => activity.url === url) || null

  const handleClick = () => {
    setActivity(targetActivityID)
  }
  return (
    <section className={`activity cta activity-${url}-cta `}>
      <CTA
        name={name}
       
        content={content.cta.content ? content.cta.content : null}
        title={content?.cta?.title}
        label={content?.cta.btn?.label}>
        <ButtonSimple
          classes={[`${name}-cta-btn btn`]}
          label={content?.cta.btn?.label.unused}
          handleClick={handleClick}>
          <IconNestFarsightDigital />
        </ButtonSimple>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default DaysCounterCTA
