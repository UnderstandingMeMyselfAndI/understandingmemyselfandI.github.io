import { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CloseIcon from '@mui/icons-material/Close'
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined'
import wallpapers from '@/data/wallpapers'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
import './styles.scss'

const WallpaperGallery = () => {
  const name = 'wallpaper-gallery'
  const id = 6
  const [open, setOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [detectedSize, setDetectedSize] = useState(null)
  const [loading, setLoading] = useState(true)
  const [previewMode, setPreviewMode] = useState(false)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [thumbnailsLoaded, setThumbnailsLoaded] = useState({})
  const [thumbnailsError, setThumbnailsError] = useState({})
  const setIsModal = useAppStore((s) => s.setIsModal) // Get activity from store
  const activity = useAppStore((s) => s.activity)
  const setActivity = useAppStore((s) => s.setActivity)

  // Find the correct activity ID from config
  const activityData = useMemo(
    () => activities.find((act) => act.url === name),
    [name],
  )
  const activityID = activityData?.id

  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open])

  useEffect(() => {
    setOpen(activityID === id)
  }, [activity, activityID])

  // NEW: Prevent multiple navigation triggers

  const carouselRef = useRef(null)
  const previewRef = useRef(null)
  const thumbnailRefs = useRef({})
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const initializedRef = useRef(false)
  const isNavigating = useRef(false) // NEW: Prevent multiple navigation triggers

  // Available wallpaper sizes (in order of preference)
  const availableSizes = useMemo(
    () => [
      { width: 1440, height: 3200, label: 'Modern Standard (20:9)' },
      { width: 1440, height: 3008, label: 'Tall Android (21:9)' },
      { width: 1290, height: 2796, label: 'iPhone Pro Max (19.5:9)' },
      { width: 1170, height: 2532, label: 'iPhone Standard (19.5:9)' },
      { width: 1080, height: 1920, label: 'Standard HD (16:9)' },
    ],
    [],
  )

  // Get the current wallpaper
  const currentWallpaper = useMemo(
    () => wallpapers[currentIndex] || wallpapers[0],
    [currentIndex],
  )

  // Get dedicated thumbnail URL
  const getThumbnailUrl = useCallback((wallpaperId) => {
    return `/wallpapers/wallpaper-${wallpaperId}.avif`
  }, [])

  // Get preview URL (using detected size)
  const getPreviewUrl = useCallback(() => {
    if (!detectedSize || !currentWallpaper) return ''
    return `/wallpapers/wallpaper-${currentWallpaper.id}.avif`
  }, [detectedSize, currentWallpaper])

  // Get download URL (same as preview but with query parameter to force download)
  const getDownloadUrl = useCallback(() => {
    if (!detectedSize || !currentWallpaper) return ''
    return `/wallpapers/wallpaper-${currentWallpaper.id}.avif?download=true`
  }, [detectedSize, currentWallpaper])

  // Navigation handlers - memoized to prevent recreation
  const handlePrevious = useCallback(() => {
    // Prevent multiple triggers
    if (isNavigating.current) return

    isNavigating.current = true
    setCurrentIndex((prev) => Math.max(0, prev - 1))

    // Reset after a short delay
    setTimeout(() => {
      isNavigating.current = false
    }, 150)
  }, [])

  const handleNext = useCallback(() => {
    // Prevent multiple triggers
    if (isNavigating.current) return

    isNavigating.current = true
    setCurrentIndex((prev) => Math.min(wallpapers.length - 1, prev + 1))

    // Reset after a short delay
    setTimeout(() => {
      isNavigating.current = false
    }, 150)
  }, [])

  // Detect optimal size based on screen dimensions - memoized to prevent recreation
  const detectOptimalSize = useCallback(() => {
    try {
      const screenWidth = window.screen.width * (window.devicePixelRatio || 1)
      const screenHeight = window.screen.height * (window.devicePixelRatio || 1)
      const aspectRatio = screenWidth / screenHeight

      // Find the size with the closest aspect ratio
      const bestMatch = availableSizes.reduce((prev, curr) => {
        const currAspectRatio = curr.width / curr.height
        const prevAspectRatio = prev.width / prev.height
        const currDiff = Math.abs(currAspectRatio - aspectRatio)
        const prevDiff = Math.abs(prevAspectRatio - aspectRatio)

        // Prefer larger sizes for better quality
        if (currDiff === prevDiff) {
          return curr.width > prev.width ? curr : prev
        }
        return currDiff < prevDiff ? curr : prev
      }, availableSizes[0])

      setDetectedSize(bestMatch)
      setLoading(false)
    } catch (error) {
      console.error('Error detecting optimal size:', error)
      // Fallback to first size
      setDetectedSize(availableSizes[0])
      setLoading(false)
    }
  }, [availableSizes])

  // Initialize component - handle opening/closing
  useEffect(() => {
    // Check if we should open
    const shouldOpen = activityID === activity

    if (shouldOpen && !open && !initializedRef.current) {
      // console.log('open')
      setOpen(true)
      initializedRef.current = true

      // Prevent body scroll when gallery is open
      // document.body.style.overflow = 'hidden'
      // document.body.style.height = '100%'
      // document.documentElement.style.overflow = 'hidden'

      // Detect optimal size
      detectOptimalSize()
    } else if (!shouldOpen && open) {
      setOpen(false)
      setPreviewMode(false)
      setCurrentIndex(0)
      initializedRef.current = false

      // Restore scroll
      // document.body.style.overflow = 'auto'
      // document.body.style.height = 'auto'
      // document.documentElement.style.overflow = 'auto'
    }
  }, [activity, activityID, open, detectOptimalSize])

  // Preload thumbnails for better UX
  const preloadThumbnail = useCallback(
    (wallpaperId) => {
      // Skip if already loaded or loading
      if (thumbnailsLoaded[wallpaperId] || thumbnailsError[wallpaperId]) return

      const img = new Image()
      img.src = getThumbnailUrl(wallpaperId)
      img.onload = () => {
        setThumbnailsLoaded((prev) => ({ ...prev, [wallpaperId]: true }))
      }
      img.onerror = () => {
        console.warn(`Failed to load thumbnail for wallpaper ${wallpaperId}`)
        setThumbnailsError((prev) => ({ ...prev, [wallpaperId]: true }))
      }
    },
    [thumbnailsLoaded, thumbnailsError, getThumbnailUrl],
  )

  // Load thumbnail for current and adjacent wallpapers
  useEffect(() => {
    if (!open) return

    // Load current thumbnail
    preloadThumbnail(currentWallpaper.id)

    // Preload next thumbnails (2 ahead and 2 behind)
    const preloadIndices = [
      currentIndex - 2,
      currentIndex - 1,
      currentIndex + 1,
      currentIndex + 2,
    ]

    preloadIndices.forEach((index) => {
      if (index >= 0 && index < wallpapers.length) {
        preloadThumbnail(wallpapers[index].id)
      }
    })
  }, [currentIndex, open, currentWallpaper.id, preloadThumbnail])

  // Handle swipe gestures
  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX
  }, [])

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    // Don't process swipe if we're currently navigating
    if (isNavigating.current) return

    const swipeThreshold = 50
    const diff = touchStartX.current - touchEndX.current

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next
        handleNext()
      } else {
        // Swipe right - previous
        handlePrevious()
      }
    }
  }, [handleNext, handlePrevious])

  // Handle thumbnail image load
  const handleThumbnailLoad = useCallback((wallpaperId) => {
    setThumbnailsLoaded((prev) => ({ ...prev, [wallpaperId]: true }))
  }, [])

  // Handle thumbnail image error
  const handleThumbnailError = useCallback((wallpaperId) => {
    setThumbnailsError((prev) => ({ ...prev, [wallpaperId]: true }))
  }, [])

  // Preview handlers
  const handlePreview = useCallback(() => {
    if (!detectedSize) return
    setPreviewMode(true)
    setPreviewLoading(true)
    setPreviewError(false)
    setImageLoaded(false)

    // Force image reload
    const previewUrl = getPreviewUrl()
    if (previewRef.current) {
      previewRef.current.src = previewUrl + '?t=' + Date.now()
    }
  }, [detectedSize, getPreviewUrl])

  // useEffect(() => {
  //   // console.trace('currentIndex', currentIndex)
  // }, [currentIndex])

  const handleExitPreview = useCallback(() => {
    setPreviewMode(false)
    setPreviewLoading(false)
    setPreviewError(false)
  }, [])

  // Handle image loaded in preview
  const handlePreviewImageLoad = useCallback(() => {
    setPreviewLoading(false)
    setImageLoaded(true)
  }, [])

  // Handle image error in preview
  const handlePreviewImageError = useCallback(() => {
    setPreviewLoading(false)
    setPreviewError(true)
    setImageLoaded(false)
  }, [])

  // Handle download (forces download instead of opening)
  const handleDownload = useCallback(async () => {
    if (!detectedSize) return

    try {
      const downloadUrl = getDownloadUrl()
      const fileName = `${currentWallpaper.title.replace(/\s+/g, '-').toLowerCase()}.avif`

      // Create temporary link for download
      const link = document.createElement('a')

      // Set the href and download attributes
      link.href = downloadUrl
      link.download = fileName

      // This is the key part: setting the download attribute forces the download
      link.setAttribute('download', fileName)

      // Set to open in new window to avoid navigation
      link.target = '_blank'

      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Alternative method using fetch for better reliability
      // Uncomment if the above doesn't work
      /*
      try {
        const response = await fetch(downloadUrl)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const blob = await response.blob()
        const blobUrl = window.URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        
        // Cleanup
        setTimeout(() => {
          document.body.removeChild(link)
          window.URL.revokeObjectURL(blobUrl)
        }, 100)
      } catch (fetchError) {
        console.error('Fetch download failed, using direct link:', fetchError)
        // Fallback to direct link method
        const fallbackLink = document.createElement('a')
        fallbackLink.href = downloadUrl
        fallbackLink.download = fileName
        document.body.appendChild(fallbackLink)
        fallbackLink.click()
        document.body.removeChild(fallbackLink)
      }
      */
    } catch (error) {
      console.error('Download failed:', error)

      // Fallback to simple anchor method
      try {
        const fallbackLink = document.createElement('a')
        fallbackLink.href = getDownloadUrl()
        fallbackLink.download = `${currentWallpaper.title.replace(/\s+/g, '-').toLowerCase()}.avif`
        document.body.appendChild(fallbackLink)
        fallbackLink.click()
        document.body.removeChild(fallbackLink)
      } catch (fallbackError) {
        console.error('Fallback download also failed:', fallbackError)

        // Last resort: open in new tab and let user save manually
        window.open(getDownloadUrl(), '_blank')
      }
    }
  }, [detectedSize, getDownloadUrl, currentWallpaper])

  const handleClose = useCallback(() => {
    // console.log('handleClose')
    // Use the store directly to avoid import issues
    setOpen(false)
    setActivity(-1)
  }, [setActivity])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return

      if (previewMode) {
        if (e.key === 'Escape' || e.key === ' ') {
          handleExitPreview()
        }
      } else {
        switch (e.key) {
          case 'ArrowLeft':
            handlePrevious()
            break
          case 'ArrowRight':
            handleNext()
            break
          case ' ':
            handlePreview()
            break
          case 'Escape':
            handleClose()
            break
          default:
            break
        }
      }
    },
    [
      open,
      previewMode,
      handleExitPreview,
      handlePrevious,
      handleNext,
      handlePreview,
      handleClose,
    ],
  )

  // Setup keyboard listeners
  useEffect(() => {
    if (!open) return

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  // if (loading && open) {
  //   return (
  //     <div
  //       id={name}
  //       className={
  //         'activity ' + 'activity-' + name + (open ? ' show' : ' hide')
  //       }>
  //       <div className='loading-screen'>
  //         <div className='loading-spinner'></div>
  //         <p>Detecting your device...</p>
  //       </div>
  //     </div>
  //   )
  // }

  // Fullscreen Preview Mode
  // if (previewMode && open) {
  //   return (
  //     <div
  //       id={name}
  //       className={'activity ' + 'activity-' + name + ' preview-mode'}>
  //       <button
  //         className='preview-close-btn'
  //         onClick={handleExitPreview}
  //         aria-label='Exit preview'>
  //         <CloseIcon />
  //       </button>

  //       <div className='preview-container'>
  //         {previewLoading && (
  //           <div className='preview-loading'>
  //             <div className='preview-spinner'></div>
  //             <p>Loading wallpaper...</p>
  //           </div>
  //         )}

  //         {previewError && (
  //           <div className='preview-error'>
  //             <p>Failed to load preview</p>
  //             <button onClick={handlePreview}>Retry</button>
  //           </div>
  //         )}

  //         <img
  //           ref={previewRef}
  //           src={getPreviewUrl()}
  //           alt={currentWallpaper.title}
  //           className={`preview-image ${imageLoaded ? 'loaded' : ''}`}
  //           onLoad={handlePreviewImageLoad}
  //           onError={handlePreviewImageError}
  //           loading='eager'
  //           style={{ display: imageLoaded && !previewError ? 'block' : 'none' }}
  //         />

  //         <div className='preview-overlay'>
  //           <div className='preview-info'>
  //             <h3>{currentWallpaper.title}</h3>
  //             <p>
  //               {detectedSize?.width} × {detectedSize?.height}
  //             </p>
  //           </div>
  //           <button className='preview-download-btn' onClick={handleDownload}>
  //             Download
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // Main Gallery Mode
  return (
    <div
      id={name}
      className={'activity ' + 'activity-' + name + (open ? ' show' : ' hide')}>
      <CloseBtn className='close-btn' onClick={handleClose} />

      <section className={name}>
        <header className='gallery-header'>
          <h1>Wallpapers</h1>
          <div className='instruction'>
            <div>Download for Free</div>
            <div className='counter'>
              {currentIndex + 1} / {wallpapers.length}
            </div>
          </div>
        </header>

        <div
          className='carousel-container'
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <button
            className={`nav-btn prev ${currentIndex === 0 ? 'disabled' : ''}`}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            aria-label='Previous wallpaper'
            onTouchStart={(e) => e.stopPropagation()} // NEW: Prevent touch event bubbling
            onTouchEnd={(e) => e.stopPropagation()} // NEW: Prevent touch event bubbling
          >
            <ChevronLeftIcon />
          </button>

          <div className='carousel-track'>
            <div
              className='carousel-slides'
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {wallpapers.map((wallpaper, index) => {
                const isLoaded = thumbnailsLoaded[wallpaper.id]
                const hasError = thumbnailsError[wallpaper.id]

                return (
                  <div
                    key={wallpaper.id}
                    className={`slide ${index === currentIndex ? 'active' : ''}`}>
                    <div className='wallpaper-card'>
                      <div className='image-container'>
                        {!hasError ? (
                          <img
                            ref={(el) =>
                              (thumbnailRefs.current[wallpaper.id] = el)
                            }
                            src={getThumbnailUrl(wallpaper.id)}
                            alt={wallpaper.title}
                            className={`wallpaper-thumbnail ${isLoaded ? 'loaded' : 'loading'}`}
                            loading={index <= 2 ? 'eager' : 'lazy'}
                            onLoad={() => handleThumbnailLoad(wallpaper.id)}
                            onError={() => handleThumbnailError(wallpaper.id)}
                            style={{ opacity: isLoaded ? 1 : 0 }}
                          />
                        ) : (
                          <div className='thumbnail-error'>
                            <p>Thumbnail not available</p>
                          </div>
                        )}

                        {!isLoaded && !hasError && (
                          <div className='thumbnail-loading'>
                            <div className='thumbnail-spinner'></div>
                          </div>
                        )}

                        <div className='wallpaper-overlay'>
                          <div className='wallpaper-meta'>
                            <h3>{wallpaper.title}</h3>
                            <p className='wallpaper-category'>
                              {wallpaper.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <button
            className={`nav-btn next ${currentIndex === wallpapers.length - 1 ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={currentIndex === wallpapers.length - 1}
            aria-label='Next wallpaper'
            onTouchStart={(e) => e.stopPropagation()} // NEW: Prevent touch event bubbling
            onTouchEnd={(e) => e.stopPropagation()} // NEW: Prevent touch event bubbling
          >
            <ChevronRightIcon />
          </button>
        </div>

        <div className='gallery-footer'>
          <div className='actions'>
            {/* <PreviewBtn
              onClick={handlePreview}
              disabled={!detectedSize}
              label='Preview'
            /> */}
            <DownloadForOfflineOutlinedIcon
              className='download-icon'
              onClick={handleDownload}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default WallpaperGallery
