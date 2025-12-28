import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(
	persist(
		(set, get) => ({
			toolAdded: false,
			activity: 0,
			scrollStage: 0,
			acronymnID: 0,
			active: false,
			showAccCard: false,
			isMobile: false,
			showToolsOnly: false,
			userToolIDs: [],
			accData: [],
			message: '',
			showSnackbar: false,
			isInstalled: false,
			toolsInView: false,
			needUpdate: false,
			setNeedUpdate: (value) => set({ needUpdate: value }),
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
			setIsInstalled: (isInstalled) => set(() => ({ isInstalled: isInstalled })),
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

			setAcronymnID: (id) => set(() => ({ acronymnID: id })),
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
			}),
		},
	),
)

export default useAppStore
