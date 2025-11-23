import {create} from "zustand";
const useAppStore = create(set => ({
	// bears: 0,
	toolAdded: false,
	emergencyToolAdded: false,
	scrollStage: 0,
	bgImageID: 0,
	acronymnID: 0,
	active: false,
	showAccCard: false,
	isExpanded: false,
	toolCount: 0,
	showToolsOnly: false,
	userToolIDs: [],
	addTool: tool => set(state => ({userToolIDs: [...state.userToolIDs, tool]})),
	removeTool: id => set(state => ({userToolIDs: state.userToolIDs.filter(t => t.id !== id)})),

	setShowToolsOnly: show => set(state => ({showToolsOnly: show})),
	toggleShowToolsOnly: () => set(state => ({showToolsOnly: !state.showToolsOnly})),
	setToolCount: count => set(state => ({toolCount: count})),
	incToolCount: () => set(state => ({toolCount: state.toolCount + 1})),
	decrementToolCount: () => set(state => ({toolCount: state.toolCount - 1})),
	setToolAdded: added => set(state => ({toolAdded: added})),
	toggleTool: () => set(state => ({toolAdded: !state.toolAdded})),
	setEmergencyToolAdded: added => set(state => ({emergencyToolAdded: added})),
	toggleEmergencyTool: () => set(state => ({emergencyToolAdded: !state.emergencyToolAdded})),
	setbgImageID: id => set(state => ({bgImageID: id})),
	setAcronymnID: id => set(state => ({acronymnID: id})),
	setScrollStage: stage => set(state => ({scrollStage: stage})),
	toggleIsSelected: () => set(state => ({isToolSelected: !state.isToolSelected})),
	setActive: isActive => set(state => ({active: isActive})),
	setShowAccCard: show => {
		console.trace(`setShowAccCard called with value: ${show}`);
		set(state => ({showAccCard: show}));
	},
	setIsExpanded: show => {
		console.trace(`setIsExpanded called with value: ${show}`);
		set(state => ({showAccCard: show}));
	},
}));
export default useAppStore;
