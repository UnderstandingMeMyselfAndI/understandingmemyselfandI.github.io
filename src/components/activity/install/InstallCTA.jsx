import { useEffect, useState } from 'react'
import InstallPWA from 'ui/buttons/InstallPWA/InstallPWA'
import appleShareIcon from '/icons/apple-share-white-40x40.png'
import appleAddToHomescreen from '/icons/apple-add-to-homescreen-white-40x40.png'
import parse from 'html-react-parser'
import useAppStore from '@/store/useAppStore'
import { strings } from '@/data/config'
import { useOnInView } from 'react-intersection-observer'

// import PWAInstall from '@khmyznikov/pwa-install/react-legacy'
// import { PWAInstallElement } from '@khmyznikov/pwa-install'
// import UmmiIcon from 'components/icons/UmmiIcon2.svg'

import './styles.scss'

const InstallCTA = () => {
  const name = 'install'
  const id = 16

  //TODO: #16 Check this is working - don't show if already installed
  const content =
    strings.activity.find((activity) => activity.name === name) || null
  if (content === null) {
    console.warn('No content found for activity "Install"')
  }
  const activity = useAppStore((state) => state.activity)
  const isModal = useAppStore((state) => state.isModal)
  const setActivity = useAppStore((state) => state.setActivity)
  const setIsModal = useAppStore((state) => state.setIsModal)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setOpen(activity === id || !isModal)
  }, [activity, isModal])

  const inViewRef = useOnInView(
    (inView) => {
      if (!inView) {
        setActivity(-1)
        setIsModal(false)
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0% 0% 0% 0%',
    },
  )

  const appleUsersContent = 'Tap the <b><u>Share icon</u></b></b>'
  const appleUsersContent2 =
    '<br />on your device and then select <br /><b><u>Add to Home Screen</u></b>'

  const setIsInstalled = useAppStore((state) => state.setIsInstalled)
  const setIsInstallable = useAppStore((state) => state.setIsInstallable)
  const isInstalled = useAppStore((state) => state.isInstalled)
  const isInstallable = useAppStore((state) => state.isInstallable)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallBtn, setShowInstallBtn] = useState(true)
  const [showInstallCTA, setShowInstalCTA] = useState(false)

  // const [promptEvent, setPromptEvent] = useState(null)
  // const pwaInstallRef = (useRef < PWAInstallElement) | (null > null)

  function handleBeforeInstallPrompt(event) {
    event.preventDefault() // Prevent automatic prompt
    // app is installable
    setDeferredPrompt(event) // Store the event

    //  Show the install button
    setShowInstallBtn(true)
    setShowInstalCTA(true)
    setIsInstallable(true)
  }

  useEffect(() => {
    setIsInstallable(showInstallCTA)
  }, [showInstallCTA, setIsInstallable])

  function handleAppInstalled() {
    // isInstallable = false; // Hide the install button
    setShowInstallBtn(false)
    setIsInstalled(true)
    // Clear the deferredPrompt so it can be garbage collected
    setDeferredPrompt(null)
  }
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
  window.addEventListener('appinstalled', handleAppInstalled)

  useEffect(() => {
    // Cleanup on destroy
    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      )
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  })

  const handleClick = async () => {
    if (!deferredPrompt) return

    // pwaInstallRef.current?.showDialog(true)

    deferredPrompt.prompt() // Show the prompt

    const { choiceResult } = await deferredPrompt.userChoice

    if (choiceResult.outcome === 'accepted') {
      // User accepted the PWA installation
      setShowInstallBtn(false)
    } else {
      // User dismissed the PWA installation
      setShowInstallBtn(true)``
    }

    // Clear the deferredPrompt so it can be garbage collected
    setDeferredPrompt(null)
    //TODO: Send anayltics event
  }

  //TODO: #17 Check install process is working for all platform
  //TODO: #18 Create wide screen screenshots for install prompt

  return open
    ? !isInstalled && isInstallable && showInstallCTA && (
        <section
          className={
            'activity activity-installCTA ' + (open ? ' show' : ' hide')
          }
          ref={inViewRef}>
          <div id='install'>
            <h3>
              <u className='yellow-ul'>
                {!showInstallBtn
                  ? content?.cta?.postInstall?.title
                  : content?.cta?.title}
              </u>
            </h3>

            {showInstallBtn && (
              <div>
                {content?.cta?.content?.map((html, i) => {
                  return <p key={i}>{parse(html)}</p>
                })}

                <InstallPWA
                  handleClick={handleClick}
                  label={content?.cta?.btn?.label.unused}
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
                  return <p key={i}>{parse(html)}</p>
                })}
              </div>
            )}
          </div>
        </section>
      )
    : null
}

export default InstallCTA

/* 
https://github.com/khmyznikov/pwa-install       
<PWAInstall ref={pwaInstallRef} name='ummi' icon={UmmiIcon} externalPromptEvent={deferredPrompt} onPwaInstallAvailableEvent={handleOnPwaInstallAvailableEvent}></PWAInstall> 
*/
