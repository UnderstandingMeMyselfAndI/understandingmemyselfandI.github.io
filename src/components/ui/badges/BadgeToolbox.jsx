import * as React from "react";
import {useEffect} from "react";
import Badge from "@mui/material/Badge";
import {createTheme, alpha, getContrastRatio, ThemeProvider} from "@mui/material/styles";
import useAppStore from "@/store/useAppStore";
import HandymanIcon from "@mui/icons-material/Handyman";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {storeKeys, localStore} from "data/localStore.js";
import data from "data/data.js";
import Slide from "@mui/material/Slide";
// import CheckIcon from "@mui/icons-material/Check";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import {cnf, strings} from "data/config.js";

import "./BadgeToolbox.scss";

export default function BadgeToolbox() {
	const allAccronyms = data;
	const ids = allAccronyms.map(item => item.id);
	const positiveIDs = localStore.getSelectedIDsByLabel(storeKeys.toolbox, ids);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [numTools, setNumTools] = React.useState(positiveIDs.length);

	const {showToolsOnly, toggleShowToolsOnly, userToolIDs, setMessage} = useAppStore();

	useEffect(() => {
		setNumTools(userToolIDs.length);
	}, [userToolIDs]);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			window.scrollY > 600 ? setOpen(true) : setOpen(false);
		});
	}, [setOpen]);

	const handleClose = () => {
		setOpenAlert(false);
	};

	const handleOpen = () => {
		setOpenAlert(true);
		toggleShowToolsOnly();
	};

	return (
		<div>
			<div className={"badge-cont " + (open ? "" : " hide")}>
				<Badge
					className={"badge toolbox" + (showToolsOnly ? " active" : "")}
					badgeContent={positiveIDs.length}
					onClick={handleOpen}
					anchorOrigin={{
						vertical: "top",
						horizontal: "right",
					}}
				>
					<HandymanIcon className="icon" />
				</Badge>
			</div>
		</div>
	);
}
