// src/components/activity/ActivityHost.jsx
import { Suspense, useEffect } from 'react'
import useAppStore from '@store/useAppStore'
import { activities } from '@data/config.js'
import { ACTIVITIES } from './activityLoaders'

const activitiesById = new Map(activities.map((a) => [a.id, a]))

const styles = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexFlow: 'column wrap',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '0.8rem',
  color: '#e7aafa',
  outline: '10px solid yellow',
  gap: '1rem',
}
const styles_bar_container = {
  width: '60%',
  height: '4px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  backgroundColor: 'rgba(20,20,20,0.1)',
}
const styles_bar = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexFlow: 'row nowrap',
}

function ActivityFallback() {
  return (
    <div className='activity-loading' role='status' aria-live='polite' style={styles}>
      <div>FETCHING</div>
      <div style={styles_bar_container}>
        <div style={styles_bar}>
          <svg width='100%' height='4' xmlns='http://www.w3.org/2000/svg'>
            <rect x='50%' y='1' height='2' width='0%' fill='#be47e279'>
              <animate attributeName='x' begin='0s' dur='1s' from='50%' to='0%' repeatCount='indefinite' />
              <animate attributeName='width' begin='0s' dur='1s' from='0' to='100%' repeatCount='indefinite' />
            </rect>
          </svg>
        </div>
      </div>
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
