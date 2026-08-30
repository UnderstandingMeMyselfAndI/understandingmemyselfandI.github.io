import { useEffect } from 'react'

import useAppStore from '@store/useAppStore'

const Vcn = () => {
  // set first visit date
  const setFVD = useAppStore((s) => s.setFVD)
  // first visit date
  const fvd = useAppStore((s) => s.fd)
  // // set last visit date
  const setLVD = useAppStore((s) => s.setLVD)
  // // increment visit count
  const incVC = useAppStore((s) => s.incVC)

  window.addEventListener('vite:preloadError', () => {
    // console.log('vite:preloadError ' + event);
    // window.reload() // for example, refresh the page
  })
  // increment visit count

  useEffect(() => {
    incVC()
    const sinceEpoch = Math.floor(Date.now() / 1000)
    setLVD(sinceEpoch)
  }, [setLVD, incVC])

  useEffect(() => {
    const sinceEpoch = Math.floor(Date.now() / 1000)
    if (fvd === 0) setFVD(sinceEpoch)
  }, [setFVD, fvd])

  return <> </>
}

export default Vcn
