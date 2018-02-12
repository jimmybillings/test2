"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CollectionFilterDdComponent = (function () {
    function CollectionFilterDdComponent() {
        this.filter = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.filterOptions = [];
        this.filterOptions = [
            {
                'first': {
                    'id': 0,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL',
                    'value': 'all',
                    'access': { 'accessLevel': 'all' }
                }
            },
            {
                'first': {
                    'id': 1,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.OWNER',
                    'value': 'owner',
                    'access': { 'accessLevel': 'owner' }
                },
                'second': {
                    'id': 2,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.EDITOR',
                    'value': 'editor',
                    'access': { 'accessLevel': 'editor' }
                },
                'third': {
                    'id': 3,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.VIEWER',
                    'value': 'viewer',
                    'access': { 'accessLevel': 'viewer' }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.FILTER_DD_MENU.RESEARCHER',
                    'value': 'researcher',
                    'access': { 'accessLevel': 'researcher' }
                }
            }
        ];
    }
    CollectionFilterDdComponent.prototype.closeCollectionsFiltertDd = function () {
        this.close.emit();
    };
    CollectionFilterDdComponent.prototype.onFilterResults = function (filter) {
        this.filter.emit(filter);
    };
    CollectionFilterDdComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collections-filter-dd',
                    templateUrl: 'collections-filter-dd.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionFilterDdComponent.ctorParameters = function () { return []; };
    CollectionFilterDdComponent.propDecorators = {
        'currentFilter': [{ type: core_1.Input },],
        'filter': [{ type: core_1.Output },],
        'close': [{ type: core_1.Output },],
    };
    return CollectionFilterDdComponent;
}());
exports.CollectionFilterDdComponent = CollectionFilterDdComponent;
//# sourceMappingURL=collections-filter-dd.component.js.map