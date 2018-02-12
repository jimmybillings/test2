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
    ForgotPasswordComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'forgot-password-component',
            templateUrl: 'forgot-password.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            app_store_1.AppStore,
            core_1.ChangeDetectorRef])
    ], ForgotPasswordComponent);
    return ForgotPasswordComponent;
}());
exports.ForgotPasswordComponent = ForgotPasswordComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50Lytmb3Jnb3QtcGFzc3dvcmQvZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE4RjtBQUM5RixtRUFBaUU7QUFDakUsNkNBQTJDO0FBUzNDO0lBS0UsaUNBQ1MsSUFBaUIsRUFDakIsS0FBZSxFQUNkLEdBQXNCO1FBRnZCLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsVUFBSyxHQUFMLEtBQUssQ0FBVTtRQUNkLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBTnpCLDBCQUFxQixHQUFZLEtBQUssQ0FBQztJQU8xQyxDQUFDO0lBRUwsMENBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUEvQyxDQUErQyxDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVNLDBDQUFRLEdBQWYsVUFBZ0IsSUFBWTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDMUIsQ0FBQztJQW5CVSx1QkFBdUI7UUFQbkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLFdBQVcsRUFBRSxzQkFBc0I7WUFDbkMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FRZSwwQkFBVztZQUNWLG9CQUFRO1lBQ1Qsd0JBQWlCO09BUnJCLHVCQUF1QixDQW9CbkM7SUFBRCw4QkFBQztDQXBCRCxBQW9CQyxJQUFBO0FBcEJZLDBEQUF1QiIsImZpbGUiOiJhcHAvK3VzZXItbWFuYWdlbWVudC8rZm9yZ290LXBhc3N3b3JkL2ZvcmdvdC1wYXNzd29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdmb3Jnb3QtcGFzc3dvcmQtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICdmb3Jnb3QtcGFzc3dvcmQuaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgRm9yZ290UGFzc3dvcmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgY29uZmlnOiBhbnk7XG4gIHB1YmxpYyBzdWNjZXNzZnVsbHlTdWJtaXR0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHNlcnZlckVycm9yczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyB1c2VyOiBVc2VyU2VydmljZSxcbiAgICBwdWJsaWMgc3RvcmU6IEFwcFN0b3JlLFxuICAgIHByaXZhdGUgcmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmZvcmdvdFBhc3N3b3JkLmNvbmZpZyk7XG4gIH1cblxuICBwdWJsaWMgb25TdWJtaXQodXNlcjogT2JqZWN0KTogdm9pZCB7XG4gICAgdGhpcy51c2VyLmZvcmdvdFBhc3N3b3JkKHVzZXIpLnN1YnNjcmliZSgpO1xuICAgIHRoaXMuc3VjY2Vzc2Z1bGx5U3VibWl0dGVkID0gdHJ1ZTtcbiAgICB0aGlzLnJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxufVxuIl19
