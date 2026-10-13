// src/utils/useStorageQuota.js
// React binding for the shared storage-quota watcher.

import { useEffect, useState } from 'react'
import { getLastStorageSnapshot, subscribeStorage } from './storageQuota'

export function useStorageQuota() {
  const [snapshot, setSnapshot] = useState(() => getLastStorageSnapshot())

  useEffect(() => subscribeStorage(setSnapshot), [])

  return snapshot
}

export default useStorageQuota
