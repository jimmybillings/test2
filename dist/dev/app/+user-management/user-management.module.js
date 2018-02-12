"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_management_component_1 = require("./user-management.component");
var login_component_1 = require("./+login/login.component");
var register_component_1 = require("./+register/register.component");
var profile_component_1 = require("./+profile/profile.component");
var forgot_password_component_1 = require("./+forgot-password/forgot-password.component");
var reset_password_component_1 = require("./+reset-password/reset-password.component");
var shared_module_1 = require("../shared/shared.module");
var user_management_routes_1 = require("./user-management.routes");
var router_1 = require("@angular/router");
var logged_in_guard_1 = require("./services/logged-in.guard");
var logged_out_guard_1 = require("./services/logged-out.guard");
var UserManagementModule = (function () {
    function UserManagementModule() {
    }
    UserManagementModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild(user_management_routes_1.USER_ROUTES)],
            declarations: [user_management_component_1.UserManagementComponent, login_component_1.LoginComponent,
                register_component_1.RegisterComponent, profile_component_1.ProfileComponent, forgot_password_component_1.ForgotPasswordComponent, reset_password_component_1.ResetPasswordComponent],
            exports: [user_management_component_1.UserManagementComponent],
            providers: [logged_in_guard_1.LoggedInGuard, logged_out_guard_1.LoggedOutGuard]
        })
    ], UserManagementModule);
    return UserManagementModule;
}());
exports.UserManagementModule = UserManagementModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50L3VzZXItbWFuYWdlbWVudC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFDekMseUVBQXNFO0FBQ3RFLDREQUEwRDtBQUMxRCxxRUFBbUU7QUFDbkUsa0VBQWdFO0FBQ2hFLDBGQUF1RjtBQUN2Rix1RkFBb0Y7QUFDcEYseURBQXVEO0FBQ3ZELG1FQUF1RDtBQUN2RCwwQ0FBK0M7QUFDL0MsOERBQTJEO0FBQzNELGdFQUE2RDtBQVU3RDtJQUFBO0lBQW9DLENBQUM7SUFBeEIsb0JBQW9CO1FBUmhDLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLDRCQUFZLEVBQUUscUJBQVksQ0FBQyxRQUFRLENBQUMsb0NBQVcsQ0FBQyxDQUFDO1lBQzNELFlBQVksRUFBRSxDQUFDLG1EQUF1QixFQUFFLGdDQUFjO2dCQUNsRCxzQ0FBaUIsRUFBRSxvQ0FBZ0IsRUFBRSxtREFBdUIsRUFBRSxpREFBc0IsQ0FBQztZQUN6RixPQUFPLEVBQUUsQ0FBQyxtREFBdUIsQ0FBQztZQUNsQyxTQUFTLEVBQUUsQ0FBQywrQkFBYSxFQUFFLGlDQUFjLENBQUM7U0FDN0MsQ0FBQztPQUVXLG9CQUFvQixDQUFJO0lBQUQsMkJBQUM7Q0FBckMsQUFBcUMsSUFBQTtBQUF4QixvREFBb0IiLCJmaWxlIjoiYXBwLyt1c2VyLW1hbmFnZW1lbnQvdXNlci1tYW5hZ2VtZW50Lm1vZHVsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyTWFuYWdlbWVudENvbXBvbmVudCB9IGZyb20gJy4vdXNlci1tYW5hZ2VtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vK2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4vK3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSAnLi8rcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vK2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFJlc2V0UGFzc3dvcmRDb21wb25lbnQgfSBmcm9tICcuLytyZXNldC1wYXNzd29yZC9yZXNldC1wYXNzd29yZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgVVNFUl9ST1VURVMgfSBmcm9tICcuL3VzZXItbWFuYWdlbWVudC5yb3V0ZXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IExvZ2dlZEluR3VhcmQgfSBmcm9tICcuL3NlcnZpY2VzL2xvZ2dlZC1pbi5ndWFyZCc7XG5pbXBvcnQgeyBMb2dnZWRPdXRHdWFyZCB9IGZyb20gJy4vc2VydmljZXMvbG9nZ2VkLW91dC5ndWFyZCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1NoYXJlZE1vZHVsZSwgUm91dGVyTW9kdWxlLmZvckNoaWxkKFVTRVJfUk9VVEVTKV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVXNlck1hbmFnZW1lbnRDb21wb25lbnQsIExvZ2luQ29tcG9uZW50LFxuICAgICAgICBSZWdpc3RlckNvbXBvbmVudCwgUHJvZmlsZUNvbXBvbmVudCwgRm9yZ290UGFzc3dvcmRDb21wb25lbnQsIFJlc2V0UGFzc3dvcmRDb21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtVc2VyTWFuYWdlbWVudENvbXBvbmVudF0sXG4gICAgcHJvdmlkZXJzOiBbTG9nZ2VkSW5HdWFyZCwgTG9nZ2VkT3V0R3VhcmRdXG59KVxuXG5leHBvcnQgY2xhc3MgVXNlck1hbmFnZW1lbnRNb2R1bGUgeyB9XG4iXX0=
