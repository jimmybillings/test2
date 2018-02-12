"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzSortComponent = (function () {
    function WzSortComponent() {
        this.sort = new core_1.EventEmitter();
    }
    WzSortComponent.prototype.applySort = function (sortDefinition) {
        this.sort.emit(sortDefinition);
    };
    WzSortComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-sort-component',
                    templateUrl: 'wz.sort.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzSortComponent.ctorParameters = function () { return []; };
    WzSortComponent.propDecorators = {
        'items': [{ type: core_1.Input },],
        'current': [{ type: core_1.Input },],
        'sort': [{ type: core_1.Output },],
    };
    return WzSortComponent;
}());
exports.WzSortComponent = WzSortComponent;
//# sourceMappingURL=wz.sort.component.js.map