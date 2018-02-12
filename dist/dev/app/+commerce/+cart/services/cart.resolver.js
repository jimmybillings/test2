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
var CartResolver = (function () {
    function CartResolver(store) {
        this.store = store;
    }
    CartResolver.prototype.resolve = function () {
        this.store.dispatch(function (factory) { return factory.cart.load(); });
        return this.store.blockUntil(function (state) { return !state.cart.loading; });
    };
    CartResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore])
    ], CartResolver);
    return CartResolver;
}());
exports.CartResolver = CartResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvc2VydmljZXMvY2FydC5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUkzQyxnREFBOEM7QUFHOUM7SUFDRSxzQkFBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRXhDLDhCQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQW5CLENBQW1CLENBQUMsQ0FBQztRQUVwRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFuQixDQUFtQixDQUFDLENBQUM7SUFDN0QsQ0FBQztJQVBVLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FFZ0Isb0JBQVE7T0FEeEIsWUFBWSxDQVF4QjtJQUFELG1CQUFDO0NBUkQsQUFRQyxJQUFBO0FBUlksb0NBQVkiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9zZXJ2aWNlcy9jYXJ0LnJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzb2x2ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ2FydFJlc29sdmVyIGltcGxlbWVudHMgUmVzb2x2ZTxib29sZWFuPiB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICByZXNvbHZlKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNhcnQubG9hZCgpKTtcblxuICAgIHJldHVybiB0aGlzLnN0b3JlLmJsb2NrVW50aWwoc3RhdGUgPT4gIXN0YXRlLmNhcnQubG9hZGluZyk7XG4gIH1cbn1cbiJdfQ==
