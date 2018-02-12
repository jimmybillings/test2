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
var tab_1 = require("./tab");
var Subject_1 = require("rxjs/Subject");
var CommercePaymentTab = (function (_super) {
    __extends(CommercePaymentTab, _super);
    function CommercePaymentTab(_zone, commerceService, store, ref) {
        var _this = _super.call(this) || this;
        _this._zone = _zone;
        _this.commerceService = commerceService;
        _this.store = store;
        _this.ref = ref;
        _this.tabNotify = _this.notify;
        _this.serverErrors = null;
        _this.successfullyVerified = new Subject_1.Subject();
        _this.selectedPaymentOption = null;
        _this.successfullyVerified.next(false);
        return _this;
    }
    CommercePaymentTab.prototype.ngOnInit = function () {
        this.fields = this.store.selectCloned(function (state) { return state.uiConfig.components.cart.config.payment.items; }).take(1);
        this.loadStripe();
    };
    Object.defineProperty(CommercePaymentTab.prototype, "data", {
        get: function () {
            return this.commerceService.data.map(function (state) { return state.data; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "paymentOptions", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.paymentOptions; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "showHoldMessage", {
        get: function () {
            return this.commerceService.paymentOptionsEqual(['Hold']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "showCreditCardForm", {
        get: function () {
            return this.commerceService.paymentOptionsEqual(['CreditCard']);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommercePaymentTab.prototype, "showCreditCardAndPurchaseOnCredit", {
        get: function () {
            return this.commerceService.paymentOptionsEqual(['CreditCard', 'PurchaseOnCredit']);
        },
        enumerable: true,
        configurable: true
    });
    CommercePaymentTab.prototype.selectPurchaseOnCredit = function () {
        this.store.dispatch(function (factory) { return factory.checkout.setSelectedPaymentType('PurchaseOnCredit'); });
        this.tabNotify.emit({ type: 'GO_TO_NEXT_TAB' });
    };
    CommercePaymentTab.prototype.preAuthorize = function (form) {
        var _this = this;
        window.Stripe.card.createToken(form, function (status, response) {
            _this._zone.run(function () {
                if (status === 200) {
                    _this.store.dispatch(function (factory) { return factory.checkout.setCreditCardAuthorization(response); });
                    _this.store.dispatch(function (factory) { return factory.checkout.setSelectedPaymentType('CreditCard'); });
                    _this.tabNotify.emit({ type: 'GO_TO_NEXT_TAB' });
                    _this.successfullyVerified.next(true);
                    _this.ref.markForCheck();
                }
                else {
                    _this.serverErrors = { fieldErrors: [] };
                    _this.serverErrors.fieldErrors
                        .push({
                        code: response.error.code,
                        field: response.error.param
                    });
                    _this.successfullyVerified.next(false);
                    _this.ref.markForCheck();
                }
            });
        });
    };
    CommercePaymentTab.prototype.editCreditCard = function () {
        this.successfullyVerified.next(false);
        this.disableTab(3);
    };
    CommercePaymentTab.prototype.loadStripe = function () {
        var _this = this;
        var stripeScript = 'https://js.stripe.com/v2/';
        var scripts = document.getElementsByTagName('script');
        var i = scripts.length, stripeLoaded = false;
        while (i--) {
            if (scripts[i].src === stripeScript) {
                stripeLoaded = true;
            }
        }
        if (!stripeLoaded) {
            var script = document.createElement('script');
            Object.assign(script, { src: stripeScript, type: 'text/javascript' });
            document.body.appendChild(script);
            script.onload = function () {
                window.Stripe.setPublishableKey(_this.commerceService.state.data.stripePublicKey);
            };
        }
    };
    CommercePaymentTab.propDecorators = {
        'tabNotify': [{ type: core_1.Output },],
    };
    return CommercePaymentTab;
}(tab_1.Tab));
exports.CommercePaymentTab = CommercePaymentTab;
//# sourceMappingURL=commerce-payment-tab.js.map