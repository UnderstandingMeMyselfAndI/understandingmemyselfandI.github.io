import * as React from "react";
import {useState, useMemo} from "react";
import PropTypes from "prop-types";
import data from "@/data/data";
import useAppStore from "@/store/useAppStore";
// import ToggleButton from "@mui/material/ToggleButton";
import HandymanIcon from "@mui/icons-material/Handyman";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import {storeKeys, localStore} from "@/data/localStore.js";
import {strings} from "data/config.js";
import "./styles.scss";

const ButtonToolbox = ({id}) => {
	const setToolIDs = useAppStore(s => s.setToolIDs);
	const setMessage = useAppStore(s => s.setMessage);

	const ids = data.map(item => item.id);
	const positiveIDs = useMemo(() => localStore.getSelectedIDsByLabel(storeKeys.toolbox, ids), [ids]);
	const positiveIDsSet = useMemo(() => new Set(positiveIDs), [positiveIDs]);
	const isSelected = positiveIDsSet.has(id);
	const [inToolbox, setInToolbox] = useState(isSelected);

	const handleClick = () => {
		const isIn = !inToolbox;

		if (isIn) {
			localStore.set(storeKeys.toolbox, id, isIn);
			const newIDs = [...positiveIDs, id];
			setToolIDs(newIDs);
			setInToolbox(true);
			setMessage(strings.toolbox.added);
		} else {
			const newIDs = positiveIDs.filter(t => t.id !== id);
			localStore.set(storeKeys.toolbox, id, isIn);
			setMessage(strings.toolbox.removed);
			setToolIDs(newIDs);
			setInToolbox(true);
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
			{inToolbox ? <HandymanIcon key="toolbox-btn-icon" /> : <HandymanOutlinedIcon key="toolbox-btn-icon" />}
		</div>
	);
};
ButtonToolbox.propTypes = {
	id: PropTypes.number,
};
ButtonToolbox.displayName = "ButtonToolbox";

export default ButtonToolbox;
