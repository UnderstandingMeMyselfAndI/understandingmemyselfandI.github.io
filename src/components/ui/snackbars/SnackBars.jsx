import * as React from "react";
import {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import useAppStore from "@/store/useAppStore";
import HandymanIcon from "@mui/icons-material/Handyman";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

// import strings from "data/strings.js";
import {cnf, strings} from "data/config.js";
import "./styles.scss";

export default function Snackbars() {
	const [snackPack, setSnackPack] = useState([]);
	const [open, setOpen] = useState(false);
	const [messageInfo, setMessageInfo] = useState(undefined);

	const {scrollStage, toolAdded, showToolsOnly} = useAppStore();

	console.log("SNACKBARS mount");

	useEffect(() => {
		if (scrollStage < 3) return;
		if (snackPack.length && !messageInfo) {
			// Set a new snack when we don't have an active one
			setMessageInfo({...snackPack[0]});
			setSnackPack(prev => prev.slice(1));
			setOpen(true);
		} else if (snackPack.length && messageInfo && open) {
			// Close an active snack when a new one is added
			setOpen(true);
		}
	}, [scrollStage, snackPack, messageInfo, open]);
	useEffect(() => {
		console.log("SNACKBARS open ", open);
	}, [open]);
	useEffect(() => {
		if (scrollStage < 3) return;
		console.log("SNACKBARS toolAdded ", toolAdded);
		setOpen(true);
	}, [toolAdded, scrollStage]);
	useEffect(() => {
		if (scrollStage < 3) return;
		console.log("SNACKBARS useEffect toolAdded");

		const message = toolAdded ? strings.toolbox.added : strings.toolbox.removed;
		setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
		setOpen(true);
	}, [toolAdded, scrollStage]);

	useEffect(() => {
		if (scrollStage < 3) return;
		console.log("SNACKBARS useEffect message");
		const message = showToolsOnly ? strings.tools.list.yourToolsFiltered : strings.tools.list.unfiltered;

		setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
		setOpen(true);
	}, [showToolsOnly, scrollStage]);

	// useEffect(() => {
	// 	if (scrollStage < 3) return;
	// 	const message = emergencyToolAdded ? strings.toolbox.emergency.added : strings.toolbox.emergency.removed;
	// 	setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
	// }, [scrollStage, emergencyToolAdded]);

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	const handleExited = () => {
		setMessageInfo(undefined);
	};

	return (
		<div>
			<Snackbar
				className={"snackBar alert"}
				open={open}
				autoHideDuration={cnf?.duration?.hide.snackbar || 2000}
				onClose={handleClose}
				slots={{transition: Slide}}
				anchorOrigin={{vertical: "top", horizontal: "left"}}
			>
				<Alert
					onClose={handleClose}
					severity={toolAdded ? "success" : "info"}
					variant="filled"
					sx={{width: "100%"}}
					iconMapping={{
						success: <HandymanOutlinedIcon fontSize="inherit" />,
						info: <CheckCircleOutlineIcon fontSize="inherit" />,
					}}
				>
					{toolAdded ? strings.toolbox.added : strings.toolbox.removed}
				</Alert>
			</Snackbar>
		</div>
	);
}
