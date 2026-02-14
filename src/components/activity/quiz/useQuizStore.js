// useQuizStore.js (updated with play count)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useQuizStore = create(
  persist(
    (set, get) => ({
      playCount: 0, // total number of times the quiz has been completed
      scores: {}, // { easy: bestScore, medium: bestScore, ... }
      history: [], // [{ date, level, score, total, accuracy }]
      optIn: false, // whether the user wants to record scores

      setOptIn: (optIn) => set({ optIn }),

      incrementPlayCount: () =>
        set((state) => ({ playCount: state.playCount + 1 })),

      getPlayCount: () => get().playCount,

      saveScore: (level, newScore) =>
        set((state) => {
          const prevScore = state.scores[level] || 0
          return {
            scores: {
              ...state.scores,
              [level]: Math.max(prevScore, newScore),
            },
          }
        }),

      addToHistory: (entry) =>
        set((state) => ({
          history: [
            ...state.history,
            { ...entry, date: new Date().toISOString() },
          ],
        })),
    }),
    {
      name: 'ummi-quiz',
    },
  ),
)

export default useQuizStore
