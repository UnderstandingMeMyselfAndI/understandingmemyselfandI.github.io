import { useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import useAppStore from '@/store/useAppStore';
// import { getPWADisplayMode } from '@/utils/isAppInstalled';
import { activities } from '@/data/config';
// import driverObj from '@/js/tour.js'
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import Slide from '@mui/material/Slide';
import './styles.scss';
export const MenuOpenIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='40px'
    width='40px'
    viewBox='0 -960 960 960'
    fill='#ffffff'
  >
    <path d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z' />
  </svg>
);
export const MenuCloseIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='40px'
    viewBox='0 -960 960 960'
    width='40px'
    fill='#ffffff'
  >
    <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
  </svg>
);
// TODO: Implement URLS
export default function AppMenu() {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [showComponent, setOpenComponent] = useState(true);
  const [show, setShow] = useState(true);

  const daysCounterEnabled = useAppStore((state) => state.daysCounterEnabled);
  const unitsCalculatorEnabled = useAppStore((s) => s.unitsCalculatorEnabled);

  const setActivity = useAppStore((state) => state.setActivity);
  const activity = useAppStore((state) => state.activity);

  const isInstalled = useAppStore((state) => state.isInstalled);
  const isInstallable = useAppStore((state) => state.isInstallable);

  const gae = useAppStore((s) => s.gae); // Google analytics enabled

  useEffect(() => {
    setOpenComponent(activity === -1);
  }, [activity]);

  const toggleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    // setActivity(-1);
    setOpen(false);
    // setOpenComponent(activity === -1);
    false;
  };

  useEffect(() => {
    const obj = activities.find((a) =>
      parseInt(a.id) === parseInt(activity) ? activity : null,
    );

    if (obj) {
      setShow(obj.menu);
    }
  }, [activity]);

  return showComponent ? (
    <div className={'AppMenu' + (show ? ' ' : ' hide')}>
      <div className='burger-stack' id='burger-button'>
        <input
          type='checkbox'
          id='checkbox1'
          value={open}
          checked={open}
          className='checkbox1 visuallyHidden'
          onChange={toggleOpen}
        />
        <label htmlFor='checkbox1'>
          <div className='hamburger hamburger1'>
            <span className='bar bar1'></span>
            <span className='bar bar2'></span>
            <span className='bar bar3'></span>
            <span className='bar bar4'></span>
          </div>
        </label>
      </div>
      <ul className={open ? ' open' : ' closed'} id='app-menu'>
        <li
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'tools', {
                app_name: 'Ummi',
                screen_name: 'Tools',
              });
            }
            setActivity(-1);
            const el = document.getElementById('tools');
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });

            handleClose();
          }}
        >
          Tools
        </li>
        <li
          className=''
          onClick={() => {
            const el = document.getElementById('lingo');
            if (gae && window.gtag) {
              window.gtag('event', 'lingo_phrases', {
                app_name: 'Ummi',
                screen_name: 'Lingo & Phrases',
              });
            }

            setActivity(-1);
            handleClose();

            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }}
        >
          Lingo &amp; Phrases
        </li>
        {/* <li
					className='strikethrough'
					// onClick={() => {
					// 	handleClose()
					// 	setActivity(-1)
					// 	// position element ready for tour
					// 	// const el = document.getElementById('gratitude')

					// 	// el.scrollIntoView({ behavior: 'smooth', block: 'start' })

					// 	window.scrollTo({
					// 		top: 0,
					// 		left: 0,
					// 		behavior: 'smooth',
					// 	})

					// 	// driverObj.drive()
					// }}
				>
					Tour
				</li> */}
        {/** Only show if days counter is enabled	 */}

        {daysCounterEnabled && (
          <li
            className='new'
            onClick={() => {
              if (gae && window.gtag) {
                window.gtag('event', 'days_counter', {
                  app_name: 'Ummi',
                  screen_name: 'Days Counter',
                });
              }
              setActivity(2);
              handleClose();
            }}
          >
            Days Counter
          </li>
        )}
        {unitsCalculatorEnabled && (
          <li
            className='new'
            onClick={() => {
              if (gae && window.gtag) {
                window.gtag('event', 'unites_calculator', {
                  app_name: 'Ummi',
                  screen_name: 'Units Calculator',
                });
              }
              setActivity(5);
              handleClose();
            }}
          >
            Units Calculator
          </li>
        )}

        {!isInstalled && isInstallable && (
          <li
            className=''
            onClick={() => {
              if (gae && window.gtag) {
                window.gtag('event', 'install', {
                  app_name: 'Ummi',
                  screen_name: 'Install',
                });
              }

              const el = document.getElementById('install');

              el.scrollIntoView({ behavior: 'smooth', block: 'start' });

              setActivity(-1);
              handleClose();
            }}
          >
            Install
          </li>
        )}
        <li
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'share', {
                app_name: 'Ummi',
                screen_name: 'Share',
              });
            }

            const el = document.getElementById('share');

            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActivity(-1);
            handleClose();
          }}
        >
          Share
        </li>

        <li
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'newsletter', {
                app_name: 'Ummi',
                screen_name: 'Newsletter',
              });
            }

            const el = document.getElementById('newsletter');

            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActivity(15);
            handleClose();
          }}
        >
          Newsletter
        </li>

        <li
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'privacy_policy', {
                app_name: 'Ummi',
                screen_name: 'Privacy Policy',
              });
            }
            setActivity(10);
            handleClose();
          }}
        >
          Your privacy
        </li>
        {/* <li className='strikethrough'>
					<div className='loginRegister'>
						<div
							className='register'
							// onClick={() => {
							// 	handleClose()
							// 	setActivity(-1)
							// }}
						>
							Register
						</div>
						<div
							className=''
							// onClick={() => {
							// 	handleClose()
							// 	setActivity(-1)
							// }}
						>
							Login
						</div>
					</div> 
				</li>*/}
        <li
          className=''
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'settings', {
                app_name: 'Ummi',
                screen_name: 'Settings',
              });
            }
            setActivity(12);
            handleClose();
          }}
        >
          Settings
        </li>
        {/* <li onClick={handleClose}>Tour</li> */}
        {/* <li onClick={handleClose}>Settings</li> */}
      </ul>
    </div>
  ) : null;
}
