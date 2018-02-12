"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var collectionOptionsState = {
    currentFilter: {
        'id': 0,
        'name': 'COLLECTION.INDEX.FILTER_DD_MENU.ALL',
        'value': 'all',
        'access': { 'accessLevel': 'all' }
    },
    currentSort: {
        'id': 0,
        'name': 'COLLECTION.INDEX.SORT_DD_MENU.DATE_MOD_NEWEST',
        'value': 'modNewest',
        'sort': { 's': 'lastUpdated', 'd': true }
    },
    currentSearchQuery: { 'q': '' }
};
function collectionOptions(state, action) {
    if (state === void 0) { state = collectionOptionsState; }
    switch (action.type) {
        case 'RESET_OPTIONS':
            return Object.assign({}, action.payload);
        case 'UPDATE_OPTIONS':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}
exports.collectionOptions = collectionOptions;
;
var CollectionContextService = (function () {
    function CollectionContextService(store) {
        this.store = store;
        this.data = store.select('collectionOptions');
    }
    CollectionContextService.prototype.updateCollectionOptions = function (options) {
        this.store.dispatch({ type: 'UPDATE_OPTIONS', payload: options });
    };
    CollectionContextService.prototype.resetCollectionOptions = function () {
        this.store.dispatch({ type: 'RESET_OPTIONS', payload: collectionOptionsState });
    };
    CollectionContextService.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionContextService.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return CollectionContextService;
}());
exports.CollectionContextService = CollectionContextService;
//# sourceMappingURL=collection-context.service.js.map