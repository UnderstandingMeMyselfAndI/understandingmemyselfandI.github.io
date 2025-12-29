import React, { useState, useEffect } from 'react';
import './CookieConsent.scss';
// Inject stylesheet
// const injectStyles = () => {
//   if (document.getElementById('cookie-consent-styles')) return;
  
//   const style = document.createElement('style');
//   style.id = 'cookie-consent-styles';
//   style.textContent = `
//     .cookie-consent-overlay {
//       position: fixed;
//       inset: 0;
//       z-index: 6000;
//       display: flex;
//       align-items: flex-end;
//       justify-content: center;
//       padding: 1rem;
//       pointer-events: none;
//     }

//     .cookie-banner {
//       background: white;
//       border-radius: 0.5rem;
//       box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//       max-width: 42rem;
//       width: 100%;
//       pointer-events: auto;
//       border: 1px solid #e5e7eb;
//     }

//     .cookie-banner-content {
//       padding: 1.5rem;
//     }

//     .cookie-banner-header {
//       display: flex;
//       align-items: flex-start;
//       gap: 1rem;
//     }

//     .cookie-icon-wrapper {
//       background: #dbeafe;
//       border-radius: 9999px;
//       padding: 0.75rem;
//       flex-shrink: 0;
//     }

//     .cookie-icon {
//       width: 1.5rem;
//       height: 1.5rem;
//       color: #2563eb;
//     }

//     .cookie-banner-text {
//       flex: 1;
//     }

//     .cookie-banner-title {
//       font-size: 1.25rem;
//       font-weight: 700;
//       color: #111827;
//       margin-bottom: 0.5rem;
//     }

//     .cookie-banner-description {
//       color: #4b5563;
//       font-size: 0.875rem;
//       margin-bottom: 1rem;
//     }

//     .cookie-banner-actions {
//       display: flex;
//       flex-wrap: wrap;
//       gap: 0.75rem;
//     }

//     .btn {
//       padding: 0.625rem 1.5rem;
//       border-radius: 0.5rem;
//       font-weight: 500;
//       transition: all 0.2s;
//       cursor: pointer;
//       border: none;
//       font-size: 1rem;
//       display: flex;
//       align-items: center;
//       gap: 0.5rem;
//     }

//     .btn-primary {
//       background: #2563eb;
//       color: white;
//     }

//     .btn-primary:hover {
//       background: #1d4ed8;
//     }

//     .btn-secondary {
//       background: #e5e7eb;
//       color: #374151;
//     }

//     .btn-secondary:hover {
//       background: #d1d5db;
//     }

//     .btn-outline {
//       border: 1px solid #d1d5db;
//       background: transparent;
//       color: #374151;
//     }

//     .btn-outline:hover {
//       background: #f9fafb;
//     }

//     .btn-icon {
//       width: 1rem;
//       height: 1rem;
//     }

//     .modal-overlay {
//       position: fixed;
//       inset: 0;
//       background: rgba(0, 0, 0, 0.5);
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 1rem;
//       pointer-events: auto;
//       z-index: 60;
//     }

//     .modal {
//       background: white;
//       border-radius: 0.5rem;
//       box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//       max-width: 42rem;
//       width: 100%;
//       max-height: 90vh;
//       overflow: auto;
//     }

//     .modal-header {
//       position: sticky;
//       top: 0;
//       background: white;
//       border-bottom: 1px solid #e5e7eb;
//       padding: 1.5rem;
//       display: flex;
//       align-items: center;
//       justify-content: space-between;
//     }

//     .modal-header-content {
//       display: flex;
//       align-items: center;
//       gap: 0.75rem;
//     }

//     .modal-title {
//       font-size: 1.5rem;
//       font-weight: 700;
//       color: #111827;
//     }

//     .modal-close {
//       color: #9ca3af;
//       cursor: pointer;
//       border: none;
//       background: transparent;
//       padding: 0;
//       transition: color 0.2s;
//     }

//     .modal-close:hover {
//       color: #4b5563;
//     }

//     .modal-body {
//       padding: 1.5rem;
//     }

