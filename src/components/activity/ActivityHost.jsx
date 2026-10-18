// src/components/activity/ActivityHost.jsx
import { Suspense, useEffect } from 'react'
import useAppStore from '@store/useAppStore'
import { activities } from '@data/config.js'
import { ACTIVITIES } from './activityLoaders'

const activitiesById = new Map(activities.map((a) => [a.id, a]))

function ActivityFallback() {
  return (
    <div className='activity-loading' role='status' aria-live='polite'>
      Loading…
    </div>
  )
}

export default function ActivityHost() {
  const activityId = useAppStore((s) => s.activity)
  const setIsModal = useAppStore((s) => s.setIsModal)

  const active = activityId === -1 ? null : (activitiesById.get(activityId) ?? null)

  // External-system sync, not component state.
  useEffect(() => {
    setIsModal(active?.modal ?? false)
  }, [active, setIsModal])

  if (!active) return null

  const Component = ACTIVITIES[active.url]
  if (!Component) {
    if (import.meta.env.DEV && active.modal) {
      console.warn(`[ActivityHost] No component registered for activity url: "${active.url}"`)
    }
    return null
  }

  return (
    <Suspense fallback={<ActivityFallback />}>
      <Component />
    </Suspense>
  )
}
