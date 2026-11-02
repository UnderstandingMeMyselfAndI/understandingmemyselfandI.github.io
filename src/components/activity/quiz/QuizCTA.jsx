import ButtonSimple from '@buttons/ButtonSimple'
import { strings } from '@data/config'
import useAppStore from '@store/useAppStore'
import IconQuiz from '@icons/IconQuiz'
import CTA from '@ui/cta/CTA'
import './quizCTA.scss'

const QuizCTA = () => {
  const name = 'Recovery Quiz CTA'
  const url = 'recovery-quiz'
  const targetActivityID = 23
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
          <IconQuiz />
        </ButtonSimple>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default QuizCTA
