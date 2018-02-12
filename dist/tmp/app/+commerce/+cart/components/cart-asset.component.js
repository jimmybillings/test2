"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var CartAssetComponent = (function () {
    function CartAssetComponent(store) {
        this.store = store;
    }
    CartAssetComponent.prototype.ngOnInit = function () {
        this.commentFormConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.cartComment.config.form.items; });
    };
    CartAssetComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'cart-asset',
                    template: "\n    <asset-component\n      [assetType]=\"'cart'\"\n      [commentFormConfig]=\"commentFormConfig\">\n    </asset-component>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CartAssetComponent.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return CartAssetComponent;
}());
exports.CartAssetComponent = CartAssetComponent;
//# sourceMappingURL=cart-asset.component.js.map