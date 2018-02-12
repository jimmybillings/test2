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
    SpeedPreviewService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService, current_user_service_1.CurrentUserService])
    ], SpeedPreviewService);
    return SpeedPreviewService;
}());
exports.SpeedPreviewService = SpeedPreviewService;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9zcGVlZC1wcmV2aWV3L3NwZWVkLXByZXZpZXcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUczQyxrREFBc0Q7QUFDdEQsdUVBQTREO0FBRTVELG1GQUFnRjtBQUloRjtJQUNFLDZCQUFvQixVQUE0QixFQUFVLGtCQUFzQztRQUE1RSxlQUFVLEdBQVYsVUFBVSxDQUFrQjtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBSSxDQUFDO0lBRTlGLGtDQUFJLEdBQVgsVUFBWSxLQUFvQjtRQUM5QixJQUFJLElBQVksQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxtQ0FBaUMsS0FBSyxDQUFDLE9BQU8sU0FBSSxLQUFLLENBQUMsSUFBSSxTQUFJLEtBQUssQ0FBQyxRQUFVLENBQUM7UUFHMUYsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUN6Qyw4QkFBNEIsS0FBSyxDQUFDLE9BQVMsQ0FBQyxDQUFDLENBQUMsd0NBQXNDLEtBQUssQ0FBQyxPQUFTLENBQUM7UUFDeEcsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxtQkFBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBaEJVLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQUVxQiw4QkFBZ0IsRUFBOEIseUNBQWtCO09BRHJGLG1CQUFtQixDQWlCL0I7SUFBRCwwQkFBQztDQWpCRCxBQWlCQyxJQUFBO0FBakJZLGtEQUFtQiIsImZpbGUiOiJhcHAvc3RvcmUvc3BlZWQtcHJldmlldy9zcGVlZC1wcmV2aWV3LnNlcnZpY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgRnV0dXJlQXBpU2VydmljZSB9IGZyb20gJy4uL2FwaS9hcGkuc2VydmljZSc7XG5pbXBvcnQgeyBBcGkgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9hcGkuaW50ZXJmYWNlJztcbmltcG9ydCB7IEVuaGFuY2VkQXNzZXQsIGVuaGFuY2VBc3NldCB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2VuaGFuY2VkLWFzc2V0JztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTcGVlZHZpZXdEYXRhIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvYXNzZXQuaW50ZXJmYWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNwZWVkUHJldmlld1NlcnZpY2Uge1xuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGFwaVNlcnZpY2U6IEZ1dHVyZUFwaVNlcnZpY2UsIHByaXZhdGUgY3VycmVudFVzZXJTZXJ2aWNlOiBDdXJyZW50VXNlclNlcnZpY2UpIHsgfVxuXG4gIHB1YmxpYyBsb2FkKGFzc2V0OiBFbmhhbmNlZEFzc2V0KTogT2JzZXJ2YWJsZTxTcGVlZHZpZXdEYXRhPiB7XG4gICAgbGV0IHBhdGg6IHN0cmluZztcbiAgICAvLyBJZiB0aGUgYXNzZXQgYmVsb25ncyB0byBhIHVzZXIgYmFzZWQgY29sbGVjdGlvbiwgY2FydCwgcXVvdGUsIGV0Yy4uLlxuICAgIGlmIChhc3NldC5wYXJlbnRJZCAmJiBhc3NldC50eXBlKSB7XG4gICAgICBwYXRoID0gYGFzc2V0SW5mby92aWV3L1NwZWVkVmlldy9jbGlwLyR7YXNzZXQuYXNzZXRJZH0vJHthc3NldC50eXBlfS8ke2Fzc2V0LnBhcmVudElkfWA7XG5cbiAgICAgIC8vIElmIHRoZSBhc3NldCBpcyBhbiBpdGVtIGluIHRoZSBzZWFyY2ggcmVzdWx0cyBwYWdlIHJlc3BvbnNlLlxuICAgIH0gZWxzZSB7XG4gICAgICBwYXRoID0gdGhpcy5jdXJyZW50VXNlclNlcnZpY2UubG9nZ2VkSW4oKSA/XG4gICAgICAgIGBhc3NldEluZm8vdmlldy9TcGVlZFZpZXcvJHthc3NldC5hc3NldElkfWAgOiBgYXNzZXRJbmZvL2Fub255bW91cy92aWV3L1NwZWVkVmlldy8ke2Fzc2V0LmFzc2V0SWR9YDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5hcGlTZXJ2aWNlLmdldChBcGkuQXNzZXRzLCBwYXRoKTtcbiAgfVxufVxuIl19
