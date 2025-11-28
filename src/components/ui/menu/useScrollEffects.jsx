import {useRef, useState, useEffect, useCallback, useMemo} from "react";
import {useGlobalRecalcTrigger, triggerGlobalRecalc} from "@/hooks/useGlobalRecalcTrigger.js";
// Configuration constants - easily adjustable
const SCROLL_EFFECT_CONFIG = {
	minOpacity: 0.25, // Minimum opacity (15%)
	minScale: 0.35, // Minimum scale (85%)
	fadeBoundary: 0.35, // 15% from top/bottom
	innerFadeBoundary: 0.15, // 15% from top/bottom
	transitionSpeed: "0.35s ease-out", // speed when scrolling
};

// Custom hook for scroll-based opacity and scale
const useScrollEffects = (config = SCROLL_EFFECT_CONFIG, isExpanded = false) => {
	const ref = useRef(null);
	const [effects, setEffects] = useState({opacity: 1, scale: 1});
	const [windowHeight, setWindowHeight] = useState(0);
	const scrollEnabled = useRef(true);
	const animationFrameId = useRef(null);

	useGlobalRecalcTrigger(() => {
		if (!isExpanded && scrollEnabled.current) {
			calculateEffects();
		}
	});

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
		// If expanded or scroll disabled, use full opacity and scale
		if (isExpanded || !scrollEnabled.current) {
			setEffects({opacity: 1, scale: 1});
			return;
		}

		const element = ref.current;
		if (!element || windowHeight === 0) return;

		const rect = element.getBoundingClientRect();
		const elementCenter = rect.top + rect.height / 2;
		const viewportCenter = windowHeight / 2;
		const distanceFromCenter = Math.abs(elementCenter - viewportCenter);

		// Use different boundaries for opacity and scale if needed
		const fadeEndDistance = windowHeight * config.fadeBoundary;
		const innerFadeEndDistance = viewportCenter * config.innerFadeBoundary;

		// Calculate progress with inner boundary (no effect until past inner boundary)
		const effectiveDistance = Math.max(0, distanceFromCenter - innerFadeEndDistance);
		const progress = Math.min(1, effectiveDistance / fadeEndDistance);

		// Calculate both opacity and scale based on the same progress
		let newOpacity = 1 - progress * (1 - config.minOpacity);
		let newScale = 1 - progress * (1 - config.minScale);

		newOpacity = Math.max(config.minOpacity, Math.min(1, newOpacity));
		newScale = Math.max(config.minScale, Math.min(1, newScale));

		setEffects({opacity: newOpacity, scale: newScale});
	}, [windowHeight, config, isExpanded]);

	// Throttled scroll handler
	const handleScroll = useCallback(() => {
		console.log("handleScroll isExpanded ", isExpanded);
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}

		animationFrameId.current = requestAnimationFrame(() => {
			if (scrollEnabled.current && !isExpanded) {
				calculateEffects();
			}
			animationFrameId.current = null;
		});
	}, [calculateEffects, isExpanded]);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// Initial calculation
		calculateEffects();

		// Only add scroll listener if not expanded and scroll is enabled
		if (!isExpanded && scrollEnabled.current) {
			window.addEventListener("scroll", handleScroll, {passive: true});
		} else {
			// When expanded or scroll disabled, set to full visibility
			setEffects({opacity: 1, scale: 1});
		}

		return () => {
			window.removeEventListener("scroll", handleScroll);
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [handleScroll, calculateEffects, isExpanded]);

	// Recalculate effects when expanded state changes
	useEffect(() => {
		calculateEffects();
	}, [isExpanded, calculateEffects]);

	// Function to disable scroll effects
	const disableScrollEffects = useCallback(() => {
		scrollEnabled.current = false;
		setEffects({opacity: 1, scale: 1});

		// Clean up any pending animation frames
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
			animationFrameId.current = null;
		}
	}, []);

	// Function to enable scroll effects
	const enableScrollEffects = useCallback(() => {
		scrollEnabled.current = true;

		// Recalculate effects after a brief delay to ensure DOM is stable
		setTimeout(() => {
			calculateEffects();
		}, 50);
	}, [calculateEffects]);

	// Inside useScrollEffects hook, add this function
	const forceRecalculate = useCallback(() => {
		// Cancel any pending frame
		if (animationFrameId.current) {
			cancelAnimationFrame(animationFrameId.current);
		}

		// Force immediate recalculation
		animationFrameId.current = requestAnimationFrame(() => {
			calculateEffects();
			animationFrameId.current = null;
		});
	}, [calculateEffects]);

	return useMemo(() => [ref, effects, disableScrollEffects, enableScrollEffects, forceRecalculate], [effects, disableScrollEffects, enableScrollEffects, forceRecalculate]);
};
export {useScrollEffects, SCROLL_EFFECT_CONFIG};
