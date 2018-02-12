"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var CollectionAssetResolver = (function () {
    function CollectionAssetResolver(store) {
        this.store = store;
    }
    CollectionAssetResolver.prototype.resolve = function (route) {
        this.store.dispatch(function (factory) { return factory.asset.loadActiveCollectionAsset(route.params.uuid); });
        return this.store.blockUntil(function (state) { return !state.asset.loading; });
    };
    CollectionAssetResolver.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionAssetResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return CollectionAssetResolver;
}());
exports.CollectionAssetResolver = CollectionAssetResolver;
//# sourceMappingURL=collection-asset.resolver.js.map