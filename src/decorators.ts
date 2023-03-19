import { IEventFirer, TEventFilter, TEventKey } from "./interfaces/IEventFirer";
import { allFilter } from "./global";
import { EventFirer } from "./EventFirer";

type Constructor<T = Object> = new (...a: any[]) => T;

const RefEventFirerMap = new WeakMap<any, IEventFirer>();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function eventfirer(constructor: Constructor) {
	return new Proxy(constructor, {
		construct(Target, args) {
			const obj: any = new Target(...args);
			const firer = new EventFirer();

			RefEventFirerMap.set(obj, firer);
			const arr = ClassOnKeyMap.get(constructor);

			if (arr) {
				for (let i = 0, len = arr.length; i < len; i++) {
					firer.times(
						arr[i].eventName,
						arr[i].times,
						obj[arr[i].method as keyof Constructor].bind(obj)
					);
				}
			}

			const arr2 = ClassFiltMap.get(constructor);

			if (arr2) {
				for (let i = 0, len = arr2.length; i < len; i++) {
					firer.filt(arr2[i].rule, obj[arr2[i].method as keyof Constructor].bind(obj));
				}
			}

			return obj;
		}
	}) as any;
}

export const fire = (eventName: TEventKey) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return function (target: any, key: string | symbol): any {
		const func = target[key];

		target[key] = function (...args: any[]) {
			const v = func.call(this, ...args);

			RefEventFirerMap.get(this)?.fire(eventName, this);

			return v;
		};

		return target[key];
	};
};

interface EventMethodInfo {
	eventName: TEventKey;
	method: string | Symbol;
	times: number;
}

const ClassOnKeyMap = new WeakMap<any, EventMethodInfo[]>();

export const times = (eventName: TEventKey, times = Infinity) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return function (target: any, key: string | symbol): any {
		let arr = ClassOnKeyMap.get(target.constructor);

		if (!arr) {
			arr = [];
			ClassOnKeyMap.set(target.constructor, arr);
		}
		arr.push({
			eventName,
			method: key,
			times
		});
	};
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const on = (eventName: TEventKey) => {
	return times(eventName, Infinity);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const once = (eventName: TEventKey) => {
	return times(eventName, 1);
};

interface EventFiltInfo {
	rule: TEventFilter;
	method: string | Symbol;
}
const ClassFiltMap = new WeakMap<any, EventFiltInfo[]>();

export const filt = (rule: TEventFilter) => {
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	return function (target: any, key: string | symbol): any {
		let arr = ClassFiltMap.get(target.constructor);

		if (!arr) {
			arr = [];
			ClassFiltMap.set(target.constructor, arr);
		}
		arr.push({
			method: key,
			rule
		});
	};
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const all = filt(allFilter);
