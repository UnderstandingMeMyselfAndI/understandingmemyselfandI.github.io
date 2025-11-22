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
	setToolAdded: added => set(state => ({toolAdded: added})),
	setEmergencyToolAdded: added => set(state => ({emergencyToolAdded: added})),
	setbgImageID: id => set(state => ({bgImageID: id})),
	setAcronymnID: id => set(state => ({acronymnID: id})),
	setScrollStage: stage => set(state => ({scrollStage: stage})),
	toggleIsSelected: () => set(state => ({isToolSelected: !state.isToolSelected})),
	setActive: isActive => set(state => ({active: isActive})),
	setShowAccCard: show => set(state => ({showAccCard: show})),
}));
export default useAppStore;
