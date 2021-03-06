import IEventDispatcher, {
	IEvent,
	IListenerItem,
	TEventKey,
	TFilter,
	TListener,
	TListenersValue
} from "./interfaces/IEventDispatcher";

type Constructor<T = {}> = new (...a: any[]) => T;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mixin = <TBase extends Constructor>(
	Base: TBase = Object as any,
	eventKeyList: TEventKey[] = []
) => {
	return class EventDispatcher extends Base implements IEventDispatcher {
		public static mixin = mixin;
		// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
		eventKeyList: TEventKey[] = eventKeyList;
		/**
		 * store all the filters
		 */
		// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
		filters: TFilter[] = [];

		/**
		 * store all the listeners by key
		 */
		// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
		listeners: Map<TEventKey, TListenersValue> = new Map();

		public all = (listener: TListener) => {
			return this.filt(() => true, listener);
		};

		public clearListenersByKey = (eventKey: TEventKey) => {
			this.listeners.delete(eventKey);

			return this;
		};

		public clearAllListeners = () => {
			const keys = this.listeners.keys();

			for (const key of keys) {
				this.listeners.delete(key);
			}

			return this;
		};

		public filt = (rule: Function, listener: TListener) => {
			this.filters.push({
				listener,
				rule
			});

			return this;
		};

		public fire = (eventKey: TEventKey, target: IEvent) => {
			if (!this.checkEventKeyAvailable(eventKey)) {
				console.error(
					"EventDispatcher couldn't dispatch the event since EventKeyList doesn't contains key: ",
					eventKey
				);

				return this;
			}
			const array: TListenersValue = this.listeners.get(eventKey) || [];
			let len = array.length;
			let item: IListenerItem;

			for (let i = 0; i < len; i++) {
				item = array[i];
				item.listener({
					eventKey,
					life: --item.times,
					target
				});
				if (item.times <= 0) {
					array.splice(i--, 1);
					--len;
				}
			}

			return this.checkFilt(eventKey, target);
		};

		public off = (eventKey: TEventKey, listener: TListener) => {
			const array: TListenersValue | undefined = this.listeners.get(eventKey);

			if (!array) {
				return this;
			}
			const len = array.length;

			for (let i = 0; i < len; i++) {
				if (array[i].listener === listener) {
					array.splice(i, 1);
					break;
				}
			}

			return this;
		};

		public on = (eventKey: TEventKey, listener: TListener) => {
			return this.times(eventKey, Infinity, listener);
		};

		public once = (eventKey: TEventKey, listener: TListener) => {
			return this.times(eventKey, 1, listener);
		};

		public times = (eventKey: TEventKey, times: number, listener: TListener) => {
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
		};

		public checkFilt = (eventKey: TEventKey, target: IEvent) => {
			for (const item of this.filters) {
				if (item.rule(eventKey, target)) {
					item.listener({
						eventKey,
						life: Infinity,
						target
					});
				}
			}

			return this;
		};

		public checkEventKeyAvailable = (eventKey: TEventKey) => {
			if (this.eventKeyList.length) {
				return this.eventKeyList.includes(eventKey);
			}

			return true;
		};
	};
};

export default mixin(Object);
