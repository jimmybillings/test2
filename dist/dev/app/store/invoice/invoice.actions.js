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
    ActionFactory.prototype.load = function (orderId, shareKey) {
        return new Load(orderId, shareKey);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (invoice) {
        return new LoadSuccess(invoice);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load(orderId, shareKey) {
        this.orderId = orderId;
        this.shareKey = shareKey;
        this.type = Load.Type;
    }
    Load.Type = '[Invoice] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(invoice) {
        this.invoice = invoice;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Invoice] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Invoice] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9pbnZvaWNlL2ludm9pY2UuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFLQTtJQUFBO0lBSUEsQ0FBQztJQUhRLDRCQUFJLEdBQVgsVUFBWSxPQUFlLEVBQUUsUUFBaUI7UUFDNUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUpBLEFBSUMsSUFBQTtBQUpZLHNDQUFhO0FBTTFCO0lBQTJDLHlDQUFhO0lBQXhEOztJQVFBLENBQUM7SUFQUSwyQ0FBVyxHQUFsQixVQUFtQixPQUFnQjtRQUNqQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLDJDQUFXLEdBQWxCLFVBQW1CLEtBQXVCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0gsNEJBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSMEMsYUFBYSxHQVF2RDtBQVJZLHNEQUFxQjtBQVVsQztJQUdFLGNBQTRCLE9BQWUsRUFBa0IsUUFBZ0I7UUFBakQsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFrQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBRDdELFNBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ2dELENBQUM7SUFGM0QsU0FBSSxHQUFHLGdCQUFnQixDQUFDO0lBR2pELFdBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxvQkFBSTtBQU1qQjtJQUdFLHFCQUE0QixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBRDVCLFNBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ1EsQ0FBQztJQUYxQixnQkFBSSxHQUFHLHdCQUF3QixDQUFDO0lBR3pELGtCQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksa0NBQVc7QUFNeEI7SUFHRSxxQkFBNEIsS0FBdUI7UUFBdkIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFEbkMsU0FBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFDZSxDQUFDO0lBRmpDLGdCQUFJLEdBQUcsd0JBQXdCLENBQUM7SUFHekQsa0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrQ0FBVyIsImZpbGUiOiJhcHAvc3RvcmUvaW52b2ljZS9pbnZvaWNlLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5cbmltcG9ydCB7IEludm9pY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tZXJjZS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXBpRXJyb3JSZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkKG9yZGVySWQ6IG51bWJlciwgc2hhcmVLZXk/OiBzdHJpbmcpOiBMb2FkIHtcbiAgICByZXR1cm4gbmV3IExvYWQob3JkZXJJZCwgc2hhcmVLZXkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRTdWNjZXNzKGludm9pY2U6IEludm9pY2UpOiBMb2FkU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkU3VjY2VzcyhpbnZvaWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkRmFpbHVyZShlcnJvcjogQXBpRXJyb3JSZXNwb25zZSk6IExvYWRGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IExvYWRGYWlsdXJlKGVycm9yKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbSW52b2ljZV0gTG9hZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3JkZXJJZDogbnVtYmVyLCBwdWJsaWMgcmVhZG9ubHkgc2hhcmVLZXk6IHN0cmluZykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbSW52b2ljZV0gTG9hZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgaW52b2ljZTogSW52b2ljZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbSW52b2ljZV0gTG9hZCBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkRmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgdHlwZSBBbnkgPSBMb2FkIHwgTG9hZFN1Y2Nlc3MgfCBMb2FkRmFpbHVyZTtcbiJdfQ==
