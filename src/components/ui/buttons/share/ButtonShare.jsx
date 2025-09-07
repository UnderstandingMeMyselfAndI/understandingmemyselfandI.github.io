import ShareIcon from './ShareIcon';
import './styles.css';
import PropTypes from 'prop-types';
const ButtonShare = ({ label }) => {
	const handleShare = async () => {
		try {
			await navigator.share({
				title: 'Share this page',
				text: 'Check out this awesome page!',
				url: window.location.href,
			});
		} catch (error) {
			console.error('Error sharing:', error);
		}
	};

	return (
		<div className='share-icon btn'>
			<button onClick={handleShare} className='share-btn' aria-label={'Share'}>
				<ShareIcon />
			</button>
			<div>{label}</div>
		</div>
	);
};
ButtonShare.propTypes = {
	label: PropTypes.string,
};
export default ButtonShare;
