import {create} from "zustand";
const useAppStore = create(set => ({
	// bears: 0,
	bgImageID: 0,
	setbgImageID: id => set(state => ({bgImageID: id})),
}));
export default useAppStore;
