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
var user_interface_1 = require("../../../shared/interfaces/user.interface");
var wz_address_form_component_1 = require("../../../shared/modules/wz-form/components/wz-address-form/wz.address-form.component");
var CommerceBillingTab = (function (_super) {
    __extends(CommerceBillingTab, _super);
    function CommerceBillingTab(userCan, commerceService, user, currentUser, dialog, store) {
        var _this = _super.call(this) || this;
        _this.userCan = userCan;
        _this.commerceService = commerceService;
        _this.user = user;
        _this.currentUser = currentUser;
        _this.dialog = dialog;
        _this.store = store;
        _this.addressErrors = {};
        _this.tabNotify = _this.notify;
        _this.determineNewSelectedAddress = function (addresses) {
            var newSelected;
            _this.store.select(function (state) { return state.checkout; }).take(1).subscribe(function (data) {
                if (data.selectedAddress && typeof data.selectedAddress.addressEntityId !== 'undefined') {
                    newSelected = _this.previouslySelectedAddress;
                }
                else {
                    newSelected = data.addresses.filter(function (a) { return !!a.address; })[0];
                }
            });
            _this.selectAddress(newSelected, false);
        };
        return _this;
    }
    CommerceBillingTab.prototype.typeFor = function (address) {
        return address.type ? address.type : '';
    };
    CommerceBillingTab.prototype.nameFor = function (address) {
        return address.name ? address.name : '';
    };
    CommerceBillingTab.prototype.lineOneFor = function (address) {
        return this.addressJoinSegment(address, 'address', 'address2');
    };
    CommerceBillingTab.prototype.cityFor = function (address) {
        return this.addressSegmentWithComma(address, 'city');
    };
    CommerceBillingTab.prototype.stateFor = function (address) {
        return this.addressSegment(address, 'state');
    };
    CommerceBillingTab.prototype.zipcodeFor = function (address) {
        return this.addressSegmentWithComma(address, 'zipcode');
    };
    CommerceBillingTab.prototype.countryFor = function (address) {
        return this.addressSegment(address, 'country');
    };
    CommerceBillingTab.prototype.phoneFor = function (address) {
        return this.addressSegment(address, 'phone');
    };
    CommerceBillingTab.prototype.addUserAddress = function (form) {
        var _this = this;
        this.user.addBillingAddress(form).subscribe(function (user) {
            _this.fetchAddresses().subscribe(_this.determineNewSelectedAddress);
        });
    };
    CommerceBillingTab.prototype.addAccountAddress = function (form, wholeAddress) {
        var _this = this;
        var newAddress = Object.assign({}, wholeAddress, { address: form });
        this.user.addAccountBillingAddress(newAddress).subscribe(function (account) {
            _this.fetchAddresses().subscribe(_this.determineNewSelectedAddress);
        });
    };
    CommerceBillingTab.prototype.formatAndSelectAddress = function (invoiceContact) {
        var invoiceAddress = Object.assign({
            addressEntityId: invoiceContact.addressId,
            type: invoiceContact.type,
            name: invoiceContact.firstName + " " + invoiceContact.lastName,
            address: invoiceContact.billingInfo.address
        });
        this.selectAddress(invoiceAddress);
    };
    CommerceBillingTab.prototype.selectAddress = function (address, nextTab) {
        if (nextTab === void 0) { nextTab = true; }
        this.store.dispatch(function (factory) { return factory.checkout.setSelectedAddress(address); });
        if (nextTab)
            this.goToNextTab();
    };
    Object.defineProperty(CommerceBillingTab.prototype, "userCanProceed", {
        get: function () {
            return this.store.select(function (state) { return state.checkout; }).map(function (data) {
                if (!data.selectedAddress.address) {
                    return false;
                }
                else {
                    return Object.keys(data.selectedAddress.address).filter(function (k) {
                        return data.selectedAddress.address[k] === '';
                    }).length === 0;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    CommerceBillingTab.prototype.openFormFor = function (resourceType, mode, address) {
        var _this = this;
        var title = mode === 'edit' ? this.editFormTitle(resourceType) : this.createFormTitle(resourceType);
        this.dialog.openComponentInDialog({
            componentType: wz_address_form_component_1.WzAddressFormComponent,
            dialogConfig: { position: { top: '6%' } },
            inputOptions: {
                loaded: this.loaded,
                title: title,
                address: mode === 'edit' ? address.address : null
            },
            outputOptions: [{
                    event: 'onSaveAddress',
                    callback: function (form) {
                        if (typeof form === 'undefined')
                            return;
                        if (resourceType === 'user') {
                            _this.addUserAddress(form);
                        }
                        else {
                            _this.addAccountAddress(form, address);
                        }
                    },
                    closeOnEvent: true
                }]
        });
    };
    CommerceBillingTab.prototype.displayAddressErrors = function (addressId) {
        return this.addressErrors[addressId] && this.addressErrors[addressId].length > 0;
    };
    CommerceBillingTab.prototype.formatAddressErrors = function (address) {
        var errors = this.addressErrors[address.addressEntityId];
        return errors.reduce(function (prev, curr, i) {
            prev += "" + curr;
            if (i < errors.length - 1)
                prev += ', ';
            if (i === errors.length - 2)
                prev += 'and ';
            return prev;
        }, '');
    };
    CommerceBillingTab.prototype.disableSelectBtnFor = function (address) {
        return !address.address ||
            (this.addressErrors[address.addressEntityId] && this.addressErrors[address.addressEntityId].length > 0);
    };
    CommerceBillingTab.prototype.fetchAddresses = function () {
        var _this = this;
        return this.user.getAddresses().do(function (addresses) {
            _this.validate(addresses);
            _this.showAddAddressForm = _this.showAddForm(addresses);
            _this.showEditAddressForm = _this.showEditForm(addresses);
            _this.store.dispatch(function (factory) { return factory.checkout.setAvailableAddresses(addresses); });
        });
    };
    CommerceBillingTab.prototype.addressSegment = function (address, segment) {
        return address.address && address.address[segment] ? address.address[segment] : null;
    };
    CommerceBillingTab.prototype.addressSegmentWithComma = function (address, segment) {
        return this.addressSegment(address, segment) ? this.addressSegment(address, segment) + ',' : '';
    };
    CommerceBillingTab.prototype.addressJoinSegment = function (address, segmentOne, segmentTwo) {
        return (address.address[segmentOne] ? address.address[segmentOne] : '') +
            (address.address[segmentTwo] ? ', ' + address.address[segmentTwo] : '');
    };
    CommerceBillingTab.prototype.editFormTitle = function (resourceType) {
        return "CART.BILLING.EDIT_" + resourceType.toUpperCase() + "_ADDRESS_TITLE";
    };
    CommerceBillingTab.prototype.createFormTitle = function (resourceType) {
        return "CART.BILLING.ADD_" + resourceType.toUpperCase() + "_ADDRESS_TITLE";
    };
    CommerceBillingTab.prototype.showAddForm = function (addresses) {
        return addresses.filter(function (a) { return !!a.address; }).length === 0;
    };
    CommerceBillingTab.prototype.showEditForm = function (addresses) {
        return addresses.filter(function (a) { return !!a.address; }).length === 1 &&
            this.addressErrors[addresses[0].addressEntityId].length > 0;
    };
    Object.defineProperty(CommerceBillingTab.prototype, "previouslySelectedAddress", {
        get: function () {
            var previouslySelected;
            this.store.select(function (state) { return state.checkout; }).take(1).subscribe(function (data) {
                previouslySelected = data.addresses.filter(function (a) {
                    return a.addressEntityId === data.selectedAddress.addressEntityId;
                })[0];
            });
            return previouslySelected;
        },
        enumerable: true,
        configurable: true
    });
    CommerceBillingTab.prototype.validate = function (addresses) {
        var _this = this;
        this.addressErrors = {};
        addresses.forEach(function (address) {
            _this.addressErrors[address.addressEntityId] = [];
            if (!address.address)
                return;
            var actualAddressKeys = Object.keys(address.address);
            user_interface_1.AddressKeys.forEach(function (key) {
                if (actualAddressKeys.indexOf(key) < 0 || address.address[key] === '') {
                    _this.addressErrors[address.addressEntityId].push(key);
                }
            });
        });
    };
    CommerceBillingTab.propDecorators = {
        'loaded': [{ type: core_1.Input },],
        'tabNotify': [{ type: core_1.Output },],
    };
    return CommerceBillingTab;
}(tab_1.Tab));
exports.CommerceBillingTab = CommerceBillingTab;
//# sourceMappingURL=commerce-billing-tab.js.map