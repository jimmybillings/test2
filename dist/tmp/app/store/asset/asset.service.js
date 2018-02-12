"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../../shared/services/api.service");
var api_service_2 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var AssetService = (function () {
    function AssetService(apiService) {
        this.apiService = apiService;
    }
    AssetService.prototype.load = function (parameters, assetType, parentId) {
        var _this = this;
        var requestUrl = this.requestUrlFor(parameters, assetType, parentId);
        var options = { loadingIndicator: true };
        if (parameters.share_key)
            options.overridingToken = parameters.share_key;
        return this.apiService.get(api_interface_1.Api.Assets, requestUrl, options)
            .map(function (asset) { return _this.merge(asset, parameters); });
    };
    AssetService.prototype.merge = function (asset, parameters) {
        return __assign({}, asset, { uuid: parameters.uuid || null, timeStart: this.convert(parameters.timeStart), timeEnd: this.convert(parameters.timeEnd) });
    };
    AssetService.prototype.convert = function (time) {
        var number = parseInt(time);
        return number >= 0 ? number : null;
    };
    AssetService.prototype.requestUrlFor = function (parameters, assetType, parentId) {
        switch (assetType) {
            case 'collection':
                return "clip/" + parameters.id + "/collection/" + parentId + "/clipDetail";
            case 'order':
                return "clip/" + parameters.id + "/order/" + parentId + "/clipDetail";
            case 'quoteEdit':
            case 'quoteShow':
                return "clip/" + parameters.id + "/quote/" + parentId + "/clipDetail";
            default:
                return "clip/" + parameters.id + "/clipDetail";
        }
    };
    AssetService.decorators = [
        { type: core_1.Injectable },
    ];
    AssetService.ctorParameters = function () { return [
        { type: api_service_2.FutureApiService, },
    ]; };
    return AssetService;
}());
exports.AssetService = AssetService;
var LegacyAssetService = (function () {
    function LegacyAssetService(apiService) {
        this.apiService = apiService;
    }
    LegacyAssetService.prototype.getClipPreviewData = function (assetId) {
        var viewType = { parameters: { 'useType': 'clipPreview' } };
        return this.apiService.get(api_interface_1.Api.Assets, "renditionType/" + assetId, viewType);
    };
    LegacyAssetService.decorators = [
        { type: core_1.Injectable },
    ];
    LegacyAssetService.ctorParameters = function () { return [
        { type: api_service_1.ApiService, },
    ]; };
    return LegacyAssetService;
}());
exports.LegacyAssetService = LegacyAssetService;
//# sourceMappingURL=asset.service.js.map