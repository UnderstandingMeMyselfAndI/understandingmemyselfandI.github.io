if ("setAppBadge" in navigator) {
	navigator.setAppBadge(2).catch(error => {
		// Code to handle an error
	});
}

// remove badge
navigator.clearAppBadge();

// add badge
navigator.setAppBadge(2);
