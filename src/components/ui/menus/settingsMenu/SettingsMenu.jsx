import React, {useState, useImperativeHandle, forwardRef} from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsMenuIcon from "@/src/components/icons/SettingsMenuIcon";
import "./styles.css";

const SettingsMenu = forwardRef((props, ref) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	// useImperativeHandle(ref, () => ({
	// 	openMenu: () => {
	// 		console.log("Opening menu programmatically");
	// 		const button = document.getElementById("settings-button");
	// 		if (button) {
	// 			setAnchorEl(button);
	// 		}
	// 	},
	// 	closeMenu: () => {
	// 		console.log("Closing menu");
	// 		setAnchorEl(null);
	// 	},
	// }));

	const handleClick = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className="settings-menu-container ob">
			<Button
				id="settings-button"
				className="btn settings"
				aria-controls={open ? "settings-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
			>
				<SettingsMenuIcon />
			</Button>
			<Menu
				id="settings-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					list: {
						"aria-labelledby": "settings-button",
					},
				}}
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "right",
				}}
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
			>
				<MenuItem onClick={handleClose}>Profile</MenuItem>
				<MenuItem onClick={handleClose}>My account</MenuItem>
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
		</div>
	);
});

SettingsMenu.displayName = "SettingsMenu";

export default SettingsMenu;
