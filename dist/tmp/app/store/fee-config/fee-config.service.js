"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var FeeConfigService = (function () {
    function FeeConfigService(apiService) {
        this.apiService = apiService;
    }
    FeeConfigService.prototype.loadFeeConfig = function () {
        return this.apiService.get(api_interface_1.Api.Identities, 'feeConfig/search', { loadingIndicator: true });
    };
    FeeConfigService.decorators = [
        { type: core_1.Injectable },
    ];
    FeeConfigService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return FeeConfigService;
}());
exports.FeeConfigService = FeeConfigService;
//# sourceMappingURL=fee-config.service.js.map