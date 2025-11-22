import React, {useState, useRef, useEffect, useCallback, useMemo} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Skeleton from "@mui/material/Skeleton";
import ScenarioDialog from "../dialog/ScenarioDialog";
import useAppStore from "@/store/useAppStore";
import data from "../../../data/data.js";
import Favourite from "../favourite/Favourite.jsx";
import ButtonToolbox from "../buttons/toolbox/ButtonToolbox";
import ButtonEmergencyToolbox from "../buttons/toolbox/ButtonEmergencyToolbox";
import {useScrollEffects, SCROLL_EFFECT_CONFIG} from "./useScrollEffects";
import "../../../globals.css";
import "./AccordionStyles.scss";

// Individual Accordion Item with opacity and scale effects
const AccordionItemWithEffects = ({item, index, acronymID, expanded, handleChange, config = SCROLL_EFFECT_CONFIG}) => {
	const isExpanded = expanded === "panel" + index;
	const [ref, effects, disableScrollEffects, enableScrollEffects] = useScrollEffects(config, isExpanded);
	const accordionRef = useRef(null);
	const previousExpandedState = useRef(isExpanded);
	const setAcronymnID = useAppStore(state => state.setAcronymnID);
	const toggleIsSelected = useAppStore(state => state.toggleIsSelected);
	const setShowAccCard = useAppStore(state => state.setShowAccCard);

	// Handle scroll behavior on expand/collapse
	useEffect(() => {
		if (accordionRef.current) {
			if (isExpanded) {
				// Disable scroll effects for all items when expanded
				disableScrollEffects();
				setAcronymnID(acronymID);
				setShowAccCard(true);

				// Scroll to position when expanded (5vh from top)
				// setTimeout(() => {
				// 	if (accordionRef.current) {
				// 		const element = accordionRef.current;
				// 		const rect = element.getBoundingClientRect();
				// 		const elementTop = rect.top + window.pageYOffset;
				// 		const targetScrollY = elementTop - window.innerHeight * 0.05; // 5vh from top

				// 		window.scrollTo({
				// 			top: targetScrollY,
				// 			behavior: "smooth",
				// 		});
				// 	}
				// }, 10);
			} else if (previousExpandedState.current === true) {
				setShowAccCard(false);
				// Only scroll to center when transitioning from expanded to collapsed
				setTimeout(() => {
					if (accordionRef.current) {
						const element = accordionRef.current;
						const rect = element.getBoundingClientRect();
						const elementTop = rect.top + window.pageYOffset;
						const elementHeight = rect.height;
						const windowHeight = window.innerHeight;

						// Calculate the scroll position to center the element
						const targetScrollY = elementTop - windowHeight / 2 + elementHeight / 2;

						window.scrollTo({
							top: targetScrollY,
							behavior: "smooth",
						});

						// Re-enable scroll effects after collapse
						setTimeout(() => {
							enableScrollEffects();
						}, 100);
					}
				}, 300); // Wait for collapse animation to complete
			}
		}

		// Update previous state
		previousExpandedState.current = isExpanded;
	}, [isExpanded, disableScrollEffects, enableScrollEffects]);

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
				// opacity: 1,
				// transform: "none",
				// position: "relative",
				// transfrom: "translateY(-50%)",
				// top: "50%",
				// zIndex: 1000,
				// marginBottom: "20px",
				// Add margin top to position 5vh from top when scrolled into view
				// marginTop: "5vh",
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
			className={isExpanded ? "expanded-accordion" : ""}
		>
			<Accordion
				ref={accordionRef}
				className={"AccordionItem"}
				key={"accordion-" + index}
				expanded={isExpanded}
				onChange={handleChange("panel" + index)}
				slotProps={{
					transition: {unmountOnExit: true},
					heading: {component: "h3"},
				}}
				sx={expandedStyles}
			>
				<AccordionSummary
					className={"AcronymTitle"}
					expandIcon={<ExpandMoreIcon />}
					aria-controls={"panel" + index + "-content"}
					id={"panel" + item?.id + "-header"}
				>
					{/* <Favourite
						id={"item-" + item?.id}
						className={item?.title?.replaceAll(".", "")}
					/> */}
					{/* <div className="toolboxes">
						<ButtonEmergencyToolbox id={item?.id} />
						<ButtonToolbox id={item?.id} />
					</div> */}
					<div className="cont">
						{item.title.split(".").map(
							(subItem, index) =>
								subItem && (
									<div
										className="active"
										key={index}
										data-content={subItem}
									>
										{subItem}
									</div>
								)
						)}
					</div>
				</AccordionSummary>
				{/* <AccordionDetails>{parse(item.content.explanation)}</AccordionDetails> */}
			</Accordion>
			{/* <div className="accBack"></div> */}
		</div>
	);
};
export default function AccordionScroll({expanded, handleChange}) {
	const componentData = data;

	// You can easily override the default config here
	const customConfig = {
		...SCROLL_EFFECT_CONFIG,
		// minOpacity: 0.2, // Uncomment to override
		// minScale: 0.3, // Uncomment to override
		// fadeBoundary: 0.2, // Uncomment to override
	};

	return (
		<div className={"AccordionRoot"}>
			{componentData.map((item, index) =>
				item ? (
					<AccordionItemWithEffects
						key={"accordion-" + index}
						item={item}
						acronymID={item?.id}
						index={index}
						expanded={expanded}
						handleChange={handleChange}
						config={customConfig}
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

function Scenarios(item) {
	return (
		<div className="scenarios">
			<div className="title">Scenarios</div>
			<div className="scenariosGroup">
				{item.scenarios.map((scenario, i) => (
					<ScenarioDialog
						btnLabel={scenario.btnLabel}
						title={scenario.title}
						content={scenario.content}
						key={"scenario-" + i}
					/>
				))}
			</div>
		</div>
	);
}