//     .cookie-category {
//       border: 1px solid #e5e7eb;
//       border-radius: 0.5rem;
//       padding: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .cookie-category:last-child {
//       margin-bottom: 0;
//     }

//     .category-header {
//       display: flex;
//       align-items: flex-start;
//       justify-content: space-between;
//       margin-bottom: 0.5rem;
//     }

//     .category-content {
//       flex: 1;
//     }

//     .category-title {
//       font-weight: 600;
//       color: #111827;
//       margin-bottom: 0.25rem;
//     }

//     .category-description {
//       font-size: 0.875rem;
//       color: #4b5563;
//     }

//     .toggle-wrapper {
//       margin-left: 1rem;
//     }

//     .toggle {
//       width: 3rem;
//       height: 1.5rem;
//       border-radius: 9999px;
//       display: flex;
//       align-items: center;
//       transition: background-color 0.2s;
//       cursor: pointer;
//       border: none;
//       padding: 0;
//       position: relative;
//     }

//     .toggle-active {
//       background: #2563eb;
//     }

//     .toggle-inactive {
//       background: #d1d5db;
//     }

//     .toggle-disabled {
//       background: #d1d5db;
//       cursor: not-allowed;
//     }

//     .toggle-knob {
//       width: 1.25rem;
//       height: 1.25rem;
//       border-radius: 9999px;
//       background: white;
//       transition: transform 0.2s;
//       position: absolute;
//     }

//     .toggle-knob-left {
//       left: 0.125rem;
//     }

//     .toggle-knob-right {
//       right: 0.125rem;
//     }

//     .modal-footer {
//       position: sticky;
//       bottom: 0;
//       background: #f9fafb;
//       border-top: 1px solid #e5e7eb;
//       padding: 1.5rem;
//       display: flex;
//       gap: 0.75rem;
//     }

//     .btn-full {
//       flex: 1;
//       justify-content: center;
//     }

//     .demo-container {
//       min-height: 100vh;
//       background: linear-gradient(to bottom right, #eff6ff, #e0e7ff);
//       padding: 2rem;
//     }

//     .demo-content {
//       max-width: 56rem;
//       margin: 0 auto;
//     }

//     .demo-card {
//       background: white;
//       border-radius: 0.5rem;
//       box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
//       padding: 2rem;
//       margin-bottom: 2rem;
//     }

//     .demo-title {
//       font-size: 1.875rem;
//       font-weight: 700;
//       color: #111827;
//       margin-bottom: 1rem;
//     }

//     .demo-description {
//       color: #4b5563;
//       margin-bottom: 1.5rem;
//     }

//     .info-box {
//       border-radius: 0.5rem;
//       padding: 1rem;
//       margin-bottom: 1.5rem;
//     }

//     .info-box-blue {
//       background: #eff6ff;
//       border: 1px solid #bfdbfe;
//     }

//     .info-box-amber {
//       background: #fffbeb;
//       border: 1px solid #fde68a;
//     }

//     .info-box-title {
//       font-weight: 600;
//       margin-bottom: 0.5rem;
//     }

//     .info-box-blue .info-box-title {
//       color: #1e3a8a;
//     }

//     .info-box-amber .info-box-title {
//       color: #78350f;
//     }

//     .info-box-content {
//       font-size: 0.875rem;
//     }

//     .info-box-blue .info-box-content {
//       color: #1e40af;
//     }

//     .info-box-amber .info-box-content {
//       color: #92400e;
//     }

//     .info-list {
//       list-style: none;
//       padding: 0;
//       margin: 0;
//     }

//     .info-list li {
//       margin-bottom: 0.25rem;
//     }

//     .info-list-ordered {
//       list-style: decimal;
//       padding-left: 1.5rem;
//     }

//     .btn-danger {
//       background: #dc2626;
//       color: white;
//     }

//     .btn-danger:hover {
//       background: #b91c1c;
//     }

//     @media (max-width: 640px) {
//       .cookie-banner-actions {
//         flex-direction: column;
//       }

