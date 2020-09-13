/**
 * The object received by the listener
 */
export declare type TEventKey = string | number | Symbol;
export interface IEvent {
    eventKey: TEventKey;
    target: any;
    life: number;
}
export declare type TListener = (event: IEvent) => any;
export interface IListenerItem {
    listener: TListener;
    times: number;
}
export interface TFilter {
    rule: Function;
    listener: TListener;
}
export declare type TListenersValue = Array<IListenerItem>;
export default interface IEventDispatcher {
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
     * dispatch a custom event
     */
    dispatchEvent: (eventKey: TEventKey, target: IEvent) => this;
    /**
     * judge the event key and target arrording to the custom rule
     */
    filt: (rule: Function, listener: TListener) => this;
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
