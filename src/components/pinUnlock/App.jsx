import React, { useEffect, useState } from 'react'
import { dbGet, dbSet, encryptData, decryptData, dbClear } from './cryptoDB'
import useIdleLock from './useIdleLock'

export default function App({ cryptoKey, onLock }) {
  const [state, setState] = useState({ days: 0, favs: [] })
  const [confirmClear, setConfirmClear] = useState(false)

  useEffect(() => {
    async function load() {
      const encState = await dbGet('state')
      if (encState?.iv?.length) {
        const data = await decryptData(cryptoKey, encState)
        setState(data)
      }
    }
    if (cryptoKey) load()
  }, [cryptoKey])

  const save = async (newState) => {
    setState(newState)
    if (cryptoKey) {
      const enc = await encryptData(cryptoKey, newState)
      await dbSet('state', enc)
    }
  }

  const toggleFav = (tool) => {
    const newFavs = state.favs.includes(tool)
      ? state.favs.filter((t) => t !== tool)
      : [...state.favs, tool]
    save({ ...state, favs: newFavs })
  }

  const addDay = () => save({ ...state, days: state.days + 1 })

  const clearData = async () => {
    await dbClear()
    onLock()
  }

  // Auto-lock after idle
  useIdleLock(
    () => {
      alert('App locked due to inactivity')
      onLock() // lock app
    },
    5 * 60 * 1000,
  ) // 5 min

  return (
    <div>
      <h3>Days Counter</h3>
      <p>{state.days} days</p>
      <button onClick={addDay}>+1 Day</button>

      <h3>Favourite Tools</h3>
      {['CBT', 'DBT', 'ACT'].map((tool) => (
        <div key={tool}>
          <label>
            <input
              type='checkbox'
              checked={state.favs.includes(tool)}
              onChange={() => toggleFav(tool)}
            />
            {tool}
          </label>
        </div>
      ))}

      <br />
      <button onClick={onLock}>Lock App</button>

      <h3>Device Privacy</h3>
      {!confirmClear && (
        <button onClick={() => setConfirmClear(true)}>Clear Local Data</button>
      )}
      {confirmClear && (
        <div>
          <p>
            Are you sure you want to delete all local data? Synced data remains
            safe.
          </p>
          <button onClick={clearData}>Delete Local Data</button>
          <button onClick={() => setConfirmClear(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
