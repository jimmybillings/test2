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
    ResetPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'reset-password-component',
            templateUrl: 'reset-password.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            app_store_1.AppStore,
            router_1.ActivatedRoute,
            router_1.Router,
            current_user_service_1.CurrentUserService,
            core_1.ChangeDetectorRef])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50LytyZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBOEY7QUFDOUYsMENBQXlEO0FBQ3pELG1FQUFpRTtBQUNqRSw2Q0FBMkM7QUFDM0MsbUZBQWdGO0FBVWhGO0lBS0UsZ0NBQ1UsSUFBaUIsRUFDakIsS0FBZSxFQUNmLEtBQXFCLEVBQ3JCLE1BQWMsRUFDZCxXQUErQixFQUMvQixHQUFzQjtRQU5oQyxpQkFPSztRQU5LLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFUekIsaUJBQVksR0FBaUIsSUFBSSxDQUFDO1FBNEJqQyxrQkFBYSxHQUFHO1lBQ3RCLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM1QixLQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLEVBQTFELENBQTBELENBQUMsQ0FBQztZQUMzRixLQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQTtRQUVPLGdCQUFXLEdBQUcsVUFBQyxLQUFVO1lBQy9CLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2pDLEtBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFBO0lBM0JHLENBQUM7SUFFTCx5Q0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ2hFLElBQU0sYUFBYSxHQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7UUFDL0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFTSx5Q0FBUSxHQUFmLFVBQWdCLElBQVM7UUFBekIsaUJBUUM7UUFQQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQztpQkFDekMsRUFBRSxDQUFDLFVBQUMsR0FBUSxJQUFLLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUEvQyxDQUErQyxDQUFDO2lCQUNqRSxTQUFTLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDckQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2pGLENBQUM7SUFDSCxDQUFDO0lBNUJVLHNCQUFzQjtRQVBsQyxnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsV0FBVyxFQUFFLHFCQUFxQjtZQUNsQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQVFnQiwwQkFBVztZQUNWLG9CQUFRO1lBQ1IsdUJBQWM7WUFDYixlQUFNO1lBQ0QseUNBQWtCO1lBQzFCLHdCQUFpQjtPQVhyQixzQkFBc0IsQ0F3Q2xDO0lBQUQsNkJBQUM7Q0F4Q0QsQUF3Q0MsSUFBQTtBQXhDWSx3REFBc0IiLCJmaWxlIjoiYXBwLyt1c2VyLW1hbmFnZW1lbnQvK3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ2hhbmdlRGV0ZWN0b3JSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZXJ2ZXJFcnJvcnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9mb3Jtcy5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdyZXNldC1wYXNzd29yZC1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJ3Jlc2V0LXBhc3N3b3JkLmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcblxuZXhwb3J0IGNsYXNzIFJlc2V0UGFzc3dvcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgY29uZmlnOiBhbnk7XG4gIHB1YmxpYyBzZXJ2ZXJFcnJvcnM6IFNlcnZlckVycm9ycyA9IG51bGw7XG4gIHB1YmxpYyBzaGFyZUtleTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdXNlcjogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zaGFyZUtleSA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zWydzaGFyZV9rZXknXSB8fCBudWxsO1xuICAgIGNvbnN0IGNvbmZpZ1NlZ21lbnQ6IHN0cmluZyA9IHRoaXMuY3VycmVudFVzZXIubG9nZ2VkSW4oKSA/ICdjaGFuZ2VQYXNzd29yZCcgOiAncmVzZXRQYXNzd29yZCc7XG4gICAgdGhpcy5jb25maWcgPSB0aGlzLnN0b3JlLnNuYXBzaG90Q2xvbmVkKHN0YXRlID0+IHN0YXRlLnVpQ29uZmlnLmNvbXBvbmVudHNbY29uZmlnU2VnbWVudF0uY29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBvblN1Ym1pdChmb3JtOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaGFyZUtleSkge1xuICAgICAgdGhpcy51c2VyLnJlc2V0UGFzc3dvcmQoZm9ybSwgdGhpcy5zaGFyZUtleSlcbiAgICAgICAgLmRvKChyZXM6IGFueSkgPT4gdGhpcy5jdXJyZW50VXNlci5zZXQocmVzLnVzZXIsIHJlcy50b2tlbi50b2tlbikpXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5oYW5kbGVTdWNjZXNzLCB0aGlzLmhhbmRsZUVycm9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51c2VyLmNoYW5nZVBhc3N3b3JkKGZvcm0pLnN1YnNjcmliZSh0aGlzLmhhbmRsZVN1Y2Nlc3MsIHRoaXMuaGFuZGxlRXJyb3IpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlU3VjY2VzcyA9ICgpID0+IHtcbiAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XG4gICAgdGhpcy5zdG9yZS5kaXNwYXRjaChmYWN0b3J5ID0+IGZhY3Rvcnkuc25hY2tiYXIuZGlzcGxheSgnUkVTRVRQQVNTV09SRC5QQVNTV09SRF9DSEFOR0VEJykpO1xuICAgIHRoaXMucmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVFcnJvciA9IChlcnJvcjogYW55KSA9PiB7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvcnMgPSBlcnJvci5qc29uKCk7XG4gICAgdGhpcy5yZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cbn1cbiJdfQ==
