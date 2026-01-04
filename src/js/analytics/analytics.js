export const trackEvent = (eventName, params = {}, shouldTrack) => {
	if (!shouldTrack) return

	if (typeof window !== 'undefined' && window.gtag) {
		window.gtag('event', eventName, params)
	} else {
		console.warn('gtag not available – event not sent:', eventName)
	}
}
