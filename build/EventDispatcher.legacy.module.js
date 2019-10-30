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
            var keys = _this.listeners.keys();
            for (var key in keys) {
                _this.listeners.delete(key);
            }
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
            for (var _i = 0, _a = _this.flitters; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.rule(eventKey, target)) {
                    item.listener({
                        eventKey: eventKey,
                        target: target,
                        life: Infinity
                    });
                }
            }
            return _this;
        };
    }
    return EventDispatcher;
}());

export default EventDispatcher;
