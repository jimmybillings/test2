"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var SnackbarActions = require("./snackbar.actions");
var snackbar_service_1 = require("./snackbar.service");
var app_store_1 = require("../../app.store");
var SnackbarEffects = (function () {
    function SnackbarEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.display = this.actions.ofType(SnackbarActions.Display.Type)
            .switchMap(function (action) {
            return _this.service.display(action.messageKey, action.messageParameters)
                .map(function (translatedString) { return _this.store.create(function (factory) { return factory.snackbar.displaySuccess(translatedString); }); });
        });
    }
    SnackbarEffects.decorators = [
        { type: core_1.Injectable },
    ];
    SnackbarEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: snackbar_service_1.SnackbarService, },
    ]; };
    SnackbarEffects.propDecorators = {
        'display': [{ type: effects_1.Effect },],
    };
    return SnackbarEffects;
}());
exports.SnackbarEffects = SnackbarEffects;
//# sourceMappingURL=snackbar.effects.js.map