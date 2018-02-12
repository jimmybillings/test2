"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var PrivacyPolicyGuard = (function () {
    function PrivacyPolicyGuard(store) {
        this.store = store;
    }
    PrivacyPolicyGuard.prototype.canActivate = function () {
        if (this.store.snapshot(function (state) { return !state.uiConfig.components.footer.config.privacyPolicyId; })) {
            this.store.dispatch(function (factory) { return factory.router.goToPageNotFound(); });
            return false;
        }
        return true;
    };
    PrivacyPolicyGuard.decorators = [
        { type: core_1.Injectable },
    ];
    PrivacyPolicyGuard.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return PrivacyPolicyGuard;
}());
exports.PrivacyPolicyGuard = PrivacyPolicyGuard;
//# sourceMappingURL=privacy-policy.guard.js.map