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
    ActionFactory.prototype.loadFeeConfig = function () {
        return new LoadFeeConfig();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadFeeConfigSuccess = function (feeConfig) {
        return new LoadFeeConfigSuccess(feeConfig);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var LoadFeeConfig = (function () {
    function LoadFeeConfig() {
        this.type = LoadFeeConfig.Type;
    }
    LoadFeeConfig.Type = '[Fee Config] Load Fee Config';
    return LoadFeeConfig;
}());
exports.LoadFeeConfig = LoadFeeConfig;
var LoadFeeConfigSuccess = (function () {
    function LoadFeeConfigSuccess(feeConfig) {
        this.feeConfig = feeConfig;
        this.type = LoadFeeConfigSuccess.Type;
    }
    LoadFeeConfigSuccess.Type = '[Fee Config] Load Fee Config Success';
    return LoadFeeConfigSuccess;
}());
exports.LoadFeeConfigSuccess = LoadFeeConfigSuccess;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFHQTtJQUFBO0lBSUEsQ0FBQztJQUhRLHFDQUFhLEdBQXBCO1FBQ0UsTUFBTSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSxzQ0FBYTtBQU0xQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUFJQSxDQUFDO0lBSFEsb0RBQW9CLEdBQTNCLFVBQTRCLFNBQW9CO1FBQzlDLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFDSCw0QkFBQztBQUFELENBSkEsQUFJQyxDQUowQyxhQUFhLEdBSXZEO0FBSlksc0RBQXFCO0FBTWxDO0lBQUE7UUFFa0IsU0FBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUZ3QixrQkFBSSxHQUFHLDhCQUE4QixDQUFDO0lBRS9ELG9CQUFDO0NBSEQsQUFHQyxJQUFBO0FBSFksc0NBQWE7QUFLMUI7SUFHRSw4QkFBNEIsU0FBb0I7UUFBcEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQURoQyxTQUFJLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDO0lBQ0csQ0FBQztJQUY5Qix5QkFBSSxHQUFHLHNDQUFzQyxDQUFDO0lBR3ZFLDJCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksb0RBQW9CIiwiZmlsZSI6ImFwcC9zdG9yZS9mZWUtY29uZmlnL2ZlZS1jb25maWcuYWN0aW9ucy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEZlZUNvbmZpZyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1lcmNlLmludGVyZmFjZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRGZWVDb25maWcoKTogTG9hZEZlZUNvbmZpZyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkRmVlQ29uZmlnKCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEludGVybmFsQWN0aW9uRmFjdG9yeSBleHRlbmRzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgbG9hZEZlZUNvbmZpZ1N1Y2Nlc3MoZmVlQ29uZmlnOiBGZWVDb25maWcpOiBMb2FkRmVlQ29uZmlnU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkRmVlQ29uZmlnU3VjY2VzcyhmZWVDb25maWcpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkRmVlQ29uZmlnIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tGZWUgQ29uZmlnXSBMb2FkIEZlZSBDb25maWcnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRGZWVDb25maWcuVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIExvYWRGZWVDb25maWdTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tGZWUgQ29uZmlnXSBMb2FkIEZlZSBDb25maWcgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZEZlZUNvbmZpZ1N1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGZlZUNvbmZpZzogRmVlQ29uZmlnKSB7IH1cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gTG9hZEZlZUNvbmZpZyB8IExvYWRGZWVDb25maWdTdWNjZXNzO1xuIl19
