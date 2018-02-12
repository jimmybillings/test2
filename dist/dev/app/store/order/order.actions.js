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
    ActionFactory.prototype.load = function (orderId) {
        return new Load(orderId);
    };
    ActionFactory.prototype.loadSuccess = function (order) {
        return new LoadSuccess(order);
    };
    ActionFactory.prototype.setCheckoutState = function (checkingOut) {
        return new SetCheckoutState(checkingOut);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load(orderId) {
        this.orderId = orderId;
        this.type = Load.Type;
    }
    Load.Type = '[Order] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(activeOrder) {
        this.activeOrder = activeOrder;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Order] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Order] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var SetCheckoutState = (function () {
    function SetCheckoutState(checkingOut) {
        this.checkingOut = checkingOut;
        this.type = SetCheckoutState.Type;
    }
    SetCheckoutState.Type = '[Order] Set Checkout State';
    return SetCheckoutState;
}());
exports.SetCheckoutState = SetCheckoutState;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9vcmRlci9vcmRlci5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBO0lBQUE7SUFhQSxDQUFDO0lBWlEsNEJBQUksR0FBWCxVQUFZLE9BQWU7UUFDekIsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFHTSxtQ0FBVyxHQUFsQixVQUFtQixLQUFZO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sd0NBQWdCLEdBQXZCLFVBQXdCLFdBQW9CO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFDSCxvQkFBQztBQUFELENBYkEsQUFhQyxJQUFBO0FBYlksc0NBQWE7QUFlMUI7SUFBMkMseUNBQWE7SUFBeEQ7O0lBS0EsQ0FBQztJQUhRLDJDQUFXLEdBQWxCLFVBQW1CLEtBQXVCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQUxBLEFBS0MsQ0FMMEMsYUFBYSxHQUt2RDtBQUxZLHNEQUFxQjtBQU9sQztJQUdFLGNBQTRCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRDNCLFNBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2MsQ0FBQztJQUZ6QixTQUFJLEdBQUcsY0FBYyxDQUFDO0lBRy9DLFdBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxvQkFBSTtBQU1qQjtJQUdFLHFCQUE0QixXQUFrQjtRQUFsQixnQkFBVyxHQUFYLFdBQVcsQ0FBTztRQUQ5QixTQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNVLENBQUM7SUFGNUIsZ0JBQUksR0FBRyxzQkFBc0IsQ0FBQztJQUd2RCxrQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGtDQUFXO0FBTXhCO0lBR0UscUJBQTRCLEtBQXVCO1FBQXZCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBRG5DLFNBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ2UsQ0FBQztJQUZqQyxnQkFBSSxHQUFHLHNCQUFzQixDQUFDO0lBR3ZELGtCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksa0NBQVc7QUFNeEI7SUFHRSwwQkFBNEIsV0FBb0I7UUFBcEIsZ0JBQVcsR0FBWCxXQUFXLENBQVM7UUFEaEMsU0FBSSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQztJQUNPLENBQUM7SUFGOUIscUJBQUksR0FBRyw0QkFBNEIsQ0FBQztJQUc3RCx1QkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLDRDQUFnQiIsImZpbGUiOiJhcHAvc3RvcmUvb3JkZXIvb3JkZXIuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvbiB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcblxuaW1wb3J0IHsgT3JkZXIgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkKG9yZGVySWQ6IG51bWJlcik6IExvYWQge1xuICAgIHJldHVybiBuZXcgTG9hZChvcmRlcklkKTtcbiAgfVxuXG4gIC8vIFRPRE86IE1vdmUgbWUgaW50byBJbnRlcm5hbC5cbiAgcHVibGljIGxvYWRTdWNjZXNzKG9yZGVyOiBPcmRlcik6IExvYWRTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IExvYWRTdWNjZXNzKG9yZGVyKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRDaGVja291dFN0YXRlKGNoZWNraW5nT3V0OiBib29sZWFuKTogU2V0Q2hlY2tvdXRTdGF0ZSB7XG4gICAgcmV0dXJuIG5ldyBTZXRDaGVja291dFN0YXRlKGNoZWNraW5nT3V0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7XG5cbiAgcHVibGljIGxvYWRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgTG9hZEZhaWx1cmUoZXJyb3IpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tPcmRlcl0gTG9hZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3JkZXJJZDogbnVtYmVyKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tPcmRlcl0gTG9hZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYWN0aXZlT3JkZXI6IE9yZGVyKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tPcmRlcl0gTG9hZCBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkRmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgU2V0Q2hlY2tvdXRTdGF0ZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbT3JkZXJdIFNldCBDaGVja291dCBTdGF0ZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2V0Q2hlY2tvdXRTdGF0ZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY2hlY2tpbmdPdXQ6IGJvb2xlYW4pIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBMb2FkIHwgTG9hZFN1Y2Nlc3MgfCBMb2FkRmFpbHVyZSB8IFNldENoZWNrb3V0U3RhdGU7XG4iXX0=
