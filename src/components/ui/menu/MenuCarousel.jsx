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
import {useScrollEffects, SCROLL_EFFECT_CONFIG} from "./useScrollEffects";
import {triggerGlobalRecalc} from "@/hooks/useGlobalRecalcTrigger.js";
// import {storeKeys, localStore} from "@/data/localStore.js";
import PropTypes from "prop-types";

import "../../../globals.css";
import "./MenuCarousel.scss";

// Individual Accordion Item with opacity and scale effects
const MenuItemWithEffects = ({item, isUserTool, index, acronymID, expanded, handleChange, handleMenuClick, config = SCROLL_EFFECT_CONFIG}) => {
	const isExpanded = expanded === "panel" + index;
	const [ref, effects, disableScrollEffects, enableScrollEffects, forceRecalculate] = useScrollEffects(config, isExpanded);
	const accordionRef = useRef(null);
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
		if (!accordionRef.current) return;

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
			const element = accordionRef.current;
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
		previousExpandedState.current = isExpanded;
	}, [isExpanded, item.id, setShowAccCard, disableScrollEffects, enableScrollEffects, forceRecalculate]);

	// Memoize expanded styles to prevent unnecessary recalculations
	const expandedStyles = useMemo(() => {
		if (!isExpanded) return {};

		return {
			// position: "relative",
			// backgroundColor: "var(--mainBackground)",
			boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
			// maxHeight: "calc(90vh - 40px)",
			// minHeight: "100%",
			// height: "fit-content",
			// overflow: "auto",
			"& .MuiAccordionDetails-root": {
				// maxHeight: "calc(90vh - 120px)", // Account for header height
				overflow: "auto",
			},
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
			ref={ref}
			style={wrapperStyle}
			className={"carousel-item" + (isExpanded ? " active" : "")}
		>
			<div
				ref={accordionRef}
				className={"AccordionItem item"}
				key={"accordion-" + index}
				onClick={handleMenuClick(item?.id)}
				style={expandedStyles}
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
	item: PropTypes.object,
	index: PropTypes.number,
	isUserTool: PropTypes.bool,
	acronymID: PropTypes.number,
	expanded: PropTypes.string,
	handleChange: PropTypes.func,
	handleMenuClick: PropTypes.func,
	config: PropTypes.object,
};
export default function MenuCarousel({expanded, showToolsOnly, handleChange, handleMenuClick}) {
	const [carouselData, setCarouselData] = useState(data);
	const {accData} = useAppStore();
	useEffect(() => {
		showToolsOnly ? setCarouselData(accData) : setCarouselData(data);
	}, [accData, showToolsOnly]);

	// You can easily override the default config here
	const customConfig = {
		...SCROLL_EFFECT_CONFIG,
		// minOpacity: 0.2, // Uncomment to override
		// minScale: 0.3, // Uncomment to override
		// fadeBoundary: 0.2, // Uncomment to override
	};
	// const componentData = showToolsOnly ? accData : data; //userToolIDs;

	return (
		<div className={"AccordionRoot" + (expanded ? " expanded" : "")}>
			{carouselData.map((item, index) =>
				item ? (
					<MenuItemWithEffects
						className="AccordionItemWithEffects"
						key={"accordion-" + index}
						item={item}
						acronymID={item?.id}
						index={index}
						expanded={expanded}
						handleChange={handleChange}
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
	expanded: PropTypes.string,
	handleChange: PropTypes.func,
	handleMenuClick: PropTypes.func,
	showToolsOnly: PropTypes.bool,
};
// function Scenarios(item) {
// 	return (
// 		<div className="scenarios">
// 			<div className="title">Scenarios</div>
// 			<div className="scenariosGroup">
// 				{item.scenarios.map((scenario, i) => (
// 					<ScenarioDialog
// 						btnLabel={scenario.btnLabel}
// 						title={scenario.title}
// 						content={scenario.content}
// 						key={"scenario-" + i}
// 					/>
// 				))}
// 			</div>
// 		</div>
// 	);
// }
