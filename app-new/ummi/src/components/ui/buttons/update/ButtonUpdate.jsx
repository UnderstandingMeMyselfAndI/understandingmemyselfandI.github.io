import UpdateIcon from './UpdateIcon';
import './styles.css';
import PropTypes from 'prop-types';
const ButtonUpdate = ({ label }) => {
	const handleClick = async () => {
		location.reload();
	};

	return (
		<div className='update-icon btn'>
			<button
				onClick={handleClick}
				className='update-btn'
				aria-label={'Update App '}
			>
				<div>
					<div dangerouslySetInnerHTML={{ __html: UpdateIcon }} />
				</div>
			</button>
			<div>{label}</div>
		</div>
	);
};
ButtonUpdate.propTypes = {
	label: PropTypes.string,
};
export default ButtonUpdate;
