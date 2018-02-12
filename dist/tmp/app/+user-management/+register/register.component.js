"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../shared/services/user.service");
var app_store_1 = require("../../app.store");
var wz_terms_component_1 = require("../../shared/components/wz-terms/wz.terms.component");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var RegisterComponent = (function () {
    function RegisterComponent(userService, store, dialogService, ref) {
        this.userService = userService;
        this.store = store;
        this.dialogService = dialogService;
        this.ref = ref;
        this.serverErrors = null;
        this.successfullySubmitted = false;
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.register.config; });
        this.downloadTos();
    };
    RegisterComponent.prototype.onSubmit = function (user) {
        var _this = this;
        Object.assign(user, { termsAgreedTo: this.userService.documentId });
        this.userService.create(user).take(1).subscribe(function (res) {
            _this.successfullySubmitted = true;
            _this.newUser = res;
            _this.ref.markForCheck();
        }, (function (error) {
            if (error.status !== 451)
                _this.serverErrors = error.json();
            _this.ref.markForCheck();
        }));
    };
    RegisterComponent.prototype.openTermsDialog = function () {
        this.dialogService.openComponentInDialog({
            componentType: wz_terms_component_1.WzTermsComponent,
            inputOptions: {
                terms: this.terms,
                btnLabel: 'REGISTER.CLOSE_TOS_DIALOG',
                header: 'REGISTER.TOS_TITLE'
            }
        });
    };
    RegisterComponent.prototype.downloadTos = function () {
        var _this = this;
        this.userService.downloadActiveTosDocument().take(1).subscribe(function (terms) {
            _this.terms = terms;
        });
    };
    RegisterComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'register-component',
                    templateUrl: 'register.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    RegisterComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: app_store_1.AppStore, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map