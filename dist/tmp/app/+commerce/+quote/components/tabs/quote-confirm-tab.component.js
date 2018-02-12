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
var commerce_confirm_tab_1 = require("../../../components/tabs/commerce-confirm-tab");
var quote_service_1 = require("../../../../shared/services/quote.service");
var router_1 = require("@angular/router");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var commerce_interface_1 = require("../../../../shared/interfaces/commerce.interface");
var license_agreement_component_1 = require("../../../components/license-agreement/license-agreement.component");
var common_functions_1 = require("../../../../shared/utilities/common.functions");
var app_store_1 = require("../../../../app.store");
var QuoteConfirmTabComponent = (function (_super) {
    __extends(QuoteConfirmTabComponent, _super);
    function QuoteConfirmTabComponent(router, quoteService, dialogService, userCan, store) {
        var _this = _super.call(this, router, quoteService, dialogService, userCan, store) || this;
        _this.router = router;
        _this.quoteService = quoteService;
        _this.dialogService = dialogService;
        _this.userCan = userCan;
        _this.store = store;
        return _this;
    }
    QuoteConfirmTabComponent.prototype.showLicenseAgreements = function () {
        var _this = this;
        this.commerceService.retrieveLicenseAgreements().take(1).subscribe(function (agreements) {
            _this.dialogService.openComponentInDialog({
                componentType: license_agreement_component_1.LicenseAgreementComponent,
                dialogConfig: { panelClass: 'license-pane', position: { top: '10%' } },
                inputOptions: {
                    assetType: 'quoteShow',
                    parentId: _this.quoteService.state.data.id,
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
    Object.defineProperty(QuoteConfirmTabComponent.prototype, "quoteIsTrial", {
        get: function () {
            return this.store.select(function (state) { return state.quoteShow.data.purchaseType === 'Trial'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteConfirmTabComponent.prototype, "showPricing", {
        get: function () {
            return this.store.select(function (state) { return !commerce_interface_1.quotesWithoutPricing.includes(state.quoteShow.data.purchaseType); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteConfirmTabComponent.prototype, "canPurchase", {
        get: function () {
            return this.store.snapshot(function (state) { return commerce_interface_1.quotesAllowedToHaveFeesOnly.includes(state.quoteShow.data.purchaseType); }) ||
                (this.licensesAreAgreedTo && this.shouldShowLicenseDetailsBtn());
        },
        enumerable: true,
        configurable: true
    });
    QuoteConfirmTabComponent.prototype.shouldShowLicenseDetailsBtn = function () {
        return this.userCan.viewLicenseAgreementsButton(this.commerceService.hasAssetLineItems) &&
            this.store.snapshot(function (state) { return !commerce_interface_1.quotesAllowedToHaveFeesOnly.includes(state.quoteShow.data.purchaseType); });
    };
    QuoteConfirmTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-confirm-tab',
                    templateUrl: '../../../components/tabs/commerce-confirm-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteConfirmTabComponent.ctorParameters = function () { return [
        { type: router_1.Router, },
        { type: quote_service_1.QuoteService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteConfirmTabComponent;
}(commerce_confirm_tab_1.CommerceConfirmTab));
exports.QuoteConfirmTabComponent = QuoteConfirmTabComponent;
//# sourceMappingURL=quote-confirm-tab.component.js.map