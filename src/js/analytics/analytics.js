export const trackEvent = (eventName, params = {}, shouldTrack) => {
  // Debug: log tracking attempts in development
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('[Analytics]', eventName, {
  //     params,
  //     shouldTrack,
  //     gtagExists: !!window.gtag,
  //   })
  // }

  if (!shouldTrack) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '[Analytics] Tracking disabled (gae=false), event not sent:',
        eventName,
      )
    }
    return
  }

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
    if (process.env.NODE_ENV === 'development') {
      // console.log('[Analytics] Event sent:', eventName, params)
    }
  } else {
    console.warn('[Analytics] gtag not available – event not sent:', eventName)
  }
}
