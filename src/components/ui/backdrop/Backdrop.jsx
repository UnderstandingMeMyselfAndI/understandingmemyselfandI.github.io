import { useState, useEffect } from 'react';
import ImageData from 'data/imgData.js'; // ← make sure it's default export

import Proptypes from 'prop-types';
import './styles.scss';

const allImages = ImageData; // already an array
const newImgInterval = 10000;

export default function Backdrop({ initialImageId = null }) {
  const bgImg = new Image();
  bgImg.url = '/bgs/2.avif';
  // Allow parent to control first image, otherwise random
  const getInitialImages = () => {
    if (initialImageId) {
      const forced =
        allImages.find((img) => img.id === initialImageId) || allImages[0];
      const second =
        allImages.find((img) => img.id !== forced.id) || allImages[1] || forced;
      return [forced, second];
    }
    // Random start
    const idx1 = Math.floor(Math.random() * allImages.length);
    let idx2;
    do {
      idx2 = Math.floor(Math.random() * allImages.length);
    } while (idx2 === idx1 && allImages.length > 1);
    return [allImages[idx1], allImages[idx2] || allImages[0]];
  };

  const [images, setImages] = useState(getInitialImages());
  const [activeIndex, setActiveIndex] = useState(0);
  const [usedIds, setUsedIds] = useState(images.map((img) => img.id));

  useEffect(() => {
    const getNewUniqueImage = () => {
      const available = allImages.filter((img) => !usedIds.includes(img.id));

      if (available.length === 0) {
        // Reset pool but keep the two currently displayed images used
        const keep = images.map((i) => i.id);
        setUsedIds(keep);
        const next =
          allImages.find((img) => !keep.includes(img.id)) || allImages[0];
        return next;
      }

      const randomIdx = Math.floor(Math.random() * available.length);
      const newImg = available[randomIdx];
      setUsedIds((prev) => [...prev, newImg.id]);
      return newImg;
    };

    const interval = setInterval(() => {
      const newImg = getNewUniqueImage();
      const prevID = usedIds[usedIds.length - 1];
      const prevImg = images.map(() => prevID);

      // setImages(prev => (activeIndex === 0 ? [prevImg, newImg] : [newImg, prevImg]));
      setImages(() => [prevImg, newImg]);
      setActiveIndex((prev) => 1 - prev); // toggle 0 ↔ 1
    }, newImgInterval);

    return () => clearInterval(interval);
  }, [activeIndex, usedIds, images]); // dependencies are correct now

  // parralax
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      // const scrolled = window.pageYOffset;
      // const rate = scrolled * -0.5; // negative = moves up when scrolling down
      // Apply to both images (active + inactive)
      // const images = document.querySelectorAll(".cont img");
      // images.forEach(img => {
      // 	// img.style.transform = `translateY(${rate}px)`;
      // });
    };

    // throttled for buttery-smooth 60fps
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className='backdrop'>
      <div className='vig' />
      <div className='cont'>
        <img
          src={images[0]?.url || bgImg}
          alt={images[0]?.alt || 'Backdrop'}
          className={activeIndex === 0 ? 'active' : 'inactive'}
        />
        <img
          src={images[1]?.url || bgImg}
          alt={images[1]?.alt || 'Backdrop'}
          className={activeIndex === 1 ? 'active' : 'inactive'}
        />
      </div>
    </div>
  );
}
Backdrop.propTypes = {
  initialImageId: Proptypes.string,
};
