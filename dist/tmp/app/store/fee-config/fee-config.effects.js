"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var fee_config_service_1 = require("./fee-config.service");
var FeeConfigActions = require("./fee-config.actions");
var FeeConfigEffects = (function () {
    function FeeConfigEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.loadFeeConfig = this.actions
            .ofType(FeeConfigActions.LoadFeeConfig.Type)
            .filter(function (action) {
            return !_this.store.snapshot(function (state) { return state.feeConfig.initialized; });
        })
            .switchMap(function () { return _this.service.loadFeeConfig()
            .map(function (feeConfig) { return _this.store.create(function (factory) { return factory.feeConfig.loadFeeConfigSuccess(feeConfig); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); }); });
    }
    FeeConfigEffects.decorators = [
        { type: core_1.Injectable },
    ];
    FeeConfigEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: fee_config_service_1.FeeConfigService, },
    ]; };
    FeeConfigEffects.propDecorators = {
        'loadFeeConfig': [{ type: effects_1.Effect },],
    };
    return FeeConfigEffects;
}());
exports.FeeConfigEffects = FeeConfigEffects;
//# sourceMappingURL=fee-config.effects.js.map