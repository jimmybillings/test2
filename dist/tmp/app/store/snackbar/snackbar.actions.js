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
    ActionFactory.prototype.display = function (messageKey, messageParameters) {
        if (messageParameters === void 0) { messageParameters = {}; }
        return new Display(messageKey, messageParameters);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.displaySuccess = function (translatedMessage) {
        return new DisplaySuccess(translatedMessage);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Display = (function () {
    function Display(messageKey, messageParameters) {
        this.messageKey = messageKey;
        this.messageParameters = messageParameters;
        this.type = Display.Type;
    }
    Display.Type = '[Snackbar] Display';
    return Display;
}());
exports.Display = Display;
var DisplaySuccess = (function () {
    function DisplaySuccess(translatedMessage) {
        this.translatedMessage = translatedMessage;
        this.type = DisplaySuccess.Type;
    }
    DisplaySuccess.Type = '[Snackbar] Display Success';
    return DisplaySuccess;
}());
exports.DisplaySuccess = DisplaySuccess;
//# sourceMappingURL=snackbar.actions.js.map