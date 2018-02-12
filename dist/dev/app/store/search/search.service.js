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
            items: results.items || [],
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
    SearchService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService,
            current_user_service_1.CurrentUserService,
            gallery_view_service_1.GalleryViewService,
            user_preference_service_1.UserPreferenceService])
    ], SearchService);
    return SearchService;
}());
exports.SearchService = SearchService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0Msa0RBQXNEO0FBQ3RELHVFQUEyRTtBQUczRSxtRkFBZ0Y7QUFDaEYsbUZBQWdGO0FBQ2hGLHlGQUFzRjtBQUd0RjtJQUNFLHVCQUNVLFVBQTRCLEVBQzVCLFdBQStCLEVBQy9CLGtCQUFzQyxFQUN0QyxjQUFxQztRQUhyQyxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUM1QixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7SUFDM0MsQ0FBQztJQUVFLG1DQUFXLEdBQWxCLFVBQW1CLFlBQTBCO1FBQTdDLGlCQVNDO1FBUkMsSUFBTSxVQUFVLEdBQWtCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsSUFBTSxPQUFPLEdBQVcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQztRQUVwRixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQ3hCLG1CQUFHLENBQUMsTUFBTSxFQUNWLE9BQU8sRUFDUCxFQUFFLFVBQVUsWUFBQSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUN2QyxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQXZCLENBQXVCLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRU8saUNBQVMsR0FBakIsVUFBa0IsT0FBeUI7UUFDekMsTUFBTSxDQUFDO1lBQ0wsS0FBSyxFQUFFLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRTtZQUMxQixVQUFVLEVBQUU7Z0JBQ1YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVO2dCQUM5QixRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQzFCLFdBQVcsRUFBRSxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUM7Z0JBQ3BDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYTtnQkFDcEMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxXQUFXO2dCQUNoQyxlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWU7YUFDekM7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUVPLDhCQUFNLEdBQWQsVUFBZSxZQUEwQjtRQUN2QyxJQUFJLFVBQVUsR0FBa0IsRUFBRSxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxDQUFDLElBQUksUUFBUSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDbEMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUMzRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxlQUFlLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztZQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0csVUFBVSxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUM5RSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMxRCxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3BCLENBQUM7SUE3Q1UsYUFBYTtRQUR6QixpQkFBVSxFQUFFO3lDQUdXLDhCQUFnQjtZQUNmLHlDQUFrQjtZQUNYLHlDQUFrQjtZQUN0QiwrQ0FBcUI7T0FMcEMsYUFBYSxDQThDekI7SUFBRCxvQkFBQztDQTlDRCxBQThDQyxJQUFBO0FBOUNZLHNDQUFhIiwiZmlsZSI6ImFwcC9zdG9yZS9zZWFyY2gvc2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEZ1dHVyZUFwaVNlcnZpY2UgfSBmcm9tICcuLi9hcGkvYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpLCBBcGlQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFNlYXJjaFBhcmFtcywgQXBpU2VhcmNoUmVzdWx0cywgU2VhcmNoUmVzdWx0cyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3NlYXJjaC5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEdhbGxlcnlWaWV3U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9nYWxsZXJ5LXZpZXcuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyUHJlZmVyZW5jZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgU2VhcmNoU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSxcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnYWxsZXJ5Vmlld1NlcnZpY2U6IEdhbGxlcnlWaWV3U2VydmljZSxcbiAgICBwcml2YXRlIHVzZXJQcmVmZXJlbmNlOiBVc2VyUHJlZmVyZW5jZVNlcnZpY2VcbiAgKSB7IH1cblxuICBwdWJsaWMgbG9hZFJlc3VsdHMoc2VhcmNoUGFyYW1zOiBTZWFyY2hQYXJhbXMpOiBPYnNlcnZhYmxlPFNlYXJjaFJlc3VsdHM+IHtcbiAgICBjb25zdCBwYXJhbWV0ZXJzOiBBcGlQYXJhbWV0ZXJzID0gdGhpcy5mb3JtYXQoc2VhcmNoUGFyYW1zKTtcbiAgICBjb25zdCBhcGlQYXRoOiBzdHJpbmcgPSB0aGlzLmN1cnJlbnRVc2VyLmxvZ2dlZEluKCkgPyAnc2VhcmNoJyA6ICdzZWFyY2gvYW5vbnltb3VzJztcblxuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UuZ2V0KFxuICAgICAgQXBpLkFzc2V0cyxcbiAgICAgIGFwaVBhdGgsXG4gICAgICB7IHBhcmFtZXRlcnMsIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICkubWFwKChyZXN1bHRzKSA9PiB0aGlzLm5vcm1hbGl6ZShyZXN1bHRzKSk7XG4gIH1cblxuICBwcml2YXRlIG5vcm1hbGl6ZShyZXN1bHRzOiBBcGlTZWFyY2hSZXN1bHRzKTogU2VhcmNoUmVzdWx0cyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW1zOiByZXN1bHRzLml0ZW1zIHx8IFtdLFxuICAgICAgcGFnaW5hdGlvbjoge1xuICAgICAgICB0b3RhbENvdW50OiByZXN1bHRzLnRvdGFsQ291bnQsXG4gICAgICAgIHBhZ2VTaXplOiByZXN1bHRzLnBhZ2VTaXplLFxuICAgICAgICBjdXJyZW50UGFnZTogcmVzdWx0cy5jdXJyZW50UGFnZSArIDEsXG4gICAgICAgIG51bWJlck9mUGFnZXM6IHJlc3VsdHMubnVtYmVyT2ZQYWdlcyxcbiAgICAgICAgaGFzTmV4dFBhZ2U6IHJlc3VsdHMuaGFzTmV4dFBhZ2UsXG4gICAgICAgIGhhc1ByZXZpb3VzUGFnZTogcmVzdWx0cy5oYXNQcmV2aW91c1BhZ2VcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXQoc2VhcmNoUGFyYW1zOiBTZWFyY2hQYXJhbXMpOiBBcGlQYXJhbWV0ZXJzIHtcbiAgICBsZXQgbm9ybWFsaXplZDogQXBpUGFyYW1ldGVycyA9IHt9O1xuXG4gICAgZm9yIChsZXQgcGFyYW1LZXkgaW4gc2VhcmNoUGFyYW1zKSB7XG4gICAgICBub3JtYWxpemVkW3BhcmFtS2V5XSA9IHNlYXJjaFBhcmFtc1twYXJhbUtleV0udG9TdHJpbmcoKTsgLy8gbm90IG1vZGlmeWluZyBwYXJhbXMgaGVyZSwgdG9TdHJpbmcoKSByZXR1cm5zIGEgbmV3IHZhbHVlXG4gICAgfVxuXG4gICAgaWYgKCFub3JtYWxpemVkLnEpIG5vcm1hbGl6ZWQucSA9ICdpdGVtVHlwZTpjbGlwJztcbiAgICBpZiAobm9ybWFsaXplZC5ncSkgbm9ybWFsaXplZC5ncSA9IHRoaXMuZ2FsbGVyeVZpZXdTZXJ2aWNlLnN0cmluZ2lmeVBhdGhGb3JTZWFyY2goSlNPTi5wYXJzZShub3JtYWxpemVkLmdxKSk7XG4gICAgbm9ybWFsaXplZC5pID0gbm9ybWFsaXplZC5pID8gKHBhcnNlRmxvYXQobm9ybWFsaXplZC5pKSAtIDEpLnRvU3RyaW5nKCkgOiAnMCc7XG4gICAgbm9ybWFsaXplZC52aWV3VHlwZSA9IHRoaXMudXNlclByZWZlcmVuY2Uuc3RhdGUuYXNzZXRWaWV3O1xuICAgIHJldHVybiBub3JtYWxpemVkO1xuICB9XG59XG4iXX0=
