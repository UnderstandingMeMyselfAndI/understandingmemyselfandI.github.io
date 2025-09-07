import './globals.css';
import './App.css';

import AccordionAcro from './components/ui/AcronymAccordion/AccordionAcro.jsx';
import SettingsDrawer from './components/ui/settings/SettingsDrawer.jsx';
import FontSizeDrawer from './components/ui/settings/FontSIzeDrawer.jsx';
import FooterMetadata from './components/ui/footer/FooterMetadata.jsx';
import applyTheme from '@/src/components/theme/applyTheme';
import iconAndroid from '@/src/components/icons/iconAndroid.jsx';
import iconApple from '@/src/components/icons/iconApple.jsx';
import QRCode from '@/src/components/ui/QRCode/QRCode.jsx';
import ButtonShare from '@/src/components/ui/buttons/share/ButtonShare.jsx';
import useThemeStore from '@/src/themeStore';
import Logo from '@/src/components/ui/logo/Logo.jsx';
import Meditation from './components/ui/meditation/Meditation';
function App() {
	const theme = localStorage.getItem(useThemeStore.getState().storageKeyTheme);
	if (theme !== null) {
		applyTheme({ theme: theme });
		useThemeStore.setState({
			theme: theme,
		});
	}
	useThemeStore.subscribe(() => {
		const themeFromStore = useThemeStore.getState().theme;
		applyTheme({ theme: themeFromStore });
		localStorage.setItem(
			useThemeStore.getState().storageKeyTheme,
			themeFromStore
		);
	});

	return (
		<div className='app'>
			<div className='main'>
				<div className='inner'>
					<div className='settingsContainer'>
						<SettingsDrawer />
						<FontSizeDrawer />
						<ButtonShare />
					</div>
					<div className='header'>
						<Logo />
						<h1>
							Understanding
							<br />
							Me,Myself &amp; I
						</h1>
						<div className='subtitle'>
							<p>
								The tools we learn in groups and meetings to help us deal with
								our emotions and thoughts are ace, but remembering them can be
								hard.
							</p>
							<p>
								This app is your toolbox so you can carry those tools around
								with you for whenever you need them.
							</p>
						</div>
						<div className='subtitle start'>
							Tap a heading to read out about the tool.
						</div>
					</div>
					<h2>Tools:</h2>
					<AccordionAcro />
					<Meditation label='Guided Meditation' />
					<div className='footer'>
						<div className='install'>
							Add to your home screen video instructions
						</div>
						<div className='links'>
							<a
								href='https://www.youtube.com/watch?v=O1xEXKB6tNg'
								target='_blank'
								rel='noopener noreferrer'
							>
								<div
									className='android logo'
									dangerouslySetInnerHTML={{ __html: iconAndroid }}
								/>
								<div>Android</div>
							</a>
							<a
								href='https://www.youtube.com/watch?v=B7fKs4dTeu0'
								target='_blank'
								rel='noopener noreferrer'
							>
								<div
									className='apple logo'
									dangerouslySetInnerHTML={{ __html: iconApple }}
								/>
								<div>Apple iOS</div>
							</a>
						</div>
						<QRCode label='Share the app, scan the QR Code' />

						<p>
							This app was inspired by the amazing people who facilitate groups
							and meetings at{' '}
							<a
								href='https://www.nottinghamrecoverynetwork.com/'
								target='_blank'
								rel='noopener noreferrer'
							>
								Nottingham Recovery Network
							</a>{' '}
							in Nottingham UK and their hard work and dedication to help people
							through their recovery journey.
							<br />
						</p>

						<p>
							<b>
								<u>FEEDBACK</u>
							</b>
						</p>
						<p>
							Like everyone dealing with mental health and going through
							recovery, these tools and this app can only get better and improve
							if we know what works, what doesn&apos;t, what you like and what
							you don&apos;t like.
						</p>
						<p>
							Is there something missing? Does something not make sense? Could
							it be better?
						</p>
						<p>
							<b>Positive or negative</b> we want to hear your thoughts.{' '}
							<u>Have a rant if you need to</u>, but just let us know what{' '}
							<b>you like and what you don&apos;t like</b>. <br /> <br />
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
								href='mailto:yourrecoverytoolbox@gmail.com?subject=The%20Recovery%20Toolbox%20Feedback'
								target='_blank'
								rel='noopener noreferrer'
							>
								yourrecoverytoolbox@gmail.com
							</a>
						</p>
						<p>
							<u className='big'>
								<b>Big up yourself,</b>
							</u>
							<u className='big'>
								<b>you are stronger</b>
							</u>
							<u className='big'>
								<b>than you think.</b>
							</u>
							<br />
							<span className='big4 r90'>:)</span>
						</p>
					</div>
				</div>
				<FooterMetadata />
			</div>
		</div>
	);
}

export default App;
