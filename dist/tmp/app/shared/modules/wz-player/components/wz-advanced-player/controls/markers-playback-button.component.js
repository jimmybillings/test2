"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkersPlaybackButtonComponent = (function () {
    function MarkersPlaybackButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    MarkersPlaybackButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'TOGGLE_MARKERS_PLAYBACK' });
    };
    MarkersPlaybackButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-markers-playback-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-icon-button\n      [disabled]=\"!playerState.inMarkerFrame || !playerState.outMarkerFrame\"\n      title=\"{{ 'ASSET.ADV_PLAYER.PLAY_IN_OUT_BTN_TITLE' | translate }}\"\n      (click)=\"onClick()\">\n      <mat-icon>{{ playerState.playingMarkers && playerState.playing ? 'pause_circle_filled' : 'play_circle_filled' }}</mat-icon>\n    </button>\n  "
                },] },
    ];
    MarkersPlaybackButtonComponent.ctorParameters = function () { return []; };
    MarkersPlaybackButtonComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return MarkersPlaybackButtonComponent;
}());
exports.MarkersPlaybackButtonComponent = MarkersPlaybackButtonComponent;
//# sourceMappingURL=markers-playback-button.component.js.map