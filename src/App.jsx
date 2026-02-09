'use client'
// import React from "react";

import Routing from './components/routing/Routing'
import { useThemeStore } from '@/store/useThemeStore'
import useAppStore from './store/useAppStore'
import applyTheme from 'components/theme/applyTheme'
import ScrollPosition from 'components/utils/ScrollPosition'
import Header from '@/components/activity/header/Header.jsx'
import Footer from '@/components/activity/footer/Footer'
import PrivacyPolicy from './components/activity/privacy/PrivacyPolicy'
import Introduction from '@/components/activity/introduction/Introduction'
import YourPrivacyCTA from './components/activity/privacy/YourPrivacyCTA'
import Tools from 'components/activity/tools/Tools.jsx'
import ToolsCTA from 'components/activity/tools/ToolsCTA.jsx'
import WallpapersCTA from './components/activity/wallpapers/WallpapersCTA'
import Backdrop from '@/components/backdrop/Backdrop'

import SnackBars from 'ui/snackbars/SnackBars.jsx'
import InstallCTA from '@/components/activity/install/InstallCTA'
// import AcronymCard from "ui/cards/AcronymCard.jsx";
import AcronymExplained from './components/activity/acronymExplained/AcronymExplained'
import DaysCounter from './components/activity/daysCounter/DaysCounter'
import DaysCounterCTA from './components/activity/daysCounter/DaysCounterCTA'
import AppMenu from './components/ui/menu/AppMenu'
import CookieConsent from './components/activity/cookieConsent/CookieConsent'
import UmmiAgeGate from './components/ageGate/UmmiAgeGate'
import AppLoading from '@/components/ui/loading/AppLoading'
import { smoothScroll } from './js/utils.js'
import NewsletterSignUp from './components/activity/newsletterSignup/NewsletterSignUp'
import Exit from './components/ui/exit/Exit'
import Settings from './components/activity/settings/Settings'
import Vcn from './components/visits/Vcn.jsx'
import Lingo from './components/activity/lingo/Lingo'
import UnitsCalculator from './components/activity/unitsCalculator/UnitsCalculator'
import UnitsCalculatorCTA from './components/activity/unitsCalculator/UnitsCalculatorCTA'
import WallpaperGallery from './components/activity/wallpapers/WallpaperGallery'

import VerticalTimeline from './components/activity/timeline/VerticalTimeline'
import { runPersistentStorageTests } from './js/utils.js'
import './App.scss'
//TODO #41 Add Pop up confirm box with disclaimer. with timely reminder.
//TODO #42 Add setting to remove reminder in settings
// TODO: #21 "Clear Local Data" functionality
function App() {
  const daysCounterEnabled = useAppStore((s) => s.daysCounterEnabled)
  // const enableYourTools = useAppStore((s) => s.enableYourTools)
  const quickExitEnabled = useAppStore((s) => s.quickExitEnabled)
  const unitsCalculatorEnabled = useAppStore((s) => s.unitsCalculatorEnabled)

  const ageVerified = useAppStore((s) => s.ageVerified)
  const hasHydrated = useAppStore((s) => s._hasHydrated)

  smoothScroll()
  const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme)

  if (theme !== null) {
    applyTheme({ theme: theme })
    useThemeStore.setState({
      theme: theme,
    })
  }

  if (!hasHydrated) {
    return <AppLoading />
  }

  if (!ageVerified) {
    return <UmmiAgeGate />
  }

  return (
    <div>
      <div className='main'>
        {/* <div className='dev-version'>Development Version.</div> */}
        <AppMenu />

        {quickExitEnabled && <Exit />}

        {/* <div id='centers'>
          <div className='vertical'></div>
          <div className='horizontal'></div>
        </div> */}
        {/* <div className='dev-version'>Development Version.</div> */}

        {/* <RecoveryTimelineParent /> */}
        {/* <Header /> */}
        {/* <Introduction /> */}
        {/* <WallpaperGallery /> */}
        <VerticalTimeline />
        {/* <Tools /> */}
        {/* <PrivacyPolicy />

        <ToolsCTA />
        {daysCounterEnabled && <DaysCounterCTA />}
        {unitsCalculatorEnabled && <UnitsCalculatorCTA />}
        <Lingo />
        <WallpapersCTA />
        <YourPrivacyCTA />

        <NewsletterSignUp />
        <InstallCTA />
        <Footer /> */}

        {/* <Motivation /> */}
        {/* {quickExitEnabled && <Exit />} */}
        {unitsCalculatorEnabled && <UnitsCalculator />}
        {daysCounterEnabled && <DaysCounter />}
        <AcronymExplained />
        <Settings />

        <SnackBars />
        <ScrollPosition />
      </div>
      <Backdrop
        initialImageId={2}
        initialDelay={3000}
        interval={6000}
        parallaxStrength={0}
        className='backdrop'
      />
      <Routing />
      <Vcn />
      <CookieConsent />
    </div>
  )
}

export default App
