"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var orders_service_1 = require("../../../shared/services/orders.service");
var OrdersComponent = (function () {
    function OrdersComponent(ordersService, route, router) {
        this.ordersService = ordersService;
        this.route = route;
        this.router = router;
        this.ordersPerPage = '20';
    }
    OrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.ordersPerPage = params['n'] || '20';
        });
    };
    Object.defineProperty(OrdersComponent.prototype, "orders", {
        get: function () {
            return this.ordersService.data;
        },
        enumerable: true,
        configurable: true
    });
    OrdersComponent.prototype.changePage = function (i) {
        this.buildRouteParams({ i: i });
        this.router.navigate(['/orders', this.params]);
    };
    OrdersComponent.prototype.onSearch = function (query) {
        this.ordersService.getOrders(query).subscribe();
    };
    OrdersComponent.prototype.buildRouteParams = function (params) {
        this.params = Object.assign({}, this.params, { n: this.ordersPerPage }, params);
    };
    OrdersComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'orders-component',
                    templateUrl: 'orders.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    OrdersComponent.ctorParameters = function () { return [
        { type: orders_service_1.OrdersService, },
        { type: router_1.ActivatedRoute, },
        { type: router_1.Router, },
    ]; };
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;
//# sourceMappingURL=orders.component.js.map