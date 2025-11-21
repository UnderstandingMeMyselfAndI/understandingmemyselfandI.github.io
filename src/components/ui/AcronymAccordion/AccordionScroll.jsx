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
import {useScrollEffects, SCROLL_EFFECT_CONFIG} from "./useScrollEffects";
import "../../../globals.css";
import "./AccordionStyles.scss";

// Configuration constants - easily adjustable
// const SCROLL_EFFECT_CONFIG = {
// 	minOpacity: 0.15, // Minimum opacity (15%)
// 	minScale: 0.5, // Minimum scale (85%)
// 	fadeBoundary: 0.35, // 15% from top/bottom
// 	innerFadeBoundary: 0.15, // 15% from top/bottom
// 	transitionSpeed: "0.25s ease-out", // speed when scrolling
// };

// Individual Accordion Item with opacity and scale effects
const AccordionItemWithEffects = ({item, index, expanded, handleChange, config = SCROLL_EFFECT_CONFIG}) => {
	const isExpanded = expanded === "panel" + index;
	const [ref, effects, disableScrollEffects, enableScrollEffects] = useScrollEffects(config, isExpanded);
	const accordionRef = useRef(null);
	const previousExpandedState = useRef(isExpanded);
	const setAcronymnID = useAppStore(state => state.setAcronymnID);
	const toggleIsExpanded = useAppStore(state => state.toggleIsExpanded);

	// Handle scroll behavior on expand/collapse
	useEffect(() => {
		if (accordionRef.current) {
			toggleIsExpanded();
			if (isExpanded) {
				// Disable scroll effects for all items when expanded
				disableScrollEffects();
				setAcronymnID(index);

				// Scroll to position when expanded (5vh from top)
				setTimeout(() => {
					if (accordionRef.current) {
						const element = accordionRef.current;
						const rect = element.getBoundingClientRect();
						const elementTop = rect.top + window.pageYOffset;
						const targetScrollY = elementTop - window.innerHeight * 0.05; // 5vh from top

						window.scrollTo({
							top: targetScrollY,
							behavior: "smooth",
						});
					}
				}, 10);
			} else if (previousExpandedState.current === true) {
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
			position: "relative",
			backgroundColor: "var(--mainBackground)",
			boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
			// maxHeight: "calc(90vh - 40px)",
			// minHeight: "100%",
			// height: "fit-content",
			// overflow: "auto",
			"& .MuiAccordionDetails-root": {
				maxHeight: "calc(90vh - 120px)", // Account for header height
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
				zIndex: 1000,
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
					id={"panel" + index + "-header"}
				>
					<Favourite
						id={"item-" + item?.id}
						className={item?.title?.replaceAll(".", "")}
					/>
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
				<AccordionDetails>
					<div dangerouslySetInnerHTML={{__html: item.content.explanation}} />
					{item.content.acronyms.map((acronym, acronymIndex) => (
						<div key={"acronymn-" + acronymIndex}>
							<div
								className="Acronym-title"
								key={"t-" + acronymIndex}
							>
								<div
									className="Acronym-letter"
									key={"l-" + acronymIndex}
								>
									{acronym.letter}
								</div>
								<div
									className="Acronym-word"
									key={"m-" + acronymIndex}
								>
									{acronym.meaning}
								</div>
							</div>
							<div
								key={"d-" + acronymIndex}
								className="Acronym-definition"
								dangerouslySetInnerHTML={{__html: acronym.definition}}
							/>
						</div>
					))}
				</AccordionDetails>
			</Accordion>
			<div className="accBack"></div>
		</div>
	);
};
export default function AccordionScroll({expanded, handleChange}) {
	const componentData = data;

	// You can easily override the default config here
	const customConfig = {
		...SCROLL_EFFECT_CONFIG,
		// minOpacity: 0.2,    // Uncomment to override
		// minScale: 0.9,      // Uncomment to override
		// fadeBoundary: 0.2,  // Uncomment to override
	};

	return (
		<div className={"AccordionRoot"}>
			{componentData.map((item, index) =>
				item ? (
					<AccordionItemWithEffects
						key={"accordion-" + index}
						item={item}
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
