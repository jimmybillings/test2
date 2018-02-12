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
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.setPurchaseOrderId = function (purchaseOrderId) {
        return new SetPurchaseOrderId(purchaseOrderId);
    };
    ActionFactory.prototype.setAvailablePaymentOptions = function (paymentOptions) {
        return new SetAvailablePaymentOptions(paymentOptions);
    };
    ActionFactory.prototype.setSelectedPaymentType = function (paymentType) {
        return new SetSelectedPaymentType(paymentType);
    };
    ActionFactory.prototype.setAvailableAddresses = function (addresses) {
        return new SetAvailableAddresses(addresses);
    };
    ActionFactory.prototype.setSelectedAddress = function (address) {
        return new SetSelectedAddress(address);
    };
    ActionFactory.prototype.setCreditCardAuthorization = function (authorization) {
        return new SetCreditCardAuthorization(authorization);
    };
    ActionFactory.prototype.reset = function () {
        return new Reset();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var SetPurchaseOrderId = (function () {
    function SetPurchaseOrderId(purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
        this.type = SetPurchaseOrderId.Type;
    }
    SetPurchaseOrderId.Type = '[Checkout] Set Purchase Order Id';
    return SetPurchaseOrderId;
}());
exports.SetPurchaseOrderId = SetPurchaseOrderId;
var SetAvailablePaymentOptions = (function () {
    function SetAvailablePaymentOptions(paymentOptions) {
        this.paymentOptions = paymentOptions;
        this.type = SetAvailablePaymentOptions.Type;
    }
    SetAvailablePaymentOptions.Type = '[Checkout] Set Available Payment Options';
    return SetAvailablePaymentOptions;
}());
exports.SetAvailablePaymentOptions = SetAvailablePaymentOptions;
var SetSelectedPaymentType = (function () {
    function SetSelectedPaymentType(selectedPaymentType) {
        this.selectedPaymentType = selectedPaymentType;
        this.type = SetSelectedPaymentType.Type;
    }
    SetSelectedPaymentType.Type = '[Checkout] Set Selected Payment Type';
    return SetSelectedPaymentType;
}());
exports.SetSelectedPaymentType = SetSelectedPaymentType;
var SetAvailableAddresses = (function () {
    function SetAvailableAddresses(addresses) {
        this.addresses = addresses;
        this.type = SetAvailableAddresses.Type;
    }
    SetAvailableAddresses.Type = '[Checkout] Set Available Addresses';
    return SetAvailableAddresses;
}());
exports.SetAvailableAddresses = SetAvailableAddresses;
var SetSelectedAddress = (function () {
    function SetSelectedAddress(selectedAddress) {
        this.selectedAddress = selectedAddress;
        this.type = SetSelectedAddress.Type;
    }
    SetSelectedAddress.Type = '[Checkout] Set Selected Address';
    return SetSelectedAddress;
}());
exports.SetSelectedAddress = SetSelectedAddress;
var SetCreditCardAuthorization = (function () {
    function SetCreditCardAuthorization(authorization) {
        this.authorization = authorization;
        this.type = SetCreditCardAuthorization.Type;
    }
    SetCreditCardAuthorization.Type = '[Checkout] Set Credit Card Authorization';
    return SetCreditCardAuthorization;
}());
exports.SetCreditCardAuthorization = SetCreditCardAuthorization;
var Reset = (function () {
    function Reset() {
        this.type = Reset.Type;
    }
    Reset.Type = '[Checkout] Reset';
    return Reset;
}());
exports.Reset = Reset;
//# sourceMappingURL=checkout.actions.js.map