"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var orders_service_1 = require("../../../shared/services/orders.service");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var OrdersResolver = (function () {
    function OrdersResolver(ordersService) {
        this.ordersService = ordersService;
    }
    OrdersResolver.prototype.resolve = function (route, state) {
        return this.ordersService.getOrders(common_functions_1.Common.clone(route.params));
    };
    OrdersResolver.decorators = [
        { type: core_1.Injectable },
    ];
    OrdersResolver.ctorParameters = function () { return [
        { type: orders_service_1.OrdersService, },
    ]; };
    return OrdersResolver;
}());
exports.OrdersResolver = OrdersResolver;
//# sourceMappingURL=orders.resolver.js.map