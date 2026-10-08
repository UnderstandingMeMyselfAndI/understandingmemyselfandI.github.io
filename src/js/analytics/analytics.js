export const trackEvent = (eventName, params = {}, shouldTrack) => {
  // Debug: log tracking attempts in development
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('[Analytics]', eventName, {
  //     params,
  //     shouldTrack,
  //     gtagExists: !!window.gtag,
  //   })
  // }

  console.group(`[Analytics] Attempting to track event: ${eventName}`)
  console.log('Params:', params)
  console.log('shouldTrack:', shouldTrack)
  console.log('process.env.NODE_ENV :', process.env.NODE_ENV)
  console.log('window.gtag :', window.gtag)
  console.log('typeof window :', typeof window)

  if (!shouldTrack) {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics] Tracking disabled (gae=false), event not sent:', eventName)
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

  console.groupEnd()
}
