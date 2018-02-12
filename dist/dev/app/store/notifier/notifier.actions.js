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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9ub3RpZmllci9ub3RpZmllci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSWEsUUFBQSxzQkFBc0IsR0FBYSxjQUFRLENBQUMsQ0FBQztBQUUxRDtJQUFBO0lBSUEsQ0FBQztJQUhRLDhCQUFNLEdBQWIsVUFBYyxPQUFrQyxFQUFFLE9BQTBDO1FBQTFDLHdCQUFBLEVBQUEsVUFBb0IsOEJBQXNCO1FBQzFGLE1BQU0sQ0FBQyxJQUFJLE1BQU0sWUFBRyxNQUFNLEVBQUUsb0JBQW9CLElBQUssT0FBTyxHQUFJLE9BQU8sQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFDSCxvQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksc0NBQWE7QUFNMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBQTJELENBQUM7SUFBRCw0QkFBQztBQUFELENBQTNELEFBQTRELENBQWpCLGFBQWEsR0FBSTtBQUEvQyxzREFBcUI7QUFFbEM7SUFHRSxnQkFBcUIsT0FBa0MsRUFBVyxPQUFpQjtRQUE5RCxZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQUFXLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFEbkUsU0FBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDb0QsQ0FBQztJQUZqRSxXQUFJLEdBQUcsbUJBQW1CLENBQUM7SUFHcEQsYUFBQztDQUpELEFBSUMsSUFBQTtBQUpZLHdCQUFNIiwiZmlsZSI6ImFwcC9zdG9yZS9ub3RpZmllci9ub3RpZmllci5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBOb3RpZmljYXRpb25EaWFsb2dPcHRpb25zIH0gZnJvbSAnLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL2ludGVyZmFjZXMvd3ouZGlhbG9nLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0T25DbG9zZUZ1bmN0aW9uOiBGdW5jdGlvbiA9ICgpID0+IHsgfTtcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgbm90aWZ5KG9wdGlvbnM6IE5vdGlmaWNhdGlvbkRpYWxvZ09wdGlvbnMsIG9uQ2xvc2U6IEZ1bmN0aW9uID0gZGVmYXVsdE9uQ2xvc2VGdW5jdGlvbik6IE5vdGlmeSB7XG4gICAgcmV0dXJuIG5ldyBOb3RpZnkoeyBwcm9tcHQ6ICdOT1RJRklDQVRJT04uQ0xPU0UnLCAuLi5vcHRpb25zIH0sIG9uQ2xvc2UpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHsgfVxuXG5leHBvcnQgY2xhc3MgTm90aWZ5IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tOb3RpZmllcl0gTm90aWZ5JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBOb3RpZnkuVHlwZTtcbiAgY29uc3RydWN0b3IocmVhZG9ubHkgb3B0aW9uczogTm90aWZpY2F0aW9uRGlhbG9nT3B0aW9ucywgcmVhZG9ubHkgb25DbG9zZTogRnVuY3Rpb24pIHsgfVxufVxuIl19
