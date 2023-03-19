/// <reference types="chai" />
import { TEventFilter, TEventKey, TFilter, TListener, TListenerFilter, TListenersValue } from "./interfaces/IEventFirer";
type Constructor<T = Object> = new (...a: any[]) => T;
export declare const mixin: (Base?: Constructor) => {
    new (): {
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
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    };
};
export declare const EventFirer: {
    new (): {
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
        constructor: Function;
        toString(): string;
        toLocaleString(): string;
        valueOf(): Object;
        hasOwnProperty(v: PropertyKey): boolean;
        isPrototypeOf(v: Object): boolean;
        propertyIsEnumerable(v: PropertyKey): boolean;
        should: Chai.Assertion;
    };
};
export {};
