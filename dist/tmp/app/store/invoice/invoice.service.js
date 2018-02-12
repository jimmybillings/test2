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
var InvoiceService = (function () {
    function InvoiceService(apiService) {
        this.apiService = apiService;
    }
    InvoiceService.prototype.load = function (orderId, shareKey) {
        var apiOptions = { loadingIndicator: true };
        if (shareKey)
            apiOptions = __assign({}, apiOptions, { overridingToken: shareKey });
        return this.apiService.get(api_interface_1.Api.Orders, "order/invoiceData/" + orderId, apiOptions);
    };
    InvoiceService.decorators = [
        { type: core_1.Injectable },
    ];
    InvoiceService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return InvoiceService;
}());
exports.InvoiceService = InvoiceService;
//# sourceMappingURL=invoice.service.js.map