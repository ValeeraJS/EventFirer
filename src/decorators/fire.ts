import { TEventKey } from "../interfaces/IEventFirer";

export const fire = (eventName: TEventKey) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return function (target: any, key: string | symbol): any {
		const func = target[key];

		target[key] = function (...args: any[]) {
			const v = func(...args);

			this.fire(eventName, this);

			return v;
		};

		return target[key];
	};
};
