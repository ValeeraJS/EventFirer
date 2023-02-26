/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const mixin = (Base = Object) => {
    return class EventFirer extends Base {
        #isFire = false;
        #fireIndex = -1;
        #offCount = new Map();
        filters;
        listeners;
        constructor() {
            super();
            this.filters = [];
            this.listeners = this["__proto__"].listeners ?? new Map();
        }
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
    };
};
const EventFirer = mixin(Object);

const fire = (eventName) => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function (target, key) {
        const func = target[key];
        target[key] = function (...args) {
            const v = func(...args);
            this.fire(eventName, this);
            return v;
        };
        return target[key];
    };
};

const on = (eventName) => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return function (target, key) {
        if (!target.listeners) {
            target.listeners = new Map();
        }
        target.on(eventName, (...args) => {
            target[key](...args);
        });
    };
};

class A extends EventFirer {
    log(target) {
        console.log(this, target);
    }
    dispatch() {
        console.log("???");
    }
}
__decorate([
    on("aaa")
], A.prototype, "log", null);
__decorate([
    fire("aaa")
], A.prototype, "dispatch", null);

export { A, EventFirer, mixin };
