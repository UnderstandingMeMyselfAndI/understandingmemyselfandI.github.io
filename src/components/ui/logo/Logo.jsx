import "./styles.css";

import smartLogo from "@/src/assets/icondark.png";
import smartLogoDark from "@/src/assets/icondark.png";

import useThemeStore from "@/src/themeStore";
const Logo = () => {
	const theme = useThemeStore(state => state.theme);
	return (
		<div className="logo">
			<img
				src={theme === "light" ? smartLogoDark : smartLogo}
				className="logo"
				alt="Your Recovery toolbox logo"
				width="100"
				height="100"
			/>
			Ummi
		</div>
	);
};

Logo.displayName = "Logo";
export default Logo;
