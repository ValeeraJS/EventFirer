(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.EventFire = {}));
})(this, (function (exports) { 'use strict';

	const RefWeakMap = new WeakMap();
	const allFilter = () => true;

	function checkFilt(firer, eventKey, target) {
	    for (const item of firer.filters) {
	        if (item.rule(eventKey, target)) {
	            item.listener(target, eventKey);
	        }
	    }
	    return firer;
	}
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	const mixin = (Base = Object) => {
	    return class EventFirer extends Base {
	        filters;
	        listeners;
	        constructor() {
	            super();
	            this.filters = [];
	            this.listeners = new Map();
	            RefWeakMap.set(this, {
	                fireIndex: -1,
	                isFire: false,
	                offCount: new Map()
	            });
	        }
	        all(listener, checkDuplicate) {
	            return this.filt(allFilter, listener, checkDuplicate);
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
	        filt(rule, listener, checkDuplicate) {
	            if (checkDuplicate) {
	                let f;
	                for (let i = 0, j = this.filters.length; i < j; i++) {
	                    f = this.filters[i];
	                    if (f.rule === rule && f.listener === listener) {
	                        return this;
	                    }
	                }
	            }
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
	            const ref = RefWeakMap.get(this);
	            ref.isFire = true;
	            const array = this.listeners.get(eventKey) || [];
	            // let len = array.length;
	            let item;
	            for (let i = 0; i < array.length; i++) {
	                ref.fireIndex = i;
	                item = array[i];
	                item.listener(target);
	                item.times--;
	                if (item.times <= 0) {
	                    array.splice(i--, 1);
	                }
	                const count = ref.offCount.get(eventKey);
	                if (count) {
	                    // 如果在当前事件触发时，监听器依次触发，已触发的被移除
	                    i -= count;
	                    ref.offCount.clear();
	                }
	            }
	            checkFilt(this, eventKey, target);
	            ref.fireIndex = -1;
	            ref.offCount.clear();
	            ref.isFire = false;
	            return this;
	        }
	        off(eventKey, listener) {
	            const array = this.listeners.get(eventKey);
	            const ref = RefWeakMap.get(this);
	            if (!array) {
	                return this;
	            }
	            const len = array.length;
	            for (let i = 0; i < len; i++) {
	                if (array[i].listener === listener) {
	                    array.splice(i, 1);
	                    if (ref.isFire && ref.fireIndex >= i) {
	                        const v = ref.offCount.get(eventKey) ?? 0;
	                        ref.offCount.set(eventKey, v + 1);
	                    }
	                    break;
	                }
	            }
	            return this;
	        }
	        on(eventKey, listener, checkDuplicate) {
	            if (eventKey instanceof Array) {
	                for (let i = 0, j = eventKey.length; i < j; i++) {
	                    this.times(eventKey[i], Infinity, listener, checkDuplicate);
	                }
	                return this;
	            }
	            return this.times(eventKey, Infinity, listener, checkDuplicate);
	        }
	        once(eventKey, listener, checkDuplicate) {
	            return this.times(eventKey, 1, listener, checkDuplicate);
	        }
	        times(eventKey, times, listener, checkDuplicate = false) {
	            const array = this.listeners.get(eventKey) || [];
	            if (!this.listeners.has(eventKey)) {
	                this.listeners.set(eventKey, array);
	            }
	            if (checkDuplicate) {
	                for (let i = 0, j = array.length; i < j; i++) {
	                    if (array[i].listener === listener) {
	                        return this;
	                    }
	                }
	            }
	            array.push({
	                listener,
	                times
	            });
	            return this;
	        }
	    };
	};
	const EventFirer = mixin(Object);

	const RefEventFirerMap = new WeakMap();
	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	function eventfirer(constructor) {
	    return new Proxy(constructor, {
	        construct(Target, args) {
	            const obj = new Target(...args);
	            const firer = new EventFirer();
	            RefEventFirerMap.set(obj, firer);
	            const arr = ClassOnKeyMap.get(constructor);
	            if (arr) {
	                for (let i = 0, len = arr.length; i < len; i++) {
	                    firer.on(arr[i].eventName, obj[arr[i].method].bind(obj));
	                }
	            }
	            return obj;
	        }
	    });
	}
	const fire = (eventName) => {
	    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	    return function (target, key) {
	        const func = target[key];
	        target[key] = function (...args) {
	            const v = func.call(this, ...args);
	            console.log(RefEventFirerMap.get(this));
	            RefEventFirerMap.get(this)?.fire(eventName, this);
	            return v;
	        };
	        return target[key];
	    };
	};
	const ClassOnKeyMap = new WeakMap();
	const on = (eventName) => {
	    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	    return function (target, key) {
	        let arr = ClassOnKeyMap.get(target.constructor);
	        if (!arr) {
	            arr = [];
	            ClassOnKeyMap.set(target.constructor, arr);
	        }
	        arr.push({
	            eventName,
	            method: key
	        });
	    };
	};

	exports.EventFirer = EventFirer;
	exports.eventfirer = eventfirer;
	exports.fire = fire;
	exports.mixin = mixin;
	exports.on = on;

}));
