/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

var EventDispatcher = /** @class */ (function () {
    function EventDispatcher() {
        var _this = this;
        /**
         * store all the filters
         */
        this.flitters = [];
        /**
         * store all the listeners by key
         */
        this.listeners = new Map();
        this.all = function (listener) {
            return _this.flit(function () { return true; }, listener);
        };
        this.clear = function (eventKey) {
            _this.listeners.delete(eventKey);
            return _this;
        };
        this.clearAll = function () {
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
        this.dispatch = function (eventKey, target) {
            var array = _this.listeners.get(eventKey) || [];
            var len = array.length;
            var item;
            for (var i = 0; i < len; i++) {
                item = array[i];
                item.listener({
                    eventKey: eventKey,
                    target: target,
                    life: --item.times
                });
                if (item.times <= 0) {
                    array.splice(i--, 1);
                    --len;
                }
            }
            return _this.checkFlit(eventKey, target);
        };
        this.flit = function (rule, listener) {
            _this.flitters.push({
                rule: rule,
                listener: listener
            });
            return _this;
        };
        this.off = function (eventKey, listener) {
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
        this.on = function (eventKey, listener) {
            return _this.times(eventKey, Infinity, listener);
        };
        this.once = function (eventKey, listener) {
            return _this.times(eventKey, 1, listener);
        };
        this.times = function (eventKey, times, listener) {
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
        this.checkFlit = function (eventKey, target) {
            var e_2, _a;
            try {
                for (var _b = __values(_this.flitters), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var item = _c.value;
                    if (item.rule(eventKey, target)) {
                        item.listener({
                            eventKey: eventKey,
                            target: target,
                            life: Infinity
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
    }
    return EventDispatcher;
}());

export default EventDispatcher;
