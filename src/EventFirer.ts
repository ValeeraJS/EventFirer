import IEventFirer, {
	IListenerItem,
	TEventKey,
	TFilter,
	TListener,
	TListenersValue
} from "./interfaces/IEventFirer";

type Constructor<T = Object> = new (...a: any[]) => T;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mixin = (Base: Constructor = Object, eventKeyList: TEventKey[] = []) => {
	return class EventFirer extends Base implements IEventFirer {
		public static mixin = mixin;

		#isFire = false;
		#fireIndex = -1;
		#offCount: Map<TEventKey, number> = new Map();

		public eventKeyList: TEventKey[] = eventKeyList;

		public filters: TFilter[] = [];

		public listeners: Map<TEventKey, TListenersValue> = new Map();

		public all(listener: TListener) {
			return this.filt(() => true, listener);
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

		public filt(rule: Function, listener: TListener) {
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

			this.#isFire = true;
			if (!this.checkEventKeyAvailable(eventKey)) {
				console.error(
					"EventDispatcher couldn't dispatch the event since EventKeyList doesn't contains key: ",
					eventKey
				);

				return this;
			}
			const array: TListenersValue = this.listeners.get(eventKey) || [];
			// let len = array.length;
			let item: IListenerItem;

			for (let i = 0; i < array.length; i++) {
				this.#fireIndex = i;
				item = array[i];
				item.listener(target);
				item.times--;
				if (item.times <= 0) {
					array.splice(i--, 1);
				}

				const count = this.#offCount.get(eventKey);

				if (count) {
					// 如果在当前事件触发时，监听器依次触发，已触发的被移除
					i -= count;
					this.#offCount.clear();
				}
			}

			this.checkFilt(eventKey, target);

			this.#fireIndex = -1;
			this.#offCount.clear();
			this.#isFire = false;

			return this;
		}

		public off(eventKey: TEventKey, listener: TListener) {
			const array: TListenersValue | undefined = this.listeners.get(eventKey);

			if (!array) {
				return this;
			}
			const len = array.length;

			for (let i = 0; i < len; i++) {
				if (array[i].listener === listener) {
					array.splice(i, 1);
					if (this.#isFire && this.#fireIndex >= i) {
						const v = this.#offCount.get(eventKey) ?? 0;

						this.#offCount.set(eventKey, v + 1);
					}
					break;
				}
			}

			return this;
		}

		public on(eventKey: TEventKey | TEventKey[], listener: TListener) {
			if (eventKey instanceof Array) {
				for (let i = 0, j = eventKey.length; i < j; i++) {
					this.times(eventKey[i], Infinity, listener);
				}

				return this;
			}

			return this.times(eventKey, Infinity, listener);
		}

		public once(eventKey: TEventKey, listener: TListener) {
			return this.times(eventKey, 1, listener);
		}

		public times(eventKey: TEventKey, times: number, listener: TListener) {
			if (!this.checkEventKeyAvailable(eventKey)) {
				console.error(
					"EventDispatcher couldn't add the listener: ",
					listener,
					"since EventKeyList doesn't contains key: ",
					eventKey
				);

				return this;
			}
			const array: TListenersValue = this.listeners.get(eventKey) || [];

			if (!this.listeners.has(eventKey)) {
				this.listeners.set(eventKey, array);
			}
			array.push({
				listener,
				times
			});

			return this;
		}

		public checkFilt(eventKey: TEventKey, target: any) {
			for (const item of this.filters) {
				if (item.rule(eventKey, target)) {
					item.listener(target, eventKey);
				}
			}

			return this;
		}

		public checkEventKeyAvailable(eventKey: TEventKey) {
			if (this.eventKeyList.length) {
				return this.eventKeyList.includes(eventKey);
			}

			return true;
		}
	};
};

export default mixin(Object);
