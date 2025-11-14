import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
const Theme = {
	DARK: 'dark',
	LIGHT: 'light',
	SYSTEM: 'system',
};
ThemeProvider.propTypes = {
	children: PropTypes.node.isRequired,
	defaultTheme: PropTypes.oneOf([Theme.DARK, Theme.LIGHT, Theme.SYSTEM]),
	storageKey: PropTypes.string,
};

const ThemeProvider = ({
	children,
	defaultTheme = Theme.SYSTEM,
	storageKey = 'vite-ui-theme',
	...props
}) => {
	const [theme, setTheme] = useState(
		() => localStorage.getItem(storageKey) || defaultTheme
	);

	useEffect(() => {
		const root = window.document.documentElement;

		root.classList.remove('light', 'dark');

		if (theme === Theme.SYSTEM) {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
				.matches
				? Theme.DARK
				: Theme.LIGHT;

			root.classList.add(systemTheme);
			return;
		}

		root.classList.add(theme);
	}, [theme]);

	const value = {
		theme,
		setTheme: (theme) => {
			localStorage.setItem(storageKey, theme);
			setTheme(theme);
		},
	};

	return (
		<ThemeProviderContext.Provider {...props} value={value}>
			{children}
		</ThemeProviderContext.Provider>
	);
};

const ThemeProviderContext = createContext({
	theme: Theme.SYSTEM,
	setTheme: () => null,
});

export default ThemeProvider;
