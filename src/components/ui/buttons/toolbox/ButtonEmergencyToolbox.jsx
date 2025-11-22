import React, {useState, useEffect} from "react";
import useAppStore from "@/store/useAppStore";
import {storeKeys, localStore} from "@/data/localStore.js";
import MedicationIcon from "@mui/icons-material/Medication";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";
import "./styles.scss";

const ButtonEmergencyToolbox = ({id}) => {
	const [isInEmergemcyToolbox, setIsInEmergencyToolbox] = useState(false);
	const acronymnID = useAppStore(state => state.acronymnID);
	const storedValETB = localStore.get(storeKeys.emergency, id);

	const emergencyToolAdded = useAppStore(state => state.emergencyToolAdded);
	const toggleEmergencyTool = useAppStore(state => state.toggleEmergencyTool);

	useEffect(() => {
		console.log("ButtonEmergencyToolbox storedValETB", storedValETB);
		if (storedValETB !== null) {
			if (storedValETB === "true") {
				setIsInEmergencyToolbox(true);
			}
			if (storedValETB === "false") {
				setIsInEmergencyToolbox(false);
			}
		}
	}, [storedValETB]);

	useEffect(() => {
		localStore.set(storeKeys.emergency, acronymnID, emergencyToolAdded);
		setIsInEmergencyToolbox(emergencyToolAdded);
	}, [emergencyToolAdded]);

	return (
		<div
			className={`btn toolbox emrgcy ${isInEmergemcyToolbox ? "active" : ""}`}
			key="toolbox-emergency-btn"
			onClick={toggleEmergencyTool}
		>
			{isInEmergemcyToolbox ? <MedicationIcon /> : <MedicationOutlinedIcon />}
		</div>
	);
};

ButtonEmergencyToolbox.displayName = "ButtonEmergencyToolbox";

export default ButtonEmergencyToolbox;
