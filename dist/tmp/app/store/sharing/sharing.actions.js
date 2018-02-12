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
    ActionFactory.prototype.createAssetShareLink = function (assetId, subclipMarkers) {
        return new CreateAssetShareLink(assetId, subclipMarkers);
    };
    ActionFactory.prototype.emailAssetShareLink = function (assetId, markers, parameters, properties) {
        return new EmailAssetShareLink(assetId, markers, parameters, properties);
    };
    ActionFactory.prototype.emailCollectionShareLink = function (collectionId, parameters, reloadType) {
        return new EmailCollectionShareLink(collectionId, parameters, reloadType);
    };
    return ActionFactory;
}());
exports.ActionFactory = ActionFactory;
var InternalActionFactory = (function (_super) {
    __extends(InternalActionFactory, _super);
    function InternalActionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InternalActionFactory.prototype.createAssetShareLinkSuccess = function (link) {
        return new CreateAssetShareLinkSuccess(link);
    };
    InternalActionFactory.prototype.emailCollectionShareLinkSuccess = function (reloadType) {
        return new EmailCollectionShareLinkSuccess(reloadType);
    };
    return InternalActionFactory;
}(ActionFactory));
exports.InternalActionFactory = InternalActionFactory;
var CreateAssetShareLink = (function () {
    function CreateAssetShareLink(assetId, markers) {
        this.assetId = assetId;
        this.markers = markers;
        this.type = CreateAssetShareLink.Type;
    }
    CreateAssetShareLink.Type = '[Sharing] Create Asset Share Link';
    return CreateAssetShareLink;
}());
exports.CreateAssetShareLink = CreateAssetShareLink;
var CreateAssetShareLinkSuccess = (function () {
    function CreateAssetShareLinkSuccess(link) {
        this.link = link;
        this.type = CreateAssetShareLinkSuccess.Type;
    }
    CreateAssetShareLinkSuccess.Type = '[Sharing] Create Asset Share Link Success';
    return CreateAssetShareLinkSuccess;
}());
exports.CreateAssetShareLinkSuccess = CreateAssetShareLinkSuccess;
var EmailCollectionShareLink = (function () {
    function EmailCollectionShareLink(collectionId, parameters, reloadType) {
        this.collectionId = collectionId;
        this.parameters = parameters;
        this.reloadType = reloadType;
        this.type = EmailCollectionShareLink.Type;
    }
    EmailCollectionShareLink.Type = '[Sharing] Email Collection Share Link';
    return EmailCollectionShareLink;
}());
exports.EmailCollectionShareLink = EmailCollectionShareLink;
var EmailCollectionShareLinkSuccess = (function () {
    function EmailCollectionShareLinkSuccess(reloadType) {
        this.reloadType = reloadType;
        this.type = EmailCollectionShareLinkSuccess.Type;
    }
    EmailCollectionShareLinkSuccess.Type = '[Sharing] Email Collection Share Link Success';
    return EmailCollectionShareLinkSuccess;
}());
exports.EmailCollectionShareLinkSuccess = EmailCollectionShareLinkSuccess;
var EmailAssetShareLink = (function () {
    function EmailAssetShareLink(assetId, markers, parameters, properties) {
        this.assetId = assetId;
        this.markers = markers;
        this.parameters = parameters;
        this.properties = properties;
        this.type = EmailAssetShareLink.Type;
    }
    EmailAssetShareLink.Type = '[Sharing] Email Asset Share Link';
    return EmailAssetShareLink;
}());
exports.EmailAssetShareLink = EmailAssetShareLink;
//# sourceMappingURL=sharing.actions.js.map