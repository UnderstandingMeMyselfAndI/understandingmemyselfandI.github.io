"use client";
// import {Button} from "@/buttons/Button";
// import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger, DrawerTitle } from "@/components/ui/drawer";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import "./styles.css";
import ButtonFontSize from "@buttons/ButtonFontSize.jsx";

import ButtonFontSettings from "@buttons/settings/ButtonFontSettings.jsx"; // import FontSettings from '../buttons/settings/ButtonSettings.jsx';
export function FontSizeDrawer() {
	const [open, setOpen] = React.useState(false);

	const toggleDrawer = newOpen => () => {
		setOpen(newOpen);
	};
	const DrawerList = (
		<Box
			sx={{width: 250}}
			role="presentation"
			onClick={toggleDrawer(false)}
		>
			<div id="decreaseFontSize">
				//{" "}
				<ButtonFontSize
					size="decrease"
					label="Smaller"
				/>
			</div>
			<div id="increaseFontSize">
				<ButtonFontSize
					size="increase"
					label="Bigger"
				/>
			</div>
		</Box>
	);
	// TODO
	return (
		<div>
			<div className="fontSize settings">
				<ButtonFontSettings onClick={toggleDrawer(true)} />
			</div>
			<Drawer
				open={open}
				onClose={toggleDrawer(false)}
			>
				{DrawerList}
			</Drawer>
		</div>
		// <Drawer transitionDuration={500}>
		// 	<DrawerTrigger
		// 		asChild
		// 		id="fontSizeDrawer"
		// 	>
		// 		<div className="fontSize settings">
		// 			<ButtonFontSettings />
		// 		</div>
		// 	</DrawerTrigger>
		// 	<div className="settingsDrawerMain">
		// 		<DrawerContent className="DrawerContent">
		// 			<DrawerTitle className="hide">Change font sizes</DrawerTitle>
		// 			<div className="settingsDrawerCont">
		// 				<div className="settingsDrawer">
		// 					<div id="decreaseFontSize">
		// 						<ButtonFontSize
		// 							size="decrease"
		// 							label="Smaller"
		// 						/>
		// 					</div>
		// 					<div id="increaseFontSize">
		// 						<ButtonFontSize
		// 							size="increase"
		// 							label="Bigger"
		// 						/>
		// 					</div>
		// 				</div>

		// 				<DrawerFooter className="drawerFooter">
		// 					<DrawerClose asChild>
		// 						<Button variant="outline">Close</Button>
		// 					</DrawerClose>
		// 				</DrawerFooter>
		// 			</div>
		// 		</DrawerContent>
		// 	</div>
		// </Drawer>
	);
}
export default FontSizeDrawer;
