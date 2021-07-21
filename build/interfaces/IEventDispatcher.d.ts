/**
 * The object received by the listener
 */
export declare type TEventKey = string | number | Symbol;
export declare type TListener<T> = (event: T) => any;
export interface IListenerItem<T> {
    listener: TListener<T>;
    times: number;
}
export interface TFilter<T> {
    rule: Function;
    listener: TListener<T>;
}
export declare type TListenersValue<T> = Array<IListenerItem<T>>;
export default interface IEventDispatcher<T> {
    /**
     * listen all events whatever event key
     */
    all: (listener: TListener<T>) => this;
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
    filt: (rule: Function, listener: TListener<T>) => this;
    /**
     * fire a custom event
     */
    fire: (eventKey: TEventKey, target: T) => this;
    /**
     * add an event listener
     */
    on: (eventKey: TEventKey, listener: TListener<T>) => this;
    /**
     * delete an event listener
     */
    off: (eventKey: TEventKey, listener: TListener<T>) => this;
    /**
     * add an event listener and the listener only listen to the event one time
     */
    once: (eventKey: TEventKey, listener: TListener<T>) => this;
    /**
     * add an event listener and the listener listen to the event several times
     */
    times: (eventKey: TEventKey, times: number, listener: TListener<T>) => this;
}
