"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var wz_asset_1 = require("../wz-asset");
var app_store_1 = require("../../../../app.store");
var WzAssetGridComponent = (function (_super) {
    __extends(WzAssetGridComponent, _super);
    function WzAssetGridComponent(store, detector) {
        return _super.call(this, store, detector) || this;
    }
    WzAssetGridComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-asset-grid',
                    templateUrl: 'wz.asset-grid.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzAssetGridComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return WzAssetGridComponent;
}(wz_asset_1.WzAsset));
exports.WzAssetGridComponent = WzAssetGridComponent;
//# sourceMappingURL=wz.asset-grid.component.js.map