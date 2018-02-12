"use strict";
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
    QuotesService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService,
            cart_service_1.CartService,
            quotes_store_1.QuotesStore])
    ], QuotesService);
    return QuotesService;
}());
exports.QuotesService = QuotesService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvcXVvdGVzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0MsaUVBQStEO0FBQy9ELG1FQUFpRTtBQUNqRSx1RUFBNEQ7QUFHNUQsaUVBQStEO0FBRy9EO0lBQ0UsdUJBQW9CLEdBQWUsRUFDekIsSUFBaUIsRUFDakIsV0FBd0I7UUFGbEMsaUJBR0s7UUFIZSxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ3pCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFnRjFCLHdCQUFtQixHQUFHLFVBQUMsTUFBYztZQUMzQyxLQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztRQUN6RCxDQUFDLENBQUE7UUFFTyxxQkFBZ0IsR0FBRyxVQUFDLE1BQXlCO1lBQ25ELEtBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtJQXJGRyxDQUFDO0lBR0wsc0JBQVcsK0JBQUk7YUFBZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUMvQixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLGdDQUFLO2FBQWhCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBQ2hDLENBQUM7OztPQUFBO0lBRU0saUNBQVMsR0FBaEIsVUFBaUIsdUJBQXdDLEVBQUUsTUFBZ0I7UUFBMUQsd0NBQUEsRUFBQSwrQkFBd0M7UUFBRSx1QkFBQSxFQUFBLFdBQWdCO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFB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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBDYXJ0U2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jYXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFF1b3RlLCBRdW90ZXMsIFF1b3Rlc0FwaVJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IFF1b3Rlc1N0b3JlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0b3Jlcy9xdW90ZXMuc3RvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUXVvdGVzU2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FydDogQ2FydFNlcnZpY2UsXG4gICAgcHJpdmF0ZSBxdW90ZXNTdG9yZTogUXVvdGVzU3RvcmVcbiAgKSB7IH1cblxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPFF1b3Rlcz4ge1xuICAgIHJldHVybiB0aGlzLnF1b3Rlc1N0b3JlLmRhdGE7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFF1b3RlcyB7XG4gICAgcmV0dXJuIHRoaXMucXVvdGVzU3RvcmUuc3RhdGU7XG4gIH1cblxuICBwdWJsaWMgZ2V0UXVvdGVzKHVzZXJDYW5BZG1pbmlzdGVyUXVvdGVzOiBib29sZWFuID0gZmFsc2UsIHBhcmFtczogYW55ID0ge30pOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGlmICh1c2VyQ2FuQWRtaW5pc3RlclF1b3Rlcykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UXVvdGVzRm9yU2FsZXNVc2VyKHBhcmFtcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFF1b3Rlc0ZvckN1c3RvbWVyKHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldEZvY3VzZWQoKTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLk9yZGVycywgJ3F1b3RlL2ZvY3VzZWQnKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRGb2N1c2VkKHF1b3RlSWQ6IG51bWJlcik6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KEFwaS5PcmRlcnMsIGBxdW90ZS9mb2N1c2VkLyR7cXVvdGVJZH1gLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSkuZG8oKHF1b3RlOiBRdW90ZSkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVOZXdGb2N1c2VkUXVvdGUocXVvdGUuaWQpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlamVjdFF1b3RlKHF1b3RlSWQ6IG51bWJlcik6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KEFwaS5PcmRlcnMsIGBxdW90ZS9yZWplY3QvJHtxdW90ZUlkfWApO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZUVtcHR5KCk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChBcGkuT3JkZXJzLCAncXVvdGUnLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSk7XG4gIH1cblxuICBwcml2YXRlIGdldFF1b3Rlc0ZvckN1c3RvbWVyKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxRdW90ZXNBcGlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLnF1b3Rlc0xpc3QocGFyYW1zKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UXVvdGVzRm9yU2FsZXNVc2VyKHBhcmFtczogYW55KTogT2JzZXJ2YWJsZTxRdW90ZXNBcGlSZXNwb25zZT4ge1xuICAgIHJldHVybiB0aGlzLmdldEZvY3VzZWQoKS5zd2l0Y2hNYXAocXVvdGUgPT4gdGhpcy5xdW90ZXNMaXN0KHBhcmFtcywgcXVvdGUuaWQpKTtcbiAgfVxuXG4gIHByaXZhdGUgcXVvdGVzTGlzdChwYXJhbXM6IGFueSA9IHt9LCBmb2N1c2VkUXVvdGVJZD86IG51bWJlcik6IE9ic2VydmFibGU8UXVvdGVzQXBpUmVzcG9uc2U+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KFxuICAgICAgQXBpLk9yZGVycyxcbiAgICAgICdxdW90ZS9teVF1b3RlcycsXG4gICAgICB7IHBhcmFtZXRlcnM6IHRoaXMuYnVpbGRTZWFyY2hQYXJhbXMocGFyYW1zKSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKS5tYXAoKHJlczogUXVvdGVzQXBpUmVzcG9uc2UpID0+IHtcbiAgICAgIHJlcy5pdGVtcyA9IHJlcy5pdGVtcyA/IHJlcy5pdGVtcyA6IFtdO1xuICAgICAgaWYgKGZvY3VzZWRRdW90ZUlkKSB0aGlzLmZpbmROZXdGb2N1c2VkKHJlcy5pdGVtcywgZm9jdXNlZFF1b3RlSWQpO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9KS5kbyh0aGlzLnNldFF1b3Rlc0luU3RvcmUpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaW5kTmV3Rm9jdXNlZChxdW90ZXM6IFF1b3RlW10sIGFjdGl2ZVF1b3RlSWQ6IG51bWJlcik6IFF1b3RlW10ge1xuICAgIHJldHVybiBxdW90ZXMubWFwKChxdW90ZTogUXVvdGUpID0+IHtcbiAgICAgIHF1b3RlLmZvY3VzZWQgPSBxdW90ZS5pZCA9PT0gYWN0aXZlUXVvdGVJZDtcbiAgICAgIHJldHVybiBxdW90ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlTmV3Rm9jdXNlZFF1b3RlKHF1b3RlSWQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuZGF0YS5kbygoZGF0YTogUXVvdGVzKSA9PiB7XG4gICAgICBkYXRhLml0ZW1zLm1hcCgocXVvdGU6IFF1b3RlKSA9PiB7XG4gICAgICAgIHF1b3RlLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKHF1b3RlLmlkID09PSBxdW90ZUlkKSBxdW90ZS5mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHF1b3RlO1xuICAgICAgfSk7XG4gICAgfSkuZG8odGhpcy51cGRhdGVRdW90ZXNJblN0b3JlKS50YWtlKDEpLnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZFNlYXJjaFBhcmFtcyhwYXJhbXM6IGFueSkge1xuICAgIHBhcmFtc1snaSddID0gKHBhcmFtc1snaSddICYmIHBhcmFtc1snaSddID4gMCkgPyBwYXJhbXNbJ2knXSAtIDEgOiAwO1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB7IHE6ICcnLCBpOiAwLCBuOiAyMCwgczogJycsIGQ6ICcnIH0sIHBhcmFtcyk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVF1b3Rlc0luU3RvcmUgPSAocXVvdGVzOiBRdW90ZXMpOiB2b2lkID0+IHtcbiAgICB0aGlzLnF1b3Rlc1N0b3JlLnVwZGF0ZVF1b3Rlcyh7IGl0ZW1zOiBxdW90ZXMuaXRlbXMgfSk7XG4gIH1cblxuICBwcml2YXRlIHNldFF1b3Rlc0luU3RvcmUgPSAocXVvdGVzOiBRdW90ZXNBcGlSZXNwb25zZSk6IHZvaWQgPT4ge1xuICAgIHRoaXMucXVvdGVzU3RvcmUuc2V0UXVvdGVzKHF1b3Rlcyk7XG4gIH1cbn1cbiJdfQ==
