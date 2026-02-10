import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'
import { strings } from '@/data/config'
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import Confirm from 'ui/confirm/Confirm'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
const activityStringsByName = strings.activity.reduce((acc, activity) => {
  acc[activity.name] = activity
  return acc
}, {})
import DoneIcon from '@mui/icons-material/Done'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import LayersIcon from '@mui/icons-material/Layers'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import RestoreOutlinedIcon from '@mui/icons-material/RestoreOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import './styles.scss'

// --- CONFIGURATION ---
const LINE_CONFIG = {
  strokeWidth: 2,
  tension: 0.45,
}

// NOTE: Use 'offset' (pixels) to push text away from the divider line
// NOTE: Use 'angleAdjust' (degrees) to rotate the label around the wheel
// NOTE: Use 'edge' ('top', 'middle', 'bottom') to choose which part of the text aligns with the offset

const CATEGORIES = [
  {
    id: 'recovery',
    label: 'Recovery',
    angleAdjust: 45, // Rotates clockwise
    edge: 'bottom',
    offset: -16, // Pushes "up" away from line
  },
  {
    id: 'family',
    label: 'Family',
    angleAdjust: 45,
    edge: 'bottom',
    offset: -16,
  },
  {
    id: 'education',
    label: 'Education Training Work',
    angleAdjust: 45,
    edge: 'bottom',
    offset: -16,
  },
  {
    id: 'health',
    label: 'Health & Fitness',
    angleAdjust: 45,
    rotate180: true,
    edge: 'bottom',
    offset: -16,
  },
  {
    id: 'social',
    label: 'Social Fun',
    angleAdjust: 45,
    edge: 'top',
    offset: 20,
  },
  {
    id: 'friends',
    label: 'Friends & Relationships',
    angleAdjust: 45,
    edge: 'top',
    offset: 20,
  },
  {
    id: 'purpose',
    label: 'Life Purpose',
    angleAdjust: 45,
    edge: 'top',
    offset: 20,
  },
  {
    id: 'environment',
    label: 'Physical Environment',
    angleAdjust: 45,
    rotate180: true,
    edge: 'top',
    offset: 20,
  },
]

