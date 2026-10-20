import './logo.scss'

import logoSVG from '@assets/icons/UmmiIcon.svg'

// import { useThemeStore } from '@store/useThemeStore'
const Logo = ({ showText = true, classes = '', ref }) => {
  const text = showText ? 'Ummi' : ''
  return (
    <div className={'ummi-logo' + (classes ? ' ' + classes : '')}>
      <div ref={ref}>
        <img src={logoSVG} alt='Your Recovery toolbox logo' className={'img ummi-logo-img'} />
      </div>
      <div className='ummi'>{text}</div>
    </div>
  )
}

Logo.displayName = 'Logo'
export default Logo
