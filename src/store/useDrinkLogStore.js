import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { storeData, retrieveData } from '@js/utils/secureStorage'

export const useDrinkLogStore = create(
  persist(
    (set) => ({
      drinks: [],
      isUnlocked: false, //  track unlock state
      addDrink: (drink) => set((s) => ({ drinks: [...s.drinks, drink] })),
      removeDrink: (id) =>
        set((s) => ({ drinks: s.drinks.filter((d) => d.id !== id) })),
      clearDay: (date) =>
        set((s) => ({ drinks: s.drinks.filter((d) => d.date !== date) })),
      clearAll: () => set({ drinks: [] }),

      //  helper actions for unlock
      unlock: () => set({ isUnlocked: true }),
      lock: () => set({ isUnlocked: false }),
    }),
    {
      name: 'drink-log-store',
      storage: createJSONStorage(() => ({
        getItem: retrieveData,
        setItem: storeData,
        removeItem: async (key) => {
          await storeData(key, null)
        },
      })),
    },
  ),
)
