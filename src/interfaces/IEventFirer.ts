export type TEventKey = string | number | Symbol;
export type TListener = (event?: any) => any;
export type TEventFilter = (event: TEventKey, target: any) => boolean;
export type TListenerFilter = (event?: any, eventKey?: TEventKey) => any;

export interface IListenerItem {
	listener: TListener;
	times: number;
}

export interface TFilter {
	rule: TEventFilter;
	listener: TListenerFilter;
}

export type TListenersValue = Array<IListenerItem>;

export interface IEventFirer {
	/**
	 * listen all events whatever event key
	 */
	all: (listener: TListener) => this;

	/**
	 * remove all listeners according to event key
	 */
	clearListenersByKey: (eventKey: TEventKey) => this;

	/**
	 * remove all listeners
	 */
	clearAllListeners: () => void;

	/**
	 * judge the event key and target arrording to the custom rule
	 */
	filt: (rule: Function, listener: TListener) => this;

	/**
	 * fire a custom event
	 */
	fire: (eventKey: TEventKey | TEventKey[], event?: any) => this;

	/**
	 * add an event listener
	 */
	on: (eventKey: TEventKey, listener: TListener) => this;

	/**
	 * delete an event listener
	 */
	off: (eventKey: TEventKey, listener: TListener) => this;

	/**
	 * add an event listener and the listener only listen to the event one time
	 */
	once: (eventKey: TEventKey, listener: TListener) => this;

	/**
	 * add an event listener and the listener listen to the event several times
	 */
	times: (eventKey: TEventKey, times: number, listener: TListener) => this;
}
