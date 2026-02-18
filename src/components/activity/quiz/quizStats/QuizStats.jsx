import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import useQuizStore from '../useQuizStore'
import '../styles.scss'


const SimpleLineGraph = ({ data, visibleLevels, zoom }) => {
  const scrollRef = React.useRef(null)
  const [intersectY, setIntersectY] = React.useState(null)
  const [viewportWidth, setViewportWidth] = React.useState(0)

  if (!data || data.length < 2) {
    return (
      <div className='empty-graph'>
        <p>Play more quizzes to see your progress graph!</p>
      </div>
    )
  }

  const chartHeight = 160
  const paddingTop = 5
  const paddingBottom = 20
  const scaleWidth = 30
  const baseSpacing = 25
  const pointSpacing = baseSpacing * zoom
  const graphWidth = Math.max(300, data.length * pointSpacing)
  const maxY = 100

  // All points mapped to global X coordinates
  const allPts = data.map((point, index) => ({
    x: index * pointSpacing,
    y: chartHeight - (point.accuracy / maxY) * (chartHeight - paddingTop - paddingBottom) - paddingBottom,
    accuracy: point.accuracy,
    level: point.level
  }))

  const getPath = (points) => {
    if (points.length < 2) return ''
    const d = points.reduce((acc, point, i, a) => {
      if (i === 0) return `M ${point.x},${point.y}`
      const prev = a[i - 1]
      const cp1x = prev.x + (point.x - prev.x) / 2
      const cp1y = prev.y
      const cp2x = prev.x + (point.x - prev.x) / 2
      const cp2y = point.y
      return `${acc} C ${cp1x},${cp1y} ${cp2x},${cp2y} ${point.x},${point.y}`
    }, '')
    return d
  }

  // SMA calculation for overall trend line
  const smaPeriod = 5
  const smaPts = allPts.map((pt, i, a) => {
    if (i < smaPeriod - 1) return null
    const periodSlice = a.slice(i - (smaPeriod - 1), i + 1)
    const avgY = periodSlice.reduce((sum, p) => sum + p.y, 0) / smaPeriod
    return { x: pt.x, y: avgY }
  }).filter(p => p !== null)

  // Track viewport intersection
  React.useEffect(() => {
    const updateIntersect = () => {
      if (!scrollRef.current || !visibleLevels.average || smaPts.length < 2) {
        setIntersectY(null)
        return
      }

      const { scrollLeft, clientWidth } = scrollRef.current
      setViewportWidth(clientWidth)
      const viewportRightX = scrollLeft + clientWidth

      // Find the segment of smaPts that viewportRightX is in
      const nextIdx = smaPts.findIndex(p => p.x >= viewportRightX)
      
      if (nextIdx === -1) {
        // Beyond last point, use last point's Y
        setIntersectY(smaPts[smaPts.length - 1].y)
      } else if (nextIdx === 0) {
        // Before first point, use first point's Y
        setIntersectY(smaPts[0].y)
      } else {
        // Interpolate between prev and next
        const prev = smaPts[nextIdx - 1]
        const next = smaPts[nextIdx]
        const t = (viewportRightX - prev.x) / (next.x - prev.x)
        const y = prev.y + t * (next.y - prev.y)
        setIntersectY(y)
      }
    }

    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', updateIntersect)
      // Initial update
      updateIntersect()
      
      // Also update on zoom or visibility change
      const observer = new ResizeObserver(updateIntersect)
      observer.observe(container)
      
      return () => {
        container.removeEventListener('scroll', updateIntersect)
        observer.disconnect()
      }
    }
  }, [smaPts, visibleLevels.average, zoom])

  const yTicks = [0, 25, 50, 75, 100]

  return (
    <div className='graph-scroll-wrapper'>
      <div className='graph-scale-sticky'>
        <svg width={scaleWidth} height={chartHeight}>
          {yTicks.map((tick) => {
            const y = chartHeight - (tick / maxY) * (chartHeight - paddingTop - paddingBottom) - paddingBottom
            return (
              <text
                key={tick}
                x={0}
                y={y + 4}
                textAnchor='start'
                fill='rgba(255,255,255,0.4)'
                fontSize='10px'
              >
                {tick}%
              </text>
            )
          })}
        </svg>
      </div>

      <div className='graph-content-scroll' ref={scrollRef}>
        <svg width={graphWidth} height={chartHeight} className='stats-graph-inner'>
          <defs>
            <linearGradient id='graphGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='#1565c0' /> {/* Dark Blue at 100% (top) */}
              <stop offset='33%' stopColor='#ffd600' />
              <stop offset='66%' stopColor='#ff6d00' />
              <stop offset='100%' stopColor='#d50000' /> {/* Red at 0% (bottom) */}
            </linearGradient>
            <linearGradient id='barGradient' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='0%' stopColor='rgba(21, 101, 192, 0.2)' />
              <stop offset='33%' stopColor='rgba(255, 214, 0, 0.1)' />
              <stop offset='66%' stopColor='rgba(255, 109, 0, 0.05)' />
              <stop offset='100%' stopColor='rgba(213, 0, 0, 0.03)' />
            </linearGradient>
          </defs>

          {/* Grid Lines */}
          {yTicks.map((tick) => {
            const y = chartHeight - (tick / maxY) * (chartHeight - paddingTop - paddingBottom) - paddingBottom
            return (
              <line
                key={tick}
                x1='0' y1={y} x2={graphWidth} y2={y}
                stroke={tick === 100 ? 'rgba(79, 195, 247, 0.3)' : 'rgba(255,255,255,0.05)'}
                strokeWidth={tick === 100 ? '1.5' : '1'}
              />
            )
          })}

          {/* Vertical Bars */}
          {allPts.map((pt, index) => (
            <rect
              key={`bar-${index}`}
              x={pt.x - 4}
              y={pt.y}
              width='8'
              height={chartHeight - pt.y - paddingBottom}
              fill='url(#barGradient)'
              rx='2'
            />
          ))}

          {/* Level Tracks (Active Levels Only) */}
          {Object.entries(visibleLevels).map(([level, isVisible]) => {
            if (!isVisible || level === 'average') return null
            const levelPts = allPts.filter((p) => p.level === level)
            if (levelPts.length < 2) return null
            
            const color =
              level === 'easy'
                ? '#00fbff' // Cyan
                : level === 'medium'
                ? '#ffea00' // Amber
                : '#2979ff' // Vibrant Blue

            return (
              <path
                key={`track-${level}`}
                d={getPath(levelPts)}
                fill='none'
                stroke={color}
                strokeWidth='3.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                opacity='0.8'
              />
            )
          })}

          {/* Overall SMA Trend Line */}
          {visibleLevels.average && smaPts.length > 1 && (
            <path
              d={getPath(smaPts)}
              fill='none'
              stroke='rgba(255, 255, 255, 0.5)'
              strokeWidth='2.5'
              strokeDasharray='4,3'
            />
          )}

          {/* Main Result Line and Dots */}
          {visibleLevels.average && (
            <>
              <path
                d={getPath(allPts)}
                fill='none'
                stroke='url(#graphGradient)'
                strokeWidth='3.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
              {allPts.map((pt, index) => (
                <circle key={index} cx={pt.x} cy={pt.y} r='3' fill='white' opacity='0.9' />
              ))}
            </>
          )}
        </svg>
      </div>

      {/* Viewport SMA Tracker Overlay */}
      {visibleLevels.average && intersectY !== null && (
        <div className='graph-avg-tracker-overlay'>
          <svg width='100%' height={chartHeight}>
            {/* Main Blue Reference Line (Solid, Thin) */}
            <line 
              x1={0} 
              y1={intersectY} 
              x2={scaleWidth + viewportWidth} 
              y2={intersectY} 
              stroke='#4fc3f7' 
              strokeWidth='1'
              opacity='0.5'
            />
            
            {/* Right Value & Label (beyond the graph edge) */}
            {(() => {
              const accuracy = Math.round(((chartHeight - paddingBottom - intersectY) / (chartHeight - paddingTop - paddingBottom)) * 100)
              const labelX = scaleWidth + viewportWidth + 8 // 8px gap from graph edge
              return (
                <g transform={`translate(${labelX}, ${intersectY})`}>
                  <text 
                    x='0' 
                    y='4' 
                    fill='#4fc3f7' 
                    fontSize='10px' 
                    fontWeight='bold'
                    style={{ textShadow: '0 0 2px rgba(0,0,0,0.5)' }}
                  >
                    {accuracy}%
                  </text>
                  <text 
                    x='0' 
                    y='14' 
                    fill='rgba(255,255,255,0.5)' 
                    fontSize='12px' 
                    textAnchor='start'
                    textTransform='uppercase'
                    letterSpacing='0.05em'
                  >
                    avg
                  </text>
                </g>
              )
            })()}
          </svg>
        </div>
      )}
    </div>
  )
}

