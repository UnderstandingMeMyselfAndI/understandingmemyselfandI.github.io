import { useEffect, useState } from 'react';
import InstallPWA from 'ui/buttons/InstallPWA/InstallPWA';
import appleShareIcon from '/icons/apple-share-white-40x40.png';
import appleAddToHomescreen from '/icons/apple-add-to-homescreen-white-40x40.png';
import parse from 'html-react-parser';
import useAppStore from '@/store/useAppStore';
import { strings } from '@/data/config';
// import PWAInstall from '@khmyznikov/pwa-install/react-legacy'
// import { PWAInstallElement } from '@khmyznikov/pwa-install'
// import UmmiIcon from 'components/icons/UmmiIcon2.svg'

import './styles.scss';

const InstallCTA = () => {
  //TODO: Check this is working - don't show if already installed
  const content =
    strings.activity.find((activity) => activity.name === 'install') || null;
  if (content === null) {
    console.warn('No content found for activity "Install"');
  }
  const activity = useAppStore((state) => state.activity);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  const appleUsersContent = 'Tap the <b><u>Share icon</u></b></b>';
  const appleUsersContent2 =
    '<br />on your device and then select <br /><b><u>Add to Home Screen</u></b>';

  const setIsInstalled = useAppStore((state) => state.setIsInstalled);
  const setIsInstallable = useAppStore((state) => state.setIsInstallable);
  const isInstalled = useAppStore((state) => state.isInstalled);
  const isInstallable = useAppStore((state) => state.isInstallable);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(true);
  const [showInstallCTA, setShowInstalCTA] = useState(false);

  // const [promptEvent, setPromptEvent] = useState(null)
  // const pwaInstallRef = (useRef < PWAInstallElement) | (null > null)

  function handleBeforeInstallPrompt(event) {
    event.preventDefault(); // Prevent automatic prompt
    // app is installable
    console.log('isInstallable');
    setDeferredPrompt(event); // Store the event

    //  Show the install button
    setShowInstallBtn(true);
    setShowInstalCTA(true);
    setIsInstallable(true);
  }

  function handleAppInstalled() {
    // isInstallable = false; // Hide the install button
    setShowInstallBtn(false);
    setIsInstalled(true);
    // Clear the deferredPrompt so it can be garbage collected
    setDeferredPrompt(null);
  }
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);

  useEffect(() => {
    // Cleanup on destroy
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  });

  const handleClick = async () => {
    console.log('handleClick');
    console.log('deferredPrompt', deferredPrompt);
    if (!deferredPrompt) return;

    // pwaInstallRef.current?.showDialog(true)

    deferredPrompt.prompt(); // Show the prompt

    const { choiceResult } = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      // User accepted the PWA installation
      setShowInstallBtn(false);
    } else {
      // User dismissed the PWA installation
      setShowInstallBtn(true)``;
    }

    // Clear the deferredPrompt so it can be garbage collected
    setDeferredPrompt(null);
    //TODO: Send anayltics event
  };

  //TODO: Install process not working
  // console.log('isInstalled', isInstalled)
  // console.log('isInstallable', isInstallable)
  // console.log('showInstallBtn', showInstallBtn)

  // const handleOnPwaInstallAvailableEvent = (e) => {
  // 	console.log('handleOnPwaInstallAvailableEvent', e)
  // }

  return open ? (
    <div>
      {!isInstalled && isInstallable && showInstallCTA && (
        <section>
          <div className='installCTA cta' id='install'>
            <h3>
              <u>
                <span>
                  {!showInstallBtn
                    ? content?.cta?.postInstall?.title
                    : content?.cta?.title}
                </span>
              </u>
            </h3>

            {showInstallBtn && (
              <div>
                {content?.cta?.content?.map((html, i) => {
                  return <p key={i}>{parse(html)}</p>;
                })}

                <InstallPWA
                  handleClick={handleClick}
                  label={content?.cta?.btn?.label}
                />
                <div className='title'>Apple users:</div>
                <p>
                  <span>{parse(appleUsersContent)}</span>
                  <img
                    src={appleShareIcon}
                    className='shareIcon'
                    alt='apple share icon'
                  />
                  <span>{parse(appleUsersContent2)}</span>
                  <img
                    src={appleAddToHomescreen}
                    className='homescreenIcon'
                    alt='apple add to homescreen icon'
                  />
                </p>
              </div>
            )}
            {!showInstallBtn && (
              <div>
                {content?.cta?.postInstall?.content?.map((html, i) => {
                  return <p key={i}>{parse(html)}</p>;
                })}
              </div>
            )}
          </div>
        </section>
      )}
      {/* https://github.com/khmyznikov/pwa-install */}
      {/* <PWAInstall ref={pwaInstallRef} name='ummi' icon={UmmiIcon} externalPromptEvent={deferredPrompt} onPwaInstallAvailableEvent={handleOnPwaInstallAvailableEvent}></PWAInstall> */}
    </div>
  ) : null;
};

export default InstallCTA;
