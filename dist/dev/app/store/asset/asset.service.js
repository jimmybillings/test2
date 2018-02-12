"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
    AssetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_2.FutureApiService])
    ], AssetService);
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
    LegacyAssetService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.ApiService])
    ], LegacyAssetService);
    return LegacyAssetService;
}());
exports.LegacyAssetService = LegacyAssetService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hc3NldC9hc3NldC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFHM0MsaUVBQStEO0FBQy9ELGtEQUFzRDtBQUN0RCx1RUFBd0U7QUFLeEU7SUFDRSxzQkFBb0IsVUFBNEI7UUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7SUFBSSxDQUFDO0lBRTlDLDJCQUFJLEdBQVgsVUFBWSxVQUErQixFQUFFLFNBQW9CLEVBQUUsUUFBaUI7UUFBcEYsaUJBT0M7UUFOQyxJQUFNLFVBQVUsR0FBVyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDL0UsSUFBTSxPQUFPLEdBQWUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUN2RCxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO1lBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDO1FBRXpFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsT0FBTyxDQUFDO2FBQ3hELEdBQUcsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxFQUE3QixDQUE2QixDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVPLDRCQUFLLEdBQWIsVUFBYyxLQUFZLEVBQUUsVUFBK0I7UUFDekQsTUFBTSxjQUNELEtBQUssSUFDUixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFDN0MsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUN6QztJQUNKLENBQUM7SUFFTyw4QkFBTyxHQUFmLFVBQWdCLElBQVk7UUFDMUIsSUFBTSxNQUFNLEdBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNyQyxDQUFDO0lBRU8sb0NBQWEsR0FBckIsVUFBc0IsVUFBK0IsRUFBRSxTQUFvQixFQUFFLFFBQWdCO1FBQzNGLE1BQU0sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsS0FBSyxZQUFZO2dCQUNmLE1BQU0sQ0FBQyxVQUFRLFVBQVUsQ0FBQyxFQUFFLG9CQUFlLFFBQVEsZ0JBQWEsQ0FBQztZQUNuRSxLQUFLLE9BQU87Z0JBQ1YsTUFBTSxDQUFDLFVBQVEsVUFBVSxDQUFDLEVBQUUsZUFBVSxRQUFRLGdCQUFhLENBQUM7WUFDOUQsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxXQUFXO2dCQUNkLE1BQU0sQ0FBQyxVQUFRLFVBQVUsQ0FBQyxFQUFFLGVBQVUsUUFBUSxnQkFBYSxDQUFDO1lBQzlEO2dCQUNFLE1BQU0sQ0FBQyxVQUFRLFVBQVUsQ0FBQyxFQUFFLGdCQUFhLENBQUM7UUFDOUMsQ0FBQztJQUNILENBQUM7SUF0Q1UsWUFBWTtRQUR4QixpQkFBVSxFQUFFO3lDQUVxQiw4QkFBZ0I7T0FEckMsWUFBWSxDQXVDeEI7SUFBRCxtQkFBQztDQXZDRCxBQXVDQyxJQUFBO0FBdkNZLG9DQUFZO0FBMEN6QjtJQUNFLDRCQUFvQixVQUFzQjtRQUF0QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUksQ0FBQztJQUV4QywrQ0FBa0IsR0FBekIsVUFBMEIsT0FBZTtRQUN2QyxJQUFNLFFBQVEsR0FBZSxFQUFFLFVBQVUsRUFBRSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsRUFBRSxDQUFDO1FBQzFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxtQkFBaUIsT0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFOVSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTt5Q0FFcUIsd0JBQVU7T0FEL0Isa0JBQWtCLENBTzlCO0lBQUQseUJBQUM7Q0FQRCxBQU9DLElBQUE7QUFQWSxnREFBa0IiLCJmaWxlIjoiYXBwL3N0b3JlL2Fzc2V0L2Fzc2V0LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgQXBpU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSwgQXBpT3B0aW9ucyB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQXNzZXRUeXBlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZW5oYW5jZWQtYXNzZXQnO1xuaW1wb3J0IHsgQXNzZXQsIEFzc2V0TG9hZFBhcmFtZXRlcnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFzc2V0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogRnV0dXJlQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGxvYWQocGFyYW1ldGVyczogQXNzZXRMb2FkUGFyYW1ldGVycywgYXNzZXRUeXBlOiBBc3NldFR5cGUsIHBhcmVudElkPzogbnVtYmVyKTogT2JzZXJ2YWJsZTxBc3NldD4ge1xuICAgIGNvbnN0IHJlcXVlc3RVcmw6IHN0cmluZyA9IHRoaXMucmVxdWVzdFVybEZvcihwYXJhbWV0ZXJzLCBhc3NldFR5cGUsIHBhcmVudElkKTtcbiAgICBjb25zdCBvcHRpb25zOiBBcGlPcHRpb25zID0geyBsb2FkaW5nSW5kaWNhdG9yOiB0cnVlIH07XG4gICAgaWYgKHBhcmFtZXRlcnMuc2hhcmVfa2V5KSBvcHRpb25zLm92ZXJyaWRpbmdUb2tlbiA9IHBhcmFtZXRlcnMuc2hhcmVfa2V5O1xuXG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoQXBpLkFzc2V0cywgcmVxdWVzdFVybCwgb3B0aW9ucylcbiAgICAgIC5tYXAoYXNzZXQgPT4gdGhpcy5tZXJnZShhc3NldCwgcGFyYW1ldGVycykpO1xuICB9XG5cbiAgcHJpdmF0ZSBtZXJnZShhc3NldDogQXNzZXQsIHBhcmFtZXRlcnM6IEFzc2V0TG9hZFBhcmFtZXRlcnMpOiBBc3NldCB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmFzc2V0LFxuICAgICAgdXVpZDogcGFyYW1ldGVycy51dWlkIHx8IG51bGwsXG4gICAgICB0aW1lU3RhcnQ6IHRoaXMuY29udmVydChwYXJhbWV0ZXJzLnRpbWVTdGFydCksXG4gICAgICB0aW1lRW5kOiB0aGlzLmNvbnZlcnQocGFyYW1ldGVycy50aW1lRW5kKVxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnQodGltZTogc3RyaW5nKTogbnVtYmVyIHtcbiAgICBjb25zdCBudW1iZXI6IG51bWJlciA9IHBhcnNlSW50KHRpbWUpO1xuICAgIHJldHVybiBudW1iZXIgPj0gMCA/IG51bWJlciA6IG51bGw7XG4gIH1cblxuICBwcml2YXRlIHJlcXVlc3RVcmxGb3IocGFyYW1ldGVyczogQXNzZXRMb2FkUGFyYW1ldGVycywgYXNzZXRUeXBlOiBBc3NldFR5cGUsIHBhcmVudElkOiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHN3aXRjaCAoYXNzZXRUeXBlKSB7XG4gICAgICBjYXNlICdjb2xsZWN0aW9uJzpcbiAgICAgICAgcmV0dXJuIGBjbGlwLyR7cGFyYW1ldGVycy5pZH0vY29sbGVjdGlvbi8ke3BhcmVudElkfS9jbGlwRGV0YWlsYDtcbiAgICAgIGNhc2UgJ29yZGVyJzpcbiAgICAgICAgcmV0dXJuIGBjbGlwLyR7cGFyYW1ldGVycy5pZH0vb3JkZXIvJHtwYXJlbnRJZH0vY2xpcERldGFpbGA7XG4gICAgICBjYXNlICdxdW90ZUVkaXQnOlxuICAgICAgY2FzZSAncXVvdGVTaG93JzpcbiAgICAgICAgcmV0dXJuIGBjbGlwLyR7cGFyYW1ldGVycy5pZH0vcXVvdGUvJHtwYXJlbnRJZH0vY2xpcERldGFpbGA7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYGNsaXAvJHtwYXJhbWV0ZXJzLmlkfS9jbGlwRGV0YWlsYDtcbiAgICB9XG4gIH1cbn1cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExlZ2FjeUFzc2V0U2VydmljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgYXBpU2VydmljZTogQXBpU2VydmljZSkgeyB9XG5cbiAgcHVibGljIGdldENsaXBQcmV2aWV3RGF0YShhc3NldElkOiBudW1iZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHZpZXdUeXBlOiBBcGlPcHRpb25zID0geyBwYXJhbWV0ZXJzOiB7ICd1c2VUeXBlJzogJ2NsaXBQcmV2aWV3JyB9IH07XG4gICAgcmV0dXJuIHRoaXMuYXBpU2VydmljZS5nZXQoQXBpLkFzc2V0cywgYHJlbmRpdGlvblR5cGUvJHthc3NldElkfWAsIHZpZXdUeXBlKTtcbiAgfVxufVxuIl19
