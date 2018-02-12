"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AssetInfoComponent = (function () {
    function AssetInfoComponent() {
    }
    AssetInfoComponent.prototype.translationReady = function (field) {
        return 'assetmetadata.' + field.replace(/\./g, '_');
    };
    AssetInfoComponent.prototype.shouldDisplay = function (meta) {
        return meta.name !== 'Description'
            && meta.name !== 'Format.Duration'
            && meta.name !== 'Format.AspectRatio'
            && meta.name !== 'Resource.Class';
    };
    AssetInfoComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-info-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    template: "\n    <div class=\"mat-caption asset-name\">{{ asset.assetName }}</div>\n    <p class=\"asset-description\">\n      {{ (asset.metadata ? asset.metadata[0].value : '') | slice:0:100 }}\n    </p>\n    <div class=\"cart-asset-metadata mat-caption\">\n      <span *ngFor=\"let meta of asset.metadata\">\n        <ng-container *ngIf=\"shouldDisplay(meta)\">\n          <strong>{{ translationReady(meta.name) | uppercase | translate }}: </strong> {{ meta.value | slice:0:80 }}\n        </ng-container>\n      </span>\n    </div>\n  "
                },] },
    ];
    AssetInfoComponent.ctorParameters = function () { return []; };
    AssetInfoComponent.propDecorators = {
        'asset': [{ type: core_1.Input },],
    };
    return AssetInfoComponent;
}());
exports.AssetInfoComponent = AssetInfoComponent;
//# sourceMappingURL=asset-info.component.js.map