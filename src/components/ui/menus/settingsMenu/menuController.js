// menuController.js
let menuRef = null;

export const setMenuRef = ref => {
	menuRef = ref;
	console.log("Menu ref set");
};

export const openMenu = () => {
	console.log("openMenu called");
	if (menuRef?.current?.openMenu) {
		menuRef.current.openMenu();
		return true;
	}
	console.warn("Menu not available");
	return false;
};

export const closeMenu = () => {
	if (menuRef?.current?.closeMenu) {
		menuRef.current.closeMenu();
		return true;
	}
	return false;
};