const QuizStats = ({ onBack }) => {
  const history = useQuizStore((state) => state.history) || []
  const [zoom, setZoom] = React.useState(1)
  const [visibleLevels, setVisibleLevels] = React.useState({
    average: true,
    easy: false,
    medium: false,
    hard: false
  })

  const stats = useMemo(() => {
    const totalQuizzes = history.length
    const totalQuestions = history.reduce((acc, curr) => acc + curr.total, 0)
    const totalCorrect = history.reduce((acc, curr) => acc + curr.score, 0)
    const overallAccuracy =
      totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0

    const byLevel = history.reduce((acc, curr) => {
      if (!acc[curr.level]) {
        acc[curr.level] = { count: 0, correct: 0, total: 0 }
      }
      acc[curr.level].count += 1
      acc[curr.level].correct += curr.score
      acc[curr.level].total += curr.total
      return acc
    }, {})

    return { totalQuizzes, totalQuestions, overallAccuracy, byLevel }
  }, [history])

  const toggleLevel = (level) => {
    setVisibleLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }))
  }

  return (
    <div className='quiz-stats'>
      <div className='stats-header'>
        <button className='back-btn' onClick={onBack}>
          Back
        </button>
        <h2>Your Progress</h2>
      </div>

      <div className='stats-row-container'>
        <div className='progress-header'>
          <div className='question-stat'>
            <div className='question-stat-label'>Quizzes</div>
            <div>{stats.totalQuizzes}</div>
          </div>
          <div className='question-stat'>
            <div className='question-stat-label'>Accuracy</div>
            <div>{stats.overallAccuracy}%</div>
          </div>
          <div className='question-stat'>
            <div className='question-stat-label'>Questions</div>
            <div>{stats.totalQuestions}</div>
          </div>
        </div>
      </div>

      <div className='stats-section graph-section'>
        <div className='section-header-row'>
          <h3>Results Over Time</h3>
          <div className='zoom-controls'>
            <button 
              className='zoom-btn' 
              onClick={() => setZoom(prev => Math.max(0.4, prev - 0.2))}
              aria-label='Zoom Out'
            >
              –
            </button>
            <span className='zoom-level'>{Math.round(zoom * 100)}%</span>
            <button 
              className='zoom-btn' 
              onClick={() => setZoom(prev => Math.min(3, prev + 0.2))}
              aria-label='Zoom In'
            >
              +
            </button>
          </div>
        </div>
        <SimpleLineGraph 
          data={history} 
          visibleLevels={visibleLevels}
          zoom={zoom}
        />
      </div>

      <div className='stats-section level-section'>
        <div className='section-header-row'>
          <h3>Level Breakdown</h3>
          <div className='avg-toggle-row'>
            <span className='avg-label'>Avg</span>
            <button 
              className={`avg-switch ${visibleLevels.average ? 'active' : ''}`}
              onClick={() => toggleLevel('average')}
              aria-label='Toggle Average Line'
            >
              <div className='switch-thumb' />
            </button>
          </div>
        </div>
        <small className='help-text'>Tap a level to toggle its timeline on the graph</small>
        {Object.keys(stats.byLevel).length > 0 ? (
          <div className='level-list'>
            {Object.entries(stats.byLevel).map(([level, data]) => {
              const isActive = visibleLevels[level]
              const levelColor =
                level === 'easy'
                  ? '#00fbff'
                  : level === 'medium'
                  ? '#ffea00'
                  : '#2979ff'
              
              return (
                <div 
                  key={level} 
                  className={`level-item toggleable ${isActive ? 'active' : ''}`}
                  onClick={() => toggleLevel(level)}
                  style={{ 
                    borderLeft: `3px solid ${isActive ? levelColor : 'transparent'}`,
                    paddingLeft: '0.75rem'
                  }}
                >
                  <span className='level-name' style={{ color: isActive ? levelColor : 'inherit' }}>
                    {level}
                  </span>
                  <span className='level-detail'>
                    {Math.round((data.correct / data.total) * 100)}% 
                    <small> ({data.correct}/{data.total}, {data.count})</small>
                  </span>
                </div>
              )
            })}
          </div>
        ) : (
          <p>No level data yet.</p>
        )}
      </div>
    </div>
  )
}

QuizStats.propTypes = {
  onBack: PropTypes.func.isRequired,
}

export default QuizStats
