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
var Subject_1 = require("rxjs/Subject");
var current_user_service_1 = require("../shared/services/current-user.service");
var search_context_service_1 = require("../shared/services/search-context.service");
var filter_service_1 = require("../shared/services/filter.service");
var user_preference_service_1 = require("../shared/services/user-preference.service");
var gallery_view_service_1 = require("../shared/services/gallery-view.service");
var home_video_service_1 = require("./services/home.video.service");
var common_functions_1 = require("../shared/utilities/common.functions");
var app_store_1 = require("../app.store");
var HomeComponent = (function () {
    function HomeComponent(currentUser, searchContext, userPreference, galleryViewService, homeVideoService, router, filter, store) {
        this.currentUser = currentUser;
        this.searchContext = searchContext;
        this.userPreference = userPreference;
        this.galleryViewService = galleryViewService;
        this.homeVideoService = homeVideoService;
        this.router = router;
        this.filter = filter;
        this.store = store;
        this.isVideo = false;
        this.playlist = new Subject_1.Subject();
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.config = this.store.snapshotCloned(function (state) { return state.uiConfig.components.home.config; });
        if (this.currentUser.loggedIn() && this.config.galleryView) {
            this.data = this.galleryViewService.data;
        }
        if (this.config && this.config.heroContentType && this.config.heroContentType.value === 'video') {
            this.isVideo = true;
            this.getVideoPlaylist();
        }
    };
    HomeComponent.prototype.newSearchContext = function (query) {
        var searchContext = { q: query, i: 1, n: this.config.pageSize.value, sortId: this.userPreference.state.sortId };
        this.filter.clear();
        this.searchContext.new(searchContext);
    };
    HomeComponent.prototype.onNavigate = function (event) {
        var path = common_functions_1.Common.clone(this.galleryViewService.state.path);
        path.push(event.pathSegment);
        if (event.method === 'nextLevel') {
            this.changeRouteFor(path);
        }
        else {
            this.searchContext.new({ gq: JSON.stringify(path), n: 100, i: 1, sortId: this.userPreference.state.sortId });
        }
    };
    HomeComponent.prototype.getVideoPlaylist = function () {
        var _this = this;
        this.homeVideoService.getVideo(this.config.heroContentId.value)
            .map(function (video) { return video.playlist; })
            .subscribe(function (playlist) { return _this.playlist.next(playlist); });
    };
    HomeComponent.prototype.changeRouteFor = function (path) {
        var route = ['/gallery-view'];
        if (path && path.length > 0)
            route.push({ path: JSON.stringify(path) });
        this.router.navigate(route);
    };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home-component',
            templateUrl: 'home.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [current_user_service_1.CurrentUserService,
            search_context_service_1.SearchContext,
            user_preference_service_1.UserPreferenceService,
            gallery_view_service_1.GalleryViewService,
            home_video_service_1.HomeVideoService,
            router_1.Router,
            filter_service_1.FilterService,
            app_store_1.AppStore])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8raG9tZS9ob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyRTtBQUMzRSwwQ0FBeUM7QUFHekMsd0NBQXVDO0FBRXZDLGdGQUE2RTtBQUM3RSxvRkFBMEU7QUFDMUUsb0VBQWtFO0FBQ2xFLHNGQUFtRjtBQUNuRixnRkFBNkU7QUFFN0Usb0VBQWlFO0FBQ2pFLHlFQUE4RDtBQUM5RCwwQ0FBd0M7QUFTeEM7SUFNRSx1QkFDUyxXQUErQixFQUM5QixhQUE0QixFQUM1QixjQUFxQyxFQUNyQyxrQkFBc0MsRUFDdEMsZ0JBQWtDLEVBQ2xDLE1BQWMsRUFDZCxNQUFxQixFQUNyQixLQUFlO1FBUGhCLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUM5QixrQkFBYSxHQUFiLGFBQWEsQ0FBZTtRQUM1QixtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUFDckMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQUN0QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQVU7UUFYbEIsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUN6QixhQUFRLEdBQWlCLElBQUksaUJBQU8sRUFBRSxDQUFDO0lBVzFDLENBQUM7SUFFTCxnQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQXJDLENBQXFDLENBQUMsQ0FBQztRQUV4RixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJ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Qix5Q0FBa0I7WUFDZixzQ0FBYTtZQUNaLCtDQUFxQjtZQUNqQix5Q0FBa0I7WUFDcEIscUNBQWdCO1lBQzFCLGVBQU07WUFDTiw4QkFBYTtZQUNkLG9CQUFRO09BZGQsYUFBYSxDQXlEekI7SUFBRCxvQkFBQztDQXpERCxBQXlEQyxJQUFBO0FBekRZLHNDQUFhIiwiZmlsZSI6ImFwcC8raG9tZS9ob21lLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5cbmltcG9ydCB7IEN1cnJlbnRVc2VyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9jdXJyZW50LXVzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hDb250ZXh0IH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL3NlYXJjaC1jb250ZXh0LnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsdGVyU2VydmljZSB9IGZyb20gJy4uL3NoYXJlZC9zZXJ2aWNlcy9maWx0ZXIuc2VydmljZSc7XG5pbXBvcnQgeyBVc2VyUHJlZmVyZW5jZVNlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvdXNlci1wcmVmZXJlbmNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgR2FsbGVyeVZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL2dhbGxlcnktdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IEdhbGxlcnksIEdhbGxlcnlQYXRoLCBHYWxsZXJ5UGF0aFNlZ21lbnQsIEdhbGxlcnlOYXZpZ2F0aW9uRXZlbnQgfSBmcm9tICcuLi9zaGFyZWQvaW50ZXJmYWNlcy9nYWxsZXJ5LXZpZXcuaW50ZXJmYWNlJztcbmltcG9ydCB7IEhvbWVWaWRlb1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2hvbWUudmlkZW8uc2VydmljZSc7XG5pbXBvcnQgeyBDb21tb24gfSBmcm9tICcuLi9zaGFyZWQvdXRpbGl0aWVzL2NvbW1vbi5mdW5jdGlvbnMnO1xuaW1wb3J0IHsgQXBwU3RvcmUgfSBmcm9tICcuLi9hcHAuc3RvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICdob21lLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnaG9tZS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGNvbmZpZzogYW55O1xuICBwdWJsaWMgZGF0YTogT2JzZXJ2YWJsZTxHYWxsZXJ5PjtcbiAgcHVibGljIGlzVmlkZW86IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHVibGljIHBsYXlsaXN0OiBTdWJqZWN0PGFueT4gPSBuZXcgU3ViamVjdCgpO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBjdXJyZW50VXNlcjogQ3VycmVudFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgc2VhcmNoQ29udGV4dDogU2VhcmNoQ29udGV4dCxcbiAgICBwcml2YXRlIHVzZXJQcmVmZXJlbmNlOiBVc2VyUHJlZmVyZW5jZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnYWxsZXJ5Vmlld1NlcnZpY2U6IEdhbGxlcnlWaWV3U2VydmljZSxcbiAgICBwcml2YXRlIGhvbWVWaWRlb1NlcnZpY2U6IEhvbWVWaWRlb1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGZpbHRlcjogRmlsdGVyU2VydmljZSxcbiAgICBwcml2YXRlIHN0b3JlOiBBcHBTdG9yZVxuICApIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY29uZmlnID0gdGhpcy5zdG9yZS5zbmFwc2hvdENsb25lZChzdGF0ZSA9PiBzdGF0ZS51aUNvbmZpZy5jb21wb25lbnRzLmhvbWUuY29uZmlnKTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnRVc2VyLmxvZ2dlZEluKCkgJiYgdGhpcy5jb25maWcuZ2FsbGVyeVZpZXcpIHtcbiAgICAgIHRoaXMuZGF0YSA9IHRoaXMuZ2FsbGVyeVZpZXdTZXJ2aWNlLmRhdGE7XG4gICAgfVxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLmNvbmZpZy5oZXJvQ29udGVudFR5cGUgJiYgdGhpcy5jb25maWcuaGVyb0NvbnRlbnRUeXBlLnZhbHVlID09PSAndmlkZW8nKSB7XG4gICAgICB0aGlzLmlzVmlkZW8gPSB0cnVlO1xuICAgICAgdGhpcy5nZXRWaWRlb1BsYXlsaXN0KCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5ld1NlYXJjaENvbnRleHQocXVlcnk6IGFueSk6IHZvaWQge1xuICAgIGxldCBzZWFyY2hDb250ZXh0OiBhbnkgPSB7IHE6IHF1ZXJ5LCBpOiAxLCBuOiB0aGlzLmNvbmZpZy5wYWdlU2l6ZS52YWx1ZSwgc29ydElkOiB0aGlzLnVzZXJQcmVmZXJlbmNlLnN0YXRlLnNvcnRJZCB9O1xuICAgIHRoaXMuZmlsdGVyLmNsZWFyKCk7XG4gICAgdGhpcy5zZWFyY2hDb250ZXh0Lm5ldyhzZWFyY2hDb250ZXh0KTtcbiAgfVxuXG4gIHB1YmxpYyBvbk5hdmlnYXRlKGV2ZW50OiBHYWxsZXJ5TmF2aWdhdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgcGF0aCA9IENvbW1vbi5jbG9uZSh0aGlzLmdhbGxlcnlWaWV3U2VydmljZS5zdGF0ZS5wYXRoKTtcbiAgICBwYXRoLnB1c2goZXZlbnQucGF0aFNlZ21lbnQpO1xuXG4gICAgaWYgKGV2ZW50Lm1ldGhvZCA9PT0gJ25leHRMZXZlbCcpIHtcbiAgICAgIHRoaXMuY2hhbmdlUm91dGVGb3IocGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoQ29udGV4dC5uZXcoeyBncTogSlNPTi5zdHJpbmdpZnkocGF0aCksIG46IDEwMCwgaTogMSwgc29ydElkOiB0aGlzLnVzZXJQcmVmZXJlbmNlLnN0YXRlLnNvcnRJZCB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0VmlkZW9QbGF5bGlzdCgpOiB2b2lkIHtcbiAgICB0aGlzLmhvbWVWaWRlb1NlcnZpY2UuZ2V0VmlkZW8odGhpcy5jb25maWcuaGVyb0NvbnRlbnRJZC52YWx1ZSlcbiAgICAgIC5tYXAodmlkZW8gPT4gdmlkZW8ucGxheWxpc3QpXG4gICAgICAuc3Vic2NyaWJlKHBsYXlsaXN0ID0+IHRoaXMucGxheWxpc3QubmV4dChwbGF5bGlzdCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBjaGFuZ2VSb3V0ZUZvcihwYXRoOiBHYWxsZXJ5UGF0aCk6IHZvaWQge1xuICAgIGNvbnN0IHJvdXRlOiBhbnlbXSA9IFsnL2dhbGxlcnktdmlldyddO1xuICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkgcm91dGUucHVzaCh7IHBhdGg6IEpTT04uc3RyaW5naWZ5KHBhdGgpIH0pO1xuICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKHJvdXRlKTtcbiAgfVxufVxuIl19
