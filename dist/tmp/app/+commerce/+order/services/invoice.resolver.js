"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var InvoiceResolver = (function () {
    function InvoiceResolver(store) {
        this.store = store;
    }
    InvoiceResolver.prototype.resolve = function (route) {
        var orderId = Number(route.params['id']);
        var shareKey = route.params['share_key'];
        var actionMapper = shareKey ?
            function (factory) { return factory.invoice.load(orderId, shareKey); } :
            function (factory) { return factory.invoice.load(orderId); };
        this.store.dispatch(actionMapper);
        return this.store.blockUntil(function (state) { return !state.invoice.loading; });
    };
    InvoiceResolver.decorators = [
        { type: core_1.Injectable },
    ];
    InvoiceResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return InvoiceResolver;
}());
exports.InvoiceResolver = InvoiceResolver;
//# sourceMappingURL=invoice.resolver.js.map