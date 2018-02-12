"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var Observable_1 = require("rxjs/Observable");
var DialogActions = require("./dialog.actions");
var app_store_1 = require("../../app.store");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var DialogEffects = (function () {
    function DialogEffects(actions, store, service) {
        var _this = this;
        this.actions = actions;
        this.store = store;
        this.service = service;
        this.showConfirmation = this.actions.ofType(DialogActions.ShowConfirmation.Type)
            .switchMap(function (action) {
            return _this.service.openConfirmationDialog(action.confirmationDialogOptions, action.onAccept, action.onDecline)
                .map(function () { return _this.store.create(function (factory) { return factory.dialog.showConfirmationSuccess(); }); })
                .catch(function (error) { return Observable_1.Observable.of(_this.store.create(function (factory) { return factory.error.handle(error); })); });
        });
    }
    DialogEffects.decorators = [
        { type: core_1.Injectable },
    ];
    DialogEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: app_store_1.AppStore, },
        { type: wz_dialog_service_1.WzDialogService, },
    ]; };
    DialogEffects.propDecorators = {
        'showConfirmation': [{ type: effects_1.Effect },],
    };
    return DialogEffects;
}());
exports.DialogEffects = DialogEffects;
//# sourceMappingURL=dialog.effects.js.map