import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { idbEncryptedStorage } from "../utils/idbEncryptedStorage";

export const usePlannerStore = create(
  persist(
    (set) => ({
      plans: [],
      addPlan: (plan) => set((s) => ({ plans: [...s.plans, plan] })),
      removePlan: (id) => set((s) => ({ plans: s.plans.filter((p) => p.id !== id) })),
      clearAll: () => set({ plans: [] }),
    }),
    {
      name: "future-planner-store",
      storage: createJSONStorage(() => idbEncryptedStorage),
    }
  )
);
