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
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var commerce_confirm_tab_1 = require("../../../components/tabs/commerce-confirm-tab");
var cart_service_1 = require("../../../../shared/services/cart.service");
var router_1 = require("@angular/router");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var license_agreement_component_1 = require("../../../components/license-agreement/license-agreement.component");
var common_functions_1 = require("../../../../shared/utilities/common.functions");
var app_store_1 = require("../../../../app.store");
var CartConfirmTabComponent = (function (_super) {
    __extends(CartConfirmTabComponent, _super);
    function CartConfirmTabComponent(router, cartService, dialogService, userCan, store) {
        var _this = _super.call(this, router, cartService, dialogService, userCan, store) || this;
        _this.router = router;
        _this.cartService = cartService;
        _this.dialogService = dialogService;
        _this.userCan = userCan;
        _this.store = store;
        return _this;
    }
    CartConfirmTabComponent.prototype.showLicenseAgreements = function () {
        var _this = this;
        this.cartService.retrieveLicenseAgreements().take(1).subscribe(function (agreements) {
            _this.dialogService.openComponentInDialog({
                componentType: license_agreement_component_1.LicenseAgreementComponent,
                dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                inputOptions: {
                    assetType: 'cart',
                    licenses: common_functions_1.Common.clone(agreements)
                },
                outputOptions: [
                    {
                        event: 'close',
                        callback: function () { return true; },
                        closeOnEvent: true
                    }
                ]
            });
        });
    };
    Object.defineProperty(CartConfirmTabComponent.prototype, "showPricing", {
        get: function () {
            return Observable_1.Observable.of(true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartConfirmTabComponent.prototype, "quoteIsTrial", {
        get: function () {
            return Observable_1.Observable.of(false);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartConfirmTabComponent.prototype, "canPurchase", {
        get: function () {
            return this.licensesAreAgreedTo && this.shouldShowLicenseDetailsBtn();
        },
        enumerable: true,
        configurable: true
    });
    CartConfirmTabComponent.prototype.shouldShowLicenseDetailsBtn = function () {
        return this.userCan.viewLicenseAgreementsButton(this.commerceService.hasAssetLineItems);
    };
    CartConfirmTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'cart-confirm-tab-component',
                    templateUrl: '../../../components/tabs/commerce-confirm-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    CartConfirmTabComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: cart_service_1.CartService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: app_store_1.AppStore, },
    ]; };
    return CartConfirmTabComponent;
}(commerce_confirm_tab_1.CommerceConfirmTab));
exports.CartConfirmTabComponent = CartConfirmTabComponent;
//# sourceMappingURL=cart-confirm-tab.component.js.map