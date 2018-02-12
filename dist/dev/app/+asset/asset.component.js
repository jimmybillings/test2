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
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], AssetComponent.prototype, "assetType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetComponent.prototype, "commentFormConfig", void 0);
    AssetComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-component',
            templateUrl: 'asset.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities,
            window_ref_service_1.WindowRef,
            router_1.Router,
            router_1.ActivatedRoute,
            app_store_1.AppStore,
            user_preference_service_1.UserPreferenceService,
            cart_service_1.CartService,
            wz_dialog_service_1.WzDialogService,
            search_context_service_1.SearchContext])
    ], AssetComponent);
    return AssetComponent;
}());
exports.AssetComponent = AssetComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvYXNzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTZGO0FBQzdGLDBDQUF5RDtBQUd6RCxnRkFBdUU7QUFDdkUsZ0VBQThEO0FBQzlELHNGQUFtRjtBQUduRiw0RkFBeUY7QUFFekYsNkZBQTBGO0FBQzFGLDRFQUFrRTtBQUVsRSxzRUFBNkY7QUFFN0YsOEVBQWdGO0FBQ2hGLDBDQUFtRTtBQUtuRSx5RUFBOEQ7QUFDOUQsb0ZBQTBFO0FBQzFFLDRFQUF5RTtBQUV6RSx5SEFBb0g7QUFRcEg7SUFjRSx3QkFDUyxPQUFxQixFQUNyQixNQUFpQixFQUNoQixNQUFjLEVBQ2QsS0FBcUIsRUFDckIsS0FBZSxFQUNmLGNBQXFDLEVBQ3JDLFdBQXdCLEVBQ3hCLGFBQThCLEVBQzlCLGFBQTRCO1FBUjdCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQUNyQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFaOUIsbUJBQWMsR0FBMkMsSUFBSSxDQUFDO0lBYWxFLENBQUM7SUFFRSxpQ0FBUSxHQUFmO1FBQUEsaUJBb0JDO1FBbkJDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLE9BQU8sRUFBYixDQUFhLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFtQjtZQUN0RSxLQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFDO1lBQ2pELEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFL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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXIsIEFjdGl2YXRlZFJvdXRlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFkZEFzc2V0UGFyYW1ldGVycywgQ2FydCwgUHJpY2VBdHRyaWJ1dGUsIFByb2plY3QsIEFzc2V0TGluZUl0ZW0gfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUG9qbywgU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZSwgV3pFdmVudCB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FwYWJpbGl0aWVzIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhcGFiaWxpdGllcy5zZXJ2aWNlJztcbmltcG9ydCB7IENhcnRTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2NhcnQuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyUHJlZmVyZW5jZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNYXREaWFsb2dSZWYgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBXekRpYWxvZ1NlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvc2VydmljZXMvd3ouZGlhbG9nLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGVmYXVsdENvbXBvbmVudE9wdGlvbnMgfSBmcm9tICcuLi9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvaW50ZXJmYWNlcy93ei5kaWFsb2cuaW50ZXJmYWNlJztcbmltcG9ydCB7IFd6UHJpY2luZ0NvbXBvbmVudCB9IGZyb20gJy4uL3NoYXJlZC9jb21wb25lbnRzL3d6LXByaWNpbmcvd3oucHJpY2luZy5jb21wb25lbnQnO1xuaW1wb3J0IHsgV2luZG93UmVmIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL3dpbmRvdy1yZWYuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBFbmhhbmNlZEFzc2V0LCBlbmhhbmNlQXNzZXQsIEFzc2V0VHlwZSB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCAqIGFzIENvbW1vbkludGVyZmFjZSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCAqIGFzIFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlIGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5pbXBvcnQgeyBBcHBTdG9yZSwgU3RhdGVNYXBwZXIsIFByaWNpbmdTdGF0ZSB9IGZyb20gJy4uL2FwcC5zdG9yZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29tbWVudFBhcmVudE9iamVjdCwgT2JqZWN0VHlwZSB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaFBhcmFtcyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL3NlYXJjaC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgU2VhcmNoQ29udGV4dCB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9zZWFyY2gtY29udGV4dC5zZXJ2aWNlJztcbmltcG9ydCB7IEFzc2V0U2hhcmVDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvYXNzZXQtc2hhcmUuY29tcG9uZW50JztcbmltcG9ydCB7IEFzc2V0U2hhcmVEaWFsb2dPcHRpb25zIH0gZnJvbSAnLi4vc2hhcmVkL2ludGVyZmFjZXMvYXNzZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbGxlY3Rpb25MaXN0RGRDb21wb25lbnQgfSBmcm9tICcuLi9hcHBsaWNhdGlvbi9jb2xsZWN0aW9uLXRyYXkvY29tcG9uZW50cy9jb2xsZWN0aW9ucy1saXN0LWRkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2Fzc2V0LWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnYXNzZXQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEFzc2V0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBhc3NldFR5cGU6IEFzc2V0VHlwZTtcbiAgQElucHV0KCkgY29tbWVudEZvcm1Db25maWc6IEZvcm1GaWVsZHM7XG4gIHB1YmxpYyBhc3NldDogRW5oYW5jZWRBc3NldDtcbiAgcHVibGljIGNvbW1lbnRQYXJlbnRPYmplY3Q6IENvbW1lbnRQYXJlbnRPYmplY3Q7XG4gIHB1YmxpYyBpc1NoYXJlZDogYm9vbGVhbjtcbiAgcHJpdmF0ZSBhc3NldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHJvdXRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG4gIHByaXZhdGUgcHJpY2luZ1N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwcml2YXRlIHNlbGVjdGVkQXR0cmlidXRlczogQ29tbW9uSW50ZXJmYWNlLlBvam87XG4gIHByaXZhdGUgYXBwbGllZEF0dHJpYnV0ZXM6IFNlbGVjdGVkUHJpY2VBdHRyaWJ1dGVbXTtcbiAgcHJpdmF0ZSBzdWJjbGlwTWFya2VyczogU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuU3ViY2xpcE1hcmtlcnMgPSBudWxsO1xuICBwcml2YXRlIHBhcmVudEFzc2V0OiBFbmhhbmNlZEFzc2V0O1xuICBwcml2YXRlIHBhcmVudExpbmVJdGVtOiBBc3NldExpbmVJdGVtO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXNlckNhbjogQ2FwYWJpbGl0aWVzLFxuICAgIHB1YmxpYyB3aW5kb3c6IFdpbmRvd1JlZixcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgdXNlclByZWZlcmVuY2U6IFVzZXJQcmVmZXJlbmNlU2VydmljZSxcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBDYXJ0U2VydmljZSxcbiAgICBwcml2YXRlIGRpYWxvZ1NlcnZpY2U6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHNlYXJjaENvbnRleHQ6IFNlYXJjaENvbnRleHRcbiAgKSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucHJpY2luZykuc3Vic2NyaWJlKChzdGF0ZTogUHJpY2luZ1N0YXRlKSA9PiB7XG4gICAgICB0aGlzLmFwcGxpZWRBdHRyaWJ1dGVzID0gc3RhdGUuYXBwbGllZEF0dHJpYnV0ZXM7XG4gICAgICB0aGlzLnNlbGVjdGVkQXR0cmlidXRlcyA9IHN0YXRlLnNlbGVjdGVkQXR0cmlidXRlcztcbiAgICB9KTtcblxuICAgIHRoaXMuYXNzZXRTdWJzY3JpcHRpb24gPSB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5hc3NldC5hY3RpdmVBc3NldClcbiAgICAgIC5tYXAoYXNzZXQgPT4ge1xuICAgICAgICBjb25zdCBjbG9uZWRBc3NldCA9IENvbW1vbi5jbG9uZShhc3NldCk7XG4gICAgICAgIHJldHVybiBlbmhhbmNlQXNzZXQoY2xvbmVkQXNzZXQsIHRoaXMuYXNzZXRUeXBlLCB0aGlzLnBhcmVudElkSW4odGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXMpKTtcbiAgICAgIH0pLnN1YnNjcmliZShhc3NldCA9PiB7XG4gICAgICAgIHRoaXMuYXNzZXQgPSBhc3NldDtcbiAgICAgICAgdGhpcy5sb2FkQ29ycmVzcG9uZGluZ1BhcmVudEFzc2V0KCk7XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZVJpZ2h0c01hbmFnZWRQcmljaW5nKCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMucm91dGVTdWJzY3JpcHRpb24gPSB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUoKHBhcmFtczogYW55KSA9PiB7XG4gICAgICB0aGlzLmlzU2hhcmVkID0gISFwYXJhbXMuc2hhcmVfa2V5O1xuICAgICAgdGhpcy5jb21tZW50UGFyZW50T2JqZWN0ID0gdGhpcy5jb21tZW50UGFyZW50T2JqZWN0RnJvbVJvdXRlKHBhcmFtcyk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXNzZXRTdWJzY3JpcHRpb24pIHRoaXMuYXNzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5yb3V0ZVN1YnNjcmlwdGlvbikgdGhpcy5yb3V0ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLnByaWNpbmdTdWJzY3JpcHRpb24pIHRoaXMucHJpY2luZ1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHVibGljIHByZXZpb3VzUGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLndpbmRvdy5uYXRpdmVXaW5kb3cuaGlzdG9yeS5iYWNrKCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFjdGl2ZUNvbGxlY3Rpb24oKTogT2JzZXJ2YWJsZTxDb2xsZWN0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmFjdGl2ZUNvbGxlY3Rpb24uY29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByaWNlRm9yRGV0YWlscygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5wcmljaW5nLnByaWNlRm9yRGV0YWlscyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNlYXJjaENvbnRleHRTdGF0ZSgpOiBTZWFyY2hQYXJhbXMge1xuICAgIHJldHVybiB0aGlzLnNlYXJjaENvbnRleHQuc3RhdGU7XG4gIH1cblxuICBwdWJsaWMgYWRkQXNzZXRUb0NhcnQocGFyYW1ldGVyczogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUucHJpY2luZykudGFrZSgxKS5zdWJzY3JpYmUoKHN0YXRlOiBQcmljaW5nU3RhdGUpID0+IHtcbiAgICAgIGxldCBvcHRpb25zOiBBZGRBc3NldFBhcmFtZXRlcnMgPSB7XG4gICAgICAgIGxpbmVJdGVtOiB7XG4gICAgICAgICAgc2VsZWN0ZWRUcmFuc2NvZGVUYXJnZXQ6IHBhcmFtZXRlcnMuc2VsZWN0ZWRUcmFuc2NvZGVUYXJnZXQsXG4gICAgICAgICAgcHJpY2U6IHN0YXRlLnByaWNlRm9yRGV0YWlscyA/IHN0YXRlLnByaWNlRm9yRGV0YWlscyA6IG51bGwsXG4gICAgICAgICAgYXNzZXQ6IHsgYXNzZXRJZDogcGFyYW1ldGVycy5hc3NldElkIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWFya2VyczogcGFyYW1ldGVycy5tYXJrZXJzLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0aGlzLmFwcGxpZWRBdHRyaWJ1dGVzID8gdGhpcy5hcHBsaWVkQXR0cmlidXRlcyA6IG51bGxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkgP1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZUVkaXQuYWRkQXNzZXRUb1Byb2plY3RJblF1b3RlKG9wdGlvbnMpKSA6XG4gICAgICAgIHRoaXMuY2FydFNlcnZpY2UuYWRkQXNzZXRUb1Byb2plY3RJbkNhcnQob3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0UHJpY2luZ0F0dHJpYnV0ZXMocmlnaHRzUmVwcm9kdWN0aW9uOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5wcmljaW5nLmluaXRpYWxpemVQcmljaW5nKFxuICAgICAgcmlnaHRzUmVwcm9kdWN0aW9uLFxuICAgICAgdGhpcy5wcmljaW5nRGlhbG9nT3B0aW9uc1xuICAgICkpO1xuICB9XG5cbiAgcHVibGljIG9uTWFya2Vyc0NoYW5nZShtYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2Vycyk6IHZvaWQge1xuICAgIGNvbnN0IHVwZGF0ZVByaWNlOiBib29sZWFuID1cbiAgICAgICEhdGhpcy5zZWxlY3RlZEF0dHJpYnV0ZXMgJiYgKFxuICAgICAgICBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5ib3RoTWFya2Vyc0FyZVNldChtYXJrZXJzKSB8fFxuICAgICAgICBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5uZWl0aGVyTWFya2Vyc0FyZVNldChtYXJrZXJzKVxuICAgICAgKTtcblxuICAgIHRoaXMuc3ViY2xpcE1hcmtlcnMgPSBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5ib3RoTWFya2Vyc0FyZVNldChtYXJrZXJzKSA/IG1hcmtlcnMgOiBudWxsO1xuXG4gICAgaWYgKHVwZGF0ZVByaWNlKSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5wcmljaW5nLmNhbGN1bGF0ZVByaWNlKFxuICAgICAgICB0aGlzLnNlbGVjdGVkQXR0cmlidXRlcyxcbiAgICAgICAgdGhpcy5hc3NldC5hc3NldElkLFxuICAgICAgICB0aGlzLnN1YmNsaXBNYXJrZXJzXG4gICAgICApKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFzc2V0TWF0Y2hlc0NhcnRBc3NldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRBc3NldFxuICAgICAgPyB0aGlzLnN1YmNsaXBNYXJrZXJzTWF0Y2hDYXJ0QXNzZXRcbiAgICAgIDogdHJ1ZTsgLy8gV2UgcG9wdWxhdGUgdGhpcy5wYXJlbnRBc3NldCBmb3IgJ2NhcnQnLCAncXVvdGVFZGl0JyB0eXBlcyBvbmx5LlxuICB9XG5cbiAgcHVibGljIG9uVXBkYXRlQXNzZXRMaW5lSXRlbSgpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXJDYW4uYWRtaW5pc3RlclF1b3RlcygpID9cbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnF1b3RlRWRpdC5lZGl0TGluZUl0ZW1Gcm9tRGV0YWlscyhcbiAgICAgICAgdGhpcy5hc3NldC51dWlkLFxuICAgICAgICB0aGlzLnN1YmNsaXBNYXJrZXJzLFxuICAgICAgICB0aGlzLmFwcGxpZWRBdHRyaWJ1dGVzXG4gICAgICApKSA6XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jYXJ0LmVkaXRMaW5lSXRlbUZyb21EZXRhaWxzKFxuICAgICAgICB0aGlzLmFzc2V0LnV1aWQsXG4gICAgICAgIHRoaXMuc3ViY2xpcE1hcmtlcnMsXG4gICAgICAgIHRoaXMuYXBwbGllZEF0dHJpYnV0ZXNcbiAgICAgICkpO1xuICB9XG5cbiAgcHVibGljIG9uQ3JlYXRlU2hhcmVEaWFsb2cocGFyYW1zOiBBc3NldFNoYXJlRGlhbG9nT3B0aW9ucykge1xuICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coXG4gICAgICB7XG4gICAgICAgIGNvbXBvbmVudFR5cGU6IEFzc2V0U2hhcmVDb21wb25lbnQsXG4gICAgICAgIGRpYWxvZ0NvbmZpZzogeyBwb3NpdGlvbjogeyB0b3A6ICczJScgfSwgcGFuZWxDbGFzczogJ3d6LXNoYXJlLWRpYWxvZycgfSxcbiAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgZW5oYW5jZWRBc3NldDogcGFyYW1zLmVuaGFuY2VkQXNzZXQsXG4gICAgICAgICAgc3ViY2xpcE1hcmtlcnM6IHBhcmFtcy5zdWJjbGlwTWFya2VycyxcbiAgICAgICAgICBmb3JtRmllbGRzOiBwYXJhbXMuZm9ybUZpZWxkc1xuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRPcHRpb25zOiBbe1xuICAgICAgICAgIGV2ZW50OiAnY2xvc2VSZXF1ZXN0JyxcbiAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdHJ1ZSxcbiAgICAgICAgICBjbG9zZU9uRXZlbnQ6IHRydWVcbiAgICAgICAgfV1cbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcHVibGljIGFkZFRvRGlmZmVyZW50Q29sbGVjdGlvbigpOiB2b2lkIHtcbiAgICBsZXQgZm9jdXNlZENvbGxlY3Rpb246IENvbGxlY3Rpb247XG4gICAgdGhpcy5hY3RpdmVDb2xsZWN0aW9uXG4gICAgICAudGFrZSgxKVxuICAgICAgLnN1YnNjcmliZShjb2xsZWN0aW9uID0+IGZvY3VzZWRDb2xsZWN0aW9uID0gY29sbGVjdGlvbik7XG4gICAgdGhpcy5kaWFsb2dTZXJ2aWNlLm9wZW5Db21wb25lbnRJbkRpYWxvZyh7XG4gICAgICBjb21wb25lbnRUeXBlOiBDb2xsZWN0aW9uTGlzdERkQ29tcG9uZW50LFxuICAgICAgZGlhbG9nQ29uZmlnOiB7IHBvc2l0aW9uOiB7IHRvcDogJzMlJyB9LCBwYW5lbENsYXNzOiAnY29sbGVjdGlvbi1saXN0LWRkLWNvbXBvbmVudCcgfSxcbiAgICAgIGlucHV0T3B0aW9uczoge1xuICAgICAgICBmb2N1c2VkQ29sbGVjdGlvbjogZm9jdXNlZENvbGxlY3Rpb24sXG4gICAgICAgIHJvbGVGaWx0ZXI6IFsnb3duZXInLCAnZWRpdG9yJ10sXG4gICAgICAgIGVkaXRNb2RlOiB0cnVlXG4gICAgICB9LFxuICAgICAgb3V0cHV0T3B0aW9uczogW3tcbiAgICAgICAgZXZlbnQ6ICdjbG9zZScsXG4gICAgICAgIGNhbGxiYWNrOiAoY29sbGVjdGlvbjogQ29sbGVjdGlvbikgPT4ge1xuICAgICAgICAgIGlmIChjb2xsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT5cbiAgICAgICAgICAgICAgZmFjdG9yeS5jb2xsZWN0aW9ucy5hZGRBc3NldFRvQ29sbGVjdGlvbihjb2xsZWN0aW9uLCB0aGlzLmFzc2V0KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgfV1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHByaWNpbmdEaWFsb2dPcHRpb25zKCk6IERlZmF1bHRDb21wb25lbnRPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29tcG9uZW50VHlwZTogV3pQcmljaW5nQ29tcG9uZW50LFxuICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgIHByaWNpbmdQcmVmZXJlbmNlczogdGhpcy51c2VyUHJlZmVyZW5jZS5zdGF0ZS5wcmljaW5nUHJlZmVyZW5jZXMsXG4gICAgICAgIHVzZXJDYW5DdXN0b21pemVSaWdodHM6IHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCkgJiYgdGhpcy5hc3NldFR5cGUgPT09ICdxdW90ZUVkaXQnXG4gICAgICB9LFxuICAgICAgb3V0cHV0T3B0aW9uczogW1xuICAgICAgICB7XG4gICAgICAgICAgZXZlbnQ6ICdwcmljaW5nRXZlbnQnLFxuICAgICAgICAgIGNhbGxiYWNrOiAoZXZlbnQ6IFd6RXZlbnQsIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFd6UHJpY2luZ0NvbXBvbmVudD4pID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hBY3Rpb25Gb3JQcmljaW5nRXZlbnQoZXZlbnQsIGRpYWxvZ1JlZik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVJpZ2h0c01hbmFnZWRQcmljaW5nKCkge1xuICAgIC8vIEZvciBhIHJpZ2h0cyBtYW5hZ2VkIGNsaXAgdGhhdCBoYXMgYXR0cmlidXRlcyBhbmQgYSBwcmljZSwgc2V0IGl0IGluIHRoZSBwcmljZSBzdG9yZS5cbiAgICBpZiAodGhpcy5hc3NldC5nZXRNZXRhZGF0YVZhbHVlRm9yKCdSaWdodHMuUmVwcm9kdWN0aW9uJykgPT09ICdSaWdodHMgTWFuYWdlZCcpIHtcbiAgICAgIGlmICh0aGlzLnBhcmVudExpbmVJdGVtICYmIHRoaXMucGFyZW50TGluZUl0ZW0uYXR0cmlidXRlcyAmJiB0aGlzLnBhcmVudExpbmVJdGVtLnByaWNlKSB7XG4gICAgICAgIHRoaXMuc2V0QWxsUHJpY2luZyh0aGlzLnBhcmVudExpbmVJdGVtLnByaWNlLCB0aGlzLnBhcmVudExpbmVJdGVtLmF0dHJpYnV0ZXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gSWYgdGhlIGNsaXAgZG9lc24ndCBoYXZlIHRoZSBhYm92ZSB0aGVuIGJlIHN1cmUgdG8gcmVzZXQgdGhlIHByaWNlIGFuZCByaWdodHMuXG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnByaWNpbmcucmVzZXRQcmljaW5nKCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZGlzcGF0Y2hBY3Rpb25Gb3JQcmljaW5nRXZlbnQoZXZlbnQ6IFd6RXZlbnQsIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFd6UHJpY2luZ0NvbXBvbmVudD4pOiB2b2lkIHtcbiAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ0NBTENVTEFURV9QUklDRSc6XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LnByaWNpbmcuY2FsY3VsYXRlUHJpY2UoXG4gICAgICAgICAgZXZlbnQucGF5bG9hZCxcbiAgICAgICAgICB0aGlzLmFzc2V0LmFzc2V0SWQsXG4gICAgICAgICAgdGhpcy5zdWJjbGlwTWFya2Vyc1xuICAgICAgICApKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdBUFBMWV9QUklDRSc6XG4gICAgICAgIGlmIChldmVudC5wYXlsb2FkLnVwZGF0ZVByZWZzKSB7XG4gICAgICAgICAgdGhpcy51c2VyUHJlZmVyZW5jZS51cGRhdGVQcmljaW5nUHJlZmVyZW5jZXMoZXZlbnQucGF5bG9hZC5wcmVmZXJlbmNlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuc2V0QWxsUHJpY2luZyhldmVudC5wYXlsb2FkLnByaWNlLCBldmVudC5wYXlsb2FkLmF0dHJpYnV0ZXMpO1xuICAgICAgICBpZiAodGhpcy5hc3NldFR5cGUgPT09ICdxdW90ZUVkaXQnKSB7XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucXVvdGVFZGl0LmVkaXRMaW5lSXRlbUZyb21EZXRhaWxzKFxuICAgICAgICAgICAgdGhpcy5hc3NldC51dWlkLFxuICAgICAgICAgICAgdGhpcy5zdWJjbGlwTWFya2VycyxcbiAgICAgICAgICAgIGV2ZW50LnBheWxvYWQuYXR0cmlidXRlc1xuICAgICAgICAgICkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFzc2V0VHlwZSA9PT0gJ2NhcnQnKSB7XG4gICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY2FydC5lZGl0TGluZUl0ZW1Gcm9tRGV0YWlscyhcbiAgICAgICAgICAgIHRoaXMuYXNzZXQudXVpZCxcbiAgICAgICAgICAgIHRoaXMuc3ViY2xpcE1hcmtlcnMsXG4gICAgICAgICAgICBldmVudC5wYXlsb2FkLmF0dHJpYnV0ZXNcbiAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ0VSUk9SJzpcbiAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuZXJyb3IuaGFuZGxlQ3VzdG9tRXJyb3IoZXZlbnQucGF5bG9hZCkpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNldEFsbFByaWNpbmcocHJpY2U6IG51bWJlciwgYXR0cmlidXRlczogU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZVtdKSB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkucHJpY2luZy5zZXRQcmljZUZvckRldGFpbHMocHJpY2UpKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5wcmljaW5nLnNldEFwcGxpZWRBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgbG9hZENvcnJlc3BvbmRpbmdQYXJlbnRBc3NldCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmVudEFzc2V0ID0gbnVsbDtcbiAgICB0aGlzLnBhcmVudExpbmVJdGVtID0gbnVsbDtcblxuICAgIGxldCBwcm9qZWN0czogUHJvamVjdFtdO1xuICAgIHN3aXRjaCAodGhpcy5hc3NldFR5cGUpIHtcbiAgICAgIGNhc2UgJ2NhcnQnOlxuICAgICAgY2FzZSAncXVvdGVFZGl0JzpcbiAgICAgIGNhc2UgJ3F1b3RlU2hvdyc6XG4gICAgICAgIHByb2plY3RzID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZCgoc3RhdGU6IGFueSkgPT4gc3RhdGVbdGhpcy5hc3NldFR5cGVdLmRhdGEucHJvamVjdHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ29yZGVyJzpcbiAgICAgICAgcHJvamVjdHMgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKChzdGF0ZTogYW55KSA9PiBzdGF0ZVt0aGlzLmFzc2V0VHlwZV0uYWN0aXZlT3JkZXIucHJvamVjdHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6IHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsaW5lSXRlbSA9IHByb2plY3RzXG4gICAgICAuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC5saW5lSXRlbXMpXG4gICAgICAucmVkdWNlKChsaW5lSXRlbXMsIHByb2plY3QpID0+IGxpbmVJdGVtcy5jb25jYXQocHJvamVjdC5saW5lSXRlbXMpLCBbXSlcbiAgICAgIC5maW5kKGxpbmVJdGVtID0+IGxpbmVJdGVtLmlkID09PSB0aGlzLmFzc2V0LnV1aWQpO1xuICAgIGlmICghbGluZUl0ZW0pIHJldHVybjsgIC8vIENvdWxkIGhhcHBlbiBkdXJpbmcgaW5pdGlhbGl6YXRpb24uXG5cbiAgICB0aGlzLnBhcmVudExpbmVJdGVtID0gbGluZUl0ZW07XG4gICAgdGhpcy5wYXJlbnRBc3NldCA9IGxpbmVJdGVtLmFzc2V0ID8gZW5oYW5jZUFzc2V0KGxpbmVJdGVtLmFzc2V0LCB0aGlzLmFzc2V0VHlwZSkgOiBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgc3ViY2xpcE1hcmtlcnNNYXRjaENhcnRBc3NldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UubWF0Y2hlcyh0aGlzLnBhcmVudEFzc2V0LnRpbWVTdGFydCwgdGhpcy5wYXJlbnRBc3NldC50aW1lRW5kLCB0aGlzLnN1YmNsaXBNYXJrZXJzKTtcbiAgfVxuXG4gIHByaXZhdGUgY29tbWVudFBhcmVudE9iamVjdEZyb21Sb3V0ZShyb3V0ZVBhcmFtczogYW55KTogQ29tbWVudFBhcmVudE9iamVjdCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9iamVjdElkOiB0aGlzLnBhcmVudElkSW4ocm91dGVQYXJhbXMpLFxuICAgICAgb2JqZWN0VHlwZTogdGhpcy5jb21tZW50T2JqZWN0VHlwZUZyb20odGhpcy5hc3NldFR5cGUpLFxuICAgICAgbmVzdGVkT2JqZWN0SWQ6IHJvdXRlUGFyYW1zLnV1aWQsXG4gICAgICBuZXN0ZWRPYmplY3RUeXBlOiAnbGluZUl0ZW0nXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyZW50SWRJbihyb3V0ZVBhcmFtczogQ29tbW9uSW50ZXJmYWNlLlBvam8pOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5hc3NldFR5cGUgPT09ICdxdW90ZUVkaXQnKSA/XG4gICAgICB0aGlzLnN0b3JlLnNuYXBzaG90KHN0YXRlID0+IHN0YXRlLnF1b3RlRWRpdC5kYXRhLmlkKSA6XG4gICAgICBOdW1iZXIocm91dGVQYXJhbXMuaWQpIHx8IDA7XG4gIH1cblxuICBwcml2YXRlIGNvbW1lbnRPYmplY3RUeXBlRnJvbShhc3NldFR5cGU6IEFzc2V0VHlwZSk6IE9iamVjdFR5cGUge1xuICAgIHN3aXRjaCAoYXNzZXRUeXBlKSB7XG4gICAgICBjYXNlICdjb2xsZWN0aW9uJzoge1xuICAgICAgICByZXR1cm4gJ2NvbGxlY3Rpb24nO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdxdW90ZUVkaXQnOlxuICAgICAgY2FzZSAncXVvdGVTaG93Jzoge1xuICAgICAgICByZXR1cm4gJ3F1b3RlJztcbiAgICAgIH1cblxuICAgICAgY2FzZSAnb3JkZXInOiB7XG4gICAgICAgIHJldHVybiAnb3JkZXInO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiAnY2FydCc7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=
