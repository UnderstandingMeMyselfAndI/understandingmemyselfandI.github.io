import React, {useState, useEffect, useRef} from "react";
import ImageData from "data/imgData.js";
import bgImg from "/bgs/2.jpg";
import "./BackdropParallax.scss";

const allImages = ImageData;
const DEFAULT_INTERVAL = 10000;

export default function BackdropParallax({initialImageId = null, initialDelay = 0, interval = DEFAULT_INTERVAL, parallaxStrength = 0.5}) {
	// Initial pair of images
	const getInitialPair = () => {
		const first = initialImageId ? allImages.find(i => i.id === initialImageId) || allImages[0] : allImages[Math.floor(Math.random() * allImages.length)];

		let second = first;
		while (second.id === first.id && allImages.length > 1) {
			second = allImages[Math.floor(Math.random() * allImages.length)];
		}
		return [first, second];
	};

	const [images, setImages] = useState(getInitialPair());
	const [activeIndex, setActiveIndex] = useState(0); // 0 or 1
	const [hasStarted, setHasStarted] = useState(false);
	const usedIds = useRef(new Set([images[0].id]));
	const [curImg, setCurImg] = useState(images[0]);
	const [nextImg, setNextImg] = useState(images[1]);

	// Get next unique image
	const getNextImage = () => {
		let available = allImages.filter(img => !usedIds.current.has(img.id));

		if (available.length === 0) {
			// Reset pool but keep the two currently shown
			const keep = images.map(i => i.id);
			usedIds.current = new Set(keep);
			available = allImages.filter(img => !keep.includes(img.id));
		}

		const next = available.length > 0 ? available[Math.floor(Math.random() * available.length)] : allImages[0];

		usedIds.current.add(next.id);
		return next;
	};
	function getLastItem(_set) {
		return [..._set].pop();
	}
	// Start cycling after initialDelay
	useEffect(() => {
		const timer = setTimeout(() => {
			setHasStarted(true);

			// First transition
			const nextImgLoop = getNextImage();
			setCurImg(nextImg);
			setNextImg(nextImgLoop);

			setImages(prev => (activeIndex === 0 ? [nextImg, curImg] : [nextImg, curImg]));
			setActiveIndex(prev => 1 - prev);

			// Subsequent transitions
			const intervalId = setInterval(() => {
				const nextImg = getNextImage();
				const prevID = Array.from(usedIds.current).pop() || 0;
				const prevImg = getLastItem(usedIds.current);
				setCurImg(prevImg);
				setNextImg(nextImg);

				setImages(prev => (activeIndex === 0 ? [nextImg, curImg] : [nextImg, curImg]));

				setActiveIndex(prev => 1 - prev);
			}, interval);

			return () => clearInterval(intervalId);
		}, initialDelay);

		return () => clearTimeout(timer);
	}, [initialDelay, interval]);

	// Parallax only on the active image
	useEffect(() => {
		if (parallaxStrength === 0) return;

		const onScroll = () => {
			const offset = window.pageYOffset * parallaxStrength;
			const activeImg = document.querySelector(".cont img.active");
			if (activeImg) {
				activeImg.style.transform = `translateY(-${offset}px)`;
			}
		};

		window.addEventListener("scroll", onScroll, {passive: true});
		return () => window.removeEventListener("scroll", onScroll);
	}, [parallaxStrength, activeIndex]);

	const isInitialLoad = !hasStarted;

	return (
		<div className="backdrop">
			<div className="vig" />
			<div className="cont">
				{/* Initial image – appears instantly, full opacity */}
				{isInitialLoad && (
					<img
						src={images[0].url || bgImg}
						alt={images[0].alt || "Initial backdrop"}
						className="initial-full"
					/>
				)}

				{/* Regular cross-fading slots */}
				<img
					src={nextImg.url || bgImg}
					alt={nextImg.alt || "Backdrop"}
					className={activeIndex === 0 ? "active" : hasStarted ? "active" : "hidden"}
				/>
				<img
					src={curImg.url || bgImg}
					alt={curImg.alt || "Backdrop"}
					className={activeIndex === 1 ? "inactive" : hasStarted ? "inactive" : "hidden"}
				/>
			</div>
		</div>
	);
}
