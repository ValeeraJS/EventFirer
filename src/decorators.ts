import { EventFirer } from "./EventFirer";
import { TEventKey } from "./interfaces/IEventFirer";

type Constructor<T = Object> = new (...a: any[]) => T;

const RefEventFirerMap = new WeakMap<any, EventFirer>();

export function eventfirer(constructor: Constructor) {
	return new Proxy(constructor, {
		construct(target, args) {
			const obj: any = new target(...args);
			const firer = new EventFirer();
			RefEventFirerMap.set(obj, firer);
			const arr = ClassOnKeyMap.get(constructor);
			if (arr) {
				for (let i = 0, len = arr.length; i < len; i++) {
					firer.on(arr[i].eventName, obj[arr[i].method as keyof Constructor]);
				}
			}
			return obj;
		}
	}) as any;
}

export const fire = (eventName: TEventKey) => {
	return function (target: any, key: string | symbol): any {
		const func = target[key];

		target[key] = function (...args: any[]) {
			const v = func(...args);
			RefEventFirerMap.get(this)?.fire(eventName, this);

			return v;
		};

		return target[key];
	};
};

const ClassOnKeyMap = new WeakMap<any, { eventName: TEventKey, method: string | Symbol }[]>();

export const on = (eventName: TEventKey) => {
	return function (target: any, key: string | symbol): any {
		let arr = ClassOnKeyMap.get(target.constructor);
		if (!arr) {
			arr = [];
			ClassOnKeyMap.set(target.constructor, arr);
		}
		arr.push({
			eventName,
			method: key
		});
	};
};
