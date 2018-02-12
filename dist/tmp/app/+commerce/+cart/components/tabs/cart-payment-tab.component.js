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
    CartPaymentTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'cart-payment-tab-component',
                    templateUrl: 'cart-payment-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CartPaymentTabComponent.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: cart_service_1.CartService, },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return CartPaymentTabComponent;
}(commerce_payment_tab_1.CommercePaymentTab));
exports.CartPaymentTabComponent = CartPaymentTabComponent;
//# sourceMappingURL=cart-payment-tab.component.js.map