import { useEffect, useState } from 'react'
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import useAppStore from '@/store/useAppStore'
// import { getPWADisplayMode } from '@/utils/isAppInstalled';
import { activities } from '@/data/config'
// import driverObj from '@/js/tour.js'
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import Slide from '@mui/material/Slide';
import './styles.scss'
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
)
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
)
// TODO: #19 Implement URLS and routing
export default function AppMenu() {
  // const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false)
  const [showMenu, setShowMenu] = useState(true)
  const [openMenu, setOpenMenu] = useState(false)

  const daysCounterEnabled = useAppStore((state) => state.daysCounterEnabled)
  const unitsCalculatorEnabled = useAppStore((s) => s.unitsCalculatorEnabled)

  const setActivity = useAppStore((state) => state.setActivity)
  const activity = useAppStore((state) => state.activity)

  const isInstalled = useAppStore((state) => state.isInstalled)
  const isInstallable = useAppStore((state) => state.isInstallable)

  const gae = useAppStore((s) => s.gae) // Google analytics enabled
  const nss = useAppStore((s) => s.nss) // subscribed to newsletter
  const setRoute = useAppStore((s) => s.setRoute) // subscribed to newsletter

  // useEffect(() => {
  //   // setOpen(activity === -1)
  // }, [activity])

  const toggleOpen = () => {
    setOpen(!open)
  }
  const handleClose = (obj) => {
    // setActivity(-1);
    if (!obj) return
    setRoute({
      url: obj.url,
      title: obj.title,
    })
    setOpen(false)
  }

  function findObj(id) {
    const obj = activities.find((a) =>
      parseInt(a.id) === parseInt(id) ? id : null,
    )
    return obj
  }

  useEffect(() => {
    const obj = activities.find((a) =>
      parseInt(a.id) === parseInt(activity) ? activity : null,
    )
    setShowMenu(activity === -1)
    if (obj) {
      setOpenMenu(obj.menu)
    }
  }, [activity])

  return showMenu ? (
    <div className={'AppMenu' + (openMenu ? ' ' : ' hide')}>
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
      <ul
        className={open ? ' open' : ' closed'}
        id='app-menu'
        onClick={handleClose}
      >
        <li
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'tools', {
                app_name: 'Ummi',
                screen_name: 'Tools',
              })
            }

            // requestAnimationFrame(() => {
            //   const el = document.getElementById('the-tools')
            //   el.scrollIntoView(true)
            // })

            const activityObj = findObj(1)
            handleClose({
              url: activityObj.url,
              title: activityObj.url,
            })
            setActivity(1) // temp solution
          }}
        >
          Tools
        </li>
        <li
          className=''
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'lingo_and_phrases', {
                app_name: 'Ummi',
                screen_name: 'Lingo & Phrases',
              })
            }

            requestAnimationFrame(() => {
              const el = document.getElementById('lingo')
              el.scrollIntoView(true)
            })

            const activityObj = findObj(13)
            handleClose({
              url: activityObj.url,
              title: activityObj.url,
            })

            setActivity(-1)
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
                })
              }
              const activityObj = findObj(2)
              handleClose({
                url: activityObj.url,
                title: activityObj.url,
              })
              setActivity(2)
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
                window.gtag('event', 'units_calculator', {
                  app_name: 'Ummi',
                  screen_name: 'Units Calculator',
                })
              }
              const activityObj = findObj(5)
              handleClose({
                url: activityObj.url,
                title: activityObj.url,
              })
              setActivity(5)
              handleClose()
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
                })
              }
              requestAnimationFrame(() => {
                const el = document.getElementById('install')
                el.scrollIntoView(true)
              })
              const activityObj = findObj(16)
              handleClose({
                url: activityObj.url,
                title: activityObj.url,
              })
              setActivity(-1)
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
              })
            }
            requestAnimationFrame(() => {
              const el = document.getElementById('share')
              el.scrollIntoView(true)
            })
            const activityObj = findObj(14)
            handleClose({
              url: activityObj.url,
              title: activityObj.url,
            })
            setActivity(-1)
          }}
        >
          Share
        </li>

        {!nss && (
          <li
            onClick={() => {
              if (gae && window.gtag) {
                window.gtag('event', 'newsletter', {
                  app_name: 'Ummi',
                  screen_name: 'Newsletter',
                })
              }
              requestAnimationFrame(() => {
                const el = document.getElementById('newsletter')
                el.scrollIntoView(true)
              })
              const activityObj = findObj(15)
              handleClose({
                url: activityObj.url,
                title: activityObj.url,
              })
              // setActivity(15);
              setActivity(-1)
            }}
          >
            Newsletter
          </li>
        )}
        <li
          onClick={() => {
            if (gae && window.gtag) {
              window.gtag('event', 'privacy_policy', {
                app_name: 'Ummi',
                screen_name: 'Privacy Policy',
              })
            }
            const activityObj = findObj(10)
            handleClose({
              url: activityObj.url,
              title: activityObj.url,
            })
            setActivity(10)
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
              })
            }
            const activityObj = findObj(12)
            handleClose({
              url: activityObj.url,
              title: activityObj.url,
            })

            setActivity(12)
          }}
        >
          Settings
        </li>
        {/* <li onClick={handleClose}>Tour</li> */}
        {/* <li onClick={handleClose}>Settings</li> */}
      </ul>
      <div className='app-nemu-bg' onClick={handleClose}></div>
    </div>
  ) : null
}
