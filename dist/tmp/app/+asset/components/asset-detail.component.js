"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var Observable_1 = require("rxjs/Observable");
var app_store_1 = require("../../app.store");
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
    AssetDetailComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-detail',
                    templateUrl: 'asset-detail.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AssetDetailComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    AssetDetailComponent.propDecorators = {
        'asset': [{ type: core_1.Input },],
        'activeCollection': [{ type: core_1.Input },],
        'userCan': [{ type: core_1.Input },],
        'usagePrice': [{ type: core_1.Input },],
        'window': [{ type: core_1.Input },],
        'searchContext': [{ type: core_1.Input },],
        'assetMatchesCartAsset': [{ type: core_1.Input },],
        'commentParentObject': [{ type: core_1.Input },],
        'commentFormConfig': [{ type: core_1.Input },],
        'assetIsShared': [{ type: core_1.Input },],
        'addToCart': [{ type: core_1.Output },],
        'getPriceAttributes': [{ type: core_1.Output },],
        'onPreviousPage': [{ type: core_1.Output },],
        'createShareDialog': [{ type: core_1.Output },],
        'onAddtoDifferentCollection': [{ type: core_1.Output },],
        'trigger': [{ type: core_1.ViewChild, args: [material_1.MatMenuTrigger,] },],
        'updateAssetLineItem': [{ type: core_1.Output },],
        'markersChange': [{ type: core_1.Output },],
    };
    return AssetDetailComponent;
}());
exports.AssetDetailComponent = AssetDetailComponent;
//# sourceMappingURL=asset-detail.component.js.map