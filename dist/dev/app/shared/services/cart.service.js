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
var Observable_1 = require("rxjs/Observable");
var api_service_1 = require("../services/api.service");
var api_interface_1 = require("../interfaces/api.interface");
var current_user_service_1 = require("../services/current-user.service");
var SubclipMarkersInterface = require("../interfaces/subclip-markers");
var app_store_1 = require("../../app.store");
var enhanced_asset_1 = require("../interfaces/enhanced-asset");
var common_functions_1 = require("../utilities/common.functions");
var CartService = (function () {
    function CartService(store, api, currentUser) {
        var _this = this;
        this.store = store;
        this.api = api;
        this.currentUser = currentUser;
        this.replaceCartWith = function (wholeCartResponse) {
            _this.store.dispatch(function (factory) { return factory.cart.loadSuccess(wholeCartResponse); });
        };
    }
    Object.defineProperty(CartService.prototype, "data", {
        get: function () {
            return this.store.select(function (state) { return state.cart; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "state", {
        get: function () {
            return this.store.snapshot(function (state) { return state.cart; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "checkoutState", {
        get: function () {
            return this.store.snapshot(function (state) { return state.checkout; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "checkoutData", {
        get: function () {
            return this.store.select(function (state) { return state.checkout; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "cart", {
        get: function () {
            return this.data.map(function (state) { return common_functions_1.Common.clone(state.data); });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "projects", {
        get: function () {
            return this.cart.map(function (data) {
                return data.projects.map(function (project) {
                    if (project.lineItems) {
                        project.lineItems = project.lineItems.map(function (lineItem) {
                            lineItem.asset = enhanced_asset_1.enhanceAsset(Object.assign(lineItem.asset, { uuid: lineItem.id }), 'cart');
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
    Object.defineProperty(CartService.prototype, "total", {
        get: function () {
            return this.cart.map(function (data) { return data.total; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "hasAssets", {
        get: function () {
            return this.cart.map(function (cart) { return (cart.itemCount || 0) > 0; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "paymentType", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.selectedPaymentType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "loaded", {
        get: function () {
            return !isNaN(this.state.data.userId);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "paymentOptions", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.paymentOptions; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "hasAssetLineItems", {
        get: function () {
            return this.cart.map(function (cart) {
                return cart.projects.reduce(function (previous, current) {
                    return current.lineItems ? previous += current.lineItems.length : 0;
                }, 0) > 0;
            });
        },
        enumerable: true,
        configurable: true
    });
    CartService.prototype.purchase = function () {
        switch (this.store.snapshot(function (state) { return state.checkout.selectedPaymentType; })) {
            case 'CreditCard':
                return this.purchaseWithCreditCard();
            case 'PurchaseOnCredit':
                return this.purchaseOnCredit();
            default:
                return Observable_1.Observable.of(NaN);
        }
    };
    CartService.prototype.addProject = function () {
        this.addProjectAndReturnObservable().subscribe();
    };
    CartService.prototype.removeProject = function (project) {
        var _this = this;
        this.api.delete(api_interface_1.Api.Orders, "cart/project/" + project.id, { loadingIndicator: true })
            .subscribe(function (wholeCartResponse) {
            _this.replaceCartWith(wholeCartResponse);
        });
    };
    CartService.prototype.addAssetToProjectInCart = function (addAssetParameters) {
        var _this = this;
        var existingProjectNames = this.existingProjectNames;
        this.api.put(api_interface_1.Api.Orders, 'cart/asset/lineItem', {
            body: this.formatBody(addAssetParameters),
            parameters: { projectName: existingProjectNames[existingProjectNames.length - 1], region: 'AAA' },
            loadingIndicator: true
        }).subscribe(function (cartResponse) {
            _this.replaceCartWith(cartResponse);
            _this.store.dispatch(function (factory) { return factory.snackbar.display('ASSET.ADD_TO_CART_TOAST', { assetId: addAssetParameters.lineItem.asset.assetId }); });
        });
    };
    CartService.prototype.updateProject = function (project) {
        this.api.put(api_interface_1.Api.Orders, 'cart/project', { body: project, loadingIndicator: true })
            .subscribe(this.replaceCartWith);
    };
    CartService.prototype.updateProjectPriceAttributes = function (priceAttributes, project) {
        this.api.put(api_interface_1.Api.Orders, "cart/project/priceAttributes/" + project.id, { body: priceAttributes, loadingIndicator: true }).subscribe(this.replaceCartWith);
    };
    CartService.prototype.moveLineItemTo = function (project, lineItem) {
        this.api.put(api_interface_1.Api.Orders, 'cart/move/lineItem', { parameters: { lineItemId: lineItem.id, projectId: project.id }, loadingIndicator: true }).subscribe(this.replaceCartWith);
    };
    CartService.prototype.cloneLineItem = function (lineItem) {
        this.api.put(api_interface_1.Api.Orders, 'cart/clone/lineItem', { parameters: { lineItemId: lineItem.id }, loadingIndicator: true })
            .subscribe(this.replaceCartWith);
    };
    CartService.prototype.removeLineItem = function (lineItem) {
        this.api.delete(api_interface_1.Api.Orders, "cart/asset/" + lineItem.id, { loadingIndicator: true })
            .subscribe(this.replaceCartWith);
    };
    CartService.prototype.editLineItem = function (lineItem, fieldToEdit) {
        if (!!fieldToEdit.pricingAttributes) {
            fieldToEdit = { attributes: fieldToEdit.pricingAttributes };
        }
        Object.assign(lineItem, fieldToEdit);
        this.api.put(api_interface_1.Api.Orders, "cart/update/lineItem/" + lineItem.id, { body: lineItem, parameters: { region: 'AAA' }, loadingIndicator: true }).subscribe(this.replaceCartWith);
    };
    CartService.prototype.editLineItemMarkers = function (lineItem, newMarkers) {
        var duration = SubclipMarkersInterface.durationFrom(newMarkers);
        Object.assign(lineItem.asset, duration);
        this.editLineItem(lineItem, {});
    };
    CartService.prototype.getPaymentOptions = function () {
        var _this = this;
        this.api.get(api_interface_1.Api.Orders, 'cart/paymentOptions').subscribe(function (options) {
            _this.store.dispatch(function (factory) { return factory.checkout.setAvailablePaymentOptions(options); });
            _this.store.dispatch(function (factory) { return factory.checkout.setSelectedPaymentType(_this.defaultPaymentTypeFor(options)); });
        });
    };
    CartService.prototype.paymentOptionsEqual = function (options) {
        return this.paymentOptions.map(function (pmtOpts) {
            if (!pmtOpts)
                return false;
            pmtOpts.paymentOptions.sort();
            return options.length === pmtOpts.paymentOptions.length &&
                options.sort().every(function (option, index) { return option === pmtOpts.paymentOptions[index]; });
        });
    };
    CartService.prototype.retrieveLicenseAgreements = function () {
        return this.api.get(api_interface_1.Api.Orders, 'cart/licensing', { loadingIndicator: true });
    };
    CartService.prototype.defaultPaymentTypeFor = function (options) {
        if (options.paymentOptions.length === 1) {
            return options.paymentOptions[0];
        }
        return 'CreditCard';
    };
    CartService.prototype.purchaseWithCreditCard = function () {
        var _this = this;
        var options = this.purchaseOptions;
        return this.api.post(api_interface_1.Api.Orders, 'cart/stripe/process', { body: { options: options }, loadingIndicator: true })
            .do(function () { return _this.store.dispatch(function (factory) { return factory.order.setCheckoutState(true); }); });
    };
    CartService.prototype.purchaseOnCredit = function () {
        var _this = this;
        var options = this.addressPurchaseOptions;
        return this.api.post(api_interface_1.Api.Orders, 'cart/checkout/purchaseOnCredit', { body: { options: options }, loadingIndicator: true })
            .do(function () { return _this.store.dispatch(function (factory) { return factory.order.setCheckoutState(true); }); })
            .map(function (order) { return order.id; });
    };
    CartService.prototype.formatBody = function (parameters) {
        var formatted = {};
        Object.assign(formatted, { lineItem: this.formatLineItem(parameters.lineItem, parameters.markers) });
        if (parameters.attributes) {
            Object.assign(formatted, { attributes: parameters.attributes });
        }
        return formatted;
    };
    CartService.prototype.formatLineItem = function (lineItem, markers) {
        return Object.assign({}, lineItem, { asset: this.formatAsset(lineItem.asset, markers) });
    };
    CartService.prototype.formatAsset = function (asset, markers) {
        var timeStart;
        var timeEnd;
        if (markers) {
            var duration = SubclipMarkersInterface.durationFrom(markers);
            timeStart = duration.timeStart;
            timeEnd = duration.timeEnd;
        }
        else {
            timeStart = asset.timeStart;
            timeEnd = asset.timeEnd;
        }
        return { assetId: asset.assetId, timeStart: timeStart >= 0 ? timeStart : -1, timeEnd: timeEnd >= 0 ? timeEnd : -2 };
    };
    CartService.prototype.addProjectAndReturnObservable = function () {
        return this.api.post(api_interface_1.Api.Orders, 'cart/project', { body: { clientName: this.fullName }, loadingIndicator: true })
            .do(this.replaceCartWith)
            .share();
    };
    Object.defineProperty(CartService.prototype, "fullName", {
        get: function () {
            var userName;
            this.currentUser.fullName().take(1).subscribe(function (fullName) { return userName = fullName; });
            return userName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "existingProjectNames", {
        get: function () {
            return (this.state.data.projects || []).map(function (project) { return project.name; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "purchaseOptions", {
        get: function () {
            return Object.assign({}, this.addressPurchaseOptions, this.creditCardPurchaseOptions);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CartService.prototype, "addressPurchaseOptions", {
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
    Object.defineProperty(CartService.prototype, "creditCardPurchaseOptions", {
        get: function () {
            return {
                stripeToken: this.checkoutState.authorization.id,
                stripeTokenType: this.checkoutState.authorization.type
            };
        },
        enumerable: true,
        configurable: true
    });
    CartService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [app_store_1.AppStore,
            api_service_1.ApiService,
            current_user_service_1.CurrentUserService])
    ], CartService);
    return CartService;
}());
exports.CartService = CartService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvc2VydmljZXMvY2FydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDhDQUE2QztBQUU3Qyx1REFBcUQ7QUFDckQsNkRBQTJEO0FBQzNELHlFQUFzRTtBQUV0RSx1RUFBeUU7QUFDekUsNkNBQXNEO0FBZ0J0RCwrREFBNEQ7QUFDNUQsa0VBQXVEO0FBSXZEO0lBQ0UscUJBQ1UsS0FBZSxFQUNmLEdBQWUsRUFDZixXQUErQjtRQUh6QyxpQkFJSztRQUhLLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBcVBqQyxvQkFBZSxHQUFHLFVBQUMsaUJBQXNCO1lBRS9DLEtBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsRUFBM0MsQ0FBMkMsQ0FBQyxDQUFDO1FBQzlFLENBQUMsQ0FBQTtJQXZQRyxDQUFDO0lBRUwsc0JBQVcsNkJBQUk7YUFBZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyw4QkFBSzthQUFoQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxJQUFJLEVBQVYsQ0FBVSxDQUFDLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVyxzQ0FBYTthQUF4QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FB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QUE7SUFFRCxzQkFBWSwrQ0FBc0I7YUFBbEM7WUFDRSxNQUFNLENBQUM7Z0JBQ0wsY0FBYyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLGVBQWU7Z0JBQ2xFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUk7Z0JBQ3pELFFBQVEsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGVBQWU7YUFDN0MsQ0FBQztRQUNKLENBQUM7OztPQUFBO0lBRUQsc0JBQVksa0RBQXlCO2FBQXJDO1lBQ0UsTUFBTSxDQUFDO2dCQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNoRCxlQUFlLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSTthQUN2RCxDQUFDO1FBQ0osQ0FBQzs7O09BQUE7SUEvUVUsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUdNLG9CQUFRO1lBQ1Ysd0JBQVU7WUFDRix5Q0FBa0I7T0FKOUIsV0FBVyxDQWdSdkI7SUFBRCxrQkFBQztDQWhSRCxBQWdSQyxJQUFBO0FBaFJZLGtDQUFXIiwiZmlsZSI6ImFwcC9zaGFyZWQvc2VydmljZXMvY2FydC5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEFwaVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGksIEFwaUJvZHkgfSBmcm9tICcuLi9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkcmVzcywgVmlld0FkZHJlc3MgfSBmcm9tICcuLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCAqIGFzIFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlIGZyb20gJy4uL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IEFwcFN0b3JlLCBDYXJ0U3RhdGUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHtcbiAgT3JkZXIsXG4gIENhcnQsXG4gIFByb2plY3QsXG4gIEFzc2V0TGluZUl0ZW0sXG4gIEFkZEFzc2V0UGFyYW1ldGVycyxcbiAgUXVvdGVPcHRpb25zLFxuICBQYXltZW50VHlwZSxcbiAgUGF5bWVudE9wdGlvbnMsXG4gIFBheW1lbnRPcHRpb24sXG4gIFB1cmNoYXNlT3B0aW9ucyxcbiAgTGljZW5zZUFncmVlbWVudHNcbn0gZnJvbSAnLi4vaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2VsZWN0ZWRQcmljZUF0dHJpYnV0ZSwgUG9qbyB9IGZyb20gJy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBGcmFtZSB9IGZyb20gJy4uL21vZHVsZXMvd2F6ZWUtZnJhbWUtZm9ybWF0dGVyL2luZGV4JztcbmltcG9ydCB7IGVuaGFuY2VBc3NldCB9IGZyb20gJy4uL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuaW1wb3J0IHsgQ29tbW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQ2hlY2tvdXRTdGF0ZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYXJ0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgYXBpOiBBcGlTZXJ2aWNlLFxuICAgIHByaXZhdGUgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBnZXQgZGF0YSgpOiBPYnNlcnZhYmxlPENhcnRTdGF0ZT4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jYXJ0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgc3RhdGUoKTogQ2FydFN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5jYXJ0KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgY2hlY2tvdXRTdGF0ZSgpOiBDaGVja291dFN0YXRlIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dCk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGNoZWNrb3V0RGF0YSgpOiBPYnNlcnZhYmxlPENoZWNrb3V0U3RhdGU+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY2hlY2tvdXQpO1xuICB9XG5cbiAgcHVibGljIGdldCBjYXJ0KCk6IE9ic2VydmFibGU8Q2FydD4ge1xuICAgIHJldHVybiB0aGlzLmRhdGEubWFwKChzdGF0ZTogQ2FydFN0YXRlKSA9PiBDb21tb24uY2xvbmUoc3RhdGUuZGF0YSkpO1xuICB9XG5cbiAgcHVibGljIGdldCBwcm9qZWN0cygpOiBPYnNlcnZhYmxlPFByb2plY3RbXT4ge1xuICAgIHJldHVybiB0aGlzLmNhcnQubWFwKChkYXRhOiBDYXJ0KSA9PiB7XG4gICAgICByZXR1cm4gZGF0YS5wcm9qZWN0cy5tYXAoKHByb2plY3Q6IFByb2plY3QpID0+IHtcbiAgICAgICAgaWYgKHByb2plY3QubGluZUl0ZW1zKSB7XG4gICAgICAgICAgcHJvamVjdC5saW5lSXRlbXMgPSBwcm9qZWN0LmxpbmVJdGVtcy5tYXAoKGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKSA9PiB7XG4gICAgICAgICAgICBsaW5lSXRlbS5hc3NldCA9IGVuaGFuY2VBc3NldChPYmplY3QuYXNzaWduKGxpbmVJdGVtLmFzc2V0LCB7IHV1aWQ6IGxpbmVJdGVtLmlkIH0pLCAnY2FydCcpO1xuICAgICAgICAgICAgcmV0dXJuIGxpbmVJdGVtO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHRvdGFsKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FydC5tYXAoKGRhdGE6IENhcnQpID0+IGRhdGEudG90YWwpO1xuICB9XG5cbiAgcHVibGljIGdldCBoYXNBc3NldHMoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuY2FydC5tYXAoY2FydCA9PiAoY2FydC5pdGVtQ291bnQgfHwgMCkgPiAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF5bWVudFR5cGUoKTogT2JzZXJ2YWJsZTxQYXltZW50T3B0aW9uPiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmNoZWNrb3V0LnNlbGVjdGVkUGF5bWVudFR5cGUpO1xuICB9XG5cbiAgcHVibGljIGdldCBsb2FkZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc05hTih0aGlzLnN0YXRlLmRhdGEudXNlcklkKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgcGF5bWVudE9wdGlvbnMoKTogT2JzZXJ2YWJsZTxQYXltZW50T3B0aW9ucz4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dC5wYXltZW50T3B0aW9ucyk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGhhc0Fzc2V0TGluZUl0ZW1zKCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLmNhcnQubWFwKChjYXJ0OiBDYXJ0KSA9PiB7XG4gICAgICByZXR1cm4gY2FydC5wcm9qZWN0cy5yZWR1Y2UoKHByZXZpb3VzOiBudW1iZXIsIGN1cnJlbnQ6IFByb2plY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQubGluZUl0ZW1zID8gcHJldmlvdXMgKz0gY3VycmVudC5saW5lSXRlbXMubGVuZ3RoIDogMDtcbiAgICAgIH0sIDApID4gMDtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBwdXJjaGFzZSgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHN3aXRjaCAodGhpcy5zdG9yZS5zbmFwc2hvdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dC5zZWxlY3RlZFBheW1lbnRUeXBlKSkge1xuICAgICAgY2FzZSAnQ3JlZGl0Q2FyZCc6XG4gICAgICAgIHJldHVybiB0aGlzLnB1cmNoYXNlV2l0aENyZWRpdENhcmQoKTtcbiAgICAgIGNhc2UgJ1B1cmNoYXNlT25DcmVkaXQnOlxuICAgICAgICByZXR1cm4gdGhpcy5wdXJjaGFzZU9uQ3JlZGl0KCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZihOYU4pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhZGRQcm9qZWN0KCk6IHZvaWQge1xuICAgIHRoaXMuYWRkUHJvamVjdEFuZFJldHVybk9ic2VydmFibGUoKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVQcm9qZWN0KHByb2plY3Q6IFByb2plY3QpOiB2b2lkIHtcbiAgICB0aGlzLmFwaS5kZWxldGUoQXBpLk9yZGVycywgYGNhcnQvcHJvamVjdC8ke3Byb2plY3QuaWR9YCwgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pXG4gICAgICAuc3Vic2NyaWJlKHdob2xlQ2FydFJlc3BvbnNlID0+IHtcbiAgICAgICAgdGhpcy5yZXBsYWNlQ2FydFdpdGgod2hvbGVDYXJ0UmVzcG9uc2UpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgYWRkQXNzZXRUb1Byb2plY3RJbkNhcnQoYWRkQXNzZXRQYXJhbWV0ZXJzOiBBZGRBc3NldFBhcmFtZXRlcnMpOiB2b2lkIHtcbiAgICBsZXQgZXhpc3RpbmdQcm9qZWN0TmFtZXM6IEFycmF5PHN0cmluZz4gPSB0aGlzLmV4aXN0aW5nUHJvamVjdE5hbWVzO1xuICAgIHRoaXMuYXBpLnB1dChcbiAgICAgIEFwaS5PcmRlcnMsXG4gICAgICAnY2FydC9hc3NldC9saW5lSXRlbScsXG4gICAgICB7XG4gICAgICAgIGJvZHk6IHRoaXMuZm9ybWF0Qm9keShhZGRBc3NldFBhcmFtZXRlcnMpLFxuICAgICAgICBwYXJhbWV0ZXJzOiB7IHByb2plY3ROYW1lOiBleGlzdGluZ1Byb2plY3ROYW1lc1tleGlzdGluZ1Byb2plY3ROYW1lcy5sZW5ndGggLSAxXSwgcmVnaW9uOiAnQUFBJyB9LFxuICAgICAgICBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlXG4gICAgICB9XG4gICAgKS5zdWJzY3JpYmUoY2FydFJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMucmVwbGFjZUNhcnRXaXRoKGNhcnRSZXNwb25zZSk7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKFxuICAgICAgICBmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnQVNTRVQuQUREX1RPX0NBUlRfVE9BU1QnLCB7IGFzc2V0SWQ6IGFkZEFzc2V0UGFyYW1ldGVycy5saW5lSXRlbS5hc3NldC5hc3NldElkIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVByb2plY3QocHJvamVjdDogUHJvamVjdCk6IHZvaWQge1xuICAgIHRoaXMuYXBpLnB1dChBcGkuT3JkZXJzLCAnY2FydC9wcm9qZWN0JywgeyBib2R5OiBwcm9qZWN0LCBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pXG4gICAgICAuc3Vic2NyaWJlKHRoaXMucmVwbGFjZUNhcnRXaXRoKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVQcm9qZWN0UHJpY2VBdHRyaWJ1dGVzKHByaWNlQXR0cmlidXRlczogQXJyYXk8U2VsZWN0ZWRQcmljZUF0dHJpYnV0ZT4sIHByb2plY3Q6IFByb2plY3QpOiB2b2lkIHtcbiAgICB0aGlzLmFwaS5wdXQoXG4gICAgICBBcGkuT3JkZXJzLFxuICAgICAgYGNhcnQvcHJvamVjdC9wcmljZUF0dHJpYnV0ZXMvJHtwcm9qZWN0LmlkfWAsXG4gICAgICB7IGJvZHk6IHByaWNlQXR0cmlidXRlcywgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKS5zdWJzY3JpYmUodGhpcy5yZXBsYWNlQ2FydFdpdGgpO1xuICB9XG5cbiAgcHVibGljIG1vdmVMaW5lSXRlbVRvKHByb2plY3Q6IFByb2plY3QsIGxpbmVJdGVtOiBBc3NldExpbmVJdGVtKTogdm9pZCB7XG4gICAgdGhpcy5hcGkucHV0KFxuICAgICAgQXBpLk9yZGVycyxcbiAgICAgICdjYXJ0L21vdmUvbGluZUl0ZW0nLFxuICAgICAgeyBwYXJhbWV0ZXJzOiB7IGxpbmVJdGVtSWQ6IGxpbmVJdGVtLmlkLCBwcm9qZWN0SWQ6IHByb2plY3QuaWQgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKS5zdWJzY3JpYmUodGhpcy5yZXBsYWNlQ2FydFdpdGgpO1xuICB9XG5cbiAgcHVibGljIGNsb25lTGluZUl0ZW0obGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmFwaS5wdXQoQXBpLk9yZGVycywgJ2NhcnQvY2xvbmUvbGluZUl0ZW0nLCB7IHBhcmFtZXRlcnM6IHsgbGluZUl0ZW1JZDogbGluZUl0ZW0uaWQgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KVxuICAgICAgLnN1YnNjcmliZSh0aGlzLnJlcGxhY2VDYXJ0V2l0aCk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlTGluZUl0ZW0obGluZUl0ZW06IEFzc2V0TGluZUl0ZW0pOiB2b2lkIHtcbiAgICB0aGlzLmFwaS5kZWxldGUoQXBpLk9yZGVycywgYGNhcnQvYXNzZXQvJHtsaW5lSXRlbS5pZH1gLCB7IGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSlcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5yZXBsYWNlQ2FydFdpdGgpO1xuICB9XG5cbiAgcHVibGljIGVkaXRMaW5lSXRlbShsaW5lSXRlbTogQXNzZXRMaW5lSXRlbSwgZmllbGRUb0VkaXQ6IGFueSk6IHZvaWQge1xuICAgIGlmICghIWZpZWxkVG9FZGl0LnByaWNpbmdBdHRyaWJ1dGVzKSB7XG4gICAgICBmaWVsZFRvRWRpdCA9IHsgYXR0cmlidXRlczogZmllbGRUb0VkaXQucHJpY2luZ0F0dHJpYnV0ZXMgfTtcbiAgICB9XG5cbiAgICBPYmplY3QuYXNzaWduKGxpbmVJdGVtLCBmaWVsZFRvRWRpdCk7XG5cbiAgICB0aGlzLmFwaS5wdXQoQXBpLk9yZGVycyxcbiAgICAgIGBjYXJ0L3VwZGF0ZS9saW5lSXRlbS8ke2xpbmVJdGVtLmlkfWAsXG4gICAgICB7IGJvZHk6IGxpbmVJdGVtLCBwYXJhbWV0ZXJzOiB7IHJlZ2lvbjogJ0FBQScgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKS5zdWJzY3JpYmUodGhpcy5yZXBsYWNlQ2FydFdpdGgpO1xuICB9XG5cbiAgcHVibGljIGVkaXRMaW5lSXRlbU1hcmtlcnMobGluZUl0ZW06IEFzc2V0TGluZUl0ZW0sIG5ld01hcmtlcnM6IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLlN1YmNsaXBNYXJrZXJzKTogdm9pZCB7XG4gICAgY29uc3QgZHVyYXRpb246IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLkR1cmF0aW9uID0gU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuZHVyYXRpb25Gcm9tKG5ld01hcmtlcnMpO1xuXG4gICAgT2JqZWN0LmFzc2lnbihsaW5lSXRlbS5hc3NldCwgZHVyYXRpb24pO1xuXG4gICAgdGhpcy5lZGl0TGluZUl0ZW0obGluZUl0ZW0sIHt9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRQYXltZW50T3B0aW9ucygpIHtcbiAgICB0aGlzLmFwaS5nZXQoQXBpLk9yZGVycywgJ2NhcnQvcGF5bWVudE9wdGlvbnMnKS5zdWJzY3JpYmUoKG9wdGlvbnM6IFBheW1lbnRPcHRpb25zKSA9PiB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jaGVja291dC5zZXRBdmFpbGFibGVQYXltZW50T3B0aW9ucyhvcHRpb25zKSk7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jaGVja291dC5zZXRTZWxlY3RlZFBheW1lbnRUeXBlKHRoaXMuZGVmYXVsdFBheW1lbnRUeXBlRm9yKG9wdGlvbnMpKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcGF5bWVudE9wdGlvbnNFcXVhbChvcHRpb25zOiBBcnJheTxQYXltZW50T3B0aW9uPik6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnBheW1lbnRPcHRpb25zLm1hcCgocG10T3B0czogUGF5bWVudE9wdGlvbnMpID0+IHtcbiAgICAgIGlmICghcG10T3B0cykgcmV0dXJuIGZhbHNlO1xuICAgICAgcG10T3B0cy5wYXltZW50T3B0aW9ucy5zb3J0KCk7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sZW5ndGggPT09IHBtdE9wdHMucGF5bWVudE9wdGlvbnMubGVuZ3RoICYmXG4gICAgICAgIG9wdGlvbnMuc29ydCgpLmV2ZXJ5KChvcHRpb246IFBheW1lbnRPcHRpb24sIGluZGV4OiBudW1iZXIpID0+IG9wdGlvbiA9PT0gcG10T3B0cy5wYXltZW50T3B0aW9uc1tpbmRleF0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJldHJpZXZlTGljZW5zZUFncmVlbWVudHMoKTogT2JzZXJ2YWJsZTxMaWNlbnNlQWdyZWVtZW50cz4ge1xuICAgIHJldHVybiB0aGlzLmFwaS5nZXQoQXBpLk9yZGVycywgJ2NhcnQvbGljZW5zaW5nJywgeyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH0pO1xuICB9XG5cbiAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gIHByaXZhdGUgZGVmYXVsdFBheW1lbnRUeXBlRm9yKG9wdGlvbnM6IFBheW1lbnRPcHRpb25zKTogUGF5bWVudE9wdGlvbiB7XG4gICAgaWYgKG9wdGlvbnMucGF5bWVudE9wdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5wYXltZW50T3B0aW9uc1swXTtcbiAgICB9XG4gICAgcmV0dXJuICdDcmVkaXRDYXJkJztcbiAgfVxuXG4gIHByaXZhdGUgcHVyY2hhc2VXaXRoQ3JlZGl0Q2FyZCgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIGNvbnN0IG9wdGlvbnM6IFB1cmNoYXNlT3B0aW9ucyA9IHRoaXMucHVyY2hhc2VPcHRpb25zO1xuICAgIHJldHVybiB0aGlzLmFwaS5wb3N0KEFwaS5PcmRlcnMsICdjYXJ0L3N0cmlwZS9wcm9jZXNzJywgeyBib2R5OiB7IG9wdGlvbnMgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KVxuICAgICAgLmRvKCgpID0+IHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5Lm9yZGVyLnNldENoZWNrb3V0U3RhdGUodHJ1ZSkpKTtcbiAgfVxuXG4gIHByaXZhdGUgcHVyY2hhc2VPbkNyZWRpdCgpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIGNvbnN0IG9wdGlvbnM6IFB1cmNoYXNlT3B0aW9ucyA9IHRoaXMuYWRkcmVzc1B1cmNoYXNlT3B0aW9ucztcbiAgICByZXR1cm4gdGhpcy5hcGkucG9zdChBcGkuT3JkZXJzLCAnY2FydC9jaGVja291dC9wdXJjaGFzZU9uQ3JlZGl0JywgeyBib2R5OiB7IG9wdGlvbnMgfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9KVxuICAgICAgLmRvKCgpID0+IHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5Lm9yZGVyLnNldENoZWNrb3V0U3RhdGUodHJ1ZSkpKVxuICAgICAgLm1hcCgob3JkZXI6IE9yZGVyKSA9PiBvcmRlci5pZCk7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdEJvZHkocGFyYW1ldGVyczogQWRkQXNzZXRQYXJhbWV0ZXJzKTogYW55IHtcbiAgICBsZXQgZm9ybWF0dGVkID0ge307XG4gICAgT2JqZWN0LmFzc2lnbihmb3JtYXR0ZWQsIHsgbGluZUl0ZW06IHRoaXMuZm9ybWF0TGluZUl0ZW0ocGFyYW1ldGVycy5saW5lSXRlbSwgcGFyYW1ldGVycy5tYXJrZXJzKSB9KTtcbiAgICBpZiAocGFyYW1ldGVycy5hdHRyaWJ1dGVzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKGZvcm1hdHRlZCwgeyBhdHRyaWJ1dGVzOiBwYXJhbWV0ZXJzLmF0dHJpYnV0ZXMgfSk7XG4gICAgfVxuICAgIHJldHVybiBmb3JtYXR0ZWQ7XG4gIH1cblxuICBwcml2YXRlIGZvcm1hdExpbmVJdGVtKGxpbmVJdGVtOiBhbnksIG1hcmtlcnM6IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLlN1YmNsaXBNYXJrZXJzKTogYW55IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgbGluZUl0ZW0sIHsgYXNzZXQ6IHRoaXMuZm9ybWF0QXNzZXQobGluZUl0ZW0uYXNzZXQsIG1hcmtlcnMpIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRBc3NldChhc3NldDogYW55LCBtYXJrZXJzOiBTdWJjbGlwTWFya2Vyc0ludGVyZmFjZS5TdWJjbGlwTWFya2Vycyk6IGFueSB7XG4gICAgbGV0IHRpbWVTdGFydDogbnVtYmVyO1xuICAgIGxldCB0aW1lRW5kOiBudW1iZXI7XG5cbiAgICBpZiAobWFya2Vycykge1xuICAgICAgY29uc3QgZHVyYXRpb246IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLkR1cmF0aW9uID0gU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuZHVyYXRpb25Gcm9tKG1hcmtlcnMpO1xuICAgICAgdGltZVN0YXJ0ID0gZHVyYXRpb24udGltZVN0YXJ0O1xuICAgICAgdGltZUVuZCA9IGR1cmF0aW9uLnRpbWVFbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRpbWVTdGFydCA9IGFzc2V0LnRpbWVTdGFydDtcbiAgICAgIHRpbWVFbmQgPSBhc3NldC50aW1lRW5kO1xuICAgIH1cblxuICAgIHJldHVybiB7IGFzc2V0SWQ6IGFzc2V0LmFzc2V0SWQsIHRpbWVTdGFydDogdGltZVN0YXJ0ID49IDAgPyB0aW1lU3RhcnQgOiAtMSwgdGltZUVuZDogdGltZUVuZCA+PSAwID8gdGltZUVuZCA6IC0yIH07XG4gIH1cblxuICBwcml2YXRlIGFkZFByb2plY3RBbmRSZXR1cm5PYnNlcnZhYmxlKCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuYXBpLnBvc3QoQXBpLk9yZGVycywgJ2NhcnQvcHJvamVjdCcsIHsgYm9keTogeyBjbGllbnROYW1lOiB0aGlzLmZ1bGxOYW1lIH0sIGxvYWRpbmdJbmRpY2F0b3I6IHRydWUgfSlcbiAgICAgIC5kbyh0aGlzLnJlcGxhY2VDYXJ0V2l0aClcbiAgICAgIC5zaGFyZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZnVsbE5hbWUoKTogc3RyaW5nIHtcbiAgICBsZXQgdXNlck5hbWU6IHN0cmluZztcbiAgICB0aGlzLmN1cnJlbnRVc2VyLmZ1bGxOYW1lKCkudGFrZSgxKS5zdWJzY3JpYmUoZnVsbE5hbWUgPT4gdXNlck5hbWUgPSBmdWxsTmFtZSk7XG4gICAgcmV0dXJuIHVzZXJOYW1lO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZXhpc3RpbmdQcm9qZWN0TmFtZXMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgcmV0dXJuICh0aGlzLnN0YXRlLmRhdGEucHJvamVjdHMgfHwgW10pLm1hcCgocHJvamVjdDogYW55KSA9PiBwcm9qZWN0Lm5hbWUpO1xuICB9XG5cbiAgLy8gVGhpcyBpcyBhbiBcImluc3RhbmNlIGFycm93IGZ1bmN0aW9uXCIsIHdoaWNoIHNhdmVzIHVzIGZyb20gaGF2aW5nIHRvIFwiYmluZCh0aGlzKVwiXG4gIC8vIGV2ZXJ5IHRpbWUgd2UgdXNlIHRoaXMgZnVuY3Rpb24gYXMgYSBjYWxsYmFjay5cbiAgcHJpdmF0ZSByZXBsYWNlQ2FydFdpdGggPSAod2hvbGVDYXJ0UmVzcG9uc2U6IGFueSk6IHZvaWQgPT4ge1xuICAgIC8vIGRpc3BhdGNoaW5nIGEgbG9hZFN1Y2Nlc3MgaGVyZS4uIGV2ZW50dWFsbHksIHdlIGNhbiByZWZhY3RvciB0aGlzIHdoZW4gdGhlIHdob2xlIGNhcnQgaXMgbWlncmF0ZWQgdG8gZWZmZWN0c1xuICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmNhcnQubG9hZFN1Y2Nlc3Mod2hvbGVDYXJ0UmVzcG9uc2UpKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHB1cmNoYXNlT3B0aW9ucygpOiBQdXJjaGFzZU9wdGlvbnMge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLmFkZHJlc3NQdXJjaGFzZU9wdGlvbnMsIHRoaXMuY3JlZGl0Q2FyZFB1cmNoYXNlT3B0aW9ucykgYXMgUHVyY2hhc2VPcHRpb25zO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgYWRkcmVzc1B1cmNoYXNlT3B0aW9ucygpOiBQdXJjaGFzZU9wdGlvbnMge1xuICAgIHJldHVybiB7XG4gICAgICBvcmRlckFkZHJlc3NJZDogdGhpcy5jaGVja291dFN0YXRlLnNlbGVjdGVkQWRkcmVzcy5hZGRyZXNzRW50aXR5SWQsXG4gICAgICBvcmRlckFkZHJlc3NUeXBlOiB0aGlzLmNoZWNrb3V0U3RhdGUuc2VsZWN0ZWRBZGRyZXNzLnR5cGUsXG4gICAgICBwb051bWJlcjogdGhpcy5jaGVja291dFN0YXRlLnB1cmNoYXNlT3JkZXJJZFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldCBjcmVkaXRDYXJkUHVyY2hhc2VPcHRpb25zKCk6IFB1cmNoYXNlT3B0aW9ucyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHN0cmlwZVRva2VuOiB0aGlzLmNoZWNrb3V0U3RhdGUuYXV0aG9yaXphdGlvbi5pZCxcbiAgICAgIHN0cmlwZVRva2VuVHlwZTogdGhpcy5jaGVja291dFN0YXRlLmF1dGhvcml6YXRpb24udHlwZVxuICAgIH07XG4gIH1cbn1cbiJdfQ==
