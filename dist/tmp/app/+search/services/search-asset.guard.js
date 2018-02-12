"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var SearchAssetGuard = (function () {
    function SearchAssetGuard(userCan, currentUser, router, store) {
        this.userCan = userCan;
        this.currentUser = currentUser;
        this.router = router;
        this.store = store;
    }
    SearchAssetGuard.prototype.canActivate = function (route, state) {
        if (!this.currentUser.loggedIn() && !route.params['share_key']) {
            return true;
        }
        else if (this.userCan.viewAssetDetails()) {
            return true;
        }
        else if (route.params['share_key']) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            return false;
        }
    };
    SearchAssetGuard.decorators = [
        { type: core_1.Injectable },
    ];
    SearchAssetGuard.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: current_user_service_1.CurrentUserService, },
        { type: router_1.Router, },
        { type: app_store_1.AppStore, },
    ]; };
    return SearchAssetGuard;
}());
exports.SearchAssetGuard = SearchAssetGuard;
//# sourceMappingURL=search-asset.guard.js.map