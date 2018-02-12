"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    __decorate([
        core_1.ViewChild(wz_speedview_component_1.WzSpeedviewComponent),
        __metadata("design:type", wz_speedview_component_1.WzSpeedviewComponent)
    ], SearchComponent.prototype, "wzSpeedview", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'search-component',
            templateUrl: 'search.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities,
            filter_service_1.FilterService,
            cart_service_1.CartService,
            sort_definitions_service_1.SortDefinitionsService,
            search_context_service_1.SearchContext,
            user_preference_service_1.UserPreferenceService,
            window_ref_service_1.WindowRef,
            router_1.ActivatedRoute,
            router_1.Router,
            core_1.ChangeDetectorRef,
            app_store_1.AppStore])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlYXJjaC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBc0g7QUFHdEgsb0ZBQTBFO0FBQzFFLG9FQUFrRTtBQUNsRSxzRkFBbUY7QUFDbkYsd0ZBQXFGO0FBQ3JGLGdGQUF1RTtBQUN2RSxnRUFBOEQ7QUFDOUQseUdBQXNHO0FBQ3RHLDRFQUFrRTtBQUNsRSwwQ0FBeUQ7QUFFekQsMENBQXdDO0FBRXhDLHNFQUFrRjtBQWFsRjtJQVdFLHlCQUNTLE9BQXFCLEVBQ3JCLE1BQXFCLEVBQ3BCLElBQWlCLEVBQ2pCLHFCQUE2QyxFQUM3QyxhQUE0QixFQUM1QixzQkFBNkMsRUFDN0MsTUFBaUIsRUFDakIsS0FBcUIsRUFDckIsTUFBYyxFQUNkLFFBQTJCLEVBQzNCLEtBQWU7UUFYekIsaUJBMEJDO1FBekJRLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUNwQixTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBd0I7UUFDN0Msa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDNUIsMkJBQXNCLEdBQXRCLHNCQUFzQixDQUF1QjtRQUM3QyxXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2pCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQUMzQixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBRXZCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQXRELENBQXNELENBQUM7UUFDakcsSUFBSSxDQUFDLGVBQWUsR0FBRyxzQkFBc0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQTFCLENBQTBCLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQzdHLEtBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLDZCQUFZLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7UUFDM0UsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDaEMsS0FBSSxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbkcsS0FBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBRUQscUNBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBdEIsQ0FBc0IsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQywwQkFBMEIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBRUQsc0JBQVcsNkNBQWdCO2FBQTNCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQVUsRUFBakMsQ0FBaUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7OztPQUFBO0lBRU0scUNBQVcsR0FBbEI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDeEcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNDLENBQUM7SUFFTSx3Q0FBYyxHQUFyQixVQUFzQixLQUFVO1FBQzlCLElBQUksTUFBTSxHQUF1QixFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO1FBQ2hFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLENBQUM7UUFDckYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQztJQUVNLG9DQUFVLEdBQWpCLFVBQWtCLElBQVM7UUFDekIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRU0scUNBQVcsR0FBbEIsVUFBbUIsY0FBbUI7UUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsRUFBRSxXQUFXLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztRQUM1RCxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNwRSxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSx5Q0FBZSxHQUF0QixVQUF1QixRQUFnQjtRQUNyQyxJQUFJLENBQUMsZUFBZSxDQUFDLHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSxxQ0FBVyxHQUFsQixVQUFtQixLQUFVO1FBQzNCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEtBQUssY0FBYztnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixLQUFLLENBQUM7WUFDUixLQUFLLG1CQUFtQjtnQkFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzVDLEtBQUssQ0FBQztZQUNSLEtBQUssc0JBQXNCO2dCQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDcEIsS0FBSyxDQUFDO1lBQ1IsS0FBSyxrQkFBa0I7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3BCLEtBQUssQ0FBQztZQUNSLEtBQUssY0FBYztnQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDcEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNwQixLQUFLLENBQUM7UUFDVixDQUFDO0lBQ0gsQ0FBQztJQUVNLDJDQUFpQixHQUF4QixVQUF5QixLQUFhO1FBQ3BDLElBQU0sS0FBSyxHQUFVLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0QsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELHNCQUFXLDhDQUFpQjthQUE1QjtZQUNFLElBQUksZ0JBQTRCLENBQUM7WUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxnQkFBZ0IsR0FBRyxVQUFVLEVBQTdCLENBQTZCLENBQUMsQ0FBQztZQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2RCxDQUFDOzs7T0FBQTtJQUVNLDBDQUFnQixHQUF2QjtRQUFBLGlCQVlDO1FBWEMsSUFBSSxjQUFzQixDQUFDO1FBQzNCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsVUFBVSxJQUFJLE9BQUEsY0FBYyxHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQWhDLENBQWdDLENBQUMsQ0FBQztRQUV4RixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU87WUFDekIsT0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDO2dCQUM5QixLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsNENBQTRDLEVBQUUsTUFBTSxFQUFFLEVBQUUsY0FBYyxnQkFBQSxFQUFFLEVBQUU7Z0JBQ3hGLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRSw4Q0FBOEMsRUFBRSxNQUFNLEVBQUUsRUFBRSxjQUFjLGdCQUFBLEVBQUUsRUFBRTtnQkFDNUYsTUFBTSxFQUFFLDZDQUE2QztnQkFDckQsT0FBTyxFQUFFLDhDQUE4QzthQUN4RCxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxFQUFoRCxDQUFnRCxDQUFDLEVBQWhGLENBQWdGLENBQUM7UUFMMUYsQ0FLMEYsQ0FDM0YsQ0FBQztJQUNKLENBQUM7SUFFTyw4Q0FBb0IsR0FBNUI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CLEVBQTlDLENBQThDLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBRU8sc0NBQVksR0FBcEI7UUFDRSxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUNyQyxJQUFJLGFBQWEsR0FBUSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBRWpELElBQUksU0FBUyxHQUFHLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFFLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRyxJQUFJLFlBQVksR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLGNBQWMsRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFFakgsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7UUFDOUYsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7UUFFdkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBdklnQztRQUFoQyxnQkFBUyxDQUFDLDZDQUFvQixDQUFDO2tDQUFxQiw2Q0FBb0I7d0RBQUM7SUFUL0QsZUFBZTtRQVAzQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsV0FBVyxFQUFFLGFBQWE7WUFDMUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0Fja0IsbUNBQVk7WUFDYiw4QkFBYTtZQUNkLDBCQUFXO1lBQ00saURBQXNCO1lBQzlCLHNDQUFhO1lBQ0osK0NBQXFCO1lBQ3JDLDhCQUFTO1lBQ1YsdUJBQWM7WUFDYixlQUFNO1lBQ0osd0JBQWlCO1lBQ3BCLG9CQUFRO09BdEJkLGVBQWUsQ0FpSjNCO0lBQUQsc0JBQUM7Q0FqSkQsQUFpSkMsSUFBQTtBQWpKWSwwQ0FBZSIsImZpbGUiOiJhcHAvK3NlYXJjaC9zZWFyY2guY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgUmVuZGVyZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBTZWFyY2hDb250ZXh0IH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL3NlYXJjaC1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyUHJlZmVyZW5jZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ydERlZmluaXRpb25zU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9zb3J0LWRlZmluaXRpb25zLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IENhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBXelNwZWVkdmlld0NvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9tb2R1bGVzL3d6LWFzc2V0L3d6LXNwZWVkdmlldy93ei5zcGVlZHZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IFdpbmRvd1JlZiB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy93aW5kb3ctcmVmLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBBZGRBc3NldFBhcmFtZXRlcnMgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbGxlY3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQsIGVuaGFuY2VBc3NldCB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMvc2VhcmNoLmludGVyZmFjZSc7XG4vKipcbiAqIEFzc2V0IHNlYXJjaCBwYWdlIGNvbXBvbmVudCAtIHJlbmRlcnMgc2VhcmNoIHBhZ2UgcmVzdWx0c1xuICovXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdzZWFyY2gtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdzZWFyY2guaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgU2VhcmNoQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHVibGljIHNjcmVlbldpZHRoOiBudW1iZXI7XG4gIHB1YmxpYyBwYXRoOiBhbnk7XG4gIHB1YmxpYyB1c2VyUHJlZmVyZW5jZXM6IFVzZXJQcmVmZXJlbmNlU2VydmljZTtcbiAgcHVibGljIHNvcnREZWZpbml0aW9uOiBTb3J0RGVmaW5pdGlvbnNTZXJ2aWNlO1xuICBwdWJsaWMgZW5oYW5jZWRBc3NldHM6IEVuaGFuY2VkQXNzZXRbXTtcbiAgcHVibGljIGVuaGFuY2VkQXNzZXRzU3ViU2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHB1YmxpYyBmaWx0ZXJzQXJlQXZhaWxhYmxlOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICBwdWJsaWMgcmVzdWx0czogT2JzZXJ2YWJsZTxTZWFyY2hSZXN1bHRzPjtcbiAgQFZpZXdDaGlsZChXelNwZWVkdmlld0NvbXBvbmVudCkgcHVibGljIHd6U3BlZWR2aWV3OiBXelNwZWVkdmlld0NvbXBvbmVudDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXNlckNhbjogQ2FwYWJpbGl0aWVzLFxuICAgIHB1YmxpYyBmaWx0ZXI6IEZpbHRlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYXJ0OiBDYXJ0U2VydmljZSxcbiAgICBwcml2YXRlIHNvcnREZWZpbml0aW9uU2VydmljZTogU29ydERlZmluaXRpb25zU2VydmljZSxcbiAgICBwcml2YXRlIHNlYXJjaENvbnRleHQ6IFNlYXJjaENvbnRleHQsXG4gICAgcHJpdmF0ZSB1c2VyUHJlZmVyZW5jZXNTZXJ2aWNlOiBVc2VyUHJlZmVyZW5jZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSB3aW5kb3c6IFdpbmRvd1JlZixcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgZGV0ZWN0b3I6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlXG4gICkge1xuICAgIHRoaXMucmVzdWx0cyA9IHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnNlYXJjaC5yZXN1bHRzKTtcbiAgICB0aGlzLnNjcmVlbldpZHRoID0gdGhpcy53aW5kb3cubmF0aXZlV2luZG93LmlubmVyV2lkdGg7XG4gICAgdGhpcy53aW5kb3cubmF0aXZlV2luZG93Lm9ucmVzaXplID0gKCkgPT4gdGhpcy5zY3JlZW5XaWR0aCA9IHRoaXMud2luZG93Lm5hdGl2ZVdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMudXNlclByZWZlcmVuY2VzID0gdXNlclByZWZlcmVuY2VzU2VydmljZTtcbiAgICB0aGlzLmVuaGFuY2VkQXNzZXRzU3ViU2NyaXB0aW9uID0gdGhpcy5zdG9yZS5zZWxlY3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUuc2VhcmNoLnJlc3VsdHMuaXRlbXMpLnN1YnNjcmliZShhc3NldHMgPT4ge1xuICAgICAgdGhpcy5lbmhhbmNlZEFzc2V0cyA9IGFzc2V0cy5tYXAoYXNzZXQgPT4gZW5oYW5jZUFzc2V0KGFzc2V0LCAnc2VhcmNoJykpO1xuICAgIH0pO1xuICAgIHRoaXMuc29ydERlZmluaXRpb24gPSBzb3J0RGVmaW5pdGlvblNlcnZpY2U7XG4gICAgdGhpcy5yb3V0ZXIuZXZlbnRzLnN1YnNjcmliZShyb3V0ZSA9PiB7XG4gICAgICB0aGlzLnBhdGggPSAodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbJ2dxJ10pID8gSlNPTi5wYXJzZSh0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1snZ3EnXSkgOiAnJztcbiAgICAgIHRoaXMuZGV0ZWN0b3IubWFya0ZvckNoZWNrKCk7XG4gICAgfSk7XG4gICAgdGhpcy5maWx0ZXJzQXJlQXZhaWxhYmxlID0gdGhpcy5fZmlsdGVyc0FyZUF2YWlsYWJsZSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3Rvcnkuc2VhcmNoLnJlc2V0KCkpO1xuICAgIHRoaXMuZW5oYW5jZWRBc3NldHNTdWJTY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgYWN0aXZlQ29sbGVjdGlvbigpOiBPYnNlcnZhYmxlPENvbGxlY3Rpb24+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuYWN0aXZlQ29sbGVjdGlvbi5jb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBjb3VudFRvZ2dsZSgpOiB2b2lkIHtcbiAgICB0aGlzLmZpbHRlci5sb2FkKHRoaXMuc2VhcmNoQ29udGV4dC5zdGF0ZSwgIXRoaXMudXNlclByZWZlcmVuY2VzLnN0YXRlLmRpc3BsYXlGaWx0ZXJDb3VudHMpLnN1YnNjcmliZSgpO1xuICAgIHRoaXMudXNlclByZWZlcmVuY2VzLnRvZ2dsZUZpbHRlckNvdW50KCk7XG4gIH1cblxuICBwdWJsaWMgYWRkQXNzZXRUb0NhcnQoYXNzZXQ6IGFueSk6IHZvaWQge1xuICAgIGxldCBwYXJhbXM6IEFkZEFzc2V0UGFyYW1ldGVycyA9IHsgbGluZUl0ZW06IHsgYXNzZXQ6IGFzc2V0IH0gfTtcbiAgICBpZiAodGhpcy51c2VyQ2FuLmFkbWluaXN0ZXJRdW90ZXMoKSkge1xuICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmFkZEFzc2V0VG9Qcm9qZWN0SW5RdW90ZShwYXJhbXMpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jYXJ0LmFkZEFzc2V0VG9Qcm9qZWN0SW5DYXJ0KHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGNoYW5nZVBhZ2UocGFnZTogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZWFyY2hDb250ZXh0LnVwZGF0ZSA9IHsgaTogcGFnZSB9O1xuICAgIHRoaXMuc2VhcmNoQ29udGV4dC5nbygpO1xuICB9XG5cbiAgcHVibGljIHNvcnRSZXN1bHRzKHNvcnREZWZpbml0aW9uOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJQcmVmZXJlbmNlcy51cGRhdGVTb3J0UHJlZmVyZW5jZShzb3J0RGVmaW5pdGlvbi5pZCk7XG4gICAgdGhpcy5zb3J0RGVmaW5pdGlvbi51cGRhdGUoeyBjdXJyZW50U29ydDogc29ydERlZmluaXRpb24gfSk7XG4gICAgdGhpcy5zZWFyY2hDb250ZXh0LnVwZGF0ZSA9IHsgJ2knOiAxLCAnc29ydElkJzogc29ydERlZmluaXRpb24uaWQgfTtcbiAgICB0aGlzLnNlYXJjaENvbnRleHQuZ28oKTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VBc3NldFZpZXcodmlld1R5cGU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXNlclByZWZlcmVuY2VzLnVwZGF0ZUFzc2V0Vmlld1ByZWZlcmVuY2Uodmlld1R5cGUpO1xuICB9XG5cbiAgcHVibGljIGZpbHRlckV2ZW50KGV2ZW50OiBhbnkpIHtcbiAgICBzd2l0Y2ggKGV2ZW50LmV2ZW50KSB7XG4gICAgICBjYXNlICd0b2dnbGVGaWx0ZXInOlxuICAgICAgICB0aGlzLmZpbHRlci50b2dnbGUoZXZlbnQuZmlsdGVyLmZpbHRlcklkKTtcbiAgICAgICAgdGhpcy5maWx0ZXJBc3NldHMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd0b2dnbGVGaWx0ZXJHcm91cCc6XG4gICAgICAgIHRoaXMuZmlsdGVyLnRvZ2dsZUZpbHRlckdyb3VwKGV2ZW50LmZpbHRlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnYXBwbHlFeGNsdXNpdmVGaWx0ZXInOlxuICAgICAgICB0aGlzLmZpbHRlci50b2dnbGVFeGNsdXNpdmUoZXZlbnQuZmlsdGVyKTtcbiAgICAgICAgdGhpcy5maWx0ZXJBc3NldHMoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdhcHBseUN1c3RvbVZhbHVlJzpcbiAgICAgICAgdGhpcy5maWx0ZXIuYWRkQ3VzdG9tKGV2ZW50LmZpbHRlciwgZXZlbnQuY3VzdG9tVmFsdWUpO1xuICAgICAgICB0aGlzLmZpbHRlckFzc2V0cygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NsZWFyRmlsdGVycyc6XG4gICAgICAgIHRoaXMuZmlsdGVyLmNsZWFyKCk7XG4gICAgICAgIHRoaXMuZmlsdGVyQXNzZXRzKCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrQnJlYWRjcnVtYihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgcm91dGU6IGFueVtdID0gaW5kZXggPT09IDAgPyBbJy8nXSA6IFsnL2dhbGxlcnktdmlldyddO1xuICAgIGxldCBwYXRoU2VnbWVudDogYW55ID0gdGhpcy5wYXRoLnNsaWNlKDAsIGluZGV4KTtcbiAgICBpZiAocGF0aFNlZ21lbnQgJiYgcGF0aFNlZ21lbnQubGVuZ3RoID4gMCkgcm91dGUucHVzaCh7IHBhdGg6IEpTT04uc3RyaW5naWZ5KHBhdGhTZWdtZW50KSB9KTtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShyb3V0ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbkVkaXRDb2xsZWN0aW9uKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGxldCBhY3RpdmVDb2xsZWN0aW9uOiBDb2xsZWN0aW9uO1xuICAgIHRoaXMuYWN0aXZlQ29sbGVjdGlvbi50YWtlKDEpLnN1YnNjcmliZShjb2xsZWN0aW9uID0+IGFjdGl2ZUNvbGxlY3Rpb24gPSBjb2xsZWN0aW9uKTtcbiAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmVkaXRDb2xsZWN0aW9uKGFjdGl2ZUNvbGxlY3Rpb24pO1xuICB9XG5cbiAgcHVibGljIG9uQ2xpY2tBZGRBbGxCdG4oKTogdm9pZCB7XG4gICAgbGV0IGNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7XG4gICAgdGhpcy5hY3RpdmVDb2xsZWN0aW9uLnRha2UoMSkuc3Vic2NyaWJlKGNvbGxlY3Rpb24gPT4gY29sbGVjdGlvbk5hbWUgPSBjb2xsZWN0aW9uLm5hbWUpO1xuXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+XG4gICAgICBmYWN0b3J5LmRpYWxvZy5zaG93Q29uZmlybWF0aW9uKHtcbiAgICAgICAgdGl0bGU6IHsga2V5OiAnU0VBUkNILkFERF9BTExfVE9fQ09MTEVDVElPTi5DT05GSVJNLlRJVExFJywgdmFsdWVzOiB7IGNvbGxlY3Rpb25OYW1lIH0gfSxcbiAgICAgICAgbWVzc2FnZTogeyBrZXk6ICdTRUFSQ0guQUREX0FMTF9UT19DT0xMRUNUSU9OLkNPTkZJUk0uTUVTU0FHRScsIHZhbHVlczogeyBjb2xsZWN0aW9uTmFtZSB9IH0sXG4gICAgICAgIGFjY2VwdDogJ1NFQVJDSC5BRERfQUxMX1RPX0NPTExFQ1RJT04uQ09ORklSTS5BQ0NFUFQnLFxuICAgICAgICBkZWNsaW5lOiAnU0VBUkNILkFERF9BTExfVE9fQ09MTEVDVElPTi5DT05GSVJNLkRFQ0xJTkUnXG4gICAgICB9LCAoKSA9PiB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLmFkZFBhZ2VPZlNlYXJjaEFzc2V0cygpKSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfZmlsdGVyc0FyZUF2YWlsYWJsZSgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuaGVhZGVyRGlzcGxheU9wdGlvbnMuZmlsdGVyc0FyZUF2YWlsYWJsZSk7XG4gIH1cblxuICBwcml2YXRlIGZpbHRlckFzc2V0cygpOiB2b2lkIHtcbiAgICB0aGlzLnNlYXJjaENvbnRleHQudXBkYXRlID0geyBpOiAxIH07XG4gICAgbGV0IGFjdGl2ZUZpbHRlcnM6IGFueSA9IHRoaXMuZmlsdGVyLmdldEFjdGl2ZSgpO1xuXG4gICAgbGV0IGZpbHRlcklkcyA9IChhY3RpdmVGaWx0ZXJzLmlkcy5sZW5ndGggPiAwKSA/IHsgJ2ZpbHRlcklkcyc6IGFjdGl2ZUZpbHRlcnMuaWRzLmpvaW4oJywnKSB9IDogbnVsbDtcbiAgICBsZXQgZmlsdGVyVmFsdWVzID0gKGFjdGl2ZUZpbHRlcnMudmFsdWVzLmxlbmd0aCA+IDApID8geyAnZmlsdGVyVmFsdWVzJzogYWN0aXZlRmlsdGVycy52YWx1ZXMuam9pbignLCcpIH0gOiBudWxsO1xuXG4gICAgKGZpbHRlcklkcykgPyB0aGlzLnNlYXJjaENvbnRleHQudXBkYXRlID0gZmlsdGVySWRzIDogdGhpcy5zZWFyY2hDb250ZXh0LnJlbW92ZSA9ICdmaWx0ZXJJZHMnO1xuICAgIChmaWx0ZXJWYWx1ZXMpID8gdGhpcy5zZWFyY2hDb250ZXh0LnVwZGF0ZSA9IGZpbHRlclZhbHVlcyA6IHRoaXMuc2VhcmNoQ29udGV4dC5yZW1vdmUgPSAnZmlsdGVyVmFsdWVzJztcblxuICAgIHRoaXMuc2VhcmNoQ29udGV4dC5nbygpO1xuICB9XG59XG4iXX0=
