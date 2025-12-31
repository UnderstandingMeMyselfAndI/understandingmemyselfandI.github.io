import { useEffect, useState } from 'react'
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import useAppStore from '@/store/useAppStore'
import { getPWADisplayMode } from '@/utils/isAppInstalled'
import { activities } from '@/data/config'
// import driverObj from '@/js/tour.js'
// import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
// import Slide from '@mui/material/Slide';
import './appMenuStyles.scss'
export const MenuOpenIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' height='40px' width='40px' viewBox='0 -960 960 960' fill='#ffffff'>
		<path d='M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z' />
	</svg>
)
export const MenuCloseIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' height='40px' viewBox='0 -960 960 960' width='40px' fill='#ffffff'>
		<path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
	</svg>
)
// TODO: Implement URLS
export default function AppMenu() {
	const [anchorEl, setAnchorEl] = useState(null)
	const [open, setOpen] = useState(false)
	const [show, setShow] = useState(true)

	const daysCounterEnabled = useAppStore((state) => state.daysCounterEnabled)
	const setActivity = useAppStore((state) => state.setActivity)
	const activity = useAppStore((state) => state.activity)

	const isInstalled = useAppStore((state) => state.isInstalled)
	const isInstallable = useAppStore((state) => state.isInstallable)

	const toggleOpen = () => {
		setOpen(!open)
	}
	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		const obj = activities.find((a) => (parseInt(a.id) === parseInt(activity) ? activity : null))

		if (obj) {
			setShow(obj.menu)
		}
	}, [activity])

	return (
		<div className={'AppMenu' + (show ? '' : ' hide')}>
			<div className='burger-stack' id='burger-button'>
				<input type='checkbox' id='checkbox1' value={open} checked={open} className='checkbox1 visuallyHidden' onChange={toggleOpen} />
				<label htmlFor='checkbox1'>
					<div className='hamburger hamburger1'>
						<span className='bar bar1'></span>
						<span className='bar bar2'></span>
						<span className='bar bar3'></span>
						<span className='bar bar4'></span>
					</div>
				</label>
			</div>
			<ul className={open ? ' open' : ' '} id='app-menu'>
				<li
					onClick={() => {
						setActivity(1)
						const el = document.getElementById('tools')

						el.scrollIntoView({ behavior: 'smooth', block: 'start' })
						handleClose()
					}}
				>
					Tools
				</li>
				<li
					className='new'
					onClick={() => {
						handleClose()
						setActivity(13)
						const el = document.getElementById('lingo')

						el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
							handleClose()
							setActivity(2)
						}}
					>
						Days Counter
					</li>
				)}

				{!isInstalled && isInstallable && (
					<li
						className=''
						onClick={() => {
							handleClose()
							setActivity(-1)
							const el = document.getElementById('install')

							el.scrollIntoView({ behavior: 'smooth', block: 'start' })
						}}
					>
						Install
					</li>
				)}
				<li
					onClick={() => {
						handleClose()
						setActivity(14)
						const el = document.getElementById('share')

						el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					}}
				>
					Share
				</li>

				<li
					onClick={() => {
						handleClose()
						setActivity(15)
						const el = document.getElementById('newsletter')

						el.scrollIntoView({ behavior: 'smooth', block: 'start' })
					}}
				>
					Newsletter
				</li>

				<li
					onClick={() => {
						handleClose()
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
					className='new'
					onClick={() => {
						setActivity(12)
						handleClose()
					}}
				>
					Settings
				</li>
				{/* <li onClick={handleClose}>Tour</li> */}
				{/* <li onClick={handleClose}>Settings</li> */}
			</ul>
		</div>
	)
}
