import "./globals.css";
import "./App.css";

// import AccordionAcro from "ui/AcronymAccordion/AccordionAcro";
// import MainAccordions from "ui/AcronymAccordion/AccordionMain";
import AccordionScroll from "ui/AcronymAccordion/AccordionScroll";

import SettingsDrawer from "ui/settings/SettingsDrawer.jsx";
import FontSizeDrawer from "ui/settings/FontSizeDrawer.jsx";
import FooterMetadata from "ui/footer/FooterMetadata.jsx";
import applyTheme from "components/theme/applyTheme";
import iconAndroid from "icons/iconAndroid.jsx";
import iconApple from "icons/iconApple.jsx";
import iconEmojiFistup from "icons/iconEmojiFistup.jsx";
import iconEmojiPeaceHand from "icons/iconEmojiPeaceHand.jsx";
import iconEmojiThumbsup from "icons/iconEmojiThumbsup.jsx";
import QRCode from "ui/QRCode/QRCode.jsx";
import ButtonShare from "buttons/share/ButtonShare.jsx";
import useThemeStore from "@/themeStore";
import Logo from "ui/logo/Logo.jsx";
import iconEmojiVWHand from "./components/icons/iconEmojiVWHand";

import SpeedDialSettings from "./components/ui/settings/speedDIal/SpeedDialSettings.jsx";
function App() {
	const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme);
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
		<div className="app">
			<div className="main">
				<div className="inner">
					<SpeedDialSettings className={"speed-dial-settings"}/>
					<div className="content">

					<div className="header">
						<Logo />
						<Logo
							classes={"small"}
							showText={false}
						/>
						<h1>
							Understanding
							<br />
							Me,Myself &amp; I
						</h1>
						<div className="subtitle">
							<p>The tools we learn to cope with our emotions, thoughts, feelings and mental health are ace, but remembering them can be hard.</p>
							<p>This app is your toolbox so you can carry those tools around with you for whenever you need them.</p>
							<p>
								The app is free to use and always will be. It is created and maintained by someone who is on a similar recovery journey to you, and needed somewhere quick to access the tools we learn
								when we need them - not a bunch of paperwork.
							</p>
							<p>I hope you find it useful.</p>
						</div>
						<div className="subtitle start">Tap a heading to read out about the tool.</div>
					</div>
					<h2>Tools:</h2>
					<AccordionAcro />

					<div className="footer">
						<div className="install">Add to your home screen video instructions</div>
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

						<p>
							This app was inspired by the amazing people who facilitate groups and meetings at{" "}
							<a href="https://www.nottinghamrecoverynetwork.com/" target="_blank" rel="noopener noreferrer">
								Nottingham Recovery Network
							</a>
							in Nottingham UK and their hard work and dedication to help people through their recovery journey.
							<br />
						</p>

						<p>
							<b>
								<u>FEEDBACK</u>
							</b>
						</p>
						<p>
							Like everyone dealing with mental health and going through recovery, these tools and this app can only get better and improve if we know what works, what doesn&apos;t, what you like and
							what you don&apos;t like.
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
						<p>
							This website and app is{" "}
							<b>
								provided for free and <u>will always be free to use.</u>
							</b>
						</p>
						<p>It is constantly evolving from the feedback received and new ideas to help us get better together.</p>
						<p>
							If you want to help keep this app free for all of us and help the development please consider{" "}
							<a
								href="https://www.buymeacoffee.com/ummi"
								target="_blank"
								rel="noopener noreferrer"
							>
								Buying us a coffee or giving a small donation
							</a>
							<p>&hearts; &#x2661; We would really appreciate it.&#x2661; &hearts; </p>
						</p>
					</div>
				
					<FooterMetadata />
					</div>
					<div className="bgImgs">
					<div
						className="icon peacehand"
						dangerouslySetInnerHTML={{__html: iconEmojiPeaceHand}}
					/>
					<div
						className="icon thumbsup"
						dangerouslySetInnerHTML={{__html: iconEmojiThumbsup}}
					/>
				</div>
				<FooterMetadata />
				<div className="bgImgs">
					<div className="icon peacehand" dangerouslySetInnerHTML={{__html: iconEmojiPeaceHand}} />
					<div className="icon thumbsup" dangerouslySetInnerHTML={{__html: iconEmojiThumbsup}} />
				</div>
				
			</div>
		</div>
	);
}

export default App;
