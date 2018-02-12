"use strict";
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
    HomeResolver.decorators = [
        { type: core_1.Injectable },
    ];
    HomeResolver.ctorParameters = function () { return [
        { type: current_user_service_1.CurrentUserService, },
        { type: app_store_1.AppStore, },
        { type: gallery_view_service_1.GalleryViewService, },
    ]; };
    return HomeResolver;
}());
exports.HomeResolver = HomeResolver;
//# sourceMappingURL=home.resolver.js.map