import { useEffect, useState } from 'react'
import useAppStore from '@/store/useAppStore'
import ButtonUpdate from 'buttons/update/ButtonUpdate'
import QRCode from 'ui/QRCode/QRCode.jsx'
import FooterMetadata from 'ui/footer/FooterMetadata.jsx'
// import InstallPWA from 'ui/buttons/InstallPWA/InstallPWA'
import InstallCTA from '../install/InstallCTA'
import { getPWADisplayMode } from '@/utils/isAppInstalled'
// import Podcasts from 'components/activity/podcasts/Podcasts'

import './styles.scss'
function Footer() {
	// const setNeedUpdate = useAppStore((state) => state.setNeedUpdate)
	const needUpdate = useAppStore((state) => state.needUpdate)
	const [needsUpdate, setNeedsUpdate] = useState(false)
	const [updateMessage, setUpdateMessage] = useState('New version available.')

	useEffect(() => {
		if ('serviceWorker' in navigator) {
			// 1. Register Service Worker
			navigator.serviceWorker.register('/service-worker.js').then((reg) => {
				// Check for updates
				reg.addEventListener('updatefound', () => {
					const newWorker = reg.installing

					newWorker.addEventListener('statechange', () => {
						// Only notify user when worker is fully installed
						if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
							setUpdateMessage('New version available!')
							setNeedsUpdate(true)
							// Note: You can store the 'reg' in state to call .waiting later
						}
					})
				})
			})

			// 2. Listen for the 'controllerchange' to reload the page
			let refreshing = false
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (!refreshing) {
					window.location.reload()
					refreshing = true
				}
			})
		}
	}, [])

	return (
		<div className='activity footer'>
			<section>
				{getPWADisplayMode() !== 'fullscreen' && (
					// <>
					// 	<h3>
					// 		<u>Add the <span className="ummi-blue">Ummi</span> app?</u>
					// 	</h3>
					// 	<p>You can install Ummi to your {isMobile ? "device" : "desktop"}<br /> just like any other app.</p>

					// 	<InstallPWA />
					// </>
					<InstallCTA />
				)}
			</section>

			<section className='qr' id='share'>
				<h3>
					<u>Spread the love</u>
				</h3>
				<p>
					<u>Share the app,</u> <br />
					<u>scan the QR Code</u>
				</p>
				<QRCode label='' />
				<p>
					<b>
						<u>www.ummi.now</u>
					</b>
				</p>
			</section>

			{/* <section className="days-counter" id="daysCounter">
				<h3><u>Monitor your progress</u></h3>

				{dates.length > 0 ? (					
					<>
						<p>View your dates:</p>	
						<DaysCounterBtn label="View your dates" />
					</>
				) : (
					<>
						<p>It can be useful to remind ourselves how far we have come.</p>
						<p>Set dates that are significant to you.</p>
						<DaysCounterBtn />
					</>
				)}

				<h4><b><u>We respect you</u></b></h4>
				<p>Any data you provide is stored only on your device and not shared anywhere.<br />You can remove the data at anytime.</p>
						
				
			</section> */}

			{/* <div>
				<p>The tools we learn to cope with our emotions, thoughts, feelings and mental health are ace, but remembering them can be hard.</p>
				<p>This app is your toolbox so you can carry those tools around with you for whenever you need them.</p>
			</div> */}
			<section id='gratitude'>
				<div className='big2'>
					<b>
						<u>Gratitude &amp; Inspiration</u>
					</b>
				</div>
				<p>
					This app was inspired by the amazing people who facilitate groups and meetings at
					<a href='https://www.nottinghamrecoverynetwork.com/' target='_blank' rel='noopener noreferrer'>
						Nottingham Recovery Network (NRN)
					</a>
					<br />
					Nottingham UK and their hard work and dedication to help people through their recovery journey.
				</p>
				<p>
					If you live in Nottingham U.K. and need help reach out to them{' '}
					<a href='https://www.nottinghamrecoverynetwork.com/' target='_blank' rel='noopener noreferrer'>
						nottinghamrecoverynetwork.com
					</a>
				</p>
				<p className='big2'>
					<b>
						<u> &#x2661; BIG LOVE &#x2661; </u>
					</b>
				</p>
			</section>

			<section id='feedback'>
				<h3>
					<u>FEEDBACK</u>
				</h3>

				<p>
					Like everyone going through recovery and/or dealing with their mental health, these tools and this app can only get better and improve if we know what works, what
					doesn&apos;t, what works for you and what doesn&apos;t.
				</p>
				<p>Is there something missing? Does something not make sense? Could it be better?</p>
				<p>
					<b>Positive or negative</b> we want to hear your thoughts.
				</p>
				<p>
					{' '}
					<u>
						ALL feedback is appreciated and
						<br />
						we get stronger together
					</u>
				</p>
				<p>
					Drop us an email at the address below with your feedback.
					<br /> <br />
					<a href='mailto:hello@ummi.now?subject=UMMI%20App%20Feedback' target='_blank' rel='noopener noreferrer'>
						hello@ummi.now
					</a>
				</p>
				<p>
					<b>
						<u>www.ummi.now</u>
					</b>
				</p>
			</section>
			<section>
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
			</section>
			<section>
				<p>This website and app is constantly evolving from the feedback received and new ideas to help us get better together.</p>
				<p>
					If you want to help keep this app free for all of us and help the development please consider <br />
				</p>
				<p>
					<a href='https://www.buymeacoffee.com/ummi' target='_blank' rel='noopener noreferrer'>
						Click here to buy us a coffee or give a small donation
					</a>
					<br />
					<br />
					<span>&hearts; &#x2661; We would really appreciate it.&#x2661; &hearts; </span>
				</p>
			</section>
			{needsUpdate && (
				<div className='update-available'>
					<div>{updateMessage}</div>
					<ButtonUpdate />
				</div>
			)}
			<FooterMetadata />
		</div>
	)
}

export default Footer
