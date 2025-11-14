import {Button} from "@/components/ui/button";
import iconArrowForward from "@/src/components/icons/iconArrowForward";
import "./buttonStyles.css";
import PropTypes from "prop-types";

const ButtonForward = ({label, callback}) => {
	return (
		<Button variant="outline" aria-label={"Back button "} onClick={callback} className="btn forward">
			<div>{label}</div>
			<div>{iconArrowForward}</div>
		</Button>
	);
};
ButtonForward.propTypes = {
	label: PropTypes.string.isRequired,
	callback: PropTypes.func,
};
ButtonForward.displayName = "ButtonForward";

export default ButtonForward;
