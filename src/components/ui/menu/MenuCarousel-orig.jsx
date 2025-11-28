import {useRef, useEffect, useMemo, useState} from "react";
// import Accordion from "@mui/material/Accordion";
// import AccordionDetails from "@mui/material/AccordionDetails";
// import AccordionSummary from "@mui/material/AccordionSummary";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from "@mui/material/Skeleton";
// import ScenarioDialog from "../dialog/ScenarioDialog";
import useAppStore from "@/store/useAppStore";
import data from "../../../data/data.js";
import HandymanIcon from "@mui/icons-material/Handyman";
// import Favourite from "../favourite/Favourite.jsx";
// import ButtonToolbox from "../buttons/toolbox/ButtonToolbox";
// import ButtonEmergencyToolbox from "../buttons/toolbox/ButtonEmergencyToolbox";
// import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import {useScrollEffects, SCROLL_EFFECT_CONFIG} from "@/components/ui/menu/useScrollEffects.jsx";
import {triggerGlobalRecalc} from "@/hooks/useGlobalRecalcTrigger.js";
// import {storeKeys, localStore} from "@/data/localStore.js";
import PropTypes from "prop-types";

import "../../../globals.css";
import "./MenuCarousel.scss";

// Individual Accordion Item with opacity and scale effects
const MenuItemWithEffects = ({item, isUserTool, index, open, handleMenuClick, config = SCROLL_EFFECT_CONFIG}) => {
	const isExpanded = open;
	const [wrapperRef, effects, disableScrollEffects, enableScrollEffects, forceRecalculate] = useScrollEffects(config, false);
	const innerRef = useRef(null);
	const previousExpandedState = useRef(isExpanded);

	// const showAccCard = useAppStore(state => state.showAccCard);
	const setShowAccCard = useAppStore(state => state.setShowAccCard);
	// const setIsExpanded = useAppStore(state => state.setIsExpanded);

	useEffect(() => {
		if (!setShowAccCard) {
			setTimeout(() => {
				forceRecalculate();
				console.log("forceRecalculate");
			}, 1000);
		}
	}, [setShowAccCard, forceRecalculate]);
	// Handle scroll behavior on expand/collapse
	useEffect(() => {
		console.log("open ", open);

		if (!innerRef.current) return;

		if (isExpanded) {
			// === EXPANDING ===
			// setShowAccCard(true);
			// setAcronymnID(item?.id);
			//setIsExpanded(true);
			disableScrollEffects(); // Full opacity while expanded
		} else if (previousExpandedState.current === true) {
			// Re-enable scroll effects
			enableScrollEffects();

			// Triggers recalc on ALL items at once
			setTimeout(() => {
				triggerGlobalRecalc(); // ← This is the real fix
			}, 380);

			// Wait for MUI collapse animation to finish (~300ms)
			//     Then do TWO things: scroll to center + recalculate effects
			// const timer = setTimeout(() => {
			const element = innerRef.current;
			if (!element) return;

			// Get fresh geometry after collapse
			const rect = element.getBoundingClientRect();
			const elementTop = rect.top + window.pageYOffset;

			// Scroll to center the item smoothly
			const targetScrollY = elementTop - window.innerHeight / 2 + element.offsetHeight / 2;

			window.scrollTo({
				top: targetScrollY,
				behavior: "smooth",
			});

			// Step 3: Force recalculation of opacity/scale for ALL items
			//     This fixes the "stuck" or wrong opacity bug
			forceRecalculate();
			// }, 500); // 400ms safely covers MUI's collapse animation

			// return () => clearTimeout(timer);
		}

		// Track previous state
		previousExpandedState.current = open;
	}, [isExpanded, disableScrollEffects, enableScrollEffects, forceRecalculate]);

	// Memoize expanded styles to prevent unnecessary recalculations
	const selectedStyles = useMemo(() => {
		if (!isExpanded) return {};

		return {
			// position: "relative",
			// backgroundColor: "var(--mainBackground)",
			boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
			// maxHeight: "calc(90vh - 40px)",
			// minHeight: "100%",
			// height: "fit-content",
			// overflow: "auto",
		};
	}, [isExpanded]);

	const wrapperStyle = useMemo(() => {
		if (isExpanded) {
			return {
				opacity: 1,
				transform: "none",
				position: "relative",
				transfrom: "translateY(-50%)",
				top: "50%",
				zIndex: 10,
				marginBottom: "20px",
				// Add margin top to position 5vh from top when scrolled into view
				marginTop: "5vh",
			};
		}

		return {
			opacity: effects.opacity,
			transform: `scale(${effects.scale})`,
			transition: `opacity ${config.transitionSpeed}, transform ${config.transitionSpeed}`,
			transformOrigin: "center center",
		};
	}, [effects.opacity, effects.scale, config.transitionSpeed, isExpanded]);

	return (
		<div
			ref={wrapperRef}
			style={wrapperStyle}
			className={"carousel-item" + (isExpanded ? " active" : "")}
		>
			<div
				ref={innerRef}
				className={"AccordionItem inner item"}
				key={"accordion-" + index}
				onClick={handleMenuClick(item?.id)}
				style={selectedStyles}
			>
				<div
					className={"AcronymTitle title"}
					aria-controls={"panel" + index + "-content"}
					id={"panel" + item?.id + "-header"}
				>
					{isUserTool && <HandymanIcon />}
					<div className="cont letters-cont">
						{item.title.split(".").map(
							(subItem, index) =>
								subItem && (
									<div
										className="letter"
										key={index}
										data-content={subItem}
									>
										{subItem}
									</div>
								)
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
MenuItemWithEffects.propTypes = {
	open: PropTypes.bool,
	item: PropTypes.object,
	index: PropTypes.number,
	isUserTool: PropTypes.bool,
	setActivity: PropTypes.func,
	handleMenuClick: PropTypes.func,
	config: PropTypes.object,
};
export default function MenuCarousel({showToolsOnly, handleMenuClick}) {
	const [open, setOpen] = useState(false);
	const [carouselData, setCarouselData] = useState(data);
	const {accData, activity} = useAppStore();
	useEffect(() => {
		showToolsOnly ? setCarouselData(accData) : setCarouselData(data);
	}, [accData, showToolsOnly]);

	useEffect(() => {
		setOpen(activity === "tools");
	}, [activity]);

	// You can easily override the default config here
	const customConfig = {
		...SCROLL_EFFECT_CONFIG,
		// minOpacity: 0.2, // Uncomment to override
		// minScale: 0.3, // Uncomment to override
		// fadeBoundary: 0.2, // Uncomment to override
	};
	// const componentData = showToolsOnly ? accData : data; //userToolIDs;

	return (
		<div className={"AccordionRoot" + (open ? " expanded" : "")}>
			{carouselData.map((item, index) =>
				item ? (
					<MenuItemWithEffects
						className="AccordionItemWithEffects"
						key={"accordion-" + index}
						item={item}
						acronymID={item?.id}
						index={index}
						open={open}
						handleMenuClick={handleMenuClick}
						config={customConfig}
						isUserTool={data.includes(item.id)}
					/>
				) : (
					<Skeleton
						key={"skeleton-" + index}
						variant="rounded"
						animation="wave"
					/>
				)
			)}
		</div>
	);
}
MenuCarousel.propTypes = {
	open: PropTypes.bool,
	handleMenuClick: PropTypes.func,
	showToolsOnly: PropTypes.bool,
};
