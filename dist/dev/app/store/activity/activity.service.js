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
var current_user_service_1 = require("../../shared/services/current-user.service");
var api_service_1 = require("../api/api.service");
var api_interface_1 = require("../../shared/interfaces/api.interface");
var ActivityService = (function () {
    function ActivityService(apiService, currentUserService) {
        this.apiService = apiService;
        this.currentUserService = currentUserService;
    }
    ActivityService.prototype.record = function (activityOptions) {
        var body = __assign({}, activityOptions, { userId: this.currentUserService.state.id });
        this.apiService.post(api_interface_1.Api.Identities, 'activityAudit', { body: body }).subscribe();
    };
    ActivityService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [api_service_1.FutureApiService, current_user_service_1.CurrentUserService])
    ], ActivityService);
    return ActivityService;
}());
exports.ActivityService = ActivityService;
;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zdG9yZS9hY3Rpdml0eS9hY3Rpdml0eS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBMkM7QUFHM0MsbUZBQWdGO0FBQ2hGLGtEQUFzRDtBQUN0RCx1RUFBNEQ7QUFHNUQ7SUFDRSx5QkFBb0IsVUFBNEIsRUFBVSxrQkFBc0M7UUFBNUUsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO0lBQUksQ0FBQztJQUU5RixnQ0FBTSxHQUFiLFVBQWMsZUFBZ0M7UUFDNUMsSUFBTSxJQUFJLGdCQUNMLGVBQWUsSUFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUN6QyxDQUFDO1FBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsbUJBQUcsQ0FBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLEVBQUUsSUFBSSxNQUFBLEVBQUUsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQzlFLENBQUM7SUFWVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBRXFCLDhCQUFnQixFQUE4Qix5Q0FBa0I7T0FEckYsZUFBZSxDQVczQjtJQUFELHNCQUFDO0NBWEQsQUFXQyxJQUFBO0FBWFksMENBQWU7QUFlM0IsQ0FBQyIsImZpbGUiOiJhcHAvc3RvcmUvYWN0aXZpdHkvYWN0aXZpdHkuc2VydmljZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBBY3Rpdml0eU9wdGlvbnMgfSBmcm9tICcuLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBGdXR1cmVBcGlTZXJ2aWNlIH0gZnJvbSAnLi4vYXBpL2FwaS5zZXJ2aWNlJztcbmltcG9ydCB7IEFwaSB9IGZyb20gJy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2FwaS5pbnRlcmZhY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlTZXJ2aWNlIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBhcGlTZXJ2aWNlOiBGdXR1cmVBcGlTZXJ2aWNlLCBwcml2YXRlIGN1cnJlbnRVc2VyU2VydmljZTogQ3VycmVudFVzZXJTZXJ2aWNlKSB7IH1cblxuICBwdWJsaWMgcmVjb3JkKGFjdGl2aXR5T3B0aW9uczogQWN0aXZpdHlPcHRpb25zKTogdm9pZCB7XG4gICAgY29uc3QgYm9keTogQWN0aXZpdHlPcHRpb25zUmVxdWVzdEJvZHkgPSB7XG4gICAgICAuLi5hY3Rpdml0eU9wdGlvbnMsXG4gICAgICB1c2VySWQ6IHRoaXMuY3VycmVudFVzZXJTZXJ2aWNlLnN0YXRlLmlkXG4gICAgfTtcblxuICAgIHRoaXMuYXBpU2VydmljZS5wb3N0KEFwaS5JZGVudGl0aWVzLCAnYWN0aXZpdHlBdWRpdCcsIHsgYm9keSB9KS5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG5pbnRlcmZhY2UgQWN0aXZpdHlPcHRpb25zUmVxdWVzdEJvZHkgZXh0ZW5kcyBBY3Rpdml0eU9wdGlvbnMge1xuICB1c2VySWQ6IG51bWJlcjtcbn07XG4iXX0=
