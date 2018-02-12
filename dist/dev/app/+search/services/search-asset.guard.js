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
var SearchAssetGuard = (function () {
    function SearchAssetGuard(userCan, currentUser, router, store) {
        this.userCan = userCan;
        this.currentUser = currentUser;
        this.router = router;
        this.store = store;
    }
    SearchAssetGuard.prototype.canActivate = function (route, state) {
        if (!this.currentUser.loggedIn() && !route.params['share_key']) {
            return true;
        }
        else if (this.userCan.viewAssetDetails()) {
            return true;
        }
        else if (route.params['share_key']) {
            return true;
        }
        else {
            this.store.dispatch(function (factory) { return factory.error.handle403Forbidden(); });
            return false;
        }
    };
    SearchAssetGuard = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [capabilities_service_1.Capabilities,
            current_user_service_1.CurrentUserService,
            router_1.Router,
            app_store_1.AppStore])
    ], SearchAssetGuard);
    return SearchAssetGuard;
}());
exports.SearchAssetGuard = SearchAssetGuard;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rc2VhcmNoL3NlcnZpY2VzL3NlYXJjaC1hc3NldC5ndWFyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUMzQywwQ0FBbUc7QUFDbkcsbUZBQTBFO0FBQzFFLG1GQUFnRjtBQUNoRiw2Q0FBMkM7QUFHM0M7SUFDRSwwQkFDVSxPQUFxQixFQUNyQixXQUErQixFQUMvQixNQUFjLEVBQ2QsS0FBZTtRQUhmLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFDckIsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQy9CLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxVQUFLLEdBQUwsS0FBSyxDQUFVO0lBQUksQ0FBQztJQUc5QixzQ0FBVyxHQUFYLFVBQVksS0FBNkIsRUFBRSxLQUEwQjtRQUNuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUcvRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRTNDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXJDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDO1lBQ25FLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDZixDQUFDO0lBQ0gsQ0FBQztJQXhCVSxnQkFBZ0I7UUFENUIsaUJBQVUsRUFBRTt5Q0FHUSxtQ0FBWTtZQUNSLHlDQUFrQjtZQUN2QixlQUFNO1lBQ1Asb0JBQVE7T0FMZCxnQkFBZ0IsQ0F5QjVCO0lBQUQsdUJBQUM7Q0F6QkQsQUF5QkMsSUFBQTtBQXpCWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwLytzZWFyY2gvc2VydmljZXMvc2VhcmNoLWFzc2V0Lmd1YXJkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FuQWN0aXZhdGUsIFJvdXRlciwgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCwgUm91dGVyU3RhdGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBDYXBhYmlsaXRpZXMgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY2FwYWJpbGl0aWVzLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ3VycmVudFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2N1cnJlbnQtdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IEFwcFN0b3JlIH0gZnJvbSAnLi4vLi4vYXBwLnN0b3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaEFzc2V0R3VhcmQgaW1wbGVtZW50cyBDYW5BY3RpdmF0ZSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdXNlckNhbjogQ2FwYWJpbGl0aWVzLFxuICAgIHByaXZhdGUgY3VycmVudFVzZXI6IEN1cnJlbnRVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgc3RvcmU6IEFwcFN0b3JlKSB7IH1cblxuXG4gIGNhbkFjdGl2YXRlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCkge1xuICAgIGlmICghdGhpcy5jdXJyZW50VXNlci5sb2dnZWRJbigpICYmICFyb3V0ZS5wYXJhbXNbJ3NoYXJlX2tleSddKSB7XG4gICAgICAvLyBMZXQgdGhlIGFwaSBkaWN0YXRlIGJhc2VkIG9uIHNpdGUtY29uZmlnIHdoZXRoZXIgb3JcbiAgICAgIC8vIG5vdCBhIGxvZ2dlZCBvdXQgdXNlciBjYW4gdmlzaXQgdGhlIGNsaXAgZGV0YWlscyBwYWdlLlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICh0aGlzLnVzZXJDYW4udmlld0Fzc2V0RGV0YWlscygpKSB7XG4gICAgICAvLyBVc2VyIGhhcyBwZXJtaXNzaW9ucy5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAocm91dGUucGFyYW1zWydzaGFyZV9rZXknXSkge1xuICAgICAgLy8gQSBNYXlmbHkgdXNlciB3aXRoIGEgc2hhcmUgdG9rZW4uXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdXNlciBpcyBsb2dnZWQgaW4gYnV0IGRvZXNuJ3QgaGF2ZSBwZXJtaXNzaW9uXG4gICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKGZhY3RvcnkgPT4gZmFjdG9yeS5lcnJvci5oYW5kbGU0MDNGb3JiaWRkZW4oKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG59XG4iXX0=
