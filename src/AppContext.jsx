import React, { createContext } from 'react';
// import PropTypes from 'prop-types';
const FilterFavouritesContext = createContext(true);
// const filterFavsStrorageKey = 'filterFavs';
// const AppContextProvider = ({ children }) => {
// 	//const [theme, setTheme] = useState('light');

// 	const isFilterByFavourite =
// 		localStorage.getItem(filterFavsStrorageKey) === 'true' ? true : false;
// 	const [filterByFavourite, setFilterByFavourite] =
// 		React.useState(isFilterByFavourite);
// 	const toggleFilterByFavourite = () => {
// 		setFilterByFavourite((prevFilterByFavourite) => !prevFilterByFavourite);
// 		localStorage.setItem(filterFavsStrorageKey, filterByFavourite.toString());
// 	};

// 	return (
// 		<AppContext value={{ filterByFavourite, toggleFilterByFavourite }}>
// 			<div>{children}</div>
// 		</AppContext>
// 	);
// };
// AppContextProvider.propTypes = {
// 	children: PropTypes.node.isRequired,
// };
// AppContextProvider.displayName = 'AppContextProvider';
export default FilterFavouritesContext;
