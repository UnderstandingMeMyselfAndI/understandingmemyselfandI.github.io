import "./styles.css";

import smartLogo from "@/assets/icons/UmmiIcon.svg";
import smartLogoDark from "@/assets/icons/UmmiIcon.svg";

import useThemeStore from "@/themeStore";
const Logo = ({showText = true, classes = ""}) => {
	const theme = useThemeStore(state => state.theme);
	const text = showText ? "Ummi" : "";
	return (
		<div className={"logo " + classes}>
			<img
				src={theme === "light" ? smartLogoDark : smartLogo}
				className="logo"
				alt="Your Recovery toolbox logo"
				width="80"
				height="80"
			/>
			{text}
		</div>
	);
};

Logo.displayName = "Logo";
export default Logo;
