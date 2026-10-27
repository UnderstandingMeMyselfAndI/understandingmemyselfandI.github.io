// Plaintext app-wide state. Non-sensitive fields only.
// Persisted to ummi-db/settings/config (plaintext, JSON).
// Sensitive fields live in usePrivateStore (encrypted).

import { create } from "zustand"
import { loadConfig, saveConfig } from "@utils/settingsStorage"

const DEFAULTS = {
  // Theme & accessibility
  theme: "system",
  textScale: 100,

  // Safety-critical flags — must be readable before unlock.
  quickExitEnabled: true,
  quickExitMessageEnabled: true,

  // Consent / onboarding
  allowCookies: true,
  allowThirdPartyCookies: true,
  showQuickExitOnboarding: true,

  // Appearance
  showBurgerStack: true,

  // Version / newsletter
  version: "",
  lastVersionCheck: "",
  nss: false,

  // Install
  isInstallable: true,
  isInstalled: false,

  // Visit tracking
  vc: 0,
  lvd: 0,
  fvd: 0,

  // Misc
  spv: false,
  gae: true,
  currency: "USD",

  // Quick exit
  quickExitURL: "https://google.com",
  exitButtonPosition: null,

  // Age gate
  ageVerified: false,
}

const PERSISTED_FIELDS = Object.keys(DEFAULTS)

const EPHEMERAL = {
  _hasHydrated: false,
  menuCarouselPosition: null,
  isModal: false,
  message: "",
  messageId: 0,
  snackbarAction: null,
  showSnackbar: false,
  passcodeDialogRequest: 0,
  activity: -1,
  childRoute: [],
  accData: [],
  showToolsOnly: false,
  acronymID: -1,
  scrollStage: 0,
  showAccCard: false,
  toolsInView: false,
  isMobile: false,
  p: [],
  phrase: "",
  needUpdate: false,
  nu: false,
  vsts: 0,
}

function pickPersisted(state) {
  const out = {}
  for (const k of PERSISTED_FIELDS) out[k] = state[k]
  return out
}

export const useAppStore = create((set, get) => {
  const persist = async () => {
    try {
      await saveConfig(pickPersisted(get()))
    } catch (err) {
      console.error("[useAppStore] persist failed:", err)
    }
  }

  const update = (patch) => {
    set(patch)
    persist()
  }

  return {
    ...DEFAULTS,
    ...EPHEMERAL,

    hydrate: async () => {
      try {
        const config = await loadConfig()
        if (config) set((s) => ({ ...s, ...config, _hasHydrated: true }))
        else set({ _hasHydrated: true })
      } catch (err) {
        console.error("[useAppStore] hydrate failed:", err)
        set({ _hasHydrated: true })
      }
    },

    setHasHydrated: (v) => set({ _hasHydrated: v }),

    // --- persisted mutators ----------------------------------------------

    setTheme: (v) => update({ theme: v }),
    setTextScale: (v) => update({ textScale: v }),

    enableQuickExit: (v) => update({ quickExitEnabled: v }),
    enableQuickExitMessage: (v) => update({ quickExitMessageEnabled: v }),

    setAllowCookies: (v) => update({ allowCookies: v }),
    setAllowThirdPartyCookies: (v) => update({ allowThirdPartyCookies: v }),
    setShowQuickExitOnboarding: (v) => update({ showQuickExitOnboarding: v }),

    setShowBurgerStack: (v) => update({ showBurgerStack: v }),

    setVersion: (v) => update({ version: v }),
    setLastVersionCheck: (v) => update({ lastVersionCheck: v }),
    setNSS: (v) => update({ nss: v }),

    setIsInstallable: (v) => update({ isInstallable: v }),
    setIsInstalled: (v) => update({ isInstalled: v }),

    setVC: (v) => update({ vc: v }),
    incVC: () => update({ vc: get().vc + 1 }),
    setLVD: (v) => update({ lvd: v }),
    setFVD: (v) => {
      if (get().vc === 1) update({ fvd: v })
    },

    setSpv: (v) => update({ spv: v }),
    setGAE: (v) => update({ gae: v }),
    setCurrency: (v) => update({ currency: v }),

    setQuickExitURL: (v) => update({ quickExitURL: v }),
    setExitButtonPosition: (v) => update({ exitButtonPosition: v }),

    setAgeVerified: (v) => update({ ageVerified: v }),

    // --- shorthand aliases (backwards compatibility) ---------------------

    setSqeo: (v) => get().setShowQuickExitOnboarding(v),
    setQeu: (v) => get().setQuickExitURL(v),
    setQe: (v) => get().enableQuickExit(v),
    setQem: (v) => get().enableQuickExitMessage(v),
    setC: (v) => get().setAllowCookies(v),
    setTPC: (v) => get().setAllowThirdPartyCookies(v),
    setIns: (v) => get().setIsInstallable(v),
    setIsISN: (v) => get().setIsInstalled(v),
    setLVC: (v) => get().setLastVersionCheck(v),
    // Removed: setDc, setSs, setTls, setTf, setYt (moved to usePrivateStore)
    // Removed: setPl (PINLockEnabled deleted)

    // --- ephemeral mutators (no persist) ---------------------------------
    setMenuCarouselPosition: (v) => set({ menuCarouselPosition: v }),
    setIsModal: (v) => set({ isModal: v }),
    setMessage: (v) => set((s) => ({ message: v, messageId: s.messageId + 1 })),
    clearSnackbar: () => set({ message: "", snackbarAction: null }),
    setShowSnackbar: (v) => set({ showSnackbar: v }),
    setSnackbarAction: (v) => set({ snackbarAction: v }),
    requestPasscodeDialog: () => set((s) => ({ passcodeDialogRequest: s.passcodeDialogRequest + 1 })),
    setActivity: (v) => set({ activity: v }),
    setChildRoute: (v) => set({ childRoute: v }),
    setAccData: (v) => set({ accData: v }),
    setShowToolsOnly: (v) => set({ showToolsOnly: v }),
    toggleShowToolsOnly: () => set((s) => ({ showToolsOnly: !s.showToolsOnly })),
    setAcronymID: (v) => set({ acronymID: v }),
    setScrollStage: (v) => set({ scrollStage: v }),
    setShowAccCard: (v) => set({ showAccCard: v }),
    setToolsInView: (v) => set({ toolsInView: v }),
    setIsMobile: (v) => set({ isMobile: v }),
    setP: (v) => set({ p: v }),
    setPhrase: (v) => set({ phrase: v, p: v }),
    setNeedUpdate: (v) => set({ needUpdate: v }),
    setNU: (v) => set({ nu: v }),
    incVSTS: () => set((s) => ({ vsts: s.vsts + 1 })),

    clearIDB: async () => {
      // 1. Legacy keyval store
      const { clear: clearKeyval } = await import("idb-keyval")
      await clearKeyval()

      // 2. ummi-db — Small Wins entries, people, and settings
      const { deleteAllData } = await import("@utils/smallWinsStorage")
      const { clearAllSettings } = await import("@utils/settingsStorage")
      const { resetDbConnection } = await import("@utils/db")

      await deleteAllData()
      await clearAllSettings()
      resetDbConnection()

      // 3. Wipe in-memory stores so the UI immediately reflects "empty"
      const { useSmallWinsStore } = await import("@store/useSmallWinsStore")
      const { usePrivateStore } = await import("@store/usePrivateStore")
      useSmallWinsStore.getState().reset()
      usePrivateStore.getState().reset()

      // 4. Force a full reload so hydration re-runs from the now-empty state
      window.location.reload()
    },
  }
})

export default useAppStore
