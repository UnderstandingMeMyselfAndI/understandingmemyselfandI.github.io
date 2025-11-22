import * as React from "react";
import {useRef, useEffect} from "react";
import Logo from "ui/logo/Logo.jsx";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import useAppStore from "@/store/useAppStore";
import gsap from "gsap"; // <-- import GSAP
import {useGSAP} from "@gsap/react"; // <-- import the hook from our React package
gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies
import "./styles.scss";
const Intro = ({classes = ""}) => {
	const [stage, setStage] = React.useState(0);

	const scrollStage = useAppStore(state => state.scrollStage);

	// let tlArrow2 = gsap.timeline({ease: "power4.inOut", delay: 1});
	// tlArrow2.from(".i1", {duration: 0.65, y: 130, autoAlpha: 0}, 0.0);
	// tlArrow2.to(".i1", {duration: 0.65, y: 0, autoAlpha: 1}, 0.0);
	// tlArrow2.to(".i1", {duration: 0.75, y: 0, autoAlpha: 1}, 0.0);
	// tlArrow2.pause();

	// let tlArrow3 = gsap.timeline({ease: "power4.inOut", delay: 1.75});
	// tlArrow3.from(".i2", {duration: 0.65, y: 130, autoAlpha: 0}, 0.0);
	// tlArrow3.to(".i2", {duration: 0.65, y: 0, autoAlpha: 1}, 0.0);
	// tlArrow3.to(".i2", {duration: 0.75, y: 0, autoAlpha: 1}, 0.0);
	// tlArrow3.pause();
	// tlArrow2.to(".i1", {duration: 0.37, y: 260, scale: 0.5, autoAlpha: 0.25}, ">");
	// if (scrollStage > 2) {
	// 	tlArrow2.play();
	// 	tlArrow3.play();
	// }
	// if (scrollStage > 3) {
	// 	tlArrow2.seek(6);
	// 	// tlArrow2.pause();
	// 	tlArrow3.seek(6);
	// 	// tlArrow3.pause();
	// }
	return (
		<section className="intro">
			<div className="i1">The tools we learn to cope with our emotions, thoughts, feelings and mental health are ace, but remembering them can be hard.</div>
			<div className="i2">
				<b className="ummi">Ummi</b> was created to be your toolbox so you can carry those tools around with you for whenever you need them.
			</div>
		</section>
	);
};

export default Intro;
