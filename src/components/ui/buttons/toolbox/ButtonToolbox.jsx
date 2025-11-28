import * as React from "react";
import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import data from "@/data/data";
import useAppStore from "@/store/useAppStore";
// import ToggleButton from "@mui/material/ToggleButton";
import HandymanIcon from "@mui/icons-material/Handyman";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import {storeKeys, localStore} from "@/data/localStore.js";
import "./styles.scss";

const ButtonToolbox = () => {
	const {acronymnID, setToolIDs, setToolAdded} = useAppStore();
	const storedValue = localStore.get(storeKeys.toolbox, acronymnID);
	const [inToolbox, setInToolbox] = useState(storedValue ? storedValue === "true" : false);

	const ids = data.map(item => item.id);
	const positiveIDs = localStore.getSelectedIDsByLabel(storeKeys.toolbox, ids);

	console.log("MOUNT  -----------------------------");
	console.log("positiveIDs 1 ", positiveIDs);
	console.log("acronymnID ", acronymnID);

	// const selectedToolIDs = localStore.getSelectedIDsByLabel(storeKeys.toolbox);

	// useEffect(() => {
	// 	console.log("userToolIDs USEEFFECT -----------------------------");
	// 	console.log("userToolIDs 2 ", positiveIDs);
	// }, [positiveIDs]);

	const handleClick = () => {
		const isIn = !inToolbox;

		if (isIn) {
			if (positiveIDs.find(id => id === acronymnID)) return;

			console.log("ADD -----------------------------");
			console.log("positiveIDs before ", positiveIDs);
			localStore.set(storeKeys.toolbox, acronymnID, isIn);
			const newIDs = [...positiveIDs, acronymnID];
			setToolIDs(newIDs);
			setToolAdded(true);
			console.log("positiveIDs after ", newIDs);
			console.log("-----------------------------------");
		} else {
			//removeTool(id);
			console.log("REMOVE accronymId  ", acronymnID);
			console.log("positiveIDs before: ", positiveIDs);
			const newIDs = positiveIDs.filter(t => t.id !== acronymnID);
			localStore.set(storeKeys.toolbox, acronymnID, isIn);
			console.log("newIDs after: ", newIDs);
			setToolIDs(newIDs);
			setToolAdded(false);
			console.log("-----------------------------------");
		}

		setInToolbox(isIn);
	};

	return (
		<div
			className={"btn toolbox" + (inToolbox ? " active" : "")}
			key="toolbox-btn"
			onClick={handleClick}
			aria-label="Toggle toolbox"
		>
			{inToolbox ? <HandymanIcon /> : <HandymanOutlinedIcon />}
		</div>
	);
};
ButtonToolbox.propTypes = {};
ButtonToolbox.displayName = "ButtonToolbox";

export default ButtonToolbox;
