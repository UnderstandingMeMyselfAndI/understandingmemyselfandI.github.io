import { useState} from "react";
import PropTypes from 'prop-types'
import "./featureStyles.scss";
import { useOnInView } from 'react-intersection-observer';
const Feature = ({children = null, headline = '', classes =''}) => {

	const [open, setOpen] = useState(false)
	const [hasDisplayed, setHasDisplayed] = useState(false)
	const [componentInView, setComponentInView] = useState(false);

	// useGSAP(
	// () => {		
			
	// 	if(!open) return;

	// 	const config = {
	// 	repeat: 5, 
	// 	repeatDelay: 3, 
	// 	yoyo: true, 
	// 		defaults: { 
	// 			duration: 0.5,               
	// 			ease: 'power3.out' 
	// 		}
	// 	}         
		
	// 	w0Ref.current = gsap.timeline({...config})
	// 	.delay(2)
	// 	.fromTo('.w0', 
	// 	{ autoAlpha: 0, rotateX: '-80deg',  y: -50 },
	// 	{ autoAlpha: 1, rotateX: 0,  y: 0,ease: 'back.inOut'},
	// 		'0')
	// 	.to('.w0',{ autoAlpha: 1, rotateX: 0,  y: 0, delay:3},
	// 		'0');      
	// 	console.log("w0Ref duration", w0Ref.current.duration());
		
		
	// 	w1Ref.current = gsap.timeline({...config})
	// 	.delay(2)
	// 	.fromTo('.w1', 
	// 	{ autoAlpha: 0, rotateY: '-80deg', x: -15, delay:0.5},
	// 		{ autoAlpha: 1, rotateY: 0, x: 0, delay:0.7},
	// 		'0')
	// 	.to('.w1',{ autoAlpha: 1, rotateY: 0, x: 0, delay:3},
	// 		'0')
	// 	console.log("w1Ref duration", w1Ref.current.duration());


	// 	w2Ref.current = gsap.timeline({...config})
	// 	.delay(2)
	// 	.fromTo('.w2', 
	// 		{ autoAlpha: 0, scale: 0.9, x: 0, y: 0 },
	// 		{ autoAlpha: 1, scale: 1, x: 0, y: 0, duration:1, delay:0.35 },
	// 		'0')
	// 	.to('.w2',{ autoAlpha: 1, scale: 1, x: 0, y: 0, delay:3 },
	// 		'0')
	// 	console.log("w2Ref duration", w2Ref.current.duration());


	// 	w3Ref.current = gsap.timeline({...config })
	// 	.delay(2)
	// 	.fromTo('.w3', 
	// 	{ autoAlpha: 0, rotateY: '0', rotateX:'80deg', x: 0, y: 30 },
	// 	{ autoAlpha: 1, rotateY: '0deg',  rotateX:'0deg', x: 0, y: 0 },
	// 		'0')
	// 	.to('.w3', {duration: 1.5, rotateY: '2160deg', delay:0.65},
	// 		'0')
	// 	.to('.w3', {duration: 1.5, rotateY: '2160deg', delay:2},
	// 		'0');

	// 	console.log("w3Ref duration", w3Ref.current.duration());
	// 	w4Ref.current = gsap.timeline({ ...config})
	// 	.delay(2)
	// 	.fromTo('.w4', 
	// 	{ autoAlpha: 0, x: 0, y: 30, rotateZ: '-115deg',transformOrigin: "left top" },
	// 	{ autoAlpha: 1,  x: 0, y:0, rotateZ: '0deg' , delay:0.95, duration: 1, ease: 'bounce.out',transformOrigin: "left top" },
	// 		'0')
	// 	.to( '.w4',{ autoAlpha: 1, rotateZ: '0deg', transformOrigin: "left top", x: 0, delay:3 },
	// 		'0');

	// 	console.log("w4Ref duration", w4Ref.current.duration());

		
	// },
	// { dependencies:[open], scope:[], revertOnUpdate: false },
	
	// );

	const inViewRef = useOnInView(
		// (inView, entry) => {
		(inView,entry) => {
			if (inView) {
			// Do something with the element that came into view
			// console.log('Element is in view', entry.target)			
			setComponentInView(true);
			setHasDisplayed(true)
			} else {
			// console.log('Element left view', entry.target)
			setComponentInView(false);
			}
		},
		{
			/* Optional options */
			threshold: 0.05,
			rootMargin: '-35% 0% -35% 0%',
		}, // Optional IntersectionObserver options
	);

	return (
		<div className={ ((!hasDisplayed	&& componentInView) ? ' initial' : '') + (componentInView ? ' in' : ' out') + ' ' + classes} ref={inViewRef}>
			<div>{headline}</div>
			{children && <div>{children}</div>}
		</div>
	)
};
Feature.propTypes = {
	children: PropTypes.node,
	headline: PropTypes.string,
	classes: PropTypes.string
}

export default Feature;