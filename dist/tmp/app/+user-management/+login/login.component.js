"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var authentication_data_service_1 = require("../../shared/services/authentication.data.service");
var router_1 = require("@angular/router");
var current_user_service_1 = require("../../shared/services/current-user.service");
var user_service_1 = require("../../shared/services/user.service");
var pendo_service_1 = require("../../shared/services/pendo.service");
var Observable_1 = require("rxjs/Observable");
var wz_terms_component_1 = require("../../shared/components/wz-terms/wz.terms.component");
var feature_store_1 = require("../../shared/stores/feature.store");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var app_store_1 = require("../../app.store");
var LoginComponent = (function () {
    function LoginComponent(authentication, router, currentUser, user, pendo, dialogService, feature, store) {
        var _this = this;
        this.authentication = authentication;
        this.router = router;
        this.currentUser = currentUser;
        this.user = user;
        this.pendo = pendo;
        this.dialogService = dialogService;
        this.feature = feature;
        this.store = store;
        this.agreeToTermsAndClose = function () {
            _this.user.agreeUserToTerms();
            _this.redirectUserAppropriately();
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.displayWelcomeMessage = this.router.routerState.snapshot.url.includes('newUser=true');
        this.displayErrorMessage = this.router.routerState.snapshot.url.includes('requireLogin=true');
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.login.config; });
    };
    LoginComponent.prototype.onSubmit = function (user) {
        var _this = this;
        this.authentication.create(user)
            .do(function (session) {
            _this.currentUser.set(session.user, session.token.token);
            _this.pendo.initialize(session.user);
            if (session.siteFeatures)
                _this.feature.set(session.siteFeatures);
            if (session.documentsRequiringAgreement &&
                session.documentsRequiringAgreement.indexOf('TOS') > -1) {
                _this.showTerms();
            }
            else {
                _this.redirectUserAppropriately();
            }
        })
            .switchMap(function (session) {
            return (session.user && session.user.accountId) ?
                _this.user.getAccount(session.user.accountId) : Observable_1.Observable.empty();
        })
            .do(function (account) {
            if (account)
                _this.currentUser.addAccountToUser(account);
        }).subscribe();
    };
    LoginComponent.prototype.showTerms = function () {
        var _this = this;
        this.user.downloadActiveTosDocument().take(1).subscribe(function (terms) {
            _this.dialogService.openComponentInDialog({
                componentType: wz_terms_component_1.WzTermsComponent,
                inputOptions: {
                    terms: terms,
                    btnLabel: 'LOGIN.AGREE_TO_TOS',
                    header: 'LOGIN.TOS_TITLE'
                }
            }).subscribe(function () { return _this.agreeToTermsAndClose(); });
        });
    };
    LoginComponent.prototype.redirectUserAppropriately = function () {
        this.store.dispatch(function (factory) { return factory.router.followRedirect(); });
        this.store.dispatch(function (factory) { return factory.uiConfig.load(); });
    };
    LoginComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'login-component',
                    templateUrl: 'login.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    LoginComponent.ctorParameters = function () { return [
        { type: authentication_data_service_1.Authentication, },
        { type: router_1.Router, },
        { type: current_user_service_1.CurrentUserService, },
        { type: user_service_1.UserService, },
        { type: pendo_service_1.PendoService, },
        { type: wz_dialog_service_1.WzDialogService, },
        { type: feature_store_1.FeatureStore, },
        { type: app_store_1.AppStore, },
    ]; };
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map