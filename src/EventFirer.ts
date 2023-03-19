import { allFilter, RefWeakMap } from "./global";
import {
	IEventFirer,
	IListenerItem,
	TEventFilter,
	TEventKey,
	TFilter,
	TListener,
	TListenerFilter,
	TListenersValue
} from "./interfaces/IEventFirer";

type Constructor<T = Object> = new (...a: any[]) => T;

function checkFilt(firer: IEventFirer, eventKey: TEventKey, target: any) {
	for (const item of firer.filters) {
		if (item.rule(eventKey, target)) {
			item.listener(target, eventKey);
		}
	}

	return firer;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mixin = (Base: Constructor = Object) => {
	return class EventFirer extends Base implements IEventFirer {
		public filters: TFilter[];
		public listeners: Map<TEventKey, TListenersValue>;

		public constructor() {
			super();
			this.filters = [];
			this.listeners = new Map();
			RefWeakMap.set(this, {
				fireIndex: -1,
				isFire: false,
				offCount: new Map()
			});
		}

		public all(listener: TListener, checkDuplicate?: boolean) {
			return this.filt(allFilter, listener, checkDuplicate);
		}

		public clearListenersByKey(eventKey: TEventKey) {
			this.listeners.delete(eventKey);

			return this;
		}

		public clearAllListeners() {
			const keys = this.listeners.keys();

			for (const key of keys) {
				this.listeners.delete(key);
			}

			return this;
		}

		public filt(rule: TEventFilter, listener: TListenerFilter, checkDuplicate?: boolean) {
			if (checkDuplicate) {
				let f: TFilter;

				for (let i = 0, j = this.filters.length; i < j; i++) {
					f = this.filters[i];
					if (f.rule === rule && f.listener === listener) {
						return this;
					}
				}
			}
			this.filters.push({
				listener,
				rule
			});

			return this;
		}

		public fire(eventKey: TEventKey | TEventKey[], target?: any) {
			if (eventKey instanceof Array) {
				for (let i = 0, len = eventKey.length; i < len; i++) {
					this.fire(eventKey[i], target);
				}

				return this;
			}

			const ref = RefWeakMap.get(this)!;

			ref.isFire = true;
			const array: TListenersValue = this.listeners.get(eventKey) || [];
			// let len = array.length;
			let item: IListenerItem;

			for (let i = 0; i < array.length; i++) {
				ref.fireIndex = i;
				item = array[i];
				item.listener(target);
				item.times--;
				if (item.times <= 0) {
					array.splice(i--, 1);
				}

				const count = ref.offCount.get(eventKey);

				if (count) {
					// 如果在当前事件触发时，监听器依次触发，已触发的被移除
					i -= count;
					ref.offCount.clear();
				}
			}

			checkFilt(this, eventKey, target);

			ref.fireIndex = -1;
			ref.offCount.clear();
			ref.isFire = false;

			return this;
		}

		public off(eventKey: TEventKey, listener: TListener) {
			const array: TListenersValue | undefined = this.listeners.get(eventKey);
			const ref = RefWeakMap.get(this)!;

			if (!array) {
				return this;
			}
			const len = array.length;

			for (let i = 0; i < len; i++) {
				if (array[i].listener === listener) {
					array.splice(i, 1);
					if (ref.isFire && ref.fireIndex >= i) {
						const v = ref.offCount.get(eventKey) ?? 0;

						ref.offCount.set(eventKey, v + 1);
					}
					break;
				}
			}

			return this;
		}

		public on(
			eventKey: TEventKey | TEventKey[],
			listener: TListener,
			checkDuplicate?: boolean
		) {
			if (eventKey instanceof Array) {
				for (let i = 0, j = eventKey.length; i < j; i++) {
					this.times(eventKey[i], Infinity, listener, checkDuplicate);
				}

				return this;
			}

			return this.times(eventKey, Infinity, listener, checkDuplicate);
		}

		public once(eventKey: TEventKey, listener: TListener, checkDuplicate?: boolean) {
			return this.times(eventKey, 1, listener, checkDuplicate);
		}

		public times(
			eventKey: TEventKey,
			times: number,
			listener: TListener,
			checkDuplicate = false
		) {
			const array: TListenersValue = this.listeners.get(eventKey) || [];

			if (!this.listeners.has(eventKey)) {
				this.listeners.set(eventKey, array);
			}

			if (checkDuplicate) {
				for (let i = 0, j = array.length; i < j; i++) {
					if (array[i].listener === listener) {
						return this;
					}
				}
			}

			array.push({
				listener,
				times
			});

			return this;
		}
	};
};

export const EventFirer = mixin(Object);
