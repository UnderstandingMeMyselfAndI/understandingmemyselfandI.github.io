import QRCodeIcon from '@/src/assets/QRCode.png';
import QRCodeIconDark from '@/src/assets/QRCodeDark.png';

import getStoredTheme from '@/src/components/theme/getStoredTheme';
import './styles.css';
import PropTypes from 'prop-types';

const QRCode = ({ label }) => {
	const theme = getStoredTheme();
	return (
		<div className='QRCode'>
			<div>{label}</div>
			<img
				src={theme === 'light' ? QRCodeIcon : QRCodeIconDark}
				alt='QRCode'
				width='318'
				height='318'
			/>
		</div>
	);
};
QRCode.propTypes = {
	label: PropTypes.string.isRequired,
};
QRCode.displayName = 'QRCode';
export default QRCode;
