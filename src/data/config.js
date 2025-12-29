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
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
// import { title } from "process";
const cnf = {
	appName: "Ummi",
	appLogName: "Understanding Me, Myself, and I",
	installDescription:"Install the Ummi App",
	appDescription: "Ummi is a app that provides tools, techniques and content that helps people cope with emotions, thoughts, feelings and mental health.",
	logoURI: "/UmmiIcon2.svg",
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
			dormant: "dormant",
			awake: "show",
			hide: "hide",
		},
	},
	sel: {
		activityContainer: ".activities",
		activityNode: ".activity",
	},
};

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

		menu: false,
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
		menu: false,
		speedDial: true,
	},
	{
		id: 4,
		url: 'inspiration',
		title: 'Inspiration',
		menu: false,
		speedDial: true,
	},
	{
		id: 5,
		url: 'meditiation',
		title: 'Meditation',
		menu: false,
		speedDial: true,
	},
	{
		id: 6,
		url: 'videos',
		title: 'Videos',
		menu: false,
		speedDial: true,
	},
	{
		id: 7,
		url: 'about',
		title: 'About',
		menu: false,
		speedDial: true,
	},
	{
		id: 8,
		url: 'tour',
		title: 'Tour',
		menu: false,
		speedDial: true,
	},
	{
		id: 9,
		url: 'search',
		title: 'Search',
		menu: false,
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
		menu: false,
		speedDial: true,
	},
	{
		id: 14,
		url: 'share',
		title: 'Share',
		menu: false,
		speedDial: true,
	},
	{
		id: 15,
		url: 'newsletter',
		title: 'Newsletter',
		menu: false,
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
					title: '<span class="ummi-blue">Ummi</span>',
					classes: 'ummi-blue',
					content: [
						'(<b><span class="ummi-blue">U</span>nderstanding <span class="ummi-blue">M</span>e, <span class="ummi-blue">M</span>yself, and <span class="ummi-blue">I</span></b>)<br /> is your <b><u>FREE</u></b> companion app.',
					],
				},
				{
					title: 'Who is Ummi for?',
					content: [
						'If you are learning tools at groups<br /> that use ACT, CBT, DBT, REBT, <br /> or SMART therapies<br /><b class="lrg">this app is for you.</b>',
						'These tools are ace.',
						'<b>But remembering them<br /> can be hard.</b> ',
					],
				},
				{
					title: 'Your toolbox',
					icon: HandymanIcon,
					content: [
						'<span className="ummi-blue">Ummi</span> <b><u>is your toolbox.</u></b>',
						'🔎 Look up tools &amp; phrases<br />discussed in groups.',
						'👊🏽 Carry the tools<br /> around with you.',
						'👍🏽 Use them whenever<br />they could be helpful.',
					],
				},
			],
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
			btnLabel: 'Install Ummi',
			cta: {
				title: 'Add the Ummi App?',
				content: ['Install Ummi for quick access'],
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
