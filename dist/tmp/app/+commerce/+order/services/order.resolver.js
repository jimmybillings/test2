"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var OrderResolver = (function () {
    function OrderResolver(store) {
        this.store = store;
    }
    OrderResolver.prototype.resolve = function (route) {
        var requestedOrderId = Number(route.params['id']);
        this.store.dispatch(function (factory) { return factory.order.load(requestedOrderId); });
        return this.store.blockUntil(function (state) { return !state.order.loading; });
    };
    OrderResolver.decorators = [
        { type: core_1.Injectable },
    ];
    OrderResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return OrderResolver;
}());
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=order.resolver.js.map