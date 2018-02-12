"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("./api.service");
var api_interface_1 = require("../interfaces/api.interface");
var orders_store_1 = require("../stores/orders.store");
var OrdersService = (function () {
    function OrdersService(api, store) {
        this.api = api;
        this.store = store;
    }
    Object.defineProperty(OrdersService.prototype, "data", {
        get: function () {
            return this.store.data;
        },
        enumerable: true,
        configurable: true
    });
    OrdersService.prototype.getOrders = function (params) {
        var _this = this;
        return this.api.get(api_interface_1.Api.Orders, 'order/myOrders', { parameters: this.buildSearchParams(params), loadingIndicator: true }).do(function (response) { return _this.store.storeOrders(response); });
    };
    OrdersService.prototype.buildSearchParams = function (params) {
        params.i = (params.i && params.i > 0) ? params.i - 1 : 0;
        return Object.assign({}, { q: '', s: '', d: '', i: 0, n: 20 }, params);
    };
    OrdersService.decorators = [
        { type: core_1.Injectable },
    ];
    OrdersService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
        { type: orders_store_1.OrdersStore, },
    ]; };
    return OrdersService;
}());
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map