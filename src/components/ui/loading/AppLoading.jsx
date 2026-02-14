import Backdrop from '@/components/backdrop/Backdrop'
import './styles.scss'

const AppLoading = () => {
  return (
    <div
      className='app-loading-container'
      role='status'
      aria-live='polite'
      aria-label='Loading application'
    >
      <Backdrop
        initialImageId={2}
        initialDelay={0}
        interval={10000}
        parallaxStrength={0}
        className='backdrop loading-backdrop'
        staticImage={'/bgs/3.avif'} // Match Age Gate for seamless transition if needed, or use default
      />
      <div className='loading-content'>
        <img
          src='/icons/UmmiIcon2.svg'
          alt='Ummi Logo'
          className='loading-logo'
        />
        <span
          className='sr-only'
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: '0',
          }}
        >
          Loading application, please wait...
        </span>
      </div>
    </div>
  )
}

export default AppLoading
