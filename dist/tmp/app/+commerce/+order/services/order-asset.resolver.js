"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var OrderAssetResolver = (function () {
    function OrderAssetResolver(store) {
        this.store = store;
    }
    OrderAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadOrderAsset(Number(route.params.id), route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    OrderAssetResolver.decorators = [
        { type: core_1.Injectable },
    ];
    OrderAssetResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return OrderAssetResolver;
}());
exports.OrderAssetResolver = OrderAssetResolver;
//# sourceMappingURL=order-asset.resolver.js.map