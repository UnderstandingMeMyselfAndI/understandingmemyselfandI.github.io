// src/components/activity/smallWins/SmallWins.jsx
import { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '@store/useAppStore'
import { activities } from '@data/config'
import CloseBtn from '@components/ui/buttons/close/CloseBtn'
import { hasPasscode, lock } from '@utils/securityGate'
import SecurityGate from '@security/SecurityGate'
import { useSmallWinsStore } from '@store/smallWinsStore'
import { STRINGS } from '@data/smallWinsData'
import SmallWinsOverview from './SmallWinsOverview'
import SmallWinsEditor from './SmallWinsEditor'

import '@activity/smallWins/smallWins.scss'

const SMALL_WINS_ID = 25
const SMALL_WINS_NAME = 'book-of-small-wins'

const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})

const isActivityModal = activitiesById[SMALL_WINS_ID]?.modal ?? false

function SmallWinsBody() {
  const init = useSmallWinsStore((s) => s.init)
  const status = useSmallWinsStore((s) => s.status)
  const error = useSmallWinsStore((s) => s.error)
  const view = useSmallWinsStore((s) => s.view)

  useEffect(() => {
    init()
  }, [init])

  if (status === 'loading') {
    return (
      <p className='small-wins__status' role='status' aria-live='polite'>
        {STRINGS.loading}
      </p>
    )
  }

  if (status === 'error') {
    return (
      <div className='small-wins__status small-wins__status--error' role='alert'>
        <p>{STRINGS.loadError}</p>
        {error && <p className='small-wins__status-detail'>{error}</p>}
        <button type='button' className='small-wins__button' onClick={init}>
          {STRINGS.retry}
        </button>
      </div>
    )
  }

  return view === 'editor' ? <SmallWinsEditor /> : <SmallWinsOverview />
}

export default function SmallWins() {
  const setActivity = useAppStore((state) => state.setActivity)
  const { activity } = useAppStore(useShallow((state) => ({ activity: state.activity })))
  const setIsModal = useAppStore((s) => s.setIsModal)
  const closeSession = useSmallWinsStore((s) => s.closeSession)
  const reset = useSmallWinsStore((s) => s.reset)

  // Derived, not stored. No setState-in-effect.
  const open = activity === SMALL_WINS_ID

  // Sync the external (store) flag with the derived open state. This is a
  // legitimate "update external system" effect, not component state.
  useEffect(() => {
    setIsModal(open ? isActivityModal : false)
  }, [open, setIsModal])

  // Defensive: only for unexpected unmounts. The normal close path is
  // handleClose → closeSession, which already resets + locks.
  useEffect(() => {
    if (!open) return undefined
    return () => {
      useSmallWinsStore.getState().reset()
      if (hasPasscode()) lock()
    }
  }, [open])

  const handleClose = async () => {
    try {
      await closeSession()
    } catch (err) {
      console.error('[SmallWins] closeSession failed:', err)
      return
    }
    setActivity(-1)
  }

  if (!open) return null

  return (
    <section
      id={SMALL_WINS_NAME}
      className={`small-wins activity fixed activity-${SMALL_WINS_NAME} show`}
      aria-labelledby='small-wins-heading'>
      <CloseBtn onClick={handleClose} />
      <div className='inner'>
        <SecurityGate activityName={STRINGS.overviewTitle} onLocked={reset}>
          <SmallWinsBody />
        </SecurityGate>
      </div>
    </section>
  )
}
