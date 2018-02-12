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
    ActionFactory.prototype.loadOrderAsset = function (orderId, uuid) {
        return new LoadOrderAsset(orderId, uuid, 'order');
    };
    ActionFactory.prototype.loadQuoteShowAsset = function (quoteId, uuid) {
        return new LoadQuoteShowAsset(quoteId, uuid, 'quoteShow');
    };
    ActionFactory.prototype.loadQuoteEditAsset = function (uuid) {
        return new LoadQuoteEditAsset(uuid, 'quoteEdit');
    };
    ActionFactory.prototype.loadCartAsset = function (uuid) {
        return new LoadCartAsset(uuid, 'cart');
    };
    ActionFactory.prototype.loadActiveCollectionAsset = function (uuid) {
        return new LoadActiveCollectionAsset(uuid, 'collection');
    };
    ActionFactory.prototype.loadSearchAsset = function (params) {
        return new LoadSearchAsset(params, 'search');
    };
    ActionFactory.prototype.updateMarkersInUrl = function (markers, assetId) {
        return new UpdateMarkersInUrl(markers, assetId);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadAssetAfterParentIsAvailable = function (params, assetType, parentId) {
        return new LoadAssetAfterParentIsAvailable(params, assetType, parentId);
    };
    InternalActionFactory.prototype.loadSuccess = function (activeAsset) {
        return new LoadSuccess(activeAsset);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var LoadOrderAsset = (function () {
    function LoadOrderAsset(orderId, uuid, assetType) {
        this.orderId = orderId;
        this.uuid = uuid;
        this.assetType = assetType;
        this.type = LoadOrderAsset.Type;
    }
    LoadOrderAsset.Type = '[Asset] Load Order Asset';
    return LoadOrderAsset;
}());
exports.LoadOrderAsset = LoadOrderAsset;
var LoadQuoteShowAsset = (function () {
    function LoadQuoteShowAsset(quoteId, uuid, assetType) {
        this.quoteId = quoteId;
        this.uuid = uuid;
        this.assetType = assetType;
        this.type = LoadQuoteShowAsset.Type;
    }
    LoadQuoteShowAsset.Type = '[Asset] Load Quote Show Asset';
    return LoadQuoteShowAsset;
}());
exports.LoadQuoteShowAsset = LoadQuoteShowAsset;
var LoadSearchAsset = (function () {
    function LoadSearchAsset(loadParameters, assetType) {
        this.loadParameters = loadParameters;
        this.assetType = assetType;
        this.type = LoadSearchAsset.Type;
    }
    LoadSearchAsset.Type = '[Asset] Load Search Asset';
    return LoadSearchAsset;
}());
exports.LoadSearchAsset = LoadSearchAsset;
var LoadCartAsset = (function () {
    function LoadCartAsset(uuid, assetType) {
        this.uuid = uuid;
        this.assetType = assetType;
        this.type = LoadCartAsset.Type;
    }
    LoadCartAsset.Type = '[Asset] Load Cart Asset';
    return LoadCartAsset;
}());
exports.LoadCartAsset = LoadCartAsset;
var LoadActiveCollectionAsset = (function () {
    function LoadActiveCollectionAsset(uuid, assetType) {
        this.uuid = uuid;
        this.assetType = assetType;
        this.type = LoadActiveCollectionAsset.Type;
    }
    LoadActiveCollectionAsset.Type = '[Asset] Load Active Collection Asset';
    return LoadActiveCollectionAsset;
}());
exports.LoadActiveCollectionAsset = LoadActiveCollectionAsset;
var LoadQuoteEditAsset = (function () {
    function LoadQuoteEditAsset(uuid, assetType) {
        this.uuid = uuid;
        this.assetType = assetType;
        this.type = LoadQuoteEditAsset.Type;
    }
    LoadQuoteEditAsset.Type = '[Asset] Load Quote Edit Asset';
    return LoadQuoteEditAsset;
}());
exports.LoadQuoteEditAsset = LoadQuoteEditAsset;
var UpdateMarkersInUrl = (function () {
    function UpdateMarkersInUrl(markers, assetId) {
        this.markers = markers;
        this.assetId = assetId;
        this.type = UpdateMarkersInUrl.Type;
    }
    UpdateMarkersInUrl.Type = '[Asset] Update Markers In URL';
    return UpdateMarkersInUrl;
}());
exports.UpdateMarkersInUrl = UpdateMarkersInUrl;
var LoadAssetAfterParentIsAvailable = (function () {
    function LoadAssetAfterParentIsAvailable(loadParameters, assetType, parentId) {
        this.loadParameters = loadParameters;
        this.assetType = assetType;
        this.parentId = parentId;
        this.type = LoadAssetAfterParentIsAvailable.Type;
    }
    LoadAssetAfterParentIsAvailable.Type = '[Asset] Load Asset After Parent Is Available';
    return LoadAssetAfterParentIsAvailable;
}());
exports.LoadAssetAfterParentIsAvailable = LoadAssetAfterParentIsAvailable;
var LoadSuccess = (function () {
    function LoadSuccess(activeAsset) {
        this.activeAsset = activeAsset;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Asset] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Asset] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hc3NldC9hc3NldC5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BO0lBQUE7SUE0QkEsQ0FBQztJQTNCUSxzQ0FBYyxHQUFyQixVQUFzQixPQUFlLEVBQUUsSUFBWTtRQUNqRCxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRU0sMENBQWtCLEdBQXpCLFVBQTBCLE9BQWUsRUFBRSxJQUFZO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUVNLDBDQUFrQixHQUF6QixVQUEwQixJQUFZO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU0scUNBQWEsR0FBcEIsVUFBcUIsSUFBWTtRQUMvQixNQUFNLENBQUMsSUFBSSxhQUFhLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTSxpREFBeUIsR0FBaEMsVUFBaUMsSUFBWTtRQUMzQyxNQUFNLENBQUMsSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUVNLHVDQUFlLEdBQXRCLFVBQXVCLE1BQXdDO1FBQzdELE1BQU0sQ0FBQyxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLDBDQUFrQixHQUF6QixVQUEwQixPQUF1QixFQUFFLE9BQWU7UUFDaEUsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFDSCxvQkFBQztBQUFELENBNUJBLEFBNEJDLElBQUE7QUE1Qlksc0NBQWE7QUE4QjFCO0lB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LElBQUksQ0FBQztJQUN5QyxDQUFDO0lBRmxFLHVCQUFJLEdBQUcsK0JBQStCLENBQUM7SUFHaEUseUJBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxnREFBa0I7QUFNL0I7SUFHRSx5Q0FDa0IsY0FBK0MsRUFDL0MsU0FBb0IsRUFDcEIsUUFBZ0I7UUFGaEIsbUJBQWMsR0FBZCxjQUFjLENBQWlDO1FBQy9DLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUpsQixTQUFJLEdBQUcsK0JBQStCLENBQUMsSUFBSSxDQUFDO0lBS3hELENBQUM7SUFOa0Isb0NBQUksR0FBRyw4Q0FBOEMsQ0FBQztJQU8vRSxzQ0FBQztDQVJELEFBUUMsSUFBQTtBQVJZLDBFQUErQjtBQVU1QztJQUdFLHFCQUE0QixXQUF5QjtRQUF6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYztRQURyQyxTQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNpQixDQUFDO0lBRm5DLGdCQUFJLEdBQUcsc0JBQXNCLENBQUM7SUFHdkQsa0JBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSxrQ0FBVztBQU14QjtJQUdFLHFCQUE0QixLQUF1QjtRQUF2QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQURuQyxTQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQztJQUNlLENBQUM7SUFGakMsZ0JBQUksR0FBRyxzQkFBc0IsQ0FBQztJQUd2RCxrQkFBQztDQUpELEFBSUMsSUFBQTtBQUpZLGtDQUFXIiwiZmlsZSI6ImFwcC9zdG9yZS9hc3NldC9hc3NldC5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0ICogYXMgQ29tbW9uIGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbW1vbi5pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgQ29tbWVyY2UgZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbWVyY2UuaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YmNsaXBNYXJrZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IEFwaUVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEFzc2V0VHlwZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgbG9hZE9yZGVyQXNzZXQob3JkZXJJZDogbnVtYmVyLCB1dWlkOiBzdHJpbmcpOiBMb2FkT3JkZXJBc3NldCB7XG4gICAgcmV0dXJuIG5ldyBMb2FkT3JkZXJBc3NldChvcmRlcklkLCB1dWlkLCAnb3JkZXInKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUXVvdGVTaG93QXNzZXQocXVvdGVJZDogbnVtYmVyLCB1dWlkOiBzdHJpbmcpOiBMb2FkUXVvdGVTaG93QXNzZXQge1xuICAgIHJldHVybiBuZXcgTG9hZFF1b3RlU2hvd0Fzc2V0KHF1b3RlSWQsIHV1aWQsICdxdW90ZVNob3cnKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkUXVvdGVFZGl0QXNzZXQodXVpZDogc3RyaW5nKTogTG9hZFF1b3RlRWRpdEFzc2V0IHtcbiAgICByZXR1cm4gbmV3IExvYWRRdW90ZUVkaXRBc3NldCh1dWlkLCAncXVvdGVFZGl0Jyk7XG4gIH1cblxuICBwdWJsaWMgbG9hZENhcnRBc3NldCh1dWlkOiBzdHJpbmcpOiBMb2FkQ2FydEFzc2V0IHtcbiAgICByZXR1cm4gbmV3IExvYWRDYXJ0QXNzZXQodXVpZCwgJ2NhcnQnKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0KHV1aWQ6IHN0cmluZyk6IExvYWRBY3RpdmVDb2xsZWN0aW9uQXNzZXQge1xuICAgIHJldHVybiBuZXcgTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldCh1dWlkLCAnY29sbGVjdGlvbicpO1xuICB9XG5cbiAgcHVibGljIGxvYWRTZWFyY2hBc3NldChwYXJhbXM6IENvbW1vbi5TZWFyY2hBc3NldExvYWRQYXJhbWV0ZXJzKTogTG9hZFNlYXJjaEFzc2V0IHtcbiAgICByZXR1cm4gbmV3IExvYWRTZWFyY2hBc3NldChwYXJhbXMsICdzZWFyY2gnKTtcbiAgfVxuXG4gIHB1YmxpYyB1cGRhdGVNYXJrZXJzSW5VcmwobWFya2VyczogU3ViY2xpcE1hcmtlcnMsIGFzc2V0SWQ6IG51bWJlcikge1xuICAgIHJldHVybiBuZXcgVXBkYXRlTWFya2Vyc0luVXJsKG1hcmtlcnMsIGFzc2V0SWQpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRBc3NldEFmdGVyUGFyZW50SXNBdmFpbGFibGUoXG4gICAgcGFyYW1zOiBDb21tb24uQ2hpbGRBc3NldExvYWRQYXJhbWV0ZXJzLFxuICAgIGFzc2V0VHlwZTogQXNzZXRUeXBlLFxuICAgIHBhcmVudElkPzogbnVtYmVyXG4gICk6IExvYWRBc3NldEFmdGVyUGFyZW50SXNBdmFpbGFibGUge1xuICAgIHJldHVybiBuZXcgTG9hZEFzc2V0QWZ0ZXJQYXJlbnRJc0F2YWlsYWJsZShwYXJhbXMsIGFzc2V0VHlwZSwgcGFyZW50SWQpO1xuICB9XG5cbiAgcHVibGljIGxvYWRTdWNjZXNzKGFjdGl2ZUFzc2V0OiBDb21tb24uQXNzZXQpOiBMb2FkU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkU3VjY2VzcyhhY3RpdmVBc3NldCk7XG4gIH1cblxuICBwdWJsaWMgbG9hZEZhaWx1cmUoZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpOiBMb2FkRmFpbHVyZSB7XG4gICAgcmV0dXJuIG5ldyBMb2FkRmFpbHVyZShlcnJvcik7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRPcmRlckFzc2V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBc3NldF0gTG9hZCBPcmRlciBBc3NldCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZE9yZGVyQXNzZXQuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IG9yZGVySWQ6IG51bWJlciwgcHVibGljIHJlYWRvbmx5IHV1aWQ6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IGFzc2V0VHlwZTogQXNzZXRUeXBlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRRdW90ZVNob3dBc3NldCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQXNzZXRdIExvYWQgUXVvdGUgU2hvdyBBc3NldCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFF1b3RlU2hvd0Fzc2V0LlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBxdW90ZUlkOiBudW1iZXIsIHB1YmxpYyByZWFkb25seSB1dWlkOiBzdHJpbmcsIHB1YmxpYyByZWFkb25seSBhc3NldFR5cGU6IEFzc2V0VHlwZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkU2VhcmNoQXNzZXQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0Fzc2V0XSBMb2FkIFNlYXJjaCBBc3NldCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFNlYXJjaEFzc2V0LlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBsb2FkUGFyYW1ldGVyczogQ29tbW9uLlNlYXJjaEFzc2V0TG9hZFBhcmFtZXRlcnMsIHB1YmxpYyByZWFkb25seSBhc3NldFR5cGU6IEFzc2V0VHlwZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkQ2FydEFzc2V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBc3NldF0gTG9hZCBDYXJ0IEFzc2V0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkQ2FydEFzc2V0LlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSB1dWlkOiBzdHJpbmcsIHB1YmxpYyByZWFkb25seSBhc3NldFR5cGU6IEFzc2V0VHlwZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkQWN0aXZlQ29sbGVjdGlvbkFzc2V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBc3NldF0gTG9hZCBBY3RpdmUgQ29sbGVjdGlvbiBBc3NldCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgdXVpZDogc3RyaW5nLCBwdWJsaWMgcmVhZG9ubHkgYXNzZXRUeXBlOiBBc3NldFR5cGUpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZFF1b3RlRWRpdEFzc2V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBc3NldF0gTG9hZCBRdW90ZSBFZGl0IEFzc2V0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkUXVvdGVFZGl0QXNzZXQuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHV1aWQ6IHN0cmluZywgcHVibGljIHJlYWRvbmx5IGFzc2V0VHlwZTogQXNzZXRUeXBlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZU1hcmtlcnNJblVybCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQXNzZXRdIFVwZGF0ZSBNYXJrZXJzIEluIFVSTCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gVXBkYXRlTWFya2Vyc0luVXJsLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBtYXJrZXJzOiBTdWJjbGlwTWFya2VycywgcHVibGljIHJlYWRvbmx5IGFzc2V0SWQ6IG51bWJlcikgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBc3NldF0gTG9hZCBBc3NldCBBZnRlciBQYXJlbnQgSXMgQXZhaWxhYmxlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyByZWFkb25seSBsb2FkUGFyYW1ldGVyczogQ29tbW9uLkNoaWxkQXNzZXRMb2FkUGFyYW1ldGVycyxcbiAgICBwdWJsaWMgcmVhZG9ubHkgYXNzZXRUeXBlOiBBc3NldFR5cGUsXG4gICAgcHVibGljIHJlYWRvbmx5IHBhcmVudElkOiBudW1iZXJcbiAgKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBc3NldF0gTG9hZCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYWN0aXZlQXNzZXQ6IENvbW1vbi5Bc3NldCkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQXNzZXRdIExvYWQgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZEZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuZXhwb3J0IHR5cGUgQW55ID0gTG9hZENhcnRBc3NldCB8IExvYWRPcmRlckFzc2V0IHwgTG9hZFF1b3RlRWRpdEFzc2V0IHwgTG9hZFNlYXJjaEFzc2V0IHwgTG9hZFF1b3RlU2hvd0Fzc2V0IHxcbiAgTG9hZEFjdGl2ZUNvbGxlY3Rpb25Bc3NldCB8IExvYWRTdWNjZXNzIHwgTG9hZEZhaWx1cmUgfCBMb2FkQXNzZXRBZnRlclBhcmVudElzQXZhaWxhYmxlIHwgVXBkYXRlTWFya2Vyc0luVXJsO1xuXG4iXX0=
