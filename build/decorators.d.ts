import { TEventKey } from "./interfaces/IEventFirer";
type Constructor<T = Object> = new (...a: any[]) => T;
export declare function eventfirer(constructor: Constructor): any;
export declare const fire: (eventName: TEventKey) => (target: any, key: string | symbol) => any;
export declare const on: (eventName: TEventKey) => (target: any, key: string | symbol) => any;
export {};
