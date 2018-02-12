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
    ActionFactory.prototype.getAccountForQuoteAdmin = function (accountId) {
        return new GetAccountForQuoteAdmin(accountId);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.getAccountForQuoteAdminSuccess = function (account) {
        return new GetAccountForQuoteAdminSuccess(account);
    };
    InternalActionFactory.prototype.getAccountForQuoteAdminOnUserAdd = function (accountId) {
        return new GetAccountForQuoteAdminOnUserAdd(accountId);
    };
    InternalActionFactory.prototype.getAccountForQuoteAdminOnUserAddSuccess = function (account) {
        return new GetAccountForQuoteAdminOnUserAddSuccess(account);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var GetAccountForQuoteAdmin = (function () {
    function GetAccountForQuoteAdmin(accountId) {
        this.accountId = accountId;
        this.type = GetAccountForQuoteAdmin.Type;
    }
    GetAccountForQuoteAdmin.Type = '[Account] Get Account For Quote Admin';
    return GetAccountForQuoteAdmin;
}());
exports.GetAccountForQuoteAdmin = GetAccountForQuoteAdmin;
var GetAccountForQuoteAdminSuccess = (function () {
    function GetAccountForQuoteAdminSuccess(account) {
        this.account = account;
        this.type = GetAccountForQuoteAdminSuccess.Type;
    }
    GetAccountForQuoteAdminSuccess.Type = '[Account] Get Account For Quote Admin Success';
    return GetAccountForQuoteAdminSuccess;
}());
exports.GetAccountForQuoteAdminSuccess = GetAccountForQuoteAdminSuccess;
var GetAccountForQuoteAdminOnUserAdd = (function () {
    function GetAccountForQuoteAdminOnUserAdd(accountId) {
        this.accountId = accountId;
        this.type = GetAccountForQuoteAdminOnUserAdd.Type;
    }
    GetAccountForQuoteAdminOnUserAdd.Type = '[Account] Get Account For Quote Admin On User Add';
    return GetAccountForQuoteAdminOnUserAdd;
}());
exports.GetAccountForQuoteAdminOnUserAdd = GetAccountForQuoteAdminOnUserAdd;
var GetAccountForQuoteAdminOnUserAddSuccess = (function () {
    function GetAccountForQuoteAdminOnUserAddSuccess(account) {
        this.account = account;
        this.type = GetAccountForQuoteAdminOnUserAddSuccess.Type;
    }
    GetAccountForQuoteAdminOnUserAddSuccess.Type = '[Account] Get Account For Quote Admin On User Add Success';
    return GetAccountForQuoteAdminOnUserAddSuccess;
}());
exports.GetAccountForQuoteAdminOnUserAddSuccess = GetAccountForQuoteAdminOnUserAddSuccess;
//# sourceMappingURL=account.actions.js.map