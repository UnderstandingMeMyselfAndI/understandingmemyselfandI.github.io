import QRCodeIconBlack from '/QRCodes/qr-code-black-320.png'
import QRCodeIconWhite from '/QRCodes/qr-code-white-320.png'

// import getStoredTheme from '@/components/theme/getStoredTheme';
import { useThemeStore } from '@/store/useThemeStore'
import './styles.css'
import PropTypes from 'prop-types'
import { useShallow } from 'zustand/react/shallow'
const QRCode = ({ label }) => {
  const { theme } = useThemeStore(
    useShallow((state) => ({ theme: state.theme })),
  )
  return (
    <div className='QRCode'>
      <div>{label}</div>
      <img
        src={theme === 'light' ? QRCodeIconBlack : QRCodeIconWhite}
        alt='QRCode'
        width='318'
        height='318'
      />
    </div>
  )
}
QRCode.propTypes = {
  label: PropTypes.string.isRequired,
}
QRCode.displayName = 'QRCode'
export default QRCode
