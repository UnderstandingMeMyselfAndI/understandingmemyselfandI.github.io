import React, { useState } from 'react'
import { deriveKey, dbGet, decryptData } from './cryptoDB'
import BiometricUnlock from './BiometricUnlock'

export default function PINUnlock({ onUnlock }) {
	const [pin, setPin] = useState('')

	const handleUnlock = async () => {
		const saltArr = await dbGet('salt')
		if (!saltArr) return alert('No PIN set')

		try {
			const key = await deriveKey(pin, new Uint8Array(saltArr))
			const encState = await dbGet('state')
			if (encState?.iv?.length) await decryptData(key, encState)
			onUnlock(key)
		} catch {
			alert('Wrong PIN')
		}
	}

	return (
		<div>
			<p>Enter your PIN</p>
			<input type='password' value={pin} onChange={(e) => setPin(e.target.value)} />
			<button onClick={handleUnlock}>Unlock</button>
			<BiometricUnlock onUnlock={onUnlock} />
		</div>
	)
}
