import * as React from "react";
import {useState, useEffect} from "react";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import useAppStore from "@/store/useAppStore";
import ToggleButton from "@mui/material/ToggleButton";

import HandymanIcon from "@mui/icons-material/Handyman";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";

import {storeKeys, localStore} from "@/data/localStore.js";

import "./styles.scss";

const ButtonToolbox = ({id}) => {
	const [isInToolbox, setIsInToolbox] = useState(false);

	const storedVal = localStore.get(storeKeys.toolbox, id);
	const acronymnID = useAppStore(state => state.acronymnID);
	const setToolAdded = useAppStore(state => state.setToolAdded);

	console.log("*************** ButtonToolbox ");

	// setIsInToolbox(storedVal === "true");

	const setTool = val => {
		// if (!active) return;
		localStore.set(storeKeys.toolbox, acronymnID, val);

		console.log("storedVal storeKeys.toolbox ", storeKeys.toolbox, " acronymnID ", acronymnID, " val ", val);
		setToolAdded(val);
		setIsInToolbox(val);
	};

	useEffect(() => {
		if (storedVal !== null) {
			if (storedVal === "true") {
				setIsInToolbox(true);
			}
			if (storedVal === "false") {
				setIsInToolbox(false);
			}
		}
	}, [storedVal]);
	useEffect(() => {
		console.log("useeffect");
	}, []);

	return (
		<div
			className={"btn toolbox" + (isInToolbox ? " active" : "")}
			key="toolbox-btn"
			onClick={() => setTool(!isInToolbox)}
		>
			{isInToolbox ? <HandymanIcon /> : <HandymanOutlinedIcon />}
		</div>
	);
};
ButtonToolbox.displayName = "ButtonToolbox";

export default ButtonToolbox;
