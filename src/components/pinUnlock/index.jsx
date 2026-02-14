import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PINSetup from './PINSetup'
import PINUnlock from './PINUnlock'
import App from './App'
import { dbGet } from './cryptoDB'

function Root() {
  const [key, setKey] = useState(null)
  const [hasPin, setHasPin] = useState(false)

  useEffect(() => {
    async function checkPin() {
      const state = await dbGet('state')
      if (state) setHasPin(true)
    }
    checkPin()
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }, [])

  if (!key) {
    if (!hasPin) return <PINSetup onDone={setKey} />
    return <PINUnlock onUnlock={setKey} />
  }

  return <App cryptoKey={key} onLock={() => setKey(null)} />
}

ReactDOM.render(<Root />, document.getElementById('root'))
