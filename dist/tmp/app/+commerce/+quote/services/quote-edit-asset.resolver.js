"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var QuoteEditAssetResolver = (function () {
    function QuoteEditAssetResolver(store) {
        this.store = store;
    }
    QuoteEditAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadQuoteEditAsset(route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    QuoteEditAssetResolver.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteEditAssetResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteEditAssetResolver;
}());
exports.QuoteEditAssetResolver = QuoteEditAssetResolver;
//# sourceMappingURL=quote-edit-asset.resolver.js.map