"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/Observable");
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var app_store_1 = require("../../app.store");
var ui_config_service_1 = require("./ui-config.service");
var UiConfigActions = require("./ui-config.actions");
var UiConfigState = require("./ui-config.state");
var UiConfigEffects = (function () {
    function UiConfigEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.initialize = this.actions.ofType(UiConfigActions.Initialize.Type)
            .map(function (action) {
            var localConfig = localStorage.getItem('uiConfig') || JSON.stringify(UiConfigState.initialState);
            return _this.store.create(function (factory) { return factory.uiConfig.initializeSuccess(JSON.parse(localConfig)); });
        });
        this.load = this.actions.ofType(UiConfigActions.Load.Type)
            .switchMap(function () { return _this.service.load()
            .map(function (config) { return _this.store.create(function (factory) { return factory.uiConfig.loadSuccess(config); }); })
            .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.uiConfig.loadFailure(error); })); }); });
        this.setInLocalStorage = this.actions.ofType(UiConfigActions.LoadSuccess.Type)
            .do(function (action) { return localStorage.setItem('uiConfig', JSON.stringify(action.config)); });
    }
    UiConfigEffects.decorators = [
        { type: core_1.Injectable },
    ];
    UiConfigEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: ui_config_service_1.UiConfigService, },
    ]; };
    UiConfigEffects.propDecorators = {
        'initialize': [{ type: effects_1.Effect },],
        'load': [{ type: effects_1.Effect },],
        'setInLocalStorage': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
    };
    return UiConfigEffects;
}());
exports.UiConfigEffects = UiConfigEffects;
//# sourceMappingURL=ui-config.effects.js.map