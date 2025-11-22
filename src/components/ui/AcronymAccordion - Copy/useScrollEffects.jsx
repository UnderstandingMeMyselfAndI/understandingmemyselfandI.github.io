// useScrollEffects.jsx
import {useRef, useEffect, useState, useMemo} from "react";

export const SCROLL_EFFECT_CONFIG = {
	minOpacity: 0.18,
	minScale: 0.25,
	fadeBoundary: 0.85,
	intensity: 2,
	easePower: 2,
};

const useScrollEffects = (userConfig = {}, isExpanded = false) => {
	const ref = useRef(null);
	const [effects, setEffects] = useState({opacity: 1, scale: 1});

	const config = useMemo(() => ({...SCROLL_EFFECT_CONFIG, ...userConfig}), [userConfig]);

	useEffect(() => {
		if (isExpanded) {
			setEffects({opacity: 1, scale: 1});
			return;
		}

		const el = ref.current;
		if (!el) return;

		let ticking = false;

		const update = () => {
			const rect = el.getBoundingClientRect();
			const elCenter = rect.top + rect.height / 2;
			const viewportCenter = window.innerHeight / 2;
			const distance = Math.abs(elCenter - viewportCenter);
			const maxDistance = window.innerHeight * config.fadeBoundary;

			let progress = Math.min(1, Math.max(0, distance / maxDistance));
			const ease = 1 - Math.pow(1 - progress, config.easePower);
			const t = ease * config.intensity;

			setEffects({
				opacity: 1 - t * (1 - config.minOpacity),
				scale: 1 - t * (1 - config.minScale),
			});
		};

		const onScroll = () => {
			if (!ticking) {
				requestAnimationFrame(() => {
					update();
					ticking = false;
				});
				ticking = true;
			}
		};

		// one final update when momentum ends (kills the pop)
		const onScrollEnd = () => update();

		update();
		window.addEventListener("scroll", onScroll, {passive: true});
		window.addEventListener("scrollend", onScrollEnd);
		window.addEventListener("resize", onScroll, {passive: true});

		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("scrollend", onScrollEnd);
			window.removeEventListener("resize", onScroll);
		};
	}, [isExpanded, config]);

	return [ref, effects.opacity, effects.scale];
};

export default useScrollEffects;
