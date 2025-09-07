import classNames from 'classnames';
import './styles.css';
import PropTypes from 'prop-types';

const Section = ({ children, title, classes, ...props }) => {
	return (
		<section
			className={classNames('section ', classes)}
			aria-labelledby='section '
			{...props}
		>
			<div className='title'>{title}</div>
			{children}
		</section>
	);
};
Section.propTypes = {
	children: PropTypes.node.isRequired,
	title: PropTypes.string,
	classes: PropTypes.string || PropTypes,
};

export default Section;
