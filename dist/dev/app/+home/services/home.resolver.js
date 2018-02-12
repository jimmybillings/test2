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
var Observable_1 = require("rxjs/Observable");
var current_user_service_1 = require("../../shared/services/current-user.service");
var app_store_1 = require("../../app.store");
var gallery_view_service_1 = require("../../shared/services/gallery-view.service");
var HomeResolver = (function () {
    function HomeResolver(currentUser, store, galleryViewService) {
        this.currentUser = currentUser;
        this.store = store;
        this.galleryViewService = galleryViewService;
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.home.config; });
    }
    HomeResolver.prototype.resolve = function (route, state) {
        if (this.currentUser.loggedIn() && this.config.galleryView) {
            return this.galleryViewService.load([]);
        }
        else {
            return Observable_1.Observable.of(true);
        }
    };
    HomeResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService,
            app_store_1.AppStore,
            gallery_view_service_1.GalleryViewService])
    ], HomeResolver);
    return HomeResolver;
}());
exports.HomeResolver = HomeResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9zZXJ2aWNlcy9ob21lLnJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQTJDO0FBRTNDLDhDQUE2QztBQUM3QyxtRkFBZ0Y7QUFDaEYsNkNBQTJDO0FBQzNDLG1GQUFnRjtBQUdoRjtJQUdFLHNCQUNTLFdBQStCLEVBQzlCLEtBQWUsRUFDZixrQkFBc0M7UUFGdkMsZ0JBQVcsR0FBWCxXQUFXLENBQW9CO1FBQzlCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFDZix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW9CO1FBRTlDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFyQyxDQUFxQyxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUVELDhCQUFPLEdBQVAsVUFBUSxLQUE2QixFQUFFLEtBQTBCO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO0lBQ0gsQ0FBQztJQWpCVSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7eUNBS1cseUNBQWtCO1lBQ3ZCLG9CQUFRO1lBQ0sseUNBQWtCO09BTnJDLFlBQVksQ0FrQnhCO0lBQUQsbUJBQUM7Q0FsQkQsQUFrQkMsSUFBQTtBQWxCWSxvQ0FBWSIsImZpbGUiOiJhcHAvK2hvbWUvc2VydmljZXMvaG9tZS5yZXNvbHZlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc29sdmUsIEFjdGl2YXRlZFJvdXRlU25hcHNob3QsIFJvdXRlclN0YXRlU25hcHNob3QgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBDdXJyZW50VXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zaGFyZWQvc2VydmljZXMvY3VycmVudC11c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi8uLi9hcHAuc3RvcmUnO1xuaW1wb3J0IHsgR2FsbGVyeVZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbGxlcnktdmlldy5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhvbWVSZXNvbHZlciBpbXBsZW1lbnRzIFJlc29sdmU8YW55PiB7XG4gIHByaXZhdGUgY29uZmlnOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGN1cnJlbnRVc2VyOiBDdXJyZW50VXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBzdG9yZTogQXBwU3RvcmUsXG4gICAgcHJpdmF0ZSBnYWxsZXJ5Vmlld1NlcnZpY2U6IEdhbGxlcnlWaWV3U2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvbmZpZyA9IHRoaXMuc3RvcmUuc25hcHNob3RDbG9uZWQoc3RhdGUgPT4gc3RhdGUudWlDb25maWcuY29tcG9uZW50cy5ob21lLmNvbmZpZyk7XG4gIH1cblxuICByZXNvbHZlKHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVNuYXBzaG90LCBzdGF0ZTogUm91dGVyU3RhdGVTbmFwc2hvdCk6IE9ic2VydmFibGU8YW55PiB7XG4gICAgaWYgKHRoaXMuY3VycmVudFVzZXIubG9nZ2VkSW4oKSAmJiB0aGlzLmNvbmZpZy5nYWxsZXJ5Vmlldykge1xuICAgICAgcmV0dXJuIHRoaXMuZ2FsbGVyeVZpZXdTZXJ2aWNlLmxvYWQoW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gT2JzZXJ2YWJsZS5vZih0cnVlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==
