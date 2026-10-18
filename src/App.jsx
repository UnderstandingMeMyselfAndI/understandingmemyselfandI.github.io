'use client'
import { useEffect } from 'react'
import Routing from '@components/routing/Routing'
import { useThemeStore } from '@store/useThemeStore'
import useAppStore from '@store/useAppStore'
import applyTheme from '@components/theme/applyTheme'
import Header from '@activity/header/Header.jsx'
import Footer from '@activity/footer/Footer'
import Introduction from '@activity/introduction/Introduction'
import YourPrivacyCTA from '@activity/privacy/YourPrivacyCTA'
import ToolsCTA from '@activity/tools/ToolsCTA.jsx'
import WallpapersCTA from '@activity/wallpapers/WallpapersCTA'
import Backdrop from '@components/backdrop/Backdrop'

import SnackBars from '@ui/snackbars/SnackBars.jsx'
import PasscodeDialogController from './components/security/PasscodeDialogController'
import InstallCTA from '@activity/install/InstallCTA'
import DaysCounterCTA from '@activity/daysCounter/DaysCounterCTA'
import AppMenu from '@ui/menu/AppMenu'
import CookieConsent from '@activity/cookieConsent/CookieConsent'
import UmmiAgeGate from '@components/ageGate/UmmiAgeGate'
import AppLoading from '@ui/loading/AppLoading'
import { smoothScroll } from '@js/utils.js'
import NewsletterSignUp from '@activity/newsletterSignup/NewsletterSignUp'
import Exit from '@ui/exit/Exit'
import Vcn from '@components/visits/Vcn.jsx'
import Lingo from '@activity/lingo/Lingo'
import UnitsCalculatorCTA from '@activity/unitsCalculator/UnitsCalculatorCTA'
import WheelOfLifeCTA from '@activity/wheeloflife/WheelOfLifeCTA'
import TimelineCTA from '@activity/timeline/TimelineCTA'
import QuizCTA from '@activity/quiz/QuizCTA'
import ActivityHost from '@components/activity/ActivityHost'
import Home from '@activity/home/Home'
import { prefetchAllActivities } from './components/activity/activityLoaders'
import './App.scss'
import './scss/_fonts.scss'

window.__APP_LOADED = true

function App() {
  // Feature flags
  const daysCounterEnabled = useAppStore((s) => s.daysCounterEnabled)
  const quickExitEnabled = useAppStore((s) => s.quickExitEnabled)
  const unitsCalculatorEnabled = useAppStore((s) => s.unitsCalculatorEnabled)
  const wheelOfLifeEnabled = useAppStore((s) => s.wheelOfLifeEnabled)
  const quizEnabled = useAppStore((s) => s.quizEnabled)
  const toolsEnabled = useAppStore((s) => s.toolsEnabled)
  const smoothScrollEnabled = useAppStore((s) => s.smoothScrollEnabled)

  // Verification
  const ageVerified = useAppStore((s) => s.ageVerified)
  const savedConsent = localStorage.getItem('cookieConsent') ? localStorage.getItem('cookieConsent') : false

  // Hydration
  const hasHydrated = useAppStore((s) => s._hasHydrated)

  // All hooks must run before any early return. Side effects live in effects.
  useEffect(() => {
    if (!smoothScrollEnabled) return undefined
    smoothScroll()
  }, [smoothScrollEnabled])

  useEffect(() => {
    const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme)
    if (theme === null) return
    applyTheme({ theme })
    useThemeStore.setState({ theme })
  }, [])

  useEffect(() => {
    if (!hasHydrated) return undefined

    // Respect the user's data-saver preference. If set, prefetching still
    // happens, but only on user intent (menu open, tap) — see AppMenu.
    if (navigator.connection?.saveData === true) return undefined

    const effectiveType = navigator.connection?.effectiveType
    const delay = effectiveType === 'slow-2g' || effectiveType === '2g' ? 4000 : 0

    const schedule = window.requestIdleCallback
      ? (cb) => window.requestIdleCallback(cb, { timeout: 5000 })
      : (cb) => setTimeout(cb, 1500 + delay)
    const cancel = window.cancelIdleCallback ?? clearTimeout

    const handle = schedule(() => prefetchAllActivities())
    return () => cancel(handle)
  }, [hasHydrated])

  // Early returns must come after all hooks.
  if (!hasHydrated) return <AppLoading />
  if (!ageVerified) return <UmmiAgeGate />

  return (
    <div>
      <div className='main'>
        <AppMenu />
        {quickExitEnabled && <Exit />}

        {/* All modal activities mount through here, one at a time. */}
        <ActivityHost />
        <Home>
          <Header />
          <Introduction />
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
        </Home>
        {quickExitEnabled && <Exit />}

        <SnackBars />
        <PasscodeDialogController />
      </div>

      <Backdrop initialImageId={2} initialDelay={3000} interval={6000} parallaxStrength={0} className='backdrop' />
      <Routing />
      <Vcn />
      {!savedConsent && <CookieConsent />}
    </div>
  )
}

export default App
