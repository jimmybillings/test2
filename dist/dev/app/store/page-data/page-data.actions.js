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
    ActionFactory.prototype.updateTitle = function (trKey, trParams) {
        return new UpdateTitle(trKey, trParams);
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
var UpdateTitle = (function () {
    function UpdateTitle(trKey, trParams) {
        this.trKey = trKey;
        this.trParams = trParams;
        this.type = UpdateTitle.Type;
    }
    UpdateTitle.Type = '[Page Data] Update Title';
    return UpdateTitle;
}());
exports.UpdateTitle = UpdateTitle;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9wYWdlLWRhdGEvcGFnZS1kYXRhLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0E7SUFBQTtJQUlBLENBQUM7SUFIUSxtQ0FBVyxHQUFsQixVQUFtQixLQUFhLEVBQUUsUUFBYztRQUM5QyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDSCxvQkFBQztBQUFELENBSkEsQUFJQyxJQUFBO0FBSlksc0NBQWE7QUFNMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBQTJELENBQUM7SUFBRCw0QkFBQztBQUFELENBQTNELEFBQTRELENBQWpCLGFBQWEsR0FBSTtBQUEvQyxzREFBcUI7QUFFbEM7SUFHRSxxQkFBNEIsS0FBYSxFQUFrQixRQUFjO1FBQTdDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBa0IsYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUR6RCxTQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNxQyxDQUFDO0lBRnZELGdCQUFJLEdBQUcsMEJBQTBCLENBQUM7SUFHM0Qsa0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrQ0FBVyIsImZpbGUiOiJhcHAvc3RvcmUvcGFnZS1kYXRhL3BhZ2UtZGF0YS5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyB1cGRhdGVUaXRsZSh0cktleTogc3RyaW5nLCB0clBhcmFtczogUG9qbyk6IFVwZGF0ZVRpdGxlIHtcbiAgICByZXR1cm4gbmV3IFVwZGF0ZVRpdGxlKHRyS2V5LCB0clBhcmFtcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVybmFsQWN0aW9uRmFjdG9yeSBleHRlbmRzIEFjdGlvbkZhY3RvcnkgeyB9XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVUaXRsZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbUGFnZSBEYXRhXSBVcGRhdGUgVGl0bGUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFVwZGF0ZVRpdGxlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0cktleTogc3RyaW5nLCBwdWJsaWMgcmVhZG9ubHkgdHJQYXJhbXM6IFBvam8pIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBVcGRhdGVUaXRsZTtcbiJdfQ==
