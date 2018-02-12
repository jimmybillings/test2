"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../wazee-frame-formatter/index");
var TimecodePipe = (function () {
    function TimecodePipe() {
    }
    TimecodePipe.prototype.transform = function (frame) {
        return frame ? frame.asString(index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION) : '';
    };
    TimecodePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'timecode' },] },
    ];
    TimecodePipe.ctorParameters = function () { return []; };
    return TimecodePipe;
}());
exports.TimecodePipe = TimecodePipe;
//# sourceMappingURL=timecode.pipe.js.map