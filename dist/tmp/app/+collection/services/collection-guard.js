"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var CollectionGuard = (function () {
    function CollectionGuard(userCan, currentUser, router, store) {
        this.userCan = userCan;
        this.currentUser = currentUser;
        this.router = router;
        this.store = store;
    }
    CollectionGuard.prototype.canActivate = function () {
        if (this.currentUser.loggedIn() && this.userCan.viewCollections()) {
            return true;
        }
        else {
            if (this.currentUser.loggedIn() && !this.userCan.viewCollections()) {
                this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            }
            else {
                this.store.dispatch(function (factory) { return factory.error.handle401Unauthorized(); });
            }
            return false;
        }
    };
    CollectionGuard.decorators = [
        { type: core_1.Injectable },
    ];
    CollectionGuard.ctorParameters = function () { return [
        { type: capabilities_service_1.Capabilities, },
        { type: current_user_service_1.CurrentUserService, },
        { type: router_1.Router, },
        { type: app_store_1.AppStore, },
    ]; };
    return CollectionGuard;
}());
exports.CollectionGuard = CollectionGuard;
//# sourceMappingURL=collection-guard.js.map