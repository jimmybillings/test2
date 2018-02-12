"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var login_component_1 = require("./+login/login.component");
var register_component_1 = require("./+register/register.component");
var profile_component_1 = require("./+profile/profile.component");
var forgot_password_component_1 = require("./+forgot-password/forgot-password.component");
var user_management_component_1 = require("./user-management.component");
var logged_in_guard_1 = require("./services/logged-in.guard");
var logged_out_guard_1 = require("./services/logged-out.guard");
var reset_password_component_1 = require("./+reset-password/reset-password.component");
exports.USER_ROUTES = [
    {
        path: 'user',
        component: user_management_component_1.UserManagementComponent,
        children: [
            {
                path: '',
                component: profile_component_1.ProfileComponent,
                canActivate: [logged_out_guard_1.LoggedOutGuard],
                data: { title: 'PAGE_TITLE.PROFILE' }
            },
            {
                path: 'register',
                component: register_component_1.RegisterComponent,
                canActivate: [logged_in_guard_1.LoggedInGuard],
                data: { title: 'PAGE_TITLE.REGISTER' }
            },
            {
                path: 'login',
                component: login_component_1.LoginComponent,
                canActivate: [logged_in_guard_1.LoggedInGuard],
                data: { title: 'PAGE_TITLE.LOGIN' }
            },
            {
                path: 'forgot-password',
                component: forgot_password_component_1.ForgotPasswordComponent,
                canActivate: [logged_in_guard_1.LoggedInGuard],
                data: { title: 'PAGE_TITLE.FORGOT_PASSWORD' }
            },
            {
                path: 'reset-password',
                component: reset_password_component_1.ResetPasswordComponent,
                data: { title: 'PAGE_TITLE.RESET_PASSWORD' }
            }
        ]
    }
];
//# sourceMappingURL=user-management.routes.js.map