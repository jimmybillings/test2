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
var OrderService = (function () {
    function OrderService(apiService) {
        this.apiService = apiService;
    }
    OrderService.prototype.load = function (orderId) {
        return this.apiService.get(api_interface_1.Api.Orders, "order/" + orderId, { loadingIndicator: true }).map(this.normalize);
    };
    OrderService.prototype.normalize = function (order) {
        return __assign({}, order, { projects: order.projects.map(function (project) { return project.lineItems ? project : __assign({}, project, { lineItems: [] }); }) });
    };
    OrderService.decorators = [
        { type: core_1.Injectable },
    ];
    OrderService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map