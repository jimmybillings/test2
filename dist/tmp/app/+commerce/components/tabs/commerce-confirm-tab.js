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
var CommerceConfirmTab = (function (_super) {
    __extends(CommerceConfirmTab, _super);
    function CommerceConfirmTab(router, commerceService, dialogService, userCan, store) {
        var _this = _super.call(this) || this;
        _this.router = router;
        _this.commerceService = commerceService;
        _this.dialogService = dialogService;
        _this.userCan = userCan;
        _this.store = store;
        _this.tabNotify = _this.notify;
        _this.licensesAreAgreedTo = false;
        return _this;
    }
    Object.defineProperty(CommerceConfirmTab.prototype, "hasDiscount", {
        get: function () {
            return !!this.commerceService.state.data.discount;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "orderInProgress", {
        get: function () {
            return this.store.select(function (state) { return state.checkout; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "data", {
        get: function () {
            return this.commerceService.data.map(function (state) { return state.data; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "projects", {
        get: function () {
            return this.commerceService.projects;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "paymentType", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.selectedPaymentType; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "purchaseOrderId", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.purchaseOrderId; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "showPurchaseBtn", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.selectedPaymentType === 'CreditCard'; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommerceConfirmTab.prototype, "showPurchaseOnCreditBtn", {
        get: function () {
            return this.store.select(function (state) { return state.checkout.selectedPaymentType === 'PurchaseOnCredit'; });
        },
        enumerable: true,
        configurable: true
    });
    CommerceConfirmTab.prototype.purchase = function () {
        var _this = this;
        this.commerceService.purchase().subscribe(function (orderId) {
            return _this.router.navigate(['/orders', orderId]);
        }, function (error) { });
    };
    CommerceConfirmTab.prototype.format = function (address) {
        if (address.address) {
            return Object.keys(address.address).reduce(function (previous, current) {
                if (current === 'address' || current === 'zipcode' || current === 'phone') {
                    previous += address.address[current] + "<br>";
                }
                else {
                    previous += address.address[current] + ", ";
                }
                return previous;
            }, '');
        }
        else {
            return "There is no address on record for this " + address.type;
        }
    };
    CommerceConfirmTab.prototype.lineOneFor = function (address) {
        return this.addressJoinSegment(address, 'address', 'address2');
    };
    CommerceConfirmTab.prototype.cityFor = function (address) {
        return this.addressSegmentWithComma(address, 'city');
    };
    CommerceConfirmTab.prototype.stateFor = function (address) {
        return this.addressSegment(address, 'state');
    };
    CommerceConfirmTab.prototype.zipcodeFor = function (address) {
        return this.addressSegmentWithComma(address, 'zipcode');
    };
    CommerceConfirmTab.prototype.countryFor = function (address) {
        return this.addressSegment(address, 'country');
    };
    CommerceConfirmTab.prototype.phoneFor = function (address) {
        return this.addressSegment(address, 'phone');
    };
    CommerceConfirmTab.prototype.addressSegment = function (address, segment) {
        return address.address && address.address[segment] ? address.address[segment] : null;
    };
    CommerceConfirmTab.prototype.addressSegmentWithComma = function (address, segment) {
        return this.addressSegment(address, segment) ? this.addressSegment(address, segment) + ',' : '';
    };
    CommerceConfirmTab.prototype.addressJoinSegment = function (address, segmentOne, segmentTwo) {
        return (address.address[segmentOne] ? address.address[segmentOne] : '') +
            (address.address[segmentTwo] ? ', ' + address.address[segmentTwo] : '');
    };
    CommerceConfirmTab.propDecorators = {
        'tabNotify': [{ type: core_1.Output },],
    };
    return CommerceConfirmTab;
}(tab_1.Tab));
exports.CommerceConfirmTab = CommerceConfirmTab;
//# sourceMappingURL=commerce-confirm-tab.js.map