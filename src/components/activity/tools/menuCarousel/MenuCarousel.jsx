import { useRef, useEffect, useLayoutEffect, useCallback, useMemo } from 'react'
import Skeleton from '@mui/material/Skeleton'
import HandymanIcon from '@mui/icons-material/Handyman'
import PropTypes from 'prop-types'
import './MenuCarousel.scss'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'

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
  const isActive = useRef(false)
  // Ref indirection: the RAF loop and `start` always call the latest
  // version of the effect calculator, without needing to memoize it.
  const calculateEffectsRef = useRef(null)

  const calculateEffects = () => {
    if (!isActive.current) return

    const container = scrollContainer?.current || window
    const viewportHeight = container === window ? window.innerHeight : container.clientHeight

    itemsRef.current.forEach((item) => {
      if (!item?.element || !item.isCarouselItem) return

      const rect = item.element.getBoundingClientRect()

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

      const fadeBoundaryPixels = viewportHeight * config.fadeBoundary
      const centerZonePixels = viewportHeight * config.centerZoneHeight
      const centerZoneTop = viewportCenter - centerZonePixels / 2
      const centerZoneBottom = viewportCenter + centerZonePixels / 2

      let opacity = 1
      let scale = 1

      if (elementCenter < centerZoneTop || elementCenter > centerZoneBottom) {
        let distance
        if (elementCenter < centerZoneTop) {
          distance = (centerZoneTop - elementCenter) / fadeBoundaryPixels
        } else {
          distance = (elementCenter - centerZoneBottom) / fadeBoundaryPixels
        }
        const progress = Math.min(1, Math.max(0, distance))
        const exponentialProgress = progress * progress
        opacity = 1 - (1 - config.minOpacity) * exponentialProgress
        scale = 1 - (1 - config.minScale) * exponentialProgress
      }

      item.element.style.opacity = opacity
      item.element.style.transform = `scale(${scale})`
    })

    rafId.current = requestAnimationFrame(() => calculateEffectsRef.current?.())
  }

  // Keep the ref pointing at the latest calculator. Runs before the mount
  // effect below (declaration order), so `start()` never sees a null ref.
  useEffect(() => {
    calculateEffectsRef.current = calculateEffects
  })

  const start = useCallback(() => {
    if (isActive.current) return
    isActive.current = true
    rafId.current = requestAnimationFrame(() => calculateEffectsRef.current?.())
  }, [])

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
const CarouselListItem = ({ children, index, registerItem, unregisterItem, style = {} }) => {
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
      data-index={index}
      className={'list-item carousel-item-wrapper'}
      style={{
        width: '100%',
        transition: 'opacity 0.2s, transform 0.2s',
        transformOrigin: 'center center',
        ...style,
      }}>
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

const CUSTOM_CONFIG = {
  minOpacity: 0.35,
  minScale: 0.35,
  fadeBoundary: 0.35,
  centerZoneHeight: 0.025,
  transitionSpeed: '0.25s',
}

// Main carousel component
const MenuCarousel = ({ data, filterIDs, showFavourites, handleClick, description }) => {
  const scrollContainerRef = useRef(null)
  const initialScrollDoneRef = useRef(false)

  const { start, stop, registerItem, unregisterItem } = useScrollEffects(CUSTOM_CONFIG, scrollContainerRef)

  // Control scroll listener
  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  // Position the carousel on load:
  //  - If an item is already selected, center that item.
  //  - Otherwise, center the midpoint of the carousel as a whole.
  // useLayoutEffect so the scroll happens before first paint (no visible jump).
  // We measure item offsets directly from the DOM via querySelectorAll, which
  // avoids needing mutable ref containers shared across components.
  useLayoutEffect(() => {
    if (initialScrollDoneRef.current) return
    if (!data || data.length === 0) return

    const container = scrollContainerRef.current
    if (!container) return

    const containerHeight = container.clientHeight
    if (containerHeight === 0) return

    const wrappers = container.querySelectorAll('.carousel-item-wrapper')
    if (wrappers.length === 0) return

    // Find the selected item, if any.
    let targetEl = null
    if (filterIDs && filterIDs.size > 0) {
      const selectedIndex = data.findIndex((item) => item && filterIDs.has(item.id))
      if (selectedIndex >= 0) {
        targetEl = Array.from(wrappers).find((el) => Number(el.getAttribute('data-index')) === selectedIndex) || null
      }
    }

    if (targetEl) {
      const targetTop = targetEl.offsetTop
      const targetHeight = targetEl.offsetHeight
      container.scrollTop = targetTop - (containerHeight - targetHeight) / 2
    } else {
      const firstEl = wrappers[0]
      const lastEl = wrappers[wrappers.length - 1]
      const carouselTop = firstEl.offsetTop
      const carouselBottom = lastEl.offsetTop + lastEl.offsetHeight
      const carouselCenter = (carouselTop + carouselBottom) / 2
      container.scrollTop = carouselCenter - containerHeight / 2
    }

    initialScrollDoneRef.current = true
  }, [data, filterIDs])

  const carouselItems = useMemo(() => {
    return data.map((item, index) => {
      const isSelected = filterIDs.has(item.id)

      if (!item) {
        return <Skeleton key={`skeleton-${index}`} variant='rounded' width='100%' height={200} animation='wave' />
      }

      return (
        <CarouselListItem
          key={`carousel-item-${item.id ?? index}`}
          index={index}
          registerItem={registerItem}
          unregisterItem={unregisterItem}
          style={{ marginBottom: '4px' }}>
          <div className={'carousel-item' + (isSelected ? ' selected' : '')} onClick={handleClick(item.id)}>
            <div className='AccordionItem inner item' style={{ cursor: 'pointer' }}>
              <div className='title' aria-controls={`Accronym-${index}-content`} id={`panel${item?.id}-header`}>
                {showFavourites && <HandymanIcon className={'icon' + (isSelected ? ' active' : '')} />}

                <div className={'letters-cont' + (item.title.length > 12 ? ' long' : '')}>
                  {item.title.split('.').map(
                    (subItem, i) =>
                      subItem && (
                        <div key={i} className='letter' data-content={subItem}>
                          {parse(DOMPurify.sanitize(subItem))}
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
  }, [data, filterIDs, showFavourites, handleClick, registerItem, unregisterItem])

  return (
    <div
      className='AccordionRoot'
      ref={scrollContainerRef}
      style={{
        height: '100%',
        overflowY: 'auto',
        position: 'relative',
        WebkitOverflowScrolling: 'touch',
      }}>
      {/* Top padding: 50vh so any single item (including the first) can be centered */}
      <div style={{ paddingTop: '50vh' }} />

      <div className='accronym-menu'>{carouselItems}</div>

      {description && (
        <DescriptionItem index={data.length} registerItem={registerItem} unregisterItem={unregisterItem}>
          <div className='content'>{description}</div>
        </DescriptionItem>
      )}

      {/* Bottom padding: 50vh so any single item (including the last) can be centered */}
      <div style={{ paddingBottom: '50vh' }} />
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
