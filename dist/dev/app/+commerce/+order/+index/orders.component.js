"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
    OrdersComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'orders-component',
            templateUrl: 'orders.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [orders_service_1.OrdersService,
            router_1.ActivatedRoute,
            router_1.Router])
    ], OrdersComponent);
    return OrdersComponent;
}());
exports.OrdersComponent = OrdersComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyLytpbmRleC9vcmRlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJFO0FBQzNFLDBDQUF5RDtBQUN6RCwwRUFBd0U7QUFZeEU7SUFHRSx5QkFDUyxhQUE0QixFQUMzQixLQUFxQixFQUNyQixNQUFjO1FBRmYsa0JBQWEsR0FBYixhQUFhLENBQWU7UUFDM0IsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUxqQixrQkFBYSxHQUFXLElBQUksQ0FBQztJQUtSLENBQUM7SUFFN0Isa0NBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUEsTUFBTTtZQUNoQyxLQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQVcsbUNBQU07YUFBakI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQzs7O09BQUE7SUFFTSxvQ0FBVSxHQUFqQixVQUFrQixDQUFTO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsR0FBQSxFQUFFLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRU0sa0NBQVEsR0FBZixVQUFnQixLQUFvQjtRQUNsQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRU8sMENBQWdCLEdBQXhCLFVBQXlCLE1BQWlCO1FBQ3hDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQTdCVSxlQUFlO1FBUDNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixXQUFXLEVBQUUsYUFBYTtZQUMxQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQU13Qiw4QkFBYTtZQUNwQix1QkFBYztZQUNiLGVBQU07T0FOYixlQUFlLENBOEIzQjtJQUFELHNCQUFDO0NBOUJELEFBOEJDLElBQUE7QUE5QlksMENBQWUiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rb3JkZXIvK2luZGV4L29yZGVycy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT3JkZXJzU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9vcmRlcnMuc2VydmljZSc7XG5pbXBvcnQgeyBVcmxQYXJhbXMgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IE9yZGVycyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnb3JkZXJzLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnb3JkZXJzLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIE9yZGVyc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBvcmRlcnNQZXJQYWdlOiBzdHJpbmcgPSAnMjAnO1xuICBwcml2YXRlIHBhcmFtczogVXJsUGFyYW1zO1xuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgb3JkZXJzU2VydmljZTogT3JkZXJzU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnJvdXRlLnBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcbiAgICAgIHRoaXMub3JkZXJzUGVyUGFnZSA9IHBhcmFtc1snbiddIHx8ICcyMCc7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IG9yZGVycygpOiBPYnNlcnZhYmxlPE9yZGVycz4ge1xuICAgIHJldHVybiB0aGlzLm9yZGVyc1NlcnZpY2UuZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBjaGFuZ2VQYWdlKGk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuYnVpbGRSb3V0ZVBhcmFtcyh7IGkgfSk7XG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvb3JkZXJzJywgdGhpcy5wYXJhbXNdKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNlYXJjaChxdWVyeTogeyBxOiBzdHJpbmcgfSkge1xuICAgIHRoaXMub3JkZXJzU2VydmljZS5nZXRPcmRlcnMocXVlcnkpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFJvdXRlUGFyYW1zKHBhcmFtczogVXJsUGFyYW1zKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhcmFtcywgeyBuOiB0aGlzLm9yZGVyc1BlclBhZ2UgfSwgcGFyYW1zKTtcbiAgfVxufVxuIl19
