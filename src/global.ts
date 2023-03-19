import { IEventFirer, TEventKey } from "./interfaces/IEventFirer";

export interface EventFirerRef {
	isFire: boolean;
	fireIndex: number;
	offCount: Map<TEventKey, number>;
}

export const RefWeakMap = new WeakMap<IEventFirer, EventFirerRef>();

export const allFilter = (): boolean => true;
