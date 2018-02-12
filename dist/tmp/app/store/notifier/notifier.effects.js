"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var effects_1 = require("@ngrx/effects");
var NotifierActions = require("./notifier.actions");
var wz_dialog_service_1 = require("../../shared/modules/wz-dialog/services/wz.dialog.service");
var NotifierEffects = (function () {
    function NotifierEffects(actions, dialogService) {
        var _this = this;
        this.actions = actions;
        this.dialogService = dialogService;
        this.notify = this.actions.ofType(NotifierActions.Notify.Type)
            .do(function (action) {
            return _this.dialogService.openNotificationDialog(action.options).subscribe(function () { return action.onClose(); });
        });
    }
    NotifierEffects.decorators = [
        { type: core_1.Injectable },
    ];
    NotifierEffects.ctorParameters = function () { return [
        { type: effects_1.Actions, },
        { type: wz_dialog_service_1.WzDialogService, },
    ]; };
    NotifierEffects.propDecorators = {
        'notify': [{ type: effects_1.Effect, args: [{ dispatch: false },] },],
    };
    return NotifierEffects;
}());
exports.NotifierEffects = NotifierEffects;
//# sourceMappingURL=notifier.effects.js.map