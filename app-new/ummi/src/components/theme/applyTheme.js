// import useThemeStore from '../../themeStore';
// const storageKey = 'themeOption';

const applyTheme = ({ theme }) => {
	document.documentElement.classList.remove('light', 'dark', 'system');
	document.documentElement.classList.add(theme);
	// useThemeStore.setState({ theme: theme });

	// localStorage.setItem(storageKey, theme);
};

export default applyTheme;
