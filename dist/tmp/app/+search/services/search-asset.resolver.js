"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var SearchAssetResolver = (function () {
    function SearchAssetResolver(store) {
        this.store = store;
    }
    SearchAssetResolver.prototype.resolve = function (route) {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.asset.loadSearchAsset(_this.convertToLoadParameters(route.params)); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    SearchAssetResolver.prototype.convertToLoadParameters = function (routeParameters) {
        return {
            id: routeParameters['id'],
            share_key: routeParameters['share_key'],
            timeEnd: routeParameters['timeEnd'],
            timeStart: routeParameters['timeStart']
        };
    };
    SearchAssetResolver.decorators = [
        { type: core_1.Injectable },
    ];
    SearchAssetResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return SearchAssetResolver;
}());
exports.SearchAssetResolver = SearchAssetResolver;
//# sourceMappingURL=search-asset.resolver.js.map