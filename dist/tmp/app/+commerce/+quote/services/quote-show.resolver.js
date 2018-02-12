"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var QuoteShowResolver = (function () {
    function QuoteShowResolver(store) {
        this.store = store;
    }
    QuoteShowResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.quoteShow.load(parseInt(route.params.id)); });
        return this.store.blockUntil(function (state) { return !state.quoteShow.loading; });
    };
    QuoteShowResolver.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteShowResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteShowResolver;
}());
exports.QuoteShowResolver = QuoteShowResolver;
//# sourceMappingURL=quote-show.resolver.js.map