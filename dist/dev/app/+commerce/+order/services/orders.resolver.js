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
var orders_service_1 = require("../../../shared/services/orders.service");
var common_functions_1 = require("../../../shared/utilities/common.functions");
var OrdersResolver = (function () {
    function OrdersResolver(ordersService) {
        this.ordersService = ordersService;
    }
    OrdersResolver.prototype.resolve = function (route, state) {
        return this.ordersService.getOrders(common_functions_1.Common.clone(route.params));
    };
    OrdersResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [orders_service_1.OrdersService])
    ], OrdersResolver);
    return OrdersResolver;
}());
exports.OrdersResolver = OrdersResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVycy5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQywwRUFBd0U7QUFFeEUsK0VBQW9FO0FBR3BFO0lBQ0Usd0JBQ1UsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDO0lBRTNDLGdDQUFPLEdBQVAsVUFBUSxLQUE2QixFQUFFLEtBQTBCO1FBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyx5QkFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBTlUsY0FBYztRQUQxQixpQkFBVSxFQUFFO3lDQUdjLDhCQUFhO09BRjNCLGNBQWMsQ0FPMUI7SUFBRCxxQkFBQztDQVBELEFBT0MsSUFBQTtBQVBZLHdDQUFjIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK29yZGVyL3NlcnZpY2VzL29yZGVycy5yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc29sdmUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBPcmRlcnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL29yZGVycy5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyc0FwaVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBPcmRlcnNSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8T3JkZXJzQXBpUmVzcG9uc2U+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBvcmRlcnNTZXJ2aWNlOiBPcmRlcnNTZXJ2aWNlKSB7IH1cblxuICByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8T3JkZXJzQXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5vcmRlcnNTZXJ2aWNlLmdldE9yZGVycyhDb21tb24uY2xvbmUocm91dGUucGFyYW1zKSk7XG4gIH1cbn1cbiJdfQ==
