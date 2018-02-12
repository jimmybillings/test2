"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var search_context_service_1 = require("../../shared/services/search-context.service");
var user_preference_service_1 = require("../../shared/services/user-preference.service");
var filter_service_1 = require("../../shared/services/filter.service");
var app_store_1 = require("../../app.store");
var SearchResolver = (function () {
    function SearchResolver(store, searchContext, userPreferences, filter) {
        this.store = store;
        this.searchContext = searchContext;
        this.userPreferences = userPreferences;
        this.filter = filter;
    }
    SearchResolver.prototype.resolve = function (route, state) {
        var _this = this;
        this.searchContext.create = route.params;
        this.filter.load(this.searchContext.state, this.userPreferences.state.displayFilterCounts).subscribe();
        this.store.dispatch(function (factory) { return factory.search.loadResults(_this.searchContext.state); });
        return this.store.blockUntil(function (state) { return !state.search.loading; });
    };
    SearchResolver.decorators = [
        { type: core_1.Injectable },
    ];
    SearchResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: search_context_service_1.SearchContext, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: filter_service_1.FilterService, },
    ]; };
    return SearchResolver;
}());
exports.SearchResolver = SearchResolver;
//# sourceMappingURL=search.resolver.js.map