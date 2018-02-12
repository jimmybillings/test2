"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MarkerTimeDisplayComponent = (function () {
    function MarkerTimeDisplayComponent() {
    }
    Object.defineProperty(MarkerTimeDisplayComponent.prototype, "frame", {
        get: function () {
            return this.type === 'in' ? this.playerState.inMarkerFrame : this.playerState.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    MarkerTimeDisplayComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-marker-time-display',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <span class=\"timecode\">{{ frame | playerTimecode:playerState }}</span>\n  "
                },] },
    ];
    MarkerTimeDisplayComponent.ctorParameters = function () { return []; };
    MarkerTimeDisplayComponent.propDecorators = {
        'type': [{ type: core_1.Input },],
        'playerState': [{ type: core_1.Input },],
    };
    return MarkerTimeDisplayComponent;
}());
exports.MarkerTimeDisplayComponent = MarkerTimeDisplayComponent;
//# sourceMappingURL=marker-time-display.component.js.map