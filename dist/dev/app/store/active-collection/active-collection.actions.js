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
var defaultPagination = { currentPage: 1, pageSize: 100 };
var ActionFactory = (function () {
    function ActionFactory() {
    }
    ActionFactory.prototype.load = function (pagination) {
        if (pagination === void 0) { pagination = defaultPagination; }
        return new Load(pagination);
    };
    ActionFactory.prototype.loadIfNeeded = function (pagination) {
        if (pagination === void 0) { pagination = defaultPagination; }
        return new LoadIfNeeded(pagination);
    };
    ActionFactory.prototype.set = function (collectionId, pagination) {
        if (pagination === void 0) { pagination = defaultPagination; }
        return new Set(collectionId, pagination);
    };
    ActionFactory.prototype.loadPage = function (pagination) {
        if (pagination === void 0) { pagination = defaultPagination; }
        return new LoadPage(pagination);
    };
    ActionFactory.prototype.addAsset = function (asset, markers) {
        return new AddAsset(asset, markers);
    };
    ActionFactory.prototype.removeAsset = function (asset) {
        return new RemoveAsset(asset);
    };
    ActionFactory.prototype.updateAssetMarkers = function (asset, markers) {
        return new UpdateAssetMarkers(asset, markers);
    };
    ActionFactory.prototype.addPageOfSearchAssets = function () {
        return new AddPageOfSearchAssets();
    };
    ActionFactory.prototype.reset = function () {
        return new Reset();
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.loadSuccess = function (activeCollection) {
        return new LoadSuccess(activeCollection);
    };
    InternalActionFactory.prototype.loadFailure = function (error) {
        return new LoadFailure(error);
    };
    InternalActionFactory.prototype.setSuccess = function (activeCollection) {
        return new SetSuccess(activeCollection);
    };
    InternalActionFactory.prototype.setFailure = function (error) {
        return new SetFailure(error);
    };
    InternalActionFactory.prototype.loadPageSuccess = function (currentPageItems) {
        return new LoadPageSuccess(currentPageItems);
    };
    InternalActionFactory.prototype.loadPageFailure = function (error) {
        return new LoadPageFailure(error);
    };
    InternalActionFactory.prototype.addAssetSuccess = function (currentPageItems) {
        return new AddAssetSuccess(currentPageItems);
    };
    InternalActionFactory.prototype.addAssetFailure = function (error) {
        return new AddAssetFailure(error);
    };
    InternalActionFactory.prototype.removeAssetSuccess = function (currentPageItems) {
        return new RemoveAssetSuccess(currentPageItems);
    };
    InternalActionFactory.prototype.removeAssetFailure = function (error) {
        return new RemoveAssetFailure(error);
    };
    InternalActionFactory.prototype.updateAssetMarkersSuccess = function (currentPageItems) {
        return new UpdateAssetMarkersSuccess(currentPageItems);
    };
    InternalActionFactory.prototype.updateAssetMarkersFailure = function (error) {
        return new UpdateAssetMarkersFailure(error);
    };
    InternalActionFactory.prototype.addPageOfSearchAssetsSuccess = function (currentPageItems) {
        return new AddPageOfSearchAssetsSuccess(currentPageItems);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
;
var Load = (function () {
    function Load(pagination) {
        this.pagination = pagination;
        this.type = Load.Type;
    }
    Load.Type = '[Active Collection] Load';
    return Load;
}());
exports.Load = Load;
var LoadIfNeeded = (function () {
    function LoadIfNeeded(pagination) {
        this.pagination = pagination;
        this.type = LoadIfNeeded.Type;
    }
    LoadIfNeeded.Type = '[Active Collection] Load If Needed';
    return LoadIfNeeded;
}());
exports.LoadIfNeeded = LoadIfNeeded;
var LoadSuccess = (function () {
    function LoadSuccess(activeCollection) {
        this.activeCollection = activeCollection;
        this.type = LoadSuccess.Type;
    }
    LoadSuccess.Type = '[Active Collection] Load Success';
    return LoadSuccess;
}());
exports.LoadSuccess = LoadSuccess;
var LoadFailure = (function () {
    function LoadFailure(error) {
        this.error = error;
        this.type = LoadFailure.Type;
    }
    LoadFailure.Type = '[Active Collection] Load Failure';
    return LoadFailure;
}());
exports.LoadFailure = LoadFailure;
var Set = (function () {
    function Set(collectionId, pagination) {
        this.collectionId = collectionId;
        this.pagination = pagination;
        this.type = Set.Type;
    }
    Set.Type = '[Active Collection] Set';
    return Set;
}());
exports.Set = Set;
var SetSuccess = (function () {
    function SetSuccess(activeCollection) {
        this.activeCollection = activeCollection;
        this.type = SetSuccess.Type;
    }
    SetSuccess.Type = '[Active Collection] Set Success';
    return SetSuccess;
}());
exports.SetSuccess = SetSuccess;
var SetFailure = (function () {
    function SetFailure(error) {
        this.error = error;
        this.type = SetFailure.Type;
    }
    SetFailure.Type = '[Active Collection] Set Failure';
    return SetFailure;
}());
exports.SetFailure = SetFailure;
var LoadPage = (function () {
    function LoadPage(pagination) {
        this.pagination = pagination;
        this.type = LoadPage.Type;
    }
    LoadPage.Type = '[Active Collection] Load Page';
    return LoadPage;
}());
exports.LoadPage = LoadPage;
var LoadPageSuccess = (function () {
    function LoadPageSuccess(currentPageItems) {
        this.currentPageItems = currentPageItems;
        this.type = LoadPageSuccess.Type;
    }
    LoadPageSuccess.Type = '[Active Collection] Load Page Success';
    return LoadPageSuccess;
}());
exports.LoadPageSuccess = LoadPageSuccess;
var LoadPageFailure = (function () {
    function LoadPageFailure(error) {
        this.error = error;
        this.type = LoadPageFailure.Type;
    }
    LoadPageFailure.Type = '[Active Collection] Load Page Failure';
    return LoadPageFailure;
}());
exports.LoadPageFailure = LoadPageFailure;
var AddAsset = (function () {
    function AddAsset(asset, markers) {
        this.asset = asset;
        this.markers = markers;
        this.type = AddAsset.Type;
    }
    AddAsset.Type = '[Active Collection] Add Asset';
    return AddAsset;
}());
exports.AddAsset = AddAsset;
var AddAssetSuccess = (function () {
    function AddAssetSuccess(currentPageItems) {
        this.currentPageItems = currentPageItems;
        this.type = AddAssetSuccess.Type;
    }
    AddAssetSuccess.Type = '[Active Collection] Add Asset Success';
    return AddAssetSuccess;
}());
exports.AddAssetSuccess = AddAssetSuccess;
var AddAssetFailure = (function () {
    function AddAssetFailure(error) {
        this.error = error;
        this.type = AddAssetFailure.Type;
    }
    AddAssetFailure.Type = '[Active Collection] Add Asset Failure';
    return AddAssetFailure;
}());
exports.AddAssetFailure = AddAssetFailure;
var RemoveAsset = (function () {
    function RemoveAsset(asset) {
        this.asset = asset;
        this.type = RemoveAsset.Type;
    }
    RemoveAsset.Type = '[Active Collection] Remove Asset';
    return RemoveAsset;
}());
exports.RemoveAsset = RemoveAsset;
var RemoveAssetSuccess = (function () {
    function RemoveAssetSuccess(currentPageItems) {
        this.currentPageItems = currentPageItems;
        this.type = RemoveAssetSuccess.Type;
    }
    RemoveAssetSuccess.Type = '[Active Collection] Remove Asset Success';
    return RemoveAssetSuccess;
}());
exports.RemoveAssetSuccess = RemoveAssetSuccess;
var RemoveAssetFailure = (function () {
    function RemoveAssetFailure(error) {
        this.error = error;
        this.type = RemoveAssetFailure.Type;
    }
    RemoveAssetFailure.Type = '[Active Collection] Remove Asset Failure';
    return RemoveAssetFailure;
}());
exports.RemoveAssetFailure = RemoveAssetFailure;
var UpdateAssetMarkers = (function () {
    function UpdateAssetMarkers(asset, markers) {
        this.asset = asset;
        this.markers = markers;
        this.type = UpdateAssetMarkers.Type;
    }
    UpdateAssetMarkers.Type = '[Active Collection] Update Asset Markers';
    return UpdateAssetMarkers;
}());
exports.UpdateAssetMarkers = UpdateAssetMarkers;
var UpdateAssetMarkersSuccess = (function () {
    function UpdateAssetMarkersSuccess(currentPageItems) {
        this.currentPageItems = currentPageItems;
        this.type = UpdateAssetMarkersSuccess.Type;
    }
    UpdateAssetMarkersSuccess.Type = '[Active Collection] Update Asset Markers Success';
    return UpdateAssetMarkersSuccess;
}());
exports.UpdateAssetMarkersSuccess = UpdateAssetMarkersSuccess;
var UpdateAssetMarkersFailure = (function () {
    function UpdateAssetMarkersFailure(error) {
        this.error = error;
        this.type = UpdateAssetMarkersFailure.Type;
    }
    UpdateAssetMarkersFailure.Type = '[Active Collection] Update Asset Markers Failure';
    return UpdateAssetMarkersFailure;
}());
exports.UpdateAssetMarkersFailure = UpdateAssetMarkersFailure;
var AddPageOfSearchAssets = (function () {
    function AddPageOfSearchAssets() {
        this.type = AddPageOfSearchAssets.Type;
    }
    AddPageOfSearchAssets.Type = '[Active Collection] Add Page Of Search Assets';
    return AddPageOfSearchAssets;
}());
exports.AddPageOfSearchAssets = AddPageOfSearchAssets;
var AddPageOfSearchAssetsSuccess = (function () {
    function AddPageOfSearchAssetsSuccess(currentPageItems) {
        this.currentPageItems = currentPageItems;
        this.type = AddPageOfSearchAssetsSuccess.Type;
    }
    AddPageOfSearchAssetsSuccess.Type = '[Active Collection] Add Page Of Search Assets Success';
    return AddPageOfSearchAssetsSuccess;
}());
exports.AddPageOfSearchAssetsSuccess = AddPageOfSearchAssetsSuccess;
var Reset = (function () {
    function Reset() {
        this.type = Reset.Type;
    }
    Reset.Type = '[Active Collection] Reset';
    return Reset;
}());
exports.Reset = Reset;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5hY3Rpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVNBLElBQU0saUJBQWlCLEdBQW1DLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUM7QUFFNUY7SUFBQTtJQW9DQSxDQUFDO0lBbkNRLDRCQUFJLEdBQVgsVUFBWSxVQUE4RDtRQUE5RCwyQkFBQSxFQUFBLDhCQUE4RDtRQUN4RSxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVNLG9DQUFZLEdBQW5CLFVBQW9CLFVBQThEO1FBQTlELDJCQUFBLEVBQUEsOEJBQThEO1FBQ2hGLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sMkJBQUcsR0FBVixVQUFXLFlBQW9CLEVBQUUsVUFBOEQ7UUFBOUQsMkJBQUEsRUFBQSw4QkFBOEQ7UUFDN0YsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU0sZ0NBQVEsR0FBZixVQUFnQixVQUE4RDtRQUE5RCwyQkFBQSxFQUFBLDhCQUE4RDtRQUM1RSxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVNLGdDQUFRLEdBQWYsVUFBZ0IsS0FBWSxFQUFFLE9BQXdCO1FBQ3BELE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLG1DQUFXLEdBQWxCLFVBQW1CLEtBQVk7UUFDN0IsTUFBTSxDQUFDLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFTSwwQ0FBa0IsR0FBekIsVUFBMEIsS0FBWSxFQUFFLE9BQXVC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QixDQUFpQjtRQUQ3QyxTQUFJLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDO0lBQ1csQ0FBQztJQUYzQyw4QkFBSSxHQUFHLGtEQUFrRCxDQUFDO0lBR25GLGdDQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksOERBQXlCO0FBTXRDO0lBR0UsbUNBQTRCLEtBQXVCO1FBQXZCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBRG5DLFNBQUksR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUM7SUFDQyxDQUFDO0lBRmpDLDhCQUFJLEdBQUcsa0RBQWtELENBQUM7SUFHbkYsZ0NBQUM7Q0FKRCxBQUlDLElBQUE7QUFKWSw4REFBeUI7QUFNdEM7SUFBQTtRQUVrQixTQUFJLEdBQUcscUJBQXFCLENBQUMsSUFBSSxDQUFDO0lBQ3BELENBQUM7SUFGd0IsMEJBQUksR0FBRywrQ0FBK0MsQ0FBQztJQUVoRiw0QkFBQztDQUhELEFBR0MsSUFBQTtBQUhZLHNEQUFxQjtBQUtsQztJQUdFLHNDQUE0QixnQkFBaUM7UUFBakMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUQ3QyxTQUFJLEdBQUcsNEJBQTRCLENBQUMsSUFBSSxDQUFDO0lBQ1EsQ0FBQztJQUYzQyxpQ0FBSSxHQUFHLHVEQUF1RCxDQUFDO0lBR3hGLG1DQUFDO0NBSkQsQUFJQyxJQUFBO0FBSlksb0VBQTRCO0FBTXpDO0lBQUE7UUFFa0IsU0FBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDcEMsQ0FBQztJQUZ3QixVQUFJLEdBQUcsMkJBQTJCLENBQUM7SUFFNUQsWUFBQztDQUhELEFBR0MsSUFBQTtBQUhZLHNCQUFLIiwiZmlsZSI6ImFwcC9zdG9yZS9hY3RpdmUtY29sbGVjdGlvbi9hY3RpdmUtY29sbGVjdGlvbi5hY3Rpb25zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuXG5pbXBvcnQge1xuICBDb2xsZWN0aW9uUGFnaW5hdGlvblBhcmFtZXRlcnMsIENvbGxlY3Rpb24sIENvbGxlY3Rpb25JdGVtcywgQ29sbGVjdGlvbkl0ZW1NYXJrZXJzVXBkYXRlciwgQ29sbGVjdGlvbkl0ZW1zUmVzcG9uc2Vcbn0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29sbGVjdGlvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNzZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IFN1YmNsaXBNYXJrZXJzIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvc3ViY2xpcC1tYXJrZXJzJztcbmltcG9ydCB7IEFwaUVycm9yUmVzcG9uc2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcblxuY29uc3QgZGVmYXVsdFBhZ2luYXRpb246IENvbGxlY3Rpb25QYWdpbmF0aW9uUGFyYW1ldGVycyA9IHsgY3VycmVudFBhZ2U6IDEsIHBhZ2VTaXplOiAxMDAgfTtcblxuZXhwb3J0IGNsYXNzIEFjdGlvbkZhY3Rvcnkge1xuICBwdWJsaWMgbG9hZChwYWdpbmF0aW9uOiBDb2xsZWN0aW9uUGFnaW5hdGlvblBhcmFtZXRlcnMgPSBkZWZhdWx0UGFnaW5hdGlvbik6IExvYWQge1xuICAgIHJldHVybiBuZXcgTG9hZChwYWdpbmF0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkSWZOZWVkZWQocGFnaW5hdGlvbjogQ29sbGVjdGlvblBhZ2luYXRpb25QYXJhbWV0ZXJzID0gZGVmYXVsdFBhZ2luYXRpb24pOiBMb2FkSWZOZWVkZWQge1xuICAgIHJldHVybiBuZXcgTG9hZElmTmVlZGVkKHBhZ2luYXRpb24pO1xuICB9XG5cbiAgcHVibGljIHNldChjb2xsZWN0aW9uSWQ6IG51bWJlciwgcGFnaW5hdGlvbjogQ29sbGVjdGlvblBhZ2luYXRpb25QYXJhbWV0ZXJzID0gZGVmYXVsdFBhZ2luYXRpb24pOiBTZXQge1xuICAgIHJldHVybiBuZXcgU2V0KGNvbGxlY3Rpb25JZCwgcGFnaW5hdGlvbik7XG4gIH1cblxuICBwdWJsaWMgbG9hZFBhZ2UocGFnaW5hdGlvbjogQ29sbGVjdGlvblBhZ2luYXRpb25QYXJhbWV0ZXJzID0gZGVmYXVsdFBhZ2luYXRpb24pOiBMb2FkUGFnZSB7XG4gICAgcmV0dXJuIG5ldyBMb2FkUGFnZShwYWdpbmF0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRBc3NldChhc3NldDogQXNzZXQsIG1hcmtlcnM/OiBTdWJjbGlwTWFya2Vycyk6IEFkZEFzc2V0IHtcbiAgICByZXR1cm4gbmV3IEFkZEFzc2V0KGFzc2V0LCBtYXJrZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyByZW1vdmVBc3NldChhc3NldDogQXNzZXQpOiBSZW1vdmVBc3NldCB7XG4gICAgcmV0dXJuIG5ldyBSZW1vdmVBc3NldChhc3NldCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNzZXRNYXJrZXJzKGFzc2V0OiBBc3NldCwgbWFya2VyczogU3ViY2xpcE1hcmtlcnMpOiBVcGRhdGVBc3NldE1hcmtlcnMge1xuICAgIHJldHVybiBuZXcgVXBkYXRlQXNzZXRNYXJrZXJzKGFzc2V0LCBtYXJrZXJzKTtcbiAgfVxuXG4gIHB1YmxpYyBhZGRQYWdlT2ZTZWFyY2hBc3NldHMoKTogQWRkUGFnZU9mU2VhcmNoQXNzZXRzIHtcbiAgICByZXR1cm4gbmV3IEFkZFBhZ2VPZlNlYXJjaEFzc2V0cygpO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IFJlc2V0IHtcbiAgICByZXR1cm4gbmV3IFJlc2V0KCk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5hbEFjdGlvbkZhY3RvcnkgZXh0ZW5kcyBBY3Rpb25GYWN0b3J5IHtcbiAgcHVibGljIGxvYWRTdWNjZXNzKGFjdGl2ZUNvbGxlY3Rpb246IENvbGxlY3Rpb24pOiBMb2FkU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkU3VjY2VzcyhhY3RpdmVDb2xsZWN0aW9uKTtcbiAgfVxuXG4gIHB1YmxpYyBsb2FkRmFpbHVyZShlcnJvcjogQXBpRXJyb3JSZXNwb25zZSk6IExvYWRGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IExvYWRGYWlsdXJlKGVycm9yKTtcbiAgfVxuXG4gIHB1YmxpYyBzZXRTdWNjZXNzKGFjdGl2ZUNvbGxlY3Rpb246IENvbGxlY3Rpb24pOiBTZXRTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IFNldFN1Y2Nlc3MoYWN0aXZlQ29sbGVjdGlvbik7XG4gIH1cblxuICBwdWJsaWMgc2V0RmFpbHVyZShlcnJvcjogQXBpRXJyb3JSZXNwb25zZSk6IFNldEZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgU2V0RmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgbG9hZFBhZ2VTdWNjZXNzKGN1cnJlbnRQYWdlSXRlbXM6IENvbGxlY3Rpb25JdGVtcyk6IExvYWRQYWdlU3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBMb2FkUGFnZVN1Y2Nlc3MoY3VycmVudFBhZ2VJdGVtcyk7XG4gIH1cblxuICBwdWJsaWMgbG9hZFBhZ2VGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogTG9hZFBhZ2VGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IExvYWRQYWdlRmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgYWRkQXNzZXRTdWNjZXNzKGN1cnJlbnRQYWdlSXRlbXM6IENvbGxlY3Rpb25JdGVtcyk6IEFkZEFzc2V0U3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBBZGRBc3NldFN1Y2Nlc3MoY3VycmVudFBhZ2VJdGVtcyk7XG4gIH1cblxuICBwdWJsaWMgYWRkQXNzZXRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogQWRkQXNzZXRGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IEFkZEFzc2V0RmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXNzZXRTdWNjZXNzKGN1cnJlbnRQYWdlSXRlbXM6IENvbGxlY3Rpb25JdGVtcyk6IFJlbW92ZUFzc2V0U3VjY2VzcyB7XG4gICAgcmV0dXJuIG5ldyBSZW1vdmVBc3NldFN1Y2Nlc3MoY3VycmVudFBhZ2VJdGVtcyk7XG4gIH1cblxuICBwdWJsaWMgcmVtb3ZlQXNzZXRGYWlsdXJlKGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKTogUmVtb3ZlQXNzZXRGYWlsdXJlIHtcbiAgICByZXR1cm4gbmV3IFJlbW92ZUFzc2V0RmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNzZXRNYXJrZXJzU3VjY2VzcyhjdXJyZW50UGFnZUl0ZW1zOiBDb2xsZWN0aW9uSXRlbXMpOiBVcGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IFVwZGF0ZUFzc2V0TWFya2Vyc1N1Y2Nlc3MoY3VycmVudFBhZ2VJdGVtcyk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQXNzZXRNYXJrZXJzRmFpbHVyZShlcnJvcjogQXBpRXJyb3JSZXNwb25zZSk6IFVwZGF0ZUFzc2V0TWFya2Vyc0ZhaWx1cmUge1xuICAgIHJldHVybiBuZXcgVXBkYXRlQXNzZXRNYXJrZXJzRmFpbHVyZShlcnJvcik7XG4gIH1cblxuICBwdWJsaWMgYWRkUGFnZU9mU2VhcmNoQXNzZXRzU3VjY2VzcyhjdXJyZW50UGFnZUl0ZW1zOiBDb2xsZWN0aW9uSXRlbXMpOiBBZGRQYWdlT2ZTZWFyY2hBc3NldHNTdWNjZXNzIHtcbiAgICByZXR1cm4gbmV3IEFkZFBhZ2VPZlNlYXJjaEFzc2V0c1N1Y2Nlc3MoY3VycmVudFBhZ2VJdGVtcyk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBMb2FkIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY3RpdmUgQ29sbGVjdGlvbl0gTG9hZCc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgcGFnaW5hdGlvbjogQ29sbGVjdGlvblBhZ2luYXRpb25QYXJhbWV0ZXJzKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRJZk5lZWRlZCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWN0aXZlIENvbGxlY3Rpb25dIExvYWQgSWYgTmVlZGVkJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkSWZOZWVkZWQuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHBhZ2luYXRpb246IENvbGxlY3Rpb25QYWdpbmF0aW9uUGFyYW1ldGVycykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBMb2FkU3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWN0aXZlIENvbGxlY3Rpb25dIExvYWQgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gTG9hZFN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGFjdGl2ZUNvbGxlY3Rpb246IENvbGxlY3Rpb24pIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZEZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBMb2FkIEZhaWx1cmUnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBTZXQgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBTZXQnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IFNldC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY29sbGVjdGlvbklkOiBudW1iZXIsIHB1YmxpYyByZWFkb25seSBwYWdpbmF0aW9uOiBDb2xsZWN0aW9uUGFnaW5hdGlvblBhcmFtZXRlcnMpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgU2V0U3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWN0aXZlIENvbGxlY3Rpb25dIFNldCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBTZXRTdWNjZXNzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhY3RpdmVDb2xsZWN0aW9uOiBDb2xsZWN0aW9uKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFNldEZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBTZXQgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gU2V0RmFpbHVyZS5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgZXJyb3I6IEFwaUVycm9yUmVzcG9uc2UpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZFBhZ2UgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBMb2FkIFBhZ2UnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRQYWdlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBwYWdpbmF0aW9uOiBDb2xsZWN0aW9uUGFnaW5hdGlvblBhcmFtZXRlcnMpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgTG9hZFBhZ2VTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY3RpdmUgQ29sbGVjdGlvbl0gTG9hZCBQYWdlIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IExvYWRQYWdlU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY3VycmVudFBhZ2VJdGVtczogQ29sbGVjdGlvbkl0ZW1zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIExvYWRQYWdlRmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWN0aXZlIENvbGxlY3Rpb25dIExvYWQgUGFnZSBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBMb2FkUGFnZUZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEFkZEFzc2V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY3RpdmUgQ29sbGVjdGlvbl0gQWRkIEFzc2V0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBBZGRBc3NldC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYXNzZXQ6IEFzc2V0LCBwdWJsaWMgcmVhZG9ubHkgbWFya2VyczogU3ViY2xpcE1hcmtlcnMpIHsgfVxufVxuXG5leHBvcnQgY2xhc3MgQWRkQXNzZXRTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY3RpdmUgQ29sbGVjdGlvbl0gQWRkIEFzc2V0IFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZEFzc2V0U3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY3VycmVudFBhZ2VJdGVtczogQ29sbGVjdGlvbkl0ZW1zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIEFkZEFzc2V0RmFpbHVyZSBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWN0aXZlIENvbGxlY3Rpb25dIEFkZCBBc3NldCBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBBZGRBc3NldEZhaWx1cmUuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGVycm9yOiBBcGlFcnJvclJlc3BvbnNlKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbW92ZUFzc2V0IGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY3RpdmUgQ29sbGVjdGlvbl0gUmVtb3ZlIEFzc2V0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBSZW1vdmVBc3NldC5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgYXNzZXQ6IEFzc2V0KSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlbW92ZUFzc2V0U3VjY2VzcyBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWN0aXZlIENvbGxlY3Rpb25dIFJlbW92ZSBBc3NldCBTdWNjZXNzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBSZW1vdmVBc3NldFN1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGN1cnJlbnRQYWdlSXRlbXM6IENvbGxlY3Rpb25JdGVtcykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZW1vdmVBc3NldEZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBSZW1vdmUgQXNzZXQgRmFpbHVyZSc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gUmVtb3ZlQXNzZXRGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVBc3NldE1hcmtlcnMgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBVcGRhdGUgQXNzZXQgTWFya2Vycyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gVXBkYXRlQXNzZXRNYXJrZXJzLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBhc3NldDogQXNzZXQsIHB1YmxpYyByZWFkb25seSBtYXJrZXJzOiBTdWJjbGlwTWFya2VycykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBVcGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzIGltcGxlbWVudHMgQWN0aW9uIHtcbiAgcHVibGljIHN0YXRpYyByZWFkb25seSBUeXBlID0gJ1tBY3RpdmUgQ29sbGVjdGlvbl0gVXBkYXRlIEFzc2V0IE1hcmtlcnMgU3VjY2Vzcyc7XG4gIHB1YmxpYyByZWFkb25seSB0eXBlID0gVXBkYXRlQXNzZXRNYXJrZXJzU3VjY2Vzcy5UeXBlO1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVhZG9ubHkgY3VycmVudFBhZ2VJdGVtczogQ29sbGVjdGlvbkl0ZW1zKSB7IH1cbn1cblxuZXhwb3J0IGNsYXNzIFVwZGF0ZUFzc2V0TWFya2Vyc0ZhaWx1cmUgaW1wbGVtZW50cyBBY3Rpb24ge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBVcGRhdGUgQXNzZXQgTWFya2VycyBGYWlsdXJlJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBVcGRhdGVBc3NldE1hcmtlcnNGYWlsdXJlLlR5cGU7XG4gIGNvbnN0cnVjdG9yKHB1YmxpYyByZWFkb25seSBlcnJvcjogQXBpRXJyb3JSZXNwb25zZSkgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBBZGRQYWdlT2ZTZWFyY2hBc3NldHMge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBBZGQgUGFnZSBPZiBTZWFyY2ggQXNzZXRzJztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBBZGRQYWdlT2ZTZWFyY2hBc3NldHMuVHlwZTtcbn1cblxuZXhwb3J0IGNsYXNzIEFkZFBhZ2VPZlNlYXJjaEFzc2V0c1N1Y2Nlc3Mge1xuICBwdWJsaWMgc3RhdGljIHJlYWRvbmx5IFR5cGUgPSAnW0FjdGl2ZSBDb2xsZWN0aW9uXSBBZGQgUGFnZSBPZiBTZWFyY2ggQXNzZXRzIFN1Y2Nlc3MnO1xuICBwdWJsaWMgcmVhZG9ubHkgdHlwZSA9IEFkZFBhZ2VPZlNlYXJjaEFzc2V0c1N1Y2Nlc3MuVHlwZTtcbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IGN1cnJlbnRQYWdlSXRlbXM6IENvbGxlY3Rpb25JdGVtcykgeyB9XG59XG5cbmV4cG9ydCBjbGFzcyBSZXNldCBpbXBsZW1lbnRzIEFjdGlvbiB7XG4gIHB1YmxpYyBzdGF0aWMgcmVhZG9ubHkgVHlwZSA9ICdbQWN0aXZlIENvbGxlY3Rpb25dIFJlc2V0JztcbiAgcHVibGljIHJlYWRvbmx5IHR5cGUgPSBSZXNldC5UeXBlO1xufVxuXG5cbmV4cG9ydCB0eXBlIEFueSA9XG4gIExvYWQgfCBMb2FkU3VjY2VzcyB8IExvYWRGYWlsdXJlIHxcbiAgU2V0IHwgU2V0U3VjY2VzcyB8IFNldEZhaWx1cmUgfFxuICBMb2FkUGFnZSB8IExvYWRQYWdlU3VjY2VzcyB8IExvYWRQYWdlRmFpbHVyZSB8XG4gIEFkZEFzc2V0IHwgQWRkQXNzZXRTdWNjZXNzIHwgQWRkQXNzZXRGYWlsdXJlIHxcbiAgUmVtb3ZlQXNzZXQgfCBSZW1vdmVBc3NldFN1Y2Nlc3MgfCBSZW1vdmVBc3NldEZhaWx1cmUgfFxuICBVcGRhdGVBc3NldE1hcmtlcnMgfCBVcGRhdGVBc3NldE1hcmtlcnNTdWNjZXNzIHwgVXBkYXRlQXNzZXRNYXJrZXJzRmFpbHVyZSB8XG4gIEFkZFBhZ2VPZlNlYXJjaEFzc2V0cyB8IEFkZFBhZ2VPZlNlYXJjaEFzc2V0c1N1Y2Nlc3MgfFxuICBSZXNldDtcbiJdfQ==
