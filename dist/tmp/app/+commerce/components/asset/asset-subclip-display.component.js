"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AssetSubclipDisplayComponent = (function () {
    function AssetSubclipDisplayComponent() {
    }
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "asset", {
        set: function (asset) {
            this.enhancedAsset = asset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "isSubclipped", {
        get: function () {
            return this.enhancedAsset.isSubclipped;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "subclipSegmentStyles", {
        get: function () {
            return {
                'margin-left.%': this.enhancedAsset.inMarkerPercentage,
                'width.%': this.enhancedAsset.subclipDurationPercentage,
                'min-width.px': 2
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "inMarkerFrame", {
        get: function () {
            return this.enhancedAsset.inMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "outMarkerFrame", {
        get: function () {
            return this.enhancedAsset.outMarkerFrame;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AssetSubclipDisplayComponent.prototype, "subclipDurationFrame", {
        get: function () {
            return this.enhancedAsset.subclipDurationFrame;
        },
        enumerable: true,
        configurable: true
    });
    AssetSubclipDisplayComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-subclip-display-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div *ngIf=\"isSubclipped\" class=\"asset-sub-clip mat-caption\">\n      <strong>{{ 'COLLECTION.SHOW.SUB_CLIPPING_LABEL' | translate }}</strong>\n      <div class=\"subclip-timeline\">\n        <span class=\"subclip-segment\" [ngStyle]=\"subclipSegmentStyles\"></span>\n      </div>\n      <ul class=\"subclip-data\" layout=\"row\" hide-sm>\n        <li flex-gt-sm=\"30\" flex-gt-md=\"25\" flex=\"35\">\n          <strong>{{ 'COLLECTION.SHOW.START_TIME_LABEL' | translate }}</strong>\n          {{ inMarkerFrame | timecode }}\n        </li>\n        <li flex=\"none\">\n          <strong>{{ 'COLLECTION.SHOW.END_TIME_LABEL' | translate }} </strong>\n          {{ outMarkerFrame | timecode }}\n        </li>\n        <li flex=\"\" layout-align=\"end center\">\n          <strong>{{ 'COLLECTION.SHOW.SUB_CLIP_LENGTH_LABEL' | translate }}</strong>\n          {{ subclipDurationFrame | timecode }}\n        </li>\n      </ul>\n    </div>\n  "
                },] },
    ];
    AssetSubclipDisplayComponent.ctorParameters = function () { return []; };
    AssetSubclipDisplayComponent.propDecorators = {
        'asset': [{ type: core_1.Input },],
    };
    return AssetSubclipDisplayComponent;
}());
exports.AssetSubclipDisplayComponent = AssetSubclipDisplayComponent;
//# sourceMappingURL=asset-subclip-display.component.js.map