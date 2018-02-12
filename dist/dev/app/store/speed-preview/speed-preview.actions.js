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
    ActionFactory.prototype.load = function (asset) {
        return new Load(asset);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (speedViewData, assetId) {
        return new LoadSuccess(speedViewData, assetId);
    };
    InternalActionFactory.prototype.loadFailure = function (assetId) {
        return new LoadFailure(assetId);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load(asset) {
        this.asset = asset;
        this.type = Load.Type;
    }
    Load.Type = '[SpeedPreview] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(speedViewData, assetId) {
        this.speedViewData = speedViewData;
        this.assetId = assetId;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[SpeedPreview] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(assetId) {
        this.assetId = assetId;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[SpeedPreview] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQTtJQUFBO0lBSUEsQ0FBQztJQUhRLDRCQUFJLEdBQVgsVUFBWSxLQUFvQjtRQUM5QixNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUNILG9CQUFDO0FBQUQsQ0FKQSxBQUlDLElBQUE7QUFKWSxzQ0FBYTtBQU0xQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUFRQSxDQUFDO0lBUFEsMkNBQVcsR0FBbEIsVUFBbUIsYUFBNEIsRUFBRSxPQUFlO1FBQzlELE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVNLDJDQUFXLEdBQWxCLFVBQW1CLE9BQWU7UUFDaEMsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDSCw0QkFBQztBQUFELENBUkEsQUFRQyxDQVIwQyxhQUFhLEdBUXZEO0FBUlksc0RBQXFCO0FBVWxDO0lBR0UsY0FBNEIsS0FBb0I7UUFBcEIsVUFBSyxHQUFMLEtBQUssQ0FBZTtRQURoQyxTQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNtQixDQUFDO0lBRjlCLFNBQUksR0FBRyxxQkFBcUIsQ0FBQztJQUd0RCxXQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksb0JBQUk7QUFNakI7SUFHRSxxQkFBNEIsYUFBNEIsRUFBa0IsT0FBZTtRQUE3RCxrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUFrQixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRHpFLFNBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ3FELENBQUM7SUFGdkUsZ0JBQUksR0FBRyw2QkFBNkIsQ0FBQztJQUc5RCxrQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGtDQUFXO0FBTXhCO0lBR0UscUJBQTRCLE9BQWU7UUFBZixZQUFPLEdBQVAsT0FBTyxDQUFRO1FBRDNCLFNBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDO0lBQ08sQ0FBQztJQUZ6QixnQkFBSSxHQUFHLDZCQUE2QixDQUFDO0lBSTlELGtCQUFDO0NBTEQsQUFLQyxJQUFBO0FBTFksa0NBQVciLCJmaWxlIjoiYXBwL3N0b3JlL3NwZWVkLXByZXZpZXcvc3BlZWQtcHJldmlldy5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHsgRW5oYW5jZWRBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IFNwZWVkdmlld0RhdGEgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hc3NldC5pbnRlcmZhY2UnO1xuXG5leHBvcnQgY2xhc3MgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogTG9hZCB7XG4gICAgcmV0dXJuIG5ldyBMb2FkKGFzc2V0KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW50ZXJuYWxBY3Rpb25GYWN0b3J5IGV4dGVuZHMgQWN0aW9uRmFjdG9yeSB7XG4gIHB1YmxpYyBsb2FkU3VjY2VzcyhzcGVlZFZpZXdEYXRhOiBTcGVlZHZpZXdEYXRhLCBhc3NldElkOiBudW1iZXIpOiBMb2FkU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkU3VjY2VzcyhzcGVlZFZpZXdEYXRhLCBhc3NldElkKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkRmFpbHVyZShhc3NldElkOiBudW1iZXIpOiBMb2FkRmFpbHVyZSB7XG4gICAgcmV0dXJuIG5ldyBMb2FkRmFpbHVyZShhc3NldElkKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU3BlZWRQcmV2aWV3XSBMb2FkJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhc3NldDogRW5oYW5jZWRBc3NldCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbU3BlZWRQcmV2aWV3XSBMb2FkIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBzcGVlZFZpZXdEYXRhOiBTcGVlZHZpZXdEYXRhLCBwdWJsaWMgcmVhZG9ubHkgYXNzZXRJZDogbnVtYmVyKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tTcGVlZFByZXZpZXddIExvYWQgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZEZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFzc2V0SWQ6IG51bWJlcikgeyB9XG5cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gTG9hZCB8IExvYWRTdWNjZXNzIHwgTG9hZEZhaWx1cmU7XG4iXX0=
