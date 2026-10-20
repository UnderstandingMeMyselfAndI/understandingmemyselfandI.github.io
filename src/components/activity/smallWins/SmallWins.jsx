// src/components/activity/smallWins/SmallWins.jsx
import { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import useAppStore from '@store/useAppStore'
import { activities } from '@data/config.js'
import CloseBtn from '@components/ui/buttons/close/CloseBtn'

import SecurityGate from '@security/SecurityGate'
import { useSmallWinsStore } from '@store/smallWinsStore'
import { STRINGS } from '@data/dataSmallWins.js'
import SmallWinsOverview from './SmallWinsOverview'
import SmallWinsEditor from './SmallWinsEditor'

import './smallWins.scss'

const activitiesById = activities.reduce((acc, activity) => {
  acc[activity.id] = activity
  return acc
}, {})

function SmallWinsBody() {
  const init = useSmallWinsStore((s) => s.init)
  const status = useSmallWinsStore((s) => s.status)
  const error = useSmallWinsStore((s) => s.error)
  const view = useSmallWinsStore((s) => s.view)
  //-------------------------------------
  useEffect(() => {
    init()
  }, [init])
  //-------------------------------------
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
  const name = 'book-of-small-wins'
  const id = 25
  const activityID = activities.find((activity) => (activity.url === name ? activity.id : null))
  const setActivity = useAppStore((state) => state.setActivity)
  const { activity } = useAppStore(useShallow((state) => ({ activity: state.activity })))
  const setIsModal = useAppStore((s) => s.setIsModal)
  const isModal = useAppStore((s) => s.isModal)

  const [open, setOpen] = useState(false)

  const reset = useSmallWinsStore((s) => s.reset)

  console.log('activity', activity)
  console.log('activityID', activityID)
  console.log('open', open)

  useEffect(() => {
    open && setIsModal(activitiesById[id]?.modal)
  }, [open])

  useEffect(() => {
    setOpen(activity === id)
  }, [activity, isModal, id])

  const handleClose = () => {
    setOpen(false)
    setActivity(-1)
  }

  return open ? (
    <section
      id={name}
      className={'small-wins activity fixed ' + 'activity-' + name + (open ? ' show' : ' hide')}
      aria-labelledby='small-wins-heading'>
      <CloseBtn onClick={handleClose} />
      <div className='inner'>
        <SecurityGate activityName={STRINGS.overviewTitle} onLocked={reset}>
          <SmallWinsBody />
        </SecurityGate>
      </div>
    </section>
  ) : null
}
