import { useState } from 'react';
import { useRef, useEffect } from 'react';
import Logo from 'ui/logo/Logo.jsx';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import useAppStore from '@/store/useAppStore';
// import { useOnInView } from 'react-intersection-observer';
// import React from "https://esm.sh/react@19.1.0";
// import ReactDOM from "https://esm.sh/react-dom@19.1.0/client";
import PropTypes from 'prop-types';
// import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import gsap from "https://esm.sh/gsap";
// import { GSDevTools } from 'gsap/GSDevTools';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { SplitText } from 'gsap/SplitText';
import { useOnInView } from 'react-intersection-observer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

// import "../../../scss/Animation.css";
// import "./AnimationIntro.scss";
import './styles.scss';


const Header = () => {
  const [open, setOpen] = useState(false);

  // const [isInView, setIsInView] = useState(true);
  //   const [stage, setStage] = useState(0);
  const activity = useAppStore((s) => s.activity);
  // const scrollStage = useAppStore((state) => state.scrollStage);
    const cont = useRef();
    const logoRef = useRef();
    const groupRef = useRef();
    const w0Ref = useRef();
    const w1Ref = useRef();
    const w2Ref = useRef();
    const w3Ref = useRef();
    const w4Ref = useRef();
  const arrowsCont = useRef();
  

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  useGSAP(() => {

   
    if(!open) return;
     console.log("open", open);
    logoRef.current = gsap.timeline(
      {
        repeat: 5, 
        repeatDelay: 2, 
        yoyo: true, 
        defaults: { 
          duration: 0.65,               
          ease: 'power3.inOut' 
        }
      })
      .fromTo('.homelogo',
        { 
          autoAlpha: 0, 
          scale: 1.2, 
          delay:0,
          duration:0.3 
        },
          { 
          autoAlpha: 1, 
          scale: 1,
          duration:0.85,
          ease: 'back.inOut' 
          }).to('.homelogo',
       
          { 
          autoAlpha: 1, 
          delay:9.4,
          }).to('.homelogo',
       
          { 
           autoAlpha: 0, 
          scale: 0.8, 
          delay:0,
          duration:0.6 
          });

           console.log("logoRef duration", logoRef.current.duration());

  },  { dependencies:[open], scope:[logoRef], revertOnUpdate: false },);

  useGSAP(
    () => {
       
         
          if(!open) return;

          const config = {
            repeat: -1, 
            repeatDelay: 3, 
            yoyo: true, 
            defaults: { 
              duration: 0.5,               
              ease: 'power3.out' 
            }
          }         
         
          w0Ref.current = gsap.timeline({...config})
          .delay(2)
          .fromTo('.w0', 
            { autoAlpha: 0, rotateX: '-80deg',  y: -50 },
            { autoAlpha: 1, rotateX: 0,  y: 0,ease: 'back.inOut'},
             '0')
            .to('.w0',{ autoAlpha: 1, rotateX: 0,  y: 0, delay:3},
             '0');      
          console.log("w0Ref duration", w0Ref.current.duration());
          
          
           w1Ref.current = gsap.timeline({...config})
           .delay(2)
          .fromTo('.w1', 
            { autoAlpha: 0, rotateY: '-80deg', x: -15, delay:0.5},
             { autoAlpha: 1, rotateY: 0, x: 0, delay:0.7},
             '0')
          .to('.w1',{ autoAlpha: 1, rotateY: 0, x: 0, delay:3},
             '0')
          console.log("w1Ref duration", w1Ref.current.duration());


          w2Ref.current = gsap.timeline({...config})
           .delay(2)
          .fromTo('.w2', 
             { autoAlpha: 0, scale: 0.9, x: 0, y: 0 },
              { autoAlpha: 1, scale: 1, x: 0, y: 0, duration:1, delay:0.35 },
             '0')
          .to('.w2',{ autoAlpha: 1, scale: 1, x: 0, y: 0, delay:3 },
             '0')
          console.log("w2Ref duration", w2Ref.current.duration());


          w3Ref.current = gsap.timeline({...config })
          .delay(2)
          .fromTo('.w3', 
            { autoAlpha: 0, rotateY: '0', rotateX:'80deg', x: 0, y: 30 },
            { autoAlpha: 1, rotateY: '0deg',  rotateX:'0deg', x: 0, y: 0 },
             '0')
          .to('.w3', {duration: 1.5, rotateY: '2160deg', delay:0.65},
             '0')
          .to('.w3', {duration: 1.5, rotateY: '2160deg', delay:2},
             '0');

            console.log("w3Ref duration", w3Ref.current.duration());
          w4Ref.current = gsap.timeline({ ...config})
          .delay(2)
          .fromTo('.w4', 
            { autoAlpha: 0, x: 0, y: 30, rotateZ: '-115deg',transformOrigin: "left top" },
            { autoAlpha: 1,  x: 0, y:0, rotateZ: '0deg' , delay:0.95, duration: 1, ease: 'bounce.out',transformOrigin: "left top" },
             '0')
            .to( '.w4',{ autoAlpha: 1, rotateZ: '0deg', transformOrigin: "left top", x: 0, delay:3 },
             '0');

          console.log("w4Ref duration", w4Ref.current.duration());

        
    },
    { dependencies:[open],scope:[cont,w0Ref,w1Ref,w2Ref,w3Ref,w4Ref], revertOnUpdate: false },
    
  );


    
  // );
 //https://gsap.com/resources/react-advanced#registereffect

 /* <FadeIn vars={{ x: 100 }}>
      <div className="box">Box</div>
    </FadeIn>

    
function Component() {
  const animation = useRef();

  const toggle = () => {
    animation.current.reversed(!animation.current.reversed());
  };

  return (
    <div className="app">
      <div>
        <button onClick={toggle}>Toggle</button>
      </div>
      <FadeIn stagger={0.1} x={100} ref={animation}>
        <div className="box gradient-blue">Box 1</div>
        <div className="box gradient-blue">Box 2</div>
      </FadeIn>
    </div>
  );
}*/
 // 

function FadeIn({ children, stagger = 0,  ref  }) {
  const el = useRef();
  const animation = useRef();
  useGSAP(() => {
    animation.current = gsap.from(el.current.children, {
      opacity: 0,
      stagger,
      // x,
    });
  });
  
  useGSAP(() => {
    // forward the animation instance
    if (typeof ref === "function") {
      ref(animation.current);
    } else if (ref) {
      ref.current = animation.current;
    }
  }, [ref]);

  return <span ref={el}>{children}</span>;
}
FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  x: PropTypes.number,
  stagger: PropTypes.number,
  ref: PropTypes.any,
}


  return (
    <section  id='header' className={'activity header' + (open ? ' show' : ' hide')}  ref={cont}>
      <div className="threshold"></div>
      <div className={'group-wrap' } >
        <div className='home-grp'  >
          <div className='home-logo-wrap' ref={logoRef}>
            <div className='home-logo homelogo' >
              <Logo />
            </div>
          </div>
          <div className={`wgrp ss-0`} ref={groupRef}>
            <div >
              <div className="logoType">
                <div className='w0w' ref={w0Ref} >
                  <div className='r1 w0' >Understanding</div>
                </div>

                <div className='r2'>
                  <div className='w1w' ref={w1Ref}><div className='w1'>Me</div></div> 
                  <div className='w2w' ref={w2Ref}><div className='w2'>Myself</div></div> 
                  <div className='w3w' ref={w3Ref}><div className='w3'>&</div></div> 
                  <div className='w4w' ref={w4Ref}><div className='w4'>I</div></div> 
                </div>
              </div>
            </div>
          </div>
          <div className='arrow-grp-1' ref={arrowsCont}>
            <div className='arrow-cont a1'>
              <ArrowDownwardOutlinedIcon className='arrow' />
            </div>
          </div>
         </div>
      </div>
    </section>
  );
};
Header.PropTypes = {
  
};
export default Header;
