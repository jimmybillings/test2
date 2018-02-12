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
    ActionFactory.prototype.getAllUsersByAccountId = function (accountId) {
        return new GetAllUsersByAccountId(accountId);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.getAllUsersByAccountIdSuccess = function (users) {
        return new GetAllUsersByAccountIdSuccess(users);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var GetAllUsersByAccountId = (function () {
    function GetAllUsersByAccountId(accountId) {
        this.accountId = accountId;
        this.type = GetAllUsersByAccountId.Type;
    }
    GetAllUsersByAccountId.Type = '[User] Get All Users By Account Id';
    return GetAllUsersByAccountId;
}());
exports.GetAllUsersByAccountId = GetAllUsersByAccountId;
var GetAllUsersByAccountIdSuccess = (function () {
    function GetAllUsersByAccountIdSuccess(users) {
        this.users = users;
        this.type = GetAllUsersByAccountIdSuccess.Type;
    }
    GetAllUsersByAccountIdSuccess.Type = '[User] Get All Users By Account Id Success';
    return GetAllUsersByAccountIdSuccess;
}());
exports.GetAllUsersByAccountIdSuccess = GetAllUsersByAccountIdSuccess;
//# sourceMappingURL=user.actions.js.map