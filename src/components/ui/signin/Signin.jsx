import { useState, useEffect } from 'react'

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { initializeUI } from '@firebase-oss/ui-core'
import { getAuth } from 'firebase/auth'
import { getAnalytics } from 'firebase/analytics'
import { autoAnonymousLogin } from '@firebase-oss/ui-core'
import { recaptchaVerification } from '@firebase-oss/ui-core'
import PropTypes from 'prop-types'

import './styles.scss'
import '@firebase-oss/ui-styles/dist.min.css'

const Signin = () => {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: 'AIzaSyBXErkUs7aUFgDxM7LOWDQOZCULI57nnVc',
    authDomain: 'ummi2025.firebaseapp.com',
    projectId: 'ummi2025',
    storageBucket: 'ummi2025.firebasestorage.app',
    messagingSenderId: '699664105913',
    appId: '1:699664105913:web:6c7f89a2b8fa9e8f783668',
    measurementId: 'G-YWBEQ7E972',
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app)

  const analytics = getAnalytics(app)

  const ui = initializeUI({
    app,
    behaviors: [
      recaptchaVerification({
        size: 'compact', // "normal" | "invisible" | "compact"
        theme: 'dark', // "light" | "dark"
      }),
    ],
  })

  // Subscribe to UI changes
  ui.listen((ui) => {
    console.log('State changed', ui.state) // loading | pending | idle
    console.log('Current locale', ui.locale)
    console.log('MFA Assertion', ui.multiFactorResolver)
  })

  // Update the store
  store.setKey('state', 'loading')
}

export default Signin
