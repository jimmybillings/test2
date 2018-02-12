"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    SearchResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore,
            search_context_service_1.SearchContext,
            user_preference_service_1.UserPreferenceService,
            filter_service_1.FilterService])
    ], SearchResolver);
    return SearchResolver;
}());
exports.SearchResolver = SearchResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlcnZpY2VzL3NlYXJjaC5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQyx1RkFBNkU7QUFDN0UseUZBQXNGO0FBQ3RGLHVFQUFxRTtBQUNyRSw2Q0FBMkM7QUFHM0M7SUFDRSx3QkFDVSxLQUFlLEVBQ2YsYUFBNEIsRUFDNUIsZUFBc0MsRUFDdEMsTUFBcUI7UUFIckIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzVCLG9CQUFlLEdBQWYsZUFBZSxDQUF1QjtRQUN0QyxXQUFNLEdBQU4sTUFBTSxDQUFlO0lBQzNCLENBQUM7SUFFTCxnQ0FBTyxHQUFQLFVBQVEsS0FBNkIsRUFBRSxLQUEwQjtRQUFqRSxpQkFLQztRQUpDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUN2RyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQXBELENBQW9ELENBQUMsQ0FBQztRQUNyRixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFyQixDQUFxQixDQUFDLENBQUM7SUFDL0QsQ0FBQztJQWJVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FHTSxvQkFBUTtZQUNBLHNDQUFhO1lBQ1gsK0NBQXFCO1lBQzlCLDhCQUFhO09BTHBCLGNBQWMsQ0FjMUI7SUFBRCxxQkFBQztDQWRELEFBY0MsSUFBQTtBQWRZLHdDQUFjIiwiZmlsZSI6ImFwcC8rc2VhcmNoL3NlcnZpY2VzL3NlYXJjaC5yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBTZWFyY2hDb250ZXh0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3NlYXJjaC1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclByZWZlcmVuY2VTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItcHJlZmVyZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoUmVzb2x2ZXIge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIHNlYXJjaENvbnRleHQ6IFNlYXJjaENvbnRleHQsXG4gICAgcHJpdmF0ZSB1c2VyUHJlZmVyZW5jZXM6IFVzZXJQcmVmZXJlbmNlU2VydmljZSxcbiAgICBwcml2YXRlIGZpbHRlcjogRmlsdGVyU2VydmljZVxuICApIHsgfVxuXG4gIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIHN0YXRlOiBSb3V0ZXJTdGF0ZVNuYXBzaG90KTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICB0aGlzLnNlYXJjaENvbnRleHQuY3JlYXRlID0gcm91dGUucGFyYW1zO1xuICAgIHRoaXMuZmlsdGVyLmxvYWQodGhpcy5zZWFyY2hDb250ZXh0LnN0YXRlLCB0aGlzLnVzZXJQcmVmZXJlbmNlcy5zdGF0ZS5kaXNwbGF5RmlsdGVyQ291bnRzKS5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5zZWFyY2gubG9hZFJlc3VsdHModGhpcy5zZWFyY2hDb250ZXh0LnN0YXRlKSk7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuYmxvY2tVbnRpbChzdGF0ZSA9PiAhc3RhdGUuc2VhcmNoLmxvYWRpbmcpO1xuICB9XG59XG4iXX0=
