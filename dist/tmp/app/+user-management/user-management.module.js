"use strict";
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
    UserManagementModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild(user_management_routes_1.USER_ROUTES)],
                    declarations: [user_management_component_1.UserManagementComponent, login_component_1.LoginComponent,
                        register_component_1.RegisterComponent, profile_component_1.ProfileComponent, forgot_password_component_1.ForgotPasswordComponent, reset_password_component_1.ResetPasswordComponent],
                    exports: [user_management_component_1.UserManagementComponent],
                    providers: [logged_in_guard_1.LoggedInGuard, logged_out_guard_1.LoggedOutGuard]
                },] },
    ];
    UserManagementModule.ctorParameters = function () { return []; };
    return UserManagementModule;
}());
exports.UserManagementModule = UserManagementModule;
//# sourceMappingURL=user-management.module.js.map