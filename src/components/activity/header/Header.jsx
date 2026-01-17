import { useState } from 'react';
import { useRef, useEffect } from 'react';
import Logo from 'ui/logo/Logo.jsx';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import useAppStore from '@/store/useAppStore';
// import { useOnInView } from 'react-intersection-observer';
// import React from "https://esm.sh/react@19.1.0";
// import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
// import PropTypes from 'prop-types';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
// import { GSDevTools } from 'gsap/GSDevTools';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// import "../../../scss/Animation.css";
// import "./AnimationIntro.scss";
import './styles.scss';
import { fabClasses } from '@mui/material/Fab';

const Header = () => {
  const [open, setOpen] = useState(false);
  // const [isInView, setIsInView] = useState(true);
  //   const [stage, setStage] = useState(0);
  const activity = useAppStore((s) => s.activity);
  // const scrollStage = useAppStore((state) => state.scrollStage);
    const cont1 = useRef();
    const cont2 = useRef();
  const arrowsCont = useRef();

  useEffect(() => {
    console.log("Header activity", activity);
    setOpen(activity === -1);
  }, [activity]);


  useGSAP(
    () => {
       gsap.set('.w3', { autoAlpha: 0, rotateY: '1080deg', x: 0, y: 0 });
        cont1.current = gsap.timeline({repeat: -1, repeatDelay: 0, yoyo: true, defaults: { duration: 0.65, ease: 'power3.inOut' } })
          .fromTo('.homelogo',{ autoAlpha: 0, scale: 1.4, delay:0,duration:0.3 }, { autoAlpha: 1, scale: 1 ,scrollTrigger: {
              trigger: '.homelogo',
              start: "top 80%",              
              end: "top 30%",              
              scrub: true,
              markers: false,
              id:"logo",
              toggleActions: "play pause resume reset"

          }}, 1)
          .to('.wgrp', { autoAlpha: 1, scale: 1 },' 0.75')
          .to('.w0', { autoAlpha: 1, scale: 1, x: 0, y: 0 },' 1.75')
          .to('.w1', { autoAlpha: 1, scale: 1, x: 0, y: 0 }, '-=0.5')
          .to('.w2', { autoAlpha: 1, scale: 1, x: 0, y: 0 }, '-=0.35')
          .to(
            '.w3',
            { autoAlpha: 1, duration: 1.5, rotateY: 0, x: 0, y: 0 },
            '-=0.5',
          )
          .to('.w4', { autoAlpha: 1, rotateY: 0, x: 0, y: 0 }, '-=1.5'); 

    },
    { scope:cont1, revertOnUpdate: fabClasses },

    
  );
  useGSAP(
    () => {
       gsap.set('.w3', { autoAlpha: 0, rotateY: '1080deg', x: 0, y: 0 });
const scrub = true;
        cont2.current = gsap.timeline({defaults: { duration: 0.65, ease: 'power3.inOut' }})

          .fromTo('.home-logo-wrap',{ autoAlpha: 1, scale: 1, translateY:0 },{ autoAlpha: 0.15, scale: 0.6, translateY:500, duration:1.5,
            scrollTrigger: {
              // trigger: '.homelogo',
              start: "top top+=5%",              
              end: "bottom ",              
              scrub: scrub,
              markers: false,
              id:"logo",
              toggleActions: "play reverse resume reverse"

          }},'0.7')
          .to('.w0w', { autoAlpha: 0.0,rotateX:'-90deg', duration:3, scrollTrigger: {
              trigger: '.homelogo',
              start: "top 20%",              
              scrub: scrub,
              markers: false,
              id:"group",
              toggleActions: "play pause resume reset"

          } },' -0.75')          
          .to('.w0w', { translateY:75, scale:0.8, duration:3, scrollTrigger: {
              trigger: '.homelogo',
              start: "top 20%",              
              scrub: scrub,
              markers: false,
              id:"group",
              toggleActions: "play pause resume reset"

          } },' -0.5')
          
          // .to('.w1w', { autoAlpha: 0.15,translateX:-120, translateY:200, scale:0.8, duration:2, scrollTrigger: {
          //     trigger: '.homelogo',
          //     start: "top 20%",              
          //     scrub: scrub,
          //     markers: true,
          //     id:"group",
          //     toggleActions: "play pause resume reset"

          // } },' -1.75')
          // .to('.w2w', { autoAlpha: 0.0,translateX:-20,translateY:300, rotateX:'90deg', scale:0.6, duration:4, scrollTrigger: {
          //     trigger: '.homelogo',
          //     start: "top 20%",              
          //     scrub: scrub,
          //     markers: true,
          //     id:"group",
          //     toggleActions: "play pause resume reset"

          // } },' -0.75')
          // .to('.w3w', { autoAlpha: 0.15,translateX:10,translateY:180, scale:0.8, duration:3, scrollTrigger: {
          //     trigger: '.homelogo',
          //     start: "top 20%",              
          //     scrub: scrub,
          //     markers: true,
          //     id:"group",
          //     toggleActions: "play pause resume reset"

          // } },' -0.75')
          //  .to('.w4w', { autoAlpha: 0.15,translateX:40,translateY:250, scale:0.6, duration:4, scrollTrigger: {
          //     trigger: '.homelogo',
          //     start: "top 20%",              
          //     scrub: scrub,
          //     markers: true,
          //     id:"group",
          //     toggleActions: "play pause resume reset"

          // } },' -0.6')


      

    },
    { scope:cont2, revertOnUpdate: fabClasses },

    
  );



  return (
    <section  id='header' className={'activity header' + (open ? ' show' : ' hide')}  ref={cont1}>

      <div className='home-grp'  ref={cont2}>
        <div className='home-logo-wrap' >
          <div className='home-logo homelogo' >
            <Logo />
          </div>
        </div>
        <div className={`wgrp ss-0`} >
          <div >
          <h1>
            <div className='w0w'><div className='r1 w0' >
              Understanding
            </div></div>

            <div className='r2'>
             <div className='w1w'><div className='w1'>Me</div></div> 
            <div className='w2w'><div className='w2'>Myself</div></div> 
            <div className='w3w'><div className='w3'>&</div></div> 
             <div className='w4w'><div className='w4'>I</div></div> 
            </div>
          </h1>
          </div>
        </div>
        <div className='arrow-grp-1' ref={arrowsCont}>
          <div className='arrow-cont a1'>
            <ArrowDownwardOutlinedIcon className='arrow' />
          </div>
        </div>
      </div>
    </section>
  );
};
Header.PropTypes = {};
export default Header;
