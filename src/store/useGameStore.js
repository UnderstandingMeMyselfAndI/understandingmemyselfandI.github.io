import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
// import { idbEncryptedStorage } from '../utils/idbEncryptedStorage'
import { del, get, set, clear } from 'idb-keyval'

// Default values for Peng game
// Default values for Peng game
const defaultBallSize = 20
const defaultPaddleWidth = 20
const defaultPaddleHeight = 140
const defaultSpeedFactor = 1.0
const defaultAiSkill = 0.5
const defaultMaxHoldTime = 1500      // ms
const defaultFreezeCooldown = 1000   // ms
const defaultBoostEnabled = false
const defaultPlayerSide = false       // false = left, true = right
const defaultTouchAreaWidthMultiplier = 2.0   // NEW
const defaultTouchAreaVerticalExtra = 40       // NEW



const indexedDBStorage = {
  getItem: async (name) => {
    return (await get(name)) || null
  },
  setItem: async (name, value) => {
    await set(name, value)
  },
  removeItem: async (name) => {
    await del(name)
  },
}

export const useGameStore = create(   // renamed from usePlannerStore
  persist(
    (set, get) => ({
      // Game settings
      ballSize: defaultBallSize,
      paddleWidth: defaultPaddleWidth,
      paddleHeight: defaultPaddleHeight,
      speedFactor: defaultSpeedFactor,
      aiSkill: defaultAiSkill,
      maxHoldTime: defaultMaxHoldTime,
      freezeCooldown: defaultFreezeCooldown,
      boostEnabled: defaultBoostEnabled,
      isPlayerRight: defaultPlayerSide,
      touchAreaWidthMultiplier: defaultTouchAreaWidthMultiplier,   // NEW
      touchAreaVerticalExtra: defaultTouchAreaVerticalExtra,       // NEW
      // Individual setters
      setBallSize: (value) => set({ ballSize: value }),
      setPaddleWidth: (value) => set({ paddleWidth: value }),
      setPaddleHeight: (value) => set({ paddleHeight: value }),
      setSpeedFactor: (value) => set({ speedFactor: value }),
      setAiSkill: (value) => set({ aiSkill: value }),
      setMaxHoldTime: (value) => set({ maxHoldTime: value }),
      setFreezeCooldown: (value) => set({ freezeCooldown: value }),
      setBoostEnabled: (value) => set({ boostEnabled: value }),
      setIsPlayerRight: (value) => set({ isPlayerRight: value }),
      setTouchAreaWidthMultiplier: (value) => set({ touchAreaWidthMultiplier: value }), // NEW
      setTouchAreaVerticalExtra: (value) => set({ touchAreaVerticalExtra: value }),     // NEW

      // Bulk update
      setSettings: (settings) => set(settings),

      // Reset all settings to defaults
// Reset all settings to defaults
      resetSettings: () => set({
        ballSize: defaultBallSize,
        paddleWidth: defaultPaddleWidth,
        paddleHeight: defaultPaddleHeight,
        speedFactor: defaultSpeedFactor,
        aiSkill: defaultAiSkill,
        maxHoldTime: defaultMaxHoldTime,
        freezeCooldown: defaultFreezeCooldown,
        boostEnabled: defaultBoostEnabled,
        isPlayerRight: defaultPlayerSide,
        touchAreaWidthMultiplier: defaultTouchAreaWidthMultiplier,
        touchAreaVerticalExtra: defaultTouchAreaVerticalExtra,
      }),yerRight: defaultPlayerSide,

    }),
    {
      name: 'ummi-game-store',
      storage: createJSONStorage(() => indexedDBStorage),
    },
  ),
)