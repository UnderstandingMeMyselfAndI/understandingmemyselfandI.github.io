import { create } from 'zustand';
const useThemeStore = create((set) => ({
	// bears: 0,
	theme: '',
	storageKeyTheme: 'themeOption',
	setStoreTheme: (theme) => () => {
		set({ theme });
		localStorage.setItem('themeOption', theme);
	},
	// increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
	// removeAllBears: () => set({ bears: 0 }),
}));
export default useThemeStore;
