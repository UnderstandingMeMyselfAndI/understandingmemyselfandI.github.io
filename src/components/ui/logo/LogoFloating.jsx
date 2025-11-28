import {useState, useEffect} from "react";
import smartLogo from "@/assets/icons/UmmiIcon.min.svg";
import smartLogoDark from "@/assets/icons/UmmiIcon.min.svg";
import {useThemeStore} from "@/store/useThemeStore";
import useAppStore from "@/store/useAppStore";
import icon from "@/assets/icons/UmmiIcon.min.svg";
import "./styles.scss";

const LogoFloating = ({showText = true, classes = "", showName = true}) => {
	const theme = useThemeStore(state => state.theme);
	const [show, setShow] = useState(false);

	const {showAccCard} = useAppStore();
	const text = showText ? "Ummi" : "";
	const componentClasses = show && !showAccCard ? "logo show " + classes : "logo " + classes;
	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 600 ? setShow(true) : setShow(false);
		});
	}, [show, setShow]);

	return (
		<div className={componentClasses}>
			<img
				src={theme === "light" ? smartLogoDark : smartLogo}
				alt="Your Recovery toolbox logo"
				width="100%"
				height="100$"
			/>
			{showName && text}
		</div>
	);
};

LogoFloating.displayName = "LogoFloating";
export default LogoFloating;
