"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.showConfirmation = function (confirmationDialogOptions, onAccept, onDecline) {
        if (onDecline === void 0) { onDecline = function () { }; }
        return new ShowConfirmation(confirmationDialogOptions, onAccept, onDecline);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.showConfirmationSuccess = function () {
        return new ShowConfirmationSuccess();
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var ShowConfirmation = (function () {
    function ShowConfirmation(confirmationDialogOptions, onAccept, onDecline) {
        this.confirmationDialogOptions = confirmationDialogOptions;
        this.onAccept = onAccept;
        this.onDecline = onDecline;
        this.type = ShowConfirmation.Type;
    }
    ShowConfirmation.Type = '[Dialog] Show Confirmation';
    return ShowConfirmation;
}());
exports.ShowConfirmation = ShowConfirmation;
var ShowConfirmationSuccess = (function () {
    function ShowConfirmationSuccess() {
        this.type = ShowConfirmationSuccess.Type;
    }
    ShowConfirmationSuccess.Type = '[Dialog] Show Confirmation Success';
    return ShowConfirmationSuccess;
}());
exports.ShowConfirmationSuccess = ShowConfirmationSuccess;
//# sourceMappingURL=dialog.actions.js.map