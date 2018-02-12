"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ValuesPipe = (function () {
    function ValuesPipe() {
    }
    ValuesPipe.prototype.transform = function (value, args) {
        if (args === void 0) { args = null; }
        return Object.keys(value).map(function (key) {
            var pair = {};
            var k = 'key';
            var v = 'value';
            pair[k] = key;
            pair[v] = value[key];
            return pair;
        });
    };
    ValuesPipe.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'values'
                },] },
    ];
    ValuesPipe.ctorParameters = function () { return []; };
    return ValuesPipe;
}());
exports.ValuesPipe = ValuesPipe;
//# sourceMappingURL=values.pipe.js.map