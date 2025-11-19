import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import HotelClassOutlinedIcon from "@mui/icons-material/HotelClassOutlined";

export default function ConfirmSnackbar() {
	const [open, setOpen] = React.useState(false);
	const [state, setState] = React.useState({
		open: false,
		Transition: Slide,
	});

	const handleClick = () => {
		setState({
			open: true,
			Transition,
		});
	};

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setState({
			...state,
			open: false,
		});
	};

	const action = (
		<React.Fragment>
			<Button
				color="secondary"
				size="small"
				onClick={handleClose}
			>
				UNDO
			</Button>
			<IconButton
				size="small"
				aria-label="close"
				color="inherit"
				onClick={handleClose}
			>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div>
			<Button onClick={handleClick}>
				<HotelClassOutlinedIcon />
			</Button>
			<Snackbar
				open={state.open}
				autoHideDuration={6000}
				slots={{transition: state.Transition}}
				key={state.Transition.name}
				onClose={handleClose}
				message="Note archived"
				action={action}
			/>
		</div>
	);
}
