import React ,{ useEffect, useState } from 'react'

import Logo from 'ui/logo/Logo'
import UmmiIcon from 'components/icons/UmmiIcon2.svg'
import "./InstallPWA.scss"
import { cnf } from 'data/config'
import useAppStore from '@/store/useAppStore'
// import isAppInstalled from '@/utils/isAppInstalled.js'

const InstallPWA = () => {

  const setIsInstalled = useAppStore(state => state.setIsInstalled);
  const isInstalled = useAppStore(state => state.isInstalled);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {

    setIsInstalled(!isInstallable);

  }, [isInstallable, setIsInstalled]);

   useEffect(() => {


   }, [isInstalled]);
  
  function handleBeforeInstallPrompt(event) {
        event.preventDefault(); // Prevent automatic prompt
        // deferredPrompt = event; // Store the event
        setDeferredPrompt(event);
        // isInstallable = true; // Show the install button
        setIsInstallable(true);
      }

      function handleAppInstalled() {
        // isInstallable = false; // Hide the install button
        setIsInstallable(false);
      }
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

  useEffect(() => {
      // Cleanup on destroy
      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    
  })

  const handleClick = async () => {
    
    if (!deferredPrompt) return;

    deferredPrompt.prompt(); // Show the prompt

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      // console.log('User accepted the PWA installation');
      setIsInstallable(false);
    } else {
      // console.log('User dismissed the PWA installation');
      setIsInstallable(true);
    }

    // Reset after interaction
    // deferredPrompt = null;
    setDeferredPrompt(null);
    // isInstallable = false;
   

  };

  return (
     <div>
      
        <button
           aria-label="install"
        className="install"
        onClick={handleClick}
      >
          <Logo classes='small' showText={false} /><span> Install Ummi</span>
        </button>
      </div>
  )
}
export default InstallPWA
    