import { TEventFilter, TEventKey, TFilter, TListener, TListenerFilter, TListenersValue } from "./interfaces/IEventFirer";
type Constructor = new (...args: any[]) => {};
export declare const mixin: <TBase extends Constructor>(Base?: TBase) => {
    new (...args: any[]): {
        filters: TFilter[];
        listeners: Map<TEventKey, TListenersValue>;
        all(listener: TListener, checkDuplicate?: boolean): any;
        clearListenersByKey(eventKey: TEventKey): any;
        clearAllListeners(): any;
        filt(rule: TEventFilter, listener: TListenerFilter, checkDuplicate?: boolean): any;
        fire(eventKey: TEventKey | TEventKey[], target?: any): any;
        off(eventKey: TEventKey, listener: TListener): any;
        on(eventKey: TEventKey | TEventKey[], listener: TListener, checkDuplicate?: boolean): any;
        once(eventKey: TEventKey, listener: TListener, checkDuplicate?: boolean): any;
        times(eventKey: TEventKey, times: number, listener: TListener, checkDuplicate?: boolean): any;
    };
} & TBase;
export declare const EventFirer: {
    new (...args: any[]): {
        filters: TFilter[];
        listeners: Map<TEventKey, TListenersValue>;
        all(listener: TListener, checkDuplicate?: boolean): any;
        clearListenersByKey(eventKey: TEventKey): any;
        clearAllListeners(): any;
        filt(rule: TEventFilter, listener: TListenerFilter, checkDuplicate?: boolean): any;
        fire(eventKey: TEventKey | TEventKey[], target?: any): any;
        off(eventKey: TEventKey, listener: TListener): any;
        on(eventKey: TEventKey | TEventKey[], listener: TListener, checkDuplicate?: boolean): any;
        once(eventKey: TEventKey, listener: TListener, checkDuplicate?: boolean): any;
        times(eventKey: TEventKey, times: number, listener: TListener, checkDuplicate?: boolean): any;
    };
} & ObjectConstructor;
export {};
