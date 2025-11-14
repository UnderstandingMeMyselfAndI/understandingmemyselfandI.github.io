const storageKey = 'themeOption';
const getStoredTheme = () => {
	const storedTheme = localStorage.getItem(storageKey);
	return storedTheme ? storedTheme.toString() : 'system';
};
export default getStoredTheme;
