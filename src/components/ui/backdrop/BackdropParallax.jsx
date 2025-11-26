import React, {useState, useEffect, useRef} from "react";
import ImageData from "data/imgData.js";
import bgImg from "/bgs/2.jpg";
import "./BackdropParallax.scss";

const allImages = ImageData;
const DEFAULT_INTERVAL = 10000;

export default function BackdropParallax({initialImageId = null, initialDelay = 0, interval = DEFAULT_INTERVAL, parallaxStrength = 0.5}) {
	const [currentImage, setCurrentImage] = useState(null);
	const [nextImage, setNextImage] = useState(null);
	const [isFading, setIsFading] = useState(false);
	const usedIds = useRef(new Set());
	const intervalRef = useRef(null);

	const getNextImage = () => {
		let available = allImages.filter(img => !usedIds.current.has(img.id));
		if (available.length === 0) {
			const keep = currentImage ? [currentImage.id] : [];
			if (nextImage) keep.push(nextImage.id);
			usedIds.current = new Set(keep);
			available = allImages.filter(img => !keep.includes(img.id));
		}
		const next = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : allImages[0];
		usedIds.current.add(next.id);
		return next;
	};

	// Initial image
	useEffect(() => {
		const first = initialImageId ? allImages.find(i => i.id === initialImageId) || allImages[0] : allImages[Math.floor(Math.random() * allImages.length)];
		usedIds.current.add(first.id);
		setCurrentImage(first);
	}, [initialImageId]);

	// Cycling
	useEffect(() => {
		if (!currentImage) return;

		const timer = setTimeout(() => {
			intervalRef.current = setInterval(() => {
				const next = getNextImage();
				setNextImage(next);
				setIsFading(true);

				// After fade, swap
				setTimeout(() => {
					setCurrentImage(next);
					setNextImage(null);
					setIsFading(false);
				}, 950); // Slightly less than 2s to avoid race
			}, interval); // Fixed: No stray ) here
		}, initialDelay);

		return () => {
			clearTimeout(timer);
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, [currentImage, initialDelay, interval]);

	// Preload
	useEffect(() => {
		if (!currentImage) return;
		const preload = () => {
			const available = allImages.filter(img => !usedIds.current.has(img.id) && img.id !== currentImage.id && (!nextImage || img.id !== nextImage.id));
			if (available.length > 0) {
				new Image().src = available[Math.floor(Math.random() * available.length)].url;
			}
		};
		preload();
		const id = setInterval(preload, Math.max(interval - 4000, 6000)); // Safe min 6s
		return () => clearInterval(id);
	}, [currentImage, nextImage, interval]);

	// Parallax
	// useEffect(() => {
	// 	if (parallaxStrength === 0) return;
	// 	const onScroll = () => {
	// 		const offset = window.pageYOffset * parallaxStrength;
	// 		document.querySelectorAll(".cont img").forEach(img => {
	// 			img.style.transform = `translateY(-${offset}px)`;
	// 		});
	// 	};
	// 	window.addEventListener("scroll", onScroll, {passive: true});
	// 	return () => window.removeEventListener("scroll", onScroll);
	// }, [parallaxStrength]);

	if (!currentImage) return null;

	return (
		<div className="backdrop">
			<div className="vig" />
			<div className="cont">
				{/* Current image - always present */}
				<img
					key={currentImage.id + "-current"}
					src={currentImage.url || bgImg}
					alt={currentImage.alt || "Backdrop"}
					className="layer current"
				/>

				{/* Next image - only during fade, forced fresh DOM node */}
				{nextImage && (
					<img
						key={nextImage.id + "-next"} // This forces new DOM node every time
						src={nextImage.url || bgImg}
						alt={nextImage.alt || "Next backdrop"}
						className="layer next"
						style={{animation: isFading ? "fadeIn 2s ease-out forwards" : "none"}}
					/>
				)}
			</div>
		</div>
	);
}
