/**
 * The object received by the listener
 */
export declare type TEvent = {
    eventKey: any;
    target: any;
    life: number;
};
export declare type TListener = (event: TEvent) => {};
export declare type TListenerItem = {
    listener: TListener;
    times: number;
};
export declare type TListenersValue = Array<TListenerItem>;
export default interface IEventDispatcher {
    /**
     * listen all events whatever event key
     */
    all: (listener: TListener) => this;
    /**
     * remove all listeners according to event key
     */
    clear: (eventKey: any) => this;
    /**
     * remove all listeners
     */
    clearAll: () => void;
    /**
     * dispatch a custom event
     */
    dispatch: (eventKey: any, target: TEvent) => this;
    /**
     * judge the event key and target arrording to the custom rule
     */
    filt: (rule: Function, listener: TListener) => this;
    /**
     * add an event listener
     */
    on: (eventKey: any, listener: TListener) => this;
    /**
     * delete an event listener
     */
    off: (eventKey: any, listener: TListener) => this;
    /**
     * add an event listener and the listener only listen to the event one time
     */
    once: (eventKey: any, listener: TListener) => this;
    /**
     * add an event listener and the listener listen to the event several times
     */
    times: (eventKey: any, times: number, listener: TListener) => this;
}
