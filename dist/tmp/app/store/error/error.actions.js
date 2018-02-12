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
//# sourceMappingURL=error.actions.js.map