// import * as React from "react";
import {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import useAppStore from "@/store/useAppStore";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

// import strings from "data/strings.js";
import {cnf, strings} from "data/config.js";
import "./styles.scss";

const Snackbars = () => {
	// const [snackPack, setSnackPack] = useState([]);
	const [open, setOpen] = useState(false);
	const [message2, setMessage2] = useState("");
	const [severity, setSeverity] = useState("info");

	// const scrollStage = useAppStore(s => s.scrollStage);
	const toolAdded = useAppStore(s => s.toolAdded);
	const message = useAppStore(s => s.message);

	console.log("SNACKBARS mount");

	// useEffect(() => {
	// 	if (scrollStage < 3) return;
	// 	if (snackPack.length && !messageInfo) {
	// 		// Set a new snack when we don't have an active one
	// 		setMessageInfo({...snackPack[0]});
	// 		setSnackPack(prev => prev.slice(1));
	// 		setOpen(true);
	// 	} else if (snackPack.length && messageInfo && open) {
	// 		// Close an active snack when a new one is added
	// 		setOpen(true);
	// 	}
	// }, [scrollStage, snackPack, messageInfo, open]);

	// useEffect(() => {
	// 	if (scrollStage < 3) return;
	// 	setOpen(true);
	// }, [toolAdded, scrollStage]);
	// useEffect(() => {
	// 	if (scrollStage < 3) return;

	// 	const message = toolAdded ? strings.toolbox.added : strings.toolbox.removed;
	// 	setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
	// 	setOpen(true);
	// }, [toolAdded, scrollStage]);

	// useEffect(() => {
	// 	if (scrollStage < 3) return;
	// 	setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
	// 	setOpen(true);
	// }, [showToolsOnly, scrollStage, message]);

	// useEffect(() => {
	// 	if (scrollStage < 3) return;
	// 	const message = emergencyToolAdded ? strings.toolbox.emergency.added : strings.toolbox.emergency.removed;
	// 	setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
	// }, [scrollStage, emergencyToolAdded]);

	// const handleClose = (event, reason) => {
	// 	if (reason === "clickaway") {
	// 		return;
	// 	}
	// 	setOpen(false);
	// };

	// const handleExited = () => {
	// 	setMessageInfo(undefined);
	// };

	// Only show snackbars after scrollStage >= 3
	const canShow = true; //scrollStage >= 3;

	// tool added/removed handling
	// useEffect(() => {
	// 	if (!canShow || toolAdded === undefined) return;

	// 	setMessage2(toolAdded ? strings.toolbox.added : strings.toolbox.removed);
	// 	setSeverity(toolAdded ? "success" : "info");
	// 	setOpen(true);
	// 	console.log("SNACKBAR toolAdded");
	// }, [toolAdded, canShow]);

	// generic message handling (showToolsOnly or any other string message)
	useEffect(() => {
		if (!canShow || !message) return;

		setMessage2(message);
		setSeverity("info");
		setOpen(true);

		console.log("SNACKBAR message");
	}, [message, canShow]);

	const handleClose = (e, reason) => {
		if (reason === "clickaway") return;
		setOpen(false);
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
					severity={severity}
					variant="filled"
					sx={{width: "100%"}}
					iconMapping={{
						success: <HandymanOutlinedIcon fontSize="inherit" />,
						info: <CheckCircleOutlineIcon fontSize="inherit" />,
					}}
				>
					{message2}
				</Alert>
			</Snackbar>
		</div>
	);
};

export default Snackbars;
