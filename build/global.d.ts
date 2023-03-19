import { IEventFirer, TEventKey } from "./interfaces/IEventFirer";
export interface EventFirerRef {
    isFire: boolean;
    fireIndex: number;
    offCount: Map<TEventKey, number>;
}
export declare const RefWeakMap: WeakMap<IEventFirer, EventFirerRef>;
export declare const allFilter: () => boolean;
