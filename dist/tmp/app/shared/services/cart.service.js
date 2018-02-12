"use strict";
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
    CartService.decorators = [
        { type: core_1.Injectable },
    ];
    CartService.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
        { type: api_service_1.ApiService, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return CartService;
}());
exports.CartService = CartService;
//# sourceMappingURL=cart.service.js.map