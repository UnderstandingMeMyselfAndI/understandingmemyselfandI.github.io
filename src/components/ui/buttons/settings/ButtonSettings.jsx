import './styles.css';
import SettingsIcon from './SettingsIcon.jsx';

const ButtonSettings = () => {
	return (
		<div className='settings-icon btn'>
			<div dangerouslySetInnerHTML={{ __html: SettingsIcon }} />
		</div>
	);
};

ButtonSettings.displayName = 'ButtonSettings';
export default ButtonSettings;
