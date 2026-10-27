import { useRef, useEffect, useLayoutEffect, useCallback, useMemo } from "react"
import Skeleton from "@mui/material/Skeleton"
// import HandymanIcon from "@mui/icons-material/Handyman"
import IconHandyman from "@icons/IconHandyman"
import PropTypes from "prop-types"
import parse from "html-react-parser"
import DOMPurify from "dompurify"
import useAppStore from "@store/useAppStore"
import "./MenuCarousel.scss"

// Default configuration
const DEFAULT_CONFIG = {
  minOpacity: 0.2,
  minScale: 0.5,
  fadeBoundary: 0.2,
  centerZoneHeight: 0.4,
  transitionSpeed: "0.2s",
}

// Custom hook for scroll effects
const useScrollEffects = (config = DEFAULT_CONFIG, scrollContainer = null) => {
  const itemsRef = useRef([])
  const rafId = useRef(null)
  const isActive = useRef(false)

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
      className={"list-item carousel-item-wrapper"}
      style={{
        width: "100%",
        transition: "opacity 0.2s, transform 0.2s",
        transformOrigin: "center center",
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
  minOpacity: 0.15,
  minScale: 0.3,
  fadeBoundary: 0.35,
  centerZoneHeight: 0.015,
  transitionSpeed: "0.3s",
}

// Main carousel component
const MenuCarousel = ({ data, filterIDs, showFavourites, handleClick, description, filterTools }) => {
  const scrollContainerRef = useRef(null)
  const initialScrollDoneRef = useRef(false)
  const prevFilterToolsRef = useRef(filterTools)
  const filterToolsRef = useRef(filterTools)
  const hasScrolledUnfilteredRef = useRef(false)
  const unfilteredPosRef = useRef(null)
  const isProgrammaticScrollRef = useRef(false)

  const menuCarouselPosition = useAppStore((s) => s.menuCarouselPosition)
  const setMenuCarouselPosition = useAppStore((s) => s.setMenuCarouselPosition)

  const setMenuCarouselPositionRef = useRef(setMenuCarouselPosition)
  useEffect(() => {
    setMenuCarouselPositionRef.current = setMenuCarouselPosition
  }, [setMenuCarouselPosition])

  useEffect(() => {
    filterToolsRef.current = filterTools
  }, [filterTools])

  const { start, stop, registerItem, unregisterItem } = useScrollEffects(CUSTOM_CONFIG, scrollContainerRef)

  // Control scroll listener
  useEffect(() => {
    start()
    return () => stop()
  }, [start, stop])

  // Track and persist scroll position to store
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) {
        isProgrammaticScrollRef.current = false
        return
      }

      const top = container.scrollTop

      if (!filterToolsRef.current) {
        hasScrolledUnfilteredRef.current = true
        unfilteredPosRef.current = top
      }

      if (initialScrollDoneRef.current) {
        setMenuCarouselPositionRef.current(top)
      }
    }

    const onUserInteraction = () => {
      if (!filterToolsRef.current) {
        hasScrolledUnfilteredRef.current = true
      }
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    container.addEventListener("wheel", onUserInteraction, { passive: true })
    container.addEventListener("touchmove", onUserInteraction, { passive: true })

    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("wheel", onUserInteraction)
      container.removeEventListener("touchmove", onUserInteraction)
    }
  }, [])

  // Position the carousel:
  //  1. BadgeToolbox toggled so filterTools transitions to true -> center carousel midpoint.
  //  2. BadgeToolbox toggled so filterTools transitions to false -> center if user hasn't scrolled, else restore unfiltered position.
  //  3. Re-render while mounted -> retain scroll position.
  //  4. Fresh mount with a saved position (returning from AcronymExplained) -> restore.
  //  5. Fresh mount without a saved position (first visit) -> vertically center carousel midpoint.
  useLayoutEffect(() => {
    if (!data || data.length === 0) return

    const container = scrollContainerRef.current
    if (!container || container.clientHeight === 0) return

    const wrappers = container.querySelectorAll(".carousel-item-wrapper")
    if (wrappers.length === 0) return

    const filterToolsChanged = prevFilterToolsRef.current !== filterTools
    const filterToolsBecameTrue = !prevFilterToolsRef.current && filterTools
    const filterToolsBecameFalse = prevFilterToolsRef.current && !filterTools
    prevFilterToolsRef.current = filterTools

    const centerCarousel = () => {
      const firstEl = wrappers[0]
      const lastEl = wrappers[wrappers.length - 1]
      const carouselTop = firstEl.offsetTop
      const carouselBottom = lastEl.offsetTop + lastEl.offsetHeight
      const carouselCenter = (carouselTop + carouselBottom) / 2
      const targetScroll = carouselCenter - container.clientHeight / 2

      isProgrammaticScrollRef.current = true
      container.scrollTop = targetScroll
      setMenuCarouselPositionRef.current(targetScroll)
      if (!filterTools) {
        unfilteredPosRef.current = targetScroll
      }
    }

    // 1. BadgeToolbox toggled while mounted:
    if (initialScrollDoneRef.current && filterToolsChanged) {
      if (filterToolsBecameTrue) {
        centerCarousel()
        return
      }
      if (filterToolsBecameFalse) {
        if (!hasScrolledUnfilteredRef.current) {
          centerCarousel()
        } else if (unfilteredPosRef.current !== null) {
          container.scrollTop = unfilteredPosRef.current
          setMenuCarouselPositionRef.current(unfilteredPosRef.current)
        }
        return
      }
    }

    // 2. Re-rendering while mounted without filterTools change: retain position
    if (initialScrollDoneRef.current) {
      if (menuCarouselPosition !== null) {
        container.scrollTop = menuCarouselPosition
      }
      return
    }

    // 3. Fresh mount after AcronymExplained -> restore previous scroll position
    if (menuCarouselPosition !== null) {
      container.scrollTop = menuCarouselPosition
      if (!filterTools) {
        unfilteredPosRef.current = menuCarouselPosition
        hasScrolledUnfilteredRef.current = true
      }
      initialScrollDoneRef.current = true
      return
    }

    // 4. Initial mount (fresh visit): center the carousel midpoint
    centerCarousel()
    initialScrollDoneRef.current = true
  }, [data, menuCarouselPosition, filterTools])

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
          style={{ marginBottom: "4px" }}>
          <div className={"carousel-item" + (isSelected ? " selected" : "")} onClick={handleClick(item.id)}>
            <div className='AccordionItem inner item' style={{ cursor: "pointer" }}>
              <div className='title' aria-controls={`Accronym-${index}-content`} id={`panel${item?.id}-header`}>
                {showFavourites && <IconHandyman className={"icon" + (isSelected ? " active" : "")} />}

                <div className={"letters-cont" + (item.title.length > 12 ? " long" : "")}>
                  {item.title.split(".").map(
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
        height: "100%",
        overflowY: "auto",
        position: "relative",
        WebkitOverflowScrolling: "touch",
      }}>
      <div style={{ paddingTop: "50vh" }} />

      <div className='accronym-menu'>{carouselItems}</div>

      {description && (
        <DescriptionItem index={data.length} registerItem={registerItem} unregisterItem={unregisterItem}>
          <div className='content'>{description}</div>
        </DescriptionItem>
      )}

      <div style={{ paddingBottom: "50vh" }} />
    </div>
  )
}

MenuCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  filterIDs: PropTypes.object.isRequired,
  showFavourites: PropTypes.bool,
  handleClick: PropTypes.func,
  description: PropTypes.node,
  filterTools: PropTypes.bool,
}

export default MenuCarousel
