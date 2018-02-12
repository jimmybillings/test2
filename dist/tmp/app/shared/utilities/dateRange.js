"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var common_functions_1 = require("./common.functions");
var DateRange = (function () {
    function DateRange() {
        this.start = null;
        this.end = null;
        this.beginningOfTime = '1000-01-01';
        this.endOfTime = '3000-01-01';
        this.delimiter = ' - ';
    }
    DateRange.prototype.get = function (key) {
        switch (key) {
            case 'start': return this.start;
            case 'end': return this.end;
            default: throw new TypeError("Invalid date range key '" + key + "'");
        }
    };
    DateRange.prototype.set = function (key, value) {
        if (value && value.indexOf(this.delimiter) !== -1) {
            var _a = value.split(this.delimiter), start = _a[0], end = _a[1];
            this.set(key, key === 'start' ? start : end);
            return;
        }
        switch (key) {
            case 'start':
                this.start =
                    value === this.beginningOfTime ? null : this.format(value);
                break;
            case 'end':
                this.end =
                    value === this.endOfTime ? null : this.format(value);
                break;
            default:
                throw new TypeError("Invalid date range key '" + key + "'");
        }
    };
    DateRange.prototype.toString = function () {
        var start = this.start ? this.format(this.start) : this.beginningOfTime;
        var end = this.end ? this.format(this.end) : this.endOfTime;
        return "" + start + this.delimiter + end;
    };
    DateRange.prototype.toHumanString = function () {
        if (this.start && this.end) {
            return "" + this.humanFormat(this.start) + this.delimiter + this.humanFormat(this.end);
        }
        if (!this.start && !this.end) {
            return 'Any date';
        }
        if (!this.start) {
            return "On or before " + this.humanFormat(this.end);
        }
        return "On or after " + this.humanFormat(this.start);
    };
    DateRange.prototype.format = function (date) {
        return new Date(date).toJSON().slice(0, 10);
    };
    DateRange.prototype.humanFormat = function (date) {
        var value = common_functions_1.Common.convertToDateInstance(date);
        return value.getMonth() + 1 + '/' + value.getDate() + '/' + value.getFullYear();
    };
    return DateRange;
}());
exports.DateRange = DateRange;
//# sourceMappingURL=dateRange.js.map