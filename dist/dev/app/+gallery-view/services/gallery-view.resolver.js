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
var gallery_view_service_1 = require("../../shared/services/gallery-view.service");
var GalleryViewResolver = (function () {
    function GalleryViewResolver(galleryViewService) {
        this.galleryViewService = galleryViewService;
    }
    GalleryViewResolver.prototype.resolve = function (route) {
        var pathParameter = route.params['path'];
        return this.galleryViewService.load(pathParameter ? JSON.parse(pathParameter) : []);
    };
    GalleryViewResolver = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [gallery_view_service_1.GalleryViewService])
    ], GalleryViewResolver);
    return GalleryViewResolver;
}());
exports.GalleryViewResolver = GalleryViewResolver;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L3NlcnZpY2VzL2dhbGxlcnktdmlldy5yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUEyQztBQUkzQyxtRkFBZ0Y7QUFJaEY7SUFDRSw2QkFBb0Isa0JBQXNDO1FBQXRDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7SUFBSSxDQUFDO0lBRXhELHFDQUFPLEdBQWQsVUFBZSxLQUE2QjtRQUMxQyxJQUFNLGFBQWEsR0FBVyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5ELE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQVBVLG1CQUFtQjtRQUQvQixpQkFBVSxFQUFFO3lDQUU2Qix5Q0FBa0I7T0FEL0MsbUJBQW1CLENBUS9CO0lBQUQsMEJBQUM7Q0FSRCxBQVFDLElBQUE7QUFSWSxrREFBbUIiLCJmaWxlIjoiYXBwLytnYWxsZXJ5LXZpZXcvc2VydmljZXMvZ2FsbGVyeS12aWV3LnJlc29sdmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGVTbmFwc2hvdCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuaW1wb3J0IHsgR2FsbGVyeVZpZXdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2hhcmVkL3NlcnZpY2VzL2dhbGxlcnktdmlldy5zZXJ2aWNlJztcbmltcG9ydCB7IEdhbGxlcnksIEdhbGxlcnlQYXRoIH0gZnJvbSAnLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZ2FsbGVyeS12aWV3LmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHYWxsZXJ5Vmlld1Jlc29sdmVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBnYWxsZXJ5Vmlld1NlcnZpY2U6IEdhbGxlcnlWaWV3U2VydmljZSkgeyB9XG5cbiAgcHVibGljIHJlc29sdmUocm91dGU6IEFjdGl2YXRlZFJvdXRlU25hcHNob3QpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIGNvbnN0IHBhdGhQYXJhbWV0ZXI6IHN0cmluZyA9IHJvdXRlLnBhcmFtc1sncGF0aCddO1xuXG4gICAgcmV0dXJuIHRoaXMuZ2FsbGVyeVZpZXdTZXJ2aWNlLmxvYWQocGF0aFBhcmFtZXRlciA/IEpTT04ucGFyc2UocGF0aFBhcmFtZXRlcikgOiBbXSk7XG4gIH1cbn1cbiJdfQ==
