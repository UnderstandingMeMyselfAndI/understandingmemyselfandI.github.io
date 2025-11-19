export const hashCode = str => {
	let hash = 0;
	// const length = outputLength < 5 ? 5 : outputLength

	for (let i = 0; i < str.length; i++) {
		hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
	}
	return (hash >>> 0).toString(36);
};

export const inRange = (value, min, max) => {
	return value >= min && value <= max;
};
export const isNumeric = value => {
	return !isNaN(parseFloat(value)) && isFinite(value);
};
export const arrowSVG = () => {
	return '<svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="16px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" /></svg>';
};

export const debounce = (callback, wait) => {
	let timeoutId = null;
	return (...args) => {
		window.clearTimeout(timeoutId);
		timeoutId = window.setTimeout(() => {
			callback(...args);
		}, wait);
	};
};

export const isColorLight = rgbString => {
	// Extract numbers from rgb(...) or rgba(...)
	if (rgbString) {
		const rgb = rgbString.match(/\d+/g).map(Number);
		const [r, g, b] = rgb;

		// Calculate perceived brightness (simple luminance formula)
		const brightness = (r * 299 + g * 587 + b * 114) / 1000;

		// You can adjust the threshold (128 is a common choice)
		return brightness > 128;
	} else {
		return true;
	}
};
export const isNull = o => {
	return o === null;
};
export const isUndefined = o => {
	return o === undefined;
};
export const isSet = o => {
	if (o === 0) return true;
	return !!o;
};

export const getElementPageOffsetTop = element => {
	return window.pageYOffset + element.getBoundingClientRect().top;
};

export function clamp(value, min, max) {
	return Math.max(min, Math.min(value, max));
}

export default {clamp, isSet, isUndefined, isNull, hashCode, inRange, isNumeric, arrowSVG, debounce, isColorLight, getElementPageOffsetTop};
