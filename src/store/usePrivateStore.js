// Encrypted personal data store. Sensitive fields only.
// Hydrates from ummi-db/settings/app after vault unlock.

import { create } from 'zustand'
import { loadApp, saveApp } from '@utils/settingsStorage'

const DEFAULTS = {
  // Tools
  userToolIDs: [],
  yourToolsEnabled: true,
  toolboxFilterEnabled: true,
  filterTools: false,
  toolsEnabled: true,
  

  // Wheel of Life
  wheelHistory: [],
  rememberWheels: false,
  wheelOfLifeEnabled: true,

  // Feature flags (personal choices about which features to use)
  daysCounterEnabled: true,
  quizEnabled: true,
  unitsCalculatorEnabled: true,
}

const INITIAL = {
  status: 'idle',
  error: null,
  hydrated: false,
  ...DEFAULTS,
}

const PERSISTED_FIELDS = Object.keys(DEFAULTS)

function pickPersisted(state) {
  const out = {}
  for (const k of PERSISTED_FIELDS) out[k] = state[k]
  return out
}

export const usePrivateStore = create((set, get) => {
  const persist = async () => {
    try {
      await saveApp(pickPersisted(get()))
    } catch (err) {
      console.error('[usePrivateStore] persist failed:', err)
    }
  }

  const update = (patch) => {
    set(patch)
    persist()
  }

  return {
    ...INITIAL,

    hydrate: async () => {
      if (get().status === 'loading') return
      set({ status: 'loading', error: null })
      try {
        const app = (await loadApp()) ?? DEFAULTS
        set((s) => ({
          ...s,
          ...DEFAULTS,
          ...app,
          status: 'ready',
          hydrated: true,
        }))
      } catch (err) {
        set({ status: 'error', error: String(err?.message || err) })
      }
    },

    reset: () => set({ ...INITIAL }),

    // --- Tools -----------------------------------------------------------
    setFilterTools: (v) => update({ filterTools: v }),
    setToolIDs: (ids) => update({ userToolIDs: ids }),
    addTool: (id) => {
      if (get().userToolIDs.includes(id)) return
      update({ userToolIDs: [...get().userToolIDs, id] })
    },
    removeTool: (id) => {
      update({ userToolIDs: get().userToolIDs.filter((t) => t !== id) })
    },
    getActiveToolIDs: () => get().userToolIDs,
    enableYourTools: (v) => update({ yourToolsEnabled: v }),
    enableToolboxFilter: (v) => update({ toolboxFilterEnabled: v }),
    enableTools: (v) => update({ toolsEnabled: v }),

    // --- Wheel of Life ---------------------------------------------------

    setRememberWheels: (v) => update({ rememberWheels: v }),
    enableWheelOfLife: (v) => update({ wheelOfLifeEnabled: v }),
    saveWheelEntry: (entry) => {
      update({
        wheelHistory: [...get().wheelHistory, { ...entry, date: new Date().toISOString() }],
      })
    },
    removeWheelEntry: (index) => {
      update({ wheelHistory: get().wheelHistory.filter((_, i) => i !== index) })
    },
    clearWheelHistory: () => update({ wheelHistory: [] }),

    // --- Feature flags ---------------------------------------------------

    enableDaysCounter: (v) => update({ daysCounterEnabled: v }),
    enableQuiz: (v) => update({ quizEnabled: v }),
    enableUnitsCalculator: (v) => update({ unitsCalculatorEnabled: v }),
  }
})

export default usePrivateStore
