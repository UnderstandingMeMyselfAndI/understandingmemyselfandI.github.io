import { strings } from '@data/config.js'
import useAppStore from '@store/useAppStore'
import CTA from '@ui/cta/CTA'
import ButtonSimple from '@buttons/ButtonSimple'
import IconWallpaper from '@icons/IconWallpaper'
import './styles.scss'
import './wallpapersCTA.scss'

const WallpapersCTA = () => {
  const id = -1
  const name = 'wallpapers'
  const url = 'wallpapers'
  const targetActivityID = 6
  const setActivity = useAppStore((s) => s.setActivity)

  const bgImg = {
    src: '/ui/bg-wallpapers-5.avif',
    alt: 'Picture of a motivation message on wall - never give up',
  }


  const content = strings.activity.find((activity) => activity.url === url) || null

  const handleClick = () => {
    setActivity(targetActivityID)
  }

  return (
    <section className={`activity activity-${url}-cta cta`}>
      <CTA name={name} title={content.title} content={content.cta.content}>
        <ButtonSimple
          classes={[`${name}-cta-btn btn`]}
          label={content?.cta.btn?.label.unused}
          handleClick={handleClick}>
          <IconWallpaper />
        </ButtonSimple>
        <div className='bg-img'>
          <img className='bg' src={bgImg.src} alt={bgImg.alt} />
        </div>
      </CTA>
    </section>
  )
}

export default WallpapersCTA
