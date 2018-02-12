"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Observable_1 = require("rxjs/Observable");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var privacy_policy_service_1 = require("./privacy-policy.service");
var PrivacyPolicyActions = require("./privacy-policy.actions");
var PrivacyPolicyEffects = (function () {
    function PrivacyPolicyEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.load = this.actions.ofType(PrivacyPolicyActions.Load.Type)
            .switchMap(function (action) { return _this.service.load(action.documentId)
            .map(function (document) { return _this.store.create(function (factory) { return factory.privacyPolicy.loadSuccess(document); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.privacyPolicy.loadFailure(error); })); }); });
    }
    PrivacyPolicyEffects.decorators = [
        { type: core_1.Injectable },
    ];
    PrivacyPolicyEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: privacy_policy_service_1.PrivacyPolicyService, },
    ]; };
    PrivacyPolicyEffects.propDecorators = {
        'load': [{ type: effects_1.Effect },],
    };
    return PrivacyPolicyEffects;
}());
exports.PrivacyPolicyEffects = PrivacyPolicyEffects;
//# sourceMappingURL=privacy-policy.effects.js.map