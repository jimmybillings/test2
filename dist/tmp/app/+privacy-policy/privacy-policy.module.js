"use strict";
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
    PrivacyPolicyModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [shared_module_1.SharedModule, router_1.RouterModule.forChild(privacy_policy_routes_1.PRIVACY_POLICY_ROUTES)],
                    declarations: [privacy_policy_component_1.PrivacyPolicyComponent],
                    exports: [privacy_policy_component_1.PrivacyPolicyComponent],
                    providers: [privacy_policy_resolver_1.PrivacyPolicyResolver, privacy_policy_guard_1.PrivacyPolicyGuard]
                },] },
    ];
    PrivacyPolicyModule.ctorParameters = function () { return []; };
    return PrivacyPolicyModule;
}());
exports.PrivacyPolicyModule = PrivacyPolicyModule;
//# sourceMappingURL=privacy-policy.module.js.map