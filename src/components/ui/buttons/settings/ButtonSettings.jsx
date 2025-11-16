import "./styles.css";
import SettingsIcon from "./SettingsIcon.jsx";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
const ButtonSettings = () => {
	return (
		<div className="settings-icon btn">
			<SettingsOutlinedIcon />
			{/* <div dangerouslySetInnerHTML={{ __html: SettingsIcon }} /> */}
		</div>
	);
};

ButtonSettings.displayName = "ButtonSettings";
export default ButtonSettings;
