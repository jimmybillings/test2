"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var gallery_view_service_1 = require("../../shared/services/gallery-view.service");
var GalleryViewResolver = (function () {
    function GalleryViewResolver(galleryViewService) {
        this.galleryViewService = galleryViewService;
    }
    GalleryViewResolver.prototype.resolve = function (route) {
        var pathParameter = route.params['path'];
        return this.galleryViewService.load(pathParameter ? JSON.parse(pathParameter) : []);
    };
    GalleryViewResolver.decorators = [
        { type: core_1.Injectable },
    ];
    GalleryViewResolver.ctorParameters = function () { return [
        { type: gallery_view_service_1.GalleryViewService, },
    ]; };
    return GalleryViewResolver;
}());
exports.GalleryViewResolver = GalleryViewResolver;
//# sourceMappingURL=gallery-view.resolver.js.map