//       .btn {
//         width: 100%;
//         justify-content: center;
//       }

//       .modal-footer {
//         flex-direction: column;
//       }
//     }
//   `;
  
//   document.head.appendChild(style);
// };

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
  
    
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      loadScripts(parsed);
    } else {
      setShowBanner(true);
    }
  }, []);

  const loadScripts = (consentData) => {
		const id = 'G-YWBEQ7E972'

		if (consentData.analytics && !window.GA_INITIALIZED) {
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
    localStorage.setItem('cookieConsent', JSON.stringify(consentData));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    setConsent(consentData);
    loadScripts(consentData);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    const allConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    saveConsent(allConsent);
  };

  const handleRejectAll = () => {
    const minimalConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    saveConsent(minimalConsent);
  };

  const handleSaveSettings = () => {
    saveConsent(consent);
  };

  const handleToggle = (key) => {
    if (key === 'necessary') return;
    setConsent(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner && !showSettings) return null;

  return (
    <div className="cookie-consent-overlay">
      {showBanner && !showSettings && (
        <div className="cookie-banner">
          <div className="cookie-banner-content">
            <div className="cookie-banner-header">
              
              <div className="cookie-banner-text">
                <h2 className="cookie-banner-title">
                  We Value Your Privacy
                </h2>
                <p className="cookie-banner-description">
                  We use cookies to enhance your browsing experience, serve personalized 
                  content, and analyze our traffic. By clicking Accept All, you consent 
                  to our use of cookies.
                </p>
                <div className="cookie-banner-actions">
                  <button onClick={handleAcceptAll} className="btn btn-primary">
                    Accept All
                  </button>
                  <button onClick={handleRejectAll} className="btn btn-secondary">
                    Reject All
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSettings && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <div className="modal-header-content">
               
                <h2 className="modal-title">Privacy Settings</h2>
              </div>
              <button onClick={() => setShowSettings(false)} className="modal-close">
               X
              </button>
            </div>

            <div className="modal-body">
              <div className="cookie-category">
                <div className="category-header">
                  <div className="category-content">
                    <h3 className="category-title">Necessary Cookies</h3>
                    <p className="category-description">
                      Essential for the website to function properly. Cannot be disabled.
                    </p>
                  </div>
                  <div className="toggle-wrapper">
                    <div className="toggle toggle-disabled">
                      <div className="toggle-knob toggle-knob-right"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cookie-category">
                <div className="category-header">
                  <div className="category-content">
                    <h3 className="category-title">Analytics Cookies</h3>
                    <p className="category-description">
                      Help us understand how visitors interact with our website. 
                      Includes Google Analytics.
                    </p>
                  </div>
                  <button onClick={() => handleToggle('analytics')} className="toggle-wrapper">
                    <div className={`toggle ${consent.analytics ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div className={`toggle-knob ${consent.analytics ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="cookie-category">
                <div className="category-header">
                  <div className="category-content">
                    <h3 className="category-title">Marketing Cookies</h3>
                    <p className="category-description">
                      Used to track visitors across websites to display relevant ads.
                    </p>
                  </div>
                  <button onClick={() => handleToggle('marketing')} className="toggle-wrapper">
                    <div className={`toggle ${consent.marketing ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div className={`toggle-knob ${consent.marketing ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="cookie-category">
                <div className="category-header">
                  <div className="category-content">
                    <h3 className="category-title">Preference Cookies</h3>
                    <p className="category-description">
                      Remember your settings and preferences for a better experience.
                    </p>
                  </div>
                  <button onClick={() => handleToggle('preferences')} className="toggle-wrapper">
                    <div className={`toggle ${consent.preferences ? 'toggle-active' : 'toggle-inactive'}`}>
                      <div className={`toggle-knob ${consent.preferences ? 'toggle-knob-right' : 'toggle-knob-left'}`}></div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button onClick={handleSaveSettings} className="btn btn-primary btn-full">
                Save Preferences
              </button>
              <button onClick={handleAcceptAll} className="btn btn-secondary btn-full">
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default  CookieConsent;
