import React from "react";
import {useRef, useEffect, useCallback, useMemo, useState} from "react";
import Skeleton from "@mui/material/Skeleton";
import HandymanIcon from "@mui/icons-material/Handyman";
import PropTypes from "prop-types";
import useAppStore from "@/store/useAppStore";
import data from "../../../data/data.js";
import "./MenuCarousel.scss";
// Default configuration
const DEFAULT_CONFIG = {
	minOpacity: 0.2,
	minScale: 0.5,
	fadeBoundary: 0.2,
	centerZoneHeight: 0.4,
	transitionSpeed: "0.2s",
};

// Custom hook for scroll effects
const useScrollEffects = (config = DEFAULT_CONFIG) => {
	const itemsRef = useRef([]);
	const rafId = useRef(null);
	const isActive = useRef(true);

	const calculateEffects = useCallback(() => {
		if (!isActive.current) return;

		const viewportHeight = window.innerHeight;
		const viewportCenter = viewportHeight / 2;

		// Calculate boundaries
		const fadeBoundaryPixels = viewportHeight * config.fadeBoundary;
		const centerZonePixels = viewportHeight * config.centerZoneHeight;
		const centerZoneTop = viewportCenter - centerZonePixels / 2;
		const centerZoneBottom = viewportCenter + centerZonePixels / 2;

		itemsRef.current.forEach(item => {
			if (!item?.element) return;

			const rect = item.element.getBoundingClientRect();
			const elementCenter = rect.top + rect.height / 2;

			let opacity = 1;
			let scale = 1;

			// Check if element is outside center zone
			if (elementCenter < centerZoneTop || elementCenter > centerZoneBottom) {
				let distance = 0;

				if (elementCenter < centerZoneTop) {
					distance = (centerZoneTop - elementCenter) / fadeBoundaryPixels;
				} else {
					distance = (elementCenter - centerZoneBottom) / fadeBoundaryPixels;
				}

				// Exponential falloff
				const progress = Math.min(1, Math.max(0, distance));
				const exponentialProgress = progress * progress;

				opacity = 1 - (1 - config.minOpacity) * exponentialProgress;
				scale = 1 - (1 - config.minScale) * exponentialProgress;
			}

			// Apply styles with transition
			item.element.style.opacity = opacity;
			item.element.style.transform = `scale(${scale})`;
		});

		rafId.current = requestAnimationFrame(calculateEffects);
	}, [config]);

	const start = useCallback(() => {
		if (isActive.current) return;
		isActive.current = true;
		rafId.current = requestAnimationFrame(calculateEffects);
	}, [calculateEffects]);

	const stop = useCallback(() => {
		isActive.current = false;
		if (rafId.current) {
			cancelAnimationFrame(rafId.current);
			rafId.current = null;
		}
	}, []);

	const registerItem = useCallback((index, element) => {
		itemsRef.current[index] = {element};
	}, []);

	const unregisterItem = useCallback(index => {
		itemsRef.current[index] = null;
	}, []);

	useEffect(() => {
		start();
		return () => stop();
	}, [start, stop]);

	return {
		start,
		stop,
		registerItem,
		unregisterItem,
	};
};

// Individual list item component
const VerticalListItem = ({children, index, registerItem, unregisterItem, style = {}}) => {
	const elementRef = useRef(null);

	useEffect(() => {
		if (elementRef.current) {
			registerItem(index, elementRef.current);
		}

		return () => unregisterItem(index);
	}, [index, registerItem, unregisterItem]);

	return (
		<div
			ref={elementRef}
			className={"list-item"}
			style={{
				width: "100%",
				// height: "100px",
				transition: "opacity 0.2s, transform 0.2s",
				transformOrigin: "center center",
				...style,
			}}
		>
			{children}
		</div>
	);
};

VerticalListItem.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	registerItem: PropTypes.func.isRequired,
	unregisterItem: PropTypes.func.isRequired,
	style: PropTypes.object,
};

// Main vertical list component
const VerticalList = ({children, config = DEFAULT_CONFIG, isActive = true, itemStyle = {}, className = ""}) => {
	const {start, stop, registerItem, unregisterItem} = useScrollEffects(config);

	// Control scroll listener
	useEffect(() => {
		if (isActive) {
			start();
		} else {
			stop();
		}
	}, [isActive, start, stop]);

	const items = useMemo(() => {
		return React.Children.map(children, (child, index) => (
			<VerticalListItem
				className={"list-item"}
				key={index}
				index={index}
				registerItem={registerItem}
				unregisterItem={unregisterItem}
				style={itemStyle}
			>
				{child}
			</VerticalListItem>
		));
	}, [children, registerItem, unregisterItem, itemStyle]);

	return (
		<div
			className={`accronym-menu ${className}`}
			style={{width: "100%"}}
		>
			{items}
		</div>
	);
};

VerticalList.propTypes = {
	children: PropTypes.node.isRequired,
	config: PropTypes.shape({
		minOpacity: PropTypes.number,
		minScale: PropTypes.number,
		fadeBoundary: PropTypes.number,
		centerZoneHeight: PropTypes.number,
		transitionSpeed: PropTypes.string,
	}),
	isActive: PropTypes.bool,
	itemStyle: PropTypes.object,
	className: PropTypes.string,
};

const MenuCarousel = ({showToolsOnly}) => {
	const [open, setOpen] = useState(false);
	const [carouselData, setCarouselData] = useState(data);
	const {accData, activity, setActivity, setAcronymnID, setShowAccCard} = useAppStore();
	useEffect(() => {
		showToolsOnly ? setCarouselData(accData) : setCarouselData(data);
	}, [accData, showToolsOnly]);

	useEffect(() => {
		setOpen(activity === "tools");
	}, [activity]);

	const handleClick = id => () => {
		setAcronymnID(id);
		setShowAccCard(true);
		setActivity(1);
	};

	const customConfig = {
		minOpacity: 0.3,
		minScale: 0.2,
		fadeBoundary: 0.4,
		centerZoneHeight: 0.05,
		transitionSpeed: "0.15s",
	};

	const items = carouselData.map((item, index) => {
		if (!item) {
			return (
				<Skeleton
					key={`skeleton-${index}`}
					variant="rounded"
					width="100%"
					height={200}
					animation="wave"
				/>
			);
		}

		return (
			<div
				key={item.id ?? index}
				className={"carousel-item" + " " + item.id}
				onClick={handleClick(item.id)}
			>
				<div
					className="AccordionItem inner item"
					style={{cursor: "pointer"}}
				>
					<div
						className="title"
						aria-controls={`Accronym-${index}-content`}
						id={`panel${item?.id}-header`}
					>
						{accData.some(d => d.id === item.id) && <HandymanIcon className="icon" />}

						<div className="letters-cont">
							{item.title.split(".").map(
								(subItem, i) =>
									subItem && (
										<div
											key={i}
											className="letter"
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
	});

	return (
		<div className={"AccordionRoot" + (open ? " expanded" : "")}>
			<VerticalList
				config={customConfig}
				isActive={true}
				itemStyle={{marginBottom: "10px"}}
			>
				{items}
			</VerticalList>
		</div>
	);
};
MenuCarousel.propTypes = {
	showToolsOnly: PropTypes.bool,
};
export default MenuCarousel;
