"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../shared/services/user.service");
var app_store_1 = require("../../app.store");
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(user, store, ref) {
        this.user = user;
        this.store = store;
        this.ref = ref;
        this.successfullySubmitted = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.forgotPassword.config; });
    };
    ForgotPasswordComponent.prototype.onSubmit = function (user) {
        this.user.forgotPassword(user).subscribe();
        this.successfullySubmitted = true;
        this.ref.markForCheck();
    };
    ForgotPasswordComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'forgot-password-component',
                    templateUrl: 'forgot-password.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    ForgotPasswordComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: app_store_1.AppStore, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgot-password.component.js.map