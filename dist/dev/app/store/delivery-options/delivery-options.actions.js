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
    ActionFactory.prototype.load = function (asset, shareKey) {
        return new Load(asset, shareKey);
    };
    ActionFactory.prototype.download = function (option) {
        return new Download(option);
    };
    ActionFactory.prototype.downloadViaAspera = function (option) {
        return new DownloadViaAspera(option);
    };
    ActionFactory.prototype.deliver = function (assetId, option, markers) {
        return new Deliver(assetId, option, markers);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (options) {
        return new LoadSuccess(options);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    InternalActionFactory.prototype.deliverySuccess = function (orderId, option) {
        return new DeliverySuccess(orderId, option);
    };
    InternalActionFactory.prototype.deliveryFailure = function (error) {
        return new DeliveryFailure(error);
    };
    InternalActionFactory.prototype.setLoadingMessageFlag = function () {
        return new SetLoadingMessageFlag();
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var Load = (function () {
    function Load(activeAsset, shareKey) {
        this.activeAsset = activeAsset;
        this.shareKey = shareKey;
        this.type = Load.Type;
    }
    Load.Type = '[Delivery Options] Load';
    return Load;
}());
exports.Load = Load;
var LoadSuccess = (function () {
    function LoadSuccess(options) {
        this.options = options;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Delivery Options] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Delivery Options] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var Download = (function () {
    function Download(option) {
        this.option = option;
        this.type = Download.Type;
    }
    Download.Type = '[Delivery Options] Download';
    return Download;
}());
exports.Download = Download;
var DownloadViaAspera = (function () {
    function DownloadViaAspera(option) {
        this.option = option;
        this.type = DownloadViaAspera.Type;
    }
    DownloadViaAspera.Type = '[Delivery Options] Download Via Aspera';
    return DownloadViaAspera;
}());
exports.DownloadViaAspera = DownloadViaAspera;
var Deliver = (function () {
    function Deliver(assetId, option, markers) {
        this.assetId = assetId;
        this.option = option;
        this.markers = markers;
        this.type = Deliver.Type;
    }
    Deliver.Type = '[Delivery Options] Deliver Asset';
    return Deliver;
}());
exports.Deliver = Deliver;
var DeliverySuccess = (function () {
    function DeliverySuccess(orderId, option) {
        this.orderId = orderId;
        this.option = option;
        this.type = DeliverySuccess.Type;
    }
    DeliverySuccess.Type = '[Delivery Options] Delivery Success';
    return DeliverySuccess;
}());
exports.DeliverySuccess = DeliverySuccess;
var DeliveryFailure = (function () {
    function DeliveryFailure(error) {
        this.error = error;
        this.type = DeliveryFailure.Type;
    }
    DeliveryFailure.Type = '[Delivery Options] Delivery Failure';
    return DeliveryFailure;
}());
exports.DeliveryFailure = DeliveryFailure;
var SetLoadingMessageFlag = (function () {
    function SetLoadingMessageFlag() {
        this.type = SetLoadingMessageFlag.Type;
    }
    SetLoadingMessageFlag.Type = '[Delivery Options] Set Loading Message Flag';
    return SetLoadingMessageFlag;
}());
exports.SetLoadingMessageFlag = SetLoadingMessageFlag;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9kZWxpdmVyeS1vcHRpb25zL2RlbGl2ZXJ5LW9wdGlvbnMuYWN0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFNQTtJQUFBO0lBZ0JBLENBQUM7SUFmUSw0QkFBSSxHQUFYLFVBQVksS0FBWSxFQUFFLFFBQWlCO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLGdDQUFRLEdBQWYsVUFBZ0IsTUFBc0I7UUFDcEMsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSx5Q0FBaUIsR0FBeEIsVUFBeUIsTUFBc0I7UUFDN0MsTUFBTSxDQUFDLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVNLCtCQUFPLEdBQWQsVUFBZSxPQUFlLEVBQUUsTUFBc0IsRUFBRSxPQUF1QjtRQUM3RSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQWhCQSxBQWdCQyxJQUFBO0FBaEJZLHNDQUFhO0FBa0IxQjtJQUEyQyx5Q0FBYTtJQUF4RDs7SUFvQkEsQ0FBQztJQW5CUSwyQ0FBVyxHQUFsQixVQUFtQixPQUF3QjtRQUN6QyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLDJDQUFXLEdBQWxCLFVBQW1CLEtBQXVCO1FBQ3hDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sK0NBQWUsR0FBdEIsVUFBdUIsT0FBZSxFQUFFLE1BQXNCO1FBQzVELE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUMsQ0FB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QUFxQiIsImZpbGUiOiJhcHAvc3RvcmUvZGVsaXZlcnktb3B0aW9ucy9kZWxpdmVyeS1vcHRpb25zLmFjdGlvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb24gfSBmcm9tICdAbmdyeC9zdG9yZSc7XG5pbXBvcnQgeyBBcGlFcnJvclJlc3BvbnNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXBpLmludGVyZmFjZSc7XG5pbXBvcnQgeyBEZWxpdmVyeU9wdGlvbnMsIERlbGl2ZXJ5T3B0aW9uIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXNzZXQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0IH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBTdWJjbGlwTWFya2VycyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5cbmV4cG9ydCBjbGFzcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWQoYXNzZXQ6IEFzc2V0LCBzaGFyZUtleT86IHN0cmluZyk6IExvYWQge1xuICAgIHJldHVybiBuZXcgTG9hZChhc3NldCwgc2hhcmVLZXkpO1xuICB9XG5cbiAgcHVibGljIGRvd25sb2FkKG9wdGlvbjogRGVsaXZlcnlPcHRpb24pOiBEb3dubG9hZCB7XG4gICAgcmV0dXJuIG5ldyBEb3dubG9hZChvcHRpb24pO1xuICB9XG5cbiAgcHVibGljIGRvd25sb2FkVmlhQXNwZXJhKG9wdGlvbjogRGVsaXZlcnlPcHRpb24pOiBEb3dubG9hZFZpYUFzcGVyYSB7XG4gICAgcmV0dXJuIG5ldyBEb3dubG9hZFZpYUFzcGVyYShvcHRpb24pO1xuICB9XG5cbiAgcHVibGljIGRlbGl2ZXIoYXNzZXRJZDogbnVtYmVyLCBvcHRpb246IERlbGl2ZXJ5T3B0aW9uLCBtYXJrZXJzOiBTdWJjbGlwTWFya2Vycyk6IERlbGl2ZXIge1xuICAgIHJldHVybiBuZXcgRGVsaXZlcihhc3NldElkLCBvcHRpb24sIG1hcmtlcnMpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRTdWNjZXNzKG9wdGlvbnM6IERlbGl2ZXJ5T3B0aW9ucyk6IExvYWRTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IExvYWRTdWNjZXNzKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGxvYWRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgTG9hZEZhaWx1cmUoZXJyb3IpO1xuICB9XG5cbiAgcHVibGljIGRlbGl2ZXJ5U3VjY2VzcyhvcmRlcklkOiBudW1iZXIsIG9wdGlvbjogRGVsaXZlcnlPcHRpb24pOiBEZWxpdmVyeVN1Y2Nlc3Mge1xuICAgIHJldHVybiBuZXcgRGVsaXZlcnlTdWNjZXNzKG9yZGVySWQsIG9wdGlvbik7XG4gIH1cblxuICBwdWJsaWMgZGVsaXZlcnlGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogRGVsaXZlcnlGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IERlbGl2ZXJ5RmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgc2V0TG9hZGluZ01lc3NhZ2VGbGFnKCk6IFNldExvYWRpbmdNZXNzYWdlRmxhZyB7XG4gICAgcmV0dXJuIG5ldyBTZXRMb2FkaW5nTWVzc2FnZUZsYWcoKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbRGVsaXZlcnkgT3B0aW9uc10gTG9hZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYWN0aXZlQXNzZXQ6IEFzc2V0LCBwdWJsaWMgcmVhZG9ubHkgc2hhcmVLZXk6IHN0cmluZykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbRGVsaXZlcnkgT3B0aW9uc10gTG9hZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uczogRGVsaXZlcnlPcHRpb25zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tEZWxpdmVyeSBPcHRpb25zXSBMb2FkIEZhaWx1cmUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBEb3dubG9hZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbRGVsaXZlcnkgT3B0aW9uc10gRG93bmxvYWQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IERvd25sb2FkLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBvcHRpb246IERlbGl2ZXJ5T3B0aW9uKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIERvd25sb2FkVmlhQXNwZXJhIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tEZWxpdmVyeSBPcHRpb25zXSBEb3dubG9hZCBWaWEgQXNwZXJhJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBEb3dubG9hZFZpYUFzcGVyYS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgb3B0aW9uOiBEZWxpdmVyeU9wdGlvbikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBEZWxpdmVyIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tEZWxpdmVyeSBPcHRpb25zXSBEZWxpdmVyIEFzc2V0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBEZWxpdmVyLlR5cGU7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByZWFkb25seSBhc3NldElkOiBudW1iZXIsXG4gICAgcHVibGljIHJlYWRvbmx5IG9wdGlvbjogRGVsaXZlcnlPcHRpb24sXG4gICAgcHVibGljIHJlYWRvbmx5IG1hcmtlcnM/OiBTdWJjbGlwTWFya2Vyc1xuICApIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVsaXZlcnlTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tEZWxpdmVyeSBPcHRpb25zXSBEZWxpdmVyeSBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBEZWxpdmVyeVN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9yZGVySWQ6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IG9wdGlvbjogRGVsaXZlcnlPcHRpb24pIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgRGVsaXZlcnlGYWlsdXJlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tEZWxpdmVyeSBPcHRpb25zXSBEZWxpdmVyeSBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBEZWxpdmVyeUZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNldExvYWRpbmdNZXNzYWdlRmxhZyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbRGVsaXZlcnkgT3B0aW9uc10gU2V0IExvYWRpbmcgTWVzc2FnZSBGbGFnJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRMb2FkaW5nTWVzc2FnZUZsYWcuVHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gTG9hZCB8IExvYWRTdWNjZXNzIHwgTG9hZEZhaWx1cmUgfCBEb3dubG9hZCB8IERlbGl2ZXIgfCBEZWxpdmVyeVN1Y2Nlc3MgfCBEZWxpdmVyeUZhaWx1cmUgfCBEb3dubG9hZFZpYUFzcGVyYSB8XG4gIFNldExvYWRpbmdNZXNzYWdlRmxhZztcbiJdfQ==
