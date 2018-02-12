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
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.record = function (options) {
        return new Record(options);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Record = (function () {
    function Record(options) {
        this.options = options;
        this.type = Record.Type;
    }
    Record.Type = '[Activity] Record';
    return Record;
}());
exports.Record = Record;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3Rpdml0eS9hY3Rpdml0eS5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBO0lBQUE7SUFBNkIsQ0FBQztJQUFELG9CQUFDO0FBQUQsQ0FBN0IsQUFBOEIsSUFBQTtBQUFqQixzQ0FBYTtBQUUxQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUFJQSxDQUFDO0lBSFEsc0NBQU0sR0FBYixVQUFjLE9BQXdCO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUpBLEFBSUMsQ0FKMEMsYUFBYSxHQUl2RDtBQUpZLHNEQUFxQjtBQU1sQztJQUdFLGdCQUE0QixPQUF3QjtRQUF4QixZQUFPLEdBQVAsT0FBTyxDQUFpQjtRQURwQyxTQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNxQixDQUFDO0lBRmxDLFdBQUksR0FBRyxtQkFBbUIsQ0FBQztJQUdwRCxhQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksd0JBQU0iLCJmaWxlIjoiYXBwL3N0b3JlL2FjdGl2aXR5L2FjdGl2aXR5LmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpdml0eU9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3RvcnkgeyB9XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIHJlY29yZChvcHRpb25zOiBBY3Rpdml0eU9wdGlvbnMpOiBSZWNvcmQge1xuICAgIHJldHVybiBuZXcgUmVjb3JkKG9wdGlvbnMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZWNvcmQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2aXR5XSBSZWNvcmQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFJlY29yZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogQWN0aXZpdHlPcHRpb25zKSB7IH1cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gUmVjb3JkO1xuIl19
