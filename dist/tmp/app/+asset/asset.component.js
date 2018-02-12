"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var capabilities_service_1 = require("../shared/services/capabilities.service");
var cart_service_1 = require("../shared/services/cart.service");
var user_preference_service_1 = require("../shared/services/user-preference.service");
var wz_dialog_service_1 = require("../shared/modules/wz-dialog/services/wz.dialog.service");
var wz_pricing_component_1 = require("../shared/components/wz-pricing/wz.pricing.component");
var window_ref_service_1 = require("../shared/services/window-ref.service");
var enhanced_asset_1 = require("../shared/interfaces/enhanced-asset");
var SubclipMarkersInterface = require("../shared/interfaces/subclip-markers");
var app_store_1 = require("../app.store");
var common_functions_1 = require("../shared/utilities/common.functions");
var search_context_service_1 = require("../shared/services/search-context.service");
var asset_share_component_1 = require("./components/asset-share.component");
var collections_list_dd_component_1 = require("../application/collection-tray/components/collections-list-dd.component");
var AssetComponent = (function () {
    function AssetComponent(userCan, window, router, route, store, userPreference, cartService, dialogService, searchContext) {
        this.userCan = userCan;
        this.window = window;
        this.router = router;
        this.route = route;
        this.store = store;
        this.userPreference = userPreference;
        this.cartService = cartService;
        this.dialogService = dialogService;
        this.searchContext = searchContext;
        this.subclipMarkers = null;
    }
    AssetComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.store.select(function (state) { return state.pricing; }).subscribe(function (state) {
            _this.appliedAttributes = state.appliedAttributes;
            _this.selectedAttributes = state.selectedAttributes;
        });
        this.assetSubscription = this.store.select(function (state) { return state.asset.activeAsset; })
            .map(function (asset) {
            var clonedAsset = common_functions_1.Common.clone(asset);
            return enhanced_asset_1.enhanceAsset(clonedAsset, _this.assetType, _this.parentIdIn(_this.route.snapshot.params));
        }).subscribe(function (asset) {
            _this.asset = asset;
            _this.loadCorrespondingParentAsset();
            _this.initializeRightsManagedPricing();
        });
        this.routeSubscription = this.route.params.subscribe(function (params) {
            _this.isShared = !!params.share_key;
            _this.commentParentObject = _this.commentParentObjectFromRoute(params);
        });
    };
    AssetComponent.prototype.ngOnDestroy = function () {
        if (this.assetSubscription)
            this.assetSubscription.unsubscribe();
        if (this.routeSubscription)
            this.routeSubscription.unsubscribe();
        if (this.pricingSubscription)
            this.pricingSubscription.unsubscribe();
    };
    AssetComponent.prototype.previousPage = function () {
        this.window.nativeWindow.history.back();
    };
    Object.defineProperty(AssetComponent.prototype, "activeCollection", {
        get: function () {
            return this.store.select(function (state) { return state.activeCollection.collection; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetComponent.prototype, "priceForDetails", {
        get: function () {
            return this.store.select(function (state) { return state.pricing.priceForDetails; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetComponent.prototype, "searchContextState", {
        get: function () {
            return this.searchContext.state;
        },
        enumerable: true,
        configurable: true
    });
    AssetComponent.prototype.addAssetToCart = function (parameters) {
        var _this = this;
        this.store.select(function (state) { return state.pricing; }).take(1).subscribe(function (state) {
            var options = {
                lineItem: {
                    selectedTranscodeTarget: parameters.selectedTranscodeTarget,
                    price: state.priceForDetails ? state.priceForDetails : null,
                    asset: { assetId: parameters.assetId }
                },
                markers: parameters.markers,
                attributes: _this.appliedAttributes ? _this.appliedAttributes : null
            };
            _this.userCan.administerQuotes() ?
                _this.store.dispatch(function (factory) { return factory.quoteEdit.addAssetToProjectInQuote(options); }) :
                _this.cartService.addAssetToProjectInCart(options);
        });
    };
    AssetComponent.prototype.getPricingAttributes = function (rightsReproduction) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.pricing.initializePricing(rightsReproduction, _this.pricingDialogOptions); });
    };
    AssetComponent.prototype.onMarkersChange = function (markers) {
        var _this = this;
        var updatePrice = !!this.selectedAttributes && (SubclipMarkersInterface.bothMarkersAreSet(markers) ||
            SubclipMarkersInterface.neitherMarkersAreSet(markers));
        this.subclipMarkers = SubclipMarkersInterface.bothMarkersAreSet(markers) ? markers : null;
        if (updatePrice) {
            this.store.dispatch(function (factory) { return factory.pricing.calculatePrice(_this.selectedAttributes, _this.asset.assetId, _this.subclipMarkers); });
        }
    };
    Object.defineProperty(AssetComponent.prototype, "assetMatchesCartAsset", {
        get: function () {
            return this.parentAsset
                ? this.subclipMarkersMatchCartAsset
                : true;
        },
        enumerable: true,
        configurable: true
    });
    AssetComponent.prototype.onUpdateAssetLineItem = function () {
        var _this = this;
        this.userCan.administerQuotes() ?
            this.store.dispatch(function (factory) { return factory.quoteEdit.editLineItemFromDetails(_this.asset.uuid, _this.subclipMarkers, _this.appliedAttributes); }) :
            this.store.dispatch(function (factory) { return factory.cart.editLineItemFromDetails(_this.asset.uuid, _this.subclipMarkers, _this.appliedAttributes); });
    };
    AssetComponent.prototype.onCreateShareDialog = function (params) {
        this.dialogService.openComponentInDialog({
            componentType: asset_share_component_1.AssetShareComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'wz-share-dialog' },
            inputOptions: {
                enhancedAsset: params.enhancedAsset,
                subclipMarkers: params.subclipMarkers,
                formFields: params.formFields
            },
            outputOptions: [{
                    event: 'closeRequest',
                    callback: function () { return true; },
                    closeOnEvent: true
                }]
        });
    };
    AssetComponent.prototype.addToDifferentCollection = function () {
        var _this = this;
        var focusedCollection;
        this.activeCollection
            .take(1)
            .subscribe(function (collection) { return focusedCollection = collection; });
        this.dialogService.openComponentInDialog({
            componentType: collections_list_dd_component_1.CollectionListDdComponent,
            dialogConfig: { position: { top: '3%' }, panelClass: 'collection-list-dd-component' },
            inputOptions: {
                focusedCollection: focusedCollection,
                roleFilter: ['owner', 'editor'],
                editMode: true
            },
            outputOptions: [{
                    event: 'close',
                    callback: function (collection) {
                        if (collection) {
                            _this.store.dispatch(function (factory) {
                                return factory.collections.addAssetToCollection(collection, _this.asset);
                            });
                        }
                    },
                    closeOnEvent: true
                }]
        });
    };
    Object.defineProperty(AssetComponent.prototype, "pricingDialogOptions", {
        get: function () {
            var _this = this;
            return {
                componentType: wz_pricing_component_1.WzPricingComponent,
                inputOptions: {
                    pricingPreferences: this.userPreference.state.pricingPreferences,
                    userCanCustomizeRights: this.userCan.administerQuotes() && this.assetType === 'quoteEdit'
                },
                outputOptions: [
                    {
                        event: 'pricingEvent',
                        callback: function (event, dialogRef) {
                            _this.dispatchActionForPricingEvent(event, dialogRef);
                        }
                    }
                ]
            };
        },
        enumerable: true,
        configurable: true
    });
    AssetComponent.prototype.initializeRightsManagedPricing = function () {
        if (this.asset.getMetadataValueFor('Rights.Reproduction') === 'Rights Managed') {
            if (this.parentLineItem && this.parentLineItem.attributes && this.parentLineItem.price) {
                this.setAllPricing(this.parentLineItem.price, this.parentLineItem.attributes);
            }
            else {
                this.store.dispatch(function (factory) { return factory.pricing.resetPricing(); });
            }
        }
    };
    AssetComponent.prototype.dispatchActionForPricingEvent = function (event, dialogRef) {
        var _this = this;
        switch (event.type) {
            case 'CALCULATE_PRICE':
                this.store.dispatch(function (factory) { return factory.pricing.calculatePrice(event.payload, _this.asset.assetId, _this.subclipMarkers); });
                break;
            case 'APPLY_PRICE':
                if (event.payload.updatePrefs) {
                    this.userPreference.updatePricingPreferences(event.payload.preferences);
                }
                dialogRef.close();
                this.setAllPricing(event.payload.price, event.payload.attributes);
                if (this.assetType === 'quoteEdit') {
                    this.store.dispatch(function (factory) { return factory.quoteEdit.editLineItemFromDetails(_this.asset.uuid, _this.subclipMarkers, event.payload.attributes); });
                }
                if (this.assetType === 'cart') {
                    this.store.dispatch(function (factory) { return factory.cart.editLineItemFromDetails(_this.asset.uuid, _this.subclipMarkers, event.payload.attributes); });
                }
                break;
            case 'ERROR':
                this.store.dispatch(function (factory) { return factory.error.handleCustomError(event.payload); });
                break;
        }
    };
    AssetComponent.prototype.setAllPricing = function (price, attributes) {
        this.store.dispatch(function (factory) { return factory.pricing.setPriceForDetails(price); });
        this.store.dispatch(function (factory) { return factory.pricing.setAppliedAttributes(attributes); });
    };
    AssetComponent.prototype.loadCorrespondingParentAsset = function () {
        var _this = this;
        this.parentAsset = null;
        this.parentLineItem = null;
        var projects;
        switch (this.assetType) {
            case 'cart':
            case 'quoteEdit':
            case 'quoteShow':
                projects = this.store.snapshotCloned(function (state) { return state[_this.assetType].data.projects; });
                break;
            case 'order':
                projects = this.store.snapshotCloned(function (state) { return state[_this.assetType].activeOrder.projects; });
                break;
            default: return;
        }
        var lineItem = projects
            .filter(function (project) { return project.lineItems; })
            .reduce(function (lineItems, project) { return lineItems.concat(project.lineItems); }, [])
            .find(function (lineItem) { return lineItem.id === _this.asset.uuid; });
        if (!lineItem)
            return;
        this.parentLineItem = lineItem;
        this.parentAsset = lineItem.asset ? enhanced_asset_1.enhanceAsset(lineItem.asset, this.assetType) : null;
    };
    Object.defineProperty(AssetComponent.prototype, "subclipMarkersMatchCartAsset", {
        get: function () {
            return SubclipMarkersInterface.matches(this.parentAsset.timeStart, this.parentAsset.timeEnd, this.subclipMarkers);
        },
        enumerable: true,
        configurable: true
    });
    AssetComponent.prototype.commentParentObjectFromRoute = function (routeParams) {
        return {
            objectId: this.parentIdIn(routeParams),
            objectType: this.commentObjectTypeFrom(this.assetType),
            nestedObjectId: routeParams.uuid,
            nestedObjectType: 'lineItem'
        };
    };
    AssetComponent.prototype.parentIdIn = function (routeParams) {
        return (this.assetType === 'quoteEdit') ?
            this.store.snapshot(function (state) { return state.quoteEdit.data.id; }) :
            Number(routeParams.id) || 0;
    };
    AssetComponent.prototype.commentObjectTypeFrom = function (assetType) {
        switch (assetType) {
            case 'collection': {
                return 'collection';
            }
            case 'quoteEdit':
            case 'quoteShow': {
                return 'quote';
            }
            case 'order': {
                return 'order';
            }
            default: {
                return 'cart';
            }
        }
    };
    AssetComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-component',
                    templateUrl: 'asset.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AssetComponent.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: window_ref_service_1.WindowRef, },
        { type: router_1.Router, },
        { type: router_1.ActivatedRoute, },
        { type: app_store_1.AppStore, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: cart_service_1.CartService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: search_context_service_1.SearchContext, },
    ]; };
    AssetComponent.propDecorators = {
        'assetType': [{ type: core_1.Input },],
        'commentFormConfig': [{ type: core_1.Input },],
    };
    return AssetComponent;
}());
exports.AssetComponent = AssetComponent;
//# sourceMappingURL=asset.component.js.map