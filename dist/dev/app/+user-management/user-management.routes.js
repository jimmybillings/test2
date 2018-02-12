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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50L3VzZXItbWFuYWdlbWVudC5yb3V0ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw0REFBMEQ7QUFDMUQscUVBQW1FO0FBQ25FLGtFQUFnRTtBQUNoRSwwRkFBdUY7QUFFdkYseUVBQXNFO0FBQ3RFLDhEQUEyRDtBQUMzRCxnRUFBNkQ7QUFDN0QsdUZBQW9GO0FBRXZFLFFBQUEsV0FBVyxHQUFXO0lBQ2pDO1FBQ0UsSUFBSSxFQUFFLE1BQU07UUFDWixTQUFTLEVBQUUsbURBQXVCO1FBQ2xDLFFBQVEsRUFBRTtZQUNSO2dCQUNFLElBQUksRUFBRSxFQUFFO2dCQUNSLFNBQVMsRUFBRSxvQ0FBZ0I7Z0JBQzNCLFdBQVcsRUFBRSxDQUFDLGlDQUFjLENBQUM7Z0JBQzdCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTthQUN0QztZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixTQUFTLEVBQUUsc0NBQWlCO2dCQUM1QixXQUFXLEVBQUUsQ0FBQywrQkFBYSxDQUFDO2dCQUM1QixJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUscUJBQXFCLEVBQUU7YUFDdkM7WUFDRDtnQkFDRSxJQUFJLEVBQUUsT0FBTztnQkFDYixTQUFTLEVBQUUsZ0NBQWM7Z0JBQ3pCLFdBQVcsRUFBRSxDQUFDLCtCQUFhLENBQUM7Z0JBQzVCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxrQkFBa0IsRUFBRTthQUNwQztZQUNEO2dCQUNFLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLFNBQVMsRUFBRSxtREFBdUI7Z0JBQ2xDLFdBQVcsRUFBRSxDQUFDLCtCQUFhLENBQUM7Z0JBQzVCLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSw0QkFBNEIsRUFBRTthQUM5QztZQUNEO2dCQUNFLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLFNBQVMsRUFBRSxpREFBc0I7Z0JBQ2pDLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRTthQUM3QztTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwiZmlsZSI6ImFwcC8rdXNlci1tYW5hZ2VtZW50L3VzZXItbWFuYWdlbWVudC5yb3V0ZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpbkNvbXBvbmVudCB9IGZyb20gJy4vK2xvZ2luL2xvZ2luLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSZWdpc3RlckNvbXBvbmVudCB9IGZyb20gJy4vK3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQcm9maWxlQ29tcG9uZW50IH0gZnJvbSAnLi8rcHJvZmlsZS9wcm9maWxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb3Jnb3RQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vK2ZvcmdvdC1wYXNzd29yZC9mb3Jnb3QtcGFzc3dvcmQuY29tcG9uZW50JztcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBVc2VyTWFuYWdlbWVudENvbXBvbmVudCB9IGZyb20gJy4vdXNlci1tYW5hZ2VtZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBMb2dnZWRJbkd1YXJkIH0gZnJvbSAnLi9zZXJ2aWNlcy9sb2dnZWQtaW4uZ3VhcmQnO1xuaW1wb3J0IHsgTG9nZ2VkT3V0R3VhcmQgfSBmcm9tICcuL3NlcnZpY2VzL2xvZ2dlZC1vdXQuZ3VhcmQnO1xuaW1wb3J0IHsgUmVzZXRQYXNzd29yZENvbXBvbmVudCB9IGZyb20gJy4vK3Jlc2V0LXBhc3N3b3JkL3Jlc2V0LXBhc3N3b3JkLmNvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBVU0VSX1JPVVRFUzogUm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogJ3VzZXInLFxuICAgIGNvbXBvbmVudDogVXNlck1hbmFnZW1lbnRDb21wb25lbnQsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIGNvbXBvbmVudDogUHJvZmlsZUNvbXBvbmVudCxcbiAgICAgICAgY2FuQWN0aXZhdGU6IFtMb2dnZWRPdXRHdWFyZF0sXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLlBST0ZJTEUnIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6ICdyZWdpc3RlcicsXG4gICAgICAgIGNvbXBvbmVudDogUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbTG9nZ2VkSW5HdWFyZF0sXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLlJFR0lTVEVSJyB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiAnbG9naW4nLFxuICAgICAgICBjb21wb25lbnQ6IExvZ2luQ29tcG9uZW50LFxuICAgICAgICBjYW5BY3RpdmF0ZTogW0xvZ2dlZEluR3VhcmRdLFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5MT0dJTicgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJ2ZvcmdvdC1wYXNzd29yZCcsXG4gICAgICAgIGNvbXBvbmVudDogRm9yZ290UGFzc3dvcmRDb21wb25lbnQsXG4gICAgICAgIGNhbkFjdGl2YXRlOiBbTG9nZ2VkSW5HdWFyZF0sXG4gICAgICAgIGRhdGE6IHsgdGl0bGU6ICdQQUdFX1RJVExFLkZPUkdPVF9QQVNTV09SRCcgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJ3Jlc2V0LXBhc3N3b3JkJyxcbiAgICAgICAgY29tcG9uZW50OiBSZXNldFBhc3N3b3JkQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7IHRpdGxlOiAnUEFHRV9USVRMRS5SRVNFVF9QQVNTV09SRCcgfVxuICAgICAgfVxuICAgIF1cbiAgfVxuXTtcblxuIl19
