import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { del, get, set, clear } from 'idb-keyval'
//TODO #39 Integrate persistent storage - https://whatpwacando.today/storage

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

// TODO[x]: #20 Implement short names for brevity in storage
const useAppStore = create(
  persist(
    (set, get) => ({
      // --- WHEEL OF LIFE HISTORY ---
      wheelHistory: [],
      rememberWheels: false,

      setRememberWheels: (v) => set(() => ({ rememberWheels: v })),

      saveWheelEntry: (entry) =>
        set((state) => ({
          wheelHistory: [
            ...state.wheelHistory,
            { ...entry, date: new Date().toISOString() },
          ],
        })),

      removeWheelEntry: (index) =>
        set((state) => ({
          wheelHistory: state.wheelHistory.filter((_, i) => i !== index),
        })),

      clearWheelHistory: () => set(() => ({ wheelHistory: [] })),
      // -----------------------------
      // ----------------------------------------
      // Last Version Check
      lvc: '',
      /**
       * Sets the last version check date to the given value.
       * @param {string} v The date to set as the last version check date.
       */
      setLVC: (v) => {
        set(() => ({ lvc: v }))
      },
      lastVersionCheck: '',
      setLastVersionCheck: (v) => {
        set(() => ({ lastVersionCheck: v }))
        set(() => ({ lvc: v }))
      },
      // ----------------------------------------
      // Version
      isModal: false,
      setIsModal: (v) => set(() => ({ isModal: v })),
      // ----------------------------------------
      // Version
      version: '',
      setVersion: (v) => set(() => ({ version: v })),

      // ----------------------------------------
      // Subscribed to Newsletter
      nss: false, // subscribed to newsletter
      setNSS: (v) => set(() => ({ nss: v })),
      // ----------------------------------------
      // Is Installable
      ins: true,
      setIns: (v) => set(() => ({ ins: v })),

      isInstallable: true,
      setIsInstallable: (v) => {
        set(() => ({ isInstallable: v }))
        set(() => ({ ins: v }))
      },
      // ----------------------------------------
      // Is Installed
      isisn: false,
      setIsISN: (v) => set(() => ({ isisn: v })),
      isInstalled: false,
      setIsInstalled: (v) => {
        set(() => ({ isInstalled: v }))
        set(() => ({ isisn: v }))
      },
      // ----------------------------------------

      // ----------------------------------------
      // Need Update
      nu: false,
      setNU: (v) => set(() => ({ nu: v })),
      needUpdate: false,
      setNeedUpdate: (v) => {
        set({ needUpdate: v })
        set({ nu: v })
      },
      // ----------------------------------------
      // Show Phrase Views
      spv: false,
      setSpv: (v) => set({ spv: v }), //showPhraseViews
      // ----------------------------------------
      // Visit Count
      vc: 0,
      setVC: (v) => {
        set(() => ({ vc: v }))
      },

      incVC: () => {
        set((state) => ({ vc: state.vc + 1 }))
      },
      // ----------------------------------------
      // Last Visit Date
      lvd: 0,
      setLVD: (v) => {
        set(() => ({ lvd: v }))
      },
      // ----------------------------------------
      // First Visit Date
      fvd: 0,
      setFVD: (v) => {
        set((state) => ({ fvd: state.vc === 1 ? v : state.fvd }))
      },
      // ----------------------------------------
      // Increment Visit
      vsts: 0,
      incVSTS: () => {
        set((state) => ({ vsts: state.vsts + 1 }))
      },
      // ----------------------------------------
      // Phrases
      p: [],
      setP: (v) => {
        set(() => ({ p: v }))
      },

      phrase: '',
      setPhrase: (v) => {
        set(() => ({ phrase: v }))
        set(() => ({ p: v }))
      },
      // ----------------------------------------
      // Days Counter
      dc: true,
      setDc: (v) => {
        set(() => ({ dc: v }))
      },
      daysCounterEnabled: true,
      enableDaysCounter: (v) => {
        set(() => ({ daysCounterEnabled: v }))
        set(() => ({ dc: v }))
      },
      // ----------------------------------------
      // Wheel Of Life
      wol: true,
      wheelOfLifeEnabled: true,
      emableWheelOfLife: (v) => {
        set(() => ({ wheelOfLifeEnabled: v }))
        set(() => ({ wol: v }))
      },
      // ----------------------------------------
      // Quiz
      quizEnabled: true,
      enableQuiz: (v) => {
        set(() => ({ quiz: v }))
      },        
      // ----------------------------------------
      // Units Calculator
      uc: true,
      setUc: (v) => {
        set(() => ({ uc: v }))
      },
      unitsCalculatorEnabled: true,
      enableUnitsCalculator: (v) => {
        set(() => ({ unitsCalculatorEnabled: v }))
        set(() => ({ uc: v }))
      },
      // ----------------------------------------
      // Tools
      tls: true,
      setTls: (v) => {
        set(() => ({ tls: v }))
      },
      toolsEnabled: true,
      enableTools: (v) => {
        set(() => ({ toolsEnabled: v }))
        set(() => ({ tls: v }))
      },
      // ----------------------------------------
      // Toolbox Filter
      tf: true,
      setTf: (v) => {
        set(() => ({ tf: v }))
      },
      toolboxFilterEnabled: true,
      enableToolboxFilter: (v) => {
        set(() => ({ toolboxFilterEnabled: v }))
        set(() => ({ tf: v }))
      },
      // ----------------------------------------
      // Your Tools
      yt: true,
      setYt: (v) => {
        set(() => ({ yt: v }))
      },
      yourToolsEnabled: true,
      enableYourTools: (v) => {
        set(() => ({ yourToolsEnabled: v }))
        set(() => ({ yt: v }))
      },
      // ----------------------------------------
      // PIN Lock
      pl: true,
      setPl: (v) => {
        set(() => ({ pl: v }))
      },
      PINLockEnabled: true,
      enablePINLock: (v) => {
        set(() => ({ PINLockEnabled: v }))
        set(() => ({ pl: v }))
      },
      // ----------------------------------------
      // Quick Exit
      qe: true,
      setQe: (v) => {
        set(() => ({ qe: v }))
      },
      quickExitEnabled: true,
      enableQuickExit: (v) => {
        set(() => ({ quickExitEnabled: v }))
        set(() => ({ qe: v }))
      },
      // ----------------------------------------
      // Quick Exit Message
      qem: true,
      setQem: (v) => {
        set(() => ({ qem: v }))
      },
      quickExitMessageEnabled: true,
      enableQuickExitMessage: (v) => {
        set(() => ({ quickExitMessageEnabled: v }))
        set(() => ({ qem: v }))
      },
      // ----------------------------------------
      // Quick Exit URL
      qeu: '',
      setQeu: (v) => {
        set(() => ({ qeu: v }))
      },
      quickExitURL: 'https://google.com',
      setQuickExitURL: (v) => {
        set(() => ({ quickExitURL: v }))
        set(() => ({ qeu: v }))
      },
      // ----------------------------------------
      // Allow Cookies
      c: true,
      setC: (v) => {
        set(() => ({ c: v }))
      },
      allowCookies: true,
      setAllowCookies: (v) => {
        set(() => ({ allowCookies: v }))
        set(() => ({ c: v }))
      },
      // ----------------------------------------
      // Allow Third Party Cookies
      tpc: true,
      setTPC: (v) => {
        set(() => ({ tpc: v }))
      },
      allowThirdPartyCookies: true,
      setAllowThirdPartyCookies: (v) => {
        set(() => ({ allowThirdPartyCookies: v }))
        set(() => ({ tpc: v }))
      },
      // ----------------------------------------
      // User Tool IDs
      userToolIDs: [],
      setToolIDs: (v) => set(() => ({ userToolIDs: v })),
      // ----------------------------------------
      // Adds an ID only if it doesn't already exist (prevents duplicates)
      addTool: (v) =>
        set((state) => ({
          userToolIDs: state.userToolIDs.includes(v)
            ? state.userToolIDs
            : [...state.userToolIDs, v],
        })),

      // Removes a specific ID from the array
      removeTool: (v) =>
        set((state) => ({
          userToolIDs: state.userToolIDs.filter((toolId) => toolId !== v),
        })),
      // ----------------------------------------
      // Returns an array of active tool IDs
      getActiveToolIDs: () => {
        return get().userToolIDs
      },
      // ----------------------------------------
      // Tools in views
      toolsInView: false,
      setToolsInView: (v) => set(() => ({ toolsInView: v })),
      // ----------------------------------------
      // Is mobile
      isMobile: false,
      setIsMobile: (v) => set(() => ({ isMobile: v })),
      // ----------------------------------------
      // Message
      message: '',
      setMessage: (v) => set(() => ({ message: v })),
      // ----------------------------------------
      // Snackbar
      showSnackbar: false,
      setShowSnackbar: (v) => set(() => ({ showSnackbar: v })),
      // ----------------------------------------
      // Activity ID
      activity: -1,
      setActivity: (v) => {
        // console.trace(`setActivity called with value: ${v}`)
        set(() => ({ activity: v }))
      },
      // ----------------------------------------
      // Activity Data
      childRoute: [],
      setChildRoute: (v) => set(() => ({ childRoute: v })),
      // ----------------------------------------
      // Activity Data
      accData: [],
      setAccData: (v) => set(() => ({ accData: v })),
      // ----------------------------------------
      // Activity Data
      showToolsOnly: false,
      setShowToolsOnly: (v) => set(() => ({ showToolsOnly: v })),
      // ----------------------------------------
      // Toggles showToolsOnly
      toggleShowToolsOnly: () =>
        set((state) => ({ showToolsOnly: !state.showToolsOnly })),

      // ----------------------------------------
      // Acronym ID
      acronymID: -1,
      setAcronymID: (v) => set(() => ({ acronymID: v })),
      // ----------------------------------------
      // Scroll Stage
      scrollStage: 0,
      setScrollStage: (v) => set(() => ({ scrollStage: v })),
      // ----------------------------------------
      // Show Acronym Card
      showAccCard: false,
      setShowAccCard: (v) => {
        // console.trace(`setShowAccCard called with value: ${show}`);
        set(() => ({ showAccCard: v }))
      },
      // ----------------------------------------
      // Show Acronym Card
      showQuickExitOnboarding: true,
      setShowQuickExitOnboarding: (v) => {
        // console.trace(`setShowAccCard called with value: ${show}`);
        set(() => ({ showQuickExitOnboarding: v }))
      },
      // ----------------------------------------
      // analytics enabled
      gae: true,
      setGAE: (v) => set(() => ({ gae: v })),
      // ----------------------------------------
      // Clear IDB
      clearIDB: async () => {
        await clear()
        // console.log('IndexedDB cleared');
        window.location.reload()
      },
      // ----------------------------------------
      // Exit Button Position
      exitButtonPosition: { x: 60, y: window.innerHeight - 60 },
      setExitButtonPosition: (v) => set(() => ({ exitButtonPosition: v })),
      // ----------------------------------------
      // ----------------------------------------
      // Age Verified
      ageVerified: false,
      setAgeVerified: (v) => set(() => ({ ageVerified: v })),
      // ----------------------------------------
      // ----------------------------------------
      // Hydration Status (Internal)
      _hasHydrated: false,
      setHasHydrated: (v) => set(() => ({ _hasHydrated: v })),
      // ----------------------------------------
      // ----------------------------------------
      theme: 'system', // 'light', 'dark', 'system', 'high-contrast'
      textScale: 100, // Percentage (e.g., 100 = 16px, 125 = 20px)

      setTheme: (theme) => set({ theme }),
      setTextScale: (scale) => set({ textScale: scale }),
      // ----------------------------------------
      // ----------------------------------------
    }),
    {
      name: 'ummi',
      storage: createJSONStorage(() => indexedDBStorage),
      // Keys to persist in localStorage
      partialize: (state) => ({
        theme: state.theme,
        textScale: state.textScale,
        ageVerified: state.ageVerified,
        wol: state.wol,
        wheelOfLifeEnabled: state.wheelOfLifeEnabled,
        quizEnabled: state.quizEnabled,
        dc: state.dc,
        daysCounterEnabled: state.daysCounterEnabled,
        uc: state.uc,
        unitsCalculatorEnabled: state.unitsCalculatorEnabled,
        tf: state.tf,
        toolboxFilterEnabled: state.toolboxFilterEnabled,
        yt: state.yt,
        yourToolsEnabled: state.yourToolsEnabled,
        pl: state.pl,
        PINLockEnabled: state.PINLockEnabled,
        qe: state.qe,
        quickExitEnabled: state.quickExitEnabled,
        qem: state.qem,
        quickExitMessageEnabled: state.quickExitMessageEnabled,
        c: state.c,
        allowCookies: state.allowCookies,
        tpc: state.tpc,
        allowThirdPartyCookies: state.allowThirdPartyCookies,
        exitButtonPosition: state.exitButtonPosition,

        // usePINLock: state.usePINLock,
        isins: state.isins,
        isInstallable: state.isInstallable,
        ins: state.ins,
        isInstalled: state.isInstalled,
        tls: state.tls,
        vc: state.vc,
        lvd: state.lvd,
        fvd: state.fvd,
        nss: state.nss,
        version: state.version,
        lvc: state.lvc,
        lastVersionCheck: state.lastVersionCheck,
        spv: state.spv,
        gae: state.gae,

        wheelHistory: state.wheelHistory,
        rememberWheels: state.rememberWheels,
        showQExitOnboarding: state.showQExitOnboarding,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)

          // Apply the saved theme and scale immediately
          const root = document.documentElement
          const theme = state.theme || 'system'
          const scale = state.textScale || 100

          root.classList.add(theme)
          root.style.fontSize = `${(scale / 100) * 16}px`
        }
      },
    },
  ),
)

export default useAppStore