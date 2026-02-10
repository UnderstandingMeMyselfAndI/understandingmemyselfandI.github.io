let wakeLock = null

export default async function requestWakeLock() {
  // 1. Check if the feature is supported by the browser
  if (!('wakeLock' in navigator)) {
    console.warn('Screen Wake Lock API not supported.')
    return
  }

  try {
    // 2. Request a screen wake lock
    wakeLock = await navigator.wakeLock.request('screen')
    console.log('Wake Lock is active')

    // 3. Listen for the release event (e.g., if user minimizes window)
    wakeLock.addEventListener('release', () => {
      console.log('Wake Lock was released')
    })
  } catch (err) {
    // The browser can refuse the request (e.g., low battery)
    console.error(`${err.name}, ${err.message}`)
  }
}

// 4. Handle visibility changes (Re-acquire lock when app comes back to foreground)
document.addEventListener('visibilitychange', async () => {
  if (wakeLock !== null && document.visibilityState === 'visible') {
    await requestWakeLock()
  }
})

// 5. Setup your UI trigger (Recommended)
// Call requestWakeLock() when your specific task starts (e.g., Start Video, Start Recipe)
