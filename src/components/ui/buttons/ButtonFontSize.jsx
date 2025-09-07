import { Button } from '@/components/ui/button';
// import {
// 	Tooltip,
// 	TooltipContent,
// 	TooltipTrigger,
// } from '@/components/ui/tooltip';
import iconIncreaseFontSize from '/src/components/icons/iconFontSizeIncrease.jsx';
import iconDescreaseFontSize from '/src/components/icons/iconFontSizeDecrease.jsx';
import './buttonStyles.css';
import PropTypes from 'prop-types';

const stepFontSizePx = 1;
const storageKeyBaseFontSize = 'baseFontSize';
let rootFontSize = 16;
const minFontSize = 12;
const maxFontSize = 34;

const getStoredBaseFontSize = () => {
	const storedBaseFontSize = localStorage.getItem(storageKeyBaseFontSize);
	return storedBaseFontSize ? storedBaseFontSize : rootFontSize;
};

const setBaseFontSize = (size) => {
	rootFontSize =
		size === 'increase'
			? rootFontSize + stepFontSizePx
			: rootFontSize - stepFontSizePx;
	const newBaseFontSize = Math.min(
		Math.max(rootFontSize, minFontSize),
		maxFontSize
	);
	if (newBaseFontSize >= maxFontSize) rootFontSize = maxFontSize;
	if (newBaseFontSize <= minFontSize) rootFontSize = minFontSize;
	document.documentElement.style.fontSize = newBaseFontSize + 'px';
	localStorage.setItem(storageKeyBaseFontSize, newBaseFontSize.toString());
};

const ButtonFontSize = ({ size, label }) => {
	const icon =
		size === 'increase' ? iconIncreaseFontSize : iconDescreaseFontSize;
	const alt = size === 'increase' ? 'increase font size' : 'decrease font size';
	const handleClick = () => {
		setBaseFontSize(size);
	};
	return (
		<div className='btn' onClick={handleClick}>
			<Button
				variant='outline'
				className={'font-size-btn-' + size}
				aria-label={'Font Size ' + label}
			>
				<div dangerouslySetInnerHTML={{ __html: icon }} alt={alt} />
			</Button>
			<div>{label}</div>
		</div>
	);
};

const applyStoredScale = () => {
	const storedBaseFontSize = getStoredBaseFontSize();

	storedBaseFontSize &&
		(document.documentElement.style.fontSize = storedBaseFontSize + 'px');
};

applyStoredScale();

ButtonFontSize.propTypes = {
	size: PropTypes.string.isRequired, // or PropTypes.oneOf(['large', 'small'])
	label: PropTypes.string,
};
export default ButtonFontSize;
