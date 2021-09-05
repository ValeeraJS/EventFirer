(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.EventDispatcher = factory());
}(this, (function () { 'use strict';

	/*! *****************************************************************************
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
	/* global Reflect, Promise */

	var extendStatics = function(d, b) {
	    extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	    return extendStatics(d, b);
	};

	function __extends(d, b) {
	    if (typeof b !== "function" && b !== null)
	        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	    extendStatics(d, b);
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}

	function __values(o) {
	    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	    if (m) return m.call(o);
	    if (o && typeof o.length === "number") return {
	        next: function () {
	            if (o && i >= o.length) o = void 0;
	            return { value: o && o[i++], done: !o };
	        }
	    };
	    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
	}

	// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
	var mixin = function (Base, eventKeyList) {
	    var _a;
	    if (Base === void 0) { Base = Object; }
	    if (eventKeyList === void 0) { eventKeyList = []; }
	    return _a = /** @class */ (function (_super) {
	            __extends(EventDispatcher, _super);
	            function EventDispatcher() {
	                var _this = _super !== null && _super.apply(this, arguments) || this;
	                _this.eventKeyList = eventKeyList;
	                /**
	                 * store all the filters
	                 */
	                _this.filters = [];
	                /**
	                 * store all the listeners by key
	                 */
	                _this.listeners = new Map();
	                _this.all = function (listener) {
	                    return _this.filt(function () { return true; }, listener);
	                };
	                _this.clearListenersByKey = function (eventKey) {
	                    _this.listeners.delete(eventKey);
	                    return _this;
	                };
	                _this.clearAllListeners = function () {
	                    var e_1, _a;
	                    var keys = _this.listeners.keys();
	                    try {
	                        for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
	                            var key = keys_1_1.value;
	                            _this.listeners.delete(key);
	                        }
	                    }
	                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
	                    finally {
	                        try {
	                            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
	                        }
	                        finally { if (e_1) throw e_1.error; }
	                    }
	                    return _this;
	                };
	                _this.filt = function (rule, listener) {
	                    _this.filters.push({
	                        listener: listener,
	                        rule: rule
	                    });
	                    return _this;
	                };
	                _this.fire = function (eventKey, target) {
	                    if (!_this.checkEventKeyAvailable(eventKey)) {
	                        console.error("EventDispatcher couldn't dispatch the event since EventKeyList doesn't contains key: ", eventKey);
	                        return _this;
	                    }
	                    var array = _this.listeners.get(eventKey) || [];
	                    var len = array.length;
	                    var item;
	                    for (var i = 0; i < len; i++) {
	                        item = array[i];
	                        item.listener({
	                            eventKey: eventKey,
	                            life: --item.times,
	                            target: target
	                        });
	                        if (item.times <= 0) {
	                            array.splice(i--, 1);
	                            --len;
	                        }
	                    }
	                    return _this.checkFilt(eventKey, target);
	                };
	                _this.off = function (eventKey, listener) {
	                    var array = _this.listeners.get(eventKey);
	                    if (!array) {
	                        return _this;
	                    }
	                    var len = array.length;
	                    for (var i = 0; i < len; i++) {
	                        if (array[i].listener === listener) {
	                            array.splice(i, 1);
	                            break;
	                        }
	                    }
	                    return _this;
	                };
	                _this.on = function (eventKey, listener) {
	                    return _this.times(eventKey, Infinity, listener);
	                };
	                _this.once = function (eventKey, listener) {
	                    return _this.times(eventKey, 1, listener);
	                };
	                _this.times = function (eventKey, times, listener) {
	                    if (!_this.checkEventKeyAvailable(eventKey)) {
	                        console.error("EventDispatcher couldn't add the listener: ", listener, "since EventKeyList doesn't contains key: ", eventKey);
	                        return _this;
	                    }
	                    var array = _this.listeners.get(eventKey) || [];
	                    if (!_this.listeners.has(eventKey)) {
	                        _this.listeners.set(eventKey, array);
	                    }
	                    array.push({
	                        listener: listener,
	                        times: times
	                    });
	                    return _this;
	                };
	                _this.checkFilt = function (eventKey, target) {
	                    var e_2, _a;
	                    try {
	                        for (var _b = __values(_this.filters), _c = _b.next(); !_c.done; _c = _b.next()) {
	                            var item = _c.value;
	                            if (item.rule(eventKey, target)) {
	                                item.listener({
	                                    eventKey: eventKey,
	                                    life: Infinity,
	                                    target: target
	                                });
	                            }
	                        }
	                    }
	                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
	                    finally {
	                        try {
	                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
	                        }
	                        finally { if (e_2) throw e_2.error; }
	                    }
	                    return _this;
	                };
	                _this.checkEventKeyAvailable = function (eventKey) {
	                    if (_this.eventKeyList.length) {
	                        return _this.eventKeyList.includes(eventKey);
	                    }
	                    return true;
	                };
	                return _this;
	            }
	            return EventDispatcher;
	        }(Base)),
	        _a.mixin = mixin,
	        _a;
	};
	var EventDispatcher = mixin(Object);

	return EventDispatcher;

})));
//# sourceMappingURL=EventDispatcher.legacy.js.map
