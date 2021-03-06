import { IEvent, TEventKey, TFilter, TListener, TListenersValue } from "./interfaces/IEventDispatcher";
declare type Constructor<T = {}> = new (...a: any[]) => T;
export declare const mixin: <TBase extends Constructor<{}>>(Base?: TBase, eventKeyList?: TEventKey[]) => {
    new (...a: any[]): {
        eventKeyList: TEventKey[];
        /**
         * store all the filters
         */
        filters: TFilter[];
        /**
         * store all the listeners by key
         */
        listeners: Map<TEventKey, TListenersValue>;
        all: (listener: TListener) => any;
        clearListenersByKey: (eventKey: TEventKey) => any;
        clearAllListeners: () => any;
        filt: (rule: Function, listener: TListener) => any;
        fire: (eventKey: TEventKey, target: IEvent) => any;
        off: (eventKey: TEventKey, listener: TListener) => any;
        on: (eventKey: TEventKey, listener: TListener) => any;
        once: (eventKey: TEventKey, listener: TListener) => any;
        times: (eventKey: TEventKey, times: number, listener: TListener) => any;
        checkFilt: (eventKey: TEventKey, target: IEvent) => any;
        checkEventKeyAvailable: (eventKey: TEventKey) => boolean;
    };
    mixin: any;
} & TBase;
declare const _default: {
    new (...a: any[]): {
        eventKeyList: TEventKey[];
        /**
         * store all the filters
         */
        filters: TFilter[];
        /**
         * store all the listeners by key
         */
        listeners: Map<TEventKey, TListenersValue>;
        all: (listener: TListener) => any;
        clearListenersByKey: (eventKey: TEventKey) => any;
        clearAllListeners: () => any;
        filt: (rule: Function, listener: TListener) => any;
        fire: (eventKey: TEventKey, target: IEvent) => any;
        off: (eventKey: TEventKey, listener: TListener) => any;
        on: (eventKey: TEventKey, listener: TListener) => any;
        once: (eventKey: TEventKey, listener: TListener) => any;
        times: (eventKey: TEventKey, times: number, listener: TListener) => any;
        checkFilt: (eventKey: TEventKey, target: IEvent) => any;
        checkEventKeyAvailable: (eventKey: TEventKey) => boolean;
    };
    mixin: <TBase extends Constructor<{}>>(Base?: TBase, eventKeyList?: TEventKey[]) => {
        new (...a: any[]): {
            eventKeyList: TEventKey[];
            /**
             * store all the filters
             */
            filters: TFilter[];
            /**
             * store all the listeners by key
             */
            listeners: Map<TEventKey, TListenersValue>;
            all: (listener: TListener) => any;
            clearListenersByKey: (eventKey: TEventKey) => any;
            clearAllListeners: () => any;
            filt: (rule: Function, listener: TListener) => any;
            fire: (eventKey: TEventKey, target: IEvent) => any;
            off: (eventKey: TEventKey, listener: TListener) => any;
            on: (eventKey: TEventKey, listener: TListener) => any;
            once: (eventKey: TEventKey, listener: TListener) => any;
            times: (eventKey: TEventKey, times: number, listener: TListener) => any;
            checkFilt: (eventKey: TEventKey, target: IEvent) => any;
            checkEventKeyAvailable: (eventKey: TEventKey) => boolean;
        };
        mixin: any;
    } & TBase;
} & ObjectConstructor;
export default _default;
