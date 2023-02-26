/// <reference types="chai" />
import { TEventKey, TFilter, TListener, TListenersValue } from "./interfaces/IEventFirer";
type Constructor<T = Object> = new (...a: any[]) => T;
export declare const mixin: (Base?: Constructor) => {
    new (): {
        "__#5@#isFire": boolean;
        "__#5@#fireIndex": number;
        "__#5@#offCount": Map<TEventKey, number>;
        filters: TFilter[];
        listeners: Map<TEventKey, TListenersValue>;
        all(listener: TListener): any;
        clearListenersByKey(eventKey: TEventKey): any;
        clearAllListeners(): any;
        filt(rule: Function, listener: TListener): any;
        fire(eventKey: TEventKey | TEventKey[], target?: any): any;
        off(eventKey: TEventKey, listener: TListener): any;
        on(eventKey: TEventKey | TEventKey[], listener: TListener): any;
        once(eventKey: TEventKey, listener: TListener): any;
        times(eventKey: TEventKey, times: number, listener: TListener): any;
        checkFilt(eventKey: TEventKey, target: any): any;
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
        "__#5@#isFire": boolean;
        "__#5@#fireIndex": number;
        "__#5@#offCount": Map<TEventKey, number>;
        filters: TFilter[];
        listeners: Map<TEventKey, TListenersValue>;
        all(listener: TListener): any;
        clearListenersByKey(eventKey: TEventKey): any;
        clearAllListeners(): any;
        filt(rule: Function, listener: TListener): any;
        fire(eventKey: TEventKey | TEventKey[], target?: any): any;
        off(eventKey: TEventKey, listener: TListener): any;
        on(eventKey: TEventKey | TEventKey[], listener: TListener): any;
        once(eventKey: TEventKey, listener: TListener): any;
        times(eventKey: TEventKey, times: number, listener: TListener): any;
        checkFilt(eventKey: TEventKey, target: any): any;
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
