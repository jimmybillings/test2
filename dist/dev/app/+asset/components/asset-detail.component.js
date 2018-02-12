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
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var material_1 = require("@angular/material");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var Observable_1 = require("rxjs/Observable");
var app_store_1 = require("../../app.store");
var enhanced_asset_1 = require("../../shared/interfaces/enhanced-asset");
var AssetDetailComponent = (function () {
    function AssetDetailComponent(store) {
        this.store = store;
        this.addToCart = new core_1.EventEmitter();
        this.getPriceAttributes = new core_1.EventEmitter();
        this.onPreviousPage = new core_1.EventEmitter();
        this.createShareDialog = new core_1.EventEmitter();
        this.onAddtoDifferentCollection = new core_1.EventEmitter();
        this.showAssetSaveSubclip = false;
        this.updateAssetLineItem = new core_1.EventEmitter();
        this.markersChange = new core_1.EventEmitter();
        this.activeCollectionContainsAssetId = false;
        this.activeCollectionContainsAssetUuid = false;
    }
    Object.defineProperty(AssetDetailComponent.prototype, "asset", {
        get: function () {
            return this._asset;
        },
        set: function (asset) {
            this._asset = asset;
            if (asset.transcodeTargets)
                this.selectedTarget = asset.transcodeTargets[0];
            this.setAssetCollectionMembershipFlags();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "activeCollection", {
        set: function (collection) {
            this._activeCollection = collection;
            this.activeCollectionName = collection.name;
            this.setAssetCollectionMembershipFlags();
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.ngOnInit = function () {
        var config = this.store.snapshotCloned(function (state) { return state.uiConfig.components; });
        this.pageSize = parseInt(config.global.config.pageSize.value);
        this.shareFormFields = config.assetSharing.config.form.items;
        this.setDeliveryOptionsFlag();
    };
    Object.defineProperty(AssetDetailComponent.prototype, "hasPageHistory", {
        get: function () {
            return this.window.history.length > 2;
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.previousPage = function () {
        this.onPreviousPage.emit();
    };
    Object.defineProperty(AssetDetailComponent.prototype, "hasRendition", {
        get: function () {
            return !!this._asset.clipUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "routerLinkForAssetParent", {
        get: function () {
            switch (this._asset.type) {
                case 'collection': {
                    return ['/collections', this._asset.parentId, { i: 1, n: this.pageSize }];
                }
                case 'search': {
                    return ['/search', this.searchContext];
                }
                case 'quoteEdit': {
                    return ['/active-quote'];
                }
                case 'quoteShow': {
                    return ['/quotes', this._asset.parentId];
                }
                case 'order': {
                    return ['/orders', this._asset.parentId];
                }
                case 'cart': {
                    return ['/cart'];
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "breadcrumbLabel", {
        get: function () {
            switch (this._asset.type) {
                case 'collection': {
                    return [this.activeCollectionName, ''];
                }
                case 'order':
                case 'quoteShow': {
                    return ["asset.detail.breadcrumb_" + this._asset.type, String(this._asset.parentId)];
                }
                default: {
                    return ["asset.detail.breadcrumb_" + this._asset.type, ''];
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canAddToActiveCollection", {
        get: function () {
            return this.userCan.editCollections() &&
                !this.activeCollectionContainsAssetId &&
                this.assetTypeIsOneOf('collection', 'search');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canRemoveFromActiveCollection", {
        get: function () {
            return this._asset.type === 'collection' && this.activeCollectionContainsAssetUuid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "userCanEditCollection", {
        get: function () {
            return this.userCan.editCollection(this._activeCollection);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canAddAgainToActiveCollection", {
        get: function () {
            return (this._asset.type === 'search' && this.activeCollectionContainsAssetId) ||
                (this._asset.type === 'collection' && (this.activeCollectionContainsAssetId || this.showAssetSaveSubclip));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canUpdateInActiveCollection", {
        get: function () {
            var _this = this;
            return this._asset.type === 'collection' && this.showAssetSaveSubclip && this.activeCollectionContainsAssetUuid &&
                !this._activeCollection.assets.items.some(function (collectionAsset) {
                    var duration = subclip_markers_1.durationFrom(_this.subclipMarkers);
                    return collectionAsset.timeStart === duration.timeStart && collectionAsset.timeEnd === duration.timeEnd;
                });
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.onPlayerMarkersInitialization = function (initialMarkers) {
        this.subclipMarkers = initialMarkers;
        this.showAssetSaveSubclip = false;
        this.markersChange.emit(initialMarkers);
    };
    AssetDetailComponent.prototype.onPlayerMarkerChange = function (newMarkers) {
        var _this = this;
        this.subclipMarkers = newMarkers;
        this.showAssetSaveSubclip = this.markersAreDefined;
        if (this.markersAreDefined && this._asset.type === 'search') {
            this.store.dispatch(function (factory) { return factory.asset.updateMarkersInUrl(_this.subclipMarkers, _this._asset.assetId); });
        }
        this.markersChange.emit(newMarkers);
    };
    AssetDetailComponent.prototype.toggleAssetSaveSubclip = function () {
        this.showAssetSaveSubclip = !this.showAssetSaveSubclip;
    };
    AssetDetailComponent.prototype.addAssetToActiveCollection = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.activeCollection.addAsset(_this._asset, _this.subclipMarkers ? _this.subclipMarkers : null); });
        this.showAssetSaveSubclip = false;
    };
    AssetDetailComponent.prototype.onCreateShareDialog = function () {
        this.createShareDialog.emit({
            enhancedAsset: this._asset,
            subclipMarkers: this.subclipMarkers,
            formFields: this.shareFormFields
        });
    };
    AssetDetailComponent.prototype.removeAssetFromActiveCollection = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.dialog.showConfirmation({
            title: 'COLLECTION.REMOVE_ASSET.TITLE',
            message: 'COLLECTION.REMOVE_ASSET.MESSAGE',
            accept: 'COLLECTION.REMOVE_ASSET.ACCEPT',
            decline: 'COLLECTION.REMOVE_ASSET.DECLINE'
        }, function () { return _this.store.dispatch(function (factory) { return factory.activeCollection.removeAsset(_this._asset); }); }); });
    };
    AssetDetailComponent.prototype.updateAssetInActiveCollection = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.activeCollection.updateAssetMarkers(_this._asset, _this.subclipMarkers); });
    };
    AssetDetailComponent.prototype.addAssetToCart = function () {
        this.addToCart.emit({
            assetId: this._asset.assetId,
            markers: this.markersAreDefined ? this.subclipMarkers : null,
            selectedTranscodeTarget: this.selectedTarget
        });
    };
    AssetDetailComponent.prototype.getPricingAttributes = function () {
        this.getPriceAttributes.emit(this.rights);
    };
    AssetDetailComponent.prototype.onSelectTarget = function (target) {
        this.selectedTarget = target.value;
    };
    Object.defineProperty(AssetDetailComponent.prototype, "canComment", {
        get: function () {
            return this.assetTypeIsOneOf('cart', 'quoteEdit', 'quoteShow', 'collection', 'order');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canShare", {
        get: function () {
            return this.assetTypeIsOneOf('search') && this.userCan.createAccessInfo();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "showAdvancedPlayer", {
        get: function () {
            return this.userCan.viewAdvancedPlayer(this.asset, this.assetIsShared);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "shareButtonLabelKey", {
        get: function () {
            return this.markersAreDefined ? 'ASSET.DETAIL.SHARING_SUBCLIP_BTN_TITLE' : 'ASSET.DETAIL.SHARING_BTN_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "rights", {
        get: function () {
            return this._asset.getMetadataValueFor('Rights.Reproduction');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canShowPrice", {
        get: function () {
            return (this.isRoyaltyFreeWithValidPrice || this.isRightsManagedWithValidPrice);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canShowNoPricingAvailableNotice", {
        get: function () {
            return (this.assetTypeIsOneOf('order', 'quoteShow')) ? false :
                (this.isRoyaltyFree || this.isRightsManaged) && !this._asset.hasOwnProperty('price');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "price", {
        get: function () {
            if (this.isRoyaltyFreeWithValidPrice)
                return this._asset.price;
            if (this.isRightsManagedWithValidPrice)
                return this.usagePrice;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canPerformCartActions", {
        get: function () {
            return this.userCan.haveCart() && (this.isRoyaltyFree || this.isRightsManaged) && this._asset.hasOwnProperty('price');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canSelectTranscodeTarget", {
        get: function () {
            return this.isRoyaltyFree && this.userCan.addToCart() && !!this._asset.transcodeTargets;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canEditOrApplyRights", {
        get: function () {
            return (this._asset.type !== 'order' && this._asset.type !== 'quoteShow')
                && this.isRightsManaged && this.userCan.calculatePrice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canUpdateCartAsset", {
        get: function () {
            return this.assetTypeIsOneOf('cart', 'quoteEdit');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canUpdateCollectionAsset", {
        get: function () {
            return this.assetTypeIsOneOf('collection');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canEditCollectionSubclipMarkers", {
        get: function () {
            return this.canUpdateCollectionAsset && this.markersAreDefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "collectionSubclipButtonHoverTxt", {
        get: function () {
            var active = this.canUpdateInActiveCollection ? 'ACTIVE' : 'DISABLED';
            var markers = this._asset.isSubclipped ? 'UPDATE' : 'ADD_NEW';
            return "ASSET.DETAIL.BUTTON." + markers + ".SUBCLIP." + active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "collectionSubclipButtonLabel", {
        get: function () {
            var markers = this._asset.isSubclipped ? 'UPDATE' : 'ADD_NEW';
            return "ASSET.DETAIL.BUTTON." + markers + ".SUBCLIP.COLLECTION";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "updateCartAssetButtonLabelKey", {
        get: function () {
            var subclipOrAsset = this.markersAreDefined ? 'SUBCLIP' : 'ASSET';
            var quoteOrCart = this.isQuoteUser ? 'QUOTE' : 'CART';
            return "ASSET.DETAIL.BUTTON.UPDATE." + subclipOrAsset + "." + quoteOrCart;
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.updateCartAsset = function () {
        this.updateAssetLineItem.emit();
    };
    Object.defineProperty(AssetDetailComponent.prototype, "canAddToCart", {
        get: function () {
            return this.userCan.addToCart() && this.canBePurchased(this.asset)
                && this.assetTypeIsOneOf('search', 'collection');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "primaryAssetFields", {
        get: function () {
            return this.asset.primary.slice(4, -1).filter(function (field) { return field.value !== null; });
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.translationReady = function (field) {
        return 'assetmetadata.' + field.replace(/\./g, '_');
    };
    Object.defineProperty(AssetDetailComponent.prototype, "addToCartOrQuoteButtonLabelKey", {
        get: function () {
            var onMatchingPage = this.isQuoteUser ? this._asset.type === 'quoteEdit' : this._asset.type === 'cart';
            var operation = onMatchingPage ? 'ADD_NEW' : 'ADD';
            var subclipOrAsset = this.markersAreDefined ? 'SUBCLIP' : 'ASSET';
            var quoteOrCart = this.isQuoteUser ? 'QUOTE' : 'CART';
            return "ASSET.DETAIL.BUTTON." + operation + "." + subclipOrAsset + "." + quoteOrCart;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canGoToSearchAssetDetails", {
        get: function () {
            return this.assetTypeIsOneOf('cart', 'collection', 'order', 'quoteEdit', 'quoteShow') &&
                this.asset.isViewable;
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.goToSearchAssetDetails = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.router.goToSearchAssetDetails(_this._asset.assetId, _this.subclipMarkers); });
    };
    AssetDetailComponent.prototype.toggleCommentsVisibility = function () {
        this.showComments = !this.showComments;
    };
    Object.defineProperty(AssetDetailComponent.prototype, "userCanAddComments", {
        get: function () {
            switch (this.commentParentObject.objectType) {
                case 'collection':
                    return this.userCan.editCollection(this._activeCollection);
                default:
                    return Observable_1.Observable.of(true);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "commentCount", {
        get: function () {
            return this.store.select(function (state) { return state.comment[state.comment.activeObjectType].pagination.totalCount; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "showDownloadButton", {
        get: function () {
            return this.assetTypeIsOneOf('quoteEdit', 'quoteShow', 'search', 'collection', 'cart') &&
                this.asset.isViewable;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "assetName", {
        get: function () {
            return this._asset.common[5].value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "canAddToDifferentCollection", {
        get: function () {
            return this.userCan.haveCollections() && this.assetTypeIsOneOf('collection');
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.addToDifferentCollection = function () {
        this.onAddtoDifferentCollection.emit();
    };
    AssetDetailComponent.prototype.canBePurchased = function (asset) {
        var rights = asset.getMetadataValueFor('Rights.Reproduction');
        if (!rights)
            return false;
        return ['Rights Managed', 'Royalty Free'].includes(rights) &&
            this.store.snapshot(function (state) { return state.asset.activeAsset.assetId &&
                state.asset.activeAsset.hasOwnProperty('price'); });
    };
    AssetDetailComponent.prototype.assetTypeIsOneOf = function () {
        var assetTypes = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            assetTypes[_i] = arguments[_i];
        }
        return assetTypes.includes(this._asset.type);
    };
    AssetDetailComponent.prototype.setAssetCollectionMembershipFlags = function () {
        var _this = this;
        if (!this._activeCollection || !this._asset) {
            this.activeCollectionContainsAssetId = this.activeCollectionContainsAssetUuid = false;
            return;
        }
        var collectionItems = this._activeCollection.assets.items;
        this.activeCollectionContainsAssetId =
            collectionItems.some(function (collectionAsset) { return collectionAsset.assetId === _this._asset.assetId; });
        this.activeCollectionContainsAssetUuid =
            !!this._asset.uuid && collectionItems.some(function (collectionAsset) { return collectionAsset.uuid === _this._asset.uuid; });
    };
    Object.defineProperty(AssetDetailComponent.prototype, "isQuoteUser", {
        get: function () {
            return this.userCan.administerQuotes();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "isRoyaltyFree", {
        get: function () {
            return this.rights === 'Royalty Free';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "isRightsManaged", {
        get: function () {
            return this.rights === 'Rights Managed';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "isRightsManagedWithValidPrice", {
        get: function () {
            return this.isRightsManaged && ((this.usagePrice !== null && this.usagePrice !== undefined && this.usagePrice > 0));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "isRoyaltyFreeWithValidPrice", {
        get: function () {
            return this.isRoyaltyFree && this._asset.hasOwnProperty('price') && this._asset.price > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetDetailComponent.prototype, "markersAreDefined", {
        get: function () {
            return !!this.subclipMarkers && !!this.subclipMarkers.in && !!this.subclipMarkers.out;
        },
        enumerable: true,
        configurable: true
    });
    AssetDetailComponent.prototype.setDeliveryOptionsFlag = function () {
        this.hasDeliveryOptions = this.store.select(function (state) { return state.deliveryOptions.hasDeliveryOptions; });
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", enhanced_asset_1.EnhancedAsset),
        __metadata("design:paramtypes", [enhanced_asset_1.EnhancedAsset])
    ], AssetDetailComponent.prototype, "asset", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AssetDetailComponent.prototype, "activeCollection", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", capabilities_service_1.Capabilities)
    ], AssetDetailComponent.prototype, "userCan", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], AssetDetailComponent.prototype, "usagePrice", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Window)
    ], AssetDetailComponent.prototype, "window", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetDetailComponent.prototype, "searchContext", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AssetDetailComponent.prototype, "assetMatchesCartAsset", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetDetailComponent.prototype, "commentParentObject", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], AssetDetailComponent.prototype, "commentFormConfig", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], AssetDetailComponent.prototype, "assetIsShared", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AssetDetailComponent.prototype, "addToCart", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AssetDetailComponent.prototype, "getPriceAttributes", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], AssetDetailComponent.prototype, "onPreviousPage", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AssetDetailComponent.prototype, "createShareDialog", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AssetDetailComponent.prototype, "onAddtoDifferentCollection", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatMenuTrigger),
        __metadata("design:type", material_1.MatMenuTrigger)
    ], AssetDetailComponent.prototype, "trigger", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AssetDetailComponent.prototype, "updateAssetLineItem", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], AssetDetailComponent.prototype, "markersChange", void 0);
    AssetDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'asset-detail',
            templateUrl: 'asset-detail.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], AssetDetailComponent);
    return AssetDetailComponent;
}());
exports.AssetDetailComponent = AssetDetailComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rYXNzZXQvY29tcG9uZW50cy9hc3NldC1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQW1IO0FBSW5ILG1GQUEwRTtBQUMxRSw4Q0FBbUQ7QUFDbkQsMkVBQXVGO0FBQ3ZGLDhDQUE2QztBQUU3Qyw2Q0FBOEU7QUFDOUUseUVBQWtGO0FBYWxGO0lBMkNFLDhCQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQXRCekIsY0FBUyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQy9CLHVCQUFrQixHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ3hDLG1CQUFjLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDcEMsc0JBQWlCLEdBQTBDLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzlFLCtCQUEwQixHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUt2RSx5QkFBb0IsR0FBWSxLQUFLLENBQUM7UUFLNUIsd0JBQW1CLEdBQXVCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzVELGtCQUFhLEdBQWlDLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRzNFLG9DQUErQixHQUFZLEtBQUssQ0FBQztRQUNqRCxzQ0FBaUMsR0FBWSxLQUFLLENBQUM7SUFHcEIsQ0FBQztJQTFDL0Isc0JBQVcsdUNBQUs7YUFtRHpCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDckIsQ0FBQzthQXJEUSxVQUFpQixLQUFvQjtZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUUsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLENBQUM7UUFDM0MsQ0FBQzs7O09BQUE7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RTtrQ0FBZ0IsTUFBTTt3REFBQztJQUN0QjtRQUFSLFlBQUssRUFBRTs7K0RBQW9DO0lBQ25DO1FBQVIsWUFBSyxFQUFFOzt1RUFBdUM7SUFDdEM7UUFBUixZQUFLLEVBQUU7O3FFQUFpRDtJQUNoRDtRQUFSLFlBQUssRUFBRTs7bUVBQXNDO0lBQ3JDO1FBQVIsWUFBSyxFQUFFOzsrREFBK0I7SUFDN0I7UUFBVCxhQUFNLEVBQUU7OzJEQUFnQztJQUMvQjtRQUFULGFBQU0sRUFBRTs7b0VBQXlDO0lBQ3hDO1FBQVQsYUFBTSxFQUFFOztnRUFBcUM7SUFDcEM7UUFBVCxhQUFNLEVBQUU7a0NBQW9CLG1CQUFZO21FQUErQztJQUM5RTtRQUFULGFBQU0sRUFBRTtrQ0FBNkIsbUJBQVk7NEVBQTRCO0lBRW5EO1FBQTFCLGdCQUFTLENBQUMseUJBQWMsQ0FBQztrQ0FBVSx5QkFBYzt5REFBQztJQVF6QztRQUFULGFBQU0sRUFBRTtrQ0FBNkIsbUJBQVk7cUVBQTRCO0lBQ3BFO1FBQVQsYUFBTSxFQUFFO2tDQUF3QixtQkFBWTsrREFBc0M7SUFwQ3hFLG9CQUFvQjtRQVBoQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0E2QzJCLG9CQUFRO09BM0N4QixvQkFBb0IsQ0F3WmhDO0lBQUQsMkJBQUM7Q0F4WkQsQUF3WkMsSUFBQTtBQXhaWSxvREFBb0IiLCJmaWxlIjoiYXBwLythc3NldC9jb21wb25lbnRzL2Fzc2V0LWRldGFpbC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIFZpZXdDaGlsZCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xsZWN0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ2FydCwgUHJvamVjdCwgTWV0YWRhdHVtIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0LCBQb2pvLCBVaUNvbmZpZ0NvbXBvbmVudHMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IENhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jYXBhYmlsaXRpZXMuc2VydmljZSc7XG5pbXBvcnQgeyBNYXRNZW51VHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IFN1YmNsaXBNYXJrZXJzLCBkdXJhdGlvbkZyb20gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2R1bGVzL3dhemVlLWZyYW1lLWZvcm1hdHRlci9pbmRleCc7XG5pbXBvcnQgeyBBcHBTdG9yZSwgQWN0aW9uRmFjdG9yeU1hcHBlciwgUHJpY2luZ1N0YXRlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQsIEFzc2V0VHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IENvbW1lbnRQYXJlbnRPYmplY3QgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBGb3JtRmllbGRzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IFNlYXJjaFBhcmFtcyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3NlYXJjaC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNzZXRTaGFyZURpYWxvZ09wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hc3NldC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdhc3NldC1kZXRhaWwnLFxuICB0ZW1wbGF0ZVVybDogJ2Fzc2V0LWRldGFpbC5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBBc3NldERldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgYXNzZXQoYXNzZXQ6IEVuaGFuY2VkQXNzZXQpIHtcbiAgICB0aGlzLl9hc3NldCA9IGFzc2V0O1xuICAgIGlmIChhc3NldC50cmFuc2NvZGVUYXJnZXRzKSB0aGlzLnNlbGVjdGVkVGFyZ2V0ID0gYXNzZXQudHJhbnNjb2RlVGFyZ2V0c1swXTsgIC8vIElzIHRoaXMgd2hhdCB3ZSB3YW50IGZvciBhbGwgYXNzZXQgdHlwZXM/XG4gICAgdGhpcy5zZXRBc3NldENvbGxlY3Rpb25NZW1iZXJzaGlwRmxhZ3MoKTtcbiAgfVxuXG4gIEBJbnB1dCgpIHB1YmxpYyBzZXQgYWN0aXZlQ29sbGVjdGlvbihjb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSB7XG4gICAgdGhpcy5fYWN0aXZlQ29sbGVjdGlvbiA9IGNvbGxlY3Rpb247XG4gICAgdGhpcy5hY3RpdmVDb2xsZWN0aW9uTmFtZSA9IGNvbGxlY3Rpb24ubmFtZTtcbiAgICB0aGlzLnNldEFzc2V0Q29sbGVjdGlvbk1lbWJlcnNoaXBGbGFncygpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIHVzZXJDYW46IENhcGFiaWxpdGllcztcbiAgQElucHV0KCkgcHVibGljIHVzYWdlUHJpY2U6IG51bWJlcjtcbiAgQElucHV0KCkgcHVibGljIHdpbmRvdzogV2luZG93O1xuICBASW5wdXQoKSBwdWJsaWMgc2VhcmNoQ29udGV4dDogU2VhcmNoUGFyYW1zO1xuICBASW5wdXQoKSBwdWJsaWMgYXNzZXRNYXRjaGVzQ2FydEFzc2V0OiBib29sZWFuO1xuICBASW5wdXQoKSBwdWJsaWMgY29tbWVudFBhcmVudE9iamVjdDogQ29tbWVudFBhcmVudE9iamVjdDtcbiAgQElucHV0KCkgcHVibGljIGNvbW1lbnRGb3JtQ29uZmlnOiBGb3JtRmllbGRzO1xuICBASW5wdXQoKSBwdWJsaWMgYXNzZXRJc1NoYXJlZDogYm9vbGVhbjtcbiAgQE91dHB1dCgpIGFkZFRvQ2FydCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGdldFByaWNlQXR0cmlidXRlcyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIG9uUHJldmlvdXNQYWdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgY3JlYXRlU2hhcmVEaWFsb2c6IEV2ZW50RW1pdHRlcjxBc3NldFNoYXJlRGlhbG9nT3B0aW9ucz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkFkZHRvRGlmZmVyZW50Q29sbGVjdGlvbjogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBWaWV3Q2hpbGQoTWF0TWVudVRyaWdnZXIpIHRyaWdnZXI6IE1hdE1lbnVUcmlnZ2VyO1xuICBwdWJsaWMgc2hhcmVGb3JtRmllbGRzOiBGb3JtRmllbGRzW107XG4gIHB1YmxpYyBzZWxlY3RlZFRhcmdldDogc3RyaW5nO1xuICBwdWJsaWMgc2hvd0Fzc2V0U2F2ZVN1YmNsaXA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHN1YmNsaXBNYXJrZXJzOiBTdWJjbGlwTWFya2VycztcbiAgcHVibGljIGFjdGl2ZUNvbGxlY3Rpb25OYW1lOiBzdHJpbmc7XG4gIHB1YmxpYyBzaG93Q29tbWVudHM6IGJvb2xlYW47XG4gIHB1YmxpYyBoYXNEZWxpdmVyeU9wdGlvbnM6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIEBPdXRwdXQoKSBwdWJsaWMgdXBkYXRlQXNzZXRMaW5lSXRlbTogRXZlbnRFbWl0dGVyPG51bGw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgcHJpdmF0ZSBtYXJrZXJzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8U3ViY2xpcE1hcmtlcnM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwcml2YXRlIF9hc3NldDogRW5oYW5jZWRBc3NldDtcbiAgcHJpdmF0ZSBfYWN0aXZlQ29sbGVjdGlvbjogQ29sbGVjdGlvbjtcbiAgcHJpdmF0ZSBhY3RpdmVDb2xsZWN0aW9uQ29udGFpbnNBc3NldElkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgYWN0aXZlQ29sbGVjdGlvbkNvbnRhaW5zQXNzZXRVdWlkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgcGFnZVNpemU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3QgY29uZmlnOiBVaUNvbmZpZ0NvbXBvbmVudHMgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMpO1xuICAgIHRoaXMucGFnZVNpemUgPSBwYXJzZUludChjb25maWcuZ2xvYmFsLmNvbmZpZy5wYWdlU2l6ZS52YWx1ZSk7XG4gICAgdGhpcy5zaGFyZUZvcm1GaWVsZHMgPSBjb25maWcuYXNzZXRTaGFyaW5nLmNvbmZpZy5mb3JtLml0ZW1zO1xuICAgIHRoaXMuc2V0RGVsaXZlcnlPcHRpb25zRmxhZygpO1xuICB9XG5cbiAgcHVibGljIGdldCBhc3NldCgpOiBFbmhhbmNlZEFzc2V0IHtcbiAgICByZXR1cm4gdGhpcy5fYXNzZXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhhc1BhZ2VIaXN0b3J5KCkge1xuICAgIHJldHVybiB0aGlzLndpbmRvdy5oaXN0b3J5Lmxlbmd0aCA+IDI7XG4gIH1cblxuICBwdWJsaWMgcHJldmlvdXNQYWdlKCkge1xuICAgIHRoaXMub25QcmV2aW91c1BhZ2UuZW1pdCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBoYXNSZW5kaXRpb24oKSB7XG4gICAgcmV0dXJuICEhdGhpcy5fYXNzZXQuY2xpcFVybDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcm91dGVyTGlua0ZvckFzc2V0UGFyZW50KCk6IGFueVtdIHtcbiAgICBzd2l0Y2ggKHRoaXMuX2Fzc2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2NvbGxlY3Rpb24nOiB7XG4gICAgICAgIHJldHVybiBbJy9jb2xsZWN0aW9ucycsIHRoaXMuX2Fzc2V0LnBhcmVudElkLCB7IGk6IDEsIG46IHRoaXMucGFnZVNpemUgfV07XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3NlYXJjaCc6IHtcbiAgICAgICAgcmV0dXJuIFsnL3NlYXJjaCcsIHRoaXMuc2VhcmNoQ29udGV4dF07XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ3F1b3RlRWRpdCc6IHtcbiAgICAgICAgcmV0dXJuIFsnL2FjdGl2ZS1xdW90ZSddO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdxdW90ZVNob3cnOiB7XG4gICAgICAgIHJldHVybiBbJy9xdW90ZXMnLCB0aGlzLl9hc3NldC5wYXJlbnRJZF07XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ29yZGVyJzoge1xuICAgICAgICByZXR1cm4gWycvb3JkZXJzJywgdGhpcy5fYXNzZXQucGFyZW50SWRdO1xuICAgICAgfVxuXG4gICAgICBjYXNlICdjYXJ0Jzoge1xuICAgICAgICByZXR1cm4gWycvY2FydCddO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgYnJlYWRjcnVtYkxhYmVsKCk6IEFycmF5PHN0cmluZz4ge1xuICAgIHN3aXRjaCAodGhpcy5fYXNzZXQudHlwZSkge1xuICAgICAgY2FzZSAnY29sbGVjdGlvbic6IHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLmFjdGl2ZUNvbGxlY3Rpb25OYW1lLCAnJ107XG4gICAgICB9XG5cbiAgICAgIGNhc2UgJ29yZGVyJzpcbiAgICAgIGNhc2UgJ3F1b3RlU2hvdyc6IHtcbiAgICAgICAgcmV0dXJuIFtgYXNzZXQuZGV0YWlsLmJyZWFkY3J1bWJfJHt0aGlzLl9hc3NldC50eXBlfWAsIFN0cmluZyh0aGlzLl9hc3NldC5wYXJlbnRJZCldO1xuICAgICAgfVxuXG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiBbYGFzc2V0LmRldGFpbC5icmVhZGNydW1iXyR7dGhpcy5fYXNzZXQudHlwZX1gLCAnJ107XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBjYW5BZGRUb0FjdGl2ZUNvbGxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5lZGl0Q29sbGVjdGlvbnMoKSAmJlxuICAgICAgIXRoaXMuYWN0aXZlQ29sbGVjdGlvbkNvbnRhaW5zQXNzZXRJZCAmJlxuICAgICAgdGhpcy5hc3NldFR5cGVJc09uZU9mKCdjb2xsZWN0aW9uJywgJ3NlYXJjaCcpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5SZW1vdmVGcm9tQWN0aXZlQ29sbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzZXQudHlwZSA9PT0gJ2NvbGxlY3Rpb24nICYmIHRoaXMuYWN0aXZlQ29sbGVjdGlvbkNvbnRhaW5zQXNzZXRVdWlkO1xuICB9XG5cbiAgcHVibGljIGdldCB1c2VyQ2FuRWRpdENvbGxlY3Rpb24oKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5lZGl0Q29sbGVjdGlvbih0aGlzLl9hY3RpdmVDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuQWRkQWdhaW5Ub0FjdGl2ZUNvbGxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLl9hc3NldC50eXBlID09PSAnc2VhcmNoJyAmJiB0aGlzLmFjdGl2ZUNvbGxlY3Rpb25Db250YWluc0Fzc2V0SWQpIHx8XG4gICAgICAodGhpcy5fYXNzZXQudHlwZSA9PT0gJ2NvbGxlY3Rpb24nICYmICh0aGlzLmFjdGl2ZUNvbGxlY3Rpb25Db250YWluc0Fzc2V0SWQgfHwgdGhpcy5zaG93QXNzZXRTYXZlU3ViY2xpcCkpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5VcGRhdGVJbkFjdGl2ZUNvbGxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Fzc2V0LnR5cGUgPT09ICdjb2xsZWN0aW9uJyAmJiB0aGlzLnNob3dBc3NldFNhdmVTdWJjbGlwICYmIHRoaXMuYWN0aXZlQ29sbGVjdGlvbkNvbnRhaW5zQXNzZXRVdWlkICYmXG4gICAgICAhdGhpcy5fYWN0aXZlQ29sbGVjdGlvbi5hc3NldHMuaXRlbXMuc29tZSgoY29sbGVjdGlvbkFzc2V0OiBBc3NldCkgPT4ge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGR1cmF0aW9uRnJvbSh0aGlzLnN1YmNsaXBNYXJrZXJzKTtcbiAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb25Bc3NldC50aW1lU3RhcnQgPT09IGR1cmF0aW9uLnRpbWVTdGFydCAmJiBjb2xsZWN0aW9uQXNzZXQudGltZUVuZCA9PT0gZHVyYXRpb24udGltZUVuZDtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uUGxheWVyTWFya2Vyc0luaXRpYWxpemF0aW9uKGluaXRpYWxNYXJrZXJzOiBTdWJjbGlwTWFya2Vycyk6IHZvaWQge1xuICAgIHRoaXMuc3ViY2xpcE1hcmtlcnMgPSBpbml0aWFsTWFya2VycztcbiAgICB0aGlzLnNob3dBc3NldFNhdmVTdWJjbGlwID0gZmFsc2U7XG4gICAgdGhpcy5tYXJrZXJzQ2hhbmdlLmVtaXQoaW5pdGlhbE1hcmtlcnMpO1xuICB9XG5cbiAgcHVibGljIG9uUGxheWVyTWFya2VyQ2hhbmdlKG5ld01hcmtlcnM6IFN1YmNsaXBNYXJrZXJzKTogdm9pZCB7XG4gICAgdGhpcy5zdWJjbGlwTWFya2VycyA9IG5ld01hcmtlcnM7XG4gICAgdGhpcy5zaG93QXNzZXRTYXZlU3ViY2xpcCA9IHRoaXMubWFya2Vyc0FyZURlZmluZWQ7XG4gICAgaWYgKHRoaXMubWFya2Vyc0FyZURlZmluZWQgJiYgdGhpcy5fYXNzZXQudHlwZSA9PT0gJ3NlYXJjaCcpIHtcbiAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goKGZhY3RvcnkpID0+IGZhY3RvcnkuYXNzZXQudXBkYXRlTWFya2Vyc0luVXJsKHRoaXMuc3ViY2xpcE1hcmtlcnMsIHRoaXMuX2Fzc2V0LmFzc2V0SWQpKTtcbiAgICB9XG4gICAgdGhpcy5tYXJrZXJzQ2hhbmdlLmVtaXQobmV3TWFya2Vycyk7XG4gIH1cblxuICBwdWJsaWMgdG9nZ2xlQXNzZXRTYXZlU3ViY2xpcCgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dBc3NldFNhdmVTdWJjbGlwID0gIXRoaXMuc2hvd0Fzc2V0U2F2ZVN1YmNsaXA7XG4gIH1cblxuICBwdWJsaWMgYWRkQXNzZXRUb0FjdGl2ZUNvbGxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChcbiAgICAgIGZhY3RvcnkgPT4gZmFjdG9yeS5hY3RpdmVDb2xsZWN0aW9uLmFkZEFzc2V0KHRoaXMuX2Fzc2V0LCB0aGlzLnN1YmNsaXBNYXJrZXJzID8gdGhpcy5zdWJjbGlwTWFya2VycyA6IG51bGwpXG4gICAgKTtcbiAgICB0aGlzLnNob3dBc3NldFNhdmVTdWJjbGlwID0gZmFsc2U7XG4gIH1cblxuICBwdWJsaWMgb25DcmVhdGVTaGFyZURpYWxvZygpIHtcbiAgICB0aGlzLmNyZWF0ZVNoYXJlRGlhbG9nLmVtaXQoe1xuICAgICAgZW5oYW5jZWRBc3NldDogdGhpcy5fYXNzZXQsXG4gICAgICBzdWJjbGlwTWFya2VyczogdGhpcy5zdWJjbGlwTWFya2VycyxcbiAgICAgIGZvcm1GaWVsZHM6IHRoaXMuc2hhcmVGb3JtRmllbGRzXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXNzZXRGcm9tQWN0aXZlQ29sbGVjdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5kaWFsb2cuc2hvd0NvbmZpcm1hdGlvbihcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdDT0xMRUNUSU9OLlJFTU9WRV9BU1NFVC5USVRMRScsXG4gICAgICAgIG1lc3NhZ2U6ICdDT0xMRUNUSU9OLlJFTU9WRV9BU1NFVC5NRVNTQUdFJyxcbiAgICAgICAgYWNjZXB0OiAnQ09MTEVDVElPTi5SRU1PVkVfQVNTRVQuQUNDRVBUJyxcbiAgICAgICAgZGVjbGluZTogJ0NPTExFQ1RJT04uUkVNT1ZFX0FTU0VULkRFQ0xJTkUnXG4gICAgICB9LFxuICAgICAgKCkgPT4gdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi5yZW1vdmVBc3NldCh0aGlzLl9hc3NldCkpXG4gICAgKSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNzZXRJbkFjdGl2ZUNvbGxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuYWN0aXZlQ29sbGVjdGlvbi51cGRhdGVBc3NldE1hcmtlcnModGhpcy5fYXNzZXQsIHRoaXMuc3ViY2xpcE1hcmtlcnMpKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBc3NldFRvQ2FydCgpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFRvQ2FydC5lbWl0KHtcbiAgICAgIGFzc2V0SWQ6IHRoaXMuX2Fzc2V0LmFzc2V0SWQsXG4gICAgICBtYXJrZXJzOiB0aGlzLm1hcmtlcnNBcmVEZWZpbmVkID8gdGhpcy5zdWJjbGlwTWFya2VycyA6IG51bGwsXG4gICAgICBzZWxlY3RlZFRyYW5zY29kZVRhcmdldDogdGhpcy5zZWxlY3RlZFRhcmdldFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldFByaWNpbmdBdHRyaWJ1dGVzKCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0UHJpY2VBdHRyaWJ1dGVzLmVtaXQodGhpcy5yaWdodHMpO1xuICB9XG5cbiAgcHVibGljIG9uU2VsZWN0VGFyZ2V0KHRhcmdldDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5zZWxlY3RlZFRhcmdldCA9IHRhcmdldC52YWx1ZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuQ29tbWVudCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hc3NldFR5cGVJc09uZU9mKCdjYXJ0JywgJ3F1b3RlRWRpdCcsICdxdW90ZVNob3cnLCAnY29sbGVjdGlvbicsICdvcmRlcicpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5TaGFyZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hc3NldFR5cGVJc09uZU9mKCdzZWFyY2gnKSAmJiB0aGlzLnVzZXJDYW4uY3JlYXRlQWNjZXNzSW5mbygpO1xuICB9XG5cbiAgcHVibGljIGdldCBzaG93QWR2YW5jZWRQbGF5ZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi52aWV3QWR2YW5jZWRQbGF5ZXIodGhpcy5hc3NldCwgdGhpcy5hc3NldElzU2hhcmVkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc2hhcmVCdXR0b25MYWJlbEtleSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1hcmtlcnNBcmVEZWZpbmVkID8gJ0FTU0VULkRFVEFJTC5TSEFSSU5HX1NVQkNMSVBfQlROX1RJVExFJyA6ICdBU1NFVC5ERVRBSUwuU0hBUklOR19CVE5fVElUTEUnO1xuICB9XG5cbiAgcHVibGljIGdldCByaWdodHMoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzZXQuZ2V0TWV0YWRhdGFWYWx1ZUZvcignUmlnaHRzLlJlcHJvZHVjdGlvbicpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5TaG93UHJpY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICh0aGlzLmlzUm95YWx0eUZyZWVXaXRoVmFsaWRQcmljZSB8fCB0aGlzLmlzUmlnaHRzTWFuYWdlZFdpdGhWYWxpZFByaWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuU2hvd05vUHJpY2luZ0F2YWlsYWJsZU5vdGljZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuYXNzZXRUeXBlSXNPbmVPZignb3JkZXInLCAncXVvdGVTaG93JykpID8gZmFsc2UgOlxuICAgICAgKHRoaXMuaXNSb3lhbHR5RnJlZSB8fCB0aGlzLmlzUmlnaHRzTWFuYWdlZCkgJiYgIXRoaXMuX2Fzc2V0Lmhhc093blByb3BlcnR5KCdwcmljZScpO1xuICB9XG5cbiAgcHVibGljIGdldCBwcmljZSgpOiBudW1iZXIge1xuICAgIGlmICh0aGlzLmlzUm95YWx0eUZyZWVXaXRoVmFsaWRQcmljZSkgcmV0dXJuIHRoaXMuX2Fzc2V0LnByaWNlO1xuICAgIGlmICh0aGlzLmlzUmlnaHRzTWFuYWdlZFdpdGhWYWxpZFByaWNlKSByZXR1cm4gdGhpcy51c2FnZVByaWNlO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5QZXJmb3JtQ2FydEFjdGlvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5oYXZlQ2FydCgpICYmICh0aGlzLmlzUm95YWx0eUZyZWUgfHwgdGhpcy5pc1JpZ2h0c01hbmFnZWQpICYmIHRoaXMuX2Fzc2V0Lmhhc093blByb3BlcnR5KCdwcmljZScpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5TZWxlY3RUcmFuc2NvZGVUYXJnZXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNSb3lhbHR5RnJlZSAmJiB0aGlzLnVzZXJDYW4uYWRkVG9DYXJ0KCkgJiYgISF0aGlzLl9hc3NldC50cmFuc2NvZGVUYXJnZXRzO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5FZGl0T3JBcHBseVJpZ2h0cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKHRoaXMuX2Fzc2V0LnR5cGUgIT09ICdvcmRlcicgJiYgdGhpcy5fYXNzZXQudHlwZSAhPT0gJ3F1b3RlU2hvdycpXG4gICAgICAmJiB0aGlzLmlzUmlnaHRzTWFuYWdlZCAmJiB0aGlzLnVzZXJDYW4uY2FsY3VsYXRlUHJpY2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2FuVXBkYXRlQ2FydEFzc2V0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFzc2V0VHlwZUlzT25lT2YoJ2NhcnQnLCAncXVvdGVFZGl0Jyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhblVwZGF0ZUNvbGxlY3Rpb25Bc3NldCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hc3NldFR5cGVJc09uZU9mKCdjb2xsZWN0aW9uJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbkVkaXRDb2xsZWN0aW9uU3ViY2xpcE1hcmtlcnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY2FuVXBkYXRlQ29sbGVjdGlvbkFzc2V0ICYmIHRoaXMubWFya2Vyc0FyZURlZmluZWQ7XG4gIH1cbiAgcHVibGljIGdldCBjb2xsZWN0aW9uU3ViY2xpcEJ1dHRvbkhvdmVyVHh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgYWN0aXZlOiBzdHJpbmcgPSB0aGlzLmNhblVwZGF0ZUluQWN0aXZlQ29sbGVjdGlvbiA/ICdBQ1RJVkUnIDogJ0RJU0FCTEVEJztcbiAgICBjb25zdCBtYXJrZXJzOiBzdHJpbmcgPSB0aGlzLl9hc3NldC5pc1N1YmNsaXBwZWQgPyAnVVBEQVRFJyA6ICdBRERfTkVXJztcblxuICAgIHJldHVybiBgQVNTRVQuREVUQUlMLkJVVFRPTi4ke21hcmtlcnN9LlNVQkNMSVAuJHthY3RpdmV9YDtcbiAgfVxuICBwdWJsaWMgZ2V0IGNvbGxlY3Rpb25TdWJjbGlwQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICBjb25zdCBtYXJrZXJzOiBzdHJpbmcgPSB0aGlzLl9hc3NldC5pc1N1YmNsaXBwZWQgPyAnVVBEQVRFJyA6ICdBRERfTkVXJztcblxuICAgIHJldHVybiBgQVNTRVQuREVUQUlMLkJVVFRPTi4ke21hcmtlcnN9LlNVQkNMSVAuQ09MTEVDVElPTmA7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHVwZGF0ZUNhcnRBc3NldEJ1dHRvbkxhYmVsS2V5KCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc3ViY2xpcE9yQXNzZXQ6IHN0cmluZyA9IHRoaXMubWFya2Vyc0FyZURlZmluZWQgPyAnU1VCQ0xJUCcgOiAnQVNTRVQnO1xuICAgIGNvbnN0IHF1b3RlT3JDYXJ0OiBzdHJpbmcgPSB0aGlzLmlzUXVvdGVVc2VyID8gJ1FVT1RFJyA6ICdDQVJUJztcblxuICAgIHJldHVybiBgQVNTRVQuREVUQUlMLkJVVFRPTi5VUERBVEUuJHtzdWJjbGlwT3JBc3NldH0uJHtxdW90ZU9yQ2FydH1gO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZUNhcnRBc3NldCgpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZUFzc2V0TGluZUl0ZW0uZW1pdCgpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5BZGRUb0NhcnQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5hZGRUb0NhcnQoKSAmJiB0aGlzLmNhbkJlUHVyY2hhc2VkKHRoaXMuYXNzZXQpXG4gICAgICAmJiB0aGlzLmFzc2V0VHlwZUlzT25lT2YoJ3NlYXJjaCcsICdjb2xsZWN0aW9uJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHByaW1hcnlBc3NldEZpZWxkcygpOiBNZXRhZGF0dW0gfCB7IHZhbHVlOiBzdHJpbmcgfVtdIHtcbiAgICByZXR1cm4gdGhpcy5hc3NldC5wcmltYXJ5LnNsaWNlKDQsIC0xKS5maWx0ZXIoZmllbGQgPT4gZmllbGQudmFsdWUgIT09IG51bGwpO1xuICB9XG5cbiAgcHVibGljIHRyYW5zbGF0aW9uUmVhZHkoZmllbGQ6IGFueSkge1xuICAgIHJldHVybiAnYXNzZXRtZXRhZGF0YS4nICsgZmllbGQucmVwbGFjZSgvXFwuL2csICdfJyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGFkZFRvQ2FydE9yUXVvdGVCdXR0b25MYWJlbEtleSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IG9uTWF0Y2hpbmdQYWdlOiBib29sZWFuID0gdGhpcy5pc1F1b3RlVXNlciA/IHRoaXMuX2Fzc2V0LnR5cGUgPT09ICdxdW90ZUVkaXQnIDogdGhpcy5fYXNzZXQudHlwZSA9PT0gJ2NhcnQnO1xuICAgIGNvbnN0IG9wZXJhdGlvbjogc3RyaW5nID0gb25NYXRjaGluZ1BhZ2UgPyAnQUREX05FVycgOiAnQUREJztcbiAgICBjb25zdCBzdWJjbGlwT3JBc3NldDogc3RyaW5nID0gdGhpcy5tYXJrZXJzQXJlRGVmaW5lZCA/ICdTVUJDTElQJyA6ICdBU1NFVCc7XG4gICAgY29uc3QgcXVvdGVPckNhcnQ6IHN0cmluZyA9IHRoaXMuaXNRdW90ZVVzZXIgPyAnUVVPVEUnIDogJ0NBUlQnO1xuXG4gICAgcmV0dXJuIGBBU1NFVC5ERVRBSUwuQlVUVE9OLiR7b3BlcmF0aW9ufS4ke3N1YmNsaXBPckFzc2V0fS4ke3F1b3RlT3JDYXJ0fWA7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNhbkdvVG9TZWFyY2hBc3NldERldGFpbHMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuYXNzZXRUeXBlSXNPbmVPZignY2FydCcsICdjb2xsZWN0aW9uJywgJ29yZGVyJywgJ3F1b3RlRWRpdCcsICdxdW90ZVNob3cnKSAmJlxuICAgICAgdGhpcy5hc3NldC5pc1ZpZXdhYmxlO1xuICB9XG5cbiAgcHVibGljIGdvVG9TZWFyY2hBc3NldERldGFpbHMoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3Rvcnkucm91dGVyLmdvVG9TZWFyY2hBc3NldERldGFpbHModGhpcy5fYXNzZXQuYXNzZXRJZCwgdGhpcy5zdWJjbGlwTWFya2VycykpO1xuICB9XG5cbiAgcHVibGljIHRvZ2dsZUNvbW1lbnRzVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLnNob3dDb21tZW50cyA9ICF0aGlzLnNob3dDb21tZW50cztcbiAgfVxuXG4gIHB1YmxpYyBnZXQgdXNlckNhbkFkZENvbW1lbnRzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHN3aXRjaCAodGhpcy5jb21tZW50UGFyZW50T2JqZWN0Lm9iamVjdFR5cGUpIHtcbiAgICAgIGNhc2UgJ2NvbGxlY3Rpb24nOlxuICAgICAgICByZXR1cm4gdGhpcy51c2VyQ2FuLmVkaXRDb2xsZWN0aW9uKHRoaXMuX2FjdGl2ZUNvbGxlY3Rpb24pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGUub2YodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBjb21tZW50Q291bnQoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY29tbWVudFtzdGF0ZS5jb21tZW50LmFjdGl2ZU9iamVjdFR5cGVdLnBhZ2luYXRpb24udG90YWxDb3VudCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dEb3dubG9hZEJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hc3NldFR5cGVJc09uZU9mKCdxdW90ZUVkaXQnLCAncXVvdGVTaG93JywgJ3NlYXJjaCcsICdjb2xsZWN0aW9uJywgJ2NhcnQnKSAmJlxuICAgICAgdGhpcy5hc3NldC5pc1ZpZXdhYmxlO1xuICB9XG5cbiAgcHVibGljIGdldCBhc3NldE5hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYXNzZXQuY29tbW9uWzVdLnZhbHVlO1xuICB9XG5cbiAgcHVibGljIGdldCBjYW5BZGRUb0RpZmZlcmVudENvbGxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5oYXZlQ29sbGVjdGlvbnMoKSAmJiB0aGlzLmFzc2V0VHlwZUlzT25lT2YoJ2NvbGxlY3Rpb24nKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRUb0RpZmZlcmVudENvbGxlY3Rpb24oKTogdm9pZCB7XG4gICAgdGhpcy5vbkFkZHRvRGlmZmVyZW50Q29sbGVjdGlvbi5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIGNhbkJlUHVyY2hhc2VkKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmlnaHRzOiBzdHJpbmcgPSBhc3NldC5nZXRNZXRhZGF0YVZhbHVlRm9yKCdSaWdodHMuUmVwcm9kdWN0aW9uJyk7XG4gICAgaWYgKCFyaWdodHMpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiBbJ1JpZ2h0cyBNYW5hZ2VkJywgJ1JveWFsdHkgRnJlZSddLmluY2x1ZGVzKHJpZ2h0cykgJiZcbiAgICAgIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUuYXNzZXQuYWN0aXZlQXNzZXQuYXNzZXRJZCAmJlxuICAgICAgICBzdGF0ZS5hc3NldC5hY3RpdmVBc3NldC5oYXNPd25Qcm9wZXJ0eSgncHJpY2UnKSk7XG4gIH1cblxuICBwcml2YXRlIGFzc2V0VHlwZUlzT25lT2YoLi4uYXNzZXRUeXBlczogQXNzZXRUeXBlW10pIHtcbiAgICByZXR1cm4gYXNzZXRUeXBlcy5pbmNsdWRlcyh0aGlzLl9hc3NldC50eXBlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0QXNzZXRDb2xsZWN0aW9uTWVtYmVyc2hpcEZsYWdzKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fYWN0aXZlQ29sbGVjdGlvbiB8fCAhdGhpcy5fYXNzZXQpIHtcbiAgICAgIHRoaXMuYWN0aXZlQ29sbGVjdGlvbkNvbnRhaW5zQXNzZXRJZCA9IHRoaXMuYWN0aXZlQ29sbGVjdGlvbkNvbnRhaW5zQXNzZXRVdWlkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29sbGVjdGlvbkl0ZW1zOiBBc3NldFtdID0gdGhpcy5fYWN0aXZlQ29sbGVjdGlvbi5hc3NldHMuaXRlbXM7XG5cbiAgICB0aGlzLmFjdGl2ZUNvbGxlY3Rpb25Db250YWluc0Fzc2V0SWQgPVxuICAgICAgY29sbGVjdGlvbkl0ZW1zLnNvbWUoKGNvbGxlY3Rpb25Bc3NldDogQXNzZXQpID0+IGNvbGxlY3Rpb25Bc3NldC5hc3NldElkID09PSB0aGlzLl9hc3NldC5hc3NldElkKTtcblxuICAgIHRoaXMuYWN0aXZlQ29sbGVjdGlvbkNvbnRhaW5zQXNzZXRVdWlkID1cbiAgICAgICEhdGhpcy5fYXNzZXQudXVpZCAmJiBjb2xsZWN0aW9uSXRlbXMuc29tZSgoY29sbGVjdGlvbkFzc2V0OiBBc3NldCkgPT4gY29sbGVjdGlvbkFzc2V0LnV1aWQgPT09IHRoaXMuX2Fzc2V0LnV1aWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNRdW90ZVVzZXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMudXNlckNhbi5hZG1pbmlzdGVyUXVvdGVzKCk7XG4gIH1cblxuICBwcml2YXRlIGdldCBpc1JveWFsdHlGcmVlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnJpZ2h0cyA9PT0gJ1JveWFsdHkgRnJlZSc7XG4gIH1cblxuICBwcml2YXRlIGdldCBpc1JpZ2h0c01hbmFnZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucmlnaHRzID09PSAnUmlnaHRzIE1hbmFnZWQnO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgaXNSaWdodHNNYW5hZ2VkV2l0aFZhbGlkUHJpY2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNSaWdodHNNYW5hZ2VkICYmICgodGhpcy51c2FnZVByaWNlICE9PSBudWxsICYmIHRoaXMudXNhZ2VQcmljZSAhPT0gdW5kZWZpbmVkICYmIHRoaXMudXNhZ2VQcmljZSA+IDApKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGlzUm95YWx0eUZyZWVXaXRoVmFsaWRQcmljZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pc1JveWFsdHlGcmVlICYmIHRoaXMuX2Fzc2V0Lmhhc093blByb3BlcnR5KCdwcmljZScpICYmIHRoaXMuX2Fzc2V0LnByaWNlID4gMDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG1hcmtlcnNBcmVEZWZpbmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhIXRoaXMuc3ViY2xpcE1hcmtlcnMgJiYgISF0aGlzLnN1YmNsaXBNYXJrZXJzLmluICYmICEhdGhpcy5zdWJjbGlwTWFya2Vycy5vdXQ7XG4gIH1cblxuICBwcml2YXRlIHNldERlbGl2ZXJ5T3B0aW9uc0ZsYWcoKTogdm9pZCB7XG4gICAgdGhpcy5oYXNEZWxpdmVyeU9wdGlvbnMgPSB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5kZWxpdmVyeU9wdGlvbnMuaGFzRGVsaXZlcnlPcHRpb25zKTtcbiAgfVxufVxuIl19
