"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var collections_service_1 = require("../../../shared/services/collections.service");
var collection_context_service_1 = require("../../../shared/services/collection-context.service");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var app_store_1 = require("../../../app.store");
var CollectionListDdComponent = (function () {
    function CollectionListDdComponent(router, collections, collectionContext, store) {
        this.router = router;
        this.collections = collections;
        this.collectionContext = collectionContext;
        this.store = store;
        this.roleFilter = ['owner', 'editor', 'viewer'];
        this.editMode = false;
        this.close = new core_1.EventEmitter();
        this.onAddAssetToCollection = new core_1.EventEmitter();
        this.collectionFilterIsShowing = false;
        this.collectionSortIsShowing = false;
        this.collectionSearchIsShowing = false;
    }
    CollectionListDdComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadCollectionsSubscription = this.collections.data
            .take(1)
            .filter(function (collections) { return collections.items.length === 0; })
            .subscribe(function () { return _this.collections.load().subscribe(); });
        this.optionsSubscription = this.collectionContext.data.subscribe(function (data) { return _this.options = data; });
    };
    CollectionListDdComponent.prototype.ngOnDestroy = function () {
        this.optionsSubscription.unsubscribe();
        this.loadCollectionsSubscription.unsubscribe();
    };
    CollectionListDdComponent.prototype.closeCollectionsList = function (collection) {
        this.close.emit(collection);
    };
    Object.defineProperty(CollectionListDdComponent.prototype, "collectionList", {
        get: function () {
            var _this = this;
            return this.collections.data
                .map(function (data) { return data.items; })
                .map(function (items) {
                if (_this.editMode) {
                    items = items.filter(function (item) { return item.id !== _this.focusedCollection.id; });
                }
                return items.filter(function (item) { return _this.roleFilter.includes(item.userRole); });
            });
        },
        enumerable: true,
        configurable: true
    });
    CollectionListDdComponent.prototype.selectFocusedCollection = function (collection) {
        if (!this.editMode) {
            if (common_functions_1.Common.onCollectionShowPage(this.router.url)) {
                this.navigateToCollectionShow(collection.id);
            }
            else {
                this.store.dispatch(function (factory) { return factory.activeCollection.set(collection.id); });
            }
        }
        this.closeCollectionsList(collection);
    };
    CollectionListDdComponent.prototype.applyFilter = function (filter) {
        this.collectionContext.updateCollectionOptions({ currentFilter: filter });
        this.collections.load(filter.access).subscribe();
        this.showCollectionFilter();
    };
    CollectionListDdComponent.prototype.applySort = function (sort) {
        this.collectionContext.updateCollectionOptions({ currentSort: sort });
        this.collections.load(sort.sort).subscribe();
        this.showCollectionSort();
    };
    CollectionListDdComponent.prototype.search = function (query) {
        this.collectionContext.updateCollectionOptions({ currentSearchQuery: query });
        this.collections.load(query).subscribe();
    };
    CollectionListDdComponent.prototype.showCollectionFilter = function () {
        this.collectionFilterIsShowing = !this.collectionFilterIsShowing;
    };
    CollectionListDdComponent.prototype.showCollectionSort = function () {
        this.collectionSortIsShowing = !this.collectionSortIsShowing;
    };
    CollectionListDdComponent.prototype.showCollectionSearch = function () {
        this.collectionSearchIsShowing = !this.collectionSearchIsShowing;
    };
    CollectionListDdComponent.prototype.navigateToCollectionShow = function (collectionId) {
        this.router.navigate(['/collections/', collectionId, { i: 1, n: 100 }]);
    };
    CollectionListDdComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'collections-list-dd',
                    templateUrl: 'collections-list-dd.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CollectionListDdComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: collections_service_1.CollectionsService, },
        { type: collection_context_service_1.CollectionContextService, },
        { type: app_store_1.AppStore, },
    ]; };
    CollectionListDdComponent.propDecorators = {
        'focusedCollection': [{ type: core_1.Input },],
        'roleFilter': [{ type: core_1.Input },],
        'editMode': [{ type: core_1.Input },],
        'close': [{ type: core_1.Output },],
        'onAddAssetToCollection': [{ type: core_1.Output },],
    };
    return CollectionListDdComponent;
}());
exports.CollectionListDdComponent = CollectionListDdComponent;
//# sourceMappingURL=collections-list-dd.component.js.map