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
//# sourceMappingURL=asset.actions.js.map