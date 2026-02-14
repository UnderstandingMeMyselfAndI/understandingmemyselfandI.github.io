import React from 'react'
import { getAssertion } from './webauthn'
import { dbGet, deriveKey } from './cryptoDB'

export default function BiometricUnlock({ onUnlock }) {
  const handleBiometric = async () => {
    const assertion = await getAssertion()
    if (!assertion) return alert('Biometric failed or unavailable')

    const saltArr = await dbGet('salt')
    if (!saltArr) return alert('PIN not set')

    const pin = prompt('Biometric verified! Enter your PIN to derive key:')
    try {
      const key = await deriveKey(pin, new Uint8Array(saltArr))
      onUnlock(key)
    } catch {
      alert('Failed to derive key')
    }
  }

  return <button onClick={handleBiometric}>Unlock with Biometrics</button>
}
