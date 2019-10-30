class EventDispatcher {
    constructor() {
        /**
         * store all the filters
         */
        this.flitters = [];
        /**
         * store all the listeners by key
         */
        this.listeners = new Map();
        this.all = (listener) => {
            return this.flit(() => true, listener);
        };
        this.clear = (eventKey) => {
            this.listeners.delete(eventKey);
            return this;
        };
        this.clearAll = () => {
            const keys = this.listeners.keys();
            for (let key of keys) {
                this.listeners.delete(key);
            }
            return this;
        };
        this.dispatch = (eventKey, target) => {
            const array = this.listeners.get(eventKey) || [];
            let len = array.length;
            let item;
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
        };
        this.flit = (rule, listener) => {
            this.flitters.push({
                rule,
                listener
            });
            return this;
        };
        this.off = (eventKey, listener) => {
            const array = this.listeners.get(eventKey);
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
        };
        this.on = (eventKey, listener) => {
            return this.times(eventKey, Infinity, listener);
        };
        this.once = (eventKey, listener) => {
            return this.times(eventKey, 1, listener);
        };
        this.times = (eventKey, times, listener) => {
            let array = this.listeners.get(eventKey) || [];
            if (!this.listeners.has(eventKey)) {
                this.listeners.set(eventKey, array);
            }
            array.push({
                listener,
                times
            });
            return this;
        };
        this.checkFlit = (eventKey, target) => {
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
        };
    }
}

export default EventDispatcher;
