import React, {useState, useRef, useEffect, useCallback, useMemo} from "react";
import useAppStore from "@/store/useAppStore";

function clamp(value, min, max) {
	return Math.max(min, Math.min(value, max));
}
const ScrollPosition = ({children, classes = ""}) => {
	const [stage, setStage] = useState(0);
	const setScrollStage = useAppStore(state => state.setScrollStage);
	const scrollStage = useAppStore(state => state.scrollStage);
	useEffect(() => {
		window.addEventListener("scroll", () => {
			const nextStage = clamp(Math.floor(window.scrollY / (window.innerHeight * 0.2)), 0, 20);
			setStage(nextStage);
		});
	}, [window.scrollY, stage, setStage]);

	useEffect(() => {
		if (stage !== scrollStage) {
			setScrollStage(stage);
		}
	}, [stage]);

	return <div className={`stage-${stage} ${classes}`}>{children}</div>;
};
export default ScrollPosition;
