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
var app_store_1 = require("../../../app.store");
var OrderResolver = (function () {
    function OrderResolver(store) {
        this.store = store;
    }
    OrderResolver.prototype.resolve = function (route) {
        var requestedOrderId = Number(route.params['id']);
        this.store.dispatch(function (factory) { return factory.order.load(requestedOrderId); });
        return this.store.blockUntil(function (state) { return !state.order.loading; });
    };
    OrderResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], OrderResolver);
    return OrderResolver;
}());
exports.OrderResolver = OrderResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVyLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBSTNDLGdEQUE4QztBQUc5QztJQUNFLHVCQUFvQixLQUFlO1FBQWYsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFJLENBQUM7SUFFakMsK0JBQU8sR0FBZCxVQUFlLEtBQTZCO1FBQzFDLElBQU0sZ0JBQWdCLEdBQVcsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUU1RCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQXBDLENBQW9DLENBQUMsQ0FBQztRQUVyRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFwQixDQUFvQixDQUFDLENBQUM7SUFDOUQsQ0FBQztJQVRVLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FFZ0Isb0JBQVE7T0FEeEIsYUFBYSxDQVV6QjtJQUFELG9CQUFDO0NBVkQsQUFVQyxJQUFBO0FBVlksc0NBQWEiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rb3JkZXIvc2VydmljZXMvb3JkZXIucmVzb2x2ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNvbHZlLCBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90IH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuXG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlclJlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBwdWJsaWMgcmVzb2x2ZShyb3V0ZTogQWN0aXZhdGVkUm91dGVTbmFwc2hvdCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHJlcXVlc3RlZE9yZGVySWQ6IG51bWJlciA9IE51bWJlcihyb3V0ZS5wYXJhbXNbJ2lkJ10pO1xuXG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3Rvcnkub3JkZXIubG9hZChyZXF1ZXN0ZWRPcmRlcklkKSk7XG5cbiAgICByZXR1cm4gdGhpcy5zdG9yZS5ibG9ja1VudGlsKHN0YXRlID0+ICFzdGF0ZS5vcmRlci5sb2FkaW5nKTtcbiAgfVxufVxuIl19
