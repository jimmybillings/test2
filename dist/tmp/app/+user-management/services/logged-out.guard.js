"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var LoggedOutGuard = (function () {
    function LoggedOutGuard(currentUser, store) {
        this.currentUser = currentUser;
        this.store = store;
    }
    LoggedOutGuard.prototype.canActivate = function () {
        if (this.currentUser.loggedIn()) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle401Unauthorized(); });
            return false;
        }
    };
    LoggedOutGuard.decorators = [
        { type: core_1.Injectable },
    ];
    LoggedOutGuard.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: app_store_1.AppStore, },
    ]; };
    return LoggedOutGuard;
}());
exports.LoggedOutGuard = LoggedOutGuard;
//# sourceMappingURL=logged-out.guard.js.map