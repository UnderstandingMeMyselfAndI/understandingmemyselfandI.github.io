import * as React from "react";
import {useEffect, useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import useAppStore from "@/store/useAppStore";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import strings from "data/strings.js";
import {cnf, strings} from "data/config.js";
import "./styles.scss";

export default function Snackbars() {
	const [snackPack, setSnackPack] = useState([]);
	const [open, setOpen] = useState(false);
	const [messageInfo, setMessageInfo] = useState(undefined);

	const {scrollStage, toolAdded} = useAppStore();

	useEffect(() => {
		if (scrollStage < 3) return;
		if (snackPack.length && !messageInfo) {
			// Set a new snack when we don't have an active one
			setMessageInfo({...snackPack[0]});
			setSnackPack(prev => prev.slice(1));
			setOpen(true);
		} else if (snackPack.length && messageInfo && open) {
			// Close an active snack when a new one is added
			setOpen(false);
		}
	}, [scrollStage, snackPack, messageInfo, open]);

	// useEffect(() => {
	// 	console.log("SNACKBARS useEffect toolAdded");
	// 	if (scrollStage < 3) return;
	// 	const message = toolAdded ? strings.toolbox.added : strings.toolbox.removed;
	// 	scrollStage > 1 && setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
	// 	// setMessage(message);
	// }, [toolAdded, scrollStage]);

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
				className={"snackbars"}
				key={messageInfo ? messageInfo.key : undefined}
				anchorOrigin={{vertical: "top", horizontal: "center"}}
				open={open}
				autoHideDuration={cnf?.duration?.hide.snackbar || 2000}
				onClose={handleClose}
				slots={{transition: Slide}}
				slotProps={{transition: {onExited: handleExited}}}
				message={messageInfo ? messageInfo.message : undefined}
				action={
					<React.Fragment>
						<IconButton
							aria-label="close"
							color="inherit"
							sx={{p: 0.5}}
							onClick={handleClose}
						>
							<CloseIcon />
						</IconButton>
					</React.Fragment>
				}
			/>
		</div>
	);
}
