'use client';
import PropTypes from 'prop-types';
import './styles.css';

import useThemeStore from '@/src/themeStore';
export function BackgroundOption({ icon, option, label }) {
	const theme = useThemeStore.getState().theme;
	const classActive = option === theme ? 'active' : '';
	return (
		<button
			className={'backgroundOption' + ' ' + classActive + ' theme-' + option}
			data-option={option}
			aria-label={'Change theme to ' + option}
			onClick={(e) => {
				const target = e.currentTarget;
				target.classList.add('active');
				useThemeStore.setState({ theme: option });
			}}
		>
			<div data-option={option} dangerouslySetInnerHTML={{ __html: icon }} />
			<div>{label && <p>{label}</p>}</div>
		</button>
	);
}
BackgroundOption.propTypes = {
	icon: PropTypes.node.isRequired,
	option: PropTypes.string.isRequired,
	label: PropTypes.string,
};
BackgroundOption.displayName = 'ButtonScenario';
export default BackgroundOption;
