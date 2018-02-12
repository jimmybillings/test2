"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkersClearButtonComponent = (function () {
    function MarkersClearButtonComponent() {
        this.request = new core_1.EventEmitter();
    }
    MarkersClearButtonComponent.prototype.onClick = function () {
        this.request.emit({ type: 'CLEAR_MARKERS' });
    };
    MarkersClearButtonComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-markers-clear-button',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <button mat-icon-button\n      [disabled]=\"!playerState.inMarkerFrame && !playerState.outMarkerFrame\"\n      title=\"{{ 'ASSET.ADV_PLAYER.CLEAR_IN_OUT_BTN_TITLE' | translate }}\"\n      (click)=\"onClick()\">\n      <mat-icon>cancel</mat-icon>\n    </button>\n  "
                },] },
    ];
    MarkersClearButtonComponent.ctorParameters = function () { return []; };
    MarkersClearButtonComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return MarkersClearButtonComponent;
}());
exports.MarkersClearButtonComponent = MarkersClearButtonComponent;
//# sourceMappingURL=markers-clear-button.component.js.map