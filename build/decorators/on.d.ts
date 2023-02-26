import { TEventKey } from "../interfaces/IEventFirer";
export declare const on: (eventName: TEventKey) => (target: any, key: string | symbol) => any;
