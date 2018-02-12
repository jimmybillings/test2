"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var current_user_service_1 = require("../../shared/services/current-user.service");
var SpeedPreviewService = (function () {
    function SpeedPreviewService(apiService, currentUserService) {
        this.apiService = apiService;
        this.currentUserService = currentUserService;
    }
    SpeedPreviewService.prototype.load = function (asset) {
        var path;
        if (asset.parentId && asset.type) {
            path = "assetInfo/view/SpeedView/clip/" + asset.assetId + "/" + asset.type + "/" + asset.parentId;
        }
        else {
            path = this.currentUserService.loggedIn() ?
                "assetInfo/view/SpeedView/" + asset.assetId : "assetInfo/anonymous/view/SpeedView/" + asset.assetId;
        }
        return this.apiService.get(api_interface_1.Api.Assets, path);
    };
    SpeedPreviewService.decorators = [
        { type: core_1.Injectable },
    ];
    SpeedPreviewService.ctorParameters = function () { return [
        { type: api_service_1.FutureApiService, },
        { type: current_user_service_1.CurrentUserService, },
    ]; };
    return SpeedPreviewService;
}());
exports.SpeedPreviewService = SpeedPreviewService;
//# sourceMappingURL=speed-preview.service.js.map