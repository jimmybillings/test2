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
var router_1 = require("@angular/router");
var current_user_service_1 = require("../../shared/services/current-user.service");
var LoggedInGuard = (function () {
    function LoggedInGuard(currentUser, router) {
        this.currentUser = currentUser;
        this.router = router;
    }
    LoggedInGuard.prototype.canActivate = function () {
        if (!this.currentUser.loggedIn()) {
            return true;
        }
        else {
            this.router.navigate(['/']);
            return false;
        }
    };
    LoggedInGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService,
            router_1.Router])
    ], LoggedInGuard);
    return LoggedInGuard;
}());
exports.LoggedInGuard = LoggedInGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rdXNlci1tYW5hZ2VtZW50L3NlcnZpY2VzL2xvZ2dlZC1pbi5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF1RDtBQUN2RCwwQ0FBeUQ7QUFDekQsbUZBQWdGO0FBR2hGO0lBQ0UsdUJBQ1UsV0FBK0IsRUFDL0IsTUFBYztRQURkLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUksQ0FBQztJQUU3QixtQ0FBVyxHQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUUsQ0FBQztZQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQVpVLGFBQWE7UUFEekIsaUJBQVUsRUFBRTt5Q0FHWSx5Q0FBa0I7WUFDdkIsZUFBTTtPQUhiLGFBQWEsQ0FhekI7SUFBRCxvQkFBQztDQWJELEFBYUMsSUFBQTtBQWJZLHNDQUFhIiwiZmlsZSI6ImFwcC8rdXNlci1tYW5hZ2VtZW50L3NlcnZpY2VzL2xvZ2dlZC1pbi5ndWFyZC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSAgICAgICAgICAgICBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhbkFjdGl2YXRlLCBSb3V0ZXIgfSAgICBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExvZ2dlZEluR3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyKSB7IH1cblxuICBjYW5BY3RpdmF0ZSgpIHtcbiAgICBpZiAoIXRoaXMuY3VycmVudFVzZXIubG9nZ2VkSW4oKSkgIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy8nXSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=
