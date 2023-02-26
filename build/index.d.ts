import { EventFirer } from "./EventFirer";
export * from "./EventFirer";
export * from "./interfaces/IEventFirer";
export declare class A extends EventFirer {
    log(target: any): void;
    dispatch(): void;
}
