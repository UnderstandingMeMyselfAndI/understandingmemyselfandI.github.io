import EventsManager from "@/utils/EventsManager.js";

const Acronymns = (function () {
	const _name = false,
		_init = e => {
			_loadKey();
		},
		_qs = q => {
			console.log("q ", q);
			document.querySelectorAll(q);
		},
		_loaded = e => {
			const items = _qs(".AccordionItem");
			console.log("Loaded", items);
			items.forEach(_el => {
				console.log("AccordionItem", _el);
				_el.classList.remove("loading");
			});
		},
		// _cbs = _callbacks,
		_onPointerDown = e => {},
		_loadKey = () => {
			return EventsManager.add("DOMContentLoaded", _loaded);
		};
	_init();
	return {};
})();
