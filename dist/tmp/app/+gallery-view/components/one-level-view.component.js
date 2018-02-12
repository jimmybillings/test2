"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OneLevelViewComponent = (function () {
    function OneLevelViewComponent() {
        this.navigate = new core_1.EventEmitter();
    }
    OneLevelViewComponent.prototype.onClick = function (result) {
        this.navigate.emit({
            pathSegment: { ids: [result.id], names: [result.name] },
            method: result.hasMore ? 'nextLevel' : 'search'
        });
    };
    OneLevelViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'one-level-view',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    templateUrl: 'one-level-view.html'
                },] },
    ];
    OneLevelViewComponent.ctorParameters = function () { return []; };
    OneLevelViewComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'navigate': [{ type: core_1.Output },],
    };
    return OneLevelViewComponent;
}());
exports.OneLevelViewComponent = OneLevelViewComponent;
//# sourceMappingURL=one-level-view.component.js.map