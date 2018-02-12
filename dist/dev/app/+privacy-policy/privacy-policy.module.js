"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var privacy_policy_component_1 = require("./privacy-policy.component");
var privacy_policy_routes_1 = require("./privacy-policy.routes");
var shared_module_1 = require("../shared/shared.module");
var core_1 = require("@angular/core");
var privacy_policy_guard_1 = require("./services/privacy-policy.guard");
var privacy_policy_resolver_1 = require("./services/privacy-policy.resolver");
var PrivacyPolicyModule = (function () {
    function PrivacyPolicyModule() {
    }
    PrivacyPolicyModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild(privacy_policy_routes_1.PRIVACY_POLICY_ROUTES)],
            declarations: [privacy_policy_component_1.PrivacyPolicyComponent],
            exports: [privacy_policy_component_1.PrivacyPolicyComponent],
            providers: [privacy_policy_resolver_1.PrivacyPolicyResolver, privacy_policy_guard_1.PrivacyPolicyGuard]
        })
    ], PrivacyPolicyModule);
    return PrivacyPolicyModule;
}());
exports.PrivacyPolicyModule = PrivacyPolicyModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsMENBQStDO0FBRS9DLHVFQUFvRTtBQUNwRSxpRUFBZ0U7QUFDaEUseURBQXVEO0FBQ3ZELHNDQUF5QztBQUN6Qyx3RUFBcUU7QUFDckUsOEVBQTJFO0FBUTNFO0lBQUE7SUFBbUMsQ0FBQztJQUF2QixtQkFBbUI7UUFOL0IsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsNEJBQVksRUFBRSxxQkFBWSxDQUFDLFFBQVEsQ0FBQyw2Q0FBcUIsQ0FBQyxDQUFDO1lBQ3JFLFlBQVksRUFBRSxDQUFDLGlEQUFzQixDQUFDO1lBQ3RDLE9BQU8sRUFBRSxDQUFDLGlEQUFzQixDQUFDO1lBQ2pDLFNBQVMsRUFBRSxDQUFDLCtDQUFxQixFQUFFLHlDQUFrQixDQUFDO1NBQ3ZELENBQUM7T0FDVyxtQkFBbUIsQ0FBSTtJQUFELDBCQUFDO0NBQXBDLEFBQW9DLElBQUE7QUFBdkIsa0RBQW1CIiwiZmlsZSI6ImFwcC8rcHJpdmFjeS1wb2xpY3kvcHJpdmFjeS1wb2xpY3kubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuaW1wb3J0IHsgUHJpdmFjeVBvbGljeUNvbXBvbmVudCB9IGZyb20gJy4vcHJpdmFjeS1wb2xpY3kuY29tcG9uZW50JztcbmltcG9ydCB7IFBSSVZBQ1lfUE9MSUNZX1JPVVRFUyB9IGZyb20gJy4vcHJpdmFjeS1wb2xpY3kucm91dGVzJztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcml2YWN5UG9saWN5R3VhcmQgfSBmcm9tICcuL3NlcnZpY2VzL3ByaXZhY3ktcG9saWN5Lmd1YXJkJztcbmltcG9ydCB7IFByaXZhY3lQb2xpY3lSZXNvbHZlciB9IGZyb20gJy4vc2VydmljZXMvcHJpdmFjeS1wb2xpY3kucmVzb2x2ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlLCBSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQoUFJJVkFDWV9QT0xJQ1lfUk9VVEVTKV0sXG4gIGRlY2xhcmF0aW9uczogW1ByaXZhY3lQb2xpY3lDb21wb25lbnRdLFxuICBleHBvcnRzOiBbUHJpdmFjeVBvbGljeUNvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1ByaXZhY3lQb2xpY3lSZXNvbHZlciwgUHJpdmFjeVBvbGljeUd1YXJkXVxufSlcbmV4cG9ydCBjbGFzcyBQcml2YWN5UG9saWN5TW9kdWxlIHsgfVxuIl19
