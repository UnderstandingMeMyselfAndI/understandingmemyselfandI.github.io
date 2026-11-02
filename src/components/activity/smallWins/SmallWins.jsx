// src/components/activity/smallWins/SmallWins.jsx
import { useEffect } from 'react'
import useAppStore from '@store/useAppStore'
import CloseBtn from '@buttons/close/CloseBtn'
import { onBeforeLock } from '@utils/sessionLock'
import { useSmallWinsStore } from '@store/useSmallWinsStore'
import { STRINGS } from '@data/dataSmallWins.js'
import SmallWinsOverview from './SmallWinsOverview'
import SmallWinsEditor from './SmallWinsEditor'

import '@activity/smallWins/smallWins.scss'

const SMALL_WINS_NAME = 'book-of-small-wins'

onBeforeLock(async () => {
  const s = useSmallWinsStore.getState()
  if (s.draft) await s.saveAndClose()
})

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
  const closeSession = useSmallWinsStore((s) => s.closeSession)

  const handleClose = async () => {
    try {
      await closeSession()
    } catch (err) {
      console.error('[SmallWins] closeSession failed:', err)
      return
    }
    setActivity(-1)
  }

  return (
    <section
      id={SMALL_WINS_NAME}
      className={`small-wins activity fixed activity-${SMALL_WINS_NAME} show`}
      aria-labelledby='small-wins-heading'>
      <CloseBtn onClick={handleClose} />
      <div className='inner'>
        <SmallWinsBody />
      </div>
    </section>
  )
}