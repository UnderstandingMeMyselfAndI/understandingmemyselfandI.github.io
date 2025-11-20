import * as React from "react";
import {useState, useEffect} from "react";
import Logo from "ui/logo/Logo.jsx";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

// import clamp from "@/js/utils.js";
import "../../../scss/Animation.css";
import "./AnimationIntro.scss";
import "./styles.scss";
function clamp(value, min, max) {
	return Math.max(min, Math.min(value, max));
}
const Header = ({classes = ""}) => {
	const [show, setShow] = useState(true);
	const [stage, setStage] = useState(0);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const nextStage = clamp(Math.floor(window.scrollY / 80), 1, 3);
			setStage(nextStage);
		});
	}, [window.scrollY, stage, setStage]);

	return (
		<header className={`stage-${stage} ${classes}`}>
			<div className="home-logo">
				<Logo />
			</div>
			<h1>
				<span className="in">
					<div className="r1 w0">Understanding</div>

					<div className="r2">
						<div className="w1">Me</div>
						<div className="w2">Myself</div>
						<div className="w3"> &amp;</div>
						<div className="w4"> I</div>
					</div>
				</span>
			</h1>

			<div className="arrow-cont">
				<ArrowDownwardOutlinedIcon className="arrow" />
			</div>
		</header>
	);
};

export default Header;
