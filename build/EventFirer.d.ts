import { TEventKey, TFilter, TListener, TListenersValue } from "./interfaces/IEventFirer";
declare type Constructor<T = {}> = new (...a: any[]) => T;
export declare const mixin: <TBase extends Constructor<{}>>(Base?: TBase, eventKeyList?: TEventKey[]) => {
    new (...a: any[]): {
        eventKeyList: TEventKey[];
        /**
         * store all the filters
         */
        filters: TFilter<any>[];
        /**
         * store all the listeners by key
         */
        listeners: Map<TEventKey, TListenersValue<any>>;
        all(listener: TListener<any>): any;
        clearListenersByKey(eventKey: TEventKey): any;
        clearAllListeners(): any;
        filt(rule: Function, listener: TListener<any>): any;
        fire(eventKey: TEventKey, target: any): any;
        off(eventKey: TEventKey, listener: TListener<any>): any;
        on(eventKey: TEventKey | TEventKey[], listener: TListener<any>): any;
        once(eventKey: TEventKey, listener: TListener<any>): any;
        times(eventKey: TEventKey, times: number, listener: TListener<any>): any;
        checkFilt(eventKey: TEventKey, target: any): any;
        checkEventKeyAvailable(eventKey: TEventKey): boolean;
    };
    mixin: any;
} & TBase;
declare const _default: {
    new (...a: any[]): {
        eventKeyList: TEventKey[];
        /**
         * store all the filters
         */
        filters: TFilter<any>[];
        /**
         * store all the listeners by key
         */
        listeners: Map<TEventKey, TListenersValue<any>>;
        all(listener: TListener<any>): any;
        clearListenersByKey(eventKey: TEventKey): any;
        clearAllListeners(): any;
        filt(rule: Function, listener: TListener<any>): any;
        fire(eventKey: TEventKey, target: any): any;
        off(eventKey: TEventKey, listener: TListener<any>): any;
        on(eventKey: TEventKey | TEventKey[], listener: TListener<any>): any;
        once(eventKey: TEventKey, listener: TListener<any>): any;
        times(eventKey: TEventKey, times: number, listener: TListener<any>): any;
        checkFilt(eventKey: TEventKey, target: any): any;
        checkEventKeyAvailable(eventKey: TEventKey): boolean;
    };
    mixin: <TBase extends Constructor<{}>>(Base?: TBase, eventKeyList?: TEventKey[]) => {
        new (...a: any[]): {
            eventKeyList: TEventKey[];
            /**
             * store all the filters
             */
            filters: TFilter<any>[];
            /**
             * store all the listeners by key
             */
            listeners: Map<TEventKey, TListenersValue<any>>;
            all(listener: TListener<any>): any;
            clearListenersByKey(eventKey: TEventKey): any;
            clearAllListeners(): any;
            filt(rule: Function, listener: TListener<any>): any;
            fire(eventKey: TEventKey, target: any): any;
            off(eventKey: TEventKey, listener: TListener<any>): any;
            on(eventKey: TEventKey | TEventKey[], listener: TListener<any>): any;
            once(eventKey: TEventKey, listener: TListener<any>): any;
            times(eventKey: TEventKey, times: number, listener: TListener<any>): any;
            checkFilt(eventKey: TEventKey, target: any): any;
            checkEventKeyAvailable(eventKey: TEventKey): boolean;
        };
        mixin: any;
    } & TBase;
} & ObjectConstructor;
export default _default;
