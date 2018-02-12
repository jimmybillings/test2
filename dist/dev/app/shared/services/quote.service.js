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
    QuoteService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService,
            cart_service_1.CartService,
            app_store_1.AppStore,
            user_service_1.UserService])
    ], QuoteService);
    return QuoteService;
}());
exports.QuoteService = QuoteService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvcXVvdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQyw2Q0FBMkM7QUFDM0MsK0NBQTZDO0FBQzdDLCtDQUE2QztBQUM3Qyw2REFBK0Q7QUFlL0QsNkNBQTBFO0FBQzFFLCtEQUE0RDtBQUc1RDtJQUNFLHNCQUNVLEdBQWUsRUFDZixXQUF3QixFQUN4QixLQUFlLEVBQ2YsV0FBd0I7UUFIeEIsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtJQUM5QixDQUFDO0lBSUwsc0JBQVcsOEJBQUk7YUFBZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDckQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDdkQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFwQixDQUFvQixDQUFDLENBQUM7UUFDMUQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxrQ0FBUTthQUFuQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFDLElBQVc7Z0JBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFB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LENBQUM7SUFFRCxzQkFBWSx5Q0FBZTthQUEzQjtZQUNFLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLHlCQUF5QixDQUFvQixDQUFDO1FBQzNHLENBQUM7OztPQUFBO0lBRUQsc0JBQVksZ0RBQXNCO2FBQWxDO1lBQ0UsTUFBTSxDQUFDO2dCQUNMLGNBQWMsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxlQUFlO2dCQUNsRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxJQUFJO2dCQUN6RCxRQUFRLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxlQUFlO2FBQzdDLENBQUM7UUFDSixDQUFDOzs7T0FBQTtJQUVELHNCQUFZLG1EQUF5QjthQUFyQztZQUNFLE1BQU0sQ0FBQztnQkFDTCxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQkFDaEQsZUFBZSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUk7YUFDdkQsQ0FBQztRQUNKLENBQUM7OztPQUFBO0lBdkxVLFlBQVk7UUFEeEIsaUJBQVUsRUFBRTt5Q0FHSSx3QkFBVTtZQUNGLDBCQUFXO1lBQ2pCLG9CQUFRO1lBQ0YsMEJBQVc7T0FMdkIsWUFBWSxDQXdMeEI7SUFBRCxtQkFBQztDQXhMRCxBQXdMQyxJQUFBO0FBeExZLG9DQUFZIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvcXVvdGUuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IENhcnRTZXJ2aWNlIH0gZnJvbSAnLi9jYXJ0LnNlcnZpY2UnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBBcGksIEFwaVJlc3BvbnNlIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IFVzZXIgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHtcbiAgUXVvdGUsXG4gIE9yZGVyLFxuICBRdW90ZU9wdGlvbnMsXG4gIFBheW1lbnRUeXBlLFxuICBQdXJjaGFzZU9wdGlvbnMsXG4gIFBheW1lbnRPcHRpb25zLFxuICBQYXltZW50T3B0aW9uLFxuICBQcm9qZWN0LFxuICBMaWNlbnNlQWdyZWVtZW50cyxcbiAgQXNzZXRMaW5lSXRlbVxufSBmcm9tICcuLi9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSwgUXVvdGVTaG93U3RhdGUsIENoZWNrb3V0U3RhdGUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgZW5oYW5jZUFzc2V0IH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBRdW90ZVNlcnZpY2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGFwaTogQXBpU2VydmljZSxcbiAgICBwcml2YXRlIGNhcnRTZXJ2aWNlOiBDYXJ0U2VydmljZSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZSxcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZVxuICApIHsgfVxuXG4gIC8vIFN0b3JlIEFjY2Vzc29yc1xuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPFF1b3RlU2hvd1N0YXRlPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlU2hvdyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHN0YXRlKCk6IFF1b3RlU2hvd1N0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5xdW90ZVNob3cpO1xuICB9XG5cbiAgcHVibGljIGdldCBxdW90ZSgpOiBPYnNlcnZhYmxlPFF1b3RlPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnF1b3RlU2hvdy5kYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcHJvamVjdHMoKTogT2JzZXJ2YWJsZTxQcm9qZWN0W10+IHtcbiAgICByZXR1cm4gdGhpcy5xdW90ZS5tYXAoKGRhdGE6IFF1b3RlKSA9PiB7XG4gICAgICByZXR1cm4gZGF0YS5wcm9qZWN0cy5tYXAoKHByb2plY3Q6IFByb2plY3QpID0+IHtcbiAgICAgICAgaWYgKHByb2plY3QubGluZUl0ZW1zKSB7XG4gICAgICAgICAgcHJvamVjdC5saW5lSXRlbXMgPSBwcm9qZWN0LmxpbmVJdGVtcy5tYXAoKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKSA9PiB7XG4gICAgICAgICAgICBsaW5lSXRlbS5hc3NldCA9IGVuaGFuY2VBc3NldChPYmplY3QuYXNzaWduKFxuICAgICAgICAgICAgICBsaW5lSXRlbS5hc3NldCwgeyB1dWlkOiBsaW5lSXRlbS5pZCB9KSxcbiAgICAgICAgICAgICAgJ3F1b3RlU2hvdycsIGRhdGEuaWRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gbGluZUl0ZW07XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHByb2plY3Q7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2hlY2tvdXREYXRhKCk6IE9ic2VydmFibGU8Q2hlY2tvdXRTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNoZWNrb3V0U3RhdGUoKTogQ2hlY2tvdXRTdGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc25hcHNob3Qoc3RhdGUgPT4gc3RhdGUuY2hlY2tvdXQpO1xuICB9XG5cbiAgcHVibGljIGdldCB0b3RhbCgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKChzdGF0ZTogUXVvdGVTaG93U3RhdGUpID0+IHN0YXRlLmRhdGEudG90YWwpO1xuICB9XG5cbiAgcHVibGljIGdldCBwYXltZW50VHlwZSgpOiBPYnNlcnZhYmxlPFBheW1lbnRPcHRpb24+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dERhdGEubWFwKChzdGF0ZTogQ2hlY2tvdXRTdGF0ZSkgPT4gc3RhdGUuc2VsZWN0ZWRQYXltZW50VHlwZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHBheW1lbnRPcHRpb25zKCk6IE9ic2VydmFibGU8UGF5bWVudE9wdGlvbnM+IHtcbiAgICByZXR1cm4gdGhpcy5jaGVja291dERhdGEubWFwKChkYXRhOiBDaGVja291dFN0YXRlKSA9PiBkYXRhLnBheW1lbnRPcHRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgaGFzQXNzZXRzKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKChzdGF0ZTogUXVvdGVTaG93U3RhdGUpID0+IChzdGF0ZS5kYXRhLml0ZW1Db3VudCB8fCAwKSA+IDApO1xuICB9XG5cbiAgcHVibGljIGdldCBoYXNBc3NldExpbmVJdGVtcygpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5kYXRhLm1hcCgoc3RhdGU6IFF1b3RlU2hvd1N0YXRlKSA9PiB7XG4gICAgICByZXR1cm4gc3RhdGUuZGF0YS5wcm9qZWN0cy5yZWR1Y2UoKHByZXZpb3VzOiBudW1iZXIsIGN1cnJlbnQ6IFByb2plY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQubGluZUl0ZW1zID8gcHJldmlvdXMgKz0gY3VycmVudC5saW5lSXRlbXMubGVuZ3RoIDogMDtcbiAgICAgIH0sIDApID4gMDtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1YmxpYyBJbnRlcmZhY2VcbiAgcHVibGljIHB1cmNoYXNlKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgc3dpdGNoICh0aGlzLmNoZWNrb3V0U3RhdGUuc2VsZWN0ZWRQYXltZW50VHlwZSkge1xuICAgICAgY2FzZSAnQ3JlZGl0Q2FyZCc6XG4gICAgICAgIHJldHVybiB0aGlzLnB1cmNoYXNlV2l0aENyZWRpdENhcmQoKTtcbiAgICAgIGNhc2UgJ1B1cmNoYXNlT25DcmVkaXQnOlxuICAgICAgICByZXR1cm4gdGhpcy5wdXJjaGFzZU9uQ3JlZGl0KCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5wdXJjaGFzZVF1b3RlVHlwZSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXRQYXltZW50T3B0aW9ucygpIHtcbiAgICB0aGlzLmFwaS5nZXQoQXBpLk9yZGVycywgYHF1b3RlL3BheW1lbnRPcHRpb25zLyR7dGhpcy5zdGF0ZS5kYXRhLmlkfWApXG4gICAgICAuc3Vic2NyaWJlKChvcHRpb25zOiBQYXltZW50T3B0aW9ucykgPT4ge1xuICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jaGVja291dC5zZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyhvcHRpb25zKSk7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNoZWNrb3V0LnNldFNlbGVjdGVkUGF5bWVudFR5cGUodGhpcy5kZWZhdWx0UGF5bWVudFR5cGVGb3Iob3B0aW9ucykpKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHBheW1lbnRPcHRpb25zRXF1YWwob3B0aW9uczogQXJyYXk8UGF5bWVudE9wdGlvbj4pOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5wYXltZW50T3B0aW9ucy5tYXAoKHBtdE9wdHM6IFBheW1lbnRPcHRpb25zKSA9PiB7XG4gICAgICBpZiAoIXBtdE9wdHMpIHJldHVybiBmYWxzZTtcbiAgICAgIHBtdE9wdHMucGF5bWVudE9wdGlvbnMuc29ydCgpO1xuICAgICAgcmV0dXJuIG9wdGlvbnMubGVuZ3RoID09PSBwbXRPcHRzLnBheW1lbnRPcHRpb25zLmxlbmd0aCAmJlxuICAgICAgICBvcHRpb25zLnNvcnQoKS5ldmVyeSgob3B0aW9uOiBQYXltZW50T3B0aW9uLCBpbmRleDogbnVtYmVyKSA9PiBvcHRpb24gPT09IHBtdE9wdHMucGF5bWVudE9wdGlvbnNbaW5kZXhdKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyByZXRyaWV2ZUxpY2Vuc2VBZ3JlZW1lbnRzKCk6IE9ic2VydmFibGU8TGljZW5zZUFncmVlbWVudHM+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkuZ2V0KEFwaS5PcmRlcnMsIGBxdW90ZS9saWNlbnNpbmcvJHt0aGlzLnN0YXRlLmRhdGEuaWR9YCwgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIGV4cGlyZVF1b3RlKCk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICBsZXQgbmV3UXVvdGU6IFF1b3RlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5zdGF0ZS5kYXRhLCB7IGV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfSk7XG4gICAgcmV0dXJuIHRoaXMudXBkYXRlKHRoaXMuc3RhdGUuZGF0YS5pZCwgbmV3UXVvdGUpO1xuICB9XG5cbiAgcHVibGljIHJlamVjdFF1b3RlKCk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICByZXR1cm4gdGhpcy5hcGkucHV0KEFwaS5PcmRlcnMsIGBxdW90ZS9yZWplY3QvJHt0aGlzLnN0YXRlLmRhdGEuaWR9YCwgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuICB9XG5cbiAgcHVibGljIGV4dGVuZEV4cGlyYXRpb25EYXRlKG5ld0RhdGU6IHN0cmluZyk6IE9ic2VydmFibGU8UXVvdGU+IHtcbiAgICBjb25zdCBuZXdRdW90ZTogUXVvdGUgPSBPYmplY3QuYXNzaWduKFxuICAgICAge30sXG4gICAgICB0aGlzLnN0YXRlLmRhdGEsXG4gICAgICB7IGV4cGlyYXRpb25EYXRlOiBuZXcgRGF0ZShuZXdEYXRlKS50b0lTT1N0cmluZygpLCBxdW90ZVN0YXR1czogJ0FDVElWRScgfVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy51cGRhdGUodGhpcy5zdGF0ZS5kYXRhLmlkLCBuZXdRdW90ZSlcbiAgICAgIC5kbyhxdW90ZSA9PiB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5xdW90ZVNob3cubG9hZFN1Y2Nlc3MocXVvdGUpKSk7XG4gIH1cblxuICAvLyBQcml2YXRlIE1ldGhvZHNcbiAgcHJpdmF0ZSBkZWZhdWx0UGF5bWVudFR5cGVGb3Iob3B0aW9uczogUGF5bWVudE9wdGlvbnMpOiBQYXltZW50T3B0aW9uIHtcbiAgICBpZiAob3B0aW9ucy5wYXltZW50T3B0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLnBheW1lbnRPcHRpb25zWzBdO1xuICAgIH1cbiAgICByZXR1cm4gJ0NyZWRpdENhcmQnO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoaWQ6IG51bWJlciwgcXVvdGU6IFF1b3RlKTogT2JzZXJ2YWJsZTxRdW90ZT4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5wdXQoQXBpLk9yZGVycywgYHF1b3RlLyR7aWR9YCwgeyBib2R5OiBxdW90ZSwgbG9hZGluZ0luZGljYXRvcjogJ29uQmVmb3JlUmVxdWVzdCcgfSk7XG4gIH1cblxuICBwcml2YXRlIHB1cmNoYXNlV2l0aENyZWRpdENhcmQoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICBjb25zdCBvcHRpb25zOiBQdXJjaGFzZU9wdGlvbnMgPSB0aGlzLnB1cmNoYXNlT3B0aW9ucztcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICBgcXVvdGUvJHt0aGlzLnN0YXRlLmRhdGEuaWR9L3N0cmlwZS9wcm9jZXNzYCxcbiAgICAgIHsgYm9keTogeyBvcHRpb25zIH0sIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfVxuICAgICkubWFwKF8gPT4gXyBhcyBudW1iZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXJjaGFzZU9uQ3JlZGl0KCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgY29uc3Qgb3B0aW9uczogUHVyY2hhc2VPcHRpb25zID0gdGhpcy5hZGRyZXNzUHVyY2hhc2VPcHRpb25zO1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KFxuICAgICAgQXBpLk9yZGVycyxcbiAgICAgIGBxdW90ZS8ke3RoaXMuc3RhdGUuZGF0YS5pZH0vY2hlY2tvdXQvY29udmVydFRvT3JkZXJgLFxuICAgICAgeyBib2R5OiB7IG9wdGlvbnMgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKS5tYXAoKG9yZGVyOiBPcmRlcikgPT4gb3JkZXIuaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBwdXJjaGFzZVF1b3RlVHlwZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIGNvbnN0IG9wdGlvbnM6IFB1cmNoYXNlT3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICB7fSwgeyBvcmRlclR5cGU6IHRoaXMuc3RhdGUuZGF0YS5wdXJjaGFzZVR5cGUgfSxcbiAgICAgIHRoaXMuYWRkcmVzc1B1cmNoYXNlT3B0aW9uc1xuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3QoXG4gICAgICBBcGkuT3JkZXJzLFxuICAgICAgYHF1b3RlLyR7dGhpcy5zdGF0ZS5kYXRhLmlkfS9jaGVja291dC9jb252ZXJ0VG9PcmRlcmAsXG4gICAgICB7IGJvZHk6IHsgb3B0aW9ucyB9LCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH1cbiAgICApLm1hcCgob3JkZXI6IE9yZGVyKSA9PiBvcmRlci5pZCk7XG4gIH1cblxuICBwcml2YXRlIGdldCBwdXJjaGFzZU9wdGlvbnMoKTogUHVyY2hhc2VPcHRpb25zIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5hZGRyZXNzUHVyY2hhc2VPcHRpb25zLCB0aGlzLmNyZWRpdENhcmRQdXJjaGFzZU9wdGlvbnMpIGFzIFB1cmNoYXNlT3B0aW9ucztcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGFkZHJlc3NQdXJjaGFzZU9wdGlvbnMoKTogUHVyY2hhc2VPcHRpb25zIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3JkZXJBZGRyZXNzSWQ6IHRoaXMuY2hlY2tvdXRTdGF0ZS5zZWxlY3RlZEFkZHJlc3MuYWRkcmVzc0VudGl0eUlkLFxuICAgICAgb3JkZXJBZGRyZXNzVHlwZTogdGhpcy5jaGVja291dFN0YXRlLnNlbGVjdGVkQWRkcmVzcy50eXBlLFxuICAgICAgcG9OdW1iZXI6IHRoaXMuY2hlY2tvdXRTdGF0ZS5wdXJjaGFzZU9yZGVySWRcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgY3JlZGl0Q2FyZFB1cmNoYXNlT3B0aW9ucygpOiBQdXJjaGFzZU9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBzdHJpcGVUb2tlbjogdGhpcy5jaGVja291dFN0YXRlLmF1dGhvcml6YXRpb24uaWQsXG4gICAgICBzdHJpcGVUb2tlblR5cGU6IHRoaXMuY2hlY2tvdXRTdGF0ZS5hdXRob3JpemF0aW9uLnR5cGVcbiAgICB9O1xuICB9XG59XG4iXX0=
