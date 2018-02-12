"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
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
    RouterEffects.decorators = [
        { type: core_1.Injectable },
    ];
    RouterEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: router_1.Router, },
        { type: common_1.Location, },
    ]; };
    RouterEffects.propDecorators = {
        'goToLogin': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToLoginWithRedirect': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToPageNotFound': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToSearchAssetDetails': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'followRedirect': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToQuotes': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToQuoteById': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToCollection': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToActiveQuote': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToCart': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'initialNavigation': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'addMarkersToUrl': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToBadRequest': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
        'goToServerError': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
    };
    return RouterEffects;
}());
exports.RouterEffects = RouterEffects;
//# sourceMappingURL=router.effects.js.map