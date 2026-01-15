import * as React from 'react';
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
import { GSDevTools } from 'gsap/GSDevTools';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, GSDevTools, ScrollTrigger, SplitText);

// import "../../../scss/Animation.css";
// import "./AnimationIntro.scss";
import './styles.scss';

const Header = () => {
  const [open, setOpen] = React.useState(false);
  // const [isInView, setIsInView] = React.useState(true);
  //   const [stage, setStage] = React.useState(0);
  const activity = useAppStore((s) => s.activity);
  const scrollStage = useAppStore((state) => state.scrollStage);

  useEffect(() => {
    setOpen(activity === -1);
  }, [activity]);

  useEffect(() => {
    scrollStage > 2 ? setOpen(false) : setOpen(true);
  }, [scrollStage, setOpen]);

  const cont = useRef();
  const logo = useRef();
  const wGrp = useRef();
  const w0 = useRef();

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
        y: '-20px',
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
        ease: 'power2.inOut',
      },
      wgrp: {
        // delay: 2.6,
        duration: 0.8,
        autoAlpha: 1,
        ease: 'power2.inOut',
      },
      w0: {
        duration: 0.8,
        autoAlpha: 1,
        delay: 0,
        y: 0,
        ease: 'power2.inOut',
      },
      w1: {
        duration: 0.25,

        autoAlpha: 1,
        // delay: 2.9,
        x: 0,
        ease: 'power2.inOut',
      },
      w2: {
        duration: 0.8,

        autoAlpha: 1,
        // delay: 3.1,
        x: 0,
        ease: 'power2.inOut',
      },
      w3: {
        duration: 0.8,

        autoAlpha: 1,
        delay: 3.2,
        x: 0,
        ease: 'power2.inOut',
      },
      w4: {
        duration: 0.8,
        autoAlpha: 1,
        delay: 2.8,
        x: 0,
        ease: 'power2.inOut',
      },
    },
  };

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.65, ease: 'power3.inOut' },
      });
      const tl2 = gsap.timeline({
        defaults: { duration: 0.65, ease: 'power3.inOut' },
      });
      const tl3 = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.5,
        yoyo: true,
        defaults: { duration: 0.65, ease: 'power3.inOut' },
      });

      gsap.set('.w3', { autoAlpha: 0, rotateY: '1080deg', x: 0, y: 0 });

      if (scrollStage < 2) {
        tl.to('.homelogo', { autoAlpha: 1, scale: 1 }, 1);
        tl.to('.wgrp', { autoAlpha: 1, scale: 1 }, 0.75);
        tl2.to('.w0', { autoAlpha: 1, scale: 1, x: 0, y: 0 }, '1.75');
        tl2.to('.w1', { autoAlpha: 1, scale: 1, x: 0, y: 0 }, '-=0.5');
        tl2.to('.w2', { autoAlpha: 1, scale: 1, x: 0, y: 0 }, '-=0.35');
        tl2.to(
          '.w3',
          { autoAlpha: 1, duration: 1.5, rotateY: 0, x: 0, y: 0 },
          '-=0.5',
        );
        tl2.to('.w4', { autoAlpha: 1, rotateY: 0, x: 0, y: 0 }, '-=1.5');

        tl3.to('.w3', { duration: 1.5, rotateY: '1080deg' }, '+=6');

        gsap.set('.a1', { y: 0, rotateZ: 180, autoAlpha: 0 });
        let tlArrow2 = gsap.timeline({
          repeat: -1,
          ease: 'power4.inOut',
          delay: 4,
        });

        tlArrow2.to(
          '.a1',
          { duration: 0.85, y: 460, scale: 0.5, autoAlpha: 0.0 },
          '>',
        );
        tlArrow2.to(
          '.a1',
          { duration: 0.65, y: 220, scale: 1.5, autoAlpha: 0.5 },
          '>',
        );
        tlArrow2.to(
          '.a1',
          { duration: 0.65, y: 0, scale: 0.5, autoAlpha: 0.0 },
          '>',
        );
      }
    },
    { dependencies: [cnf, scrollStage], revertOnUpdate: true },
  );

  return (
    <header ref={cont} id='header' className={'header' + (open ? ' show' : '')}>
      {/* <div id='header-viewport-position'></div> */}
      <div className='home-grp'>
        <div className='home-logo homelogo' ref={logo}>
          <Logo />
        </div>
        <div className={`wgrp ss-${scrollStage}`} ref={wGrp}>
          <h1>
            <div className='r1 w0' ref={w0}>
              Understanding
            </div>

            <div className='r2'>
              <div className='w1'>Me</div>
              <div className='w2'>Myself</div>
              <div className='w3'>&</div>
              <div className='w4'>I</div>
            </div>
          </h1>
        </div>
        <div className='arrow-grp-1'>
          <div className='arrow-cont a1'>
            <ArrowDownwardOutlinedIcon className='arrow' />
          </div>
        </div>
      </div>
    </header>
  );
};
Header.PropTypes = {};
export default Header;
