import "./styles.scss";

import smartLogo from "@/assets/icons/UmmiIcon.min.svg";
import smartLogoDark from "@/assets/icons/UmmiIcon.min.svg";

import {useThemeStore} from "@/store/useThemeStore";
const Logo = ({showText = true, classes = ""}) => {
	const theme = useThemeStore(state => state.theme);
	const text = showText ? "Ummi" : "";
	return (
		<div className={"Ummi-logo" + (classes ? " " + classes : "")}>
			<div className={"img"}>
				<img
					src={theme === "light" ? smartLogoDark : smartLogo}
					alt="Your Recovery toolbox logo"
				/>
			</div>
			<div>{text}</div>
		</div>
	);
};

Logo.displayName = "Logo";
export default Logo;
