import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import TextIncreaseOutlinedIcon from "@mui/icons-material/TextIncreaseOutlined";
import TextDecreaseOutlinedIcon from "@mui/icons-material/TextDecreaseOutlined";
import HotelClassOutlinedIcon from "@mui/icons-material/HotelClassOutlined";
import FormatColorFillOutlinedIcon from "@mui/icons-material/FormatColorFillOutlined";
import UpdateOutlinedIcon from "@mui/icons-material/UpdateOutlined";
import ShareIcon from "@mui/icons-material/Share";
import Backdrop from "@mui/material/Backdrop";
import IconLogo from "@/components/icons/IconLogo";
import {styled} from "@mui/material/styles";
import "./styles.css";

const actions = [
	{icon: <FormatColorFillOutlinedIcon />, name: "Theme"},
	{icon: <HotelClassOutlinedIcon />, name: "Favourites"},
	{icon: <TextDecreaseOutlinedIcon />, name: "Font-"},
	{icon: <TextIncreaseOutlinedIcon />, name: "Font+"},
	{icon: <TipsAndUpdatesOutlinedIcon />, name: "Add"},
	{icon: <UpdateOutlinedIcon />, name: "Updates"},
	{icon: <ShareIcon />, name: "Share"},
];

export default function SpeedDialSettings() {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		// <Modal
		// 	open={open}
		// 	onClose={handleClose}
		// 	aria-labelledby="modal-modal-title"
		// 	aria-describedby="modal-modal-description"
		// >
		//<Box sx={{position: "relative", right: "1rem", height: 330, zIndex: 1, transform: "translateZ(0px)", flexGrow: 0}}>
		//<Backdrop open={open} />
		<SpeedDial
			className="speed-dial-settings"
			ariaLabel="Settings Speed Dial"
			sx={
				{
					/*position: "absolute", top: 10, right: 100*/
				}
			}
			icon={<SettingsOutlinedIcon sx={{width: 36, height: 36}} />}
			direction={"down"}
			onClose={handleClose}
			onOpen={handleOpen}
			open={open}
		>
			{actions.map(action => (
				<SpeedDialAction
					key={action.name}
					icon={action.icon}
					sx={{position: "relative", zIndex: 1000}}
					onClick={handleClose}
					slotProps={{
						// staticTooltip: true,
						// staticTooltipLabel: true,
						tooltip: {
							open: true,
							title: action.name,
							placement: "left",
						},
					}}
				/>
			))}
		</SpeedDial>
		//</Box>
		// </Modal>
	);
}
