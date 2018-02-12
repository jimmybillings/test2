"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../../app.store");
var QuoteEditResolver = (function () {
    function QuoteEditResolver(store) {
        this.store = store;
    }
    QuoteEditResolver.prototype.resolve = function () {
        this.store.dispatch(function (factory) { return factory.quoteEdit.load(); });
        return this.store.blockUntil(function (state) { return !state.quoteEdit.loading; });
    };
    QuoteEditResolver.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteEditResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteEditResolver;
}());
exports.QuoteEditResolver = QuoteEditResolver;
//# sourceMappingURL=quote-edit.resolver.js.map