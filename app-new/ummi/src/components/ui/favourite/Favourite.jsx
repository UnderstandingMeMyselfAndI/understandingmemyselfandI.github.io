import PropTypes from 'prop-types';
import * as React from 'react';
import iconFavouriteFilled from '../../icons/iconFavouriteFilled';
import iconFavouriteOutline from '../../icons/iconFavouriteOutline';
import './styles.css';
const Favourite = ({ id, className }) => {
	const [favourite, setFavourite] = React.useState(() => {
		const storedFavourite = localStorage.getItem(`favourite-${id}`);
		return storedFavourite; // === 'true';
	});

	//const imgSrc = favourite ? starFilled : starOutline;
	const imgClassName = favourite ? 'favourite chosen' : 'favourite';
	const icon = favourite ? iconFavouriteFilled : iconFavouriteOutline;

	React.useEffect(() => {
		const storedFavourite = localStorage.getItem(`favourite-${id}`);
		if (storedFavourite !== null) {
			setFavourite(storedFavourite === 'true');
		}
	}, [id]);

	const handleClick = (e) => {
		e.stopPropagation();
		const newFavourite = !favourite;

		localStorage.setItem(`favourite-${id}`, newFavourite.toString());
		setFavourite(newFavourite);
	};

	return (
		<div
			className={className + ' AccordionItemFavourite '}
			onClick={handleClick}
			aria-label='Add to favourites'
		>
			<div
				dangerouslySetInnerHTML={{ __html: icon }}
				className={imgClassName}
				alt='Favourite Icon'
			/>
		</div>
	);
};
Favourite.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
};
Favourite.displayName = 'Favourite';
export default Favourite;
