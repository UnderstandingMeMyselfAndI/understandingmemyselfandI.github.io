const EventManager = (function () {
	const _callbacks = new Map(),
		// _cbs = _callbacks,
		_get = key => _callbacks.get(key),
		_has = key => _callbacks.has(key),
		_del = key => _callbacks.delete(key),
		_set = (key, obj) => _callbacks.set(key, obj),
		_rem = (name, wrapped, opts) => _removeEl(name, wrapped, opts),
		_addEl = (name, wrapped, options = {}) => {
			try {
				window.addEventListener(name, wrapped, options);
				return true;
			} catch (e) {
				console.error(`EventManager: Failed to add ${name} event:`, e);
				return false;
			}
		},
		_removeEl = (name, wrapped, options = {}) => {
			try {
				window.removeEventListener(name, wrapped, options);
				return true;
			} catch (error) {
				console.error(`EventManager: Failed to remove ${name} event:`, error);
				return false;
			}
		},
		_add = (name, cb, options = {}) => {
			if (typeof cb !== "function") return false;

			// Prevent duplicate registrations
			// const key = Symbol(); // Simple unique key
			const key = `${name}_${cb.toString().hashCode()}`;
			if (_has(key)) {
				console.warn(`EventManager: Duplicate registration for ${name}`);
				return false;
			}

			const wrapped = e => {
				try {
					cb(e);
					if (options.once) _remove(key);
				} catch (e) {
					console.error(`EventManager: Error in ${name} handler:`, e);
				}
			};

			if (_addEl(name, wrapped, options)) {
				_set(key, {name, wrapped, original: cb, options});
				return key;
			}
			return false;
		},
		_remove = key => {
			// const key = `${name}_${cb.toString().hashCode()}`;
			const cback = _get(key);

			if (cback) {
				_removeEl(cback.name, cback.wrapped, cback.options);
				_del(key);
				return true;
			}
			return false;
		},
		_destroy = () => {
			_callbacks.forEach(cb => {
				_removeEl(cb.name, cb.wrapped, cb.options);
			});
			_callbacks.clear();
			console.log("EventManager: All events cleaned up");
		};

	_add("load", () => console.log("Loaded"));
	_add("scroll", () => console.log("Scrolling"));
	// Public API
	return {
		add: _add,
		remove: _remove,
		destroy: _destroy,
	};
})();
// Simple hash function for callback identification
String.prototype.hashCode = function () {
	let hash = 0;
	for (let i = 0; i < this.length; i++) {
		const char = this.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash; // Convert to 32-bit integer
	}
	return hash;
};
