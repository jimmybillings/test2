"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var CartResolver = (function () {
    function CartResolver(store) {
        this.store = store;
    }
    CartResolver.prototype.resolve = function () {
        this.store.dispatch(function (factory) { return factory.cart.load(); });
        return this.store.blockUntil(function (state) { return !state.cart.loading; });
    };
    CartResolver.decorators = [
        { type: core_1.Injectable },
    ];
    CartResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return CartResolver;
}());
exports.CartResolver = CartResolver;
//# sourceMappingURL=cart.resolver.js.map