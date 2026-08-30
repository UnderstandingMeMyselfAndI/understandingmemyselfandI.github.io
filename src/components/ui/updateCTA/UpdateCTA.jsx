import { useState, useEffect } from 'react'
import ButtonUpdate from '@buttons/update/ButtonUpdate'
import useAppStore from '@store/useAppStore'
import './styles.scss'

import PropTypes from 'prop-types'
function getDateToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}
const UpdateCTA = () => {
  const activity = useAppStore((state) => state.activity)
  const [open, setOpen] = useState(true)

  useEffect(() => {
    setOpen(activity === -1)
  }, [activity])

  const maxMinsVersionInterval = 10
  const version = useAppStore((state) => state.version)
  const setVersion = useAppStore((state) => state.setVersion) // Update version
  const lastVersionCheck = useAppStore((state) => state.lastVersionCheck)
  const setLastVersionCheck = useAppStore((state) => state.setLastVersionCheck)
  const [btnLabel, setBtnLabel] = useState('Update')
  const [updating, setUpdating] = useState(false)
  const [upToDate, setUpToDate] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [updateMessage, setUpdateMessage] = useState('Check for updates.')
  async function getVersion() {
    const url = 'https://ummi.now/metadata.json'

    const reqResponse = await fetch(url, {
      method: 'GET',
      mode: 'no-cors',
      cache: 'no-cache',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`)
        }
        console.log('getVersion', response.json())

        return response.json()
      })
      .catch((error) => {
        setHasError(true)
        console.log('getVersion error', error)
        return false //error.message
      })
  }

  const checkForUpdates = async () => {
    const minsSinceEpoch = new Date().getTime() / (1000 * 60)
    if (minsSinceEpoch - lastVersionCheck < maxMinsVersionInterval) return
    setLastVersionCheck(minsSinceEpoch)

    const versionRemote = await getVersion()
    if (versionRemote) {
      const versionRemoteString = JSON.stringify(versionRemote)
      if (versionRemoteString === version) {
        setUpToDate(true)
      } else {
        setUpToDate(false)
      }
      return versionRemote
    }
  }
  const handleUpdate = async () => {
    const minsSinceEpoch = Math.floor(new Date().getTime() / (1000 * 60))
    // if (minsSinceEpoch - lastVersionCheck < maxMinsVersionInterval) return

    setUpdating(true)
    setUpdateMessage('Checking for updates....')
    setBtnLabel('Checking...')

    const timeout = setTimeout(() => {
      console.log('timeout')
      setUpdating(false)
      setBtnLabel('Update')
      setLastVersionCheck(minsSinceEpoch)

      if (hasError) {
        setUpdateMessage('Update failed. Try again soon.')
      } else {
        setUpdateMessage('Installing latest version.')
        setUpdating(false)
        setUpToDate(true)
        setTimeout(window.location.reload(), 1000)
      }
    }, 3500)

    const versionRemote = checkForUpdates()
    if (versionRemote) {
      const versionRemoteString = JSON.stringify(versionRemote)
      if (versionRemoteString === version) {
      } else {
        setUpdateMessage('Installling latest version.')
        setUpdating(false)
        setTimeout(() => {
          window.location.reload()
        }, 15000)
      }
      console.log('versionRemoteString', versionRemoteString)
      console.log('versionRemote', versionRemote)
      setVersion(versionRemoteString)
    }
  }
  return (
    <div className={'update-cta' + (open ? ' open' : '')}>
      <div>{updateMessage}</div>
      <div className={updating ? ' updating' : upToDate ? ' disabled' : ''}>
        <ButtonUpdate handleUpdate={handleUpdate} updating={updating} label={btnLabel} />
      </div>
    </div>
  )
}

export default UpdateCTA
