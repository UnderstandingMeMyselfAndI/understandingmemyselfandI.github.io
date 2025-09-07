import { Button } from '@/components/ui/button';

import './buttonStyles.css';
import PropTypes from 'prop-types';

const ButtonSimple = ({ label, callback }) => {
	return (
		<div className='btn' onClick={callback}>
			<Button variant='outline' className={'btn-' + label.replaceAll(' ', '-')}>
				{label}
			</Button>
		</div>
	);
};
ButtonSimple.propTypes = {
	label: PropTypes.string.isRequired,
	callback: PropTypes.func,
};
ButtonSimple.displayName = 'ButtonSimple';
export default ButtonSimple;
