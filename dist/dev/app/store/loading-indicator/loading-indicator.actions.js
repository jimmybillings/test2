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
    ActionFactory.prototype.show = function () {
        return new Show();
    };
    ActionFactory.prototype.hide = function () {
        return new Hide();
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
var Show = (function () {
    function Show() {
        this.type = Show.Type;
    }
    Show.Type = '[Loading Indicator] Show';
    return Show;
}());
exports.Show = Show;
var Hide = (function () {
    function Hide() {
        this.type = Hide.Type;
    }
    Hide.Type = '[Loading Indicator] Hide';
    return Hide;
}());
exports.Hide = Hide;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9sb2FkaW5nLWluZGljYXRvci9sb2FkaW5nLWluZGljYXRvci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBO0lBQUE7SUFRQSxDQUFDO0lBUFEsNEJBQUksR0FBWDtRQUNFLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTSw0QkFBSSxHQUFYO1FBQ0UsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FSQSxBQVFDLElBQUE7QUFSWSxzQ0FBYTtBQVUxQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUFBMkQsQ0FBQztJQUFELDRCQUFDO0FBQUQsQ0FBM0QsQUFBNEQsQ0FBakIsYUFBYSxHQUFJO0FBQS9DLHNEQUFxQjtBQUVsQztJQUFBO1FBRWtCLFNBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFGd0IsU0FBSSxHQUFHLDBCQUEwQixDQUFDO0lBRTNELFdBQUM7Q0FIRCxBQUdDLElBQUE7QUFIWSxvQkFBSTtBQUtqQjtJQUFBO1FBRWtCLFNBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFGd0IsU0FBSSxHQUFHLDBCQUEwQixDQUFDO0lBRTNELFdBQUM7Q0FIRCxBQUdDLElBQUE7QUFIWSxvQkFBSSIsImZpbGUiOiJhcHAvc3RvcmUvbG9hZGluZy1pbmRpY2F0b3IvbG9hZGluZy1pbmRpY2F0b3IuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgc2hvdygpOiBTaG93IHtcbiAgICByZXR1cm4gbmV3IFNob3coKTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlKCk6IEhpZGUge1xuICAgIHJldHVybiBuZXcgSGlkZSgpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHsgfVxuXG5leHBvcnQgY2xhc3MgU2hvdyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbTG9hZGluZyBJbmRpY2F0b3JdIFNob3cnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFNob3cuVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIEhpZGUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0xvYWRpbmcgSW5kaWNhdG9yXSBIaWRlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBIaWRlLlR5cGU7XG59XG5cbmV4cG9ydCB0eXBlIEFueSA9IFNob3cgfCBIaWRlO1xuIl19
