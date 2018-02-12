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
var capabilities_service_1 = require("../../shared/services/capabilities.service");
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var CollectionGuard = (function () {
    function CollectionGuard(userCan, currentUser, router, store) {
        this.userCan = userCan;
        this.currentUser = currentUser;
        this.router = router;
        this.store = store;
    }
    CollectionGuard.prototype.canActivate = function () {
        if (this.currentUser.loggedIn() && this.userCan.viewCollections()) {
            return true;
        }
        else {
            if (this.currentUser.loggedIn() && !this.userCan.viewCollections()) {
                this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            }
            else {
                this.store.dispatch(function (factory) { return factory.error.handle401Unauthorized(); });
            }
            return false;
        }
    };
    CollectionGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities,
            current_user_service_1.CurrentUserService,
            router_1.Router,
            app_store_1.AppStore])
    ], CollectionGuard);
    return CollectionGuard;
}());
exports.CollectionGuard = CollectionGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLWd1YXJkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBQzNDLDBDQUFzRDtBQUN0RCxtRkFBMEU7QUFDMUUsbUZBQWdGO0FBQ2hGLDZDQUEyQztBQUczQztJQUNFLHlCQUNVLE9BQXFCLEVBQ3JCLFdBQStCLEVBQy9CLE1BQWMsRUFDZCxLQUFlO1FBSGYsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUNyQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0IsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBSSxDQUFDO0lBRTlCLHFDQUFXLEdBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsRUFBRSxFQUFsQyxDQUFrQyxDQUFDLENBQUM7WUFDckUsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxFQUFyQyxDQUFxQyxDQUFDLENBQUM7WUFDeEUsQ0FBQztZQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQWxCVSxlQUFlO1FBRDNCLGlCQUFVLEVBQUU7eUNBR1EsbUNBQVk7WUFDUix5Q0FBa0I7WUFDdkIsZUFBTTtZQUNQLG9CQUFRO09BTGQsZUFBZSxDQW9CM0I7SUFBRCxzQkFBQztDQXBCRCxBQW9CQyxJQUFBO0FBcEJZLDBDQUFlIiwiZmlsZSI6ImFwcC8rY29sbGVjdGlvbi9zZXJ2aWNlcy9jb2xsZWN0aW9uLWd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb25HdWFyZCBpbXBsZW1lbnRzIENhbkFjdGl2YXRlIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB1c2VyQ2FuOiBDYXBhYmlsaXRpZXMsXG4gICAgcHJpdmF0ZSBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUpIHsgfVxuXG4gIGNhbkFjdGl2YXRlKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLmxvZ2dlZEluKCkgJiYgdGhpcy51c2VyQ2FuLnZpZXdDb2xsZWN0aW9ucygpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMuY3VycmVudFVzZXIubG9nZ2VkSW4oKSAmJiAhdGhpcy51c2VyQ2FuLnZpZXdDb2xsZWN0aW9ucygpKSB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZTQwM0ZvcmJpZGRlbigpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goZmFjdG9yeSA9PiBmYWN0b3J5LmVycm9yLmhhbmRsZTQwMVVuYXV0aG9yaXplZCgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxufVxuXG5cbiJdfQ==
