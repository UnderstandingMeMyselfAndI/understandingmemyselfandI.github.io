import * as React from "react";
import {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useAppStore from "@/store/useAppStore";
import Slide from "@mui/material/Slide";
import "./styles.scss";

const msgs = {
	tool: {
		added: "Tool added",
		removed: "Tool removed",
	},
	emergency: {
		added: "Emergency tool added",
		removed: "Emergency tool removed",
	},
};

export default function Snackbars() {
	const [snackPack, setSnackPack] = useState([]);
	const [open, setOpen] = useState(false);
	const [messageInfo, setMessageInfo] = useState(undefined);

	const toolAdded = useAppStore(state => state.toolAdded);
	const emergencyToolAdded = useAppStore(state => state.emergencyToolAdded);

	const scrollStage = useAppStore(state => state.scrollStage);

	useEffect(() => {
		if (scrollStage < 2) return;
		console.log("snackPack  ");
		if (snackPack.length && !messageInfo) {
			console.log("snackPack  ", snackPack, " message ", messageInfo?.message, " open", open);
			// Set a new snack when we don't have an active one
			setMessageInfo({...snackPack[0]});
			setSnackPack(prev => prev.slice(1));
			setOpen(true);
		} else if (snackPack.length && messageInfo && open) {
			// Close an active snack when a new one is added
			setOpen(false);
		}
	}, [snackPack, messageInfo, open]);

	useEffect(() => {
		console.log("snackPack toolAdded ", toolAdded);
		// if (scrollStage < 1) return;
		const message = toolAdded ? msgs.tool.added : msgs.tool.removed;

		setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
	}, [toolAdded]);

	useEffect(() => {
		console.log("emergencyToolAdded ", emergencyToolAdded);
	}, [emergencyToolAdded]);

	useEffect(() => {
		// if (scrollStage < 1) return;
		console.log("snackPack emergencyToolAdded emergencyToolAdded ", emergencyToolAdded);
		const message = emergencyToolAdded ? msgs.emergency.added : msgs.emergency.removed;

		setSnackPack(prev => [...prev, {message, key: new Date().getTime()}]);
	}, [emergencyToolAdded]);

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
				anchorOrigin={{vertical: "top", horizontal: "left"}}
				open={open}
				autoHideDuration={2000}
				onClose={handleClose}
				slots={{transition: Slide}}
				slotProps={{transition: {onExited: handleExited}}}
				message={messageInfo ? messageInfo.message : undefined}
			/>
		</div>
	);
}
