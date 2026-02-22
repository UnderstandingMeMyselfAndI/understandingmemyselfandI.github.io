import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react'
import useAppStore from '@/store/useAppStore'
import { activities } from '@/data/config'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import CloseBtn from '@/components/ui/buttons/close/CloseBtn'

import DoneIcon from '@mui/icons-material/Done'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import './pengGameAI.scss'
import { strings } from '@/data/config'
import parse from 'html-react-parser'
const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})
const activityStringsByName = strings.activity.reduce((acc, activity) => {
  acc[activity.name] = activity
  return acc
}, {})
const pengGameAI = () => {
  const name = 'peng-game'
  const id = 24
  const [show, setShow] = useState(true)
  const activity = useAppStore((s) => s.activity)
  const setActivity = useAppStore((s) => s.setActivity)
  // Refs for canvas and animation frame
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  const strings = activityStringsByName[name]
  const setIsModal = useAppStore((s) => s.setIsModal)

  useEffect(() => {
    setShow(id === activity)
  }, [activity])

  const handleClose = () => {
    setShow(false)
    setActivity(-1)
  }
  // Game state stored in refs to avoid re-rendering on every frame
  const gameState = useRef({
    ballX: 0,
    ballY: 0,
    ballVX: 4,
    ballVY: 3,
    leftPaddleY: 0,
    rightPaddleY: 0,
    leftScore: 0,
    rightScore: 0,
    gameActive: false,
  })

  // Scores in state for display
  const [scores, setScores] = useState({ left: 0, right: 0 })

  // --- Live settings (applied) ---
  const [ballSize, setBallSize] = useState(20)
  const [paddleWidth, setPaddleWidth] = useState(20)
  const [paddleHeight, setPaddleHeight] = useState(140)
  const [speedFactor, setSpeedFactor] = useState(1.0)
  const [aiSkill, setAiSkill] = useState(0.5)
  // Freeze settings (adjustable)
  const [maxHoldTime, setMaxHoldTime] = useState(1500) // ms
  const [freezeCooldown, setFreezeCooldown] = useState(1000) // ms

  // --- Temporary settings (while modal open) ---
  const [tempBallSize, setTempBallSize] = useState(ballSize)
  const [tempPaddleWidth, setTempPaddleWidth] = useState(paddleWidth)
  const [tempPaddleHeight, setTempPaddleHeight] = useState(paddleHeight)
  const [tempSpeedFactor, setTempSpeedFactor] = useState(speedFactor)
  const [tempAiSkill, setTempAiSkill] = useState(aiSkill)
  const [tempMaxHold, setTempMaxHold] = useState(maxHoldTime)
  const [tempFreeze, setTempFreeze] = useState(freezeCooldown)
  const [boostEnabled, setBoostEnabled] = useState(false) // NEW
  const [tempBoostEnabled, setTempBoostEnabled] = useState(false) // NEW

  // Max limits for paddle dimensions
  const MAX_PADDLE_WIDTH = 40
  const MAX_PADDLE_HEIGHT = 200

  // Pause state
  const [isPaused, setIsPaused] = useState(false)

  // Visual feedback for charging and freezing
  const [isCharging, setIsCharging] = useState(false)
  const [isFrozen, setIsFrozen] = useState(false)

  // Modal visibility
  const [showSettings, setShowSettings] = useState(false)

  // Keyboard control state for left paddle
  const leftPaddleDir = useRef(0)

  // Touch/mouse charging state
  const isMouseDown = useRef(false)
  const chargeStartTime = useRef(0)
  const lastBoostTime = useRef(0)
  const activeTouchId = useRef(null)
  const freezeUntil = useRef(0)

  // Constants
  const PADDLE_SPEED = 6
  const BASE_BALL_SPEED_X = 1
  const BASE_BALL_SPEED_Y = 0.75
  const ANGLE_VARIATION = 2.5 // More varied starting angle

  // Boost parameters (fixed in code, not user‑adjustable)
  const BOOST_MIN_HOLD = 200 // ms – minimum hold to get any boost
  const BOOST_MAX_HOLD = 1000 // ms – maximum charge time for full boost (not used now)
  const BOOST_MULTIPLIER = 3.5 // Fixed boost force (mid‑range)
  const BOOST_COOLDOWN = 300 // ms – prevent spamming

  // AI parameters
  const MIN_AI_SPEED = 1.5
  const MAX_AI_SPEED = 6.0
  const MAX_AI_ERROR = 20
  const MIN_AI_ERROR = 0

  // Check if ball is colliding with left paddle
  const isBallCollidingWithLeftPaddle = () => {
    const canvas = canvasRef.current
    if (!canvas) return false

    return (
      gameState.current.ballX <= paddleWidth &&
      gameState.current.ballY + ballSize > gameState.current.leftPaddleY &&
      gameState.current.ballY < gameState.current.leftPaddleY + paddleHeight
    )
  }

  // Apply boost (fixed multiplier)
  const tryApplyBoost = (holdTime) => {
    if (!boostEnabled) return
    const now = Date.now()
    if (gameState.current.gameActive && !isPaused && !isFrozen && now - lastBoostTime.current > BOOST_COOLDOWN) {
      // Check if ball is still touching paddle OR was touching recently
      const ballWasNearPaddle = isBallCollidingWithLeftPaddle() || now - lastCollisionTime.current < BOOST_GRACE_MS // need to track last collision time

      if (ballWasNearPaddle && holdTime >= BOOST_MIN_HOLD) {
        // Scale boost with hold time (optional: min hold gives base, longer = stronger)
        const holdFactor = Math.min(1, holdTime / BOOST_MAX_HOLD) // BOOST_MAX_HOLD could be 1000
        const effectiveMultiplier = BOOST_MULTIPLIER * (0.8 + 0.4 * holdFactor) // ranges 0.8x–1.2x of base

        gameState.current.ballVX = Math.abs(gameState.current.ballVX) * effectiveMultiplier

        // Add a small vertical kick for excitement
        gameState.current.ballVY += (Math.random() * 2 - 1) * 0.5 * speedFactor

        lastBoostTime.current = now
      }
    }
  }

  // Reset ball to center with serve direction – more varied angle
  const resetBall = (scorer) => {
    const canvas = canvasRef.current
    if (!canvas) return

    gameState.current.ballX = canvas.width / 2
    gameState.current.ballY = canvas.height / 2

    const effectiveSpeedX = BASE_BALL_SPEED_X * speedFactor
    const effectiveSpeedY = BASE_BALL_SPEED_Y * speedFactor

    if (scorer === 'left') {
      gameState.current.ballVX = effectiveSpeedX
    } else {
      gameState.current.ballVX = -effectiveSpeedX
    }
    // Randomise vertical component more
    gameState.current.ballVY = (Math.random() * 2 - 1) * effectiveSpeedY * ANGLE_VARIATION
  }

  // Reset AI paddle to center
  const resetAIPaddle = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    gameState.current.rightPaddleY = (canvas.height - paddleHeight) / 2
  }

  // Start new game
  const startGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    gameState.current.leftScore = 0
    gameState.current.rightScore = 0
    setScores({ left: 0, right: 0 })

    gameState.current.leftPaddleY = (canvas.height - paddleHeight) / 2
    gameState.current.rightPaddleY = (canvas.height - paddleHeight) / 2

    gameState.current.ballX = canvas.width / 2
    gameState.current.ballY = canvas.height / 2
    const effectiveSpeedX = BASE_BALL_SPEED_X * speedFactor
    const effectiveSpeedY = BASE_BALL_SPEED_Y * speedFactor
    gameState.current.ballVX = -effectiveSpeedX
    gameState.current.ballVY = (Math.random() * 2 - 1) * effectiveSpeedY * ANGLE_VARIATION

    gameState.current.gameActive = true
    setIsPaused(false)
    setIsFrozen(false)
    freezeUntil.current = 0
  }

  // Stop game and reset everything
  const stopGame = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    gameState.current.gameActive = false
    setIsPaused(false)
    setIsCharging(false)
    setIsFrozen(false)

    gameState.current.leftScore = 0
    gameState.current.rightScore = 0
    setScores({ left: 0, right: 0 })

    gameState.current.leftPaddleY = (canvas.height - paddleHeight) / 2
    gameState.current.rightPaddleY = (canvas.height - paddleHeight) / 2

    gameState.current.ballX = canvas.width / 2
    gameState.current.ballY = canvas.height / 2
    gameState.current.ballVX = 0
    gameState.current.ballVY = 0

    leftPaddleDir.current = 0
    activeTouchId.current = null
    isMouseDown.current = false
    freezeUntil.current = 0

    drawCanvas()
  }

  // Toggle pause
  const togglePause = () => {
    if (gameState.current.gameActive) {
      setIsPaused((prev) => !prev)
    }
  }

  // Open settings modal
  const openSettings = () => {
    setTempBallSize(ballSize)
    setTempPaddleWidth(paddleWidth)
    setTempPaddleHeight(paddleHeight)
    setTempSpeedFactor(speedFactor)
    setTempAiSkill(aiSkill)
    setTempMaxHold(maxHoldTime)
    setTempFreeze(freezeCooldown)
    setTempBoostEnabled(boostEnabled)
    setShowSettings(true)
  }

  // Apply temporary settings
  const applySettings = () => {
    setBallSize(tempBallSize)
    setPaddleWidth(tempPaddleWidth)
    setPaddleHeight(tempPaddleHeight)
    setSpeedFactor(tempSpeedFactor)
    setAiSkill(tempAiSkill)
    setMaxHoldTime(tempMaxHold)
    setFreezeCooldown(tempFreeze)
    setBoostEnabled(tempBoostEnabled)
    setShowSettings(false)

    const canvas = canvasRef.current
    if (canvas) {
      gameState.current.leftPaddleY = Math.max(
        0,
        Math.min(canvas.height - tempPaddleHeight, gameState.current.leftPaddleY),
      )
      gameState.current.rightPaddleY = Math.max(
        0,
        Math.min(canvas.height - tempPaddleHeight, gameState.current.rightPaddleY),
      )
      if (gameState.current.gameActive) {
        gameState.current.ballX = Math.max(0, Math.min(canvas.width - tempBallSize, gameState.current.ballX))
        gameState.current.ballY = Math.max(0, Math.min(canvas.height - tempBallSize, gameState.current.ballY))
      }
      drawCanvas()
    }
  }

  // Reset to default settings
  const resetSettings = () => {
    setTempBallSize(10)
    setTempPaddleWidth(10)
    setTempPaddleHeight(100)
    setTempSpeedFactor(1.0)
    setTempAiSkill(0.5)
    setTempMaxHold(1500)
    setTempFreeze(1000)
    setTempBoostEnabled(false)
  }

  // Update game logic
  const updateGame = useCallback(() => {
    if (!gameState.current.gameActive) return

    const canvas = canvasRef.current
    if (!canvas) return

    const now = Date.now()

    // Check if freeze has expired
    if (isFrozen && now >= freezeUntil.current) {
      setIsFrozen(false)
    }

    const aiSpeed = MIN_AI_SPEED + (MAX_AI_SPEED - MIN_AI_SPEED) * aiSkill
    const aiErrorRange = MAX_AI_ERROR - (MAX_AI_ERROR - MIN_AI_ERROR) * aiSkill

    if (!isPaused) {
      // Left paddle movement (keyboard)
      if (!isFrozen && leftPaddleDir.current !== 0) {
        gameState.current.leftPaddleY += leftPaddleDir.current * PADDLE_SPEED
      }
      gameState.current.leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, gameState.current.leftPaddleY))

      // AI right paddle
      const targetY =
        gameState.current.ballVX > 0
          ? gameState.current.ballY - paddleHeight / 2 + (Math.random() * 2 - 1) * aiErrorRange
          : canvas.height / 2 - paddleHeight / 2

      const currentY = gameState.current.rightPaddleY
      const diff = targetY - currentY
      const move = Math.sign(diff) * Math.min(Math.abs(diff), aiSpeed)
      gameState.current.rightPaddleY += move
      gameState.current.rightPaddleY = Math.max(
        0,
        Math.min(canvas.height - paddleHeight, gameState.current.rightPaddleY),
      )

      // Move ball
      gameState.current.ballX += gameState.current.ballVX
      gameState.current.ballY += gameState.current.ballVY

      // Wall collisions
      if (gameState.current.ballY <= 0 || gameState.current.ballY + ballSize >= canvas.height) {
        gameState.current.ballVY *= -1
        gameState.current.ballY = Math.max(0, Math.min(canvas.height - ballSize, gameState.current.ballY))
      }

      // Paddle collisions
      if (
        gameState.current.ballX <= paddleWidth &&
        gameState.current.ballY + ballSize > gameState.current.leftPaddleY &&
        gameState.current.ballY < gameState.current.leftPaddleY + paddleHeight
      ) {
        gameState.current.ballVX = Math.abs(gameState.current.ballVX)
        const hitPos = gameState.current.ballY + ballSize / 2 - (gameState.current.leftPaddleY + paddleHeight / 2)
        gameState.current.ballVY += hitPos * 0.1
      }

      if (
        gameState.current.ballX + ballSize >= canvas.width - paddleWidth &&
        gameState.current.ballY + ballSize > gameState.current.rightPaddleY &&
        gameState.current.ballY < gameState.current.rightPaddleY + paddleHeight
      ) {
        gameState.current.ballVX = -Math.abs(gameState.current.ballVX)
        const hitPos = gameState.current.ballY + ballSize / 2 - (gameState.current.rightPaddleY + paddleHeight / 2)
        gameState.current.ballVY += hitPos * 0.1
      }

      // Left paddle collision
      if (
        gameState.current.ballX <= paddleWidth &&
        gameState.current.ballY + ballSize > gameState.current.leftPaddleY &&
        gameState.current.ballY < gameState.current.leftPaddleY + paddleHeight
      ) {
        gameState.current.ballVX = Math.abs(gameState.current.ballVX)
        const hitPos = gameState.current.ballY + ballSize / 2 - (gameState.current.leftPaddleY + paddleHeight / 2)
        gameState.current.ballVY += hitPos * 0.05 // reduced from 0.1

        // Optional: cap vertical speed to avoid excessive movement
        const maxVY = 3 * speedFactor
        if (Math.abs(gameState.current.ballVY) > maxVY) {
          gameState.current.ballVY = Math.sign(gameState.current.ballVY) * maxVY
        }
      }

      // Right paddle collision – apply the same changes
      if (
        gameState.current.ballX + ballSize >= canvas.width - paddleWidth &&
        gameState.current.ballY + ballSize > gameState.current.rightPaddleY &&
        gameState.current.ballY < gameState.current.rightPaddleY + paddleHeight
      ) {
        gameState.current.ballVX = -Math.abs(gameState.current.ballVX)
        const hitPos = gameState.current.ballY + ballSize / 2 - (gameState.current.rightPaddleY + paddleHeight / 2)
        gameState.current.ballVY += hitPos * 0.05
        // same speed cap
        const maxVY = 3 * speedFactor
        if (Math.abs(gameState.current.ballVY) > maxVY) {
          gameState.current.ballVY = Math.sign(gameState.current.ballVY) * maxVY
        }
      }

      // Scoring – only update scores, no pop‑up
      if (gameState.current.ballX < 0) {
        gameState.current.rightScore += 1
        setScores((prev) => ({ left: prev.left, right: prev.right + 1 }))
        resetBall('right')
        resetAIPaddle()
      } else if (gameState.current.ballX + ballSize > canvas.width) {
        gameState.current.leftScore += 1
        setScores((prev) => ({ left: prev.left + 1, right: prev.right }))
        resetBall('left')
        resetAIPaddle()
      }
    }

    drawCanvas()
  }, [
    speedFactor,
    aiSkill,
    isPaused,
    isFrozen,
    isCharging,
    ballSize,
    paddleWidth,
    paddleHeight,
    maxHoldTime,
    freezeCooldown,
  ])

  // Draw canvas
  const drawCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.fillStyle = '#00000033'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#83838333'
    ctx.setLineDash([10, 15])
    ctx.beginPath()
    ctx.moveTo(canvas.width / 2, 0)
    ctx.lineTo(canvas.width / 2, canvas.height)
    ctx.stroke()
    ctx.setLineDash([])

    // Left paddle
    if (isFrozen && boostEnabled) {
      ctx.fillStyle = '#808080' // grey when frozen
      ctx.fillRect(0, gameState.current.leftPaddleY, paddleWidth, paddleHeight)
    } else if (isCharging && boostEnabled) {
      ctx.fillStyle = '#ffff00' // yellow when charging
      const chargedWidth = paddleWidth * 0.85
      ctx.fillRect(0, gameState.current.leftPaddleY, chargedWidth, paddleHeight)
    } else {
      ctx.fillStyle = 'white'
      ctx.fillRect(0, gameState.current.leftPaddleY, paddleWidth, paddleHeight)
    }

    // Right paddle (AI)
    ctx.fillStyle = 'white'
    ctx.fillRect(canvas.width - paddleWidth, gameState.current.rightPaddleY, paddleWidth, paddleHeight)

    // Ball
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.arc(
      gameState.current.ballX + ballSize / 2,
      gameState.current.ballY + ballSize / 2,
      ballSize / 2,
      0,
      2 * Math.PI,
    )
    ctx.fill()

    if (isPaused) {
      ctx.font = 'bold 40px Arial'
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.textAlign = 'center'
      ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2)
    }
  }

  // Animation loop
  const gameLoop = useCallback(() => {
    updateGame()
    animationRef.current = requestAnimationFrame(gameLoop)
  }, [updateGame])

  // Resize canvas
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const container = canvas.parentElement
    if (!container) return

    const { width, height } = container.getBoundingClientRect()
    canvas.width = width
    canvas.height = height

    gameState.current.leftPaddleY = Math.max(0, Math.min(height - paddleHeight, gameState.current.leftPaddleY))
    gameState.current.rightPaddleY = Math.max(0, Math.min(height - paddleHeight, gameState.current.rightPaddleY))

    if (gameState.current.gameActive) {
      gameState.current.ballX = Math.max(0, Math.min(width - ballSize, gameState.current.ballX))
      gameState.current.ballY = Math.max(0, Math.min(height - ballSize, gameState.current.ballY))
    }

    drawCanvas()
  }, [ballSize, paddleHeight])

  // Keyboard handlers
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'w' || e.key === 'W') {
      e.preventDefault()
      leftPaddleDir.current = -1
    } else if (e.key === 's' || e.key === 'S') {
      e.preventDefault()
      leftPaddleDir.current = 1
    } else if (e.key === ' ') {
      e.preventDefault()
      if (!gameState.current.gameActive) startGame()
    } else if (e.key === 'p' || e.key === 'P') {
      e.preventDefault()
      togglePause()
    }
  }, [])

  const handleKeyUp = useCallback((e) => {
    if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S') {
      e.preventDefault()
      leftPaddleDir.current = 0
    }
  }, [])

  // Mouse handlers
  const handleMouseDown = useCallback(
    (e) => {
      const canvas = canvasRef.current
      if (!canvas || !gameState.current.gameActive || isPaused || isFrozen) return

      const rect = canvas.getBoundingClientRect()
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top

      if (mouseX < canvas.width / 2) {
        // Always set mouse down for paddle movement
        isMouseDown.current = true
        // Only start charging if boost enabled
        if (boostEnabled) {
          chargeStartTime.current = Date.now()
          setIsCharging(true)
        }
        gameState.current.leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, mouseY - paddleHeight / 2))
      }
    },
    [isPaused, isFrozen, paddleHeight, boostEnabled],
  )

  const handleMouseMove = useCallback(
    (e) => {
      if (!isMouseDown.current || !gameState.current.gameActive || isPaused || isFrozen) return

      const canvas = canvasRef.current
      if (!canvas) return

      const rect = canvas.getBoundingClientRect()
      const mouseY = e.clientY - rect.top

      gameState.current.leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, mouseY - paddleHeight / 2))
    },
    [isPaused, isFrozen, paddleHeight],
  )

  const handleMouseUp = useCallback(() => {
    if (isMouseDown.current) {
      const holdTime = Date.now() - chargeStartTime.current
      if (!isFrozen) tryApplyBoost(holdTime)
      isMouseDown.current = false
      setIsCharging(false)
    }
  }, [isFrozen])

  const handleMouseLeave = useCallback(() => {
    if (isMouseDown.current) {
      isMouseDown.current = false
      setIsCharging(false)
    }
  }, [])

  // Touch handlers
  const handleTouchStart = useCallback(
    (e) => {
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas || !gameState.current.gameActive || isPaused || isFrozen) return

      const rect = canvas.getBoundingClientRect()
      const touches = e.changedTouches

      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i]
        const touchX = touch.clientX - rect.left
        if (touchX < canvas.width / 2) {
          if (activeTouchId.current === null) {
            // Always set active touch for paddle movement
            activeTouchId.current = touch.identifier
            // Only start charging if boost enabled
            if (boostEnabled) {
              chargeStartTime.current = Date.now()
              setIsCharging(true)
            }
            const touchY = touch.clientY - rect.top
            gameState.current.leftPaddleY = Math.max(
              0,
              Math.min(canvas.height - paddleHeight, touchY - paddleHeight / 2),
            )
          }
          break
        }
      }
    },
    [isPaused, isFrozen, paddleHeight, boostEnabled],
  )

  const handleTouchMove = useCallback(
    (e) => {
      e.preventDefault()
      const canvas = canvasRef.current
      if (!canvas || activeTouchId.current === null || !gameState.current.gameActive || isPaused || isFrozen) return

      const rect = canvas.getBoundingClientRect()
      const touches = e.changedTouches

      for (let i = 0; i < touches.length; i++) {
        const touch = touches[i]
        if (touch.identifier === activeTouchId.current) {
          const touchY = touch.clientY - rect.top
          gameState.current.leftPaddleY = Math.max(0, Math.min(canvas.height - paddleHeight, touchY - paddleHeight / 2))
          break
        }
      }
    },
    [isPaused, isFrozen, paddleHeight],
  )

  const handleTouchEnd = useCallback(
    (e) => {
      e.preventDefault()
      if (activeTouchId.current === null) return

      const touches = e.changedTouches
      for (let i = 0; i < touches.length; i++) {
        if (touches[i].identifier === activeTouchId.current) {
          const holdTime = Date.now() - chargeStartTime.current
          if (!isFrozen) tryApplyBoost(holdTime)
          activeTouchId.current = null
          setIsCharging(false)
          break
        }
      }
    },
    [isFrozen],
  )

  const handleTouchCancel = useCallback((e) => {
    e.preventDefault()
    activeTouchId.current = null
    setIsCharging(false)
  }, [])

  // Check for max hold time (freeze)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameState.current.gameActive || isPaused) return
      if (boostEnabled && isCharging && !isFrozen) {
        const now = Date.now()
        const holdTime = now - chargeStartTime.current
        if (holdTime > maxHoldTime) {
          setIsFrozen(true)
          setIsCharging(false)
          freezeUntil.current = now + freezeCooldown
          isMouseDown.current = false
          activeTouchId.current = null
        }
      }
    }, 100)
    return () => clearInterval(interval)
  }, [isPaused, isCharging, isFrozen, maxHoldTime, freezeCooldown, boostEnabled])

  // Lifecycle and event listeners
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    resizeCanvas()

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd)
    canvas.addEventListener('touchcancel', handleTouchCancel)

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas()
    })
    resizeObserver.observe(canvas.parentElement)

    animationRef.current = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchend', handleTouchEnd)
      canvas.removeEventListener('touchcancel', handleTouchCancel)
      resizeObserver.disconnect()
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [
    handleKeyDown,
    handleKeyUp,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleTouchCancel,
    resizeCanvas,
    gameLoop,
  ])

  return (
    <section id={name} className={'activity activity-' + name + (show ? ' show' : ' hide') + ' fixed'}>
      {!showSettings && <CloseBtn onClick={handleClose} />}
      <div className='peng-game-inner'>
        <div className='peng-game-header'>
          <h1 className='peng-game-title'>Peng</h1>
        </div>
        <div className='score-board'>
          <div className='peng-game-player'>
            <div className='peng-game-player-name'>PLAYER</div>
            <div className='peng-game-player-score'>{scores.left}</div>
          </div>
          <div className='score-board-vs'>vs</div>
          <div className='peng-game-player'>
            <div className='peng-game-player-score'>{scores.right}</div>
            <div className='peng-game-player-name'>
              A.I. {aiSkill === 0 ? 'Easy' : aiSkill === 1 ? 'Hard' : 'Medium'}
            </div>
          </div>
        </div>
        <div className='canvas-wrapper'>
          <canvas ref={canvasRef} className='peng-canvas' />
        </div>

        <div className='button-group'>
          <button className='btn start-button' onClick={startGame}>
            {gameState.current.gameActive ? 'Restart' : 'Start'}
          </button>
          <button className='btn pause-button' onClick={togglePause} disabled={!gameState.current.gameActive}>
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          <button className='btn stop-button' onClick={stopGame} disabled={!gameState.current.gameActive}>
            Stop
          </button>
        </div>

        <div className='button-group'>
          <button className='btn settings-button' onClick={openSettings}>
            <SettingsOutlinedIcon /> Settings
          </button>
        </div>

        {/* Settings Modal */}
        {showSettings && (
          <div className='modal-overlay' onClick={() => setShowSettings(false)}>
            <div className='modal-content' onClick={(e) => e.stopPropagation()}>
              <div className='modal-inner'>
                <div className='game-settings-title'>
                  <h4>Game Settings</h4>
                </div>

                {/* Boost Enable Toggle */}
                <div className='toggle-control' style={{ marginBottom: '1rem' }}>
                  {' '}
                  {/* NEW */}
                  <label>
                    <input
                      type='checkbox'
                      checked={tempBoostEnabled}
                      onChange={(e) => setTempBoostEnabled(e.target.checked)}
                    />
                    <span>Enable Boost / Freeze</span>
                  </label>
                </div>

                <div className='slider-control'>
                  <label>
                    <div>Ball Size: </div>
                    <div>{tempBallSize}</div>
                  </label>

                  <input
                    type='range'
                    min='5'
                    max='30'
                    step='1'
                    value={tempBallSize}
                    onChange={(e) => setTempBallSize(parseInt(e.target.value))}
                  />
                </div>

                <div className='slider-control'>
                  <label>
                    <div>Paddle Width: </div>
                    <div>{tempPaddleWidth}</div>
                  </label>
                  <input
                    type='range'
                    min='5'
                    max={MAX_PADDLE_WIDTH}
                    step='1'
                    value={tempPaddleWidth}
                    onChange={(e) => setTempPaddleWidth(parseInt(e.target.value))}
                  />
                </div>

                <div className='slider-control'>
                  <label>
                    <div>Paddle Height: </div>
                    <div>{tempPaddleHeight}</div>
                  </label>
                  <input
                    type='range'
                    min='50'
                    max={MAX_PADDLE_HEIGHT}
                    step='5'
                    value={tempPaddleHeight}
                    onChange={(e) => setTempPaddleHeight(parseInt(e.target.value))}
                  />
                </div>

                <div className='slider-control'>
                  <label>
                    <div> Ball Speed:</div>
                    <div>{tempSpeedFactor.toFixed(1)}x</div>
                  </label>
                  <input
                    type='range'
                    min='0.5'
                    max='2.0'
                    step='0.1'
                    value={tempSpeedFactor}
                    onChange={(e) => setTempSpeedFactor(parseFloat(e.target.value))}
                  />
                </div>

                <div className='slider-control'>
                  <label>
                    <div>AI Skill:</div>
                    <div>{tempAiSkill === 0 ? 'Easy' : tempAiSkill === 1 ? 'Hard' : 'Medium'}</div>
                  </label>
                  <input
                    type='range'
                    min='0'
                    max='1'
                    step='0.5'
                    value={tempAiSkill}
                    onChange={(e) => setTempAiSkill(parseFloat(e.target.value))}
                  />
                </div>

                <div className='slider-control'>
                  <label>
                    <div>Max Hold Time:</div>
                    <div> {tempMaxHold / 1000} s</div>
                  </label>
                  <input
                    type='range'
                    min='500'
                    max='3000'
                    step='50'
                    value={tempMaxHold}
                    onChange={(e) => setTempMaxHold(parseInt(e.target.value))}
                    disabled={!tempBoostEnabled}
                  />
                </div>

                <div className='slider-control'>
                  <label>
                    <div>Freeze Cooldown: </div>
                    <div>{tempFreeze / 1000} s</div>
                  </label>
                  <input
                    type='range'
                    min='300'
                    max='2000'
                    step='50'
                    value={tempFreeze}
                    onChange={(e) => setTempFreeze(parseInt(e.target.value))}
                    disabled={!tempBoostEnabled}
                  />
                </div>

                <div className='instructions-modal'>
                  <h4>Instructions</h4>
                  <div>
                    <p>Desktop keys:</p>
                    <p> W/S move, Space start, P pause.</p>
                  </div>
                  <div>
                    <p>Mobile:</p>
                    <p> Touch‑hold left half to move.</p>
                  </div>
                  {tempBoostEnabled ? ( // NEW conditional instructions
                    <>
                      <div>
                        <p>Click‑hold left half to charge (yellow).</p>
                      </div>
                      <div>
                        <p>Release while touching ball to boost (fixed {BOOST_MULTIPLIER}x force).</p>
                      </div>
                      <div>
                        <p>Hold longer than max hold time → paddle freezes (grey) for cooldown.</p>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p>Boost/Freeze feature is disabled.</p>
                    </div>
                  )}
                </div>

                <div className='modal-buttons'>
                  <button className='apply-button' onClick={applySettings}>
                    <DoneIcon />
                  </button>
                  <button className='reset-button' onClick={resetSettings}>
                    <RestartAltOutlinedIcon />
                  </button>
                  <button className='cancel-button' onClick={() => setShowSettings(false)}>
                    <CloseOutlinedIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default pengGameAI
