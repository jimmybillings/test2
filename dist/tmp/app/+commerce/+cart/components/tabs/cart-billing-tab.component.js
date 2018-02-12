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
var commerce_billing_tab_1 = require("../../../components/tabs/commerce-billing-tab");
var cart_service_1 = require("../../../../shared/services/cart.service");
var user_service_1 = require("../../../../shared/services/user.service");
var current_user_service_1 = require("../../../../shared/services/current-user.service");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../../../app.store");
var CartBillingTabComponent = (function (_super) {
    __extends(CartBillingTabComponent, _super);
    function CartBillingTabComponent(userCan, cartService, user, currentUser, dialog, store) {
        var _this = _super.call(this, userCan, cartService, user, currentUser, dialog, store) || this;
        _this.userCan = userCan;
        _this.cartService = cartService;
        _this.user = user;
        _this.currentUser = currentUser;
        _this.dialog = dialog;
        _this.store = store;
        return _this;
    }
    CartBillingTabComponent.prototype.ngOnInit = function () {
        this.quoteBillingAccountInfo = null;
        this.quoteInvoiceContactInfo = null;
        this.fetchAddresses().subscribe();
        this.orderInProgress = this.store.select(function (state) { return state.checkout; });
    };
    CartBillingTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'cart-billing-tab-component',
                    templateUrl: '../../../components/tabs/commerce-billing-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CartBillingTabComponent.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: cart_service_1.CartService, },
        { type: user_service_1.UserService, },
        { type: current_user_service_1.CurrentUserService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: app_store_1.AppStore, },
    ]; };
    return CartBillingTabComponent;
}(commerce_billing_tab_1.CommerceBillingTab));
exports.CartBillingTabComponent = CartBillingTabComponent;
//# sourceMappingURL=cart-billing-tab.component.js.map