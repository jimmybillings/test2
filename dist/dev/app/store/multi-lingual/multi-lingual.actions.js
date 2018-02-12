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
    ActionFactory.prototype.setLanguage = function (lang) {
        return new SetLanguage(lang);
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
var SetLanguage = (function () {
    function SetLanguage(lang) {
        this.lang = lang;
        this.type = SetLanguage.Type;
    }
    SetLanguage.Type = '[Multilingual] Set Language';
    return SetLanguage;
}());
exports.SetLanguage = SetLanguage;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9tdWx0aS1saW5ndWFsL211bHRpLWxpbmd1YWwuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFFQTtJQUFBO0lBSUEsQ0FBQztJQUhRLG1DQUFXLEdBQWxCLFVBQW1CLElBQVk7UUFDN0IsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDSCxvQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksc0NBQWE7QUFNMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBQTJELENBQUM7SUFBRCw0QkFBQztBQUFELENBQTNELEFBQTRELENBQWpCLGFBQWEsR0FBSTtBQUEvQyxzREFBcUI7QUFFbEM7SUFHRSxxQkFBNEIsSUFBWTtRQUFaLFNBQUksR0FBSixJQUFJLENBQVE7UUFEeEIsU0FBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDSSxDQUFDO0lBRnRCLGdCQUFJLEdBQUcsNkJBQTZCLENBQUM7SUFHOUQsa0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrQ0FBVyIsImZpbGUiOiJhcHAvc3RvcmUvbXVsdGktbGluZ3VhbC9tdWx0aS1saW5ndWFsLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIHNldExhbmd1YWdlKGxhbmc6IHN0cmluZyk6IFNldExhbmd1YWdlIHtcbiAgICByZXR1cm4gbmV3IFNldExhbmd1YWdlKGxhbmcpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHsgfVxuXG5leHBvcnQgY2xhc3MgU2V0TGFuZ3VhZ2UgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW011bHRpbGluZ3VhbF0gU2V0IExhbmd1YWdlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRMYW5ndWFnZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgbGFuZzogc3RyaW5nKSB7IH1cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gU2V0TGFuZ3VhZ2U7XG4iXX0=
