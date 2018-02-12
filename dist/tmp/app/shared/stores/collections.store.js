"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@ngrx/store");
var common_functions_1 = require("../utilities/common.functions");
function collections(state, action) {
    if (state === void 0) { state = initialState(); }
    if (state === null)
        state = initialState();
    var updatedItems;
    switch (action.type) {
        case 'REPLACE_COLLECTIONS':
            return Object.assign({}, action.payload ? action.payload : initialState());
        case 'ADD_COLLECTION':
            updatedItems = state.items ? common_functions_1.Common.clone(state.items) : [];
            if (action.payload)
                updatedItems.push(action.payload);
            return Object.assign({}, state, { items: updatedItems });
        case 'UPDATE_COLLECTION':
            if (!state.items || !action.payload)
                return state;
            updatedItems = state.items.map(function (collection) {
                return collection.id === action.payload.id ? action.payload : collection;
            });
            return Object.assign({}, state, { items: updatedItems });
        case 'DELETE_COLLECTION':
            if (!state.items)
                return state;
            updatedItems = state.items.filter(function (collection) { return collection.id !== action.payload; });
            return Object.assign({}, state, { items: updatedItems });
        case 'DELETE_ALL_COLLECTIONS':
            return Object.assign({}, initialState());
        default:
            return state;
    }
}
exports.collections = collections;
;
var CollectionsStore = (function () {
    function CollectionsStore(store) {
        this.store = store;
    }
    Object.defineProperty(CollectionsStore.prototype, "data", {
        get: function () {
            return this.store.select('collections');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CollectionsStore.prototype, "state", {
        get: function () {
            var s;
            this.data.take(1).subscribe(function (state) { return s = state; });
            return s;
        },
        enumerable: true,
        configurable: true
    });
    CollectionsStore.prototype.deleteAllCollections = function () {
        this.store.dispatch({ type: 'DELETE_ALL_COLLECTIONS' });
    };
    CollectionsStore.prototype.deleteCollectionWith = function (collectionId) {
        this.store.dispatch({ type: 'DELETE_COLLECTION', payload: collectionId });
    };
    CollectionsStore.prototype.add = function (newCollection) {
        this.store.dispatch({ type: 'ADD_COLLECTION', payload: newCollection });
    };
    CollectionsStore.prototype.update = function (collection) {
        this.store.dispatch({ type: 'UPDATE_COLLECTION', payload: collection });
    };
    CollectionsStore.prototype.replaceAllCollectionsWith = function (replacements) {
        replacements.items = replacements.items === undefined ? [] : replacements.items;
        this.store.dispatch({
            type: 'REPLACE_COLLECTIONS', payload: {
                items: replacements.items,
                pagination: {
                    totalCount: replacements.totalCount,
                    currentPage: replacements.currentPage + 1,
                    hasNextPage: replacements.hasNextPage,
                    hasPreviousPage: replacements.hasPreviousPage,
                    numberOfPages: replacements.numberOfPages,
                    pageSize: replacements.pageSize
                }
            }
        });
    };
    CollectionsStore.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionsStore.ctorParameters = function () { return [
        { type: store_1.Store, },
    ]; };
    return CollectionsStore;
}());
exports.CollectionsStore = CollectionsStore;
function initialState() {
    return {
        items: [],
        pagination: {
            totalCount: 0,
            currentPage: 1,
            pageSize: 100,
            hasNextPage: false,
            hasPreviousPage: false,
            numberOfPages: 0
        }
    };
}
;
//# sourceMappingURL=collections.store.js.map