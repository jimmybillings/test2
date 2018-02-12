"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var CollectionShowResolver = (function () {
    function CollectionShowResolver(store) {
        this.store = store;
    }
    CollectionShowResolver.prototype.resolve = function (route) {
        var _this = this;
        this.store.dispatch(function (factory) { return _this.createAppropriateActionFor(route.params, factory); });
        return this.store.blockUntil(function (state) { return !state.activeCollection.loading; });
    };
    CollectionShowResolver.prototype.createAppropriateActionFor = function (routeParameters, factory) {
        var state = this.store.snapshot(function (state) { return state.activeCollection; });
        var routeId = Number(routeParameters['id']);
        var actionParameters = {
            currentPage: routeParameters['i'], pageSize: routeParameters['n']
        };
        if (!state.loading) {
            if (state.collection.id === routeId) {
                return factory.activeCollection.loadPage(actionParameters);
            }
            return factory.activeCollection.set(routeId, actionParameters);
        }
        return factory.activeCollection.load(actionParameters);
    };
    CollectionShowResolver.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionShowResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return CollectionShowResolver;
}());
exports.CollectionShowResolver = CollectionShowResolver;
//# sourceMappingURL=collection-show.resolver.js.map