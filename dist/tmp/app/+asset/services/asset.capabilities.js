"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var current_user_service_1 = require("../../shared/services/current-user.service");
var router_1 = require("@angular/router");
var AssetCapabilities = (function () {
    function AssetCapabilities(currentUser, route) {
        this.currentUser = currentUser;
        this.route = route;
    }
    AssetCapabilities.prototype.viewAssetDetails = function () {
        return this.userHas('ViewClips');
    };
    AssetCapabilities.prototype.downloadWatermarkComps = function (hasComp) {
        return this.userHas('DownloadWatermarkComps') && hasComp;
    };
    AssetCapabilities.prototype.downloadCleanComps = function (hasComp) {
        return this.userHas('DownloadCleanComps') && hasComp;
    };
    AssetCapabilities.prototype.downloadFullComps = function (hasComp) {
        return this.userHas('DownloadFullComps') && hasComp;
    };
    AssetCapabilities.prototype.createAccessInfo = function () {
        return this.userHas('CreateAccessInfo');
    };
    AssetCapabilities.prototype.createSubclips = function (asset) {
        return this.userHas('CreateSubclips') && typeof this.findMetadataValueFor('Format.FrameRate', asset) === 'string';
    };
    AssetCapabilities.prototype.viewAdvancedPlayer = function (asset, isShared) {
        return this.createSubclips(asset) || isShared;
    };
    AssetCapabilities.prototype.userHas = function (permission) {
        return this.currentUser.hasPermission(permission);
    };
    AssetCapabilities.prototype.findMetadataValueFor = function (metadataName, object) {
        if (object !== Object(object))
            return null;
        var keys = Object.keys(object);
        if (keys.length === 2 && keys.sort().join('|') === 'name|value' && object.name === metadataName) {
            return object.value;
        }
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var value = this.findMetadataValueFor(metadataName, object[key]);
            if (value)
                return value;
        }
        return null;
    };
    AssetCapabilities.decorators = [
        { type: core_1.Injectable },
    ];
    AssetCapabilities.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: router_1.Router, },
    ]; };
    return AssetCapabilities;
}());
exports.AssetCapabilities = AssetCapabilities;
//# sourceMappingURL=asset.capabilities.js.map