import {useEffect} from "react";

let listeners = [];

export const triggerGlobalRecalc = () => {
	listeners.forEach(fn => fn());
};

export const useGlobalRecalcTrigger = callback => {
	useEffect(() => {
		listeners.push(callback);
		return () => {
			listeners = listeners.filter(l => l !== callback);
		};
	}, [callback]);
};
