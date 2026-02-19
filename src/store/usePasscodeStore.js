import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { del, get, set } from 'idb-keyval'

// Web Crypto API for encryption
const crypto = window.crypto || window.msCrypto

// Encryption/Decryption helper functions
const encrypt = async (data, key) => {
  const iv = crypto.getRandomValues(new Uint8Array(16))
  const encoded = new TextEncoder().encode(data)
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded)
  return { iv, encrypted }
}

const decrypt = async (data, key) => {
  const { iv, encrypted } = data
  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted)
  return new TextDecoder().decode(decrypted)
}

// Secure storage using Web Crypto
const secureStorage = {
  getItem: async (name) => {
    const encrypted = await get(name)
    if (!encrypted) return null
    return decrypt(encrypted, key)
  },
  setItem: async (name, value) => {
    const encrypted = await encrypt(value, key)
    await set(name, encrypted)
  },
  removeItem: async (name) => {
    await del(name)
  }
}

// Generate secure key from user's passcode
const generateKey = async (passcode) => {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(passcode),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  )
  return key
}

// Security-enhanced state
const usePasscodeStore = create(
  persist(
    (set, get) => ({
      // --- PASSCODE MANAGEMENT ---
      passcodeHash: '',
      passcodeSalt: '',
      hasPasscode: false,
      isPasscodeVerified: false,
      passcodeVerifiedUntil: 0,
      failedAttempts: 0,
      lockoutUntil: 0,

      setPasscode: async (passcode) => {
        const key = await generateKey(passcode)
        const { iv, encrypted } = await encrypt(passcode, key)
        const secureData = await secureStorage.setItem('passcode', { iv, encrypted })
        set(function() {
          return {
            passcodeHash: secureData.iv,
            passcodeSalt: secureData.encrypted,
            hasPasscode: true,
            isPasscodeVerified: true,
            passcodeVerifiedUntil: Date.now() + (30 * 60 * 1000), // 30 minutes
            failedAttempts: 0,
            lockoutUntil: 0,
          }
        });
      },

      verifyPasscode: async (passcode) => {
        const { passcodeHash, passcodeSalt } = get();
        if (!passcodeHash || !passcodeSalt) return false;
        const key = await generateKey(passcode);
        const { iv, encrypted } = await secureStorage.getItem('passcode');
        const decrypted = await decrypt({ iv, encrypted }, key);
        return decrypted === passcode;
      },

      // ... other state management functions ...
    }), {
      name: 'ummi-passcode',
      storage: createJSONStorage(() => secureStorage),
      partialize: function(state) {
        return {
          passcodeHash: state.passcodeHash,
          passcodeSalt: state.passcodeSalt,
          hasPasscode: state.hasPasscode,
          isPasscodeVerified: state.isPasscodeVerified,
          passcodeVerifiedUntil: state.passcodeVerifiedUntil,
          failedAttempts: state.failedAttempts,
          lockoutUntil: state.lockoutUntil,
        }
      }
    }
  ),
  {
    name: 'ummi',
    storage: createJSONStorage(() => secureStorage),
    partialize: function(state) {
      return {
        passcodeHash: state.passcodeHash,
        passcodeSalt: state.passcodeSalt,
        hasPasscode: state.hasPasscode,
        isPasscodeVerified: state.isPasscodeVerified,
        passcodeVerifiedUntil: state.passcodeVerifiedUntil,
        failedAttempts: state.failedAttempts,
        lockoutUntil: state.lockoutUntil,
      }
    }
  }
)

export default usePasscodeStore
