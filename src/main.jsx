import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { useAppStore } from '@store/useAppStore'
import { usePrivateStore } from '@store/usePrivateStore'
import { migrateIfNeeded, watchForUnlockAndMigrate } from '@utils/migrateKeyvalToSettings'
import { hasPasscode, subscribeLockState } from '@utils/securityGate'

if (import.meta.env.DEV) {
  import('@utils/seedSmallWins').then((m) => m.attachToWindow())
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing
      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('New service worker installed, sending skipWaiting message')
          newWorker.postMessage({ type: 'SKIP_WAITING' })
        }
      })
    })
  })

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('Controller changed, reloading page')
    window.location.reload()
  })
}

// Render immediately. App shows its own <AppLoading /> while _hasHydrated
// is false, so the user sees a proper loading state instead of a blank page
// during migration + hydration.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Background bootstrap. Order matters:
//   1. Migration must finish before hydration, otherwise hydration reads
//      defaults and migration then overwrites the settings store — but the
//      in-memory store still has defaults.
//   2. Subscribe before hydrating the private store so that if the user
//      unlocks while we're still hydrating the app store, the private store
//      hydrates on unlock.
//   3. Private store hydrates immediately only if there's no passcode;
//      otherwise the subscription does it after unlock.
;(async () => {
  try {
    await migrateIfNeeded()

    // Retry the encrypted half of migration if it was deferred due to a lock.
    watchForUnlockAndMigrate()

    // Re-hydrate private store on every unlock; clear it on every lock.
    subscribeLockState(async ({ unlocked }) => {
      if (unlocked) {
        await usePrivateStore.getState().hydrate()
      } else {
        usePrivateStore.getState().reset()
      }
    })

    await useAppStore.getState().hydrate()

    if (!hasPasscode()) {
      await usePrivateStore.getState().hydrate()
    }
  } catch (err) {
    console.error('[bootstrap] failed:', err)
    // Even if hydration fails, flip the flag so the user sees the app
    // (with whatever defaults are in the store) rather than a stuck loading
    // screen. Components will log their own errors from there.
    useAppStore.getState().setHasHydrated(true)
  }
})()
