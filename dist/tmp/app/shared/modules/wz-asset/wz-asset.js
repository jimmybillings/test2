"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var WzAsset = (function () {
    function WzAsset(store, detector) {
        this.store = store;
        this.detector = detector;
        this.onAddToCart = new core_1.EventEmitter();
        this.onShowSpeedview = new core_1.EventEmitter();
        this.onHideSpeedview = new core_1.EventEmitter();
        this.onEditAsset = new core_1.EventEmitter();
        this.onAddtoDifferentCollection = new core_1.EventEmitter();
        this.assetType = 'search';
        this.showAssetName = true;
        this.assetIdsInActiveCollection = [];
        this.enhancedAssets = {};
    }
    Object.defineProperty(WzAsset.prototype, "activeCollection", {
        get: function () {
            return this._activeCollection;
        },
        set: function (value) {
            this._activeCollection = value;
            this.assetIdsInActiveCollection = value.assets.items.map(function (x) { return x.assetId; });
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(WzAsset.prototype, "assets", {
        get: function () {
            return this._assets;
        },
        set: function (assets) {
            this._assets = assets;
        },
        enumerable: true,
        configurable: true
    });
    WzAsset.prototype.ngOnInit = function () {
        var _this = this;
        this.store.selectCloned(function (state) { return state.uiConfig.components.search.config; })
            .filter(function (config) { return !!config.showAssetNameGridView && !!config.showAssetNameGridView.value; })
            .map(function (config) { return config.showAssetNameGridView.value; })
            .take(1).subscribe(function (value) {
            _this.showAssetName = Boolean(value);
        });
    };
    Object.defineProperty(WzAsset.prototype, "canAddToDifferentCollection", {
        get: function () {
            return this.userCan.haveCollections() && this.assetType === 'collection';
        },
        enumerable: true,
        configurable: true
    });
    WzAsset.prototype.addToActiveCollection = function (asset) {
        this.store.dispatch(function (factory) { return factory.activeCollection.addAsset(asset); });
    };
    WzAsset.prototype.removeFromActiveCollection = function (asset) {
        this.store.dispatch(function (factory) { return factory.activeCollection.removeAsset(asset); });
    };
    WzAsset.prototype.addToDifferentCollection = function (asset) {
        this.onAddtoDifferentCollection.emit(asset);
    };
    WzAsset.prototype.addAssetToCart = function (asset) {
        this.setAssetActiveId(asset);
        this.onAddToCart.emit(asset);
    };
    WzAsset.prototype.setAssetActiveId = function (asset) {
        this.assetId = asset.assetId;
        this.hasComp = asset.hasDownloadableComp;
    };
    WzAsset.prototype.loadDeliveryOptionsFor = function (asset) {
        this.assetId = asset.assetId;
        this.store.dispatch(function (factory) { return factory.deliveryOptions.load(asset); });
    };
    WzAsset.prototype.editAsset = function (asset) {
        this.onEditAsset.emit(asset);
    };
    WzAsset.prototype.inCollection = function (asset) {
        return this.assetIdsInActiveCollection.indexOf(asset.assetId) > -1;
    };
    WzAsset.prototype.nameOf = function (asset) {
        return asset.name;
    };
    WzAsset.prototype.routerLinkFor = function (asset) {
        return asset.routerLink;
    };
    WzAsset.prototype.hasThumbnail = function (asset) {
        return !!asset.thumbnailUrl;
    };
    WzAsset.prototype.thumbnailUrlFor = function (asset) {
        return asset.thumbnailUrl;
    };
    WzAsset.prototype.hasTitle = function (asset) {
        return !!this.titleOf(asset);
    };
    WzAsset.prototype.titleOf = function (asset) {
        return asset.title;
    };
    WzAsset.prototype.hasFormatType = function (asset) {
        return !!asset.formatType;
    };
    WzAsset.prototype.formatTypeOf = function (asset) {
        return asset.formatType;
    };
    WzAsset.prototype.formatClassNameFor = function (asset) {
        switch (this.formatTypeOf(asset)) {
            case 'High Definition': return 'hd';
            case 'Standard Definition': return 'sd';
            case 'Digital Video': return 'dv';
            default: return 'hd';
        }
    };
    WzAsset.prototype.hasDuration = function (asset) {
        return !!asset.subclipDurationFrame;
    };
    WzAsset.prototype.subclipDurationFrameFor = function (asset) {
        return asset.subclipDurationFrame;
    };
    WzAsset.prototype.isImage = function (asset) {
        return asset.isImage;
    };
    WzAsset.prototype.isSubclipped = function (asset) {
        return asset.isSubclipped;
    };
    WzAsset.prototype.subclipSegmentStylesFor = function (asset) {
        var enhancedAsset = asset;
        return {
            'margin-left.%': enhancedAsset.inMarkerPercentage,
            'width.%': enhancedAsset.subclipDurationPercentage,
            'min-width.px': 2
        };
    };
    WzAsset.prototype.hasDescription = function (asset) {
        return !!asset.description;
    };
    WzAsset.prototype.descriptionOf = function (asset) {
        return asset.description;
    };
    WzAsset.prototype.inMarkerFrameFor = function (asset) {
        return asset.inMarkerFrame;
    };
    WzAsset.prototype.outMarkerFrameFor = function (asset) {
        return asset.outMarkerFrame;
    };
    WzAsset.prototype.canBePurchased = function (asset) {
        var rights = asset.metaData.find(function (metadatum) {
            return metadatum.name === 'Rights.Reproduction';
        });
        if (!rights)
            return false;
        return ['Rights Managed', 'Royalty Free'].includes(rights.value) &&
            this.store.snapshot(function (state) { return state.speedPreview[asset.assetId] &&
                state.speedPreview[asset.assetId].hasOwnProperty('price'); });
    };
    WzAsset.prototype.commentCountFor = function (asset) {
        return this.store.select(function (factory) { return factory.comment.counts[asset.uuid]; });
    };
    WzAsset.prototype.canBeRemoved = function (asset) {
        return this.inCollection(asset) && this.assetType === 'collection';
    };
    WzAsset.prototype.canBeAddedAgain = function (asset) {
        return this.inCollection(asset) && this.assetType !== 'collection';
    };
    WzAsset.prototype.loadPricing = function (asset) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.speedPreview.load(asset); });
        this.store.blockUntil(function (state) { return !!state.speedPreview[asset.assetId]; })
            .subscribe(function () { return _this.detector.markForCheck(); });
    };
    Object.defineProperty(WzAsset.prototype, "userCanEditActiveCollection", {
        get: function () {
            return this.userCan.editCollection(this._activeCollection);
        },
        enumerable: true,
        configurable: true
    });
    WzAsset.propDecorators = {
        'onAddToCart': [{ type: core_1.Output },],
        'onShowSpeedview': [{ type: core_1.Output },],
        'onHideSpeedview': [{ type: core_1.Output },],
        'onEditAsset': [{ type: core_1.Output },],
        'onAddtoDifferentCollection': [{ type: core_1.Output },],
        'userCan': [{ type: core_1.Input },],
        'assetType': [{ type: core_1.Input },],
        'activeCollection': [{ type: core_1.Input },],
        'assets': [{ type: core_1.Input },],
    };
    return WzAsset;
}());
exports.WzAsset = WzAsset;
//# sourceMappingURL=wz-asset.js.map