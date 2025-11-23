"use client";
import React, {useEffect, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";

import Header from "ui/header/Header";
import {useThemeStore} from "@/store/useThemeStore";
import useAppStore from "@/store/useAppStore";
import LogoFloating from "./components/ui/logo/LogoFloating";
import applyTheme from "components/theme/applyTheme";
import AccordionScroll from "ui/AcronymAccordion/AccordionScroll";
import ScrollPosition from "./components/utils/ScrollPosition";
import FooterMetadata from "ui/footer/FooterMetadata.jsx";
import Intro from "ui/sections/Intro.jsx";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import iconAndroid from "icons/iconAndroid.jsx";
import iconApple from "icons/iconApple.jsx";
import EmergencyButton from "buttons/emergency/EmergencyButton";
import QRCode from "ui/QRCode/QRCode.jsx";
import AccordionBottomNavigation from "ui/AcronymAccordion/AccordionBottomNavigation";
import Backdrop from "ui/backdrop/Backdrop";
import BackdropParallax from "ui/backdrop/BackdropParallax";
import Snackbars from "ui/snackbars/Snackbars";
import AcronymCard from "@/components/ui/cards/AcronymCard.jsx";
import BadgeToolbox from "./components/ui/badges/BadgeToolbox";
import "./globals.css";

import "./App.scss";
import "@/scss/_fonts.scss";
import bgImg from "/bgs/Ummi-bg-1.avif";
import SpeedDialSettings from "./components/ui/settings/speedDial/SpeedDialSettings.jsx";
function App() {
	const [open, setOpen] = useState(true);
	const [expanded, setExpanded] = useState(false);
	const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme);
	const setShowAccCard = useAppStore(state => state.setShowAccCard);
	const showAccCard = useAppStore(state => state.showAccCard);
	const setIsExpanded = useAppStore(state => state.setIsExpanded);
	// const setShowAccCard = useAppStore(state => state.setShowAccCard);
	//const setEmergencyToolAdded = useAppStore(state => state.setEmergencyToolAdded);

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

	const handleChange = panel => (event, newExpanded) => {
		// console.log("newExpanded", newExpanded);
		setExpanded(newExpanded ? panel : false);
		setIsExpanded(newExpanded !== false);
		setShowAccCard(newExpanded !== false);
		setOpen(newExpanded);
	};

	// const emergencyToolAdded = useAppStore(state => state.emergencyToolAdded);
	// useEffect(() => {
	// 	// console.log("emergencyToolAdded ", emergencyToolAdded);
	// }, [emergencyToolAdded]);

	// const toolAdded = useAppStore(state => state.toolAdded);
	// useEffect(() => {
	// 	// console.log("toolAdded ", toolAdded);
	// }, [toolAdded]);

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
					<AcronymCard />
					<div className={"inner" + (showAccCard ? " card-open" : "")}>
						<Snackbars />
						{/* <SpeedDialSettings className={"speed-dial-settings"} /> */}
						{/* <ScenarioModal /> */}

						<div className="content">
							<Header />
							<Intro />
							<section className="tools">
								<h2>
									<u>Tools:</u>
								</h2>
								<p>Tap a heading to read out about the tool.</p>
							</section>
							<AccordionScroll
								expanded={expanded}
								handleChange={handleChange}
							/>
							<section className="footer">
								<h2>
									<u>Add to your home screen?</u>
								</h2>
								<p>Follow these video instructions for your platform</p>
								<div className="links">
									<a
										href="https://www.youtube.com/watch?v=O1xEXKB6tNg"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div
											className="android logo"
											dangerouslySetInnerHTML={{__html: iconAndroid}}
										/>
										<div>Android</div>
									</a>
									<a
										href="https://www.youtube.com/watch?v=B7fKs4dTeu0"
										target="_blank"
										rel="noopener noreferrer"
									>
										<div
											className="apple logo"
											dangerouslySetInnerHTML={{__html: iconApple}}
										/>
										<div>Apple iOS</div>
									</a>
								</div>
								<QRCode label="Share the app, scan the QR Code" />

								<div>
									<p>The tools we learn to cope with our emotions, thoughts, feelings and mental health are ace, but remembering them can be hard.</p>
									<p>This app is your toolbox so you can carry those tools around with you for whenever you need them.</p>
								</div>

								<p>
									This app was inspired by the amazing people who facilitate groups and meetings at
									<a
										href="https://www.nottinghamrecoverynetwork.com/"
										target="_blank"
										rel="noopener noreferrer"
									>
										Nottingham Recovery Network (NRN)
									</a>
									<br />
									Nottingham UK and their hard work and dedication to help people through their recovery journey.
									<br />
								</p>

								<h2>
									<u>FEEDBACK</u>
								</h2>

								<p>
									Like everyone dealing with mental health and going through recovery, these tools and this app can only get better and improve if we know what works, what doesn&apos;t, what you like
									and what you don&apos;t like.
								</p>
								<p>Is there something missing? Does something not make sense? Could it be better?</p>
								<p>
									<b>Positive or negative</b> we want to hear your thoughts. <u>Have a rant if you need to</u>, but just let us know what <b>you like and what you don&apos;t like</b>. <br /> <br />
									<u>
										ALL feedback is appreciated and
										<br />
										we get stronger together
									</u>
								</p>
								<p>
									Drop us an email at the address below with your feedback.
									<br /> <br />
									<a
										href="mailto:ummi.toolbox@gmail.com?subject=UMMI%20Toolbox%20Feedback"
										target="_blank"
										rel="noopener noreferrer"
									>
										ummi.toolbox@gmail.com
									</a>
								</p>
								<p>
									<u className="big">
										<b>Big up yourself,</b>
									</u>
									<u className="big">
										<b>you are stronger</b>
									</u>
									<u className="big">
										<b>than you think.</b>
									</u>
									<br />
									<span className="big4 r90">:)</span>
								</p>

								<p>This website and app is constantly evolving from the feedback received and new ideas to help us get better together.</p>
								<p>
									If you want to help keep this app free for all of us and help the development please consider <br />
								</p>
								<p>
									<a
										href="https://www.buymeacoffee.com/ummi"
										target="_blank"
										rel="noopener noreferrer"
									>
										Click here to buy me a coffee or give a small donation
									</a>
									<br />
									<br />
									<span>&hearts; &#x2661; We would really appreciate it.&#x2661; &hearts; </span>
								</p>
							</section>
						</div>

						<FooterMetadata />
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

				{/* <AccordionBottomNavigation
					open={open}
					onClick={closeAccordion(open)}
				/> */}

				<BackdropParallax
					initialImageId={3}
					initialDelay={3000}
					interval={6000}
					parallaxStrength={0}
				/>
			</div>
			<ScrollPosition />
		</React.Fragment>
	);
}

export default App;
