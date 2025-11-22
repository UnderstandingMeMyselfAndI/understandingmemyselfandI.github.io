import React, {useState, useEffect, useRef} from "react";
import ImageData from "data/imgData.js";
import bgImg from "/bgs/2.jpg";
import "./BackdropParallax.scss";

const allImages = ImageData;
const DEFAULT_INTERVAL = 10000;

export default function BackdropParallax({initialImageId = null, initialDelay = 0, interval = DEFAULT_INTERVAL, parallaxStrength = 0.5}) {
	// Always keep two images: bottom (current) and top (incoming)
	const [bottomImage, setBottomImage] = useState(null);
	const [topImage, setTopImage] = useState(null);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const usedIds = useRef(new Set());

	// Select random unused image
	const getNextImage = () => {
		let available = allImages.filter(img => !usedIds.current.has(img.id));

		if (available.length === 0) {
			// Reset pool, but keep currently displayed images
			const currentlyUsed = bottomImage ? [bottomImage.id] : [];
			if (topImage) currentlyUsed.push(topImage.id);
			usedIds.current = new Set(currentlyUsed);
			available = allImages.filter(img => !currentlyUsed.includes(img.id));
		}

		const next = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : allImages[0];

		usedIds.current.add(next.id);
		return next;
	};

	// Initial setup
	useEffect(() => {
		const firstImage = initialImageId ? allImages.find(i => i.id === initialImageId) || allImages[0] : allImages[Math.floor(Math.random() * allImages.length)];

		usedIds.current.add(firstImage.id);
		setBottomImage(firstImage);
		setTopImage(null);
		setIsTransitioning(false);
	}, [initialImageId]);

	// Start cycling after initialDelay
	useEffect(() => {
		if (!bottomImage) return;

		const timer = setTimeout(() => {
			startCycle();
		}, initialDelay);

		return () => clearTimeout(timer);
	}, [bottomImage, initialDelay]);

	// Main cycling logic
	const startCycle = () => {
		const intervalId = setInterval(() => {
			const nextImage = getNextImage();

			// Step 1: Set the new image as top (will fade in)
			setTopImage(nextImage);
			setIsTransitioning(true);

			// Step 2: After fade-in completes, move top → bottom, clear top
			setTimeout(() => {
				setBottomImage(nextImage);
				setTopImage(null);
				setIsTransitioning(false);
			}, 2000); // Match your fade duration (2s)
		}, interval);

		return () => clearInterval(intervalId);
	};
	// Safe preview of next image without affecting usedIds
	// Add this useEffect near your other effects
	useEffect(() => {
		if (!bottomImage) return;

		const preloadNext = () => {
			const available = allImages.filter(img => !usedIds.current.has(img.id) && img.id !== bottomImage.id && (!topImage || img.id !== topImage.id));

			if (available.length > 0) {
				const next = available[Math.floor(Math.random() * available.length)];
				const img = new Image();
				img.src = next.url;
			}
		};

		// Preload immediately
		preloadNext();

		// Preload one more ~2 seconds before next transition
		const preloadInterval = setInterval(preloadNext, Math.max(interval - 2000, 1000));

		return () => clearInterval(preloadInterval);
	}, [bottomImage, topImage, interval]);

	// Parallax effect on scroll
	useEffect(() => {
		if (parallaxStrength === 0) return;

		const onScroll = () => {
			const offset = window.pageYOffset * parallaxStrength;
			document.querySelectorAll(".cont img").forEach(img => {
				img.style.transform = `translateY(-${offset}px)`;
			});
		};

		window.addEventListener("scroll", onScroll, {passive: true});
		return () => window.removeEventListener("scroll", onScroll);
	}, [parallaxStrength]);

	if (!bottomImage) return null;

	return (
		<div className="backdrop">
			<div className="vig" />
			<div className="cont">
				{/* Bottom layer - always visible */}
				<img
					src={bottomImage.url || bgImg}
					alt={bottomImage.alt || "Backdrop"}
					className="bottom"
				/>

				{/* Top layer - fades in during transition */}
				{topImage && (
					<img
						src={topImage.url || bgImg}
						alt={topImage.alt || "Backdrop"}
						className={`top ${isTransitioning ? "fading-in" : ""}`}
					/>
				)}
			</div>
		</div>
	);
}
