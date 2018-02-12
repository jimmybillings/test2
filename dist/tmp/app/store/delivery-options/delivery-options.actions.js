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
//# sourceMappingURL=delivery-options.actions.js.map