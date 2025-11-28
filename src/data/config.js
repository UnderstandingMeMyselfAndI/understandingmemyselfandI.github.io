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
const cnf = {
	appName: "Ummi",
	appLogName: "Understanding Me, Myself, and I",
	appDescription: "",

	duration: {
		hide: {
			snackbar: 200000,
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
		title: "ummi",
		icon: UmmiIcon,
	},
	{
		id: 1,
		title: "welcome",
		icon: HandymanIcon,
	},
	{
		id: 2,
		title: "tools",
		icon: HandymanIcon,
	},
	{
		id: 3,
		title: "techniques",
		icon: AutoAwesomeOutlinedIcon,
	},
	{
		id: 4,
		title: "motivation",
		icon: AutoGraphOutlinedIcon,
	},
	{
		id: 5,
		title: "inspiration",
		icon: LightbulbOutlinedIcon,
	},
	{
		id: 6,
		title: "meditation",
		icon: SpaOutlinedIcon,
	},
	{
		id: 7,
		title: "videos",
		icon: PlayCircleOutlineOutlinedIcon,
	},
	{
		id: 8,
		title: "about",
		icon: InfoOutlinedIcon,
	},
	{
		id: 9,
		title: "tour",
		icon: TourOutlinedIcon,
	},
	{
		id: 10,
		title: "search",
		icon: SavedSearchIcon,
	},
	{
		id: 11,
		title: "account",
		icon: BlurOnOutlinedIcon,
	},
	{
		id: 12,
		title: "back",
		icon: ArrowBackOutlinedIcon,
	},
];

const baseActivities = [
	{
		id: 0,
		url: "introduction",
		title: "Introduction",

		menu: true,
		speedDial: true,
	},
	{
		id: 1,
		url: "tools",
		title: "Tools",

		menu: true,
		speedDial: true,
	},
	{
		id: 2,
		url: "skills",
		title: "Techniques",
		menu: true,
		speedDial: true,
	},
	{
		id: 3,
		url: "motivation",
		title: "Motivation",
		menu: true,
		speedDial: true,
	},
	{
		id: 4,
		url: "inspiration",
		title: "Inspiration",
		menu: true,
		speedDial: true,
	},
	{
		id: 5,
		url: "meditiation",
		title: "Meditation",
		menu: true,
		speedDial: true,
	},
	{
		id: 6,
		url: "videos",
		title: "Videos",
		menu: true,
		speedDial: true,
	},
	{
		id: 7,
		url: "about",
		title: "About",
		menu: true,
		speedDial: true,
	},
	{
		id: 8,
		url: "tour",
		title: "Tour",
		menu: true,
		speedDial: true,
	},
	{
		id: 9,
		url: "search",
		title: "Search",
		menu: true,
		speedDial: true,
	},
];
const activities = baseActivities.map(item => ({
	...item,
	icon: icons[item.id].icon, // add the sequential icon
}));

const strings = {
	activity: [
		{
			id: 0,
			name: "introduction",
			title: "Introduction",
			content: ["Introduction", "Paragraph 2"],
		},
		{
			id: 1,
			name: "videos",
			title: "Videos",
			content: ["Videos Description", "Paragraph 2"],
		},
		{
			id: 2,
			name: "about",
			title: "About",
			content: ["About Description", "Paragraph 2"],
		},
	],
	toolbox: {
		added: "Added to your toolbox",
		removed: "Removed from your toolbox",
		emergency: {
			added: "Added to your emergency toolbox",
			removed: "Removed from your emergency toolbox",
		},
	},
	tools: {
		list: {
			unfiltered: "Showing ALL tools",
			yourToolsFiltered: "Showing YOUR tools", //"Showing only the tools you selected"
		},
	},
};

export {cnf, activities, strings}; //strings activities;
