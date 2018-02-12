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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultOnCloseFunction = function () { };
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.notify = function (options, onClose) {
        if (onClose === void 0) { onClose = exports.defaultOnCloseFunction; }
        return new Notify(__assign({ prompt: 'NOTIFICATION.CLOSE' }, options), onClose);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Notify = (function () {
    function Notify(options, onClose) {
        this.options = options;
        this.onClose = onClose;
        this.type = Notify.Type;
    }
    Notify.Type = '[Notifier] Notify';
    return Notify;
}());
exports.Notify = Notify;
//# sourceMappingURL=notifier.actions.js.map