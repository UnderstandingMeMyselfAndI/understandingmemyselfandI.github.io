// Encrypted personal data store. Sensitive fields only.
// Hydrates from ummi-db/settings/app after vault unlock.

import { create } from 'zustand'
import { loadApp, saveApp } from '@utils/settingsStorage'

const DEFAULTS = {
  userToolIDs: [],
  wheelHistory: [],
  rememberWheels: false,
}

const INITIAL = {
  status: 'idle',
  error: null,
  hydrated: false,
  ...DEFAULTS,
}

export const usePrivateStore = create((set, get) => {
  const persist = async () => {
    const { userToolIDs, wheelHistory, rememberWheels } = get()
    try {
      await saveApp({ userToolIDs, wheelHistory, rememberWheels })
    } catch (err) {
      console.error('[usePrivateStore] persist failed:', err)
    }
  }

  return {
    ...INITIAL,

    hydrate: async () => {
      if (get().status === 'loading') return
      set({ status: 'loading', error: null })
      try {
        const app = (await loadApp()) ?? DEFAULTS
        set({
          status: 'ready',
          hydrated: true,
          userToolIDs: app.userToolIDs ?? DEFAULTS.userToolIDs,
          wheelHistory: app.wheelHistory ?? DEFAULTS.wheelHistory,
          rememberWheels: app.rememberWheels ?? DEFAULTS.rememberWheels,
        })
      } catch (err) {
        set({ status: 'error', error: String(err?.message || err) })
      }
    },

    reset: () => set({ ...INITIAL }),

    // --- userToolIDs ---
    setToolIDs: async (ids) => {
      set({ userToolIDs: ids })
      await persist()
    },
    addTool: async (id) => {
      if (get().userToolIDs.includes(id)) return
      set({ userToolIDs: [...get().userToolIDs, id] })
      await persist()
    },
    removeTool: async (id) => {
      set({ userToolIDs: get().userToolIDs.filter((t) => t !== id) })
      await persist()
    },
    getActiveToolIDs: () => get().userToolIDs,

    // --- wheelHistory ---
    setRememberWheels: async (v) => {
      set({ rememberWheels: v })
      await persist()
    },
    saveWheelEntry: async (entry) => {
      set((s) => ({
        wheelHistory: [...s.wheelHistory, { ...entry, date: new Date().toISOString() }],
      }))
      await persist()
    },
    removeWheelEntry: async (index) => {
      set((s) => ({ wheelHistory: s.wheelHistory.filter((_, i) => i !== index) }))
      await persist()
    },
    clearWheelHistory: async () => {
      set({ wheelHistory: [] })
      await persist()
    },
  }
})

export default usePrivateStore
