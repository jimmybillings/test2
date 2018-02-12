"use strict";
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
    HomeComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'home-component',
                    templateUrl: 'home.html',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    HomeComponent.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: search_context_service_1.SearchContext, },
        { type: user_preference_service_1.UserPreferenceService, },
        { type: gallery_view_service_1.GalleryViewService, },
        { type: home_video_service_1.HomeVideoService, },
        { type: router_1.Router, },
        { type: filter_service_1.FilterService, },
        { type: app_store_1.AppStore, },
    ]; };
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map