import React from 'react'
import { useRef, useEffect, useCallback, useMemo, useState } from 'react'
import Skeleton from '@mui/material/Skeleton'
import HandymanIcon from '@mui/icons-material/Handyman'
import PropTypes from 'prop-types'
import './MenuCarousel.scss'
import parse from 'html-react-parser'

// Default configuration
const DEFAULT_CONFIG = {
  minOpacity: 0.2,
  minScale: 0.5,
  fadeBoundary: 0.2,
  centerZoneHeight: 0.4,
  transitionSpeed: '0.2s',
}

// Custom hook for scroll effects
const useScrollEffects = (config = DEFAULT_CONFIG, scrollContainer = null) => {
  const itemsRef = useRef([])
  const rafId = useRef(null)
  const isActive = useRef(true)

  const calculateEffects = useCallback(() => {
    if (!isActive.current) return

    // Use provided container or window
    const container = scrollContainer?.current || window
    const viewportHeight =
      container === window ? window.innerHeight : container.clientHeight

    itemsRef.current.forEach((item) => {
      if (!item?.element || !item.isCarouselItem) return

      const rect = item.element.getBoundingClientRect()

      // Get element position relative to container
      let elementTop, elementHeight
      if (container === window) {
        elementTop = rect.top
        elementHeight = rect.height
      } else {
        const containerRect = container.getBoundingClientRect()
        elementTop = rect.top - containerRect.top
        elementHeight = rect.height
      }

      const elementCenter = elementTop + elementHeight / 2
      const viewportCenter = viewportHeight / 2

      // Calculate boundaries
      const fadeBoundaryPixels = viewportHeight * config.fadeBoundary
      const centerZonePixels = viewportHeight * config.centerZoneHeight
      const centerZoneTop = viewportCenter - centerZonePixels / 2
      const centerZoneBottom = viewportCenter + centerZonePixels / 2

      let opacity = 1
      let scale = 1

      // Check if element is outside center zone
      if (elementCenter < centerZoneTop || elementCenter > centerZoneBottom) {
        let distance = 0

        if (elementCenter < centerZoneTop) {
          distance = (centerZoneTop - elementCenter) / fadeBoundaryPixels
        } else {
          distance = (elementCenter - centerZoneBottom) / fadeBoundaryPixels
        }

        // Exponential falloff
        const progress = Math.min(1, Math.max(0, distance))
        const exponentialProgress = progress * progress

        opacity = 1 - (1 - config.minOpacity) * exponentialProgress
        scale = 1 - (1 - config.minScale) * exponentialProgress
      }

      // Apply styles with transition
      item.element.style.opacity = opacity
      item.element.style.transform = `scale(${scale})`
    })

    rafId.current = requestAnimationFrame(calculateEffects)
  }, [config, scrollContainer])

  const start = useCallback(() => {
    if (isActive.current) return
    isActive.current = true
    rafId.current = requestAnimationFrame(calculateEffects)
  }, [calculateEffects])

  const stop = useCallback(() => {
    isActive.current = false
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
  }, [])

  const registerItem = useCallback((index, element, isCarouselItem = true) => {
    itemsRef.current[index] = { element, isCarouselItem }
  }, [])

  const unregisterItem = useCallback((index) => {
    itemsRef.current[index] = null
  }, [])

  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  return {
    start,
    stop,
    registerItem,
    unregisterItem,
  }
}

// Individual list item component for carousel items
const CarouselListItem = ({
  children,
  index,
  registerItem,
  unregisterItem,
  style = {},
}) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      registerItem(index, elementRef.current, true)
    }

    return () => unregisterItem(index)
  }, [index, registerItem, unregisterItem])

  return (
    <div
      ref={elementRef}
      className={'list-item carousel-item-wrapper'}
      style={{
        width: '100%',
        transition: 'opacity 0.2s, transform 0.2s',
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

CarouselListItem.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  registerItem: PropTypes.func.isRequired,
  unregisterItem: PropTypes.func.isRequired,
  style: PropTypes.object,
}

// Description component (no scroll effects applied)
const DescriptionItem = ({ children, registerItem, unregisterItem, index }) => {
  const elementRef = useRef(null)

  useEffect(() => {
    if (elementRef.current) {
      registerItem(index, elementRef.current, false)
    }

    return () => unregisterItem(index)
  }, [index, registerItem, unregisterItem])

  return (
    <div ref={elementRef} className='description-container'>
      {children}
    </div>
  )
}

DescriptionItem.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  registerItem: PropTypes.func.isRequired,
  unregisterItem: PropTypes.func.isRequired,
}

// Main carousel component
const MenuCarousel = ({
  data,
  filterIDs,
  showFavourites,
  handleClick,
  description,
}) => {
  const [open, setOpen] = useState(false)
  const scrollContainerRef = useRef(null)

  const customConfig = {
    minOpacity: 0.35,
    minScale: 0.35,
    fadeBoundary: 0.35,
    centerZoneHeight: 0.025,
    transitionSpeed: '0.25s',
  }

  const { start, stop, registerItem, unregisterItem } = useScrollEffects(
    customConfig,
    scrollContainerRef,
  )

  // Control scroll listener
  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  const carouselItems = useMemo(() => {
    return data.map((item, index) => {
      const isSelected = filterIDs.has(item.id)

      if (!item) {
        return (
          <Skeleton
            key={`skeleton-${index}`}
            variant='rounded'
            width='100%'
            height={200}
            animation='wave'
          />
        )
      }

      return (
        <CarouselListItem
          key={`carousel-item-${item.id ?? index}`}
          index={index}
          registerItem={registerItem}
          unregisterItem={unregisterItem}
          style={{ marginBottom: '4px' }}
        >
          <div
            className={'carousel-item' + (isSelected ? ' selected' : '')}
            onClick={handleClick(item.id)}
          >
            <div
              className='AccordionItem inner item'
              style={{ cursor: 'pointer' }}
            >
              <div
                className='title'
                aria-controls={`Accronym-${index}-content`}
                id={`panel${item?.id}-header`}
              >
                {showFavourites && (
                  <HandymanIcon
                    className={'icon' + (isSelected ? ' active' : '')}
                  />
                )}

                <div className='letters-cont'>
                  {item.title.split('.').map(
                    (subItem, i) =>
                      subItem && (
                        <div key={i} className='letter' data-content={subItem}>
                          {parse(subItem)}
                        </div>
                      ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </CarouselListItem>
      )
    })
  }, [
    data,
    filterIDs,
    showFavourites,
    handleClick,
    registerItem,
    unregisterItem,
  ])

  return (
    <div
      className={'AccordionRoot' + (open ? ' expanded' : '')}
      ref={scrollContainerRef}
      style={{
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {/* Top padding to center first items */}
      <div style={{ paddingTop: '40vh' }} />

      <div className='accronym-menu'>{carouselItems}</div>

      {/* Add description at the bottom with its own padding */}
      {description && (
        <DescriptionItem
          index={data.length} // Use data length as index to avoid conflicts
          registerItem={registerItem}
          unregisterItem={unregisterItem}
        >
          <div className='content'>{description}</div>
        </DescriptionItem>
      )}

      {/* Bottom padding for scrolling space */}
      <div style={{ paddingBottom: '20vh' }} />
    </div>
  )
}

MenuCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  filterIDs: PropTypes.object.isRequired,
  showFavourites: PropTypes.bool,
  handleClick: PropTypes.func,
  description: PropTypes.node,
}

export default MenuCarousel
