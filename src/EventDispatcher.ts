import IEventDispatcher, { TListener, TListenersValue, TListenerItem } from "./interfaces/IEventDispatcher";

type TFlitter = {
    rule: Function,
    listener: TListener
}

export default class EventDispatcher implements IEventDispatcher {

    /**
     * store all the filters
     */
    private flitters: Array<TFlitter> = [];

    /**
     * store all the listeners by key
     */
    private listeners: Map<any, TListenersValue> = new Map();


    public all = (listener: TListener) => {
        return this.flit(() => true, listener);
    }

    public clear = (eventKey: any) => {
        this.listeners.delete(eventKey);
        return this;
    }

    public clearAll = () => {
        const keys = this.listeners.keys();
        for (let key of keys) {
            this.listeners.delete(key);
        }
        return this;
    }

    public dispatch = (eventKey: any, target: any) => {
        const array: TListenersValue = this.listeners.get(eventKey) || [];
        let len = array.length;
        let item: TListenerItem;
        for (let i = 0; i < len; i++) {
            item = array[i];
            item.listener({
                eventKey,
                target,
                life: --item.times
            });
            if (item.times <= 0) {
                array.splice(i--, 1);
                --len;
            }
        }
        return this.checkFlit(eventKey, target);
    }

    public flit = (rule: Function, listener: TListener) => {
        this.flitters.push({
            rule,
            listener
        });
        return this;
    }

    public off = (eventKey: any, listener: TListener) => {
        const array: TListenersValue | undefined = this.listeners.get(eventKey);
        if (!array) {
            return this;
        }
        const len = array.length;
        for (let i = 0; i < len; i++) {
            if (array[i].listener === listener) {
                array.splice(i, 1);
                break;
            }
        }
        return this;
    }

    public on = (eventKey: any, listener: TListener) => {
        return this.times(eventKey, Infinity, listener);
    }

    public once = (eventKey: any, listener: TListener) => {
        return this.times(eventKey, 1, listener);
    }

    public times = (eventKey: any, times: number, listener: TListener) => {
        let array: TListenersValue = this.listeners.get(eventKey) || [];
        if (!this.listeners.has(eventKey)) {
            this.listeners.set(eventKey, array);
        }
        array.push({
            listener,
            times
        });
        return this;
    }

    private checkFlit = (eventKey: any, target: any) => {
        for (let item of this.flitters) {
            if (item.rule(eventKey, target)) {
                item.listener({
                    eventKey,
                    target,
                    life: Infinity
                });
            }
        }
        return this;
    }

}
