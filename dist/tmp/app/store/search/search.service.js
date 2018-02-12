"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var current_user_service_1 = require("../../shared/services/current-user.service");
var gallery_view_service_1 = require("../../shared/services/gallery-view.service");
var user_preference_service_1 = require("../../shared/services/user-preference.service");
var SearchService = (function () {
    function SearchService(apiService, currentUser, galleryViewService, userPreference) {
        this.apiService = apiService;
        this.currentUser = currentUser;
        this.galleryViewService = galleryViewService;
        this.userPreference = userPreference;
    }
    SearchService.prototype.loadResults = function (searchParams) {
        var _this = this;
        var parameters = this.format(searchParams);
        var apiPath = this.currentUser.loggedIn() ? 'search' : 'search/anonymous';
        return this.apiService.get(api_interface_1.Api.Assets, apiPath, { parameters: parameters, loadingIndicator: true }).map(function (results) { return _this.normalize(results); });
    };
    SearchService.prototype.normalize = function (results) {
        return {
            items: results.items,
            pagination: {
                totalCount: results.totalCount,
                pageSize: results.pageSize,
                currentPage: results.currentPage + 1,
                numberOfPages: results.numberOfPages,
                hasNextPage: results.hasNextPage,
                hasPreviousPage: results.hasPreviousPage
            }
        };
    };
    SearchService.prototype.format = function (searchParams) {
        var normalized = {};
        for (var paramKey in searchParams) {
            normalized[paramKey] = searchParams[paramKey].toString();
        }
        if (!normalized.q)
            normalized.q = 'itemType:clip';
        if (normalized.gq)
            normalized.gq = this.galleryViewService.stringifyPathForSearch(JSON.parse(normalized.gq));
        normalized.i = normalized.i ? (parseFloat(normalized.i) - 1).toString() : '0';
        normalized.viewType = this.userPreference.state.assetView;
        return normalized;
    };
    SearchService.decorators = [
        { type: core_1.Injectable },
    ];
    SearchService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
        { type: current_user_service_1.CurrentUserService, },
        { type: gallery_view_service_1.GalleryViewService, },
        { type: user_preference_service_1.UserPreferenceService, },
    ]; };
    return SearchService;
}());
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map