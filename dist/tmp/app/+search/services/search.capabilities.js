"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var current_user_service_1 = require("../../shared/services/current-user.service");
var SearchCapabilities = (function () {
    function SearchCapabilities(currentUser) {
        this.currentUser = currentUser;
    }
    SearchCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    SearchCapabilities.decorators = [
        { type: core_1.Injectable },
    ];
    SearchCapabilities.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return SearchCapabilities;
}());
exports.SearchCapabilities = SearchCapabilities;
//# sourceMappingURL=search.capabilities.js.map