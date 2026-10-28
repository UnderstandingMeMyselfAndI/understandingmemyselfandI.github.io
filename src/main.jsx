import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { useAppStore } from "@store/useAppStore"
import { usePrivateStore } from "@store/usePrivateStore"
import { migrateIfNeeded, watchForUnlockAndMigrate } from "@utils/migrateKeyvalToSettings"
import { hasPasscode, subscribeLockState } from "@utils/securityGate"
import { initSessionLock, onBeforeLock } from "@utils/sessionLock"

if (import.meta.env.DEV) {
  import("@utils/seedSmallWins").then((m) => m.attachToWindow())
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.ready.then((registration) => {
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing
      newWorker.addEventListener("statechange", () => {
        if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
          console.log("New service worker installed, sending skipWaiting message")
          newWorker.postMessage({ type: "SKIP_WAITING" })
        }
      })
    })
  })

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    console.log("Controller changed, reloading page")
    window.location.reload()
  })
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

;(async () => {
  try {
    // 1. Migrate legacy → new. Partial if a passcode is set (plaintext only).
    await migrateIfNeeded()

    // 2. Retry the encrypted half of migration on unlock.
    watchForUnlockAndMigrate()

    // 3. On lock, clear all PII stores. On unlock, re-hydrate the private store.
    subscribeLockState(async ({ unlocked }) => {
      if (unlocked) {
        await usePrivateStore.getState().hydrate()
        return
      }

      // Session ended — drop decrypted data from memory.
      usePrivateStore.getState().reset()
      const { useSmallWinsStore } = await import("@store/useSmallWinsStore")
      useSmallWinsStore.getState().reset()
      // Add more PII stores here as features migrate.
    })

    // 4. Flush pending drafts before a lock fires. Prevents losing
    //    keystrokes when the auto-lock timer fires mid-edit.
    const { useSmallWinsStore } = await import("@store/useSmallWinsStore")
    onBeforeLock(async () => {
      const s = useSmallWinsStore.getState()
      if (s.draft) {
        try {
          await s.saveAndClose()
        } catch {
          /* ignore — better to lose draft than block the lock */
        }
      }
    })

    // 5. Hydrate plaintext app store.
    await useAppStore.getState().hydrate()

    // 6. If no passcode, private store hydrates immediately from device key.
    if (!hasPasscode()) {
      await usePrivateStore.getState().hydrate()
    }

    // 7. Start the session lock timer. Runs on visibility change and fires
    //    lock() after 2 minutes hidden. THIS is where the line goes.
    initSessionLock({ timeoutMs: 2 * 60 * 1000 })
  } catch (err) {
    console.error("[bootstrap] failed:", err)
    useAppStore.getState().setHasHydrated(true)
  }
})()
