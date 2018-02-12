"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var index_1 = require("../../../../wazee-frame-formatter/index");
var TimecodeFormatButtonComponent = (function () {
    function TimecodeFormatButtonComponent() {
        this.request = new core_1.EventEmitter();
        this.timecode = index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION;
        this.seconds = index_1.TimecodeFormat.SECONDS;
        this.streamBased = index_1.TimecodeBase.STREAM_BASED;
        this.sourceBased = index_1.TimecodeBase.SOURCE_BASED;
    }
    Object.defineProperty(TimecodeFormatButtonComponent.prototype, "currentTimecodeFormatBaseTranslationKey", {
        get: function () {
            var base = this.playerState.timecodeBase === index_1.TimecodeBase.STREAM_BASED ? 'STREAM' : 'SOURCE';
            var format = this.playerState.timecodeFormat === index_1.TimecodeFormat.SIMPLE_TIME_CONVERSION ? 'TIMECODE' : 'SECONDS';
            return "ASSET.ADV_PLAYER.TIMECODE_FORMAT_BASE_DISPLAY." + base + "_BASED_" + format;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimecodeFormatButtonComponent.prototype, "currentFrame", {
        get: function () {
            return this.playerState.currentFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TimecodeFormatButtonComponent.prototype, "canSelectSourceBased", {
        get: function () {
            return !!this.playerState.currentFrame && this.playerState.currentFrame.sourceBasedOffsetFrames > 0;
        },
        enumerable: true,
        configurable: true
    });
    TimecodeFormatButtonComponent.prototype.selectStreamBasedTimecode = function () {
        this.emitRequest(this.timecode, this.streamBased);
    };
    TimecodeFormatButtonComponent.prototype.selectSourceBasedTimecode = function () {
        this.emitRequest(this.timecode, this.sourceBased);
    };
    TimecodeFormatButtonComponent.prototype.selectStreamBasedSeconds = function () {
        this.emitRequest(this.seconds, this.streamBased);
    };
    TimecodeFormatButtonComponent.prototype.emitRequest = function (format, base) {
        this.request.emit({ type: 'CHANGE_TIMECODE_DISPLAY', format: format, base: base });
    };
    TimecodeFormatButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-timecode-format-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-icon-button title=\"{{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_BTN_TITLE' | translate }}\" [matMenuTriggerFor]=\"menu\">\n      <mat-icon>access_time</mat-icon>\n      {{ currentTimecodeFormatBaseTranslationKey | translate }}\n    </button>\n\n    <mat-menu class=\"timecode-format-menu\" #menu=\"matMenu\">\n      <button mat-menu-item (click)=\"selectStreamBasedTimecode()\">\n        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.STREAM_BASED_TIMECODE' | translate }}\n        ({{ currentFrame | playerTimecode:playerState:timecode:streamBased }})\n      </button>\n\n      <button mat-menu-item [disabled]=\"!canSelectSourceBased\" (click)=\"selectSourceBasedTimecode()\">\n        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.SOURCE_BASED_TIMECODE' | translate }}\n        ({{ currentFrame | playerTimecode:playerState:timecode:sourceBased }})\n      </button>\n\n      <button mat-menu-item (click)=\"selectStreamBasedSeconds()\">\n        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.STREAM_BASED_SECONDS' | translate }}\n        ({{ currentFrame | playerTimecode:playerState:seconds:streamBased }})\n      </button>\n    </mat-menu>\n  "
                },] },
    ];
    TimecodeFormatButtonComponent.ctorParameters = function () { return []; };
    TimecodeFormatButtonComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return TimecodeFormatButtonComponent;
}());
exports.TimecodeFormatButtonComponent = TimecodeFormatButtonComponent;
//# sourceMappingURL=timecode-format-button.component.js.map