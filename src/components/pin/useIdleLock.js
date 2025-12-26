import { useEffect, useRef } from 'react'

/**
 * useIdleLock triggers `onIdle` callback after `timeout` ms of inactivity
 * User activity = mouse move, keyboard, touch
 */
export default function useIdleLock(onIdle, timeout = 5 * 60 * 1000) {
	const timer = useRef()

	const resetTimer = () => {
		clearTimeout(timer.current)
		timer.current = setTimeout(onIdle, timeout)
	}

	useEffect(() => {
		const events = ['mousemove', 'keydown', 'mousedown', 'touchstart']
		events.forEach((e) => window.addEventListener(e, resetTimer))

		resetTimer() // start timer on mount

		return () => {
			clearTimeout(timer.current)
			events.forEach((e) => window.removeEventListener(e, resetTimer))
		}
	}, [])
}
