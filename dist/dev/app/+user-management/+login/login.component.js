"use strict";
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
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login-component',
            templateUrl: 'login.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [authentication_data_service_1.Authentication,
            router_1.Router,
            current_user_service_1.CurrentUserService,
            user_service_1.UserService,
            pendo_service_1.PendoService,
            wz_dialog_service_1.WzDialogService,
            feature_store_1.FeatureStore,
            app_store_1.AppStore])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50Lytsb2dpbi9sb2dpbi5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBaUc7QUFDakcsaUdBQW1GO0FBQ25GLDBDQUF5QztBQUN6QyxtRkFBZ0Y7QUFDaEYsbUVBQWlFO0FBQ2pFLHFFQUFtRTtBQUduRSw4Q0FBNkM7QUFDN0MsMEZBQXVGO0FBQ3ZGLG1FQUFpRTtBQUNqRSwrRkFBNEY7QUFDNUYsNkNBQTJDO0FBUzNDO0lBS0Usd0JBQ1UsY0FBOEIsRUFDOUIsTUFBYyxFQUNkLFdBQStCLEVBQy9CLElBQWlCLEVBQ2pCLEtBQW1CLEVBQ25CLGFBQThCLEVBQzlCLE9BQXFCLEVBQ3JCLEtBQWU7UUFSekIsaUJBUThCO1FBUHBCLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBYztRQUNuQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBaURqQix5QkFBb0IsR0FBRztZQUM3QixLQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDN0IsS0FBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7UUFDbkMsQ0FBQyxDQUFBO0lBcEQ0QixDQUFDO0lBRTlCLGlDQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFOUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQXRDLENBQXNDLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixJQUFpQjtRQUFqQyxpQkFtQkM7UUFsQkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQzdCLEVBQUUsQ0FBQyxVQUFDLE9BQWdCO1lBQ25CLEtBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxLQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztnQkFBQyxLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFakUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLDJCQUEyQjtnQkFDckMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFELEtBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQUMsS0FBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7WUFBQyxDQUFDO1FBQzlDLENBQUMsQ0FBQzthQUNELFNBQVMsQ0FBQyxVQUFDLE9BQU87WUFDakIsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLEtBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLHVCQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEUsQ0FBQyxDQUFDO2FBQ0QsRUFBRSxDQUFDLFVBQUMsT0FBZ0I7WUFDbkIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUQsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUVPLGtDQUFTLEdBQWpCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQWE7WUFDcEUsS0FBSSxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDdkMsYUFBYSxFQUFFLHFDQUFnQjtnQkFDL0IsWUFBWSxFQUFFO29CQUNaLEtBQUssRUFBRSxLQUFLO29CQUNaLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLE1BQU0sRUFBRSxpQkFBaUI7aUJBQzFCO2FBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLG9CQUFvQixFQUFFLEVBQTNCLENBQTJCLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxrREFBeUIsR0FBakM7UUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLEVBQS9CLENBQStCLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQXZCLENBQXVCLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBNURVLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSxZQUFZO1lBQ3pCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBUTBCLDRDQUFjO1lBQ3RCLGVBQU07WUFDRCx5Q0FBa0I7WUFDekIsMEJBQVc7WUFDViw0QkFBWTtZQUNKLG1DQUFlO1lBQ3JCLDRCQUFZO1lBQ2Qsb0JBQVE7T0FiZCxjQUFjLENBa0UxQjtJQUFELHFCQUFDO0NBbEVELEFBa0VDLElBQUE7QUFsRVksd0NBQWMiLCJmaWxlIjoiYXBwLyt1c2VyLW1hbmFnZW1lbnQvK2xvZ2luL2xvZ2luLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEF1dGhlbnRpY2F0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2F1dGhlbnRpY2F0aW9uLmRhdGEuc2VydmljZSc7XG5pbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBQZW5kb1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvcGVuZG8uc2VydmljZSc7XG5pbXBvcnQgeyBTZXNzaW9uLCBDcmVkZW50aWFscyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3Nlc3Npb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hY2NvdW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFd6VGVybXNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvY29tcG9uZW50cy93ei10ZXJtcy93ei50ZXJtcy5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmVhdHVyZVN0b3JlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3N0b3Jlcy9mZWF0dXJlLnN0b3JlJztcbmltcG9ydCB7IFd6RGlhbG9nU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWRpYWxvZy9zZXJ2aWNlcy93ei5kaWFsb2cuc2VydmljZSc7XG5pbXBvcnQgeyBBcHBTdG9yZSB9IGZyb20gJy4uLy4uL2FwcC5zdG9yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2xvZ2luLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgTG9naW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgY29uZmlnOiBhbnk7XG4gIHB1YmxpYyBkaXNwbGF5V2VsY29tZU1lc3NhZ2U6IGJvb2xlYW47XG4gIHB1YmxpYyBkaXNwbGF5RXJyb3JNZXNzYWdlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYXV0aGVudGljYXRpb246IEF1dGhlbnRpY2F0aW9uLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgdXNlcjogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwZW5kbzogUGVuZG9TZXJ2aWNlLFxuICAgIHByaXZhdGUgZGlhbG9nU2VydmljZTogV3pEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgZmVhdHVyZTogRmVhdHVyZVN0b3JlLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmRpc3BsYXlXZWxjb21lTWVzc2FnZSA9IHRoaXMucm91dGVyLnJvdXRlclN0YXRlLnNuYXBzaG90LnVybC5pbmNsdWRlcygnbmV3VXNlcj10cnVlJyk7XG4gICAgdGhpcy5kaXNwbGF5RXJyb3JNZXNzYWdlID0gdGhpcy5yb3V0ZXIucm91dGVyU3RhdGUuc25hcHNob3QudXJsLmluY2x1ZGVzKCdyZXF1aXJlTG9naW49dHJ1ZScpO1xuXG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHMubG9naW4uY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBvblN1Ym1pdCh1c2VyOiBDcmVkZW50aWFscyk6IHZvaWQge1xuICAgIHRoaXMuYXV0aGVudGljYXRpb24uY3JlYXRlKHVzZXIpXG4gICAgICAuZG8oKHNlc3Npb246IFNlc3Npb24pID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlci5zZXQoc2Vzc2lvbi51c2VyLCBzZXNzaW9uLnRva2VuLnRva2VuKTtcbiAgICAgICAgdGhpcy5wZW5kby5pbml0aWFsaXplKHNlc3Npb24udXNlcik7XG4gICAgICAgIGlmIChzZXNzaW9uLnNpdGVGZWF0dXJlcykgdGhpcy5mZWF0dXJlLnNldChzZXNzaW9uLnNpdGVGZWF0dXJlcyk7XG5cbiAgICAgICAgaWYgKHNlc3Npb24uZG9jdW1lbnRzUmVxdWlyaW5nQWdyZWVtZW50ICYmXG4gICAgICAgICAgc2Vzc2lvbi5kb2N1bWVudHNSZXF1aXJpbmdBZ3JlZW1lbnQuaW5kZXhPZignVE9TJykgPiAtMSkge1xuICAgICAgICAgIHRoaXMuc2hvd1Rlcm1zKCk7XG4gICAgICAgIH0gZWxzZSB7IHRoaXMucmVkaXJlY3RVc2VyQXBwcm9wcmlhdGVseSgpOyB9XG4gICAgICB9KVxuICAgICAgLnN3aXRjaE1hcCgoc2Vzc2lvbikgPT4ge1xuICAgICAgICByZXR1cm4gKHNlc3Npb24udXNlciAmJiBzZXNzaW9uLnVzZXIuYWNjb3VudElkKSA/XG4gICAgICAgICAgdGhpcy51c2VyLmdldEFjY291bnQoc2Vzc2lvbi51c2VyLmFjY291bnRJZCkgOiBPYnNlcnZhYmxlLmVtcHR5KCk7XG4gICAgICB9KVxuICAgICAgLmRvKChhY2NvdW50OiBBY2NvdW50KSA9PiB7XG4gICAgICAgIGlmIChhY2NvdW50KSB0aGlzLmN1cnJlbnRVc2VyLmFkZEFjY291bnRUb1VzZXIoYWNjb3VudCk7XG4gICAgICB9KS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd1Rlcm1zKCk6IHZvaWQge1xuICAgIHRoaXMudXNlci5kb3dubG9hZEFjdGl2ZVRvc0RvY3VtZW50KCkudGFrZSgxKS5zdWJzY3JpYmUoKHRlcm1zOiBzdHJpbmcpID0+IHtcbiAgICAgIHRoaXMuZGlhbG9nU2VydmljZS5vcGVuQ29tcG9uZW50SW5EaWFsb2coe1xuICAgICAgICBjb21wb25lbnRUeXBlOiBXelRlcm1zQ29tcG9uZW50LFxuICAgICAgICBpbnB1dE9wdGlvbnM6IHtcbiAgICAgICAgICB0ZXJtczogdGVybXMsXG4gICAgICAgICAgYnRuTGFiZWw6ICdMT0dJTi5BR1JFRV9UT19UT1MnLFxuICAgICAgICAgIGhlYWRlcjogJ0xPR0lOLlRPU19USVRMRSdcbiAgICAgICAgfVxuICAgICAgfSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuYWdyZWVUb1Rlcm1zQW5kQ2xvc2UoKSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlZGlyZWN0VXNlckFwcHJvcHJpYXRlbHkoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3Rvcnkucm91dGVyLmZvbGxvd1JlZGlyZWN0KCkpO1xuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBhIHNpZGUgZWZmZWN0XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3RvcnkudWlDb25maWcubG9hZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgYWdyZWVUb1Rlcm1zQW5kQ2xvc2UgPSAoKTogdm9pZCA9PiB7XG4gICAgdGhpcy51c2VyLmFncmVlVXNlclRvVGVybXMoKTtcbiAgICB0aGlzLnJlZGlyZWN0VXNlckFwcHJvcHJpYXRlbHkoKTtcbiAgfVxufVxuIl19
