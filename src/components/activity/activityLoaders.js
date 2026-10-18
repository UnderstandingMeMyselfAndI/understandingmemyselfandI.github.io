// src/components/activity/activityLoaders.js
// Pure loading machinery — no React components exported. Fast Refresh-safe.
// Consumed by ActivityHost (component) and by prefetch callers (App, AppMenu).

import { lazy } from 'react'

// Loaders kept separate from lazy components so we can invoke them ahead of
// time for prefetching. `import()` dedupes internally; calling twice does
// not re-download. React.lazy caches the resolved promise, so once a loader
// has completed, mounting the component is synchronous.
//
// Keys must match `url` in @data/config exactly. Paths are relative to the
// activity/ folder.
export const ACTIVITY_LOADERS = {
  tools: () => import('./tools/Tools.jsx'),
  'days-counter': () => import('./daysCounter/DaysCounter'),
  'units-calculator': () => import('./unitsCalculator/UnitsCalculator'),
  'wallpaper-gallery': () => import('./wallpapers/WallpaperGallery'),
  'privacy-policy': () => import('./privacy/PrivacyPolicy'),
  // ccpaprivacy: () => import('./privacy/CCPAPrivacy'), // no component yet
  settings: () => import('./settings/Settings'),
  AcronymExplained: () => import('./acronymExplained/AcronymExplained'),
  'recovery-timeline': () => import('./timeline/VerticalTimeline'),
  'wheel-of-life': () => import('./wheeloflife/WheelOfLife'),
  'recovery-quiz': () => import('./quiz/Quiz'),
  'peng-game': () => import('./games/peng/PengGameAI'),
  'book-of-small-wins': () => import('./smallWins/SmallWins'),
}

// Map of url → lazy component. Built once at module load.
export const ACTIVITIES = Object.fromEntries(
  Object.entries(ACTIVITY_LOADERS).map(([url, loader]) => [url, lazy(loader)]),
)

/**
 * Warm the cache for a single activity chunk. Idempotent; no-op for unknown
 * urls. Safe to call repeatedly — subsequent calls resolve from cache.
 */
export function prefetchActivity(url) {
  const loader = ACTIVITY_LOADERS[url]
  if (!loader) return
  loader().catch(() => {
    /* Ignore — the actual mount will retry and surface the error */
  })
}

/**
 * Warm the cache for every registered activity chunk. Call on idle after
 * boot. Connection policy (saveData, 2g delays) lives at the call site so
 * this stays a pure "do it now" primitive.
 */
export function prefetchAllActivities() {
  Object.values(ACTIVITY_LOADERS).forEach((loader) => {
    loader().catch(() => {
      /* Ignore — same reason */
    })
  })
}
