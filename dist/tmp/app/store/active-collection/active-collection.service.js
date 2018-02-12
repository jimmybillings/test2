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
var Observable_1 = require("rxjs/Observable");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var SubclipMarkersInterface = require("../../shared/interfaces/subclip-markers");
var ActiveCollectionService = (function () {
    function ActiveCollectionService(apiService) {
        this.apiService = apiService;
    }
    ActiveCollectionService.prototype.load = function (parameters) {
        var _this = this;
        return this.apiService.get(api_interface_1.Api.Assets, 'collectionSummary/focused', { loadingIndicator: true })
            .flatMap(function (summaryResponse) { return _this.combineAssetsWith(summaryResponse, parameters); });
    };
    ActiveCollectionService.prototype.set = function (collectionId, parameters) {
        var _this = this;
        return this.apiService.put(api_interface_1.Api.Assets, "collectionSummary/setFocused/" + collectionId, { loadingIndicator: true })
            .flatMap(function (summaryResponse) { return _this.combineAssetsWith(summaryResponse, parameters); });
    };
    ActiveCollectionService.prototype.loadPage = function (collectionId, parameters) {
        return this.apiService.get(api_interface_1.Api.Assets, "collectionSummary/assets/" + collectionId, { parameters: this.convertToApiParameters(parameters), loadingIndicator: true }).map(this.convertToCollectionItems);
    };
    ActiveCollectionService.prototype.loadFocusedPage = function (parameters) {
        return this.apiService.get(api_interface_1.Api.Assets, 'collectionSummary/assets/focused', { parameters: this.convertToApiParameters(parameters), loadingIndicator: true }).map(this.convertToCollectionItems);
    };
    ActiveCollectionService.prototype.addAssetTo = function (activeCollection, asset, markers) {
        var _this = this;
        var duration = SubclipMarkersInterface.durationFrom(markers);
        var assetInfo = {
            assetId: asset.assetId,
            timeStart: String(duration.timeStart),
            timeEnd: String(duration.timeEnd)
        };
        return this.apiService.post(api_interface_1.Api.Identities, 'collection/focused/addAssets', { body: { list: [assetInfo] }, loadingIndicator: true }).flatMap(function (res) { return res.list
            ? _this.loadPage(activeCollection.id, { currentPage: 1, pageSize: activeCollection.assets.pagination.pageSize })
            : Observable_1.Observable.of({ items: [], pagination: {} }); });
    };
    ActiveCollectionService.prototype.removeAssetFrom = function (activeCollection, asset) {
        var _this = this;
        var pagination = activeCollection.assets.pagination;
        if (!asset.uuid)
            asset = activeCollection.assets.items.find(function (otherAsset) { return otherAsset.assetId === asset.assetId; });
        return this.apiService.post(api_interface_1.Api.Identities, "collection/focused/removeAssets", { body: { list: [asset.uuid] }, loadingIndicator: true }).flatMap(function () {
            return _this.loadPage(activeCollection.id, { currentPage: pagination.currentPage, pageSize: pagination.pageSize });
        });
    };
    ActiveCollectionService.prototype.updateAssetMarkers = function (activeCollection, asset, updatedMarkers) {
        var _this = this;
        var duration = SubclipMarkersInterface.durationFrom(updatedMarkers);
        var updater = {
            uuid: asset.uuid,
            assetId: asset.assetId,
            timeStart: String(duration.timeStart),
            timeEnd: String(duration.timeEnd)
        };
        var pagination = activeCollection.assets.pagination;
        return this.apiService.put(api_interface_1.Api.Identities, "collection/focused/updateAsset", { body: updater, loadingIndicator: true })
            .flatMap(function (response) {
            return _this.loadPage(activeCollection.id, { currentPage: pagination.currentPage, pageSize: pagination.pageSize });
        });
    };
    ActiveCollectionService.prototype.addAssetsToFocusedCollection = function (assets, pagination) {
        var _this = this;
        var formattedAssets = assets.map(function (a) { return { assetId: a.assetId }; });
        return this.apiService.post(api_interface_1.Api.Identities, 'collection/focused/addAssets', { body: { list: formattedAssets }, loadingIndicator: true }).flatMap(function (res) {
            return _this.loadFocusedPage({ currentPage: pagination.currentPage, pageSize: pagination.pageSize });
        });
    };
    ActiveCollectionService.prototype.combineAssetsWith = function (collectionSummary, parameters) {
        return this.loadPage(collectionSummary.id, parameters)
            .map(function (assets) { return (__assign({}, collectionSummary, { assets: assets })); });
    };
    ActiveCollectionService.prototype.convertToApiParameters = function (parameters) {
        return {
            i: String(parameters.currentPage - 1),
            n: String(parameters.pageSize)
        };
    };
    ActiveCollectionService.prototype.convertToCollectionItems = function (response) {
        var convertedItems = (response.items || []).map(function (item) { return (__assign({}, item, { timeStart: parseInt(item.timeStart), timeEnd: parseInt(item.timeEnd) })); });
        return {
            items: convertedItems,
            pagination: {
                totalCount: response.totalCount || 0,
                currentPage: (response.currentPage || 0) + 1,
                pageSize: response.pageSize || 0,
                hasNextPage: response.hasNextPage || false,
                hasPreviousPage: response.hasPreviousPage || false,
                numberOfPages: response.numberOfPages || 0
            }
        };
    };
    ActiveCollectionService.decorators = [
        { type: core_1.Injectable },
    ];
    ActiveCollectionService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return ActiveCollectionService;
}());
exports.ActiveCollectionService = ActiveCollectionService;
//# sourceMappingURL=active-collection.service.js.map