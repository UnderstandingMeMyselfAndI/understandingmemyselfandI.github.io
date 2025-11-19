import React, {useState, useEffect} from "react";
import data from "data/imgData.js";
import bgImg from "/bgs/2.jpg";
import "./styles.scss";

const allImages = Object.values(data);
const newImgInterval = 3000;

export default function Backdrop() {
	const [images, setImages] = useState([allImages[0], allImages[1]]);
	const [activeIndex, setActiveIndex] = useState(0);
	const [usedImages, setUsedImages] = useState([allImages[0].id, allImages[1].id]);

	const getNewUniqueImage = () => {
		const availableImages = allImages.filter(img => !usedImages.includes(img.id));

		// If no unique images left, reset used images (keep current ones used)
		if (availableImages.length === 0) {
			setUsedImages([images[0].id, images[1].id]);
			const newImage = allImages.find(img => img.id !== images[0].id && img.id !== images[1].id) || allImages[0];
			return newImage;
		}

		// Pick random image from available ones
		const randomIndex = Math.floor(Math.random() * availableImages.length);
		const newImage = availableImages[randomIndex];

		// Add to used images
		setUsedImages(prev => [...prev, newImage.id]);

		return newImage;
	};

	useEffect(() => {
		const interval = setInterval(() => {
			// The image at activeIndex stays, the other gets replaced
			const newImage = getNewUniqueImage();

			if (activeIndex === 0) {
				// Keep image[0], replace image[1]
				setImages(prev => [prev[0], newImage]);
			} else {
				// Keep image[1], replace image[0]
				setImages(prev => [newImage, prev[1]]);
			}

			// Toggle active index for next cycle
			setActiveIndex(prev => (prev === 0 ? 1 : 0));
		}, newImgInterval);

		return () => clearInterval(interval);
	}, [activeIndex, usedImages]);

	return (
		<div className="backdrop">
			<div className="vig"></div>
			<div className="cont">
				<img
					className={activeIndex === 0 ? "active" : ""}
					src={images[0]?.url || bgImg}
					alt={images[0]?.alt || "Backdrop image"}
				/>

				<img
					className={activeIndex === 1 ? "active" : ""}
					src={images[1]?.url || bgImg}
					alt={images[1]?.alt || "Backdrop image"}
				/>
			</div>
		</div>
	);
}
