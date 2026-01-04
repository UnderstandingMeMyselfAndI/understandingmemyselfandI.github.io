// useQuizStore.js (updated with play count)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useQuizStore = create(
	persist(
		(set, get) => ({
			playCount: 0, // total number of times the quiz has been completed
			scores: {}, // { easy: bestScore, medium: bestScore, ... }

			incrementPlayCount: () => set((state) => ({ playCount: state.playCount + 1 })),

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
		}),
		{
			name: 'ummi-quiz',
		},
	),
)

export default useQuizStore
