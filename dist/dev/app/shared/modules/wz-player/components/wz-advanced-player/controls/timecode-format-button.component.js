"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], TimecodeFormatButtonComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], TimecodeFormatButtonComponent.prototype, "request", void 0);
    TimecodeFormatButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-timecode-format-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-icon-button title=\"{{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_BTN_TITLE' | translate }}\" [matMenuTriggerFor]=\"menu\">\n      <mat-icon>access_time</mat-icon>\n      {{ currentTimecodeFormatBaseTranslationKey | translate }}\n    </button>\n\n    <mat-menu class=\"timecode-format-menu\" #menu=\"matMenu\">\n      <button mat-menu-item (click)=\"selectStreamBasedTimecode()\">\n        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.STREAM_BASED_TIMECODE' | translate }}\n        ({{ currentFrame | playerTimecode:playerState:timecode:streamBased }})\n      </button>\n\n      <button mat-menu-item [disabled]=\"!canSelectSourceBased\" (click)=\"selectSourceBasedTimecode()\">\n        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.SOURCE_BASED_TIMECODE' | translate }}\n        ({{ currentFrame | playerTimecode:playerState:timecode:sourceBased }})\n      </button>\n\n      <button mat-menu-item (click)=\"selectStreamBasedSeconds()\">\n        {{ 'ASSET.ADV_PLAYER.TIMECODE_FORMAT_SELECT.STREAM_BASED_SECONDS' | translate }}\n        ({{ currentFrame | playerTimecode:playerState:seconds:streamBased }})\n      </button>\n    </mat-menu>\n  "
        })
    ], TimecodeFormatButtonComponent);
    return TimecodeFormatButtonComponent;
}());
exports.TimecodeFormatButtonComponent = TimecodeFormatButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvdGltZWNvZGUtZm9ybWF0LWJ1dHRvbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUFHaEcsaUVBQThGO0FBK0I5RjtJQTdCQTtRQStCWSxZQUFPLEdBQStDLElBQUksbUJBQVksRUFBZ0MsQ0FBQztRQUVqRyxhQUFRLEdBQW1CLHNCQUFjLENBQUMsc0JBQXNCLENBQUM7UUFDakUsWUFBTyxHQUFtQixzQkFBYyxDQUFDLE9BQU8sQ0FBQztRQUNqRCxnQkFBVyxHQUFpQixvQkFBWSxDQUFDLFlBQVksQ0FBQztRQUN0RCxnQkFBVyxHQUFpQixvQkFBWSxDQUFDLFlBQVksQ0FBQztJQStCeEUsQ0FBQztJQTdCQyxzQkFBVyxrRkFBdUM7YUFBbEQ7WUFDRSxJQUFNLElBQUksR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksS0FBSyxvQkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDdkcsSUFBTSxNQUFNLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLEtBQUssc0JBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDMUgsTUFBTSxDQUFDLG1EQUFpRCxJQUFJLGVBQVUsTUFBUSxDQUFDO1FBQ2pGLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsdURBQVk7YUFBdkI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUM7UUFDdkMsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrREFBb0I7YUFBL0I7WUFDRSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLHVCQUF1QixHQUFHLENBQUMsQ0FBQztRQUN0RyxDQUFDOzs7T0FBQTtJQUVNLGlFQUF5QixHQUFoQztRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLGlFQUF5QixHQUFoQztRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVNLGdFQUF3QixHQUEvQjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVPLG1EQUFXLEdBQW5CLFVBQW9CLE1BQXNCLEVBQUUsSUFBa0I7UUFDNUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBcENRO1FBQVIsWUFBSyxFQUFFOztzRUFBMEI7SUFDeEI7UUFBVCxhQUFNLEVBQUU7a0NBQVUsbUJBQVk7a0VBQWtGO0lBRnRHLDZCQUE2QjtRQTdCekMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFFBQVEsRUFBRSxrb0NBc0JUO1NBQ0YsQ0FBQztPQUVXLDZCQUE2QixDQXNDekM7SUFBRCxvQ0FBQztDQXRDRCxBQXNDQyxJQUFBO0FBdENZLHNFQUE2QiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL3RpbWVjb2RlLWZvcm1hdC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFBsYXllclN0YXRlLCBDaGFuZ2VUaW1lY29kZURpc3BsYXlSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vaW50ZXJmYWNlcy9wbGF5ZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZyYW1lLCBUaW1lY29kZUZvcm1hdCwgVGltZWNvZGVCYXNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otdGltZWNvZGUtZm9ybWF0LWJ1dHRvbicsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxidXR0b24gbWF0LWljb24tYnV0dG9uIHRpdGxlPVwie3sgJ0FTU0VULkFEVl9QTEFZRVIuVElNRUNPREVfRk9STUFUX0JUTl9USVRMRScgfCB0cmFuc2xhdGUgfX1cIiBbbWF0TWVudVRyaWdnZXJGb3JdPVwibWVudVwiPlxuICAgICAgPG1hdC1pY29uPmFjY2Vzc190aW1lPC9tYXQtaWNvbj5cbiAgICAgIHt7IGN1cnJlbnRUaW1lY29kZUZvcm1hdEJhc2VUcmFuc2xhdGlvbktleSB8IHRyYW5zbGF0ZSB9fVxuICAgIDwvYnV0dG9uPlxuXG4gICAgPG1hdC1tZW51IGNsYXNzPVwidGltZWNvZGUtZm9ybWF0LW1lbnVcIiAjbWVudT1cIm1hdE1lbnVcIj5cbiAgICAgIDxidXR0b24gbWF0LW1lbnUtaXRlbSAoY2xpY2spPVwic2VsZWN0U3RyZWFtQmFzZWRUaW1lY29kZSgpXCI+XG4gICAgICAgIHt7ICdBU1NFVC5BRFZfUExBWUVSLlRJTUVDT0RFX0ZPUk1BVF9TRUxFQ1QuU1RSRUFNX0JBU0VEX1RJTUVDT0RFJyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAoe3sgY3VycmVudEZyYW1lIHwgcGxheWVyVGltZWNvZGU6cGxheWVyU3RhdGU6dGltZWNvZGU6c3RyZWFtQmFzZWQgfX0pXG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIFtkaXNhYmxlZF09XCIhY2FuU2VsZWN0U291cmNlQmFzZWRcIiAoY2xpY2spPVwic2VsZWN0U291cmNlQmFzZWRUaW1lY29kZSgpXCI+XG4gICAgICAgIHt7ICdBU1NFVC5BRFZfUExBWUVSLlRJTUVDT0RFX0ZPUk1BVF9TRUxFQ1QuU09VUkNFX0JBU0VEX1RJTUVDT0RFJyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAoe3sgY3VycmVudEZyYW1lIHwgcGxheWVyVGltZWNvZGU6cGxheWVyU3RhdGU6dGltZWNvZGU6c291cmNlQmFzZWQgfX0pXG4gICAgICA8L2J1dHRvbj5cblxuICAgICAgPGJ1dHRvbiBtYXQtbWVudS1pdGVtIChjbGljayk9XCJzZWxlY3RTdHJlYW1CYXNlZFNlY29uZHMoKVwiPlxuICAgICAgICB7eyAnQVNTRVQuQURWX1BMQVlFUi5USU1FQ09ERV9GT1JNQVRfU0VMRUNULlNUUkVBTV9CQVNFRF9TRUNPTkRTJyB8IHRyYW5zbGF0ZSB9fVxuICAgICAgICAoe3sgY3VycmVudEZyYW1lIHwgcGxheWVyVGltZWNvZGU6cGxheWVyU3RhdGU6c2Vjb25kczpzdHJlYW1CYXNlZCB9fSlcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvbWF0LW1lbnU+XG4gIGBcbn0pXG5cbmV4cG9ydCBjbGFzcyBUaW1lY29kZUZvcm1hdEJ1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHBsYXllclN0YXRlOiBQbGF5ZXJTdGF0ZTtcbiAgQE91dHB1dCgpIHJlcXVlc3Q6IEV2ZW50RW1pdHRlcjxDaGFuZ2VUaW1lY29kZURpc3BsYXlSZXF1ZXN0PiA9IG5ldyBFdmVudEVtaXR0ZXI8Q2hhbmdlVGltZWNvZGVEaXNwbGF5UmVxdWVzdD4oKTtcblxuICBwdWJsaWMgcmVhZG9ubHkgdGltZWNvZGU6IFRpbWVjb2RlRm9ybWF0ID0gVGltZWNvZGVGb3JtYXQuU0lNUExFX1RJTUVfQ09OVkVSU0lPTjtcbiAgcHVibGljIHJlYWRvbmx5IHNlY29uZHM6IFRpbWVjb2RlRm9ybWF0ID0gVGltZWNvZGVGb3JtYXQuU0VDT05EUztcbiAgcHVibGljIHJlYWRvbmx5IHN0cmVhbUJhc2VkOiBUaW1lY29kZUJhc2UgPSBUaW1lY29kZUJhc2UuU1RSRUFNX0JBU0VEO1xuICBwdWJsaWMgcmVhZG9ubHkgc291cmNlQmFzZWQ6IFRpbWVjb2RlQmFzZSA9IFRpbWVjb2RlQmFzZS5TT1VSQ0VfQkFTRUQ7XG5cbiAgcHVibGljIGdldCBjdXJyZW50VGltZWNvZGVGb3JtYXRCYXNlVHJhbnNsYXRpb25LZXkoKTogc3RyaW5nIHtcbiAgICBjb25zdCBiYXNlOiBzdHJpbmcgPSB0aGlzLnBsYXllclN0YXRlLnRpbWVjb2RlQmFzZSA9PT0gVGltZWNvZGVCYXNlLlNUUkVBTV9CQVNFRCA/ICdTVFJFQU0nIDogJ1NPVVJDRSc7XG4gICAgY29uc3QgZm9ybWF0OiBzdHJpbmcgPSB0aGlzLnBsYXllclN0YXRlLnRpbWVjb2RlRm9ybWF0ID09PSBUaW1lY29kZUZvcm1hdC5TSU1QTEVfVElNRV9DT05WRVJTSU9OID8gJ1RJTUVDT0RFJyA6ICdTRUNPTkRTJztcbiAgICByZXR1cm4gYEFTU0VULkFEVl9QTEFZRVIuVElNRUNPREVfRk9STUFUX0JBU0VfRElTUExBWS4ke2Jhc2V9X0JBU0VEXyR7Zm9ybWF0fWA7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGN1cnJlbnRGcmFtZSgpOiBGcmFtZSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyU3RhdGUuY3VycmVudEZyYW1lO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5TZWxlY3RTb3VyY2VCYXNlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gISF0aGlzLnBsYXllclN0YXRlLmN1cnJlbnRGcmFtZSAmJiB0aGlzLnBsYXllclN0YXRlLmN1cnJlbnRGcmFtZS5zb3VyY2VCYXNlZE9mZnNldEZyYW1lcyA+IDA7XG4gIH1cblxuICBwdWJsaWMgc2VsZWN0U3RyZWFtQmFzZWRUaW1lY29kZSgpOiB2b2lkIHtcbiAgICB0aGlzLmVtaXRSZXF1ZXN0KHRoaXMudGltZWNvZGUsIHRoaXMuc3RyZWFtQmFzZWQpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdFNvdXJjZUJhc2VkVGltZWNvZGUoKTogdm9pZCB7XG4gICAgdGhpcy5lbWl0UmVxdWVzdCh0aGlzLnRpbWVjb2RlLCB0aGlzLnNvdXJjZUJhc2VkKTtcbiAgfVxuXG4gIHB1YmxpYyBzZWxlY3RTdHJlYW1CYXNlZFNlY29uZHMoKTogdm9pZCB7XG4gICAgdGhpcy5lbWl0UmVxdWVzdCh0aGlzLnNlY29uZHMsIHRoaXMuc3RyZWFtQmFzZWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBlbWl0UmVxdWVzdChmb3JtYXQ6IFRpbWVjb2RlRm9ybWF0LCBiYXNlOiBUaW1lY29kZUJhc2UpOiB2b2lkIHtcbiAgICB0aGlzLnJlcXVlc3QuZW1pdCh7IHR5cGU6ICdDSEFOR0VfVElNRUNPREVfRElTUExBWScsIGZvcm1hdDogZm9ybWF0LCBiYXNlOiBiYXNlIH0pO1xuICB9XG59XG4iXX0=
