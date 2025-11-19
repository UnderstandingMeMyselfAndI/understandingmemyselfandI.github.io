import {useState, useEffect} from "react";
import smartLogo from "@/assets/icons/UmmiIcon.svg";
import smartLogoDark from "@/assets/icons/UmmiIcon.svg";
import useThemeStore from "@/store/useThemeStore";
import "./styles.scss";

const LogoFloating = ({showText = true, classes = ""}) => {
	const theme = useThemeStore(state => state.theme);
	const [show, setShow] = useState(true);
	const text = showText ? "Ummi" : "";
	const componentClasses = show ? "logo show " + classes : "logo " + classes;
	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 100 ? setShow(true) : setShow(false);
		});
	}, [window.scrollY, show, setShow]);

	return (
		<div className={componentClasses}>
			<img
				src={theme === "light" ? smartLogoDark : smartLogo}
				alt="Your Recovery toolbox logo"
				width="80"
				height="80"
			/>
			{text}
		</div>
	);
};

LogoFloating.displayName = "LogoFloating";
export default LogoFloating;
