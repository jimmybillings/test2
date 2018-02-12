"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var OrderAssetComponent = (function () {
    function OrderAssetComponent(store) {
        this.store = store;
    }
    OrderAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cartComment.config.form.items; });
    };
    OrderAssetComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'order-asset',
                    template: "\n    <asset-component\n      [commentFormConfig]=\"commentFormConfig\"\n      [assetType]=\"'order'\">\n    </asset-component>",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    OrderAssetComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return OrderAssetComponent;
}());
exports.OrderAssetComponent = OrderAssetComponent;
//# sourceMappingURL=order-asset.component.js.map