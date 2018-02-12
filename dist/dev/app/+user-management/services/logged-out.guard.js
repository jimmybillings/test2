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
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var LoggedOutGuard = (function () {
    function LoggedOutGuard(currentUser, store) {
        this.currentUser = currentUser;
        this.store = store;
    }
    LoggedOutGuard.prototype.canActivate = function () {
        if (this.currentUser.loggedIn()) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle401Unauthorized(); });
            return false;
        }
    };
    LoggedOutGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService,
            app_store_1.AppStore])
    ], LoggedOutGuard);
    return LoggedOutGuard;
}());
exports.LoggedOutGuard = LoggedOutGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50L3NlcnZpY2VzL2xvZ2dlZC1vdXQuZ3VhcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFFM0MsbUZBQWdGO0FBQ2hGLDZDQUEyQztBQUczQztJQUNFLHdCQUNVLFdBQStCLEVBQy9CLEtBQWU7UUFEZixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsVUFBSyxHQUFMLEtBQUssQ0FBVTtJQUFJLENBQUM7SUFFOUIsb0NBQVcsR0FBWDtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMscUJBQXFCLEVBQUUsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1lBQ3RFLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQVpVLGNBQWM7UUFEMUIsaUJBQVUsRUFBRTt5Q0FHWSx5Q0FBa0I7WUFDeEIsb0JBQVE7T0FIZCxjQUFjLENBYzFCO0lBQUQscUJBQUM7Q0FkRCxBQWNDLElBQUE7QUFkWSx3Q0FBYyIsImZpbGUiOiJhcHAvK3VzZXItbWFuYWdlbWVudC9zZXJ2aWNlcy9sb2dnZWQtb3V0Lmd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2dlZE91dEd1YXJkIGltcGxlbWVudHMgQ2FuQWN0aXZhdGUge1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIGNhbkFjdGl2YXRlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLmxvZ2dlZEluKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGU0MDFVbmF1dGhvcml6ZWQoKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbn1cblxuXG4iXX0=
