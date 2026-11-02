import UnitsCalculatorBtn from './UnitsCalculatorBtn'
import { strings } from '@data/config'
import CTA from '@components/ui/cta/CTA'

import './unitsCalculatorCTA.scss'

const UnitsCalculatorCTA = () => {
  const name = 'UnitsCalculator'
  const url = 'units-calculator'
  const bgImg = {
    src: '/ui/bg-units-calculator.avif',
    alt: 'Picture of numbers',
  }

  const content = strings.activity.find((activity) => activity.url === url) || null
  if (content === null) {
    console.warn('No content found for activity "' + name + '"')
  }

  return (
    <section className={`activity activity-${url}-cta`}>
      <CTA name={name} title={content.title} content={content.cta.content}>
        <UnitsCalculatorBtn label={content?.cta.btn?.label.unused} />
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default UnitsCalculatorCTA
