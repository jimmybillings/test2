"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timecodeGenerator_1 = require("./timecodeGenerator");
var timecodeFormat_1 = require("./timecodeFormat");
var timecodeParser_1 = require("./timecodeParser");
var timecodeBase_1 = require("./timecodeBase");
var MATH = Math;
var Frame = (function () {
    function Frame(framesPerSecond, sourceBasedOffset) {
        if (sourceBasedOffset === void 0) { sourceBasedOffset = 0; }
        this.setFramesPerSecondTo(framesPerSecond);
        this.setSourceBasedOffsetTo(sourceBasedOffset);
    }
    Frame.stringToFrameNumber = function (framesPerSecond, string, format, base) {
        if (format === void 0) { format = timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION; }
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        return new Frame(framesPerSecond).setFromString(string, format, base).asFrameNumber();
    };
    ;
    Frame.prototype.setFramesPerSecondTo = function (value) {
        if (!value)
            return this;
        this.framesPerSecond = value;
        if (this.framesPerSecond === 23.98)
            this.framesPerSecond = 23.976;
        this.timecodeGenerator = new timecodeGenerator_1.TimecodeGenerator(this.framesPerSecond);
        this.timecodeParser = new timecodeParser_1.TimecodeParser(this.framesPerSecond);
        return this;
    };
    ;
    Frame.prototype.setSourceBasedOffsetTo = function (value) {
        this.sourceBasedOffsetFrames = typeof value === 'string' ? Frame.stringToFrameNumber(this.framesPerSecond, value) : value;
        return this;
    };
    ;
    Frame.prototype.setFromFrameNumber = function (frameNumber, base) {
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        this.frameNumber = frameNumber;
        if (base === timecodeBase_1.TimecodeBase.SOURCE_BASED)
            this.addFrames(-this.sourceBasedOffsetFrames);
        if (this.frameNumber < 0)
            this.frameNumber = 0;
        return this;
    };
    ;
    Frame.prototype.setFromSeconds = function (value, base) {
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        return this.setFromFrameNumber(MATH.round(this.framesPerSecond * value), base);
    };
    ;
    Frame.prototype.setFromString = function (string, format, base) {
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        return this.setFromFrameNumber(this.timecodeParser.asFrameNumber(string, format), base);
    };
    ;
    Frame.prototype.addFrames = function (numberOfFrames) {
        this.frameNumber += numberOfFrames;
        return this;
    };
    ;
    Frame.prototype.asFrameNumber = function (base) {
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        return this.frameNumberFor(base);
    };
    ;
    Frame.prototype.asSeconds = function (digitsAfterDecimal, base) {
        if (digitsAfterDecimal === void 0) { digitsAfterDecimal = -1; }
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        var seconds = this.frameNumberFor(base) / this.framesPerSecond;
        if (digitsAfterDecimal < 0)
            return seconds;
        var multiplier = MATH.pow(10, digitsAfterDecimal);
        return MATH.round(multiplier * seconds) / multiplier;
    };
    ;
    Frame.prototype.asMilliseconds = function (digitsAfterDecimal, base) {
        if (digitsAfterDecimal === void 0) { digitsAfterDecimal = 0; }
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        var multiplier = MATH.pow(10, digitsAfterDecimal);
        var seconds = this.frameNumberFor(base) / this.framesPerSecond;
        return MATH.round(1000 * multiplier * seconds) / multiplier;
    };
    ;
    Frame.prototype.asString = function (format, base) {
        if (base === void 0) { base = timecodeBase_1.TimecodeBase.STREAM_BASED; }
        switch (format) {
            case timecodeFormat_1.TimecodeFormat.FRAMECOUNT:
                return this.asFrameNumber(base) + '';
            case timecodeFormat_1.TimecodeFormat.SECONDS:
                return this.asSeconds(3, base).toFixed(3) + '';
            default:
                return this.timecodeGenerator.setFromFrameNumber(this.frameNumberFor(base)).asString(format);
        }
    };
    ;
    Frame.prototype.frameNumberFor = function (base) {
        return this.frameNumber + (base === timecodeBase_1.TimecodeBase.SOURCE_BASED ? this.sourceBasedOffsetFrames : 0);
    };
    ;
    return Frame;
}());
exports.Frame = Frame;
//# sourceMappingURL=frame.js.map