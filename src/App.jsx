"use client";
// import React from "react";

// import "components/utils/activities.js";

// import { HashRouter } from 'react-router-dom';
// // Example:
// import { HashRouter } from 'react-router-dom';

// function App() {
//   return (
//     <HashRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/gallery" element={<Gallery />} />
//       </Routes>
//     </HashRouter>
//   );
// }

// import CssBaseline from "@mui/material/CssBaseline";

import {useThemeStore} from "@/store/useThemeStore";
import useAppStore from "./store/useAppStore";
// import DaysCounter from "./components/ui/DaysCounter/DaysCounter";
import applyTheme from "components/theme/applyTheme";

import ScrollPosition from "components/utils/ScrollPosition";

import LogoFloating from "ui/logo/LogoFloating";
import Header from "ui/header/Header.jsx";

import Footer from "ui/footer/Footer";
import Podcasts from "./components/activity/podcasts/Podcasts";
import Introduction from "components/activity/introduction/Introduction";
import YourPrivacy from "./components/ui/sections/privacy/YourPrivacy";
import YourPrivacyCTA from "./components/ui/sections/privacy/YourPrivacyCTA";
import Tools from "components/activity/tools/Tools.jsx";

// import Backdrop from "ui/backdrop/Backdrop";
import BackdropParallax from "ui/backdrop/BackdropParallax";

import Snackbars from "ui/snackbars/Snackbars.jsx";

import AcronymCard from "ui/cards/AcronymCard.jsx";
import BadgeToolbox from "ui/badges/BadgeToolbox";

import DaysCounter from "./components/activity/DaysCounter/DaysCounter";
import AppMenu from "./components/ui/menu/AppMenu";
import CookieConsent from "./components/ui/cookieConsent/CookieConsent";
import {smoothScroll} from "./js/utils.js";

import "./App.scss";

// import SpeedDialSettings from "./components/ui/settings/speedDial/SpeedDialSettings.jsx";
function App() {

	const setActivity = useAppStore(s => s.setActivity);
	setActivity(-1);
	smoothScroll();
	const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme);

	if (theme !== null) {
		applyTheme({theme: theme});
		useThemeStore.setState({
			theme: theme,
		});
	}



	return (
		<div>
			
			<div className="app">
				<CookieConsent />
				{/* <EmergencyButton /> */}
				
				
				<AppMenu />	
				<div className="main">
					<BadgeToolbox />
					{/* <LogoFloating
						classes=" logo small"
						showName={false}
					/> */}
					
				
					<div className="activities" id="top">
						<Header />
						
						<Introduction />
						<YourPrivacyCTA />
						<DaysCounter />
						<AcronymCard />
						<Tools id="tools" />
						{/* <Podcasts /> */}
						<Footer />
					</div>

					
				</div>
				<Snackbars />
				<ScrollPosition />
				
			</div>
			<BackdropParallax
					initialImageId={3}
					initialDelay={3000}
					interval={6000}
					parallaxStrength={0}
				/>
		</div>
	);
}

export default App;
