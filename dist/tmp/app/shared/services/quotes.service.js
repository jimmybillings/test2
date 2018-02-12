"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../../shared/services/api.service");
var cart_service_1 = require("../../shared/services/cart.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var quotes_store_1 = require("../../shared/stores/quotes.store");
var QuotesService = (function () {
    function QuotesService(api, cart, quotesStore) {
        var _this = this;
        this.api = api;
        this.cart = cart;
        this.quotesStore = quotesStore;
        this.updateQuotesInStore = function (quotes) {
            _this.quotesStore.updateQuotes({ items: quotes.items });
        };
        this.setQuotesInStore = function (quotes) {
            _this.quotesStore.setQuotes(quotes);
        };
    }
    Object.defineProperty(QuotesService.prototype, "data", {
        get: function () {
            return this.quotesStore.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuotesService.prototype, "state", {
        get: function () {
            return this.quotesStore.state;
        },
        enumerable: true,
        configurable: true
    });
    QuotesService.prototype.getQuotes = function (userCanAdministerQuotes, params) {
        if (userCanAdministerQuotes === void 0) { userCanAdministerQuotes = false; }
        if (params === void 0) { params = {}; }
        if (userCanAdministerQuotes) {
            return this.getQuotesForSalesUser(params);
        }
        else {
            return this.getQuotesForCustomer(params);
        }
    };
    QuotesService.prototype.getFocused = function () {
        return this.api.get(api_interface_1.Api.Orders, 'quote/focused');
    };
    QuotesService.prototype.setFocused = function (quoteId) {
        var _this = this;
        return this.api.put(api_interface_1.Api.Orders, "quote/focused/" + quoteId, { loadingIndicator: true }).do(function (quote) {
            _this.updateNewFocusedQuote(quote.id);
        });
    };
    QuotesService.prototype.rejectQuote = function (quoteId) {
        return this.api.put(api_interface_1.Api.Orders, "quote/reject/" + quoteId);
    };
    QuotesService.prototype.createEmpty = function () {
        return this.api.post(api_interface_1.Api.Orders, 'quote', { loadingIndicator: true });
    };
    QuotesService.prototype.getQuotesForCustomer = function (params) {
        return this.quotesList(params);
    };
    QuotesService.prototype.getQuotesForSalesUser = function (params) {
        var _this = this;
        return this.getFocused().switchMap(function (quote) { return _this.quotesList(params, quote.id); });
    };
    QuotesService.prototype.quotesList = function (params, focusedQuoteId) {
        var _this = this;
        if (params === void 0) { params = {}; }
        return this.api.get(api_interface_1.Api.Orders, 'quote/myQuotes', { parameters: this.buildSearchParams(params), loadingIndicator: true }).map(function (res) {
            res.items = res.items ? res.items : [];
            if (focusedQuoteId)
                _this.findNewFocused(res.items, focusedQuoteId);
            return res;
        }).do(this.setQuotesInStore);
    };
    QuotesService.prototype.findNewFocused = function (quotes, activeQuoteId) {
        return quotes.map(function (quote) {
            quote.focused = quote.id === activeQuoteId;
            return quote;
        });
    };
    QuotesService.prototype.updateNewFocusedQuote = function (quoteId) {
        this.data.do(function (data) {
            data.items.map(function (quote) {
                quote.focused = false;
                if (quote.id === quoteId)
                    quote.focused = true;
                return quote;
            });
        }).do(this.updateQuotesInStore).take(1).subscribe();
    };
    QuotesService.prototype.buildSearchParams = function (params) {
        params['i'] = (params['i'] && params['i'] > 0) ? params['i'] - 1 : 0;
        return Object.assign({}, { q: '', i: 0, n: 20, s: '', d: '' }, params);
    };
    QuotesService.decorators = [
        { type: core_1.Injectable },
    ];
    QuotesService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
        { type: cart_service_1.CartService, },
        { type: quotes_store_1.QuotesStore, },
    ]; };
    return QuotesService;
}());
exports.QuotesService = QuotesService;
//# sourceMappingURL=quotes.service.js.map