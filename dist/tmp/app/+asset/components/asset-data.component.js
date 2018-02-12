"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AssetDataComponent = (function () {
    function AssetDataComponent() {
    }
    AssetDataComponent.prototype.ngOnChanges = function (changes) {
        if (changes.asset) {
            if (Object.keys(changes.asset.currentValue.detailTypeMap.common).length > 0) {
                this.asset = changes.asset.currentValue.detailTypeMap;
                this.secondaryMdata = this.asset.secondary[0];
                this.secondaryKeys = Object.keys(this.secondaryMdata);
            }
        }
    };
    AssetDataComponent.prototype.getMetaField = function (field) {
        var meta = this.asset.clipData.filter(function (item) { return item.name === field; })[0];
        if (meta)
            return meta.value;
    };
    AssetDataComponent.prototype.translationReady = function (field) {
        return 'assetmetadata.' + field.replace(/\./g, '_');
    };
    AssetDataComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'asset-data',
                    templateUrl: 'asset-data.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    AssetDataComponent.ctorParameters = function () { return []; };
    AssetDataComponent.propDecorators = {
        'asset': [{ type: core_1.Input },],
    };
    return AssetDataComponent;
}());
exports.AssetDataComponent = AssetDataComponent;
//# sourceMappingURL=asset-data.component.js.map