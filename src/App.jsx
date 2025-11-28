"use client";
import React from "react";
// import "components/utils/activities.js";
import CssBaseline from "@mui/material/CssBaseline";

import {useThemeStore} from "@/store/useThemeStore";
import useAppStore from "@/store/useAppStore";
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

import "./globals.css";
import "./App.scss";
import "@/scss/_fonts.scss";

// import SpeedDialSettings from "./components/ui/settings/speedDial/SpeedDialSettings.jsx";
function App() {
	// const [expanded, setExpanded] = useState(false);
	const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme);
	// const setIsExpanded = useAppStore(state => state.setIsExpanded);
	// const setAcronymnID = useAppStore(state => state.setAcronymnID);

	if (theme !== null) {
		applyTheme({theme: theme});
		useThemeStore.setState({
			theme: theme,
		});
	}
	useThemeStore.subscribe(() => {
		const themeFromStore = useThemeStore.getState().theme;
		applyTheme({theme: themeFromStore});
		localStorage.setItem(useThemeStore.getState().storageKeyTheme, themeFromStore);
	});

	return (
		<React.Fragment>
			<CssBaseline />
			<div className="app">
				{/* <EmergencyButton /> */}
				<div className="main">
					<BadgeToolbox />
					<LogoFloating
						classes=" logo small"
						showName={false}
					/>
					<Snackbars />
					<div className="activities">
						<Header />
						<Introduction />
						<AcronymCard />
						<Tools />
						<Footer />
					</div>
					<ScrollPosition />
					<div className={"inner"}>
						{/* <SpeedDialSettings className={"speed-dial-settings"} /> */}
						{/* <ScenarioModal /> */}

						<div className="content"></div>

						{/* <div className="bgImgs">
								<div
									className="icon peacehand"
									dangerouslySetInnerHTML={{__html: iconEmojiPeaceHand}}
								/>
								<div
									className="icon thumbsup"
									dangerouslySetInnerHTML={{__html: iconEmojiThumbsup}}
								/>
							</div> */}
					</div>
				</div>

				<BackdropParallax
					initialImageId={3}
					initialDelay={3000}
					interval={6000}
					parallaxStrength={0}
				/>
			</div>
		</React.Fragment>
	);
}

export default App;
