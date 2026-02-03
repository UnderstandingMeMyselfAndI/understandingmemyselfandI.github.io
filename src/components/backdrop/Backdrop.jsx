import { useState, useEffect, useRef } from 'react'
import ImageData from 'data/imgData.js'
import './Backdrop.scss'
import PropTypes from 'prop-types'

const allImages = ImageData
const DEFAULT_INTERVAL = 10000
const FADE_DURATION = 2000

export default function Backdrop({
  initialImageId = null,
  initialDelay = 0,
  interval = DEFAULT_INTERVAL,
}) {
  const [currentImage, setCurrentImage] = useState(null)
  const [nextImage, setNextImage] = useState(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const usedIds = useRef(new Set())
  const intervalRef = useRef(null)

  // Initial image selection
  useEffect(() => {
    const firstImage = initialImageId
      ? allImages.find((i) => i.id === initialImageId) || allImages[0]
      : allImages[Math.floor(Math.random() * allImages.length)]
    usedIds.current.add(firstImage.id)
    setCurrentImage(firstImage)
  }, [initialImageId])

  // Image cycling logic
  useEffect(() => {
    if (!currentImage) return

    const getNextImage = () => {
      let available = allImages.filter((img) => !usedIds.current.has(img.id))
      if (available.length === 0) {
        usedIds.current.clear()
        if (currentImage) {
          usedIds.current.add(currentImage.id)
        }
        available = allImages.filter((img) => !usedIds.current.has(img.id))
      }
      const next = available[Math.floor(Math.random() * available.length)]
      usedIds.current.add(next.id)
      return next
    }

    const startInterval = () => {
      setIsInitializing(false)
      intervalRef.current = setInterval(() => {
        const next = getNextImage()
        setNextImage(next)

        setTimeout(() => {
          setCurrentImage(next)
          setNextImage(null)
        }, FADE_DURATION)
      }, interval)
    }

    const timer = setTimeout(startInterval, initialDelay)

    return () => {
      clearTimeout(timer)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [currentImage, initialDelay, interval])

  // Preload next image
  useEffect(() => {
    if (nextImage) {
      const img = new Image()
      img.src = nextImage.url
    }
  }, [nextImage])

  return (
    <div className='backdrop'>
      <div className='vignette' />
      <div className='image-container'>
        {currentImage && (
          <img
            key={currentImage.id}
            src={currentImage.url}
            alt={currentImage.alt || 'Backdrop'}
            className={`backdrop-image current ${nextImage ? 'fade-out' : ''} ${isInitializing ? 'no-fade' : ''}`}
          />
        )}
        {nextImage && (
          <img
            key={nextImage.id}
            src={nextImage.url}
            alt={nextImage.alt || 'Next backdrop'}
            className='backdrop-image next fade-in'
          />
        )}
      </div>
    </div>
  )
}

Backdrop.propTypes = {
  initialImageId: PropTypes.string,
  initialDelay: PropTypes.number,
  interval: PropTypes.number,
}
