import { TEventKey } from "./interfaces/IEventDispatcher";
declare type Constructor<T = {}> = new (...a: any[]) => T;
export declare const mixin: <TBase extends Constructor<{}>>(Base?: TBase, eventKeyList?: TEventKey[]) => Constructor;
declare const _default: Constructor<{}>;
export default _default;
