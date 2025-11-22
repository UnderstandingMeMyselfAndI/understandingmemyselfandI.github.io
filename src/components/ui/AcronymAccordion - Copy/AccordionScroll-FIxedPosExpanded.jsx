import React, {useState, useRef, useEffect, useCallback, useMemo} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import Skeleton from "@mui/material/Skeleton";
import ScenarioDialog from "../dialog/ScenarioDialog";

import data from "../../../data/data.js";
import Favourite from "../favourite/Favourite.jsx";
import "../../../globals.css";
import "./AccordionStyles.css";

// Configuration constants - easily adjustable
const SCROLL_EFFECT_CONFIG = {
	minOpacity: 0.15, // Minimum opacity (15%)
	minScale: 0.5, // Minimum scale (85%)
	fadeBoundary: 0.35, // 15% from top/bottom
	innerFadeBoundary: 0.15, // 15% from top/bottom
	transitionSpeed: "0.25s ease-out", // speed when scrolling
};

// Custom hook for scroll-based opacity and scale
const useScrollEffects = (config = SCROLL_EFFECT_CONFIG, isExpanded = false) => {
	const ref = useRef(null);
	const [effects, setEffects] = useState({opacity: 1, scale: 1});
	const [windowHeight, setWindowHeight] = useState(0);

	// Update window height on resize
	useEffect(() => {
		const handleResize = () => {
			setWindowHeight(window.innerHeight);
		};

		handleResize();
		window.addEventListener("resize", handleResize, {passive: true});
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const calculateEffects = useCallback(() => {
		// If expanded, use full opacity and scale and don't calculate scroll effects
		if (isExpanded) {
			setEffects({opacity: 1, scale: 1});
			return;
		}

		const element = ref.current;
		if (!element || windowHeight === 0) return;

		const rect = element.getBoundingClientRect();
		const elementCenter = rect.top + rect.height / 2;
		const viewportCenter = windowHeight / 2;
		const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
		const fadeEndDistance = windowHeight * config.fadeBoundary;
		const innerFadeEndDistance = viewportCenter * config.innerFadeBoundary;

		// Calculate both opacity and scale based on the same scroll position
		const opacityProgress = (distanceFromCenter - innerFadeEndDistance) / fadeEndDistance;
		const scaleProgress = (distanceFromCenter - innerFadeEndDistance) / fadeEndDistance;

		let newOpacity = 1 - opacityProgress * (1 - config.minOpacity);
		let newScale = 1 - scaleProgress * (1 - config.minScale);

		newOpacity = Math.max(config.minOpacity, Math.min(1, newOpacity));
		newScale = Math.max(config.minScale, Math.min(1, newScale));

		setEffects({opacity: newOpacity, scale: newScale});
	}, [windowHeight, config, isExpanded]);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		let ticking = false;
		const handleScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					calculateEffects();
					ticking = false;
				});
				ticking = true;
			}
		};

		calculateEffects(); // Initial calculation

		// Only add scroll listener if not expanded
		if (!isExpanded) {
			window.addEventListener("scroll", handleScroll, {passive: true});
		} else {
			// When expanded, remove any scroll effects
			setEffects({opacity: 1, scale: 1});
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [calculateEffects, isExpanded]);

	// Recalculate effects when expanded state changes
	useEffect(() => {
		calculateEffects();
	}, [isExpanded, calculateEffects]);

	return useMemo(() => [ref, effects], [effects]);
};

// Individual Accordion Item with opacity and scale effects
const AccordionItemWithEffects = ({item, index, expanded, handleChange, config = SCROLL_EFFECT_CONFIG}) => {
	const isExpanded = expanded === "panel" + index;
	const [ref, effects] = useScrollEffects(config, isExpanded);

	// Memoize expanded styles to prevent unnecessary recalculations
	const expandedStyles = useMemo(() => {
		if (!isExpanded) return {};

		return {
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
			zIndex: 1000,
			width: "100vw",
			backgroundColor: "var(--mainBackground)",
			boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
			maxHeight: "100vh",
			overflow: "auto",
			"& .MuiAccordionDetails-root": {
				maxHeight: "calc(100vh - 120px)",
				overflow: "auto",
			},
		};
	}, [isExpanded]);

	const wrapperStyle = useMemo(() => {
		if (isExpanded) {
			//
			// When expanded, remove all transforms and positioning from wrapper
			return {
				opacity: 1,
				transform: "none",
				marginBottom: "400px", // Reserve space to prevent layout shift
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
		>
			<Accordion
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
					expandIcon={<ExpandMoreIcon />}
					aria-controls={"panel" + index + "-content"}
					id={"panel" + index + "-header"}
				>
					<Favourite
						id={"item-" + item?.id}
						className={item?.title?.replaceAll(".", "")}
					/>
					<Typography component="span">{item.title}</Typography>
					{/* 
					<CloseIcon
						sx={{fill: "var(--grey)"}}
						className={"btn close"}
						onClick={handleChange(`panel${index}`)}
					/> */}
				</AccordionSummary>
				<AccordionDetails>
					<div dangerouslySetInnerHTML={{__html: item.content.explanation}} />
					{item.content.acronyms.map((acronym, acronymIndex) => (
						<div key={"acronymn-" + acronymIndex}>
							<div key={"m-" + acronymIndex}>{acronym.meaning}</div>
							<div
								key={"d-" + acronymIndex}
								className="Acronym-definition"
								dangerouslySetInnerHTML={{__html: acronym.definition}}
							/>
						</div>
					))}
				</AccordionDetails>
			</Accordion>
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
