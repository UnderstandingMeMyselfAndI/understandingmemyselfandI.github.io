import {create} from "zustand";
const useAppStore = create((set) => ({
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
	message: "",
	showSnackbar: false,
	isInstalled: false,
	setIsInstalled: isInstalled => set(() => ({isInstalled: isInstalled})),
	setIsMobile: isMobile => set(() => ({isMobile: isMobile})),
	setMessage: msg => set(() => ({message: msg})),
	setShowSnackbar: show => set(() => ({showSnackbar: show})),
	setActivity: id => {
		console.trace(`setActivity called with value: ${id}`);
		set(() => ({ activity: id }))
	
	},
	setAccData: data => set(() => ({accData: data})),
	addTool: id => set((state) => ({userToolIDs: [...state.userToolIDs, id]})),
	// removeTool: id => set((state) => ({userToolIDs: state.userToolIDs.filter(t => t.id !== id)})),
	setToolIDs: ids => set(() => ({userToolIDs: ids})),
	setShowToolsOnly: show => set(() => ({showToolsOnly: show})),
	toggleShowToolsOnly: () => set((state) => ({showToolsOnly: !state.showToolsOnly})),

	setAcronymnID: id => set(() => ({acronymnID: id})),
	setScrollStage: stage => set(() => ({scrollStage: stage})),
	setShowAccCard: show => {
		console.trace(`setShowAccCard called with value: ${show}`);
		set(() => ({showAccCard: show}));
	},
	
}));
export default useAppStore;
