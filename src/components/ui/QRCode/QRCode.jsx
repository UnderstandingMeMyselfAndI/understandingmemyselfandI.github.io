import QRCodeIconBlack from "@/assets/qr-code-src-app-black-318.png";
import QRCodeIconWhite from "@/assets/qr-code-src-app-white-318.png";

// import getStoredTheme from '@/components/theme/getStoredTheme';
import useThemeStore from "@/store/useThemeStore";
import "./styles.css";
import PropTypes from "prop-types";
import {useShallow} from "zustand/react/shallow";
const QRCode = ({label}) => {
	const {theme} = useThemeStore(useShallow(state => ({theme: state.theme})));
	return (
		<div className="QRCode">
			<div>{label}</div>
			<img
				src={theme === "light" ? QRCodeIconBlack : QRCodeIconWhite}
				alt="QRCode"
				width="318"
				height="318"
			/>
		</div>
	);
};
QRCode.propTypes = {
	label: PropTypes.string.isRequired,
};
QRCode.displayName = "QRCode";
export default QRCode;
