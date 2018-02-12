"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var app_store_1 = require("../../app.store");
var PrivacyPolicyResolver = (function () {
    function PrivacyPolicyResolver(store) {
        this.store = store;
    }
    PrivacyPolicyResolver.prototype.resolve = function () {
        var _this = this;
        this.store.dispatch(function (factory) { return factory.privacyPolicy.load(_this.store.snapshot(function (state) { return state.uiConfig.components.footer.config.privacyPolicyId.value; })); });
        return this.store.blockUntil(function (state) { return state.privacyPolicy.document !== null; });
    };
    PrivacyPolicyResolver.decorators = [
        { type: core_1.Injectable },
    ];
    PrivacyPolicyResolver.ctorParameters = function () { return [
        { type: app_store_1.AppStore, },
    ]; };
    return PrivacyPolicyResolver;
}());
exports.PrivacyPolicyResolver = PrivacyPolicyResolver;
//# sourceMappingURL=privacy-policy.resolver.js.map