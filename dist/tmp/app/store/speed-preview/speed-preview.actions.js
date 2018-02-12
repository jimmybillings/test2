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
//# sourceMappingURL=speed-preview.actions.js.map