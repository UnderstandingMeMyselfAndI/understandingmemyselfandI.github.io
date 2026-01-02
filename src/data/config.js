import HandymanIcon from "@mui/icons-material/Handyman";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import AutoGraphOutlinedIcon from "@mui/icons-material/AutoGraphOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import UmmiIcon from "@/components/ui/icons/UmmiIcon";
import BlurOnOutlinedIcon from '@mui/icons-material/BlurOnOutlined'
// import { title } from "process";
const cnf = {
	appName: 'Ummi',
	appLogName: 'Understanding Me, Myself, and I',
	installDescription: 'Install the Ummi App',
	appDescription:
		'Understanding Me Myself & I (Ummi) is a companion app and website providing support for mental health, wellbeing, and addiction recovery. It provides quick access to tools and skills learnt in SMART, Cognitive Behavioural Therapy (CBT), Acceptance Commitment Therapy (ACT), Dialectical Behaviour Therapy (DBT) and other therapies.',
	logoURI: '/UmmiIcon2.svg',
	duration: {
		hide: {
			snackbar: 2000,
		},
		show: {},
		ani: {
			in: 350,
			out: 350,
		},
	},
	classes: {
		activity: {
			dormant: 'dormant',
			awake: 'show',
			hide: 'hide',
		},
	},
	sel: {
		activityContainer: '.activities',
		activityNode: '.activity',
	},
}

// ---------------------------------------------------------------
// Icon ids are fixed and should not be mutated as they are used as reference
//
const icons = [
	{
		id: 0,
		title: 'ummi',
		icon: UmmiIcon,
	},
	{
		id: 1,
		title: 'welcome',
		icon: HandymanIcon,
	},
	{
		id: 2,
		title: 'tools',
		icon: HandymanIcon,
	},
	{
		id: 3,
		title: 'techniques',
		icon: AutoAwesomeOutlinedIcon,
	},
	{
		id: 4,
		title: 'motivation',
		icon: AutoGraphOutlinedIcon,
	},
	{
		id: 5,
		title: 'inspiration',
		icon: LightbulbOutlinedIcon,
	},
	{
		id: 6,
		title: 'meditation',
		icon: SpaOutlinedIcon,
	},
	{
		id: 7,
		title: 'videos',
		icon: PlayCircleOutlineOutlinedIcon,
	},
	{
		id: 8,
		title: 'about',
		icon: InfoOutlinedIcon,
	},
	{
		id: 9,
		title: 'tour',
		icon: TourOutlinedIcon,
	},
	{
		id: 10,
		title: 'search',
		icon: SavedSearchIcon,
	},
	{
		id: 11,
		title: 'account',
		icon: BlurOnOutlinedIcon,
	},
	{
		id: 12,
		title: 'back',
		icon: ArrowBackOutlinedIcon,
	},
	{
		id: 13,
		title: 'back',
		icon: ArrowBackOutlinedIcon,
	},
]

const baseActivities = [
	{
		id: 0,
		url: 'introduction',
		title: 'Introduction',

		menu: true,
		speedDial: true,
	},
	{
		id: 1,
		url: 'tools',
		title: 'Tools',

		menu: true,
		speedDial: true,
	},
	{
		id: 2,
		url: 'days-counter',
		title: 'Days Counter',
		menu: true,
		speedDial: true,
	},
	{
		id: 3,
		url: 'motivation',
		title: 'Motivation',
		menu: true,
		speedDial: true,
	},
	{
		id: 4,
		url: 'inspiration',
		title: 'Inspiration',
		menu: true,
		speedDial: true,
	},
	{
		id: 5,
		url: 'meditiation',
		title: 'Meditation',
		menu: true,
		speedDial: true,
	},
	{
		id: 6,
		url: 'videos',
		title: 'Videos',
		menu: true,
		speedDial: true,
	},
	{
		id: 7,
		url: 'about',
		title: 'About',
		menu: true,
		speedDial: true,
	},
	{
		id: 8,
		url: 'tour',
		title: 'Tour',
		menu: true,
		speedDial: true,
	},
	{
		id: 9,
		url: 'search',
		title: 'Search',
		menu: true,
		speedDial: true,
	},
	{
		id: 10,
		url: 'privacy',
		title: 'Your Privacy & Privacy Policy',
		menu: true,
		speedDial: true,
	},
	{
		id: 11,
		url: 'ccpaprivacy',
		title: 'CCPA Privacy Policy',
		menu: true,
		speedDial: true,
	},
	{
		id: 12,
		url: 'settings',
		title: 'Settings',
		menu: true,
		speedDial: true,
	},
	{
		id: 13,
		url: 'lingo-and-phrases',
		title: 'Lingo & Phrases',
		menu: true,
		speedDial: true,
	},
	{
		id: 14,
		url: 'share',
		title: 'Share',
		menu: true,
		speedDial: true,
	},
	{
		id: 15,
		url: 'newsletter',
		title: 'Newsletter',
		menu: true,
		speedDial: true,
	},
	{
		id: 16,
		url: 'install',
		title: 'Install Ummi',
		menu: true,
		speedDial: true,
	},
]
const activities = baseActivities.map((item) => ({
	...item,
	icon: null, // add the sequential icon
}))

