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
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], CommerceBillingTab.prototype, "loaded", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CommerceBillingTab.prototype, "tabNotify", void 0);
    return CommerceBillingTab;
}(tab_1.Tab));
exports.CommerceBillingTab = CommerceBillingTab;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy90YWJzL2NvbW1lcmNlLWJpbGxpbmctdGFiLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUFnRztBQUloRyw2QkFBNEI7QUFLNUIsNEVBQW9HO0FBR3BHLGtJQUE4SDtBQU05SDtJQUF3QyxzQ0FBRztJQVV6Qyw0QkFDUyxPQUE2QixFQUMxQixlQUEyQyxFQUMzQyxJQUFpQixFQUNqQixXQUErQixFQUMvQixNQUF1QixFQUN2QixLQUFlO1FBTjNCLFlBUUUsaUJBQU8sU0FDUjtRQVJRLGFBQU8sR0FBUCxPQUFPLENBQXNCO1FBQzFCLHFCQUFlLEdBQWYsZUFBZSxDQUE0QjtRQUMzQyxVQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLGlCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixZQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUN2QixXQUFLLEdBQUwsS0FBSyxDQUFVO1FBZHBCLG1CQUFhLEdBQVMsRUFBRSxDQUFDO1FBTXRCLGVBQVMsR0FBeUIsS0FBSSxDQUFDLE1BQU0sQ0FBQztRQWdMaEQsaUNBQTJCLEdBQUcsVUFBQyxTQUE2QjtZQUNsRSxJQUFJLFdBQXdCLENBQUM7WUFDN0IsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxFQUFkLENBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFtQjtnQkFDL0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsSUFBSSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxLQUFLLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3hGLFdBQVcsR0FBRyxLQUFJLENBQUMseUJBQXlCLENBQUM7Z0JBQy9DLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sV0FBVyxHQUFHLElBQUksQ0FB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cG9uZW50cy90YWJzL2NvbW1lcmNlLWJpbGxpbmctdGFiLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcblxuaW1wb3J0IHsgVGFiIH0gZnJvbSAnLi90YWInO1xuaW1wb3J0IHsgQ2FydFNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvY2FydC5zZXJ2aWNlJztcbmltcG9ydCB7IFF1b3RlU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9xdW90ZS5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWRkcmVzcywgVXNlciwgVmlld0FkZHJlc3MsIEFkZHJlc3NLZXlzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgUm93Rm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21tZXJjZUNhcGFiaWxpdGllcyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbW1lcmNlLmNhcGFiaWxpdGllcyc7XG5pbXBvcnQgeyBXekFkZHJlc3NGb3JtQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZm9ybS9jb21wb25lbnRzL3d6LWFkZHJlc3MtZm9ybS93ei5hZGRyZXNzLWZvcm0uY29tcG9uZW50JztcbmltcG9ydCB7IFd6RGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9zZXJ2aWNlcy93ei5kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBTZW5kRGV0YWlsc0ludm9pY2VDb250YWN0IH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFwcFN0b3JlLCBDaGVja291dFN0YXRlIH0gZnJvbSAnLi4vLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IFBvam8gfSBmcm9tICcuLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIENvbW1lcmNlQmlsbGluZ1RhYiBleHRlbmRzIFRhYiB7XG4gIHB1YmxpYyBvcmRlckluUHJvZ3Jlc3M6IE9ic2VydmFibGU8Q2hlY2tvdXRTdGF0ZT47XG4gIHB1YmxpYyBhZGRyZXNzRXJyb3JzOiBQb2pvID0ge307XG4gIHB1YmxpYyBzaG93QWRkQWRkcmVzc0Zvcm06IGJvb2xlYW47XG4gIHB1YmxpYyBzaG93RWRpdEFkZHJlc3NGb3JtOiBib29sZWFuO1xuICBwdWJsaWMgcXVvdGVCaWxsaW5nQWNjb3VudEluZm86IE9ic2VydmFibGU8U2VuZERldGFpbHNJbnZvaWNlQ29udGFjdD47XG4gIHB1YmxpYyBxdW90ZUludm9pY2VDb250YWN0SW5mbzogT2JzZXJ2YWJsZTxWaWV3QWRkcmVzcz47XG4gIEBJbnB1dCgpIGxvYWRlZDogYm9vbGVhbjtcbiAgQE91dHB1dCgpIHRhYk5vdGlmeTogRXZlbnRFbWl0dGVyPE9iamVjdD4gPSB0aGlzLm5vdGlmeTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgdXNlckNhbjogQ29tbWVyY2VDYXBhYmlsaXRpZXMsXG4gICAgcHJvdGVjdGVkIGNvbW1lcmNlU2VydmljZTogQ2FydFNlcnZpY2UgfCBRdW90ZVNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIHVzZXI6IFVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBkaWFsb2c6IFd6RGlhbG9nU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgc3RvcmU6IEFwcFN0b3JlXG4gICkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgdHlwZUZvcihhZGRyZXNzOiBWaWV3QWRkcmVzcyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGFkZHJlc3MudHlwZSA/IGFkZHJlc3MudHlwZSA6ICcnO1xuICB9XG5cbiAgcHVibGljIG5hbWVGb3IoYWRkcmVzczogVmlld0FkZHJlc3MpOiBzdHJpbmcge1xuICAgIHJldHVybiBhZGRyZXNzLm5hbWUgPyBhZGRyZXNzLm5hbWUgOiAnJztcbiAgfVxuXG4gIHB1YmxpYyBsaW5lT25lRm9yKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzSm9pblNlZ21lbnQoYWRkcmVzcywgJ2FkZHJlc3MnLCAnYWRkcmVzczInKTtcbiAgfVxuXG4gIHB1YmxpYyBjaXR5Rm9yKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzU2VnbWVudFdpdGhDb21tYShhZGRyZXNzLCAnY2l0eScpO1xuICB9XG5cbiAgcHVibGljIHN0YXRlRm9yKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzU2VnbWVudChhZGRyZXNzLCAnc3RhdGUnKTtcbiAgfVxuXG4gIHB1YmxpYyB6aXBjb2RlRm9yKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzU2VnbWVudFdpdGhDb21tYShhZGRyZXNzLCAnemlwY29kZScpO1xuICB9XG5cbiAgcHVibGljIGNvdW50cnlGb3IoYWRkcmVzczogVmlld0FkZHJlc3MpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3NTZWdtZW50KGFkZHJlc3MsICdjb3VudHJ5Jyk7XG4gIH1cblxuICBwdWJsaWMgcGhvbmVGb3IoYWRkcmVzczogVmlld0FkZHJlc3MpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3NTZWdtZW50KGFkZHJlc3MsICdwaG9uZScpO1xuICB9XG5cbiAgcHVibGljIGFkZFVzZXJBZGRyZXNzKGZvcm06IEFkZHJlc3MpOiB2b2lkIHtcbiAgICB0aGlzLnVzZXIuYWRkQmlsbGluZ0FkZHJlc3MoZm9ybSkuc3Vic2NyaWJlKCh1c2VyOiBVc2VyKSA9PiB7XG4gICAgICB0aGlzLmZldGNoQWRkcmVzc2VzKCkuc3Vic2NyaWJlKHRoaXMuZGV0ZXJtaW5lTmV3U2VsZWN0ZWRBZGRyZXNzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBY2NvdW50QWRkcmVzcyhmb3JtOiBBZGRyZXNzLCB3aG9sZUFkZHJlc3M6IFZpZXdBZGRyZXNzKTogdm9pZCB7XG4gICAgbGV0IG5ld0FkZHJlc3M6IFZpZXdBZGRyZXNzID0gT2JqZWN0LmFzc2lnbih7fSwgd2hvbGVBZGRyZXNzLCB7IGFkZHJlc3M6IGZvcm0gfSk7XG4gICAgdGhpcy51c2VyLmFkZEFjY291bnRCaWxsaW5nQWRkcmVzcyhuZXdBZGRyZXNzKS5zdWJzY3JpYmUoKGFjY291bnQ6IGFueSkgPT4ge1xuICAgICAgdGhpcy5mZXRjaEFkZHJlc3NlcygpLnN1YnNjcmliZSh0aGlzLmRldGVybWluZU5ld1NlbGVjdGVkQWRkcmVzcyk7XG4gICAgfSk7XG4gIH1cbiAgLy8gSG9wZWZ1bGx5IHRoaXMgY2FuIGJlIHJlbW92ZWQgYXQgc29tZSBwb2ludC4gKEpIKVxuICAvLyBDdXJyZW50bHkgaW4gYSBxdW90ZSB0aGUgaW52b2ljZUNvbnRhY3QgZGF0YSBpcyBub3QgcmV0dXJuZWQgbGlrZSBtb3N0IHVzZXIgQWRkcmVzc2VzIChWaWV3QWRkcmVzcylcbiAgLy8gV2UgcmVmb3JtYXQgaXQgaGVyZSBzbyB3ZSBzdGlsbCBzb21ldGhpbmcgdG8gZGlzcGxheSBpbiB0aGUgY29uZmlybWF0aW9uLCB3aGVuIGEgbWFpbCBhZGRyZXNzIGlzIGFic2VudC5cbiAgcHVibGljIGZvcm1hdEFuZFNlbGVjdEFkZHJlc3MoaW52b2ljZUNvbnRhY3Q6IFBvam8pOiB2b2lkIHtcbiAgICBsZXQgaW52b2ljZUFkZHJlc3M6IFZpZXdBZGRyZXNzID0gT2JqZWN0LmFzc2lnbih7XG4gICAgICBhZGRyZXNzRW50aXR5SWQ6IGludm9pY2VDb250YWN0LmFkZHJlc3NJZCxcbiAgICAgIHR5cGU6IGludm9pY2VDb250YWN0LnR5cGUsXG4gICAgICBuYW1lOiBgJHtpbnZvaWNlQ29udGFjdC5maXJzdE5hbWV9ICR7aW52b2ljZUNvbnRhY3QubGFzdE5hbWV9YCxcbiAgICAgIGFkZHJlc3M6IGludm9pY2VDb250YWN0LmJpbGxpbmdJbmZvLmFkZHJlc3NcbiAgICB9KTtcbiAgICB0aGlzLnNlbGVjdEFkZHJlc3MoaW52b2ljZUFkZHJlc3MpO1xuICB9XG5cbiAgcHVibGljIHNlbGVjdEFkZHJlc3MoYWRkcmVzczogVmlld0FkZHJlc3MsIG5leHRUYWI6IGJvb2xlYW4gPSB0cnVlKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkuY2hlY2tvdXQuc2V0U2VsZWN0ZWRBZGRyZXNzKGFkZHJlc3MpKTtcbiAgICBpZiAobmV4dFRhYikgdGhpcy5nb1RvTmV4dFRhYigpO1xuICB9XG5cbiAgcHVibGljIGdldCB1c2VyQ2FuUHJvY2VlZCgpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gdGhpcy5zdG9yZS5zZWxlY3Qoc3RhdGUgPT4gc3RhdGUuY2hlY2tvdXQpLm1hcCgoZGF0YTogQ2hlY2tvdXRTdGF0ZSkgPT4ge1xuICAgICAgaWYgKCFkYXRhLnNlbGVjdGVkQWRkcmVzcy5hZGRyZXNzKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhkYXRhLnNlbGVjdGVkQWRkcmVzcy5hZGRyZXNzKS5maWx0ZXIoKGs6IHN0cmluZykgPT4ge1xuICAgICAgICAgIHJldHVybiBkYXRhLnNlbGVjdGVkQWRkcmVzcy5hZGRyZXNzW2tdID09PSAnJztcbiAgICAgICAgfSkubGVuZ3RoID09PSAwO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9wZW5Gb3JtRm9yKHJlc291cmNlVHlwZTogJ2FjY291bnQnIHwgJ3VzZXInLCBtb2RlOiAnZWRpdCcgfCAnY3JlYXRlJywgYWRkcmVzcz86IFZpZXdBZGRyZXNzKTogdm9pZCB7XG4gICAgbGV0IHRpdGxlOiBzdHJpbmcgPSBtb2RlID09PSAnZWRpdCcgPyB0aGlzLmVkaXRGb3JtVGl0bGUocmVzb3VyY2VUeXBlKSA6IHRoaXMuY3JlYXRlRm9ybVRpdGxlKHJlc291cmNlVHlwZSk7XG4gICAgdGhpcy5kaWFsb2cub3BlbkNvbXBvbmVudEluRGlhbG9nKFxuICAgICAge1xuICAgICAgICBjb21wb25lbnRUeXBlOiBXekFkZHJlc3NGb3JtQ29tcG9uZW50LFxuICAgICAgICBkaWFsb2dDb25maWc6IHsgcG9zaXRpb246IHsgdG9wOiAnNiUnIH0gfSxcbiAgICAgICAgaW5wdXRPcHRpb25zOiB7XG4gICAgICAgICAgbG9hZGVkOiB0aGlzLmxvYWRlZCxcbiAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgYWRkcmVzczogbW9kZSA9PT0gJ2VkaXQnID8gYWRkcmVzcy5hZGRyZXNzIDogbnVsbFxuICAgICAgICB9LFxuICAgICAgICBvdXRwdXRPcHRpb25zOiBbe1xuICAgICAgICAgIGV2ZW50OiAnb25TYXZlQWRkcmVzcycsXG4gICAgICAgICAgY2FsbGJhY2s6IChmb3JtOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZm9ybSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChyZXNvdXJjZVR5cGUgPT09ICd1c2VyJykge1xuICAgICAgICAgICAgICB0aGlzLmFkZFVzZXJBZGRyZXNzKGZvcm0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5hZGRBY2NvdW50QWRkcmVzcyhmb3JtLCBhZGRyZXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGNsb3NlT25FdmVudDogdHJ1ZVxuICAgICAgICB9XVxuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgZGlzcGxheUFkZHJlc3NFcnJvcnMoYWRkcmVzc0lkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5hZGRyZXNzRXJyb3JzW2FkZHJlc3NJZF0gJiYgdGhpcy5hZGRyZXNzRXJyb3JzW2FkZHJlc3NJZF0ubGVuZ3RoID4gMDtcbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXRBZGRyZXNzRXJyb3JzKGFkZHJlc3M6IFZpZXdBZGRyZXNzKTogc3RyaW5nIHtcbiAgICBsZXQgZXJyb3JzOiBBcnJheTxzdHJpbmc+ID0gdGhpcy5hZGRyZXNzRXJyb3JzW2FkZHJlc3MuYWRkcmVzc0VudGl0eUlkXTtcbiAgICByZXR1cm4gZXJyb3JzLnJlZHVjZSgocHJldjogc3RyaW5nLCBjdXJyOiBzdHJpbmcsIGk6IG51bWJlcikgPT4ge1xuICAgICAgcHJldiArPSBgJHtjdXJyfWA7XG4gICAgICBpZiAoaSA8IGVycm9ycy5sZW5ndGggLSAxKSBwcmV2ICs9ICcsICc7XG4gICAgICBpZiAoaSA9PT0gZXJyb3JzLmxlbmd0aCAtIDIpIHByZXYgKz0gJ2FuZCAnO1xuICAgICAgcmV0dXJuIHByZXY7XG4gICAgfSwgJycpO1xuICB9XG5cbiAgcHVibGljIGRpc2FibGVTZWxlY3RCdG5Gb3IoYWRkcmVzczogVmlld0FkZHJlc3MpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWFkZHJlc3MuYWRkcmVzcyB8fFxuICAgICAgKHRoaXMuYWRkcmVzc0Vycm9yc1thZGRyZXNzLmFkZHJlc3NFbnRpdHlJZF0gJiYgdGhpcy5hZGRyZXNzRXJyb3JzW2FkZHJlc3MuYWRkcmVzc0VudGl0eUlkXS5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIHB1YmxpYyBmZXRjaEFkZHJlc3NlcygpOiBPYnNlcnZhYmxlPEFycmF5PFZpZXdBZGRyZXNzPj4ge1xuICAgIHJldHVybiB0aGlzLnVzZXIuZ2V0QWRkcmVzc2VzKCkuZG8oKGFkZHJlc3NlczogQXJyYXk8Vmlld0FkZHJlc3M+KSA9PiB7XG4gICAgICB0aGlzLnZhbGlkYXRlKGFkZHJlc3Nlcyk7XG4gICAgICB0aGlzLnNob3dBZGRBZGRyZXNzRm9ybSA9IHRoaXMuc2hvd0FkZEZvcm0oYWRkcmVzc2VzKTtcbiAgICAgIHRoaXMuc2hvd0VkaXRBZGRyZXNzRm9ybSA9IHRoaXMuc2hvd0VkaXRGb3JtKGFkZHJlc3Nlcyk7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5jaGVja291dC5zZXRBdmFpbGFibGVBZGRyZXNzZXMoYWRkcmVzc2VzKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFkZHJlc3NTZWdtZW50KGFkZHJlc3M6IFZpZXdBZGRyZXNzLCBzZWdtZW50OiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgICByZXR1cm4gYWRkcmVzcy5hZGRyZXNzICYmIGFkZHJlc3MuYWRkcmVzc1tzZWdtZW50XSA/IGFkZHJlc3MuYWRkcmVzc1tzZWdtZW50XSA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIGFkZHJlc3NTZWdtZW50V2l0aENvbW1hKGFkZHJlc3M6IFZpZXdBZGRyZXNzLCBzZWdtZW50OiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3NTZWdtZW50KGFkZHJlc3MsIHNlZ21lbnQpID8gdGhpcy5hZGRyZXNzU2VnbWVudChhZGRyZXNzLCBzZWdtZW50KSArICcsJyA6ICcnO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRyZXNzSm9pblNlZ21lbnQoYWRkcmVzczogVmlld0FkZHJlc3MsIHNlZ21lbnRPbmU6IHN0cmluZywgc2VnbWVudFR3bzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gKGFkZHJlc3MuYWRkcmVzc1tzZWdtZW50T25lXSA/IGFkZHJlc3MuYWRkcmVzc1tzZWdtZW50T25lXSA6ICcnKSArXG4gICAgICAoYWRkcmVzcy5hZGRyZXNzW3NlZ21lbnRUd29dID8gJywgJyArIGFkZHJlc3MuYWRkcmVzc1tzZWdtZW50VHdvXSA6ICcnKTtcbiAgfVxuXG4gIHByaXZhdGUgZWRpdEZvcm1UaXRsZShyZXNvdXJjZVR5cGU6ICd1c2VyJyB8ICdhY2NvdW50Jyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBDQVJULkJJTExJTkcuRURJVF8ke3Jlc291cmNlVHlwZS50b1VwcGVyQ2FzZSgpfV9BRERSRVNTX1RJVExFYDtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlRm9ybVRpdGxlKHJlc291cmNlVHlwZTogJ3VzZXInIHwgJ2FjY291bnQnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYENBUlQuQklMTElORy5BRERfJHtyZXNvdXJjZVR5cGUudG9VcHBlckNhc2UoKX1fQUREUkVTU19USVRMRWA7XG4gIH1cblxuICAvLyBJZiBHRVQgL2N1cnJlbnRVc2Vyc0Fzc29jaWF0ZWRBZGRyZXNzZXMgZG9lcyBub3QgcmV0dXJuIEFOWSBhZGRyZXNzZXMsXG4gIC8vIHdlIGF1dG9tYXRpY2FsbHkgc2hvdyB0aGUgYWRkIGZvcm0gZm9yIGEgbmV3IHVzZXIgYWRkcmVzc1xuICBwcml2YXRlIHNob3dBZGRGb3JtKGFkZHJlc3NlczogQXJyYXk8Vmlld0FkZHJlc3M+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGFkZHJlc3Nlcy5maWx0ZXIoKGE6IFZpZXdBZGRyZXNzKSA9PiAhIWEuYWRkcmVzcykubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgLy8gaWYgR0VUIC9jdXJyZW50VXNlcnNBc3NvY2lhdGVkQWRkcmVzc2VzIHJldHVybnMgb25seSAxIGFkZHJlc3MsIGJ1dCBpdCBpcyBub3QgY29tcGxldGUsXG4gIC8vIHdlIGF1dG9tYXRpY2FsbHkgc2hvdyB0aGUgZWRpdCBmb3JtIGZvciB0aGF0IGFkZHJlc3NcbiAgcHJpdmF0ZSBzaG93RWRpdEZvcm0oYWRkcmVzc2VzOiBBcnJheTxWaWV3QWRkcmVzcz4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gYWRkcmVzc2VzLmZpbHRlcigoYTogVmlld0FkZHJlc3MpID0+ICEhYS5hZGRyZXNzKS5sZW5ndGggPT09IDEgJiZcbiAgICAgIHRoaXMuYWRkcmVzc0Vycm9yc1thZGRyZXNzZXNbMF0uYWRkcmVzc0VudGl0eUlkXS5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXRlcm1pbmVOZXdTZWxlY3RlZEFkZHJlc3MgPSAoYWRkcmVzc2VzOiBBcnJheTxWaWV3QWRkcmVzcz4pID0+IHtcbiAgICBsZXQgbmV3U2VsZWN0ZWQ6IFZpZXdBZGRyZXNzO1xuICAgIHRoaXMuc3RvcmUuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmNoZWNrb3V0KS50YWtlKDEpLnN1YnNjcmliZSgoZGF0YTogQ2hlY2tvdXRTdGF0ZSkgPT4ge1xuICAgICAgaWYgKGRhdGEuc2VsZWN0ZWRBZGRyZXNzICYmIHR5cGVvZiBkYXRhLnNlbGVjdGVkQWRkcmVzcy5hZGRyZXNzRW50aXR5SWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5ld1NlbGVjdGVkID0gdGhpcy5wcmV2aW91c2x5U2VsZWN0ZWRBZGRyZXNzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3U2VsZWN0ZWQgPSBkYXRhLmFkZHJlc3Nlcy5maWx0ZXIoKGE6IFZpZXdBZGRyZXNzKSA9PiAhIWEuYWRkcmVzcylbMF07XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zZWxlY3RBZGRyZXNzKG5ld1NlbGVjdGVkLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGdldCBwcmV2aW91c2x5U2VsZWN0ZWRBZGRyZXNzKCk6IFZpZXdBZGRyZXNzIHtcbiAgICBsZXQgcHJldmlvdXNseVNlbGVjdGVkOiBWaWV3QWRkcmVzcztcbiAgICB0aGlzLnN0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jaGVja291dCkudGFrZSgxKS5zdWJzY3JpYmUoKGRhdGE6IENoZWNrb3V0U3RhdGUpID0+IHtcbiAgICAgIHByZXZpb3VzbHlTZWxlY3RlZCA9IGRhdGEuYWRkcmVzc2VzLmZpbHRlcigoYTogVmlld0FkZHJlc3MpID0+IHtcbiAgICAgICAgcmV0dXJuIGEuYWRkcmVzc0VudGl0eUlkID09PSBkYXRhLnNlbGVjdGVkQWRkcmVzcy5hZGRyZXNzRW50aXR5SWQ7XG4gICAgICB9KVswXTtcbiAgICB9KTtcbiAgICByZXR1cm4gcHJldmlvdXNseVNlbGVjdGVkO1xuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZShhZGRyZXNzZXM6IEFycmF5PFZpZXdBZGRyZXNzPik6IHZvaWQge1xuICAgIHRoaXMuYWRkcmVzc0Vycm9ycyA9IHt9O1xuICAgIGFkZHJlc3Nlcy5mb3JFYWNoKChhZGRyZXNzOiBWaWV3QWRkcmVzcykgPT4ge1xuICAgICAgdGhpcy5hZGRyZXNzRXJyb3JzW2FkZHJlc3MuYWRkcmVzc0VudGl0eUlkXSA9IFtdO1xuICAgICAgaWYgKCFhZGRyZXNzLmFkZHJlc3MpIHJldHVybjtcbiAgICAgIGxldCBhY3R1YWxBZGRyZXNzS2V5czogQXJyYXk8U3RyaW5nPiA9IE9iamVjdC5rZXlzKGFkZHJlc3MuYWRkcmVzcyk7XG4gICAgICBBZGRyZXNzS2V5cy5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoYWN0dWFsQWRkcmVzc0tleXMuaW5kZXhPZihrZXkpIDwgMCB8fCBhZGRyZXNzLmFkZHJlc3Nba2V5XSA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLmFkZHJlc3NFcnJvcnNbYWRkcmVzcy5hZGRyZXNzRW50aXR5SWRdLnB1c2goa2V5KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
