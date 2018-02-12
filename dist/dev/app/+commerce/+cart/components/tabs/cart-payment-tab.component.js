"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var commerce_payment_tab_1 = require("../../../components/tabs/commerce-payment-tab");
var cart_service_1 = require("../../../../shared/services/cart.service");
var app_store_1 = require("../../../../app.store");
var CartPaymentTabComponent = (function (_super) {
    __extends(CartPaymentTabComponent, _super);
    function CartPaymentTabComponent(_zone, cartService, store, ref) {
        var _this = _super.call(this, _zone, cartService, store, ref) || this;
        _this._zone = _zone;
        _this.cartService = cartService;
        _this.store = store;
        _this.ref = ref;
        return _this;
    }
    CartPaymentTabComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cart-payment-tab-component',
            templateUrl: 'cart-payment-tab.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.NgZone,
            cart_service_1.CartService,
            app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], CartPaymentTabComponent);
    return CartPaymentTabComponent;
}(commerce_payment_tab_1.CommercePaymentTab));
exports.CartPaymentTabComponent = CartPaymentTabComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK2NhcnQvY29tcG9uZW50cy90YWJzL2NhcnQtcGF5bWVudC10YWIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFzRztBQUN0RyxzRkFBbUY7QUFDbkYseUVBQXVFO0FBQ3ZFLG1EQUFpRDtBQVNqRDtJQUE2QywyQ0FBa0I7SUFDN0QsaUNBQ1ksS0FBYSxFQUNiLFdBQXdCLEVBQ3hCLEtBQWUsRUFDZixHQUFzQjtRQUpsQyxZQU1FLGtCQUFNLEtBQUssRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxTQUN0QztRQU5XLFdBQUssR0FBTCxLQUFLLENBQVE7UUFDYixpQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFLLEdBQUwsS0FBSyxDQUFVO1FBQ2YsU0FBRyxHQUFILEdBQUcsQ0FBbUI7O0lBR2xDLENBQUM7SUFSVSx1QkFBdUI7UUFQbkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FJbUIsYUFBTTtZQUNBLDBCQUFXO1lBQ2pCLG9CQUFRO1lBQ1Ysd0JBQWlCO09BTHZCLHVCQUF1QixDQVNuQztJQUFELDhCQUFDO0NBVEQsQUFTQyxDQVQ0Qyx5Q0FBa0IsR0FTOUQ7QUFUWSwwREFBdUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS8rY2FydC9jb21wb25lbnRzL3RhYnMvY2FydC1wYXltZW50LXRhYi5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgTmdab25lLCBDaGFuZ2VEZXRlY3RvclJlZiwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1lcmNlUGF5bWVudFRhYiB9IGZyb20gJy4uLy4uLy4uL2NvbXBvbmVudHMvdGFicy9jb21tZXJjZS1wYXltZW50LXRhYic7XG5pbXBvcnQgeyBDYXJ0U2VydmljZSB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jYXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi8uLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdjYXJ0LXBheW1lbnQtdGFiLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnY2FydC1wYXltZW50LXRhYi5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBDYXJ0UGF5bWVudFRhYkNvbXBvbmVudCBleHRlbmRzIENvbW1lcmNlUGF5bWVudFRhYiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBfem9uZTogTmdab25lLFxuICAgIHByb3RlY3RlZCBjYXJ0U2VydmljZTogQ2FydFNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcm90ZWN0ZWQgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICBzdXBlcihfem9uZSwgY2FydFNlcnZpY2UsIHN0b3JlLCByZWYpO1xuICB9XG59XG4iXX0=
