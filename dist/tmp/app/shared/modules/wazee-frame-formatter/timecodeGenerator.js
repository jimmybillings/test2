"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var timecodeFormat_1 = require("./timecodeFormat");
var time_1 = require("./time");
exports.DEFAULT_TIME_CODE_LENGTH = 'hh:mm:ss:ff'.length;
var TimecodeGenerator = (function () {
    function TimecodeGenerator(framesPerSecond) {
        this.framesPerSecond = framesPerSecond;
        this.time = new time_1.Time(this.framesPerSecond);
        var integralFramesPerSecond = Math.round(this.framesPerSecond);
        this.accurateFramesPerSecond =
            this.framesPerSecond === integralFramesPerSecond ? this.framesPerSecond : integralFramesPerSecond * 1000 / 1001;
    }
    TimecodeGenerator.extraFramesNeededForDropFrame = function (framesPerSecond, time) {
        switch (framesPerSecond) {
            case 29.97: return TimecodeGenerator.extraFramesNeededFor2997DropFrame(time);
            case 59.94: return TimecodeGenerator.extraFramesNeededFor5994DropFrame(time);
            case 23.976: return TimecodeGenerator.extraFramesNeededFor23976DropFrame(time);
            default: return 0;
        }
    };
    TimecodeGenerator.extraFramesNeededFor2997DropFrame = function (time) {
        var minutes = time.minutes;
        var minutesTensDigit = Math.floor(minutes / 10);
        var minutesOnesDigit = minutes % 10;
        return (time.hours * 108) + (minutesTensDigit * 18) + (minutesOnesDigit * 2);
    };
    TimecodeGenerator.extraFramesNeededFor5994DropFrame = function (time) {
        return TimecodeGenerator.extraFramesNeededFor2997DropFrame(time) * 2;
    };
    TimecodeGenerator.extraFramesNeededFor23976DropFrame = function (time) {
        var hours = time.hours;
        var minutes = time.minutes;
        var extra = hours * 60;
        extra += (Math.floor((hours + 1) / 3) + Math.floor(hours / 3)) * 26;
        extra += minutes;
        if (!time.hoursMultipleOf(3)) {
            extra += Math.floor(minutes * 0.5);
            [16, 30, 44].forEach(function (specialMinute) { if (minutes >= specialMinute)
                extra -= 1; });
        }
        return extra;
    };
    TimecodeGenerator.prototype.setFromFrameNumber = function (frameNumber) {
        this.frameNumber = frameNumber;
        return this;
    };
    TimecodeGenerator.prototype.asString = function (format, minLength) {
        if (minLength === void 0) { minLength = exports.DEFAULT_TIME_CODE_LENGTH; }
        var frameDelimiter = ':';
        this.time.clear();
        switch (format) {
            case timecodeFormat_1.TimecodeFormat.NONDROPFRAME:
                this.time.frames = this.frameNumber;
                break;
            case timecodeFormat_1.TimecodeFormat.DROPFRAME:
                this.time.frames = this.frameNumber;
                this.addDropFramesIfNecessary();
                frameDelimiter = ';';
                break;
            case timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION:
            case timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION:
                var rawSeconds = this.frameNumber / this.accurateFramesPerSecond;
                var truncatedSeconds = Math.floor(rawSeconds);
                this.time.seconds = truncatedSeconds;
                this.time.frames = Math.round((rawSeconds - truncatedSeconds) * this.framesPerSecond);
                ;
                frameDelimiter = ';';
        }
        return format === timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION
            ? this.minimallyFormatTime()
            : this.formatTime(minLength, frameDelimiter);
    };
    TimecodeGenerator.prototype.addDropFramesIfNecessary = function () {
        var originalHours = this.time.hours;
        var originalMinutes = this.time.minutes;
        var extraFrames = TimecodeGenerator.extraFramesNeededForDropFrame(this.framesPerSecond, this.time);
        if (extraFrames <= 0)
            return null;
        this.time.addFrames(extraFrames);
        var newHours = this.time.hours;
        var newMinutes = this.time.minutes;
        switch (this.framesPerSecond) {
            case 29.97:
                if (newMinutes > originalMinutes && !this.time.minutesMultipleOf(10))
                    this.time.addFrames(2);
                break;
            case 59.94:
                if (newMinutes > originalMinutes && !this.time.minutesMultipleOf(10))
                    this.time.addFrames(4);
                break;
            case 23.976:
                var extraExtraFrames = 0;
                if (newMinutes > originalMinutes) {
                    extraExtraFrames += newMinutes - originalMinutes;
                    if (!this.time.hoursMultipleOf(3) && this.time.minutesMultipleOf(2) && !this.time.minutesOneOf(0, 16, 30, 44)) {
                        extraExtraFrames += 1;
                    }
                }
                if (newHours > originalHours) {
                    extraExtraFrames += 1;
                }
                this.time.addFrames(extraExtraFrames);
        }
    };
    TimecodeGenerator.prototype.formatTime = function (minLength, frameDelimiter) {
        if (frameDelimiter === void 0) { frameDelimiter = ':'; }
        var timecode = [
            this.time.hours,
            ':',
            this.zeroFillTo(2, this.time.minutes),
            ':',
            this.zeroFillTo(2, this.time.seconds),
            frameDelimiter,
            this.zeroFillTo(2, this.time.frames)
        ].join('');
        return this.zeroFillTo(minLength, timecode);
    };
    TimecodeGenerator.prototype.minimallyFormatTime = function () {
        var _a = this.time, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds, frames = _a.frames;
        var outputPieces = [this.zeroFillTo(2, seconds)];
        if (minutes > 0)
            outputPieces.unshift(this.zeroFillTo(2, minutes) + ':');
        if (hours > 0)
            outputPieces.unshift(this.zeroFillTo(2, hours) + ':');
        if (frames > 0)
            outputPieces.push(';' + this.zeroFillTo(2, frames));
        return outputPieces.join('');
    };
    TimecodeGenerator.prototype.zeroFillTo = function (minNumberOfDigits, input) {
        var output = String(input);
        while (output.length < minNumberOfDigits) {
            output = "0" + output;
        }
        return output;
    };
    return TimecodeGenerator;
}());
exports.TimecodeGenerator = TimecodeGenerator;
//# sourceMappingURL=timecodeGenerator.js.map