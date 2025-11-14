import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsMenuIcon from "@/src/components/icons/SettingsMenuIcon";
import "./styles.css";

const SettingsMenu = React.forwardRef((props, ref) => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	// Expose methods to parent via ref
	React.useImperativeHandle(ref, () => ({
		openMenu: targetElement => {
			setAnchorEl(targetElement || document.getElementById("settings-button"));
		},
		closeMenu: () => {
			setAnchorEl(null);
		},
	}));

	const handleClick = e => {
		setAnchorEl(e.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
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
				MenuListProps={{
					"aria-labelledby": "settings-button",
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

export default SettingsMenu;
