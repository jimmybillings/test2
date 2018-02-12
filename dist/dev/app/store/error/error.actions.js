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
    ActionFactory.prototype.handle = function (error) {
        return new Handle(error);
    };
    ActionFactory.prototype.handle401Unauthorized = function () {
        return new Handle401Unauthorized();
    };
    ActionFactory.prototype.handle403Forbidden = function () {
        return new Handle403Forbidden();
    };
    ActionFactory.prototype.handleCustomError = function (title) {
        return new HandleCustomError(title);
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
var Handle = (function () {
    function Handle(error) {
        this.error = error;
        this.type = Handle.Type;
    }
    Handle.Type = '[Error] Handle';
    return Handle;
}());
exports.Handle = Handle;
var Handle401Unauthorized = (function () {
    function Handle401Unauthorized() {
        this.type = Handle401Unauthorized.Type;
    }
    Handle401Unauthorized.Type = '[Error] Handle 401 Unauthorized';
    return Handle401Unauthorized;
}());
exports.Handle401Unauthorized = Handle401Unauthorized;
var Handle403Forbidden = (function () {
    function Handle403Forbidden() {
        this.type = Handle403Forbidden.Type;
    }
    Handle403Forbidden.Type = '[Error] Handle 403 Forbidden';
    return Handle403Forbidden;
}());
exports.Handle403Forbidden = Handle403Forbidden;
var HandleCustomError = (function () {
    function HandleCustomError(title) {
        this.title = title;
        this.type = HandleCustomError.Type;
    }
    HandleCustomError.Type = '[Error] Handle Custom Error';
    return HandleCustomError;
}());
exports.HandleCustomError = HandleCustomError;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9lcnJvci9lcnJvci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUlBO0lBQUE7SUFnQkEsQ0FBQztJQWZRLDhCQUFNLEdBQWIsVUFBYyxLQUF1QjtRQUNuQyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVNLDZDQUFxQixHQUE1QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLDBDQUFrQixHQUF6QjtRQUNFLE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixFQUFFLENBQUM7SUFDbEMsQ0FBQztJQUVNLHlDQUFpQixHQUF4QixVQUF5QixLQUFhO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDSCxvQkFBQztBQUFELENBaEJBLEFBZ0JDLElBQUE7QUFoQlksc0NBQWE7QUFrQjFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQUEyRCxDQUFDO0lBQUQsNEJBQUM7QUFBRCxDQUEzRCxBQUE0RCxDQUFqQixhQUFhLEdBQUk7QUFBL0Msc0RBQXFCO0FBRWxDO0lBR0UsZ0JBQTRCLEtBQXVCO1FBQXZCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBRG5DLFNBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ29CLENBQUM7SUFGakMsV0FBSSxHQUFHLGdCQUFnQixDQUFDO0lBR2pELGFBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSx3QkFBTTtBQU1uQjtJQUFBO1FBRWtCLFNBQUksR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7SUFDcEQsQ0FBQztJQUZ3QiwwQkFBSSxHQUFHLGlDQUFpQyxDQUFDO0lBRWxFLDRCQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksc0RBQXFCO0FBS2xDO0lBQUE7UUFFa0IsU0FBSSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FBQztJQUNqRCxDQUFDO0lBRndCLHVCQUFJLEdBQUcsOEJBQThCLENBQUM7SUFFL0QseUJBQUM7Q0FIRCxBQUdDLElBQUE7QUFIWSxnREFBa0I7QUFLL0I7SUFHRSwyQkFBNEIsS0FBYTtRQUFiLFVBQUssR0FBTCxLQUFLLENBQVE7UUFEekIsU0FBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQztJQUNELENBQUM7SUFGdkIsc0JBQUksR0FBRyw2QkFBNkIsQ0FBQztJQUc5RCx3QkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDhDQUFpQiIsImZpbGUiOiJhcHAvc3RvcmUvZXJyb3IvZXJyb3IuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBoYW5kbGUoZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpOiBIYW5kbGUge1xuICAgIHJldHVybiBuZXcgSGFuZGxlKGVycm9yKTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGU0MDFVbmF1dGhvcml6ZWQoKTogSGFuZGxlNDAxVW5hdXRob3JpemVkIHtcbiAgICByZXR1cm4gbmV3IEhhbmRsZTQwMVVuYXV0aG9yaXplZCgpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZTQwM0ZvcmJpZGRlbigpOiBIYW5kbGU0MDNGb3JiaWRkZW4ge1xuICAgIHJldHVybiBuZXcgSGFuZGxlNDAzRm9yYmlkZGVuKCk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ3VzdG9tRXJyb3IodGl0bGU6IHN0cmluZyk6IEhhbmRsZUN1c3RvbUVycm9yIHtcbiAgICByZXR1cm4gbmV3IEhhbmRsZUN1c3RvbUVycm9yKHRpdGxlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7IH1cblxuZXhwb3J0IGNsYXNzIEhhbmRsZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbRXJyb3JdIEhhbmRsZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gSGFuZGxlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBIYW5kbGU0MDFVbmF1dGhvcml6ZWQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0Vycm9yXSBIYW5kbGUgNDAxIFVuYXV0aG9yaXplZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gSGFuZGxlNDAxVW5hdXRob3JpemVkLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBIYW5kbGU0MDNGb3JiaWRkZW4gaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0Vycm9yXSBIYW5kbGUgNDAzIEZvcmJpZGRlbic7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gSGFuZGxlNDAzRm9yYmlkZGVuLlR5cGU7XG59XG5cbmV4cG9ydCBjbGFzcyBIYW5kbGVDdXN0b21FcnJvciBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbRXJyb3JdIEhhbmRsZSBDdXN0b20gRXJyb3InO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEhhbmRsZUN1c3RvbUVycm9yLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB0aXRsZTogc3RyaW5nKSB7IH1cbn1cbiJdfQ==
