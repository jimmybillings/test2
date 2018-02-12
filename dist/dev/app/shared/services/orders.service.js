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
    OrdersService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService,
            orders_store_1.OrdersStore])
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvb3JkZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0MsNkNBQTJDO0FBQzNDLDZEQUFpRTtBQUVqRSx1REFBcUQ7QUFHckQ7SUFFRSx1QkFDVSxHQUFlLEVBQ2YsS0FBa0I7UUFEbEIsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQWE7SUFBSSxDQUFDO0lBRWpDLHNCQUFXLCtCQUFJO2FBQWY7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFTSxpQ0FBUyxHQUFoQixVQUFpQixNQUFXO1FBQTVCLGlCQUlDO1FBSEMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLG1CQUFHLENBQUMsTUFBTSxFQUFFLGdCQUFnQixFQUM5QyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLENBQ3ZFLENBQUMsRUFBRSxDQUFDLFVBQUMsUUFBMkIsSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUVPLHlDQUFpQixHQUF6QixVQUEwQixNQUFXO1FBQ25DLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekUsQ0FBQztJQW5CVSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7eUNBSUksd0JBQVU7WUFDUiwwQkFBVztPQUpqQixhQUFhLENBb0J6QjtJQUFELG9CQUFDO0NBcEJELEFBb0JDLElBQUE7QUFwQlksc0NBQWEiLCJmaWxlIjoiYXBwL3NoYXJlZC9zZXJ2aWNlcy9vcmRlcnMuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4vYXBpLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpLCBBcGlQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IE9yZGVycywgT3JkZXJzQXBpUmVzcG9uc2UgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPcmRlcnNTdG9yZSB9IGZyb20gJy4uL3N0b3Jlcy9vcmRlcnMuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgT3JkZXJzU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBhcGk6IEFwaVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogT3JkZXJzU3RvcmUpIHsgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPE9yZGVycz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLmRhdGE7XG4gIH1cblxuICBwdWJsaWMgZ2V0T3JkZXJzKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxPcmRlcnNBcGlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLk9yZGVycywgJ29yZGVyL215T3JkZXJzJyxcbiAgICAgIHsgcGFyYW1ldGVyczogdGhpcy5idWlsZFNlYXJjaFBhcmFtcyhwYXJhbXMpLCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICApLmRvKChyZXNwb25zZTogT3JkZXJzQXBpUmVzcG9uc2UpID0+IHRoaXMuc3RvcmUuc3RvcmVPcmRlcnMocmVzcG9uc2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRTZWFyY2hQYXJhbXMocGFyYW1zOiBhbnkpOiBhbnkge1xuICAgIHBhcmFtcy5pID0gKHBhcmFtcy5pICYmIHBhcmFtcy5pID4gMCkgPyBwYXJhbXMuaSAtIDEgOiAwO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7IHE6ICcnLCBzOiAnJywgZDogJycsIGk6IDAsIG46IDIwIH0sIHBhcmFtcyk7XG4gIH1cbn1cbiJdfQ==
