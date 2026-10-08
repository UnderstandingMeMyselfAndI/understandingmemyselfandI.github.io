'use client'
// import React from "react";

import Routing from '@components/routing/Routing'
import { useThemeStore } from '@store/useThemeStore'
import useAppStore from '@store/useAppStore'
import applyTheme from '@components/theme/applyTheme'
import Header from '@activity/header/Header.jsx'
import Footer from '@activity/footer/Footer'
import PrivacyPolicy from '@activity/privacy/PrivacyPolicy'
import Introduction from '@activity/introduction/Introduction'
import YourPrivacyCTA from '@activity/privacy/YourPrivacyCTA'
import Tools from '@activity/tools/Tools.jsx'
import ToolsCTA from '@activity/tools/ToolsCTA.jsx'
import WallpapersCTA from '@activity/wallpapers/WallpapersCTA'
import Backdrop from '@components/backdrop/Backdrop'

import SnackBars from '@ui/snackbars/SnackBars.jsx'
import InstallCTA from '@activity/install/InstallCTA'
// import AcronymCard from "ui/cards/AcronymCard.jsx";
import AcronymExplained from '@activity/acronymExplained/AcronymExplained'
import DaysCounter from '@activity/daysCounter/DaysCounter'
import DaysCounterCTA from '@activity/daysCounter/DaysCounterCTA'
import AppMenu from '@ui/menu/AppMenu'
import CookieConsent from '@activity/cookieConsent/CookieConsent'
import UmmiAgeGate from '@components/ageGate/UmmiAgeGate'
import AppLoading from '@ui/loading/AppLoading'
import { smoothScroll } from '@js/utils.js'
import NewsletterSignUp from '@activity/newsletterSignup/NewsletterSignUp'
import Exit from '@ui/exit/Exit'
import Settings from '@activity/settings/Settings'
import Vcn from '@components/visits/Vcn.jsx'
import Lingo from '@activity/lingo/Lingo'
import UnitsCalculator from '@activity/unitsCalculator/UnitsCalculator'
import UnitsCalculatorCTA from '@activity/unitsCalculator/UnitsCalculatorCTA'
import WallpaperGallery from '@activity/wallpapers/WallpaperGallery'
import WheelOfLife from '@activity/wheeloflife/WheelOfLife'
import WheelOfLifeCTA from '@activity/wheeloflife/WheelOfLifeCTA'
import VerticalTimeline from '@activity/timeline/VerticalTimeline'
import TimelineCTA from '@activity/timeline/TimelineCTA'
import Quiz from '@activity/quiz/Quiz'
import QuizCTA from '@activity/quiz/QuizCTA'
import PengGameAI from '@activity/games/peng/PengGameAI'
// import { runPersistentStorageTests } from './js/utils.js'
import './App.scss'
import './scss/_fonts.scss'
// import AccessibilitySettings from './components/ui/AccessibilitySettings/AccessibilitySettings'
//TODO #41 Add Pop up confirm box with disclaimer. with timely reminder.
//TODO #42 Add setting to remove reminder in settings
//TODO #21 "Clear Local Data" functionality
//TODO #43 Styling of cookie consent
//TODO #67 #66 New features Urges and Cravings logs
// Needed for Service Worker update itself
window.__APP_LOADED = true

function App() {
  // Customise display of features
  const daysCounterEnabled = useAppStore((s) => s.daysCounterEnabled)
  const quickExitEnabled = useAppStore((s) => s.quickExitEnabled)
  const unitsCalculatorEnabled = useAppStore((s) => s.unitsCalculatorEnabled)
  const wheelOfLifeEnabled = useAppStore((s) => s.wheelOfLifeEnabled)
  const quizEnabled = useAppStore((s) => s.quizEnabled)
  const toolsEnabled = useAppStore((s) => s.toolsEnabled)
  const smoothScrollEnabled = useAppStore((s) => s.smoothScrollEnabled)
  // Verification
  const ageVerified = useAppStore((s) => s.ageVerified)
  const savedConsent = localStorage.getItem('cookieConsent')
  // Hydration
  const hasHydrated = useAppStore((s) => s._hasHydrated)

  if (smoothScrollEnabled) smoothScroll()

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
        <AppMenu />
        {quickExitEnabled && <Exit />}
        <Header />
        <Introduction />
        <WallpaperGallery />
        <VerticalTimeline />
        {wheelOfLifeEnabled && <WheelOfLife />}
        {toolsEnabled && <Tools />}
        <PrivacyPolicy />
        {quizEnabled && <Quiz />}
        <PengGameAI />
        {toolsEnabled && <ToolsCTA />}
        {daysCounterEnabled && <DaysCounterCTA />}
        {unitsCalculatorEnabled && <UnitsCalculatorCTA />}
        <TimelineCTA />
        {wheelOfLifeEnabled && <WheelOfLifeCTA />}
        <Lingo />
        {quizEnabled && <QuizCTA />}
        <WallpapersCTA />
        <YourPrivacyCTA />
        <NewsletterSignUp />
        <InstallCTA />
        <Footer />
        {quickExitEnabled && <Exit />}
        {unitsCalculatorEnabled && <UnitsCalculator />}
        {daysCounterEnabled && <DaysCounter />}
        <AcronymExplained />
        <Settings />
        <SnackBars />
      </div>
      <Backdrop initialImageId={2} initialDelay={3000} interval={6000} parallaxStrength={0} className='backdrop' />
      <Routing />
      <Vcn />
      {!savedConsent && <CookieConsent />}
    </div>
  )
}

export default App
