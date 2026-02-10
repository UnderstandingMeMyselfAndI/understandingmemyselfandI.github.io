import React, { useState, useRef, useCallback, useMemo } from 'react'
import useAppStore from '@/store/useAppStore'
import DoneIcon from '@mui/icons-material/Done'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import DifferenceIcon from '@mui/icons-material/Difference'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import LayersIcon from '@mui/icons-material/Layers'
import TimelineIcon from '@mui/icons-material/Timeline'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined'
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined'
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import './styles.scss'

// --- CONFIGURATION ---
const LINE_CONFIG = {
  strokeWidth: 2,
  tension: 0.35,
}

const CATEGORIES = [
  { id: 'recovery', label: 'Recovery' },
  { id: 'family', label: 'Family' },
  { id: 'education', label: 'Education, Training, Employment' },
  { id: 'health', label: 'Health &, Fitness' },
  { id: 'social', label: 'Social Fun' },
  { id: 'friends', label: 'Friends &, Relationships' },
  { id: 'purpose', label: 'Life, Purpose' },
  { id: 'environment', label: 'Physical, Environment' },
]

const NUM_CATEGORIES = CATEGORIES.length
const MAX_SCORE = 10
const SVG_SIZE = 800
const CENTER = SVG_SIZE / 2
const MAX_RADIUS = 350

// --- Geometry Helpers ---
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  }
}

const describeArc = (x, y, innerRadius, outerRadius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, outerRadius, endAngle)
  const end = polarToCartesian(x, y, outerRadius, startAngle)
  const start2 = polarToCartesian(x, y, innerRadius, endAngle)
  const end2 = polarToCartesian(x, y, innerRadius, startAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'

  return [
    'M',
    start.x,
    start.y,
    'A',
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    'L',
    end2.x,
    end2.y,
    'A',
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    1,
    start2.x,
    start2.y,
    'Z',
  ].join(' ')
}

