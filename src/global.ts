import { IEventFirer, TEventKey } from "./interfaces/IEventFirer";

export type EventFirerRef = {
    isFire: boolean;
    fireIndex: number;
    offCount: Map<TEventKey, number>;
}

export const RefWeakMap = new WeakMap<IEventFirer, EventFirerRef>();

export const allFilter = () => true;
