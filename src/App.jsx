"use client";
import React from "react";

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

import CssBaseline from "@mui/material/CssBaseline";

import {useThemeStore} from "@/store/useThemeStore";
// import DaysCounter from "./components/ui/DaysCounter/DaysCounter";
import applyTheme from "components/theme/applyTheme";

import ScrollPosition from "components/utils/ScrollPosition";

import LogoFloating from "ui/logo/LogoFloating";
import Header from "ui/header/Header.jsx";

import Footer from "ui/footer/Footer";
import Introduction from "components/activity/introduction/Introduction";
import Tools from "components/activity/tools/Tools.jsx";

import BackdropParallax from "ui/backdrop/BackdropParallax";

import AcronymCard from "ui/cards/AcronymCard.jsx";
import BadgeToolbox from "ui/badges/BadgeToolbox";

import Snackbars from "ui/snackbars/Snackbars";

import DaysCounter from "ui/DaysCounter/DaysCounter";
import AppMenu from "./components/ui/menu/AppMenu";
import CookieConsent from "./components/ui/cookieConsent/CookieConsent";
import {smoothScroll} from "./js/utils.js";

import "./App.scss";

// import SpeedDialSettings from "./components/ui/settings/speedDial/SpeedDialSettings.jsx";
function App() {

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
			{/* <CssBaseline /> */}
			<div className="app">
				<CookieConsent />
				{/* <EmergencyButton /> */}
				{/* <DaysCounter /> */}
				
				{/* <AppMenu />	 */}
				<div className="main">
					<BadgeToolbox />
					<LogoFloating
						classes=" logo small"
						showName={false}
					/>
					
				
					<div className="activities">
						<Header />
						
						<Introduction />
						<AcronymCard />
						<Tools id="tools" />
						<Footer />
					</div>

					
				</div>
				<Snackbars />
				<ScrollPosition />
				<BackdropParallax
					initialImageId={3}
					initialDelay={3000}
					interval={6000}
					parallaxStrength={0}
				/>
			</div>
		</div>
	);
}

export default App;
