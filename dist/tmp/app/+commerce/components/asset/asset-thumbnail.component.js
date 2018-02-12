"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AssetThumbnailComponent = (function () {
    function AssetThumbnailComponent() {
    }
    Object.defineProperty(AssetThumbnailComponent.prototype, "asset", {
        set: function (asset) {
            this.enhancedAsset = asset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "routerLink", {
        get: function () {
            return this.enhancedAsset.routerLink;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "durationFrame", {
        get: function () {
            return this.enhancedAsset.subclipDurationFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "isImage", {
        get: function () {
            return this.enhancedAsset.isImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetThumbnailComponent.prototype, "thumbnailUrl", {
        get: function () {
            return this.enhancedAsset.thumbnailUrl;
        },
        enumerable: true,
        configurable: true
    });
    AssetThumbnailComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-thumbnail-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <a [routerLink]=\"routerLink\">\n      <div class=\"cart-asset-thb\">\n        <span class=\"asset-duration\">\n          <span>{{ durationFrame | timecode }}</span>\n        </span>\n        <span *ngIf=\"isImage\" class=\"indicate-photo\">\n          <span class=\"image\"></span>\n        </span>\n        <img src=\"{{ thumbnailUrl }}\"/>\n      </div>\n    </a>\n  "
                },] },
    ];
    AssetThumbnailComponent.ctorParameters = function () { return []; };
    AssetThumbnailComponent.propDecorators = {
        'asset': [{ type: core_1.Input },],
    };
    return AssetThumbnailComponent;
}());
exports.AssetThumbnailComponent = AssetThumbnailComponent;
//# sourceMappingURL=asset-thumbnail.component.js.map