"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var current_user_service_1 = require("../../shared/services/current-user.service");
var user_service_1 = require("../../shared/services/user.service");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var wz_address_form_component_1 = require("../../shared/modules/wz-form/components/wz-address-form/wz.address-form.component");
var app_store_1 = require("../../app.store");
var ProfileComponent = (function () {
    function ProfileComponent(currentUser, dialogService, userService, changeDetectorRef, store) {
        var _this = this;
        this.currentUser = currentUser;
        this.dialogService = dialogService;
        this.userService = userService;
        this.changeDetectorRef = changeDetectorRef;
        this.store = store;
        this.addBillingAddress = function (form) {
            _this.userService.addBillingAddress(form).subscribe();
        };
        this.changeBasicInfo = function (form) {
            _this.userService.changeBasicInfo(form).subscribe();
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userSubscription = this.currentUser.data.subscribe(function (user) {
            _this.user = user;
            _this.changeDetectorRef.detectChanges();
        });
        this.basicInfoConfig = this.store.snapshotCloned(function (state) { return state.uiConfig.components.userBasicInfo.config.form.items; });
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.userSubscription.unsubscribe();
    };
    ProfileComponent.prototype.onClickEditBasicInfoButton = function () {
        var _this = this;
        var prefilledFields = [];
        this.basicInfoConfig.forEach(function (formField) {
            prefilledFields.push(Object.assign({}, formField, { value: _this.user[formField.name] }));
        });
        this.dialogService.openFormDialog(prefilledFields, {
            title: 'PROFILE.BASIC_INFO.EDIT_BTN_LABEL',
            submitLabel: 'PROFILE.BASIC_INFO.UPDATE_BTN_LABEL'
        }, this.changeBasicInfo);
    };
    ProfileComponent.prototype.onClickEditAddressButton = function () {
        this.dialogService.openComponentInDialog({
            componentType: wz_address_form_component_1.WzAddressFormComponent,
            dialogConfig: { disableClose: true },
            inputOptions: {
                address: this.user.billingInfo ? this.user.billingInfo.address : { address: null },
                loaded: true,
                title: 'PROFILE.BASIC_INFO.BILLING_ADDRESS_EDIT_BTN_LABEL',
                includeCloseButton: true
            },
            outputOptions: [{
                    event: 'onSaveAddress',
                    callback: this.addBillingAddress,
                    closeOnEvent: true
                }]
        });
    };
    ProfileComponent.prototype.getBillingAddressInfo = function (segment) {
        if (this.user.billingInfo && this.user.billingInfo.address) {
            return this.user.billingInfo.address[segment] ? this.user.billingInfo.address[segment] : '';
        }
        else {
            return '';
        }
    };
    ProfileComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'profile-component',
                    templateUrl: 'profile.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    ProfileComponent.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: user_service_1.UserService, },
        { type: core_1.ChangeDetectorRef, },
        { type: app_store_1.AppStore, },
    ]; };
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map