"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var time_1 = require("./time");
var timecodeFormat_1 = require("./timecodeFormat");
var timecodeGenerator_1 = require("./timecodeGenerator");
var TimecodeParser = (function () {
    function TimecodeParser(framesPerSecond) {
        this.framesPerSecond = framesPerSecond;
        this.timecodeGenerator = new timecodeGenerator_1.TimecodeGenerator(framesPerSecond);
        this.time = new time_1.Time(framesPerSecond);
        var integralFramesPerSecond = Math.round(framesPerSecond);
        this.accurateFramesPerSecond =
            framesPerSecond === integralFramesPerSecond ? framesPerSecond : integralFramesPerSecond * 1000 / 1001;
    }
    TimecodeParser.prototype.asFrameNumber = function (string, format) {
        this.parseTimeFrom(string, format);
        this.adjustFramesFor(format);
        return this.time.asFrameNumber();
    };
    TimecodeParser.prototype.parseTimeFrom = function (string, format) {
        if (format === timecodeFormat_1.TimecodeFormat.SECONDS) {
            this.time.clear();
            this.time.frames = Math.round(parseFloat(string) * this.accurateFramesPerSecond);
            return this;
        }
        if (format === timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION) {
            string = this.convertToFullTimecode(string);
        }
        this.timePieces = string.replace(';', ':').split(':').reverse();
        while (this.timePieces.length < 4) {
            this.timePieces.push('0');
        }
        this.time.clear();
        this.time.hours = this.getTimePieceAtIndex(3);
        this.time.minutes = this.getTimePieceAtIndex(2);
        this.time.seconds = this.getTimePieceAtIndex(1);
        this.time.frames = this.getTimePieceAtIndex(0);
        return this;
    };
    TimecodeParser.prototype.convertToFullTimecode = function (timecode) {
        if (timecode.indexOf(';') >= 0)
            return timecode;
        var colons = timecode.match(/:/g);
        if (colons && colons.length === 3)
            return timecode;
        return timecode + ';00';
    };
    TimecodeParser.prototype.getTimePieceAtIndex = function (index) {
        return parseInt(this.timePieces[index], 10) || 0;
    };
    TimecodeParser.prototype.adjustFramesFor = function (format) {
        switch (format) {
            case timecodeFormat_1.TimecodeFormat.DROPFRAME:
                this.time.addFrames(-timecodeGenerator_1.TimecodeGenerator.extraFramesNeededForDropFrame(this.framesPerSecond, this.time));
                break;
            case timecodeFormat_1.TimecodeFormat.SIMPLE_TIME_CONVERSION:
            case timecodeFormat_1.TimecodeFormat.MINIMAL_TIME_CONVERSION:
                var adjustedFrames = Math.round(this.time.totalWholeSeconds() * this.accurateFramesPerSecond) + this.time.frames;
                this.time.clear();
                this.time.frames = adjustedFrames;
        }
        return this;
    };
    return TimecodeParser;
}());
exports.TimecodeParser = TimecodeParser;
//# sourceMappingURL=timecodeParser.js.map