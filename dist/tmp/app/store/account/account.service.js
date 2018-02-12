"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var AccountService = (function () {
    function AccountService(apiService) {
        this.apiService = apiService;
    }
    AccountService.prototype.getAccount = function (accountId, loadingIndicator) {
        return this.apiService.get(api_interface_1.Api.Identities, "account/" + accountId, { loadingIndicator: loadingIndicator });
    };
    AccountService.decorators = [
        { type: core_1.Injectable },
    ];
    AccountService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return AccountService;
}());
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map