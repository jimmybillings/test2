"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkerSetButtonComponent = (function () {
    function MarkerSetButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    Object.defineProperty(MarkerSetButtonComponent.prototype, "title", {
        get: function () {
            return this.type === 'in' ? 'ASSET.ADV_PLAYER.SET_IN_BTN_TITLE' : 'ASSET.ADV_PLAYER.SET_OUT_BTN_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MarkerSetButtonComponent.prototype, "alreadyAtMarker", {
        get: function () {
            return this.frame && this.playerState.currentFrame && this.frame.frameNumber === this.playerState.currentFrame.frameNumber;
        },
        enumerable: true,
        configurable: true
    });
    MarkerSetButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'SET_MARKER_TO_CURRENT_FRAME', markerType: this.type });
    };
    Object.defineProperty(MarkerSetButtonComponent.prototype, "frame", {
        get: function () {
            return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    MarkerSetButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-marker-set-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-button\n      class=\"is-outlined set-marker\"\n      [disabled]=\"alreadyAtMarker\"\n      title=\"{{ title | translate }}\"\n      (click)=\"onClick()\">\n        {{ type }}\n    </button>\n  "
                },] },
    ];
    MarkerSetButtonComponent.ctorParameters = function () { return []; };
    MarkerSetButtonComponent.propDecorators = {
        'type': [{ type: core_1.Input },],
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return MarkerSetButtonComponent;
}());
exports.MarkerSetButtonComponent = MarkerSetButtonComponent;
//# sourceMappingURL=marker-set-button.component.js.map