const NUM_CATEGORIES = CATEGORIES.length
const MAX_SCORE = 10
const SVG_SIZE = 710
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
  const name = 'wheel-of-life'
  const id = 22
  const [show, setShow] = useState(false)
  const activity = useAppStore((s) => s.activity)
  const setActivity = useAppStore((s) => s.setActivity)

  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmConfig, setConfirmConfig] = useState({
    title: '',
    instruction: '',
    message: '',
    onConfirm: () => {},
    onCancel: () => {},
    showConfirm: false,
  })

  const svgRef = useRef(null)

  // Modal State
  const [modal, setModal] = useState({ isOpen: false, title: '', message: '' })
  const [showInstructions, setShowInstructions] = useState(false)

  const strings = activityStringsByName[name]
  const setIsModal = useAppStore((s) => s.setIsModal)

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

  useEffect(() => {
    show && setIsModal(activitiesById[id]?.modal)
  }, [show, activitiesById, id, setIsModal])

  useEffect(() => {
    setShow(id === activity)
  }, [activity])

  const handleClose = () => {
    setShow(false)
    setActivity(-1)
  }
  const handleDoIsCompareMode = (mode) => {
    if (!rememberWheels) {
      openModal(
        'Remember wheels',
        'Remember wheels must be enabled to compare wheels.',
      )
      return
    }
    if (wheelHistory.length === 0) {
      openModal(
        'Saved wheels',
        'You only have one saved wheel so there is nothing to compare. Save another wheel and try again.',
      )
      return
    }
    if (wheelHistory.length === 1) {
      openModal('Saved wheels', "You haven't saved any wheels yet.")
      return
    }
    if (!rememberWheels || wheelHistory.length === 0) {
      return
    }
    setIsCompareMode(mode)
  }

  const handleScoreUpdate = (categoryId, score) => {
    setScores((prev) => ({ ...prev, [categoryId]: score }))
  }

  const handleReset = () => {
    if (!isWheelComplete()) return

    setConfirmConfig({
      title: 'Clear current wheel?',
      message: 'Are you sure you want to clear the current wheel?',
      showConfirm: true,
      onConfirm: () => {
        setScores(
          CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: null }), {}),
        )
        setUserNotes('')
        setIsCompareMode(false)
        setShowConfirm(false)
      },
      onCancel: () => {
        setShowConfirm(false)
      },
    })
    setShowConfirm(true)
  }
  const closeConfirm = () => {
    setShowConfirm(false)
    setConfirmConfig({
      title: '',
      instruction: '',
      message: '',
      showConfirm: false,
      onConfirm: () => {},
      onCancel: () => {},
    })
  }
  const openModal = (title, message) => {
    setModal({ isOpen: true, title, message })
  }
  const closeModal = () => {
    setModal({ ...modal, isOpen: false })
  }
  const isWheelComplete = () => {
    return Object.values(scores).every((v) => v !== null)
  }
  const handleSaveEntry = () => {
    const isComplete = isWheelComplete() //Object.values(scores).every((v) => v !== null)
    if (!isComplete) {
      openModal(
        'Incomplete Wheel',
        'Please score all areas before saving to history.',
      )
      return
    }
    if (!rememberWheels) {
      openModal(
        'Unable to save',
        'Please check remember wheels to enable saving to history.',
      )
      return
    }
    saveWheelEntry({ scores, notes: userNotes })
    openModal('Success', 'Wheel saved to history!')
  }

  const handleDeleteAll = () => {
    if (wheelHistory.length <= 1) {
      openModal('No saved wheels', 'There are no saved wheels to delete.')
      return
    }

    setConfirmConfig({
      title: 'Delete all saved wheels?',
      message:
        'Are you sure you want to delete all saved wheels? This cannot be undone.',
      showConfirm: true,
      onConfirm: () => {
        clearWheelHistory()
        closeConfirm()
      },
      onCancel: () => {
        closeConfirm()
      },
    })
    setShowConfirm(true)
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
    const btn = isCompareMode ? (
      <div
        className={
          'btn' + (rememberWheels && wheelHistory.length > 1 ? '' : ' inactive')
        }
        onClick={() =>
          wheelHistory.length > 0 ? handleDoIsCompareMode(!isCompareMode) : null
        }>
        <RestoreOutlinedIcon />
      </div>
    ) : (
      <div
        className={
          'btn' + (rememberWheels && wheelHistory.length > 1 ? '' : ' inactive')
        }
        onClick={() =>
          wheelHistory.length > 0 ? handleDoIsCompareMode(!isCompareMode) : null
        }>
        <LayersIcon />
      </div>
    )
    return btn
  }

  return (
    <div
      id={name}
      className={
        'activity activity-' + name + (show ? ' show' : ' hide') + ' fixed'
      }>
      {showConfirm && (
        <Confirm
          title={confirmConfig.title}
          message={confirmConfig.message}
          instruction={confirmConfig.instruction}
          onClose={closeConfirm}
          onConfirm={confirmConfig.onConfirm}
          onCancel={confirmConfig.onCancel}
          isfullscreen={false}
          fitContent={true}
        />
      )}

      <CloseBtn onClick={handleClose} />
      <div className={`wheel-layout ${isCompareMode ? 'mode-compare' : ''}`}>
        <header className='wheel-header'>
          <div className='header-top'>
            <h1>Wheel of Life</h1>
          </div>

          <div className='wheel-instruction'>
            Score the areas of your life on a scale of 1-10 to see your life
            balance. Click <span className='circled-help'>?</span> to view more
            instructions.
          </div>

          <div className='wheel-preferences'>
            <div className='wheel-count'>
              <div>{wheelHistory.length}</div>
              <div>Saved Wheels</div>
            </div>
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
                'btn' +
                (rememberWheels && wheelHistory.length > 1 ? '' : ' inactive')
              }
              onClick={() =>
                wheelHistory.length > 0 ? handleDeleteAll() : null
              }>
              <DeleteForeverIcon />
            </div>

            <div
              className={
                'btn' +
                (isWheelComplete()
                  ? rememberWheels
                    ? ''
                    : ' inactive'
                  : ' inactive')
              }
              onClick={handleSaveEntry}>
              <DoneIcon />
            </div>
            <div
              className={'btn' + (isWheelComplete() ? '' : ' inactive')}
              onClick={handleReset}>
              <RestartAltOutlinedIcon />
            </div>
          </div>
        </footer>
      </div>

      {modal.isOpen && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <h4>{modal.title}</h4>
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
              <h4>Scoring</h4>
              <p>
                Click on any segment to rate that area of your life from 0
                (center) to 10 (outer edge).
              </p>
              <h4>Visualising</h4>
              <p>
                Once all areas are scored, a shape will connect them,
                visualizing your current life balance.
              </p>
              <h4>Balance</h4>
              <p>The wheel is a visual "heads-up" of your life balance.</p>
              <p>
                The wheel (and if you save wheels over time) allows you to
                visually see your life balance, and consider all aspects of your
                life instead of rummaging around in your head for it.
              </p>
              <p>
                If areas of your life have a low score this is where your life
                balance may do with a little help, if that's possible.
              </p>
              <p>If it isn't, that's cool - you're aware of it.</p>
              <p>
                If you score high on a few areas but low in the others it maybe
                that you need a re-balance.
              </p>
              <p>
                The wheel will change shape from time to time and that's
                natural.{' '}
              </p>
              <h4>Saving</h4>
              <p>
                Check "Remember wheels" to save your progress over time. <br />{' '}
                <br />
                Add wheels at different days and times to log how you are doing
                with your life balance.
              </p>
              <h4>Comparison Mode</h4>
              <p>
                If you have saved history, click the layer icon to compare your
                wheels over time.
              </p>
              <ul>
                <li>
                  <strong>
                    <u className='yellow-ul'>Thick Line:</u>
                  </strong>{' '}
                  Your average score over time.
                </li>
                <li>
                  <strong>
                    <u className='yellow-ul'>Ghost Lines:</u>{' '}
                  </strong>{' '}
                  Your past entries. Red on a line = low score, Blue on a line =
                  high score
                </li>
              </ul>
              <h4>Arrows</h4>
              <p>
                Arrows indicate the your current life balance compared to your
                average.
              </p>
              <p>
                <strong>
                  <u className='yellow-ul'>Blue arrow pointing out:</u>
                </strong>
                you are doing better than usual.
              </p>
              <p>
                <strong>
                  <u className='yellow-ul'>Red arrow pointing in:</u>
                </strong>
                you are below your average.
              </p>
              <p>
                <strong>
                  <u className='yellow-ul'>Arrow size:</u>
                </strong>
                bigger arrows = bigger change. Smaller arrows = smaller change.
              </p>
              <h4>Buttons</h4>
              <p>
                <DoneIcon />
                <strong>
                  <u className='orange-ul'>Tick button</u>
                </strong>
                The tick button will save your current wheel (You will need to
                have checked "remember wheels")
              </p>
              <p>
                <RestoreOutlinedIcon />
                <strong>
                  <u className='orange-ul'>Refresh button</u>
                </strong>{' '}
                The refresh button will clear your current wheel.
              </p>
              <p>
                <DeleteForeverIcon />
                <strong>
                  <u className='orange-ul'>Delete button</u>
                </strong>{' '}
                The delete button will delete all of your data
              </p>
              <p>
                <LayersIcon />
                <strong>
                  <u className='orange-ul'>Layers button</u>
                </strong>
                The layers button will toggle between comparison mode and
                current wheel
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

        const scale = 1.5 + Math.abs(delta) / 0.65
        const arrowColor = delta > 0 ? '#846eff' : '#ebb608'

        const arrowPath = `
            M -12 -4 
            L 1 -4 
            L 1 -8 
            L 12 0 
            L 1 8 
            L 1 4 
            L -12 4 
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
              strokeWidth='0.0'
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
                strokeWidth='4'
                strokeOpacity='0.65'
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
                strokeWidth='12'
                strokeOpacity='0.6'
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
                  fontSize='1.5rem'
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
          strokeWidth='14'
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
            r={14}
            className='score-dot-animated'
            style={{ '--dx': `${dx}px`, '--dy': `${dy}px` }}
          />
        )
      })
    }

    // --- REPLACED RENDER LABELS FUNCTION ---
    const renderLabels = () => {
      return categories.map((cat, i) => {
        // 1. Base Angle + Manual Rotation (angleAdjust)
        // angleAdjust rotates the label position around the wheel center (along the rim)
        const baseAngle = i * angleStep
        const angle = baseAngle + (cat.angleAdjust || 0)

        // 2. Position on the Rim
        const r = MAX_RADIUS - 14
        const pos = polarToCartesian(CENTER, CENTER, r, angle)

        // 3. Text Rotation (Align with spoke)
        let rotation = angle - 90

        // 4. Split Lines
        const lines = cat.label.split(',')
        const LINE_HEIGHT_PX = 16 // Approx pixel height of one line
        const stackHeight = (lines.length - 1) * LINE_HEIGHT_PX

        // 5. Orientation Defaults
        let textAnchor = 'end'
        let isFlipped = false

        // Check Left Side (90 to 270) based on the original segment angle
        // We use baseAngle to ensure consistent flipping behavior regardless of small adjustments
        if (baseAngle > 90 && baseAngle <= 270) {
          rotation += 180
          textAnchor = 'start'
          isFlipped = true
        }

        // 6. Manual Flip Override
        if (cat.rotate180) {
          rotation += 180
          textAnchor = textAnchor === 'start' ? 'end' : 'start'
          isFlipped = !isFlipped
        }

        // 7. Calculate Y-Offset based on "edge" and "offset" props
        // We calculate where the text block should start (y=0) relative to the anchor point.
        // SVG Text grows downwards (Positive Y).

        let yPos = 0
        const userOffset = cat.offset || 0
        const edge = cat.edge || 'middle' // default to middle if not specified

        if (!isFlipped) {
          // --- RIGHT SIDE (Standard) ---
          // Text Top is at 0. Text Bottom is at stackHeight.
          // Positive offset moves DOWN (Clockwise).

          if (edge === 'top') {
            // Top of text is at anchor + offset
            yPos = userOffset
          } else if (edge === 'middle') {
            // Middle of text is at anchor + offset
            yPos = userOffset - stackHeight / 2
          } else if (edge === 'bottom') {
            // Bottom of text is at anchor + offset
            yPos = userOffset - stackHeight
          }
        } else {
          // --- LEFT SIDE (Flipped) ---
          // Text is rotated 180.
          // Visually: Positive Y moves UP (Clockwise).
          // But conceptually, we just apply the same logic relative to the text block.

          if (edge === 'top') {
            yPos = userOffset
          } else if (edge === 'middle') {
            yPos = userOffset - stackHeight / 2
          } else if (edge === 'bottom') {
            yPos = userOffset - stackHeight
          }
        }

        return (
          <g
            key={`label-${cat.id}`}
            transform={`translate(${pos.x}, ${pos.y})`}>
            <text
              transform={`rotate(${rotation})`}
              className='category-label'
              textAnchor={textAnchor}
              dominantBaseline='middle'
              y={yPos}>
              {lines.map((line, idx) => (
                <tspan x='0' dy={idx === 0 ? 0 : '1.1em'} key={idx}>
                  {line.trim()}
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
            className='score-number-center'
            dy='7'>
            0
          </text>

          {/* OUTER SCORES */}
          {categories.map((cat, i) => {
            const midAngle = i * angleStep + angleStep / 2
            // Radius adjustment to position the number ring
            const r = MAX_RADIUS + 28
            const pos = polarToCartesian(CENTER, CENTER, r, midAngle)

            // Get current score, default to 0 if not set
            const currentScore = scores[cat.id] || 0

            return (
              <text
                key={`score-label-${cat.id}`}
                x={pos.x}
                y={pos.y}
                textAnchor='middle'
                dominantBaseline='middle'
                className='score-number-outer'>
                {/* LINE 1: User's Score (Shifted up slightly) */}
                <tspan className='user-score' x={pos.x} dy='-0.3em'>
                  {currentScore}
                </tspan>

                {/* LINE 2: The "/ 10" (Shifted down) */}
                {/* Note: We reset x to pos.x to center it under the top line */}
                <tspan className='max-score-group' x={pos.x} dy='1.2em'>
                  / 10
                </tspan>
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
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
            <stop offset='0%' stopColor='#ff0505ff' />
            <stop offset='50%' stopColor='#ff9f43ff' />
            <stop offset='100%' stopColor='#0f0161ff' />
          </radialGradient>

          <filter
            x='-0.1'
            y='-0.1'
            width='1.2'
            height='1.2'
            id='textBackground'>
            <feFlood
              floodColor={isCompareMode ? '#333' : '#fff'}
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

        {/* ... rect background ... */}

        <g className='segments-layer'>{renderInteractiveSegments()}</g>
        <g className='grid-layer' pointerEvents='none'>
          {renderGrid()}
        </g>

        <g className='comparison-layer' pointerEvents='none'>
          {renderComparisonStack()}
        </g>
        <g className='line-layer' pointerEvents='none'>
          {renderCurrentLine()}
        </g>
        <g className='dots-layer' pointerEvents='none'>
          {renderDots()}
        </g>

        {/* LABELS LAYER */}
        <g className='labels-layer' pointerEvents='none'>
          {renderLabels()}
        </g>
        {renderScoreNumbers()}
      </svg>
    )
  },
)

export default WheelOfLife
