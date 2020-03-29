import IEventDispatcher, { TListener, TListenersValue, TListenerItem } from "./interfaces/IEventDispatcher";

type TFilter = {
	rule: Function;
	listener: TListener;
}

export default class EventDispatcher implements IEventDispatcher {

	private eventKeyList: any[];
	/**
	 * store all the filters
	 */
	private filters: TFilter[] = [];

	/**
	 * store all the listeners by key
	 */
	private listeners: Map<any, TListenersValue> = new Map();

	protected constructor(eventKeyList: any[] = []) {
		this.eventKeyList = eventKeyList;
	}

	public all = (listener: TListener) => {
		return this.filt(() => true, listener);
	}

	public clearListenersByKey = (eventKey: any) => {
		this.listeners.delete(eventKey);
		return this;
	}

	public clearAllListeners = () => {
		const keys = this.listeners.keys();
		for (let key of keys) {
			this.listeners.delete(key);
		}
		return this;
	}

	public dispatchEvent = (eventKey: any, target: any) => {
		if (!this.checkEventKeyAvailable(eventKey)) {
			console.error("EventDispatcher couldn't dispatch the event since EventKeyList doesn't contains key: ", eventKey);
			return this;
		}
		const array: TListenersValue = this.listeners.get(eventKey) || [];
		let len = array.length;
		let item: TListenerItem;
		for (let i = 0; i < len; i++) {
			item = array[i];
			item.listener({
				eventKey,
				target,
				life: --item.times
			});
			if (item.times <= 0) {
				array.splice(i--, 1);
				--len;
			}
		}
		return this.checkFilt(eventKey, target);
	}

	public filt = (rule: Function, listener: TListener) => {
		this.filters.push({
			rule,
			listener
		});
		return this;
	}

	public off = (eventKey: any, listener: TListener) => {
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
	}

	public on = (eventKey: any, listener: TListener) => {
		return this.times(eventKey, Infinity, listener);
	}

	public once = (eventKey: any, listener: TListener) => {
		return this.times(eventKey, 1, listener);
	}

	public times = (eventKey: any, times: number, listener: TListener) => {
		if (!this.checkEventKeyAvailable(eventKey)) {
			console.error("EventDispatcher couldn't add the listener: ", listener, "since EventKeyList doesn't contains key: ", eventKey);
			return this;
		}
		let array: TListenersValue = this.listeners.get(eventKey) || [];
		if (!this.listeners.has(eventKey)) {
			this.listeners.set(eventKey, array);
		}
		array.push({
			listener,
			times
		});
		return this;
	}

	private checkFilt = (eventKey: any, target: any) => {
		for (let item of this.filters) {
			if (item.rule(eventKey, target)) {
				item.listener({
					eventKey,
					target,
					life: Infinity
				});
			}
		}
		return this;
	}

	private checkEventKeyAvailable = (eventKey: any) => {
		if (this.eventKeyList.length) {
			if (!this.eventKeyList.includes(eventKey)) {
				return false;
			}
		}
		return true;
	}
}