const WheelOfLife = () => {
  const [show, setShow] = useState(true)
  const svgRef = useRef(null)

  // Modal State
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' })
  const [showInstructions, setShowInstructions] = useState(false)

  // User Input State
  const [userNotes, setUserNotes] = useState('')
  const [scores, setScores] = useState(
    CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: null }), {}),
  )
  const [isCompareMode, setIsCompareMode] = useState(false)

  // Store Hooks
  const rememberWheels = useAppStore((state) => state.rememberWheels)
  const setRememberWheels = useAppStore((state) => state.setRememberWheels)
  const saveWheelEntry = useAppStore((state) => state.saveWheelEntry)
  const wheelHistory = useAppStore((state) => state.wheelHistory)
  const clearWheelHistory = useAppStore((state) => state.clearWheelHistory)

  const handleScoreUpdate = (categoryId, score) => {
    setScores((prev) => ({ ...prev, [categoryId]: score }))
  }

  const handleReset = () => {
    setScores(CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: null }), {}))
    setUserNotes('')
    setIsCompareMode(false)
  }

  const openModal = (title, message) => {
    setModal({ isOpen: true, title, message })
  }
  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }

  const handleSaveEntry = () => {
    const isComplete = Object.values(scores).every((v) => v !== null)
    if (!isComplete) {
      openModal(
        'Incomplete Wheel',
        'Please score all areas before saving to history.',
      )
      return
    }
    saveWheelEntry({ scores, notes: userNotes })
    openModal('Success', 'Wheel saved to history!')
  }

  const handleDeleteAll = () => {
    if (confirm('Are you sure you want to delete all saved wheels?')) {
      clearWheelHistory()
    }
  }

  const handleExportImage = useCallback(() => {
    if (!svgRef.current) return
    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    canvas.width = SVG_SIZE
    canvas.height = SVG_SIZE
    const svgBlob = new Blob([svgData], {
      type: 'image/svg+xml;charset=utf-8',
    })
    const url = URL.createObjectURL(svgBlob)

    img.onload = () => {
      ctx.fillStyle = isCompareMode ? '#1a1a1a' : '#ffffff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0)
      const pngUrl = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.href = pngUrl
      downloadLink.download = `wheel-of-life-${
        new Date().toISOString().split('T')[0]
      }.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      URL.revokeObjectURL(url)
    }
    img.src = url
  }, [isCompareMode])

  const compareBtn = (isCompareMode) => {
    console.log('compareBtn isCompareMode', isCompareMode)
    const btn = isCompareMode ? (
      <div className={wheelHistory.length > 0 ? 'active' : 'inactive'}>
        <RestoreOutlinedIcon
          onClick={() =>
            wheelHistory.length > 0 ? setIsCompareMode(!isCompareMode) : null
          }
        />
      </div>
    ) : (
      <div className={wheelHistory.length > 0 ? 'active' : 'inactive'}>
        <LayersIcon
          onClick={() =>
            wheelHistory.length > 0 ? setIsCompareMode(!isCompareMode) : null
          }
        />
      </div>
    )
    return btn
  }

  return (
    <div
      id='wheel-oflife'
      className={`activity ${show ? 'show' : 'hide'} fixed`}>
      <div className={`wheel-layout ${isCompareMode ? 'mode-compare' : ''}`}>
        <header className='wheel-header'>
          <div className='header-top'>
            <h1>Wheel of Life</h1>
          </div>

          <div className='wheel-instruction'>
            Score the areas of your life on a scale of 1-10 to see your life
            balance. Click <span class='circled-help'>?</span> to view more
            instructions.
          </div>

          <div className='wheel-preferences'>
            <label className='checkbox-label'>
              <input
                type='checkbox'
                checked={rememberWheels}
                onChange={(e) => setRememberWheels(e.target.checked)}
              />
              Remember wheels on this device
            </label>
            <div
              className='btn-icon'
              onClick={() => setShowInstructions(true)}
              aria-label='Instructions'>
              <HelpOutlineOutlinedIcon />
            </div>
          </div>
        </header>

        <div className='wheel-viewport'>
          <WheelCanvas
            ref={svgRef}
            scores={scores}
            categories={CATEGORIES}
            onScoreUpdate={handleScoreUpdate}
            history={wheelHistory}
            isCompareMode={isCompareMode}
          />
        </div>

        <footer className='wheel-controls'>
          <div className='control-row'>
            {compareBtn(isCompareMode)}

            <div
              className={
                rememberWheels && wheelHistory.length > 0
                  ? 'active'
                  : 'inactive'
              }>
              <DeleteForeverIcon
                onClick={() =>
                  wheelHistory.length > 0 ? handleDeleteAll() : null
                }
              />
            </div>

            <div className={rememberWheels ? 'active' : 'inactive'}>
              <DoneIcon onClick={handleSaveEntry} />
            </div>

            <RestartAltOutlinedIcon onClick={handleReset} />
          </div>
        </footer>
      </div>

      {modal.isOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h3>{modal.title}</h3>
            <p>{modal.message}</p>
            <button className='btn-primary' onClick={closeModal}>
              OK
            </button>
          </div>
        </div>
      )}

      {showInstructions && (
        <div className='modal-overlay'>
          <div className='modal-content large'>
            <h3>Instructions</h3>
            <div className='scrollable-text'>
              <p>
                <strong>1. Scoring:</strong> Click on any segment to rate that
                area of your life from 0 (center) to 10 (outer edge). 10 being
                teh highest score.
              </p>
              <p>
                <strong>2. Visualizing:</strong> Once all areas are scored, a
                shape will connect them, visualizing your current life balance.
              </p>
              <p>
                <strong>3. Saving:</strong> Check "Remember wheels" to save your
                progress over time. <br /> <br />
                Add wheels at different days and times to lg how you are doing
                with your life balance.
              </p>
              <p>
                <strong>4. Comparison Mode:</strong> If you have saved history,
                click the layer icon to compare your wheels over time.
              </p>
              <ul>
                <li>
                  <strong>Thick Line:</strong> Your average score over time.
                </li>
                <li>
                  <strong>Ghost Lines:</strong> Your past entries. Red on a line
                  = low score, Blue on a line = high score
                </li>
                <li>
                  <strong>Arrows:</strong> Indicate the your current life
                  balance compared to your average. <br /> <br />
                  Blue pointing out means you are doing better than usual.{' '}
                  <br /> <br />
                  Red pointing in means you are below your average.
                </li>
              </ul>
              <p>
                The tick button will save your current wheel (You will need to
                have checked "remember wheels")
              </p>
              <p> The refresh button will clear your current wheel.</p>
              <p>The delete button will delete all of your data</p>
              <p>
                The layers button will toggle comparison mode and current wheel
              </p>
            </div>
            <button
              className='btn-secondary'
              onClick={() => setShowInstructions(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const WheelCanvas = React.forwardRef(
  ({ scores, categories, onScoreUpdate, history, isCompareMode }, ref) => {
    const angleStep = 360 / NUM_CATEGORIES

    // --- HELPER: PATH GENERATOR ---
    const generatePathString = (scoreData) => {
      const hasFullData = categories.every(
        (cat) => scoreData[cat.id] !== null && scoreData[cat.id] !== undefined,
      )
      if (!hasFullData) return null

      const points = categories.map((cat, i) => {
        const score = scoreData[cat.id]
        const midAngle = i * angleStep + angleStep / 2
        const visualRadius = ((score - 0.5) * MAX_RADIUS) / MAX_SCORE
        return polarToCartesian(CENTER, CENTER, visualRadius, midAngle)
      })

      const t = LINE_CONFIG.tension
      let d = `M ${points[0].x} ${points[0].y}`

      for (let i = 0; i < points.length; i++) {
        const p0 = points[(i - 1 + points.length) % points.length]
        const p1 = points[i]
        const p2 = points[(i + 1) % points.length]
        const p3 = points[(i + 2) % points.length]
        const cp1 = {
          x: p1.x + (p2.x - p0.x) * t * 0.5,
          y: p1.y + (p2.y - p0.y) * t * 0.5,
        }
        const cp2 = {
          x: p2.x - (p3.x - p1.x) * t * 0.5,
          y: p2.y - (p3.y - p1.y) * t * 0.5,
        }
        d += ` C ${cp1.x} ${cp1.y}, ${cp2.x} ${cp2.y}, ${p2.x} ${p2.y}`
      }
      d += ' Z'
      return d
    }

    // --- CALCULATE AVERAGE ---
    const averages = useMemo(() => {
      if (!history || history.length === 0) return null
      const isCurrentComplete = Object.values(scores).every((v) => v !== null)
      const dataset = [...history, ...(isCurrentComplete ? [{ scores }] : [])]
      if (dataset.length === 0) return null

      const sum = {}
      const count = {}

      dataset.forEach((entry) => {
        CATEGORIES.forEach((cat) => {
          const s = entry.scores[cat.id]
          if (s) {
            sum[cat.id] = (sum[cat.id] || 0) + s
            count[cat.id] = (count[cat.id] || 0) + 1
          }
        })
      })

      const avgVals = {}
      CATEGORIES.forEach((cat) => {
        avgVals[cat.id] = sum[cat.id] / count[cat.id] || 0
      })

      return avgVals
    }, [history, scores])

    // --- RENDERERS ---

    const renderTrendArrows = () => {
      if (!averages) return null

      const latestHistory =
        history && history.length > 0 ? history[history.length - 1] : null

      return categories.map((cat, i) => {
        let current = scores[cat.id]
        const avg = averages[cat.id]

        if ((current === null || current === undefined) && latestHistory) {
          current = latestHistory.scores[cat.id]
        }

        if (avg === undefined || current === null || current === undefined)
          return null

        const delta = current - avg
        if (Math.abs(delta) < 0.2) return null

        const midAngle = i * angleStep + angleStep / 2
        const radius = ((avg - 0.5) * MAX_RADIUS) / MAX_SCORE
        const centerPos = polarToCartesian(CENTER, CENTER, radius, midAngle)

        let rotation = midAngle - 90
        if (delta < 0) {
          rotation += 180
        }

        const scale = 2.5 + Math.abs(delta) / 4
        const arrowColor = delta > 0 ? '#2e86de' : '#ff4d4d'

        // CENTERED ARROW PATH (Origin at 0,0)
        // Stem is doubled in width (now 8 wide)
        const arrowPath = `
            M -13 -4 
            L 1 -4 
            L 1 -10 
            L 13 0 
            L 1 10 
            L 1 4 
            L -13 4 
            Z
        `

        return (
          <g
            key={`arrow-${cat.id}`}
            transform={`translate(${centerPos.x}, ${centerPos.y}) rotate(${rotation}) scale(${scale * 1.5})`}
            style={{ opacity: 0.6, pointerEvents: 'none' }}>
            <path
              d={arrowPath}
              fill={arrowColor}
              stroke='white'
              strokeWidth='00'
            />
          </g>
        )
      })
    }

    const renderComparisonStack = () => {
      if (!isCompareMode) return null

      const labelPoints = []
      if (averages) {
        const indicesToLabel = [0, 3, 6]
        indicesToLabel.forEach((idx) => {
          const cat = CATEGORIES[idx]
          const avgScore = averages[cat.id]
          const midAngle = idx * angleStep + angleStep / 2
          const lineRadius = ((avgScore - 0.5) * MAX_RADIUS) / MAX_SCORE
          const labelRadius = Math.max(0, lineRadius - 25)
          labelPoints.push(
            polarToCartesian(CENTER, CENTER, labelRadius, midAngle),
          )
        })
      }

      return (
        <g className='comparison-stack'>
          {history.map((entry, index) => {
            const d = generatePathString(entry.scores)
            if (!d) return null
            return (
              <path
                key={`layer-${index}`}
                d={d}
                fill='none'
                stroke='url(#scoreGradient)'
                strokeWidth='3'
                strokeOpacity='0.5'
                className='history-line'
              />
            )
          })}

          {averages && (
            <>
              <path
                d={generatePathString(averages)}
                fill='none'
                stroke='#D8B4FE'
                strokeWidth='5'
                strokeOpacity='0.9'
                style={{
                  filter: 'drop-shadow(0 0 4px rgba(216, 180, 254, 0.6))',
                }}
              />
              {renderTrendArrows()}
              {labelPoints.map((pos, i) => (
                <text
                  key={`avg-label-${i}`}
                  x={pos.x}
                  y={pos.y}
                  textAnchor='middle'
                  dominantBaseline='middle'
                  fill='#D8B4FE'
                  fontWeight='bold'
                  fontSize='1.1rem'
                  filter='url(#textBackground)'
                  style={{ pointerEvents: 'none' }}>
                  AVERAGE
                </text>
              ))}
            </>
          )}

          {generatePathString(scores) && (
            <path
              d={generatePathString(scores)}
              fill='none'
              stroke='url(#scoreGradient)'
              strokeWidth='4'
              strokeOpacity='1'
              className='score-line-animated'
              style={{ filter: 'drop-shadow(0 0 5px rgba(0,0,0,0.5))' }}
            />
          )}
        </g>
      )
    }

    const renderInteractiveSegments = () => {
      const opacity = isCompareMode ? 0.05 : 1

      return categories.map((cat, catIndex) => {
        const startAngle = catIndex * angleStep
        const endAngle = startAngle + angleStep
        const currentScore = scores[cat.id] || 0

        return Array.from({ length: MAX_SCORE }).map((_, scoreIndex) => {
          const scoreValue = scoreIndex + 1
          const innerR = (scoreIndex * MAX_RADIUS) / MAX_SCORE
          const outerR = ((scoreIndex + 1) * MAX_RADIUS) / MAX_SCORE
          const isActive = scoreValue <= currentScore

          return (
            <path
              key={`${cat.id}-${scoreValue}`}
              d={describeArc(
                CENTER,
                CENTER,
                innerR,
                outerR,
                startAngle,
                endAngle,
              )}
              className={`wheel-segment ${isActive ? 'active' : ''}`}
              onClick={() => onScoreUpdate(cat.id, scoreValue)}
              style={{ opacity }}
            />
          )
        })
      })
    }

    const renderCurrentLine = () => {
      if (isCompareMode) return null
      const d = generatePathString(scores)
      if (!d) return null

      return (
        <path
          d={d}
          fill='url(#scoreGradient)'
          fillOpacity='0.2'
          stroke='url(#scoreGradient)'
          strokeWidth='12'
          className='score-line-animated'
        />
      )
    }

    const renderGrid = () => {
      const circles = Array.from({ length: MAX_SCORE }).map((_, i) => (
        <circle
          key={`grid-c-${i}`}
          cx={CENTER}
          cy={CENTER}
          r={((i + 1) * MAX_RADIUS) / MAX_SCORE}
          className='grid-circle'
        />
      ))
      const lines = categories.map((_, i) => {
        const angle = i * angleStep
        const point = polarToCartesian(CENTER, CENTER, MAX_RADIUS, angle)
        return (
          <line
            key={`grid-l-${i}`}
            x1={CENTER}
            y1={CENTER}
            x2={point.x}
            y2={point.y}
            className='grid-line'
          />
        )
      })
      return [...circles, ...lines]
    }

    const renderDots = () => {
      if (isCompareMode) return null
      return categories.map((cat, i) => {
        const score = scores[cat.id]
        if (!score) return null
        const midAngle = i * angleStep + angleStep / 2
        const visualRadius = ((score - 0.5) * MAX_RADIUS) / MAX_SCORE
        const targetPos = polarToCartesian(
          CENTER,
          CENTER,
          visualRadius,
          midAngle,
        )
        const dx = targetPos.x - CENTER
        const dy = targetPos.y - CENTER
        return (
          <circle
            key={`dot-${cat.id}-${score}`}
            cx={CENTER}
            cy={CENTER}
            r={6}
            className='score-dot-animated'
            style={{ '--dx': `${dx}px`, '--dy': `${dy}px` }}
          />
        )
      })
    }

    const renderLabels = () => {
      return categories.map((cat, i) => {
        const midAngle = i * angleStep + angleStep / 2
        const textRadius = MAX_RADIUS * 0.82
        const pos = polarToCartesian(CENTER, CENTER, textRadius, midAngle)

        return (
          <g key={`label-${cat.id}`}>
            <text
              x={pos.x}
              y={pos.y}
              className='category-label'
              textAnchor='middle'
              dominantBaseline='middle'
              //   filter='url(#textBackground)'
            >
              {cat.label.split(', ').map((textLine, idx) => (
                <tspan x={pos.x} dy={idx === 0 ? 0 : '1.2em'} key={idx}>
                  {textLine}
                </tspan>
              ))}
            </text>
          </g>
        )
      })
    }

    const renderScoreNumbers = () => {
      return (
        <g className='score-numbers-layer' pointerEvents='none'>
          {/* CENTER ZERO */}
          <text
            x={CENTER}
            y={CENTER}
            textAnchor='middle'
            dominantBaseline='middle'
            className='score-number-center' // Class for CSS styling
            dy='7'>
            0
          </text>

          {/* OUTER 10s */}
          {categories.map((cat, i) => {
            const midAngle = i * angleStep + angleStep / 2
            const r = MAX_RADIUS + 30
            const pos = polarToCartesian(CENTER, CENTER, r, midAngle)
            return (
              <text
                key={`score-10-${cat.id}`}
                x={pos.x}
                y={pos.y}
                textAnchor='middle'
                dominantBaseline='middle'
                className='score-number-outer' // Class for CSS styling
              >
                {' '}
                10{' '}
              </text>
            )
          })}
        </g>
      )
    }

    return (
      <svg
        ref={ref}
        className={`wheel-svg ${isCompareMode ? 'neon-mode' : ''}`}
        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
        xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <style>
            {`
              .category-label, .score-numbers-layer text {
                font-family: Plus Jakarta Sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
              }
            `}
          </style>
          <radialGradient
            id='scoreGradient'
            gradientUnits='userSpaceOnUse'
            cx={CENTER}
            cy={CENTER}
            r={MAX_RADIUS}
            fx={CENTER}
            fy={CENTER}>
            <stop offset='10%' stopColor='#b90000' />
            <stop offset='50%' stopColor='#ffac13' />
            <stop offset='90%' stopColor='#0300af' />
          </radialGradient>

          <filter
            x='-0.1'
            y='-0.1'
            width='1.2'
            height='1.2'
            id='textBackground'>
            <feFlood
              floodColor={isCompareMode ? '#b14a4a' : '#fff'}
              floodOpacity='0.85'
              result='bg'
            />
            <feComposite
              in='bg'
              in2='SourceGraphic'
              operator='in'
              result='text_bg'
            />
            <feMorphology
              operator='dilate'
              radius='4'
              in='SourceAlpha'
              result='expanded_alpha'
            />
            <feFlood
              floodColor={isCompareMode ? '#000' : '#fff'}
              floodOpacity='0.8'
            />
            <feComposite in2='expanded_alpha' operator='in' />
            <feMerge>
              <feMergeNode />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        <rect
          x='0'
          y='0'
          width={SVG_SIZE}
          height={SVG_SIZE}
          className='svg-bg'
        />
        <g className='segments-layer'>{renderInteractiveSegments()}</g>
        <g className='grid-layer' pointerEvents='none'>
          {renderGrid()}
        </g>
        {renderScoreNumbers()}
        <g className='comparison-layer' pointerEvents='none'>
          {renderComparisonStack()}
        </g>
        <g className='line-layer' pointerEvents='none'>
          {renderCurrentLine()}
        </g>
        <g className='dots-layer' pointerEvents='none'>
          {renderDots()}
        </g>
        <g className='labels-layer' pointerEvents='none'>
          {renderLabels()}
        </g>
      </svg>
    )
  },
)

export default WheelOfLife
