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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQTtJQUFBO0lBSUEsQ0FBQztJQUhDLCtDQUF1QixHQUF2QixVQUF3QixTQUFpQjtRQUN2QyxNQUFNLENBQUMsSUFBSSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHNDQUFhO0FBTTFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQVlBLENBQUM7SUFYQyw4REFBOEIsR0FBOUIsVUFBK0IsT0FBa0M7UUFDL0QsTUFBTSxDQUFDLElBQUksOEJBQThCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVELGdFQUFnQyxHQUFoQyxVQUFpQyxTQUFpQjtRQUNoRCxNQUFNLENBQUMsSUFBSSxnQ0FBZ0MsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQsdUVBQXVDLEdBQXZDLFVBQXdDLE9BQWtDO1FBQ3hFLE1BQU0sQ0FBQyxJQUFJLHVDQUF1QyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzlELENBQUM7SUFDSCw0QkFBQztBQUFELENBWkEsQUFZQyxDQVowQyxhQUFhLEdBWXZEO0FBWlksc0RBQXFCO0FBY2xDO0lBR0UsaUNBQTRCLFNBQWlCO1FBQWpCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFEN0IsU0FBSSxHQUFHLHVCQUF1QixDQUFDLElBQUksQ0FBQztJQUNILENBQUM7SUFGM0IsNEJBQUksR0FBRyx1Q0FBdUMsQ0FBQztJQUd4RSw4QkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDBEQUF1QjtBQU1wQztJQUdFLHdDQUE0QixPQUFrQztRQUFsQyxZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQUQ5QyxTQUFJLEdBQUcsOEJBQThCLENBQUMsSUFBSSxDQUFDO0lBQ08sQ0FBQztJQUY1QyxtQ0FBSSxHQUFHLCtDQUErQyxDQUFDO0lBR2hGLHFDQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksd0VBQThCO0FBTTNDO0lBR0UsMENBQTRCLFNBQWlCO1FBQWpCLGNBQVMsR0FBVCxTQUFTLENBQVE7UUFEN0IsU0FBSSxHQUFHLGdDQUFnQyxDQUFDLElBQUksQ0FBQztJQUNaLENBQUM7SUFGM0IscUNBQUksR0FBRyxtREFBbUQsQ0FBQztJQUdwRix1Q0FBQztDQUpELEFBSUMsSUFBQTtBQUpZLDRFQUFnQztBQU03QztJQUdFLGlEQUE0QixPQUFrQztRQUFsQyxZQUFPLEdBQVAsT0FBTyxDQUEyQjtRQUQ5QyxTQUFJLEdBQUcsdUNBQXVDLENBQUMsSUFBSSxDQUFDO0lBQ0YsQ0FBQztJQUY1Qyw0Q0FBSSxHQUFHLDJEQUEyRCxDQUFDO0lBRzVGLDhDQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksMEZBQXVDIiwiZmlsZSI6ImFwcC9zdG9yZS9hY2NvdW50L2FjY291bnQuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVXNlciB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hY2NvdW50LmludGVyZmFjZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgZ2V0QWNjb3VudEZvclF1b3RlQWRtaW4oYWNjb3VudElkOiBudW1iZXIpOiBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbiB7XG4gICAgcmV0dXJuIG5ldyBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbihhY2NvdW50SWQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzKGFjY291bnQ6IFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnQpOiBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pblN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgR2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzKGFjY291bnQpO1xuICB9XG5cbiAgZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGQoYWNjb3VudElkOiBudW1iZXIpOiBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZCB7XG4gICAgcmV0dXJuIG5ldyBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZChhY2NvdW50SWQpO1xuICB9XG5cbiAgZ2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGRTdWNjZXNzKGFjY291bnQ6IFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnQpOiBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgR2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGRTdWNjZXNzKGFjY291bnQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbiBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWNjb3VudF0gR2V0IEFjY291bnQgRm9yIFF1b3RlIEFkbWluJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbi5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYWNjb3VudElkOiBudW1iZXIpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY2NvdW50XSBHZXQgQWNjb3VudCBGb3IgUXVvdGUgQWRtaW4gU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR2V0QWNjb3VudEZvclF1b3RlQWRtaW5TdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhY2NvdW50OiBTZW5kRGV0YWlsc0JpbGxpbmdBY2NvdW50KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEdldEFjY291bnRGb3JRdW90ZUFkbWluT25Vc2VyQWRkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY2NvdW50XSBHZXQgQWNjb3VudCBGb3IgUXVvdGUgQWRtaW4gT24gVXNlciBBZGQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEdldEFjY291bnRGb3JRdW90ZUFkbWluT25Vc2VyQWRkLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhY2NvdW50SWQ6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjY291bnRdIEdldCBBY2NvdW50IEZvciBRdW90ZSBBZG1pbiBPbiBVc2VyIEFkZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbk9uVXNlckFkZFN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFjY291bnQ6IFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnQpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBHZXRBY2NvdW50Rm9yUXVvdGVBZG1pbiB8IEdldEFjY291bnRGb3JRdW90ZUFkbWluU3VjY2Vzc1xuICB8IEdldEFjY291bnRGb3JRdW90ZUFkbWluT25Vc2VyQWRkIHwgR2V0QWNjb3VudEZvclF1b3RlQWRtaW5PblVzZXJBZGRTdWNjZXNzO1xuIl19
