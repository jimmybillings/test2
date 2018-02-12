"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var PlaybackToggleButtonComponent = (function () {
    function PlaybackToggleButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    PlaybackToggleButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'TOGGLE_PLAYBACK' });
    };
    PlaybackToggleButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-playback-toggle-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-icon-button \n      title=\"{{ (playerState.playing ? \n        'ASSET.ADV_PLAYER.PAUSE_BTN_TITLE' : 'ASSET.ADV_PLAYER.PLAY_BTN_TITLE') | translate }}\" \n      (click)=\"onClick()\">\n      <mat-icon>{{ playerState.playing ? 'pause' : 'play_arrow' }}</mat-icon>\n    </button>\n  "
                },] },
    ];
    PlaybackToggleButtonComponent.ctorParameters = function () { return []; };
    PlaybackToggleButtonComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return PlaybackToggleButtonComponent;
}());
exports.PlaybackToggleButtonComponent = PlaybackToggleButtonComponent;
//# sourceMappingURL=playback-toggle-button.component.js.map