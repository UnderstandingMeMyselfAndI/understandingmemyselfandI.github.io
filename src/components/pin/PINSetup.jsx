import React, { useState } from 'react'
import { deriveKey, dbSet } from './cryptoDB'
import { registerCredential } from './webauthn'

export default function PINSetup({ onDone }) {
	const [pin, setPin] = useState('')

	const handleSet = async () => {
		if (pin.length < 4) return alert('PIN too short')
		const salt = crypto.getRandomValues(new Uint8Array(16))
		await dbSet('salt', Array.from(salt))
		const key = await deriveKey(pin, salt)
		await dbSet('state', { iv: [], data: [] }) // empty encrypted state

		// Optional biometric
		if (window.confirm('Enable biometric unlock?')) {
			const cred = await registerCredential()
			if (cred) await dbSet('webauthn', cred)
		}
		onDone(key)
	}

	return (
		<div>
			<p>Set a local privacy PIN (optional)</p>
			<input type='password' value={pin} onChange={(e) => setPin(e.target.value)} placeholder='4–6 digit PIN' />
			<button onClick={handleSet}>Set PIN</button>
			<button onClick={() => onDone(null)}>Skip</button>
		</div>
	)
}
