import React, { useEffect, useRef, useState } from 'react'

const CurvedLineAnimation = ({
  duration = 500, // movement time (ms)
  pauseDuration = 2300, // pause at end (ms)
  startRadius = 2, // px
  startAfter = 1000, // ms
  endRadius = 10, // px
  lineHeight = 70, // px (vertical distance)
  lineWidth = 50, // px (horizontal distance, leftwards)
  curvature = 1.2, // 0 = straight line, 1 = sharp bend
  lineColor = 'yellow', // color of the tapered line
  dotColor = 'yellow', // color of the moving dot (match lineColor to hide edge)
  arrowEnabled = true, // show arrow
  arrowStartAngle = 20, // degrees (0 = up)
  arrowEndAngle = -95, // degrees (final rotation)
  arrowStartScale = 0.25, // arrow size multiplier at start (relative to ball radius)
  arrowEndScale = 0.9, // arrow size multiplier at end
  arrowColor = 'yellow', // arrow color
  viewBoxPadding = 30, // extra space around the path to avoid cropping
  numCircles = 10, // smoothness (higher = smoother)
}) => {
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const arrowGroupRef = useRef(null)
  const circlesGroupRef = useRef(null)
  const [totalLength, setTotalLength] = useState(0)
  const [circleData, setCircleData] = useState([])
  const animationRef = useRef(null)
  const startTimeRef = useRef(null)
  const [initialDelayDone, setInitialDelayDone] = useState(startAfter <= 0)

  // Handle initial delay
  useEffect(() => {
    if (startAfter <= 0) {
      setInitialDelayDone(true)
      return
    }
    const timer = setTimeout(() => {
      setInitialDelayDone(true)
    }, startAfter)
    return () => clearTimeout(timer)
  }, [startAfter])

  // Generate the hidden vector curve (cubic Bézier)
  const pathData = React.useMemo(() => {
    const startX = lineWidth
    const startY = lineHeight
    const endX = 0
    const endY = 0
    // Control points: first pulls up, second pulls left
    const cp1x = lineWidth
    const cp1y = lineHeight * (1 - curvature)
    const cp2x = lineWidth * (1 - curvature)
    const cp2y = 0
    return `M${startX},${startY} C${cp1x},${cp1y} ${cp2x},${cp2y} ${endX},${endY}`
  }, [lineHeight, lineWidth, curvature])

  // Precompute circle positions and radii along the curve
  useEffect(() => {
    if (!pathRef.current) return
    const length = pathRef.current.getTotalLength()
    setTotalLength(length)

    const data = []
    for (let i = 0; i < numCircles; i++) {
      const fraction = i / (numCircles - 1)
      const point = pathRef.current.getPointAtLength(fraction * length)
      // Exponential radius growth
      const radius = startRadius * Math.pow(endRadius / startRadius, fraction)
      data.push({ x: point.x, y: point.y, radius })
    }
    setCircleData(data)
  }, [pathData, startRadius, endRadius, numCircles])

  // Animation loop with initial delay and pause
  useEffect(() => {
    if (!initialDelayDone || !totalLength || circleData.length === 0) return

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }
      const elapsed = timestamp - startTimeRef.current
      let progress

      if (elapsed >= duration + pauseDuration) {
        // Restart cycle
        startTimeRef.current = timestamp
        progress = 0
      } else if (elapsed >= duration) {
        // Hold at end during pause
        progress = 1
      } else {
        progress = elapsed / duration
      }

      // Current point and radius on the curve
      const currentLength = progress * totalLength
      const currentPoint = pathRef.current.getPointAtLength(currentLength)
      const currentRadius = startRadius * Math.pow(endRadius / startRadius, progress)

      // Update moving dot
      if (dotRef.current) {
        dotRef.current.setAttribute('cx', currentPoint.x)
        dotRef.current.setAttribute('cy', currentPoint.y)
        dotRef.current.setAttribute('r', currentRadius)
      }

      // Update arrow (if enabled)
      if (arrowEnabled && arrowGroupRef.current) {
        const currentAngle = arrowStartAngle + progress * (arrowEndAngle - arrowStartAngle)
        const currentArrowScale = arrowStartScale + progress * (arrowEndScale - arrowStartScale)
        // Scale arrow by ball radius * arrow scale factor
        const scale = currentRadius * currentArrowScale
        const transform = `translate(${currentPoint.x}, ${currentPoint.y}) rotate(${currentAngle}) scale(${scale})`
        arrowGroupRef.current.setAttribute('transform', transform)
      }

      // Reveal circles up to current progress (creating the tapered line)
      if (circlesGroupRef.current) {
        const circles = circlesGroupRef.current.children
        for (let i = 0; i < circles.length; i++) {
          const circleFraction = i / (circles.length - 1)
          circles[i].style.opacity = circleFraction <= progress ? Math.max(0.3, circleFraction) : 0
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationRef.current)
  }, [
    initialDelayDone,
    totalLength,
    circleData,
    duration,
    pauseDuration,
    startRadius,
    endRadius,
    arrowEnabled,
    arrowStartAngle,
    arrowEndAngle,
    arrowStartScale,
    arrowEndScale,
  ])

  // Dynamically compute viewBox to avoid cropping the arrow
  const viewBox = React.useMemo(() => {
    const maxRadiusScaled = endRadius * Math.max(arrowStartScale, arrowEndScale)
    const arrowHeight = maxRadiusScaled * 4 // arrow polygon height is 4 units at scale=1
    const minX = Math.min(0, lineWidth) - arrowHeight - viewBoxPadding
    const minY = Math.min(0, lineHeight) - arrowHeight - viewBoxPadding
    const maxX = Math.max(0, lineWidth) + arrowHeight + viewBoxPadding
    const maxY = Math.max(0, lineHeight) + arrowHeight + viewBoxPadding
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
  }, [lineWidth, lineHeight, endRadius, arrowStartScale, arrowEndScale, viewBoxPadding])

  return (
    <svg width='200' height='150' viewBox={viewBox}>
      {/* Hidden path used for measurements */}
      <path ref={pathRef} d={pathData} fill='none' stroke='none' />

      {/* Tapered line composed of many circles */}
      <g ref={circlesGroupRef}>
        {circleData.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.radius} fill={lineColor} opacity='0' />
        ))}
      </g>

      {/* Moving dot */}
      <circle ref={dotRef} cx={lineWidth} cy={lineHeight} r={startRadius} fill={dotColor} />

      {/* Arrowhead that moves with the dot */}
      {arrowEnabled && (
        <g
          ref={arrowGroupRef}
          transform={`translate(${lineWidth}, ${lineHeight}) rotate(0) scale(${startRadius * arrowStartScale})`}>
          <polygon points='0,-3 -2,1 2,1' fill={arrowColor} />
        </g>
      )}
    </svg>
  )
}

export default CurvedLineAnimation
