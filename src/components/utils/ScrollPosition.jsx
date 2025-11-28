import {useState, useEffect} from "react";
import useAppStore from "@/store/useAppStore";
// import PropTypes from "prop-types";
import "./ScrollPosition.scss";
function clamp(value, min, max) {
	return Math.max(min, Math.min(value, max));
}
const ScrollPosition = () => {
	const [stage, setStage] = useState(0);
	const {setScrollStage, setActivity} = useAppStore();
	const scrollStage = useAppStore(state => state.scrollStage);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const nextStage = clamp(Math.floor(window.scrollY / (window.innerHeight * 0.5)), 0, 20);
			setStage(nextStage);
			// console.log("stage", stage);
			// setActivity(stage);
		});
	}, [stage, setStage]);

	useEffect(() => {
		if (stage !== scrollStage) {
			setScrollStage(stage);
		}
	}, [stage, setScrollStage, scrollStage]);

	return <div className={`stage-${stage} scrollPosition`}></div>;
};
ScrollPosition.PropTypes = {};
export default ScrollPosition;
