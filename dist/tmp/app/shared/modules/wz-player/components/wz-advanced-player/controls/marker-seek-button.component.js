"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkerSeekButtonComponent = (function () {
    function MarkerSeekButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "frame", {
        get: function () {
            return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "alreadyAtMarker", {
        get: function () {
            return this.frame && this.playerState.currentFrame && this.frame.frameNumber === this.playerState.currentFrame.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "class", {
        get: function () {
            return "seek-" + this.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSeekButtonComponent.prototype, "title", {
        get: function () {
            return this.type === 'in' ? 'ASSET.ADV_PLAYER.SEEK_IN_BTN_TITLE' : 'ASSET.ADV_PLAYER.SEEK_OUT_BTN_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    MarkerSeekButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'SEEK_TO_MARKER', markerType: this.type });
    };
    MarkerSeekButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-marker-seek-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-icon-button\n      [disabled]=\"!frame || alreadyAtMarker\" \n      class=\"mat-icon-button {{ class }}\" \n      title=\"{{ title | translate }}\" \n      (click)=\"onClick()\">\n        <mat-icon>keyboard_tab</mat-icon>\n    </button>\n  "
                },] },
    ];
    MarkerSeekButtonComponent.ctorParameters = function () { return []; };
    MarkerSeekButtonComponent.propDecorators = {
        'type': [{ type: core_1.Input },],
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return MarkerSeekButtonComponent;
}());
exports.MarkerSeekButtonComponent = MarkerSeekButtonComponent;
//# sourceMappingURL=marker-seek-button.component.js.map