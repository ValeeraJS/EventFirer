// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const mixin = (Base = Object, eventKeyList = []) => {
    return class EventFirer extends Base {
        static mixin = mixin;
        #isFire = false;
        #fireIndex = -1;
        #offCount = new Map();
        eventKeyList = eventKeyList;
        filters = [];
        listeners = new Map();
        all(listener) {
            return this.filt(() => true, listener);
        }
        clearListenersByKey(eventKey) {
            this.listeners.delete(eventKey);
            return this;
        }
        clearAllListeners() {
            const keys = this.listeners.keys();
            for (const key of keys) {
                this.listeners.delete(key);
            }
            return this;
        }
        filt(rule, listener) {
            this.filters.push({
                listener,
                rule
            });
            return this;
        }
        fire(eventKey, target) {
            if (eventKey instanceof Array) {
                for (let i = 0, len = eventKey.length; i < len; i++) {
                    this.fire(eventKey[i], target);
                }
                return this;
            }
            this.#isFire = true;
            if (!this.checkEventKeyAvailable(eventKey)) {
                console.error("EventDispatcher couldn't dispatch the event since EventKeyList doesn't contains key: ", eventKey);
                return this;
            }
            const array = this.listeners.get(eventKey) || [];
            // let len = array.length;
            let item;
            for (let i = 0; i < array.length; i++) {
                this.#fireIndex = i;
                item = array[i];
                item.listener(target);
                item.times--;
                if (item.times <= 0) {
                    array.splice(i--, 1);
                }
                const count = this.#offCount.get(eventKey);
                if (count) {
                    // 如果在当前事件触发时，监听器依次触发，已触发的被移除
                    i -= count;
                    this.#offCount.clear();
                }
            }
            this.checkFilt(eventKey, target);
            this.#fireIndex = -1;
            this.#offCount.clear();
            this.#isFire = false;
            return this;
        }
        off(eventKey, listener) {
            const array = this.listeners.get(eventKey);
            if (!array) {
                return this;
            }
            const len = array.length;
            for (let i = 0; i < len; i++) {
                if (array[i].listener === listener) {
                    array.splice(i, 1);
                    if (this.#isFire && this.#fireIndex >= i) {
                        const v = this.#offCount.get(eventKey) ?? 0;
                        this.#offCount.set(eventKey, v + 1);
                    }
                    break;
                }
            }
            return this;
        }
        on(eventKey, listener) {
            if (eventKey instanceof Array) {
                for (let i = 0, j = eventKey.length; i < j; i++) {
                    this.times(eventKey[i], Infinity, listener);
                }
                return this;
            }
            return this.times(eventKey, Infinity, listener);
        }
        once(eventKey, listener) {
            return this.times(eventKey, 1, listener);
        }
        times(eventKey, times, listener) {
            if (!this.checkEventKeyAvailable(eventKey)) {
                console.error("EventDispatcher couldn't add the listener: ", listener, "since EventKeyList doesn't contains key: ", eventKey);
                return this;
            }
            const array = this.listeners.get(eventKey) || [];
            if (!this.listeners.has(eventKey)) {
                this.listeners.set(eventKey, array);
            }
            array.push({
                listener,
                times
            });
            return this;
        }
        checkFilt(eventKey, target) {
            for (const item of this.filters) {
                if (item.rule(eventKey, target)) {
                    item.listener(target, eventKey);
                }
            }
            return this;
        }
        checkEventKeyAvailable(eventKey) {
            if (this.eventKeyList.length) {
                return this.eventKeyList.includes(eventKey);
            }
            return true;
        }
    };
};
var EventDispatcher = mixin(Object);

export { EventDispatcher as default };
