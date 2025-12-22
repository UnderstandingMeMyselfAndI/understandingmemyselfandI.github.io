import {driver} from "driver.js";
import "driver.js/dist/driver.css";



import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined'
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined'

// import {openMenu, closeMenu} from "@/src/components/ui/menus/settingsMenu/menuController.js";

// const createOnboarding = () => {
// 	return driver({
// 		showProgress: true,
// 		nextBtnText: '<span>Next</span> ' + iconArrowForward,
// 		prevBtnText: iconArrowBackward + ' <span>Back</span>',
// 		doneBtnText: '✕',
// 		popoverClass: 'flp-theme',
// 		steps: [
// 			{
// 				popover: {
// 					title: "<div class='intro title'><span class='t'>A tour?</span><span class='italic'>Let's show<br />you around!</span></div>",
// 					description:
// 						"<div class='intro'><p><span class='note'>Just a quick note:</span></p><p>Privacy is important to us so everything you do here is only stored on your device.</p><p>Nothing is shared with anyone else. 👍 </p><p>Use the arrows below to continue.</p></div>",
// 				},
// 			},
// 			{
// 				element: '#burger-button',
// 				popover: {
// 					title: "<span class='tSml'>Settings</span>",
// 					description: 'Access the menu here.',
// 					side: 'left',
// 					align: 'start',
// 				},
// 				onNextClick: () => {
// 					console.log('Opening menu from onboarding step 2')
// 					const bstack = document.getElementById('burger-button')
// 					bstack.click()
// 					setTimeout(() => {
// 						driverObj.moveNext()
// 					}, 500)
// 				},
// 			},
// 			{
// 				element: '#basic-menu',
// 				popover: {
// 					title: "<span class='tSml'>Settings Menu</span>",
// 					description: 'Here you can access your profile and account settings.',
// 					side: 'left',
// 					align: 'start',
// 				},
// 				onNextClick: () => {
// 					closeMenu()
// 					driverObj.moveNext()
// 				},
// 			},
// 			{
// 				element: '#FontSizeDrawer',
// 				popover: {
// 					title: "<span class='tSml'>Font Size</span>",
// 					description: 'Adjust the text size to your preference.',
// 					side: 'left',
// 					align: 'start',
// 				},
// 			},
// 			{
// 				element: '#ButtonShare',
// 				popover: {
// 					title: 'Share',
// 					description: 'Share this app with others.',
// 					side: 'left',
// 					align: 'start',
// 				},
// 			},
// 		],
// 	})
// };

// export default createOnboarding;

const driverObj = driver({
	showProgress: true,
	nextBtnText: '<span>Next</span> ' + ArrowForwardIosOutlinedIcon,
	prevBtnText: ArrowBackIosOutlinedIcon + ' <span>Back</span>',
	doneBtnText: '✕',
	popoverClass: 'flp-theme',
	steps: [
		{
			popover: {
				title: "<div class='intro title'><span class='t'>A tour?</span><span class='italic'>Let's show<br />you around!</span></div>",
				description:
					"<div class='intro'><p><span class='note'>Just a quick note:</span></p><p>Privacy is important to us so everything you do here is only stored on your device.</p><p>Nothing is shared with anyone else. 👍 </p><p>Use the arrows below to continue.</p></div>",
			},
		},
		{
			element: '#burger-button',
			popover: {
				title: "<span class='tSml'>Settings</span>",
				description: 'Access the menu here.',
				side: 'left',
				align: 'start',
			},
			onNextClick: () => {
				console.log('Opening menu from onboarding step 2')
				const bstack = document.getElementById('burger-button')
				bstack.click()
				setTimeout(() => {
					driverObj.moveNext()
				}, 500)
			},
		},
		// {
		// 	element: '#basic-menu',
		// 	popover: {
		// 		title: "<span class='tSml'>Settings Menu</span>",
		// 		description: 'Here you can access your profile and account settings.',
		// 		side: 'left',
		// 		align: 'start',
		// 	},
		// 	onNextClick: () => {
		// 		closeMenu()
		// 		driverObj.moveNext()
		// 	},
		// },
		// {
		// 	element: '#FontSizeDrawer',
		// 	popover: {
		// 		title: "<span class='tSml'>Font Size</span>",
		// 		description: 'Adjust the text size to your preference.',
		// 		side: 'left',
		// 		align: 'start',
		// 	},
		// },
		// {
		// 	element: '#ButtonShare',
		// 	popover: {
		// 		title: 'Share',
		// 		description: 'Share this app with others.',
		// 		side: 'left',
		// 		align: 'start',
		// 	},
		// },
	],
})

driverObj.drive()