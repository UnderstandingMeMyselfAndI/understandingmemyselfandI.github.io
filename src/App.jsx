'use client'
import { useEffect } from 'react'
import Routing from '@components/routing/Routing'
import { useThemeStore } from '@store/useThemeStore'
import useAppStore from '@store/useAppStore'
import { usePrivateStore } from '@store/usePrivateStore'
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
import Home from '@activity/home/Home'
import CookieConsent from '@activity/cookieConsent/CookieConsent'
import UmmiAgeGate from '@components/ageGate/UmmiAgeGate'
import AppLoading from '@ui/loading/AppLoading'
import NewsletterSignUp from '@activity/newsletterSignup/NewsletterSignUp'
import Exit from '@ui/exit/Exit'
import Vcn from '@components/visits/Vcn.jsx'
import Lingo from '@activity/lingo/Lingo'
import UnitsCalculatorCTA from '@activity/unitsCalculator/UnitsCalculatorCTA'
import WheelOfLifeCTA from '@activity/wheeloflife/WheelOfLifeCTA'
import TimelineCTA from '@activity/timeline/TimelineCTA'
import QuizCTA from '@activity/quiz/QuizCTA'
import ActivityHost from './components/activity/ActivityHost'
import { prefetchAllActivities } from './components/activity/activityLoaders'
import SecurityGate from '@security/SecurityGate'
import './App.scss'
import './scss/_fonts.scss'

window.__APP_LOADED = true

function App() {
  const toolsEnabled = usePrivateStore((s) => s.toolsEnabled)
  const daysCounterEnabled = usePrivateStore((s) => s.daysCounterEnabled)
  const unitsCalculatorEnabled = usePrivateStore((s) => s.unitsCalculatorEnabled)
  const wheelOfLifeEnabled = usePrivateStore((s) => s.wheelOfLifeEnabled)
  const quizEnabled = usePrivateStore((s) => s.quizEnabled)

  const quickExitEnabled = useAppStore((s) => s.quickExitEnabled)
  const ageVerified = useAppStore((s) => s.ageVerified)
  const savedConsent = localStorage.getItem('cookieConsent')
  const hasHydrated = useAppStore((s) => s._hasHydrated)

  useEffect(() => {
    const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme)
    if (theme === null) return
    applyTheme({ theme })
    useThemeStore.setState({ theme })
  }, [])

  useEffect(() => {
    if (!hasHydrated) return undefined
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

  if (!hasHydrated) return <AppLoading />
  if (!ageVerified) return <UmmiAgeGate />

  return (
    <div>
      <div className='main'>
       
        <SecurityGate>
          {/* Security gated content*/}
          <AppMenu />
          {quickExitEnabled && <Exit />}
          
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
        </SecurityGate>
      </div>

      <Backdrop initialImageId={2} initialDelay={3000} interval={6000} parallaxStrength={0} className='backdrop' />
      <Routing />
      <Vcn />
      {!savedConsent && <CookieConsent />}
    </div>
  )
}

export default App