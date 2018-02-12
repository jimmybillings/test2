"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var FutureUserService = (function () {
    function FutureUserService(apiService) {
        this.apiService = apiService;
    }
    FutureUserService.prototype.getUsersByAccountId = function (accountId, loadingIndicator) {
        return this.apiService.get(api_interface_1.Api.Identities, 'user/searchFields', {
            loadingIndicator: loadingIndicator,
            parameters: { 'fields': 'accountId', 'values': "" + accountId, 'n': '500' }
        })
            .map(function (users) { return users.items; });
    };
    FutureUserService.decorators = [
        { type: core_1.Injectable },
    ];
    FutureUserService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return FutureUserService;
}());
exports.FutureUserService = FutureUserService;
//# sourceMappingURL=user.service.js.map