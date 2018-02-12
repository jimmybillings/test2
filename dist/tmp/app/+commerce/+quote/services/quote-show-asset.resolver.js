"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var QuoteShowAssetResolver = (function () {
    function QuoteShowAssetResolver(store) {
        this.store = store;
    }
    QuoteShowAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadQuoteShowAsset(parseInt(route.params.id), route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    QuoteShowAssetResolver.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteShowAssetResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteShowAssetResolver;
}());
exports.QuoteShowAssetResolver = QuoteShowAssetResolver;
//# sourceMappingURL=quote-show-asset.resolver.js.map