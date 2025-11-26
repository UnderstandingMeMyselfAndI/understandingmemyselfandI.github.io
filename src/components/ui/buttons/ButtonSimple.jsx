import "./buttonStyles.css";
import PropTypes from "prop-types";

const ButtonSimple = ({label, callback}) => {
	return (
		<div
			className="btn"
			onClick={callback}
		>
			<button className={"btn-" + label.replaceAll(" ", "-")}>{label}</button>
		</div>
	);
};
ButtonSimple.propTypes = {
	label: PropTypes.string.isRequired,
	callback: PropTypes.func,
};
ButtonSimple.displayName = "ButtonSimple";
export default ButtonSimple;
