import React, { useState, useEffect } from 'react'
import './CookieConsent.scss'
import useAppStore from '@/store/useAppStore'

const CookieConsent = () => {
  const setGae = useAppStore((state) => state.setGAE)
  const [show, setShow] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  })

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent')
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent)
      setConsent(parsed)
      setGae(parsed.analytics) // Sync gae with saved analytics consent
      loadScripts(parsed)
    } else {
      setShow(true)
    }
  }, [])

  const loadScripts = (consentData) => {
    const id = 'G-YWBEQ7E972'

    console.log('loadScripts consentData ', consentData)
    console.log('loadScripts window.GA_INITIALIZED ', window.GA_INITIALIZED)

    if (consentData.analytics && !window.GA_INITIALIZED) {
      var head = document.getElementsByTagName('head')[0]
      const gaScript = document.createElement('script')
      gaScript.async = true
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + id
      document.head.appendChild(gaScript)

      gaScript.onload = () => {
        window.dataLayer = window.dataLayer || []
        function gtag() {
          window.dataLayer.push(arguments)
        }
        window.gtag = gtag
        gtag('js', new Date())
        gtag('config', id, {
          anonymize_ip: true,
          cookie_flags: 'SameSite=None;Secure',
        })
        window.GA_INITIALIZED = true
      }
    }

    if (consentData.marketing && !window.MARKETING_INITIALIZED) {
      window.MARKETING_INITIALIZED = true
    }

    // if (consentData.preferences) {
    //   console.log('Preference cookies enabled');
    // }
  }

  const saveConsent = (consentData) => {
    localStorage.setItem('cookieConsent', JSON.stringify(consentData))
    localStorage.setItem('cookieConsentDate', new Date().toISOString())
    setConsent(consentData)
    loadScripts(consentData)
    setShow(false)
    setShowSettings(false)
  }

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    }
    saveConsent(allConsent)
    setGae(true)
  }

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    }
    saveConsent(minimalConsent)
    setGae(false) // Explicitly disable analytics tracking
  }

  const handleSaveSettings = () => {
    saveConsent(consent)
    setGae(consent.analytics) // Sync gae with analytics setting
  }

  const handleToggle = (key) => {
    if (key === 'necessary') return
    setConsent((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  if (!show && !showSettings) return null

  return (
    <div
      className={
        'activity activity-cookie-consent-overlay' + (show ? ' show' : '')
      }>
      {show && !showSettings && (
        <div className='cookie-banner'>
          <div className='cookie-banner-content'>
            <div className='cookie-banner-header'>
              <div className='cookie-banner-text'>
                <h2 className='cookie-banner-title'>Yum. Our Cookies.</h2>
                <h4 className='cookie-banner-title-sml'>
                  We Value Your Privacy
                </h4>
                <p className='cookie-banner-description'>
                  We use cookies to enhance your browsing experience, serve
                  personalized content, and analyze our traffic. By clicking
                  Accept All, you consent to our use of cookies.
                </p>
                <div className='cookie-banner-actions'>
                  <button onClick={handleAcceptAll} className='btn btn-primary'>
                    Accept All
                  </button>
                  <button
                    onClick={handleRejectAll}
                    className='btn btn-secondary'>
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className='modal-overlay'>
          <div className='modal'>
            <div className='modal-header'>
              <div className='modal-header-content'>
                <h2 className='modal-title'>Privacy Settings</h2>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className='modal-close'>
                X
              </button>
            </div>

            <div className='modal-body'>
              <div className='cookie-category'>
                <div className='category-header'>
                  <div className='category-content'>
                    <h3 className='category-title'>Necessary Cookies</h3>
                    <p className='category-description'>
                      Essential for the website to function properly. Cannot be
                      disabled.
                    </p>
                  </div>
                  <div className='toggle-wrapper'>
                    <div className='toggle toggle-disabled'>
                      <div className='toggle-knob toggle-knob-right'></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='cookie-category'>
                <div className='category-header'>
                  <div className='category-content'>
                    <h3 className='category-title'>Analytics Cookies</h3>
                    <p className='category-description'>
                      Help us understand how visitors interact with our website.
                      Includes Google Analytics.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('analytics')}
                    className='toggle-wrapper'>
                    <div
                      className={`toggle ${consent.analytics ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div
                        className={`toggle-knob ${consent.analytics ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className='cookie-category'>
                <div className='category-header'>
                  <div className='category-content'>
                    <h3 className='category-title'>Marketing Cookies</h3>
                    <p className='category-description'>
                      Used to track visitors across websites to display relevant
                      ads.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('marketing')}
                    className='toggle-wrapper'>
                    <div
                      className={`toggle ${consent.marketing ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div
                        className={`toggle-knob ${consent.marketing ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className='cookie-category'>
                <div className='category-header'>
                  <div className='category-content'>
                    <h3 className='category-title'>Preference Cookies</h3>
                    <p className='category-description'>
                      Remember your settings and preferences for a better
                      experience.
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle('preferences')}
                    className='toggle-wrapper'>
                    <div
                      className={`toggle ${consent.preferences ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div
                        className={`toggle-knob ${consent.preferences ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <button
                onClick={handleSaveSettings}
                className='btn btn-primary btn-full'>
                Save Preferences
              </button>
              <button
                onClick={handleAcceptAll}
                className='btn btn-secondary btn-full'>
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CookieConsent
