'use client';
// import React from "react";

// import "components/utils/activities.js";
import Routing from './components/routing/Routing';
import { useThemeStore } from '@/store/useThemeStore';
import { useShallow } from 'zustand/react/shallow';
import useAppStore from './store/useAppStore';
// import DaysCounter from "./components/ui/DaysCounter/DaysCounter";
import applyTheme from 'components/theme/applyTheme';
import ScrollPosition from 'components/utils/ScrollPosition';
// import LogoFloating from "ui/logo/LogoFloating";
import Header from 'ui/header/Header.jsx';
import Footer from 'ui/footer/Footer';
// import Podcasts from "./components/activity/podcasts/Podcasts";
import PrivacyPolicy from './components/activity/privacy/PrivacyPolicy';
import Introduction from '@/components/activity/introduction/Introduction';
import YourPrivacyCTA from './components/ui/sections/privacy/YourPrivacyCTA';
import Tools from 'components/activity/tools/Tools.jsx';

// import Backdrop from "ui/backdrop/Backdrop";
import BackdropParallax from 'ui/backdrop/BackdropParallax';

import SnackBars from 'ui/snackbars/SnackBars.jsx';
import InstallCTA from 'ui/install/InstallCTA';
// import AcronymCard from "ui/cards/AcronymCard.jsx";
import AcronymExplained from './components/activity/acronymExplained/AcronymExplained';
import BadgeToolbox from 'ui/badges/BadgeToolbox';

import DaysCounter from './components/activity/daysCounter/DaysCounter';
import DaysCounterCTA from './components/activity/daysCounter/DaysCounterCTA';
import AppMenu from './components/ui/menu/AppMenu';
import CookieConsent from './components/ui/cookieConsent/CookieConsent';
// import UmmiAgeGate from './components/ui/ageGate/UmmiAgeGate';
import { smoothScroll } from './js/utils.js';
import NewsletterSignUp from './components/ui/newsletterSignup/NewsletterSignUp';
import Exit from './components/ui/exit/Exit';
import Settings from './components/activity/settings/Settings';
import Vcn from './components/visits/Vcn.jsx';
import Lingo from './components/activity/lingo/Lingo';
// import Quiz from './components/activity/quiz/Quiz';
import UnitsCalculator from './components/activity/unitsCalculator/UnitsCalculator';

import './App.scss';
// TODO: "Clear Local Data" functionality
function App() {
  const toolboxFilterEnabled = useAppStore((s) => s.toolboxFilterEnabled);
  const daysCounterEnabled = useAppStore((s) => s.daysCounterEnabled);
  // const enableYourTools = useAppStore((s) => s.enableYourTools)
  const quickExitEnabled = useAppStore((s) => s.quickExitEnabled);
  const setActivity = useAppStore((s) => s.setActivity);

  setActivity(-1);
  smoothScroll();
  const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme);

  if (theme !== null) {
    applyTheme({ theme: theme });
    useThemeStore.setState({
      theme: theme,
    });
  }

  return (
    <div>
      <div className='app'>
        {/* <UmmiAgeGate /> */}
        <CookieConsent />
        <div className='dev-version'>
          Development Version.
          <br />
          NOT Full version{' '}
        </div>
        <AppMenu />

        {quickExitEnabled && <Exit />}

        <div className='main'>
          {toolboxFilterEnabled && <BadgeToolbox />}

          <Header />
          <Introduction />
          <Tools />
          <YourPrivacyCTA />
          {daysCounterEnabled && <DaysCounterCTA />}
          <Lingo />
          {/* <Quiz /> */}
          <UnitsCalculator />

          <div className='activities' id='top'>
            {daysCounterEnabled && <DaysCounter />}
            <Settings />
            <AcronymExplained />
            <PrivacyPolicy />
          </div>

          <NewsletterSignUp />
          <InstallCTA />

          <Footer />
        </div>
        <SnackBars />
        <ScrollPosition />
      </div>
      <BackdropParallax
        initialImageId={2}
        initialDelay={3000}
        interval={6000}
        parallaxStrength={0}
      />
      <Routing />
      <Vcn />
    </div>
  );
}

export default App;
