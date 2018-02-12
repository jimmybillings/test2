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
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var router_1 = require("@angular/router");
var common_1 = require("@angular/common");
var RouterActions = require("./router.actions");
var UiConfigActions = require("../ui-config/ui-config.actions");
var common_functions_1 = require("../../shared/utilities/common.functions");
var subclip_markers_1 = require("../../shared/interfaces/subclip-markers");
var RouterEffects = (function () {
    function RouterEffects(actions, router, location) {
        var _this = this;
        this.actions = actions;
        this.router = router;
        this.location = location;
        this.goToLogin = this.actions.ofType(RouterActions.GoToLogin.Type)
            .do(function (action) { return _this.router.navigate([_this.LoginPath]); });
        this.goToLoginWithRedirect = this.actions.ofType(RouterActions.GoToLoginWithRedirect.Type)
            .do(function (action) {
            var currentPath = _this.location.path();
            if (currentPath.split(';')[0] !== _this.LoginPath) {
                localStorage.setItem(_this.RedirectUrlKey, currentPath);
                _this.router.navigate([_this.LoginPath, { requireLogin: true }]);
            }
        });
        this.goToPageNotFound = this.actions.ofType(RouterActions.GoToPageNotFound.Type)
            .do(function (action) { return _this.router.navigate([_this.PageNotFoundPath]); });
        this.goToSearchAssetDetails = this.actions.ofType(RouterActions.GoToSearchAssetDetails.Type)
            .do(function (action) {
            return _this.router.navigate([
                _this.SearchAssetDetailsPath,
                action.assetId,
                subclip_markers_1.bothMarkersAreSet(action.markers) ? subclip_markers_1.durationFrom(action.markers) : {}
            ]);
        });
        this.followRedirect = this.actions.ofType(RouterActions.FollowRedirect.Type)
            .do(function (action) {
            var redirectUrl = localStorage.getItem(_this.RedirectUrlKey);
            if (redirectUrl) {
                _this.router.navigateByUrl(redirectUrl);
                localStorage.removeItem(_this.RedirectUrlKey);
            }
            else {
                _this.router.navigate([_this.RootPath]);
            }
        });
        this.goToQuotes = this.actions.ofType(RouterActions.GoToQuotes.Type)
            .do(function () { return _this.router.navigate([_this.QuotesPath]); });
        this.goToQuoteById = this.actions.ofType(RouterActions.GoToQuoteById.Type)
            .do(function (action) {
            return _this.router.navigate([_this.QuotesPath, action.quoteId]);
        });
        this.goToCollection = this.actions.ofType(RouterActions.GoToCollection.Type)
            .do(function (action) {
            _this.router.navigate([_this.CollectionsPath, action.collectionId, { i: action.page, n: action.perPage }]);
        });
        this.goToActiveQuote = this.actions.ofType(RouterActions.GoToActiveQuote.Type)
            .do(function (action) { return _this.router.navigate([_this.ActiveQuotePath]); });
        this.goToCart = this.actions.ofType(RouterActions.GoToCart.Type)
            .do(function (action) { return _this.router.navigate([_this.CartPath]); });
        this.initialNavigation = this.actions.ofType(UiConfigActions.LoadSuccess.Type)
            .do(function (action) { return _this.router.initialNavigation(); });
        this.addMarkersToUrl = this.actions.ofType(RouterActions.AddMarkersToUrl.Type)
            .do(function (action) {
            var params = common_functions_1.Common.urlStringToParamsObject(_this.router.routerState.snapshot.url);
            params.timeStart = action.timeStart;
            params.timeEnd = action.timeEnd;
            _this.location.go(_this.SearchAssetDetailsPath + "/" + action.assetId + common_functions_1.Common.urlParamsObjectToUrlStringParams(params));
        });
        this.goToBadRequest = this.actions.ofType(RouterActions.GoToBadRequest.Type)
            .do(function () { return _this.router.navigate([_this.BadRequestPath]); });
        this.goToServerError = this.actions.ofType(RouterActions.GoToServerError.Type)
            .do(function () { return _this.router.navigate([_this.ServerErrorPath]); });
        this.LoginPath = '/user/login';
        this.PageNotFoundPath = '/error/404';
        this.BadRequestPath = '/error/400';
        this.ServerErrorPath = '/error/500';
        this.QuotesPath = '/quotes';
        this.RootPath = '/';
        this.RedirectUrlKey = 'RouterEffects.RedirectUrl';
        this.SearchAssetDetailsPath = '/search/asset';
        this.CollectionsPath = '/collections';
        this.ActiveQuotePath = '/active-quote';
        this.CartPath = '/cart';
    }
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToLogin", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToLoginWithRedirect", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToPageNotFound", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToSearchAssetDetails", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "followRedirect", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToQuotes", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToQuoteById", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToCollection", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToActiveQuote", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToCart", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "initialNavigation", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "addMarkersToUrl", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToBadRequest", void 0);
    __decorate([
        effects_1.Effect({ dispatch: false }),
        __metadata("design:type", Observable_1.Observable)
    ], RouterEffects.prototype, "goToServerError", void 0);
    RouterEffects = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [effects_1.Actions, router_1.Router, common_1.Location])
    ], RouterEffects);
    return RouterEffects;
}());
exports.RouterEffects = RouterEffects;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9yb3V0ZXIvcm91dGVyLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MseUNBQWdEO0FBRWhELDhDQUE2QztBQUM3QywwQ0FBeUM7QUFDekMsMENBQTJDO0FBRTNDLGdEQUFrRDtBQUNsRCxnRUFBa0U7QUFDbEUsNEVBQWlFO0FBRWpFLDJFQUEwRjtBQUcxRjtJQW1HRSx1QkFBb0IsT0FBZ0IsRUFBVSxNQUFjLEVBQVUsUUFBa0I7UUFBeEYsaUJBQTZGO1FBQXpFLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQWpHakYsY0FBUyxHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQzthQUNyRixFQUFFLENBQUMsVUFBQyxNQUErQixJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1FBRzVFLDBCQUFxQixHQUF1QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO2FBQzdHLEVBQUUsQ0FBQyxVQUFDLE1BQTJDO1lBQzlDLElBQU0sV0FBVyxHQUFXLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDakQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFJLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUN2RCxLQUFJLENBQUMsTUFBTSxDQUFDLFFB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TSxFQUFvQixpQkFBUTtPQW5HN0UsYUFBYSxDQW9HekI7SUFBRCxvQkFBQztDQXBHRCxBQW9HQyxJQUFBO0FBcEdZLHNDQUFhIiwiZmlsZSI6ImFwcC9zdG9yZS9yb3V0ZXIvcm91dGVyLmVmZmVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFZmZlY3QsIEFjdGlvbnMgfSBmcm9tICdAbmdyeC9lZmZlY3RzJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvY2F0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0ICogYXMgUm91dGVyQWN0aW9ucyBmcm9tICcuL3JvdXRlci5hY3Rpb25zJztcbmltcG9ydCAqIGFzIFVpQ29uZmlnQWN0aW9ucyBmcm9tICcuLi91aS1jb25maWcvdWktY29uZmlnLmFjdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IFBvam8gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IGJvdGhNYXJrZXJzQXJlU2V0LCBkdXJhdGlvbkZyb20gfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9zdWJjbGlwLW1hcmtlcnMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUm91dGVyRWZmZWN0cyB7XG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIGdvVG9Mb2dpbjogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShSb3V0ZXJBY3Rpb25zLkdvVG9Mb2dpbi5UeXBlKVxuICAgIC5kbygoYWN0aW9uOiBSb3V0ZXJBY3Rpb25zLkdvVG9Mb2dpbikgPT4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuTG9naW5QYXRoXSkpO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIGdvVG9Mb2dpbldpdGhSZWRpcmVjdDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShSb3V0ZXJBY3Rpb25zLkdvVG9Mb2dpbldpdGhSZWRpcmVjdC5UeXBlKVxuICAgIC5kbygoYWN0aW9uOiBSb3V0ZXJBY3Rpb25zLkdvVG9Mb2dpbldpdGhSZWRpcmVjdCkgPT4ge1xuICAgICAgY29uc3QgY3VycmVudFBhdGg6IHN0cmluZyA9IHRoaXMubG9jYXRpb24ucGF0aCgpO1xuICAgICAgaWYgKGN1cnJlbnRQYXRoLnNwbGl0KCc7JylbMF0gIT09IHRoaXMuTG9naW5QYXRoKSB7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuUmVkaXJlY3RVcmxLZXksIGN1cnJlbnRQYXRoKTtcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuTG9naW5QYXRoLCB7IHJlcXVpcmVMb2dpbjogdHJ1ZSB9XSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgZ29Ub1BhZ2VOb3RGb3VuZDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShSb3V0ZXJBY3Rpb25zLkdvVG9QYWdlTm90Rm91bmQuVHlwZSlcbiAgICAuZG8oKGFjdGlvbjogUm91dGVyQWN0aW9ucy5Hb1RvUGFnZU5vdEZvdW5kKSA9PiB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5QYWdlTm90Rm91bmRQYXRoXSkpO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIGdvVG9TZWFyY2hBc3NldERldGFpbHM6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUm91dGVyQWN0aW9ucy5Hb1RvU2VhcmNoQXNzZXREZXRhaWxzLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IFJvdXRlckFjdGlvbnMuR29Ub1NlYXJjaEFzc2V0RGV0YWlscykgPT5cbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcbiAgICAgICAgdGhpcy5TZWFyY2hBc3NldERldGFpbHNQYXRoLFxuICAgICAgICBhY3Rpb24uYXNzZXRJZCxcbiAgICAgICAgYm90aE1hcmtlcnNBcmVTZXQoYWN0aW9uLm1hcmtlcnMpID8gZHVyYXRpb25Gcm9tKGFjdGlvbi5tYXJrZXJzKSA6IHt9XG4gICAgICBdKVxuICAgICk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgZm9sbG93UmVkaXJlY3Q6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUm91dGVyQWN0aW9ucy5Gb2xsb3dSZWRpcmVjdC5UeXBlKVxuICAgIC5kbygoYWN0aW9uOiBSb3V0ZXJBY3Rpb25zLkZvbGxvd1JlZGlyZWN0KSA9PiB7XG4gICAgICBjb25zdCByZWRpcmVjdFVybDogc3RyaW5nID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5SZWRpcmVjdFVybEtleSk7XG5cbiAgICAgIGlmIChyZWRpcmVjdFVybCkge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHJlZGlyZWN0VXJsKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0odGhpcy5SZWRpcmVjdFVybEtleSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbdGhpcy5Sb290UGF0aF0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIGdvVG9RdW90ZXM6IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoUm91dGVyQWN0aW9ucy5Hb1RvUXVvdGVzLlR5cGUpXG4gICAgLmRvKCgpID0+IHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLlF1b3Rlc1BhdGhdKSk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgZ29Ub1F1b3RlQnlJZDogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShSb3V0ZXJBY3Rpb25zLkdvVG9RdW90ZUJ5SWQuVHlwZSlcbiAgICAuZG8oKGFjdGlvbjogUm91dGVyQWN0aW9ucy5Hb1RvUXVvdGVCeUlkKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuUXVvdGVzUGF0aCwgYWN0aW9uLnF1b3RlSWRdKTtcbiAgICB9KTtcblxuICBARWZmZWN0KHsgZGlzcGF0Y2g6IGZhbHNlIH0pXG4gIHB1YmxpYyBnb1RvQ29sbGVjdGlvbjogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShSb3V0ZXJBY3Rpb25zLkdvVG9Db2xsZWN0aW9uLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IFJvdXRlckFjdGlvbnMuR29Ub0NvbGxlY3Rpb24pID0+IHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLkNvbGxlY3Rpb25zUGF0aCwgYWN0aW9uLmNvbGxlY3Rpb25JZCwgeyBpOiBhY3Rpb24ucGFnZSwgbjogYWN0aW9uLnBlclBhZ2UgfV0pO1xuICAgIH0pO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIGdvVG9BY3RpdmVRdW90ZTogT2JzZXJ2YWJsZTxBY3Rpb24+ID0gdGhpcy5hY3Rpb25zLm9mVHlwZShSb3V0ZXJBY3Rpb25zLkdvVG9BY3RpdmVRdW90ZS5UeXBlKVxuICAgIC5kbygoYWN0aW9uOiBSb3V0ZXJBY3Rpb25zLkdvVG9BY3RpdmVRdW90ZSkgPT4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuQWN0aXZlUXVvdGVQYXRoXSkpO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIGdvVG9DYXJ0OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFJvdXRlckFjdGlvbnMuR29Ub0NhcnQuVHlwZSlcbiAgICAuZG8oKGFjdGlvbjogUm91dGVyQWN0aW9ucy5Hb1RvQ2FydCkgPT4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuQ2FydFBhdGhdKSk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgaW5pdGlhbE5hdmlnYXRpb246IE9ic2VydmFibGU8QWN0aW9uPiA9IHRoaXMuYWN0aW9ucy5vZlR5cGUoVWlDb25maWdBY3Rpb25zLkxvYWRTdWNjZXNzLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IFVpQ29uZmlnQWN0aW9ucy5Mb2FkU3VjY2VzcykgPT4gdGhpcy5yb3V0ZXIuaW5pdGlhbE5hdmlnYXRpb24oKSk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgYWRkTWFya2Vyc1RvVXJsOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFJvdXRlckFjdGlvbnMuQWRkTWFya2Vyc1RvVXJsLlR5cGUpXG4gICAgLmRvKChhY3Rpb246IFJvdXRlckFjdGlvbnMuQWRkTWFya2Vyc1RvVXJsKSA9PiB7XG4gICAgICBsZXQgcGFyYW1zOiBQb2pvID0gQ29tbW9uLnVybFN0cmluZ1RvUGFyYW1zT2JqZWN0KHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnVybCk7XG4gICAgICBwYXJhbXMudGltZVN0YXJ0ID0gYWN0aW9uLnRpbWVTdGFydDtcbiAgICAgIHBhcmFtcy50aW1lRW5kID0gYWN0aW9uLnRpbWVFbmQ7XG4gICAgICB0aGlzLmxvY2F0aW9uLmdvKGAke3RoaXMuU2VhcmNoQXNzZXREZXRhaWxzUGF0aH0vJHthY3Rpb24uYXNzZXRJZH0ke0NvbW1vbi51cmxQYXJhbXNPYmplY3RUb1VybFN0cmluZ1BhcmFtcyhwYXJhbXMpfWApO1xuICAgIH0pO1xuXG4gIEBFZmZlY3QoeyBkaXNwYXRjaDogZmFsc2UgfSlcbiAgcHVibGljIGdvVG9CYWRSZXF1ZXN0OiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFJvdXRlckFjdGlvbnMuR29Ub0JhZFJlcXVlc3QuVHlwZSlcbiAgICAuZG8oKCkgPT4gdGhpcy5yb3V0ZXIubmF2aWdhdGUoW3RoaXMuQmFkUmVxdWVzdFBhdGhdKSk7XG5cbiAgQEVmZmVjdCh7IGRpc3BhdGNoOiBmYWxzZSB9KVxuICBwdWJsaWMgZ29Ub1NlcnZlckVycm9yOiBPYnNlcnZhYmxlPEFjdGlvbj4gPSB0aGlzLmFjdGlvbnMub2ZUeXBlKFJvdXRlckFjdGlvbnMuR29Ub1NlcnZlckVycm9yLlR5cGUpXG4gICAgLmRvKCgpID0+IHRoaXMucm91dGVyLm5hdmlnYXRlKFt0aGlzLlNlcnZlckVycm9yUGF0aF0pKTtcblxuICBwcml2YXRlIHJlYWRvbmx5IExvZ2luUGF0aDogc3RyaW5nID0gJy91c2VyL2xvZ2luJztcbiAgcHJpdmF0ZSByZWFkb25seSBQYWdlTm90Rm91bmRQYXRoOiBzdHJpbmcgPSAnL2Vycm9yLzQwNCc7XG4gIHByaXZhdGUgcmVhZG9ubHkgQmFkUmVxdWVzdFBhdGg6IHN0cmluZyA9ICcvZXJyb3IvNDAwJztcbiAgcHJpdmF0ZSByZWFkb25seSBTZXJ2ZXJFcnJvclBhdGg6IHN0cmluZyA9ICcvZXJyb3IvNTAwJztcbiAgcHJpdmF0ZSByZWFkb25seSBRdW90ZXNQYXRoOiBzdHJpbmcgPSAnL3F1b3Rlcyc7XG4gIHByaXZhdGUgcmVhZG9ubHkgUm9vdFBhdGg6IHN0cmluZyA9ICcvJztcbiAgcHJpdmF0ZSByZWFkb25seSBSZWRpcmVjdFVybEtleTogc3RyaW5nID0gJ1JvdXRlckVmZmVjdHMuUmVkaXJlY3RVcmwnO1xuICBwcml2YXRlIHJlYWRvbmx5IFNlYXJjaEFzc2V0RGV0YWlsc1BhdGg6IHN0cmluZyA9ICcvc2VhcmNoL2Fzc2V0JztcbiAgcHJpdmF0ZSByZWFkb25seSBDb2xsZWN0aW9uc1BhdGg6IHN0cmluZyA9ICcvY29sbGVjdGlvbnMnO1xuICBwcml2YXRlIHJlYWRvbmx5IEFjdGl2ZVF1b3RlUGF0aDogc3RyaW5nID0gJy9hY3RpdmUtcXVvdGUnO1xuICBwcml2YXRlIHJlYWRvbmx5IENhcnRQYXRoOiBzdHJpbmcgPSAnL2NhcnQnO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYWN0aW9uczogQWN0aW9ucywgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlciwgcHJpdmF0ZSBsb2NhdGlvbjogTG9jYXRpb24pIHsgfVxufVxuXG4iXX0=
