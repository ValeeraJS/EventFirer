import IEventDispatcher, { TListener } from "./interfaces/IEventDispatcher";
export default class EventDispatcher implements IEventDispatcher {
    private eventKeyList;
    /**
     * store all the filters
     */
    private filters;
    /**
     * store all the listeners by key
     */
    private listeners;
    protected constructor(eventKeyList?: any[]);
    all: (listener: TListener) => this;
    clearListenersByKey: (eventKey: any) => this;
    clearAllListeners: () => this;
    dispatchEvent: (eventKey: any, target: any) => this;
    filt: (rule: Function, listener: TListener) => this;
    off: (eventKey: any, listener: TListener) => this;
    on: (eventKey: any, listener: TListener) => this;
    once: (eventKey: any, listener: TListener) => this;
    times: (eventKey: any, times: number, listener: TListener) => this;
    private checkFilt;
    private checkEventKeyAvailable;
}
