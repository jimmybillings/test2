"use strict";
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
    FutureCollectionsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService])
    ], FutureCollectionsService);
    return FutureCollectionsService;
}());
exports.FutureCollectionsService = FutureCollectionsService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9jb2xsZWN0aW9ucy9jb2xsZWN0aW9ucy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLGtEQUFzRDtBQUN0RCx1RUFBNEQ7QUFFNUQsaUZBQW1GO0FBS25GO0lBQ0Usa0NBQW9CLFVBQTRCO1FBQTVCLGVBQVUsR0FBVixVQUFVLENBQWtCO0lBQUksQ0FBQztJQUU5Qyw2Q0FBVSxHQUFqQixVQUFrQixVQUFzQixFQUFFLEtBQW9CO1FBQzVELElBQU0sUUFBUSxHQUFxQyx1QkFBdUIsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzlHLElBQU0sU0FBUyxHQUFXO1lBQ3hCLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTztZQUN0QixTQUFTLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDckMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ2xDLENBQUM7UUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ3pCLG1CQUFHLENBQUMsVUFBVSxFQUFFLGdCQUFjLFVBQVUsQ0FBQyxFQUFFLGVBQVksRUFDdkQsRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLGdCQUFnQixFQUFFLElBQUksRUFBRSxDQUN4RCxDQUFDO0lBQ0osQ0FBQztJQWZVLHdCQUF3QjtRQURwQyxpQkFBVSxFQUFFO3lDQUVxQiw4QkFBZ0I7T0FEckMsd0JBQXdCLENBZ0JwQztJQUFELCtCQUFDO0NBaEJELEFBZ0JDLElBQUE7QUFoQlksNERBQXdCIiwiZmlsZSI6ImFwcC9zdG9yZS9jb2xsZWN0aW9ucy9jb2xsZWN0aW9ucy5zZXJ2aWNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgQ29sbGVjdGlvbiwgQWRkQXNzZXRUb0NvbGxlY3Rpb25SZXNwb25zZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2NvbGxlY3Rpb24uaW50ZXJmYWNlJztcbmltcG9ydCAqIGFzIFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlIGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL3N1YmNsaXAtbWFya2Vycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9lbmhhbmNlZC1hc3NldCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGdXR1cmVDb2xsZWN0aW9uc1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEZ1dHVyZUFwaVNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBhZGRBc3NldFRvKGNvbGxlY3Rpb246IENvbGxlY3Rpb24sIGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogT2JzZXJ2YWJsZTxBZGRBc3NldFRvQ29sbGVjdGlvblJlc3BvbnNlPiB7XG4gICAgY29uc3QgZHVyYXRpb246IFN1YmNsaXBNYXJrZXJzSW50ZXJmYWNlLkR1cmF0aW9uID0gU3ViY2xpcE1hcmtlcnNJbnRlcmZhY2UuZHVyYXRpb25Gcm9tKGFzc2V0LnN1YmNsaXBNYXJrZXJzKTtcbiAgICBjb25zdCBhc3NldEluZm86IG9iamVjdCA9IHtcbiAgICAgIGFzc2V0SWQ6IGFzc2V0LmFzc2V0SWQsXG4gICAgICB0aW1lU3RhcnQ6IFN0cmluZyhkdXJhdGlvbi50aW1lU3RhcnQpLFxuICAgICAgdGltZUVuZDogU3RyaW5nKGR1cmF0aW9uLnRpbWVFbmQpXG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzLmFwaVNlcnZpY2UucG9zdChcbiAgICAgIEFwaS5JZGVudGl0aWVzLCBgY29sbGVjdGlvbi8ke2NvbGxlY3Rpb24uaWR9L2FkZEFzc2V0c2AsXG4gICAgICB7IGJvZHk6IHsgbGlzdDogW2Fzc2V0SW5mb10gfSwgbG9hZGluZ0luZGljYXRvcjogdHJ1ZSB9XG4gICAgKTtcbiAgfVxufVxuIl19
