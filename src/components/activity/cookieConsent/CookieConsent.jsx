import React, { useState, useEffect } from 'react'
import './CookieConsent.scss'
import useAppStore from '@store/useAppStore'

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

  return show ? (
    <div className={'activity activity-cookie-consent-overlay' + (show ? ' show' : '')}>
      {show && !showSettings && (
        <div className='cookie-banner'>
          <div className='cookie-banner__content'>
            <div className='cookie-banner__header'>
              <div className='cookie-banner__text'>
                <h2 className='cookie-banner__title'>Our Cookies. Yum.</h2>
                <h4 className='cookie-banner__subtitle'>We Value Your Privacy</h4>
                <p className='cookie-banner__description'>
                  We use cookies to enhance your browsing experience, serve personalized content, and analyze our
                  traffic. By clicking Accept All, you consent to our use of cookies.
                </p>
                <div className='cookie-banner__actions'>
                  <button onClick={handleAcceptAll} className='btn cookie-banner__btn-primary' id='accept-all-btn'>
                    Accept All
                  </button>
                  <button onClick={handleRejectAll} className='btn cookie-banner__btn-reject'>
                    Reject All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className='modal'>
          <div className='modal__wrap'>
            <div className='modal__header'>
              <div className='modal__header-content'>
                <h2 className='modal__title'>Privacy Settings</h2>
              </div>
              <button onClick={() => setShowSettings(false)} className='modal__close'>
                X
              </button>
            </div>

            <div className='modal__body'>
              <div className='cookie-category'>
                <div className='cookie-category__header'>
                  <div className='cookie-category__content'>
                    <h3 className='cookie-category__title'>Necessary Cookies</h3>
                    <p className='cookie-category__description'>
                      Essential for the website to function properly. Cannot be disabled.
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
                <div className='cookie-category__header'>
                  <div className='cookie-category__content'>
                    <h3 className='cookie-category__title'>Analytics Cookies</h3>
                    <p className='cookie-category__description'>
                      Help us understand how visitors interact with our website. Includes Google Analytics.
                    </p>
                  </div>
                  <button onClick={() => handleToggle('analytics')} className='toggle-wrapper'>
                    <div className={`toggle ${consent.analytics ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div
                        className={`toggle-knob ${consent.analytics ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className='cookie-category__category'>
                <div className='cookie-category__header'>
                  <div className='cookie-category__content'>
                    <h3 className='cookie-category__title'>Marketing Cookies</h3>
                    <p className='cookie-category__description'>
                      Used to track visitors across websites to display relevant ads.
                    </p>
                  </div>
                  <button onClick={() => handleToggle('marketing')} className='toggle-wrapper'>
                    <div className={`toggle ${consent.marketing ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div
                        className={`toggle-knob ${consent.marketing ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className='cookie-category'>
                <div className='cookie-category__header'>
                  <div className='cookie-category__content'>
                    <h3 className='cookie-category__title'>Preference Cookies</h3>
                    <p className='cookie-category__description'>
                      Remember your settings and preferences for a better experience.
                    </p>
                  </div>
                  <button onClick={() => handleToggle('preferences')} className='toggle-wrapper'>
                    <div className={`toggle ${consent.preferences ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div
                        className={`toggle-knob ${consent.preferences ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className='modal-footer'>
              <button onClick={handleSaveSettings} className='btn cookie-banner__btn-primary btn-full'>
                Save Preferences
              </button>
              <button onClick={handleAcceptAll} className='btn cookie-banner__btn-reject btn-full'>
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : null
}

export default CookieConsent
