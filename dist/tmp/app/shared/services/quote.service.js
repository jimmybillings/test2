"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("./api.service");
var cart_service_1 = require("./cart.service");
var user_service_1 = require("./user.service");
var api_interface_1 = require("../interfaces/api.interface");
var app_store_1 = require("../../app.store");
var enhanced_asset_1 = require("../interfaces/enhanced-asset");
var QuoteService = (function () {
    function QuoteService(api, cartService, store, userService) {
        this.api = api;
        this.cartService = cartService;
        this.store = store;
        this.userService = userService;
    }
    Object.defineProperty(QuoteService.prototype, "data", {
        get: function () {
            return this.store.select(function (state) { return state.quoteShow; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "state", {
        get: function () {
            return this.store.snapshot(function (state) { return state.quoteShow; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "quote", {
        get: function () {
            return this.store.select(function (state) { return state.quoteShow.data; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "projects", {
        get: function () {
            return this.quote.map(function (data) {
                return data.projects.map(function (project) {
                    if (project.lineItems) {
                        project.lineItems = project.lineItems.map(function (lineItem) {
                            lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'quoteShow', data.id);
                            return lineItem;
                        });
                    }
                    return project;
                });
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "checkoutData", {
        get: function () {
            return this.store.select(function (state) { return state.checkout; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "checkoutState", {
        get: function () {
            return this.store.snapshot(function (state) { return state.checkout; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "total", {
        get: function () {
            return this.data.map(function (state) { return state.data.total; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "paymentType", {
        get: function () {
            return this.checkoutData.map(function (state) { return state.selectedPaymentType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "paymentOptions", {
        get: function () {
            return this.checkoutData.map(function (data) { return data.paymentOptions; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "hasAssets", {
        get: function () {
            return this.data.map(function (state) { return (state.data.itemCount || 0) > 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "hasAssetLineItems", {
        get: function () {
            return this.data.map(function (state) {
                return state.data.projects.reduce(function (previous, current) {
                    return current.lineItems ? previous += current.lineItems.length : 0;
                }, 0) > 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    QuoteService.prototype.purchase = function () {
        switch (this.checkoutState.selectedPaymentType) {
            case 'CreditCard':
                return this.purchaseWithCreditCard();
            case 'PurchaseOnCredit':
                return this.purchaseOnCredit();
            default:
                return this.purchaseQuoteType();
        }
    };
    QuoteService.prototype.getPaymentOptions = function () {
        var _this = this;
        this.api.get(api_interface_1.Api.Orders, "quote/paymentOptions/" + this.state.data.id)
            .subscribe(function (options) {
            _this.store.dispatch(function (factory) { return factory.checkout.setAvailablePaymentOptions(options); });
            _this.store.dispatch(function (factory) { return factory.checkout.setSelectedPaymentType(_this.defaultPaymentTypeFor(options)); });
        });
    };
    QuoteService.prototype.paymentOptionsEqual = function (options) {
        return this.paymentOptions.map(function (pmtOpts) {
            if (!pmtOpts)
                return false;
            pmtOpts.paymentOptions.sort();
            return options.length === pmtOpts.paymentOptions.length &&
                options.sort().every(function (option, index) { return option === pmtOpts.paymentOptions[index]; });
        });
    };
    QuoteService.prototype.retrieveLicenseAgreements = function () {
        return this.api.get(api_interface_1.Api.Orders, "quote/licensing/" + this.state.data.id, { loadingIndicator: true });
    };
    QuoteService.prototype.expireQuote = function () {
        var newQuote = Object.assign({}, this.state.data, { expirationDate: new Date().toISOString() });
        return this.update(this.state.data.id, newQuote);
    };
    QuoteService.prototype.rejectQuote = function () {
        return this.api.put(api_interface_1.Api.Orders, "quote/reject/" + this.state.data.id, { loadingIndicator: true });
    };
    QuoteService.prototype.extendExpirationDate = function (newDate) {
        var _this = this;
        var newQuote = Object.assign({}, this.state.data, { expirationDate: new Date(newDate).toISOString(), quoteStatus: 'ACTIVE' });
        return this.update(this.state.data.id, newQuote)
            .do(function (quote) { return _this.store.dispatch(function (factory) { return factory.quoteShow.loadSuccess(quote); }); });
    };
    QuoteService.prototype.defaultPaymentTypeFor = function (options) {
        if (options.paymentOptions.length === 1) {
            return options.paymentOptions[0];
        }
        return 'CreditCard';
    };
    QuoteService.prototype.update = function (id, quote) {
        return this.api.put(api_interface_1.Api.Orders, "quote/" + id, { body: quote, loadingIndicator: 'onBeforeRequest' });
    };
    QuoteService.prototype.purchaseWithCreditCard = function () {
        var options = this.purchaseOptions;
        return this.api.post(api_interface_1.Api.Orders, "quote/" + this.state.data.id + "/stripe/process", { body: { options: options }, loadingIndicator: true }).map(function (_) { return _; });
    };
    QuoteService.prototype.purchaseOnCredit = function () {
        var options = this.addressPurchaseOptions;
        return this.api.post(api_interface_1.Api.Orders, "quote/" + this.state.data.id + "/checkout/convertToOrder", { body: { options: options }, loadingIndicator: true }).map(function (order) { return order.id; });
    };
    QuoteService.prototype.purchaseQuoteType = function () {
        var options = Object.assign({}, { orderType: this.state.data.purchaseType }, this.addressPurchaseOptions);
        return this.api.post(api_interface_1.Api.Orders, "quote/" + this.state.data.id + "/checkout/convertToOrder", { body: { options: options }, loadingIndicator: true }).map(function (order) { return order.id; });
    };
    Object.defineProperty(QuoteService.prototype, "purchaseOptions", {
        get: function () {
            return Object.assign({}, this.addressPurchaseOptions, this.creditCardPurchaseOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "addressPurchaseOptions", {
        get: function () {
            return {
                orderAddressId: this.checkoutState.selectedAddress.addressEntityId,
                orderAddressType: this.checkoutState.selectedAddress.type,
                poNumber: this.checkoutState.purchaseOrderId
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuoteService.prototype, "creditCardPurchaseOptions", {
        get: function () {
            return {
                stripeToken: this.checkoutState.authorization.id,
                stripeTokenType: this.checkoutState.authorization.type
            };
        },
        enumerable: true,
        configurable: true
    });
    QuoteService.decorators = [
        { type: core_1.Injectable },
    ];
    QuoteService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
        { type: cart_service_1.CartService, },
        { type: app_store_1.AppStore, },
        { type: user_service_1.UserService, },
    ]; };
    return QuoteService;
}());
exports.QuoteService = QuoteService;
//# sourceMappingURL=quote.service.js.map