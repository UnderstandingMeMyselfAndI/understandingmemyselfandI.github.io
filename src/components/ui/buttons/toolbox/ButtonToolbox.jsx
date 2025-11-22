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
	const toolAdded = useAppStore(state => state.toolAdded);
	const setToolAdded = useAppStore(state => state.setToolAdded);
	const active = useAppStore(state => state.active);

	const setTool = val => {
		console.log("ButtonToolbox setTool active ", active, " val ", val, " acronymnID ", acronymnID, "active ", active);
		// if (!active) return;
		localStore.set(storeKeys.toolbox, id, val);
		setToolAdded(val);
		setIsInToolbox(val);
	};

	useEffect(() => {
		if (storedVal !== null) setTool(Boolean(storedVal));
	}, [storedVal]);

	useEffect(() => {
		console.log(" ButtonToolbox useEffect toolAdded ", toolAdded);
	}, [toolAdded]);

	useEffect(() => {
		console.log("ButtonToolbox useEffect active ", active);
	}, [active]);

	useEffect(() => {
		setTool(isInToolbox);
	}, [isInToolbox]);

	return (
		<div
			className={"btn toolbox" + (isInToolbox ? " active" : "")}
			key="toolbox-btn"
			onClick={() => setIsInToolbox(!isInToolbox)}
		>
			{isInToolbox ? <HandymanIcon /> : <HandymanOutlinedIcon />}
		</div>
	);
};
ButtonToolbox.displayName = "ButtonToolbox";

export default ButtonToolbox;
