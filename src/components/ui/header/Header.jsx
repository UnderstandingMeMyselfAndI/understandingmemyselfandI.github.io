import * as React from "react";
import {useRef, useEffect} from "react";
import Logo from "ui/logo/Logo.jsx";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import useAppStore from "@/store/useAppStore";

// import React from "https://esm.sh/react@19.1.0";
// import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";

import gsap from "gsap"; // <-- import GSAP
import {useGSAP} from "@gsap/react"; // <-- import the hook from our React package
gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies

// import "../../../scss/Animation.css";
// import "./AnimationIntro.scss";
import "./styles.scss";

const Header = ({classes = ""}) => {
	const [stage, setStage] = React.useState(0);

	const scrollStage = useAppStore(state => state.scrollStage);

	const cont = useRef();

	const logo = useRef();
	const wGrp = useRef();
	const w0 = useRef();
	const w1 = useRef();
	const w2 = useRef();
	const w3 = useRef();
	const w4 = useRef();
	const w5 = useRef();

	const cnf = {
		from: {
			logo: {
				y: 0,
				scale: 1.2,
				autoAlpha: 0,
			},
			wgrp: {
				autoAlpha: 0,
			},
			w0: {
				autoAlpha: 0,
				y: "-20px",
			},
			w1: {
				autoAlpha: 0,
				x: 60,
			},
			w2: {
				autoAlpha: 0,
				x: -60,
			},
			w3: {
				autoAlpha: 0,
				x: -60,
			},
			w4: {
				autoAlpha: 0,
				x: 60,
			},
		},
		to: {
			logo: {
				y: 0,
				scale: 1,
				autoAlpha: 1,
				duration: 0.8,
				ease: "power2.inOut",
			},
			wgrp: {
				// delay: 2.6,
				duration: 0.8,
				autoAlpha: 1,
				ease: "power2.inOut",
			},
			w0: {
				duration: 0.8,
				autoAlpha: 1,
				delay: 0,
				y: 0,
				ease: "power2.inOut",
			},
			w1: {
				duration: 0.25,

				autoAlpha: 1,
				// delay: 2.9,
				x: 0,
				ease: "power2.inOut",
			},
			w2: {
				duration: 0.8,

				autoAlpha: 1,
				// delay: 3.1,
				x: 0,
				ease: "power2.inOut",
			},
			w3: {
				duration: 0.8,

				autoAlpha: 1,
				delay: 3.2,
				x: 0,
				ease: "power2.inOut",
			},
			w4: {
				duration: 0.8,
				autoAlpha: 1,
				delay: 2.8,
				x: 0,
				ease: "power2.inOut",
			},
		},
	};

	useEffect(() => {
		// console.log("scrollStage", scrollStage);
	}, [scrollStage]);
	useGSAP(
		() => {
			const tl = gsap.timeline({defaults: {duration: 0.65, ease: "power3.inOut"}});
			const tl2 = gsap.timeline({defaults: {duration: 0.65, ease: "power3.inOut"}});

			const tl3 = gsap.timeline({repeat: -1, repeatDelay: 0.5, yoyo: true, defaults: {duration: 0.65, ease: "power3.inOut"}});
			const tl4 = gsap.timeline({repeat: -1, repeatDelay: 0, defaults: {duration: 5, ease: "power3.inOut"}});
			const tl5 = gsap.timeline({repeat: -1, repeatDelay: 0, yoyo: true, defaults: {duration: 1, ease: "power3.inOut"}});

			gsap.set(".w3", {autoAlpha: 0, rotateY: "1080deg", x: 0, y: 0});
			// gsap.set(".w2", {autoAlpha: 0, scaleY: "-100%", x: 0, y: 0});

			// console.log("scrollStage", scrollStage);
			if (scrollStage === 0) {
				tl.to(".homelogo", {autoAlpha: 1, scale: 1}, 2);
				tl.to(".wgrp", {autoAlpha: 1, scale: 1}, 0.75);
				tl2.to(".w0", {autoAlpha: 1, scale: 1, x: 0, y: 0}, "2.75");
				tl2.to(".w1", {autoAlpha: 1, scale: 1, x: 0, y: 0}, "-=0.5");
				tl2.to(".w2", {autoAlpha: 1, scale: 1, x: 0, y: 0}, "-=0.35");
				tl2.to(".w3", {autoAlpha: 1, duration: 1.5, rotateY: 0, x: 0, y: 0}, "-=0.5");
				tl2.to(".w4", {autoAlpha: 1, rotateY: 0, x: 0, y: 0}, "-=1.5");

				tl3.to(".w3", {duration: 1.5, rotateY: "1080deg"}, "+=6");

				// tl4.to(
				// 	".w0",
				// 	{
				// 		duration: 1.25,
				// 		delay: 16,
				// 		onStart: self => {
				// 			const obj = document.querySelector(".w0");
				// 			console.log("onFinish", obj.classList);
				// 			obj.classList.contains("active") ? obj.classList.remove("active") : obj.classList.add("active");
				// 		},
				// 	},
				// 	"+=4"
				// );
			}
			// if (scrollStage > 1) {
			// 	gsap.to(".homelogo", {
			// 		autoAlpha: 1,
			// 		duration: 1,
			// 		scale: 1,
			// 		delay: 3,
			// 	});
			// 	gsap.to(".wgrp", {
			// 		autoAlpha: 1,
			// 		duration: 1,
			// 		scale: 1,
			// 		delay: 3,
			// 	});
			// 	gsap.to(".w0", {
			// 		opacity: 1,
			// 		duration: 1,
			// 		scale: 1,
			// 		delay: 3,
			// 	});
			// }
		},
		{dependencies: [cnf, scrollStage], revertOnUpdate: true}
	);

	// useGSAP(
	// 	() => {

	// 			gsap.to(".home-logo", {
	// 				autoAlpha: 1,
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 			gsap.fromTo(".wgrp", {
	// 				autoAlpha: 1,
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 			gsap.fromTo(".w0", {
	// 				autoAlpha: 1,
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 			gsap.fromTo(".w2", {
	// 				autoAlpha: 1,
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 			gsap.fromTo(".w1", {
	// 				autoAlpha: 1,
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 			gsap.fromTo(".w3", {
	// 				autoAlpha: 1,
	// 				x: 0,
	// 				y: 0,
	// 			};
	// 			gsap.fromTo(".w4", {
	// 				autoAlpha: 1,
	// 				x: 0,
	// 				y: 0,
	// 			});

	// 	},
	// 	{dependencies: [cnf, scrollStage], revertOnUpdate: true}
	// );

	return (
		<header ref={cont}>
			<div className="home-grp">
				<div
					className="home-logo homelogo"
					ref={logo}
				>
					<Logo />
				</div>
				<div
					className={`wgrp ss-${scrollStage}`}
					ref={wGrp}
				>
					<h1>
						<div
							className="r1 w0"
							ref={w0}
						>
							Understanding
						</div>

						<div className="r2">
							<div className="w1">Me</div>
							<div className="w2">Myself</div>
							<div className="w3">&</div>
							<div className="w4">I</div>
						</div>
					</h1>
				</div>
				<div className="arrow-cont">
					<ArrowDownwardOutlinedIcon className="arrow" />
				</div>
			</div>
		</header>
	);
};

export default Header;
