'use client';

import BackgroundOption from './BackgroundOption';
import './styles.css';
import iconDarkBg from './../../../icons/iconDarkBg';
import iconLightBg from './../../../icons/iconLightBg';
import iconSystemBg from './../../../icons/iconSystemBg';

export function BackgroundOptions() {
	return (
		<div className='backgroundOptions'>
			<BackgroundOption label='Light' icon={iconLightBg} option='light' />
			<BackgroundOption label='Dark' icon={iconDarkBg} option='dark' />
			<BackgroundOption label='Colourful' icon={iconSystemBg} option='system' />
		</div>
	);
}
export default BackgroundOptions;
