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
var quote_service_1 = require("../../../../shared/services/quote.service");
var commerce_capabilities_1 = require("../../../services/commerce.capabilities");
var user_service_1 = require("../../../../shared/services/user.service");
var current_user_service_1 = require("../../../../shared/services/current-user.service");
var wz_dialog_service_1 = require("../../../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../../../app.store");
var QuoteBillingTabComponent = (function (_super) {
    __extends(QuoteBillingTabComponent, _super);
    function QuoteBillingTabComponent(userCan, quoteService, user, currentUser, dialog, store) {
        var _this = _super.call(this, userCan, quoteService, user, currentUser, dialog, store) || this;
        _this.userCan = userCan;
        _this.quoteService = quoteService;
        _this.user = user;
        _this.currentUser = currentUser;
        _this.dialog = dialog;
        _this.store = store;
        return _this;
    }
    QuoteBillingTabComponent.prototype.ngOnInit = function () {
        var quote = this.store.snapshot(function (state) { return state.quoteShow.data; });
        this.quoteBillingAccountInfo = this.store.select(function (state) { return state.quoteShow.data.billingAccountData; });
        this.quoteInvoiceContactInfo = this.store.select(function (state) { return state.quoteShow.data.invoiceContact; });
        this.orderInProgress = this.store.select(function (state) { return state.checkout; });
        if (!quote.billingAccountId || !quote.invoiceContact) {
            this.fetchAddresses().subscribe();
        }
    };
    QuoteBillingTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-billing-tab',
                    templateUrl: '../../../components/tabs/commerce-billing-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuoteBillingTabComponent.ctorParameters = function () { return [
        { type: commerce_capabilities_1.CommerceCapabilities, },
        { type: quote_service_1.QuoteService, },
        { type: user_service_1.UserService, },
        { type: current_user_service_1.CurrentUserService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: app_store_1.AppStore, },
    ]; };
    return QuoteBillingTabComponent;
}(commerce_billing_tab_1.CommerceBillingTab));
exports.QuoteBillingTabComponent = QuoteBillingTabComponent;
//# sourceMappingURL=quote-billing-tab.component.js.map