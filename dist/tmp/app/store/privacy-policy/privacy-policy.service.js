"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var PrivacyPolicyService = (function () {
    function PrivacyPolicyService(apiService) {
        this.apiService = apiService;
    }
    PrivacyPolicyService.prototype.load = function (documentId) {
        return this.apiService.get(api_interface_1.Api.Identities, "document/downloadDocumentFile/" + documentId, { loadingIndicator: true, headerType: 'download' }).map(function (response) { return response.text(); });
    };
    PrivacyPolicyService.decorators = [
        { type: core_1.Injectable },
    ];
    PrivacyPolicyService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return PrivacyPolicyService;
}());
exports.PrivacyPolicyService = PrivacyPolicyService;
//# sourceMappingURL=privacy-policy.service.js.map