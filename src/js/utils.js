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

export const debounce = (callback, delay) => {
	let timeoutId;
  
  return function(...args) {
    // Clear the previous timeout
    clearTimeout(timeoutId);
    
    // Set a new timeout
    timeoutId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
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
export const  isEmpty = (value) => {
    return value === null || value === undefined || value === '';
}
export function isOdd(number) {
    // Handle non-numeric input
    if (typeof number !== 'number' || isNaN(number)) {
        return false;
    }
    
    // Handle floating point numbers
    if (!Number.isInteger(number)) {
        return false;
    }
    
    return number % 2 !== 0;
}
export const getElementPageOffsetTop = element => {
	return window.pageYOffset + element.getBoundingClientRect().top;
};

export function clamp(value, min, max) {
	return Math.max(min, Math.min(value, max));
}

export function extractYouTubeId(url) {
  if (!url) return null;
  
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
}
// export const logGAEvent = (name, params = null) => {
// 	console.trace('logGAEvent called')
	
// 	if (typeof window.gtag === 'function' && !isEmpty(name)) {
// 	window.gtag('event', name, params)

// 	console.log('>>>>>>>>>>>>>>>>>>log ga event ', name, params)
// 	} else {
// 	console.warn('gtag not available – event not sent:', name)
// 	}
// }

export function setBrowserHistory(url, title) {
  // A console.log can be useful for debugging, but should be removed for production
  console.trace('setBrowserHistory url ', url, ' title ', title)
   if(title && typeof title === 'string' && !isEmpty(title.length)){
	document.title = title
  } 
  
  if (history.pushState) {
    window.history.pushState({ page: title }, '', url)
  }

  
}
// Optional: validate if it's a YouTube URL
export function isYouTubeUrl(url) {
  return /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)/.test(url);
}
export function isTouchDevice() {
	return ('ontouchstart' in window) || 
		(navigator.maxTouchPoints > 0) || 
		(navigator.msMaxTouchPoints > 0) ||
		(window.matchMedia?.("(pointer: coarse)").matches);
}
export function smoothScroll(){
    let x = document.querySelectorAll('a[href*="#"]');
	for (let i = 0; i < x.length; i++){
		
		x[i].onclick = function () {
		  
			let target = document.querySelector(this.hash);
			target.scrollIntoView({
				behavior:'smooth',
				alignToTop:true,
				block:'start'
			});
		}
	}
}

export function sanitizeStringForUrl(input) {
  // Remove non-alphanumeric characters and replace with hyphen
  if (!input || isEmpty(input)) return;
  const sanitized = input.replace(/[^\w]/g, '-');

  // Replace consecutive hyphens with a single hyphen
  const singleHyphen = sanitized.replace(/-{2,}/g, '-');

  // Remove leading and trailing hyphens
  const trimmed = singleHyphen.trim();

  return trimmed.toLowerCase();
}
// Helper to get current path segments
export function getUrlPathSegments() {
  // Remove leading/trailing slashes and split
  const path = location.pathname.replace(/^\/+|\/+$/g, '');
  return path ? path.split('/') : [];
	// return location.pathname.split('/');
}

export default {	
	clamp,
	isSet,
	isUndefined,
	isNull,	
	inRange,
	isNumeric,
	isEmpty,
	isOdd,
	isTouchDevice,
	isColorLight,
	arrowSVG,
	debounce,
	hashCode,	
	getElementPageOffsetTop,
	extractYouTubeId,
	isYouTubeUrl,
	sanitizeStringForUrl,	
	getUrlPathSegments,
	setBrowserHistory,
	smoothScroll,
}
