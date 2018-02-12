"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../wazee-frame-formatter/index");
var common_functions_1 = require("../../../utilities/common.functions");
var PlayerTimecodePipe = (function () {
    function PlayerTimecodePipe() {
    }
    PlayerTimecodePipe.prototype.transform = function (frame, state, format, base) {
        if (!frame)
            return '';
        var chosenFormat = common_functions_1.Common.isNullOrUndefined(format)
            ? (state ? state.timecodeFormat : index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION)
            : format;
        var chosenBase = common_functions_1.Common.isNullOrUndefined(base)
            ? (state ? state.timecodeBase : index_1.TimecodeBase.STREAM_BASED)
            : base;
        return frame.asString(chosenFormat, chosenBase);
    };
    PlayerTimecodePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'playerTimecode' },] },
    ];
    PlayerTimecodePipe.ctorParameters = function () { return []; };
    return PlayerTimecodePipe;
}());
exports.PlayerTimecodePipe = PlayerTimecodePipe;
//# sourceMappingURL=player-timecode.pipe.js.map