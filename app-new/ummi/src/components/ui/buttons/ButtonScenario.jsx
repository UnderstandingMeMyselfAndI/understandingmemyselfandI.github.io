import { Button } from '@/components/ui/button';
// import iconIncreaseFontSize from '/src/assets/text_increase_24dp.svg';
// import iconDescreaseFontSize from '/src/assets/text_decrease_24dp.svg';
import './buttonStyles.css';
import PropTypes from 'prop-types';

const ButtonScenario = ({ label, callback }) => {
	return (
		<div className='btn scenario' onClick={callback}>
			<Button variant='outline' aria-label={'Scenario ' + label}>
				{label}
			</Button>
		</div>
	);
};
ButtonScenario.propTypes = {
	label: PropTypes.string.isRequired,
	callback: PropTypes.func,
};
ButtonScenario.displayName = 'ButtonScenario';

export default ButtonScenario;
