import {create} from "zustand";
const useAppStore = create(set => ({
	// bears: 0,
	scrollStage: 0,
	bgImageID: 0,
	acronymnID: 0,
	isExpanded: false,
	setbgImageID: id => set(state => ({bgImageID: id})),
	setAcronymnID: id => set(state => ({acronymnID: id})),
	setScrollStage: stage => set(state => ({scrollStage: stage})),
	toggleIsExpanded: () => set(state => ({isExpanded: !state.isExpanded})),
	setIsExpanded: expanded => set(state => ({isExpanded: expanded})),
}));
export default useAppStore;
