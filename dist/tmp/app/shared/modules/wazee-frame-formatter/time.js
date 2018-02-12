"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Time = (function () {
    function Time(framesPerSecond) {
        this.MINUTES_IN_AN_HOUR = 60;
        this.SECONDS_IN_A_MINUTE = 60;
        this.SECONDS_IN_AN_HOUR = this.SECONDS_IN_A_MINUTE * this.MINUTES_IN_AN_HOUR;
        this.clear();
        this.integralFramesPerSecond = Math.round(framesPerSecond);
    }
    Time.prototype.clear = function () {
        this._hours = this._minutes = this._seconds = this._frames = 0;
    };
    ;
    Object.defineProperty(Time.prototype, "frames", {
        get: function () {
            this.rollComponentsIfNecessary();
            return this._frames;
        },
        set: function (frames) {
            this._frames = frames;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Time.prototype.addFrames = function (numberOfFrames) {
        this._frames += numberOfFrames;
    };
    ;
    Object.defineProperty(Time.prototype, "seconds", {
        get: function () {
            this.rollComponentsIfNecessary();
            return this._seconds;
        },
        set: function (seconds) {
            this._seconds = seconds;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Time.prototype, "minutes", {
        get: function () {
            this.rollComponentsIfNecessary();
            return this._minutes;
        },
        set: function (minutes) {
            this._minutes = minutes;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Object.defineProperty(Time.prototype, "hours", {
        get: function () {
            this.rollComponentsIfNecessary();
            return this._hours;
        },
        set: function (hours) {
            this._hours = hours;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    Time.prototype.hoursMultipleOf = function (value) {
        return (this._hours % value) === 0;
    };
    ;
    Time.prototype.minutesMultipleOf = function (value) {
        return (this._minutes % value) === 0;
    };
    ;
    Time.prototype.minutesOneOf = function () {
        var _this = this;
        var minuteValues = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            minuteValues[_i] = arguments[_i];
        }
        return minuteValues.some(function (value) { return value === _this._minutes; });
    };
    ;
    Time.prototype.asFrameNumber = function () {
        return this.totalWholeSeconds() * this.integralFramesPerSecond + this._frames;
    };
    ;
    Time.prototype.totalWholeSeconds = function () {
        this.rollComponentsIfNecessary();
        return this._hours * this.SECONDS_IN_AN_HOUR + this._minutes * this.SECONDS_IN_A_MINUTE + this._seconds;
    };
    ;
    Time.prototype.rollComponentsIfNecessary = function () {
        while (this._frames < 0) {
            this._frames += this.integralFramesPerSecond;
            this._seconds -= 1;
        }
        while (this._seconds < 0) {
            this._seconds += this.SECONDS_IN_A_MINUTE;
            this._minutes -= 1;
        }
        while (this._minutes < 0) {
            this._minutes += this.MINUTES_IN_AN_HOUR;
            this._hours -= 1;
        }
        if (this._frames >= this.integralFramesPerSecond) {
            this._seconds += Math.floor(this._frames / this.integralFramesPerSecond);
            this._frames %= this.integralFramesPerSecond;
        }
        if (this._seconds >= this.SECONDS_IN_A_MINUTE) {
            this._minutes += Math.floor(this._seconds / this.SECONDS_IN_A_MINUTE);
            this._seconds %= this.SECONDS_IN_A_MINUTE;
        }
        if (this._minutes >= this.MINUTES_IN_AN_HOUR) {
            this._hours += Math.floor(this._minutes / this.MINUTES_IN_AN_HOUR);
            this._minutes %= this.MINUTES_IN_AN_HOUR;
        }
    };
    ;
    return Time;
}());
exports.Time = Time;
;
//# sourceMappingURL=time.js.map