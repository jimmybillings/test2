"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_context_service_1 = require("../shared/services/search-context.service");
var filter_service_1 = require("../shared/services/filter.service");
var user_preference_service_1 = require("../shared/services/user-preference.service");
var sort_definitions_service_1 = require("../shared/services/sort-definitions.service");
var capabilities_service_1 = require("../shared/services/capabilities.service");
var cart_service_1 = require("../shared/services/cart.service");
var wz_speedview_component_1 = require("../shared/modules/wz-asset/wz-speedview/wz.speedview.component");
var window_ref_service_1 = require("../shared/services/window-ref.service");
var router_1 = require("@angular/router");
var app_store_1 = require("../app.store");
var enhanced_asset_1 = require("../shared/interfaces/enhanced-asset");
var SearchComponent = (function () {
    function SearchComponent(userCan, filter, cart, sortDefinitionService, searchContext, userPreferencesService, window, route, router, detector, store) {
        var _this = this;
        this.userCan = userCan;
        this.filter = filter;
        this.cart = cart;
        this.sortDefinitionService = sortDefinitionService;
        this.searchContext = searchContext;
        this.userPreferencesService = userPreferencesService;
        this.window = window;
        this.route = route;
        this.router = router;
        this.detector = detector;
        this.store = store;
        this.results = this.store.select(function (state) { return state.search.results; });
        this.screenWidth = this.window.nativeWindow.innerWidth;
        this.window.nativeWindow.onresize = function () { return _this.screenWidth = _this.window.nativeWindow.innerWidth; };
        this.userPreferences = userPreferencesService;
        this.enhancedAssetsSubScription = this.store.selectCloned(function (state) { return state.search.results.items; }).subscribe(function (assets) {
            _this.enhancedAssets = assets.map(function (asset) { return enhanced_asset_1.enhanceAsset(asset, 'search'); });
        });
        this.sortDefinition = sortDefinitionService;
        this.router.events.subscribe(function (route) {
            _this.path = (_this.route.snapshot.params['gq']) ? JSON.parse(_this.route.snapshot.params['gq']) : '';
            _this.detector.markForCheck();
        });
        this.filtersAreAvailable = this._filtersAreAvailable();
    }
    SearchComponent.prototype.ngOnDestroy = function () {
        this.store.dispatch(function (factory) { return factory.search.reset(); });
        this.enhancedAssetsSubScription.unsubscribe();
    };
    Object.defineProperty(SearchComponent.prototype, "activeCollection", {
        get: function () {
            return this.store.select(function (state) { return state.activeCollection.collection; });
        },
        enumerable: true,
        configurable: true
    });
    SearchComponent.prototype.countToggle = function () {
        this.filter.load(this.searchContext.state, !this.userPreferences.state.displayFilterCounts).subscribe();
        this.userPreferences.toggleFilterCount();
    };
    SearchComponent.prototype.addAssetToCart = function (asset) {
        var params = { lineItem: { asset: asset } };
        if (this.userCan.administerQuotes()) {
            this.store.dispatch(function (factory) { return factory.quoteEdit.addAssetToProjectInQuote(params); });
        }
        else {
            this.cart.addAssetToProjectInCart(params);
        }
    };
    SearchComponent.prototype.changePage = function (page) {
        this.searchContext.update = { i: page };
        this.searchContext.go();
    };
    SearchComponent.prototype.sortResults = function (sortDefinition) {
        this.userPreferences.updateSortPreference(sortDefinition.id);
        this.sortDefinition.update({ currentSort: sortDefinition });
        this.searchContext.update = { 'i': 1, 'sortId': sortDefinition.id };
        this.searchContext.go();
    };
    SearchComponent.prototype.changeAssetView = function (viewType) {
        this.userPreferences.updateAssetViewPreference(viewType);
    };
    SearchComponent.prototype.filterEvent = function (event) {
        switch (event.event) {
            case 'toggleFilter':
                this.filter.toggle(event.filter.filterId);
                this.filterAssets();
                break;
            case 'toggleFilterGroup':
                this.filter.toggleFilterGroup(event.filter);
                break;
            case 'applyExclusiveFilter':
                this.filter.toggleExclusive(event.filter);
                this.filterAssets();
                break;
            case 'applyCustomValue':
                this.filter.addCustom(event.filter, event.customValue);
                this.filterAssets();
                break;
            case 'clearFilters':
                this.filter.clear();
                this.filterAssets();
                break;
        }
    };
    SearchComponent.prototype.onClickBreadcrumb = function (index) {
        var route = index === 0 ? ['/'] : ['/gallery-view'];
        var pathSegment = this.path.slice(0, index);
        if (pathSegment && pathSegment.length > 0)
            route.push({ path: JSON.stringify(pathSegment) });
        this.router.navigate(route);
    };
    Object.defineProperty(SearchComponent.prototype, "canEditCollection", {
        get: function () {
            var activeCollection;
            this.activeCollection.take(1).subscribe(function (collection) { return activeCollection = collection; });
            return this.userCan.editCollection(activeCollection);
        },
        enumerable: true,
        configurable: true
    });
    SearchComponent.prototype.onClickAddAllBtn = function () {
        var _this = this;
        var collectionName;
        this.activeCollection.take(1).subscribe(function (collection) { return collectionName = collection.name; });
        this.store.dispatch(function (factory) {
            return factory.dialog.showConfirmation({
                title: { key: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.TITLE', values: { collectionName: collectionName } },
                message: { key: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.MESSAGE', values: { collectionName: collectionName } },
                accept: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.ACCEPT',
                decline: 'SEARCH.ADD_ALL_TO_COLLECTION.CONFIRM.DECLINE'
            }, function () { return _this.store.dispatch(function (factory) { return factory.activeCollection.addPageOfSearchAssets(); }); });
        });
    };
    SearchComponent.prototype._filtersAreAvailable = function () {
        return this.store.select(function (state) { return state.headerDisplayOptions.filtersAreAvailable; });
    };
    SearchComponent.prototype.filterAssets = function () {
        this.searchContext.update = { i: 1 };
        var activeFilters = this.filter.getActive();
        var filterIds = (activeFilters.ids.length > 0) ? { 'filterIds': activeFilters.ids.join(',') } : null;
        var filterValues = (activeFilters.values.length > 0) ? { 'filterValues': activeFilters.values.join(',') } : null;
        (filterIds) ? this.searchContext.update = filterIds : this.searchContext.remove = 'filterIds';
        (filterValues) ? this.searchContext.update = filterValues : this.searchContext.remove = 'filterValues';
        this.searchContext.go();
    };
    SearchComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'search-component',
                    templateUrl: 'search.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    SearchComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: filter_service_1.FilterService, },
        { type: cart_service_1.CartService, },
        { type: sort_definitions_service_1.SortDefinitionsService, },
        { type: search_context_service_1.SearchContext, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: window_ref_service_1.WindowRef, },
        { type: router_1.ActivatedRoute, },
        { type: router_1.Router, },
        { type: core_1.ChangeDetectorRef, },
        { type: app_store_1.AppStore, },
    ]; };
    SearchComponent.propDecorators = {
        'wzSpeedview': [{ type: core_1.ViewChild, args: [wz_speedview_component_1.WzSpeedviewComponent,] },],
    };
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map