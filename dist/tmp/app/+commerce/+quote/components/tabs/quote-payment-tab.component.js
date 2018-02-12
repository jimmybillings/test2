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
var quote_service_1 = require("../../../../shared/services/quote.service");
var app_store_1 = require("../../../../app.store");
var QuotePaymentTabComponent = (function (_super) {
    __extends(QuotePaymentTabComponent, _super);
    function QuotePaymentTabComponent(_zone, quoteService, store, ref) {
        var _this = _super.call(this, _zone, quoteService, store, ref) || this;
        _this._zone = _zone;
        _this.quoteService = quoteService;
        _this.store = store;
        _this.ref = ref;
        return _this;
    }
    Object.defineProperty(QuotePaymentTabComponent.prototype, "showTrialMessage", {
        get: function () {
            return this.quoteService.paymentOptionsEqual(['Trial']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotePaymentTabComponent.prototype, "showDeliveryOnlyMessage", {
        get: function () {
            return this.quoteService.paymentOptionsEqual(['DeliveryOnly']);
        },
        enumerable: true,
        configurable: true
    });
    QuotePaymentTabComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'quote-payment-tab',
                    templateUrl: 'quote-payment-tab.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    QuotePaymentTabComponent.ctorParameters = function () { return [
        { type: core_1.NgZone, },
        { type: quote_service_1.QuoteService, },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return QuotePaymentTabComponent;
}(commerce_payment_tab_1.CommercePaymentTab));
exports.QuotePaymentTabComponent = QuotePaymentTabComponent;
//# sourceMappingURL=quote-payment-tab.component.js.map