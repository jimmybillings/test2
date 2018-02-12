"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var privacy_policy_guard_1 = require("./services/privacy-policy.guard");
var privacy_policy_resolver_1 = require("./services/privacy-policy.resolver");
var privacy_policy_component_1 = require("./privacy-policy.component");
exports.PRIVACY_POLICY_ROUTES = [
    {
        path: 'privacy-policy',
        component: privacy_policy_component_1.PrivacyPolicyComponent,
        resolve: { document: privacy_policy_resolver_1.PrivacyPolicyResolver },
        canActivate: [privacy_policy_guard_1.PrivacyPolicyGuard],
        data: { title: 'PAGE_TITLE.PRIVACY_POLICY' }
    }
];
//# sourceMappingURL=privacy-policy.routes.js.map