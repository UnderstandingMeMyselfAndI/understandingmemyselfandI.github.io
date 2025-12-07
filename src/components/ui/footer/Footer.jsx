"use client";
// import React, {useState} from "react";
import iconAndroid from "icons/iconAndroid.jsx";
import iconApple from "icons/iconApple.jsx";
import QRCode from "ui/QRCode/QRCode.jsx";
import FooterMetadata from "ui/footer/FooterMetadata.jsx";
import "./styles.scss";
function Footer() {
	return (
		// <div className="activity  ">
		<section className="footer">
			<h3>
				<u>Add <span className="ummi-blue">Ummi</span> as an app?</u>
			</h3>
			<p>You can add <span className="ummi">Ummi</span> to your home screen just like any other app.</p>

			<p>Follow these video instructions for your device:</p>
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
			<section className="qr">
				<h3><u>Spread the love</u></h3>
				<p><u>Share the app,</u> <br/><u>scan the QR Code</u></p>
				<QRCode label="" />
			</section>
			

			{/* <div>
				<p>The tools we learn to cope with our emotions, thoughts, feelings and mental health are ace, but remembering them can be hard.</p>
				<p>This app is your toolbox so you can carry those tools around with you for whenever you need them.</p>
			</div> */}

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
				Like everyone dealing with mental health and going through recovery, these tools and this app can only get better and improve if we know what works, what doesn&apos;t, what you like and what
				you don&apos;t like.
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
			<FooterMetadata />
		</section>
		// </div>
	);
}

export default Footer;
