"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var user_service_1 = require("../../shared/services/user.service");
var app_store_1 = require("../../app.store");
var current_user_service_1 = require("../../shared/services/current-user.service");
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(user, store, route, router, currentUser, ref) {
        var _this = this;
        this.user = user;
        this.store = store;
        this.route = route;
        this.router = router;
        this.currentUser = currentUser;
        this.ref = ref;
        this.serverErrors = null;
        this.handleSuccess = function () {
            _this.router.navigate(['/']);
            _this.store.dispatch(function (factory) { return factory.snackbar.display('RESETPASSWORD.PASSWORD_CHANGED'); });
            _this.ref.markForCheck();
        };
        this.handleError = function (error) {
            _this.serverErrors = error.json();
            _this.ref.markForCheck();
        };
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        this.shareKey = this.route.snapshot.params['share_key'] || null;
        var configSegment = this.currentUser.loggedIn() ? 'changePassword' : 'resetPassword';
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components[configSegment].config; });
    };
    ResetPasswordComponent.prototype.onSubmit = function (form) {
        var _this = this;
        if (this.shareKey) {
            this.user.resetPassword(form, this.shareKey)
                .do(function (res) { return _this.currentUser.set(res.user, res.token.token); })
                .subscribe(this.handleSuccess, this.handleError);
        }
        else {
            this.user.changePassword(form).subscribe(this.handleSuccess, this.handleError);
        }
    };
    ResetPasswordComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'reset-password-component',
                    templateUrl: 'reset-password.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    ResetPasswordComponent.ctorParameters = function () { return [
        { type: user_service_1.UserService, },
        { type: app_store_1.AppStore, },
        { type: router_1.ActivatedRoute, },
        { type: router_1.Router, },
        { type: current_user_service_1.CurrentUserService, },
        { type: core_1.ChangeDetectorRef, },
    ]; };
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset-password.component.js.map