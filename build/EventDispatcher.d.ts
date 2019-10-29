import IEventDispatcher, { TListener } from "./interfaces/IEventDispatcher";
export default class EventDispatcher implements IEventDispatcher {
    /**
     * store all the filters
     */
    private flitters;
    /**
     * store all the listeners by key
     */
    private listeners;
    all: (listener: TListener) => this;
    clear: (eventKey: any) => this;
    clearAll: () => void;
    dispatch: (eventKey: any, target: any) => this;
    flit: (rule: Function, listener: TListener) => this;
    off: (eventKey: any, listener: TListener) => this;
    on: (eventKey: any, listener: TListener) => this;
    once: (eventKey: any, listener: TListener) => this;
    times: (eventKey: any, times: number, listener: TListener) => this;
    private checkFlit;
}
