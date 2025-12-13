 const clearCookieConsent = () => {
    localStorage.removeItem('cookieConsent');
    localStorage.removeItem('cookieConsentDate');
    window.location.reload();
  };
  
  export default clearCookieConsent;