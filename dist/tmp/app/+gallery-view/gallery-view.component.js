"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var search_context_service_1 = require("../shared/services/search-context.service");
var gallery_view_service_1 = require("../shared/services/gallery-view.service");
var user_preference_service_1 = require("../shared/services/user-preference.service");
var common_functions_1 = require("../shared/utilities/common.functions");
var GalleryViewComponent = (function () {
    function GalleryViewComponent(userPreference, galleryViewService, router, search) {
        this.userPreference = userPreference;
        this.galleryViewService = galleryViewService;
        this.router = router;
        this.search = search;
    }
    GalleryViewComponent.prototype.ngOnInit = function () {
        this.data = this.galleryViewService.data;
    };
    GalleryViewComponent.prototype.onClickBreadcrumb = function (index) {
        var path = common_functions_1.Common.clone(this.galleryViewService.state.path);
        path = path.slice(0, index);
        this.changeRouteFor(path);
    };
    GalleryViewComponent.prototype.onNavigate = function (event) {
        var path = common_functions_1.Common.clone(this.galleryViewService.state.path);
        path.push(event.pathSegment);
        if (event.method === 'nextLevel') {
            this.changeRouteFor(path);
        }
        else {
            this.search.new({ gq: JSON.stringify(path), n: 100, i: 1, sortId: this.userPreference.state.sortId });
        }
    };
    GalleryViewComponent.prototype.changeRouteFor = function (path) {
        var route = path && path.length > 0 ? ['/gallery-view'] : ['/'];
        if (path && path.length > 0)
            route.push({ path: JSON.stringify(path) });
        this.router.navigate(route);
    };
    GalleryViewComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'gallery-view-component',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    templateUrl: 'gallery-view.html'
                },] },
    ];
    GalleryViewComponent.ctorParameters = function () { return [
        { type: user_preference_service_1.UserPreferenceService, },
        { type: gallery_view_service_1.GalleryViewService, },
        { type: router_1.Router, },
        { type: search_context_service_1.SearchContext, },
    ]; };
    return GalleryViewComponent;
}());
exports.GalleryViewComponent = GalleryViewComponent;
//# sourceMappingURL=gallery-view.component.js.map