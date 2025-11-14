import {Button} from "@/components/ui/button";
import iconArrowBackward from "@/src/components/icons/iconArrowBackward";
import "./buttonStyles.css";
import PropTypes from "prop-types";

const ButtonBack = ({label, callback}) => {
	return (
		<Button variant="outline" aria-label={"Back button "} onClick={callback} className="btn back">
			<div>{iconArrowBackward}</div>
			<div>{label}</div>
		</Button>
	);
};
ButtonBack.propTypes = {
	label: PropTypes.string.isRequired,
	callback: PropTypes.func,
};
ButtonBack.displayName = "ButtonBack";

export default ButtonBack;
