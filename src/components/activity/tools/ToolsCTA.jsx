import ToolsBtn from './ToolsBtn'
import { strings } from '@data/config'
import useAppStore from '@store/useAppStore'

import CTA from '@ui/cta/CTA'
import './toolsCTA.scss'

const ToolsCTA = () => {
  const name = 'Tools CTA'
  const url = 'recovery-tools'
  const targetID = 1
  const setActivity = useAppStore((state) => state.setActivity)

  const bgImg = {
    src: '/ui/bg-tools.avif',
    alt: 'Picture of tools',
  }

 

  const content = strings.activity.find((activity) => activity.url === url) || null
  if (content === null) {
    console.warn('No content found for activity "' + name + '"')
  }

  const handleClick = () => {
    console.log('handleClick activityUrl ', url)
    setActivity(targetID)
  }

  return (
    <section className={`activity activity-${url}-cta`}>
      <CTA name={name} open={open} title={content?.cta?.title} content={content?.cta?.content}>
        <ToolsBtn label={content?.cta.btn?.label.unused} clickHandler={handleClick} />
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default ToolsCTA
