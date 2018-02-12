"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var SubclipMarkersInterface = require("../../shared/interfaces/subclip-markers");
var FutureCollectionsService = (function () {
    function FutureCollectionsService(apiService) {
        this.apiService = apiService;
    }
    FutureCollectionsService.prototype.addAssetTo = function (collection, asset) {
        var duration = SubclipMarkersInterface.durationFrom(asset.subclipMarkers);
        var assetInfo = {
            assetId: asset.assetId,
            timeStart: String(duration.timeStart),
            timeEnd: String(duration.timeEnd)
        };
        return this.apiService.post(api_interface_1.Api.Identities, "collection/" + collection.id + "/addAssets", { body: { list: [assetInfo] }, loadingIndicator: true });
    };
    FutureCollectionsService.decorators = [
        { type: core_1.Injectable },
    ];
    FutureCollectionsService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
    ]; };
    return FutureCollectionsService;
}());
exports.FutureCollectionsService = FutureCollectionsService;
//# sourceMappingURL=collections.service.js.map