const strings = {
	activity: [
		{
			name: 'introduction',

			title: 'Hey',

			content: [
				{
					title: '',
					classes: 'ummi-blue',
					content: [
						'<b><span class="ummi-blue">U</span>nderstanding <span class="ummi-blue">M</span>e, <span class="ummi-blue">M</span>yself, and <span class="ummi-blue">I</span></b><br /> <span class="ummi-blue">(U.M.M.I)</span><br /> is your <b><u>FREE</u></b> companion app.',
					],
				},

				{
					title: 'Your Recovery Toolbox',
					icon: HandymanIcon,
					content: [
						'<span>Addiction Recovery tools explained.</span>',
						'<span>Create your own toolbox to help you recover.</span>',
						'<span>Text & video eplanations.</span>',
						'<span>Scenarios describing when tools can be used.</span>',
						'<span>Private Days Counter to track recovery.</span>',
						'<span>Quick exit button to open Google.com for times when that could be helpful.</span>',
						'<span>Available online or offline.</span>',
						'<span>Complete privacy you control.</span>',
						'<span>Erase all data at anytime.</span>',
					],
				},
				{
					title: 'Who is Ummi for?',
					content: [
						'If you are learning tools at groups<br /> that use ACT, CBT, DBT, REBT, <br /> or SMART therapies<br /><b class="lrg">this app is for you.</b>',
						'These tools are ace.',
						'<b>But remembering them<br /> can be hard.</b> ',
						'<b>Ummi is a support tool<br /> to help you use them<br /> on your journey.</b> ',
					],
				},
			],
			installed: {
				content: [
					{
						title: 'Welcome back!',
						classes: 'ummi-blue',
						content: [
							"How's it going?",
							"Recovery is tough work so if you're working at it, keep holding it down and stacking the wins.",
							'Struggling?<br /><b>"Play the tape forward"</b><br /> helps some people to get out of a rut. ',
							'It\'s in <a href="tools"><b>Lingo & Phrases</b></a><br /> below tools below.',
							'Stay strong and<br /> hang on in there.👊🏼',
						],
					},
				],
			},
			returning: {
				content: {
					title: 'Welcome back!',
					titles: ['Welcome back', 'Hey there', "You're back!", 'Ace to see you', 'Hello', 'Welcome', 'Hey', 'Hello', 'Hi, you good?', 'Good to see you', 'Great to see you'],
					classes: 'ummi-blue',
					content: [],
					contents: [
						"🔎Looking for Recovery tools?👀 <br/><br />👍 You're in the right place.✔<br /><br /> 👊🏾👇Check them out below👇👊",
						"👋It's great to see you again😎🫵",
						"👋You're in good Company😎🫵",
						"👋You're back, that's ace👋 <br />All the solid ones do👊",
						"🫵Hope you're doing🫵<br /> well today<br /> 🏆champ.🏆 <br /><br /> 👇 Check out some 👇<br />🛠️ tools 🛠️<br />and keep up your game💪",
						'🥾Working hard on 🥾<br /> your recovery?🫶🏻<br /><br />🏋️‍♂️Stay strong🏋🏿‍♂️<br /><br /><u>🫵You are worth it💪🏼</u>',
						'👉Pushing through Recovery?<br /><br /> 🤜Keep crushing those🤛 <br />gremlins like a boss.😎',
						'⛐Struggling with<br /> your Recovery?🚘<br /><br />🫸🏻 Keep pushing 🏋️,<br /> the future you🫵<br /> 🤝🏻 will thank you for it.👊',
						"⛐Grafting at your Recovery?🚘<br /><br /> <b>🏋️‍♂️Stay strong🏋🏿‍♂️.<br />👊You've got this.</b> 👊🏿",
						'🏋🏿‍♂️Working your recovery?🏋🏿‍♂️<br /><br />💪 Keep bossing it like<br /> 🏆the champ you are 🏆',
						'😎Bossing your Recovery?🏋🏿‍♂️<br /><br />🏋🏿‍♂️ Stay strong🏋️‍♂️<br /> and<br />🏋🏿‍♂️ keep crushing it👌 ',
						"⛐Keeping it steady⛐<br /> 🚘in recovery?🚘<br /><br /><u>You're back again<br /></u>👊<u> so keep bossing it</u>👊🏾",
						'🫵Working on the better you?🫵<br /><br /> Keep owning it like<br /> the 🏆champ🏆 you are 👌',
						'🏋️‍♂️Working at being<br /> a better you?🫵<br /><br />Keep smashing it<br /> like a ✨ star⭐',
						"🏋️‍♂️Grafting to keep💪 <br />👿the gremlins at bay?☹<br /><br />🢁Keep going🢁.<br /><br />👊🏼 You've got this👌",
					],
				},
			},
		},
		{
			name: 'tools',
			slug: '#recovery-tools',
			title: 'The Tools',
			content: [
				'Tap a heading for an explanation of the tool, how to use it, scenarios where it might be useful, and more.',
				// "Some tools also include videos that help to explain them."
			],
			btnLabel: '',
			cta: {
				title: '',
				content: [],
			},
		},
		{
			name: 'videos',
			title: 'Videos',
			content: [],
		},

		{
			name: 'daysCounter',
			title: 'Days Counter',
			slug: 'days-counter',
			btnLabel: 'Days Counter',
			content: [],
			cta: {
				title: 'Days Counter',
				content: ['Track your progress and remind yourself<br /> how far you have come.'],
			},
		},
		{
			name: 'install',
			title: 'Install',
			slug: '#install',
			htmlContent: [],

			cta: {
				title: 'Install Ummi',
				content: ['Install Ummi for quick access'],
				btn: {
					label: 'Install',
				},
				postInstall: {
					title: 'Thanks!',
					content: ["Thanks for installing Ummi. It's now accessible on your device."],
				},
			},
		},
		{
			name: 'privacy',
			slug: 'privacy',
			title: 'We respect you<br />and your privacy',
			content: [
				'Any personal data you provide to us is stored <b><u>only on your device.</u></b>',

				'You can remove the data at anytime.',
				'Any data we send to our servers is encrypted and anonymised so it cannot be used to identify you and is used to improve the app.',
				'<b><u>We will never sell your data.</u></b>',
			],
			btnLabel: '',
			cta: {
				title: 'We respect you<br />and your privacy',
				content: ['You are fully in control<br />of any data you provide.', 'Visit Settings in the menu<br /> to remove it at any time'],
				btnLabel: 'Privacy Policy',
				route: '/privacy',
			},
		},
		{
			name: 'yourData',
			title: 'Your Data',
			content: [],
			btnLabel: 'Manage Your Data',
			cta: {
				title: 'Manage your data',
				content: ['Any data you provide is stored<br /> only on your device.<br />You can remove the data at anytime.', '<b><u>We will never sell your data.</u></b>'],
			},
		},
		{
			name: 'settings',
			title: 'Settings',
			slug: 'settings',
			id: 14,
			content: [],
			btnLabel: 'Settings',
			cta: {
				title: '',
				content: [''],
			},
		},
	],
	toolbox: {
		added: 'Added to your toolbox',
		removed: 'Removed from your toolbox',
		emergency: {
			added: 'Added to your emergency toolbox',
			removed: 'Removed from your emergency toolbox',
		},
	},
	tools: {
		list: {
			unfiltered: 'Showing ALL tools',
			yourToolsFiltered: 'Showing YOUR tools', //"Showing only the tools you selected"
		},
	},
}

export {cnf, activities, strings}; //strings activities;
