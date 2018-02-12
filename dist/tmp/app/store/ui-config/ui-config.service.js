"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var UiConfigService = (function () {
    function UiConfigService(apiService) {
        this.apiService = apiService;
    }
    UiConfigService.prototype.load = function () {
        return this.apiService.get(api_interface_1.Api.Identities, 'configuration/site').map(function (config) {
            return __assign({}, config, { loaded: true });
        });
    };
    UiConfigService.decorators = [
        { type: core_1.Injectable },
    ];
    UiConfigService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return UiConfigService;
}());
exports.UiConfigService = UiConfigService;
//# sourceMappingURL=ui-config.service.js.map