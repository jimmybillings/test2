"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CommerceHeaderComponent = (function () {
    function CommerceHeaderComponent() {
        this.search = new core_1.EventEmitter();
        this.onSortResults = new core_1.EventEmitter();
        this.onFilterResults = new core_1.EventEmitter();
        this.itemSearchIsShowing = false;
    }
    CommerceHeaderComponent.prototype.toggleSearch = function () {
        this.itemSearchIsShowing = !this.itemSearchIsShowing;
    };
    CommerceHeaderComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'commerce-header',
                    templateUrl: 'commerce-header.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CommerceHeaderComponent.ctorParameters = function () { return []; };
    CommerceHeaderComponent.propDecorators = {
        'type': [{ type: core_1.Input },],
        'sortOptions': [{ type: core_1.Input },],
        'filterOptions': [{ type: core_1.Input },],
        'currentSort': [{ type: core_1.Input },],
        'currentFilter': [{ type: core_1.Input },],
        'search': [{ type: core_1.Output },],
        'onSortResults': [{ type: core_1.Output },],
        'onFilterResults': [{ type: core_1.Output },],
    };
    return CommerceHeaderComponent;
}());
exports.CommerceHeaderComponent = CommerceHeaderComponent;
//# sourceMappingURL=commerce-header.component.js.map