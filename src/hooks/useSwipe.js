import { useState, useRef, useEffect } from 'react'

export const useSwipe = () => {
  const containerRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  useEffect(() => {
    const handleMouseDown = (e) => {
      setIsDragging(true)
      setStartX(e.pageX - containerRef.current.offsetLeft)
      setScrollLeft(containerRef.current.scrollLeft)
    }
    const handleMouseLeave = () => {
      setIsDragging(false)
    }
    const handleMouseUp = () => {
      setIsDragging(false)
    }
    const handleMouseMove = (e) => {
      if (!isDragging) return
      const x = e.pageX - containerRef.current.offsetLeft
      const walk = (x - startX) * 2 // Scroll-fast
      containerRef.current.scrollLeft = scrollLeft - walk
    }
    const container = containerRef.current
    container.addEventListener('mousedown', handleMouseDown)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('mouseup', handleMouseUp)
    container.addEventListener('mousemove', handleMouseMove)
    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('mouseup', handleMouseUp)
      container.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, startX, scrollLeft])
  return containerRef
}
