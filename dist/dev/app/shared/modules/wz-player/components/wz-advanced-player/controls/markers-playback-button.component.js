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
var MarkersPlaybackButtonComponent = (function () {
    function MarkersPlaybackButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    MarkersPlaybackButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'TOGGLE_MARKERS_PLAYBACK' });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], MarkersPlaybackButtonComponent.prototype, "playerState", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], MarkersPlaybackButtonComponent.prototype, "request", void 0);
    MarkersPlaybackButtonComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-markers-playback-button',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <button mat-icon-button\n      [disabled]=\"!playerState.inMarkerFrame || !playerState.outMarkerFrame\"\n      title=\"{{ 'ASSET.ADV_PLAYER.PLAY_IN_OUT_BTN_TITLE' | translate }}\"\n      (click)=\"onClick()\">\n      <mat-icon>{{ playerState.playingMarkers && playerState.playing ? 'pause_circle_filled' : 'play_circle_filled' }}</mat-icon>\n    </button>\n  "
        })
    ], MarkersPlaybackButtonComponent);
    return MarkersPlaybackButtonComponent;
}());
exports.MarkersPlaybackButtonComponent = MarkersPlaybackButtonComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1wbGF5ZXIvY29tcG9uZW50cy93ei1hZHZhbmNlZC1wbGF5ZXIvY29udHJvbHMvbWFya2Vycy1wbGF5YmFjay1idXR0b24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBbUJoRztJQWRBO1FBZ0JZLFlBQU8sR0FBK0MsSUFBSSxtQkFBWSxFQUFnQyxDQUFDO0lBS25ILENBQUM7SUFIUSxnREFBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUseUJBQXlCLEVBQUUsQ0FBQyxDQUFDO0lBQ3pELENBQUM7SUFMUTtRQUFSLFlBQUssRUFBRTs7dUVBQTBCO0lBQ3hCO1FBQVQsYUFBTSxFQUFFO2tDQUFVLG1CQUFZO21FQUFrRjtJQUZ0Ryw4QkFBOEI7UUFkMUMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFFBQVEsRUFBRSwrV0FPVDtTQUNGLENBQUM7T0FFVyw4QkFBOEIsQ0FPMUM7SUFBRCxxQ0FBQztDQVBELEFBT0MsSUFBQTtBQVBZLHdFQUE4QiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otcGxheWVyL2NvbXBvbmVudHMvd3otYWR2YW5jZWQtcGxheWVyL2NvbnRyb2xzL21hcmtlcnMtcGxheWJhY2stYnV0dG9uLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbGF5ZXJTdGF0ZSwgUGxheWVyUmVxdWVzdCwgVG9nZ2xlTWFya2Vyc1BsYXliYWNrUmVxdWVzdCB9XG4gIGZyb20gJy4uLy4uLy4uL2ludGVyZmFjZXMvcGxheWVyLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LW1hcmtlcnMtcGxheWJhY2stYnV0dG9uJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGJ1dHRvbiBtYXQtaWNvbi1idXR0b25cbiAgICAgIFtkaXNhYmxlZF09XCIhcGxheWVyU3RhdGUuaW5NYXJrZXJGcmFtZSB8fCAhcGxheWVyU3RhdGUub3V0TWFya2VyRnJhbWVcIlxuICAgICAgdGl0bGU9XCJ7eyAnQVNTRVQuQURWX1BMQVlFUi5QTEFZX0lOX09VVF9CVE5fVElUTEUnIHwgdHJhbnNsYXRlIH19XCJcbiAgICAgIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxtYXQtaWNvbj57eyBwbGF5ZXJTdGF0ZS5wbGF5aW5nTWFya2VycyAmJiBwbGF5ZXJTdGF0ZS5wbGF5aW5nID8gJ3BhdXNlX2NpcmNsZV9maWxsZWQnIDogJ3BsYXlfY2lyY2xlX2ZpbGxlZCcgfX08L21hdC1pY29uPlxuICAgIDwvYnV0dG9uPlxuICBgXG59KVxuXG5leHBvcnQgY2xhc3MgTWFya2Vyc1BsYXliYWNrQnV0dG9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgcGxheWVyU3RhdGU6IFBsYXllclN0YXRlO1xuICBAT3V0cHV0KCkgcmVxdWVzdDogRXZlbnRFbWl0dGVyPFRvZ2dsZU1hcmtlcnNQbGF5YmFja1JlcXVlc3Q+ID0gbmV3IEV2ZW50RW1pdHRlcjxUb2dnbGVNYXJrZXJzUGxheWJhY2tSZXF1ZXN0PigpO1xuXG4gIHB1YmxpYyBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdC5lbWl0KHsgdHlwZTogJ1RPR0dMRV9NQVJLRVJTX1BMQVlCQUNLJyB9KTtcbiAgfVxufVxuIl19
