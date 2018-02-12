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
//# sourceMappingURL=active-collection.actions.js.map