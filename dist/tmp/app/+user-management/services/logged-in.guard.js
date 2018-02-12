"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var current_user_service_1 = require("../../shared/services/current-user.service");
var LoggedInGuard = (function () {
    function LoggedInGuard(currentUser, router) {
        this.currentUser = currentUser;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function () {
        if (!this.currentUser.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    };
    LoggedInGuard.decorators = [
        { type: core_1.Injectable },
    ];
    LoggedInGuard.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: router_1.Router, },
    ]; };
    return LoggedInGuard;
}());
exports.LoggedInGuard = LoggedInGuard;
//# sourceMappingURL=logged-in.guard.js.map