import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import CloseIcon from "@mui/icons-material/Restore";
import CloseIcon from "@mui/icons-material/Close";
import ButtonFavourite from "buttons/favourite/ButtonFavourite";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import Slide from "@mui/material/Slide";
import "./AccordionBottomNavigation.css";
export default function AccordionBottomNavigation({open, onClick, isFavourite}) {
	const [value, setValue] = React.useState(0);
	const [show, setShow] = React.useState(0);

	// const [open, setOpen] = React.useState(false);
	const ref = React.useRef(null);

	const handleChange = show => (event, newShow) => {
		setShow(show => !show);
		onClick(open => !open);
		console.log("handleChange e = ", newShow, show);
	};

	return (
		<Box
			sx={{position: "fixed", bottom: 0, left: 0, pb: 7, width: "100vw", margin: "0"}}
			ref={ref}
			className={"bottom-navigation"}
			id={"bottom-navigation"}
		>
			<Slide
				direction="up"
				in={!open}
				mountOnEnter
				unmountOnExit
			>
				<BottomNavigation
					showLabels
					// value={value}
					onChange={handleChange}
				>
					<BottomNavigationAction
						className={isFavourite ? "active" : "inactive"}
						icon={isFavourite ? <StarOutlinedIcon /> : <StarOutlineOutlinedIcon />}
						onClick={e => {
							// setAddFavourite(true);
						}}
					/>

					<BottomNavigationAction
						icon={
							<CloseIcon
								onClick={e => {
									//console.log("CloseIcon e = ", e);
									onClick(open);
								}}
							/>
						}
					/>
				</BottomNavigation>
			</Slide>
		</Box>
	);
}
