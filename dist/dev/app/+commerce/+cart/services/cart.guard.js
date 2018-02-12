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
var commerce_capabilities_1 = require("../../services/commerce.capabilities");
var app_store_1 = require("../../../app.store");
var CartGuard = (function () {
    function CartGuard(userCan, store) {
        this.userCan = userCan;
        this.store = store;
    }
    CartGuard.prototype.canActivate = function (route, state) {
        if (this.userCan.addToCart()) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            return false;
        }
    };
    CartGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [commerce_capabilities_1.CommerceCapabilities,
            app_store_1.AppStore])
    ], CartGuard);
    return CartGuard;
}());
exports.CartGuard = CartGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvc2VydmljZXMvY2FydC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUUzQyw4RUFBNEU7QUFDNUUsZ0RBQThDO0FBRzlDO0lBQ0UsbUJBQ1UsT0FBNkIsRUFDN0IsS0FBZTtRQURmLFlBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzdCLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRTlCLCtCQUFXLEdBQVgsVUFBWSxLQUE2QixFQUFFLEtBQTBCO1FBQ25FLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQVpVLFNBQVM7UUFEckIsaUJBQVUsRUFBRTt5Q0FHUSw0Q0FBb0I7WUFDdEIsb0JBQVE7T0FIZCxTQUFTLENBYXJCO0lBQUQsZ0JBQUM7Q0FiRCxBQWFDLElBQUE7QUFiWSw4QkFBUyIsImZpbGUiOiJhcHAvK2NvbW1lcmNlLytjYXJ0L3NlcnZpY2VzL2NhcnQuZ3VhcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYW5BY3RpdmF0ZSwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDb21tZXJjZUNhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbW1lcmNlLmNhcGFiaWxpdGllcyc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXJ0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdXNlckNhbjogQ29tbWVyY2VDYXBhYmlsaXRpZXMsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIGlmICh0aGlzLnVzZXJDYW4uYWRkVG9DYXJ0KCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGU0MDNGb3JiaWRkZW4oKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=
