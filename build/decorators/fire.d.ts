import { TEventKey } from "../interfaces/IEventFirer";
export declare const fire: (eventName: TEventKey) => (target: any, key: string | symbol) => any;
