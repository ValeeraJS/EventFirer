import { TEventKey } from "../interfaces/IEventFirer";

export const on = (eventName: TEventKey) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return function (target: any, key: string | symbol): any {
		if (!target.listeners) {
			target.listeners = new Map();
		}
		target.on(eventName, (...args: any[]) => {
			target[key](...args);
		});
	};
};
