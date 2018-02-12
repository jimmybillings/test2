"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CollectionSortDdComponent = (function () {
    function CollectionSortDdComponent() {
        this.sort = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.sortOptions = [];
        this.sortOptions = [
            {
                'first': {
                    'id': 0,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
                    'value': 'modNewest',
                    'sort': { 's': 'lastUpdated', 'd': true }
                },
                'second': {
                    'id': 1,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_OLDEST',
                    'value': 'modOldest',
                    'sort': { 's': 'lastUpdated', 'd': false }
                }
            },
            {
                'first': {
                    'id': 2,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_NEWEST',
                    'value': 'createNewest',
                    'sort': { 's': 'createdOn', 'd': true }
                },
                'second': {
                    'id': 3,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_CREATE_OLDEST',
                    'value': 'createOldest',
                    'sort': { 's': 'createdOn', 'd': false }
                }
            },
            {
                'first': {
                    'id': 4,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_ASC',
                    'value': 'alphaAsc',
                    'sort': { 's': 'name', 'd': false }
                },
                'second': {
                    'id': 5,
                    'name': 'COLLECTION.INDEX.SORT_DD_MENU.LIST_COLL_DESC',
                    'value': 'alphaDesc',
                    'sort': { 's': 'name', 'd': true }
                }
            }
        ];
    }
    CollectionSortDdComponent.prototype.onSortResults = function (sortId) {
        this.sort.emit(sortId);
    };
    CollectionSortDdComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collections-sort-dd',
                    templateUrl: 'collections-sort-dd.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionSortDdComponent.ctorParameters = function () { return []; };
    CollectionSortDdComponent.propDecorators = {
        'currentSort': [{ type: core_1.Input },],
        'sort': [{ type: core_1.Output },],
        'close': [{ type: core_1.Output },],
    };
    return CollectionSortDdComponent;
}());
exports.CollectionSortDdComponent = CollectionSortDdComponent;
//# sourceMappingURL=collections-sort-dd.component.js.map