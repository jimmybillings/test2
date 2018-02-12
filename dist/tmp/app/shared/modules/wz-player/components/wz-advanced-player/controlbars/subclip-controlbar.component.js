"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SubclipControlbarComponent = (function () {
    function SubclipControlbarComponent() {
        this.displayAllControls = true;
        this.request = new core_1.EventEmitter();
    }
    SubclipControlbarComponent.prototype.forward = function (request) {
        this.request.emit(request);
    };
    SubclipControlbarComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-subclip-controlbar',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    templateUrl: './subclip-controlbar.html'
                },] },
    ];
    SubclipControlbarComponent.ctorParameters = function () { return []; };
    SubclipControlbarComponent.propDecorators = {
        'playerState': [{ type: core_1.Input },],
        'displayAllControls': [{ type: core_1.Input },],
        'request': [{ type: core_1.Output },],
    };
    return SubclipControlbarComponent;
}());
exports.SubclipControlbarComponent = SubclipControlbarComponent;
//# sourceMappingURL=subclip-controlbar.component.js.map