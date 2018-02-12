"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var CartAssetResolver = (function () {
    function CartAssetResolver(store) {
        this.store = store;
    }
    CartAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadCartAsset(route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    CartAssetResolver.decorators = [
        { type: core_1.Injectable },
    ];
    CartAssetResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return CartAssetResolver;
}());
exports.CartAssetResolver = CartAssetResolver;
//# sourceMappingURL=cart-asset.resolver.js.map