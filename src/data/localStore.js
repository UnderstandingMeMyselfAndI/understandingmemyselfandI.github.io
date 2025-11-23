const updateStorage = (action, which, id, value) => {
	if (typeof value !== "boolean") {
		console.error("updateStorage 'value' must be boolean");
		return;
	}
	if (typeof which !== "string") {
		console.error("updateStorage 'which' must be string");
		return;
	}
	if (typeof id !== "number") {
		console.error("updateStorage 'id' must be number");
		return;
	}
	if (action !== "set" || action !== "remove") {
		console.error("updateStorage 'action' must be either 'set' or 'remove' -  '" + action + "' given");
		return;
	}
	//-- see if the item alreadys exists in localstorage
	const storedItem = localStorage.getItem(`${which}-${id}`);
	if (storedItem !== null) {
		if (action == "remove") {
			localStorage.removeItem(`${which}-${id}`);
			return true;
		} else {
			localStorage.setItem(`${which}-${id}`, value);
			return true;
		}
	} else {
		if (action == "set") {
			localStorage.setItem(`${which}-${id}`, value);
		}
	}
};

const localStore = (() => {
	let last_id = 0;
	const _validate = (which, id, value = null) => {
			if (value && typeof value !== "boolean") {
				console.error("updateStorage 'value' must be boolean");
				return;
			}
			if (which && typeof which !== "string") {
				console.error("updateStorage 'which' must be string");
				return;
			}
			if (id && typeof id !== "number") {
				console.error("updateStorage 'id' must be number");
				return;
			}
		},
		_isItem = (which, id) => {
			return localStorage.getItem(`${which}-${id}`);
		},
		_set = (which, id, value) => {
			//if (!_validate(which, id, value)) return;
			console.log("_set", which, id, value);
			localStorage.setItem(`${which}-${id}`, value);
		},
		_remove = (which, id) => {
			//if (!_validate(which, id)) return;
			localStorage.removeItem(`${which}-${id}`);
		},
		_getCountByLabel = (which, ids = []) => {
			let count = 0;
			ids.forEach((id, i) => {
				if (localStorage.getItem(`${which}-${id}`) === "true") {
					count++;
				}
			});
			return count;
		},
		_get = (which, id) => {
			//	if (!_validate(which, id)) return;
			//if (_isItem(which, id)) {
			return localStorage.getItem(`${which}-${id}`) || null;
			//}
			// return null;
		};

	return {
		// -----------------------------------------
		// API
		// -----------------------------------------
		set: _set,
		remove: _remove,
		get: _get,
		getCountByLabel: _getCountByLabel,
	};
})();
const storeKeys = {
	emergency: "emc",
	favourite: "fav",
	toolbox: "tbx",
	tool: "tl",
};
export {storeKeys, localStore};
