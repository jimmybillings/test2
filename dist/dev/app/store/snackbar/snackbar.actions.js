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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBO0lBQUE7SUFJQSxDQUFDO0lBSFEsK0JBQU8sR0FBZCxVQUFlLFVBQWtCLEVBQUUsaUJBQTRCO1FBQTVCLGtDQUFBLEVBQUEsc0JBQTRCO1FBQzdELE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHNDQUFhO0FBTTFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQUlBLENBQUM7SUFIUSw4Q0FBYyxHQUFyQixVQUFzQixpQkFBeUI7UUFDN0MsTUFBTSxDQUFDLElBQUksY0FBYyxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FKQSxBQUlDLENBSjBDLGFBQWEsR0FJdkQ7QUFKWSxzREFBcUI7QUFNbEM7SUFHRSxpQkFBNEIsVUFBa0IsRUFBVyxpQkFBdUI7UUFBcEQsZUFBVSxHQUFWLFVBQVUsQ0FBUTtRQUFXLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBTTtRQURoRSxTQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNnRCxDQUFDO0lBRjlELFlBQUksR0FBRyxvQkFBb0IsQ0FBQztJQUdyRCxjQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksMEJBQU87QUFNcEI7SUFHRSx3QkFBNEIsaUJBQXlCO1FBQXpCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBUTtRQURyQyxTQUFJLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQztJQUNjLENBQUM7SUFGbkMsbUJBQUksR0FBRyw0QkFBNEIsQ0FBQztJQUc3RCxxQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLHdDQUFjIiwiZmlsZSI6ImFwcC9zdG9yZS9zbmFja2Jhci9zbmFja2Jhci5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGRpc3BsYXkobWVzc2FnZUtleTogc3RyaW5nLCBtZXNzYWdlUGFyYW1ldGVyczogUG9qbyA9IHt9KTogRGlzcGxheSB7XG4gICAgcmV0dXJuIG5ldyBEaXNwbGF5KG1lc3NhZ2VLZXksIG1lc3NhZ2VQYXJhbWV0ZXJzKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBkaXNwbGF5U3VjY2Vzcyh0cmFuc2xhdGVkTWVzc2FnZTogc3RyaW5nKTogRGlzcGxheVN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgRGlzcGxheVN1Y2Nlc3ModHJhbnNsYXRlZE1lc3NhZ2UpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNwbGF5IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tTbmFja2Jhcl0gRGlzcGxheSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRGlzcGxheS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbWVzc2FnZUtleTogc3RyaW5nLCByZWFkb25seSBtZXNzYWdlUGFyYW1ldGVyczogUG9qbykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBEaXNwbGF5U3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU25hY2tiYXJdIERpc3BsYXkgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gRGlzcGxheVN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHRyYW5zbGF0ZWRNZXNzYWdlOiBzdHJpbmcpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBEaXNwbGF5IHwgRGlzcGxheVN1Y2Nlc3M7XG4iXX0=
