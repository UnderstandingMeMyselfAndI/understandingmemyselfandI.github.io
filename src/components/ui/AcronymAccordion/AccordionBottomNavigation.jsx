import * as React from "react";
import Box from "@mui/material/Box";
import useAppStore from "@/store/useAppStore";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import CloseIcon from "@mui/icons-material/Restore";
import CloseIcon from "@mui/icons-material/Close";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import AutoFixHighOutlinedIcon from "@mui/icons-material/AutoFixHighOutlined";
import Slide from "@mui/material/Slide";
import "./AccordionBottomNavigation.css";
export default function AccordionBottomNavigation({open, onClick}) {
	// const [open, setOpen] = React.useState(false);
	const ref = React.useRef(null);
	const acronymnID = useAppStore(state => state.acronymnID);
	const [isFavourite, setIsFavourite] = React.useState(false);
	const [lastID, setLastID] = React.useState(null);
	const [isEmergency, setIsEmergency] = React.useState(false);

	const handleChange = show => (event, newShow) => {
		onClick(open => !open);
		console.log("handleChange", show, newShow, event);
	};
	const handleToggleFavouriteTool = () => {
		const newFavourite = !isFavourite;
		localStorage.setItem(`favourite-${acronymnID}`, newFavourite.toString());

		setIsFavourite(newFavourite);
		console.log("handleToggleFavouriteTool", newFavourite);
	};
	const handleToggleEmergencyTool = () => {
		setIsEmergency(isEmergency => !isEmergency);

		console.log("handleToggleEmergencyTool", isEmergency);
	};

	React.useEffect(() => {
		const storedFavourite = localStorage.getItem(`favourite-${acronymnID}`);

		if (storedFavourite !== null) {
			setIsFavourite(storedFavourite === "true");
			return;
		}
		setIsFavourite(false);
		console.log("AccordionBottomNavigation acronymnID", acronymnID);
	}, [acronymnID]);

	React.useEffect(() => {
		console.log("isFavourite", isFavourite);
	}, [isFavourite]);

	// const acronymnID = useAppStore(state => state.curAcronymnID);

	// const handleAddToolClick = e => {
	// 	e.stopPropagation();
	// 	const newFavourite = !favourite;

	// 	localStorage.setItem(`favourite-${id}`, newFavourite.toString());
	// 	setFavourite(newFavourite);
	// };

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
						className={"fav" + (isFavourite ? " active" : " inactive")}
						icon={isFavourite ? <AutoFixHighIcon /> : <AutoFixHighOutlinedIcon />}
						onClick={e => handleToggleFavouriteTool()}
					/>

					<BottomNavigationAction
						className={"emergency" + (isEmergency ? " active" : " inactive")}
						icon={isFavourite ? <MedicationIcon /> : <MedicationOutlinedIcon />}
						onClick={e => handleToggleEmergencyTool()}
					/>

					<BottomNavigationAction
						icon={
							<CloseIcon
								onClick={e => {
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
