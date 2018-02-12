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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS91c2VyL3VzZXIuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQTtJQUFBO0lBSUEsQ0FBQztJQUhDLDhDQUFzQixHQUF0QixVQUF1QixTQUFpQjtRQUN0QyxNQUFNLENBQUMsSUFBSSxzQkFBc0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHNDQUFhO0FBTTFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQUlBLENBQUM7SUFIQyw2REFBNkIsR0FBN0IsVUFBOEIsS0FBa0M7UUFDOUQsTUFBTSxDQUFDLElBQUksNkJBQTZCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUNILDRCQUFDO0FBQUQsQ0FKQSxBQUlDLENBSjBDLGFBQWEsR0FJdkQ7QUFKWSxzREFBcUI7QUFNbEM7SUFHRSxnQ0FBNEIsU0FBaUI7UUFBakIsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUQ3QixTQUFJLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDO0lBQ0YsQ0FBQztJQUYzQiwyQkFBSSxHQUFHLG9DQUFvQyxDQUFDO0lBR3JFLDZCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksd0RBQXNCO0FBTW5DO0lBR0UsdUNBQTRCLEtBQWtDO1FBQWxDLFVBQUssR0FBTCxLQUFLLENBQTZCO1FBRDlDLFNBQUksR0FBRyw2QkFBNkIsQ0FBQyxJQUFJLENBQUM7SUFDUSxDQUFDO0lBRjVDLGtDQUFJLEdBQUcsNENBQTRDLENBQUM7SUFHN0Usb0NBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxzRUFBNkIiLCJmaWxlIjoiYXBwL3N0b3JlL3VzZXIvdXNlci5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2VuZERldGFpbHNCaWxsaW5nQWNjb3VudCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvdXNlci5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIGdldEFsbFVzZXJzQnlBY2NvdW50SWQoYWNjb3VudElkOiBudW1iZXIpOiBHZXRBbGxVc2Vyc0J5QWNjb3VudElkIHtcbiAgICByZXR1cm4gbmV3IEdldEFsbFVzZXJzQnlBY2NvdW50SWQoYWNjb3VudElkKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7XG4gIGdldEFsbFVzZXJzQnlBY2NvdW50SWRTdWNjZXNzKHVzZXJzOiBTZW5kRGV0YWlsc0JpbGxpbmdBY2NvdW50W10pOiBHZXRBbGxVc2Vyc0J5QWNjb3VudElkU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBHZXRBbGxVc2Vyc0J5QWNjb3VudElkU3VjY2Vzcyh1c2Vycyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEdldEFsbFVzZXJzQnlBY2NvdW50SWQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1VzZXJdIEdldCBBbGwgVXNlcnMgQnkgQWNjb3VudCBJZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gR2V0QWxsVXNlcnNCeUFjY291bnRJZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYWNjb3VudElkOiBudW1iZXIpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgR2V0QWxsVXNlcnNCeUFjY291bnRJZFN1Y2Nlc3MgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW1VzZXJdIEdldCBBbGwgVXNlcnMgQnkgQWNjb3VudCBJZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBHZXRBbGxVc2Vyc0J5QWNjb3VudElkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdXNlcnM6IFNlbmREZXRhaWxzQmlsbGluZ0FjY291bnRbXSkgeyB9XG59XG5cbmV4cG9ydCB0eXBlIEFueSA9IEdldEFsbFVzZXJzQnlBY2NvdW50SWQgfCBHZXRBbGxVc2Vyc0J5QWNjb3VudElkU3VjY2VzcztcbiJdfQ==
