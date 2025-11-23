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
	const acronymnID = useAppStore(state => state.acronymnID);
	const storedValTB = localStore.get(storeKeys.toolbox, id);
	const toggleTool = useAppStore(state => state.toggleTool);
	const toolAdded = useAppStore(state => state.toolAdded);

	useEffect(() => {
		console.log("ButtonToolbox storedValTB", storedValTB);
		if (storedValTB !== null) {
			if (storedValTB === "true") {
				setIsInToolbox(true);
			}
			if (storedValTB === "false") {
				setIsInToolbox(false);
			}
		}
	}, [storedValTB]);

	useEffect(() => {
		localStore.set(storeKeys.toolbox, acronymnID, toolAdded);
		setIsInToolbox(toolAdded);
	}, [toolAdded]);

	return (
		<div
			className={"btn toolbox" + (isInToolbox ? " active" : "")}
			key="toolbox-btn"
			onClick={toggleTool}
			aria-label="Toggle toolbox"
		>
			{isInToolbox ? <HandymanIcon /> : <HandymanOutlinedIcon />}
		</div>
	);
};

ButtonToolbox.displayName = "ButtonToolbox";

export default ButtonToolbox;
