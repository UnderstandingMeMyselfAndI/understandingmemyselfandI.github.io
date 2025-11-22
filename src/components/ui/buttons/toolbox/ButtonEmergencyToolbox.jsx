import * as React from "react";
import {useState, useEffect} from "react";
import useAppStore from "@/store/useAppStore";

import {storeKeys, localStore} from "@/data/localStore.js";

import MedicationIcon from "@mui/icons-material/Medication";
import MedicationOutlinedIcon from "@mui/icons-material/MedicationOutlined";

import "./styles.scss";

const ButtonEmergencyToolbox = ({id}) => {
	const [isInToolbox, setIsInToolbox] = useState(false);
	const [isToggle, setIsToggle] = useState(false);

	const acronymnID = useAppStore(state => state.acronymnID);
	const emergencyToolAdded = useAppStore(state => state.emergencyToolAdded);
	const setEmergencyToolAdded = useAppStore(state => state.setEmergencyToolAdded);
	const active = useAppStore(state => state.active);
	const storedVal = localStore.get(storeKeys.toolbox, id);

	const setTool = val => {
		console.log("emergencyToolAdded setTool active ", active, " val ", val, " acronymnID ", acronymnID);
		// if (!active) return;
		localStore.set(storeKeys.emergency, id, val);
		setIsInToolbox(val);
		setEmergencyToolAdded(val);
		console.log("emergencyToolAdded setTool acronymID", acronymnID, " toolAdded ", emergencyToolAdded);
	};

	useEffect(() => {
		if (storedVal !== null) setIsInToolbox(Boolean(storedVal));
	}, [storedVal]);

	useEffect(() => {
		setTool(isInToolbox);
	}, [isInToolbox]);

	return (
		<div
			className={"btn toolbox emrgcy" + (isInToolbox ? " active" : "")}
			key="toolbox-emergency-btn"
			onClick={() => setIsInToolbox(!isInToolbox)}
		>
			{isInToolbox ? <MedicationIcon /> : <MedicationOutlinedIcon />}
		</div>
	);
};
ButtonEmergencyToolbox.displayName = "ButtonEmergencyToolbox";

export default ButtonEmergencyToolbox;
