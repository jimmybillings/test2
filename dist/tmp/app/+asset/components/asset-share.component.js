"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var app_store_1 = require("../../app.store");
var AssetShareComponent = (function () {
    function AssetShareComponent(store) {
        this.store = store;
        this.closeRequest = new core_1.EventEmitter();
    }
    AssetShareComponent.prototype.ngOnInit = function () {
        this.shareLink = this.store.select(function (state) { return state.sharing.assetLink; });
    };
    Object.defineProperty(AssetShareComponent.prototype, "shareAssetDialogTitle", {
        get: function () {
            return subclip_markers_1.bothMarkersAreSet(this.subclipMarkers)
                ? 'ASSET.SHARING.SUBCLIP_DIALOG_HEADER_TITLE'
                : 'ASSET.SHARING.DIALOG_HEADER_TITLE';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetShareComponent.prototype, "showSubclippingInfo", {
        get: function () {
            return subclip_markers_1.bothMarkersAreSet(this.subclipMarkers);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetShareComponent.prototype, "assetName", {
        get: function () {
            return this.enhancedAsset.getMetadataValueFor('name');
        },
        enumerable: true,
        configurable: true
    });
    AssetShareComponent.prototype.onShareLinkRequest = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.sharing.createAssetShareLink(_this.enhancedAsset.assetId, _this.subclipMarkers); });
    };
    AssetShareComponent.prototype.onCloseRequest = function () {
        this.closeRequest.emit();
    };
    AssetShareComponent.prototype.onFormSubmit = function (shareParameters) {
        var _this = this;
        var properties = {
            assetName: this.enhancedAsset.getMetadataValueFor('name'),
            assetDescription: this.enhancedAsset.getMetadataValueFor('Description'),
            assetThumbnailUrl: this.enhancedAsset.thumbnailUrl
        };
        this.store.dispatch(function (factory) {
            return factory.sharing.emailAssetShareLink(_this.enhancedAsset.assetId, _this.subclipMarkers, shareParameters, properties);
        });
    };
    AssetShareComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-share',
                    templateUrl: 'asset-share.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AssetShareComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    AssetShareComponent.propDecorators = {
        'formFields': [{ type: core_1.Input },],
        'enhancedAsset': [{ type: core_1.Input },],
        'subclipMarkers': [{ type: core_1.Input },],
        'closeRequest': [{ type: core_1.Output },],
    };
    return AssetShareComponent;
}());
exports.AssetShareComponent = AssetShareComponent;
//# sourceMappingURL=asset-share.component.js.map