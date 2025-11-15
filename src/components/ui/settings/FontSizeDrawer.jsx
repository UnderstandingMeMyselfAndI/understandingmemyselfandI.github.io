"use client";
import {Button} from "buttons/Button.jsx";
import {Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerTrigger, DrawerTitle} from "ui/drawers/Drawer";
import "./styles.css";
import ButtonFontSize from "buttons/ButtonFontSize";

import ButtonFontSettings from "buttons/settings/ButtonFontSettings"; // import FontSettings from '../buttons/settings/ButtonSettings.jsx';
export function FontSizeDrawer() {
	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div className="fontSize settings">
					<ButtonFontSettings />
				</div>
			</DrawerTrigger>
			<div className="settingsDrawerMain">
				<DrawerContent className="DrawerContent">
					<DrawerTitle className="hide">TItle</DrawerTitle>
					<div className="settingsDrawerCont">
						<div className="settingsDrawer">
							<ButtonFontSize
								size="decrease"
								label="Smaller"
							/>
							<ButtonFontSize
								size="increase"
								label="Bigger"
							/>
						</div>

						<DrawerFooter className="drawerFooter">
							<DrawerClose asChild>
								<Button variant="outline">Close</Button>
							</DrawerClose>
						</DrawerFooter>
					</div>
				</DrawerContent>
			</div>
		</Drawer>
	);
}
export default FontSizeDrawer;
