"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FastPlaybackButtonComponent = (function () {
    function FastPlaybackButtonComponent() {
        this.direction = 'forward';
        this.request = new core_1.EventEmitter();
    }
    Object.defineProperty(FastPlaybackButtonComponent.prototype, "iconName", {
        get: function () {
            return this.direction === 'reverse' ? 'fast_rewind' : 'fast_forward';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FastPlaybackButtonComponent.prototype, "title", {
        get: function () {
            return "ASSET.ADV_PLAYER." + this.iconName.toUpperCase() + "_BTN_TITLE";
        },
        enumerable: true,
        configurable: true
    });
    FastPlaybackButtonComponent.prototype.canPlayFast = function () {
        var currentSpeed = this.playerState.playbackSpeed;
        return (this.direction === 'reverse' && currentSpeed >= -1) || (this.direction === 'forward' && currentSpeed <= 1);
    };
    FastPlaybackButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'PLAY_AT_SPEED', speed: 4, direction: this.direction });
    };
    FastPlaybackButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-fast-playback-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-icon-button [disabled]=\"!canPlayFast()\" title=\"{{ title | translate }}\" (click)=\"onClick()\">\n      <mat-icon>{{ iconName }}</mat-icon>\n    </button>\n  "
                },] },
    ];
    FastPlaybackButtonComponent.ctorParameters = function () { return []; };
    FastPlaybackButtonComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'direction': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return FastPlaybackButtonComponent;
}());
exports.FastPlaybackButtonComponent = FastPlaybackButtonComponent;
//# sourceMappingURL=fast-playback-button.component.js.map