import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(
	persist(
		(set, get) => ({
			toolAdded: false,
			activity: 0,
			scrollStage: 0,
			acronymID: 0,
			active: false,
			showAccCard: false,
			isMobile: false,
			showToolsOnly: false,
			userToolIDs: [],
			accData: [],
			message: '',
			showSnackbar: false,
			lastVersionCheck: '',
			setLastVersionCheck: (value) => set(() => ({ lastVersionCheck: value })),
			version: '',
			setVersion: (version) => set(() => ({ version: version })),
			nss: false, // subscribed to newsletter
			setNSS: (value) => set(() => ({ nss: value })),
			isInstallable: true,
			setIsInstallable: (value) => set(() => ({ isInstallable: value })),
			isInstalled: false,
			setIsInstalled: (isInstalled) => set(() => ({ isInstalled: isInstalled })),
			toolsInView: false,
			needUpdate: false,
			setNeedUpdate: (value) => set({ needUpdate: value }),
			vc: 0, //visit count
			setVC: (v) => {
				set(() => ({ vc: v }))
			},
			incVC: () => {
				set((state) => ({ vc: state.vc + 1 }))
			},
			lvd: 0, //last visit date
			setLVD: (v) => {
				set(() => ({ lvd: v }))
			},
			fvd: 0, //first visit date
			setFVD: (v) => {
				set((state) => ({ fvd: state.vc === 1 ? v : state.fvd }))
			},

			daysCounterEnabled: true,
			enableDaysCounter: (show) => {
				set(() => ({ daysCounterEnabled: show }))
			},
			toolboxFilterEnabled: true,
			enableToolboxFilter: (show) => {
				set(() => ({ toolboxFilterEnabled: show }))
			},
			yourToolsEnabled: true,
			enableYourTools: (show) => {
				set(() => ({ yourToolsEnabled: show }))
			},
			PINLockEnabled: true,
			enablePINLock: (use) => {
				set(() => ({ PINLockEnabled: use }))
			},
			quickExitEnabled: true,
			enableQuickExit: (show) => {
				set(() => ({ quickExitEnabled: show }))
			},
			quickExitMessageEnabled: true,
			enableQuickExitMessage: (show) => {
				set(() => ({ quickExitMessageEnabled: show }))
			},
			quickExitURL: 'https://google.com',
			setQuickExitURL: (url) => {
				set(() => ({ quickExitURL: url }))
			},
			allowCookies: true,
			setAllowCookies: (allow) => {
				set(() => ({ allowCookies: allow }))
			},
			allowThirdPartyCookies: true,
			setAllowThirdPartyCookies: (allow) => {
				set(() => ({ allowThirdPartyCookies: allow }))
			},
			setToolIDs: (ids) => set(() => ({ userToolIDs: ids })),
			// Adds an ID only if it doesn't already exist (prevents duplicates)
			addTool: (id) =>
				set((state) => ({
					userToolIDs: state.userToolIDs.includes(id) ? state.userToolIDs : [...state.userToolIDs, id],
				})),

			// Removes a specific ID from the array
			removeTool: (id) =>
				set((state) => ({
					userToolIDs: state.userToolIDs.filter((toolId) => toolId !== id),
				})),
			getActiveToolIDs: () => {
				return get().userToolIDs
			},

			setToolsInView: (inView) => set(() => ({ toolsInView: inView })),

			setIsMobile: (isMobile) => set(() => ({ isMobile: isMobile })),
			setMessage: (msg) => set(() => ({ message: msg })),
			setShowSnackbar: (show) => set(() => ({ showSnackbar: show })),
			setActivity: (id) => {
				// console.trace(`setActivity called with value: ${id}`);
				set(() => ({ activity: id }))
			},
			setAccData: (data) => set(() => ({ accData: data })),

			setShowToolsOnly: (show) => set(() => ({ showToolsOnly: show })),
			toggleShowToolsOnly: () => set((state) => ({ showToolsOnly: !state.showToolsOnly })),

			setAcronymID: (id) => set(() => ({ acronymID: id })),
			setScrollStage: (stage) => set(() => ({ scrollStage: stage })),
			setShowAccCard: (show) => {
				// console.trace(`setShowAccCard called with value: ${show}`);
				set(() => ({ showAccCard: show }))
			},
		}),
		{
			name: 'ummi',
			storage: createJSONStorage(() => localStorage),
			// Keys to persist in localStorage
			partialize: (state) => ({
				daysCounterEnabled: state.daysCounterEnabled,
				toolboxFilterEnabled: state.toolboxFilterEnabled,
				yourToolsEnabled: state.yourToolsEnabled,
				PINLockEnabled: state.PINLockEnabled,
				quickExitEnabled: state.quickExitEnabled,
				quickExitMessageEnabled: state.quickExitMessageEnabled,
				allowCookies: state.allowCookies,
				allowThirdPartyCookies: state.allowThirdPartyCookies,
				usePINLock: state.usePINLock,
				isInstallable: state.isInstallable,
				isInstalled: state.isInstalled,
				vc: state.vc,
				lvd: state.lvd,
				fvd: state.fvd,
				nss: state.nss,
				version: state.version,
				lastVersionCheck: state.lastVersionCheck,
			}),
		},
	),
)

export default useAppStore
