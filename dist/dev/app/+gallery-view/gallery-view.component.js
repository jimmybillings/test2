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
    GalleryViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'gallery-view-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            templateUrl: 'gallery-view.html'
        }),
        __metadata("design:paramtypes", [user_preference_service_1.UserPreferenceService,
            gallery_view_service_1.GalleryViewService,
            router_1.Router,
            search_context_service_1.SearchContext])
    ], GalleryViewComponent);
    return GalleryViewComponent;
}());
exports.GalleryViewComponent = GalleryViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L2dhbGxlcnktdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkU7QUFDM0UsMENBQXlDO0FBRXpDLG9GQUEwRTtBQUMxRSxnRkFBNkU7QUFFN0Usc0ZBQW1GO0FBQ25GLHlFQUE4RDtBQVE5RDtJQUdFLDhCQUNVLGNBQXFDLEVBQ3JDLGtCQUFzQyxFQUN0QyxNQUFjLEVBQ2QsTUFBcUI7UUFIckIsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBQ3JDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFDdEMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLFdBQU0sR0FBTixNQUFNLENBQWU7SUFBSSxDQUFDO0lBRTdCLHVDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7SUFDM0MsQ0FBQztJQUVNLGdEQUFpQixHQUF4QixVQUF5QixLQUFhO1FBQ3BDLElBQUksSUFBSSxHQUFnQix5QkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pFLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUU1QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFTSx5Q0FBVSxHQUFqQixVQUFrQixLQUE2QjtRQUM3QyxJQUFNLElBQUksR0FBRyx5QkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3hHLENBQUM7SUFDSCxDQUFDO0lBRU8sNkNBQWMsR0FBdEIsVUFBdUIsSUFBaUI7UUFDdEMsSUFBTSxLQUFLLEdBQVUsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFeEUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQXBDVSxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFdBQVcsRUFBRSxtQkFBbUI7U0FDakMsQ0FBQzt5Q0FLMEIsK0NBQXFCO1lBQ2pCLHlDQUFrQjtZQUM5QixlQUFNO1lBQ04sc0NBQWE7T0FQcEIsb0JBQW9CLENBcUNoQztJQUFELDJCQUFDO0NBckNELEFBcUNDLElBQUE7QUFyQ1ksb0RBQW9CIiwiZmlsZSI6ImFwcC8rZ2FsbGVyeS12aWV3L2dhbGxlcnktdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcbmltcG9ydCB7IFNlYXJjaENvbnRleHQgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvc2VhcmNoLWNvbnRleHQuc2VydmljZSc7XG5pbXBvcnQgeyBHYWxsZXJ5Vmlld1NlcnZpY2UgfSBmcm9tICcuLi9zaGFyZWQvc2VydmljZXMvZ2FsbGVyeS12aWV3LnNlcnZpY2UnO1xuaW1wb3J0IHsgR2FsbGVyeSwgR2FsbGVyeVBhdGgsIEdhbGxlcnlQYXRoU2VnbWVudCwgR2FsbGVyeU5hdmlnYXRpb25FdmVudCB9IGZyb20gJy4uL3NoYXJlZC9pbnRlcmZhY2VzL2dhbGxlcnktdmlldy5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgVXNlclByZWZlcmVuY2VTZXJ2aWNlIH0gZnJvbSAnLi4vc2hhcmVkL3NlcnZpY2VzL3VzZXItcHJlZmVyZW5jZS5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uL3NoYXJlZC91dGlsaXRpZXMvY29tbW9uLmZ1bmN0aW9ucyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2dhbGxlcnktdmlldy1jb21wb25lbnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGVVcmw6ICdnYWxsZXJ5LXZpZXcuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgR2FsbGVyeVZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgZGF0YTogT2JzZXJ2YWJsZTxHYWxsZXJ5PjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHVzZXJQcmVmZXJlbmNlOiBVc2VyUHJlZmVyZW5jZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBnYWxsZXJ5Vmlld1NlcnZpY2U6IEdhbGxlcnlWaWV3U2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgc2VhcmNoOiBTZWFyY2hDb250ZXh0KSB7IH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5kYXRhID0gdGhpcy5nYWxsZXJ5Vmlld1NlcnZpY2UuZGF0YTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNsaWNrQnJlYWRjcnVtYihpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgbGV0IHBhdGg6IEdhbGxlcnlQYXRoID0gQ29tbW9uLmNsb25lKHRoaXMuZ2FsbGVyeVZpZXdTZXJ2aWNlLnN0YXRlLnBhdGgpO1xuICAgIHBhdGggPSBwYXRoLnNsaWNlKDAsIGluZGV4KTtcblxuICAgIHRoaXMuY2hhbmdlUm91dGVGb3IocGF0aCk7XG4gIH1cblxuICBwdWJsaWMgb25OYXZpZ2F0ZShldmVudDogR2FsbGVyeU5hdmlnYXRpb25FdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHBhdGggPSBDb21tb24uY2xvbmUodGhpcy5nYWxsZXJ5Vmlld1NlcnZpY2Uuc3RhdGUucGF0aCk7XG4gICAgcGF0aC5wdXNoKGV2ZW50LnBhdGhTZWdtZW50KTtcblxuICAgIGlmIChldmVudC5tZXRob2QgPT09ICduZXh0TGV2ZWwnKSB7XG4gICAgICB0aGlzLmNoYW5nZVJvdXRlRm9yKHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlYXJjaC5uZXcoeyBncTogSlNPTi5zdHJpbmdpZnkocGF0aCksIG46IDEwMCwgaTogMSwgc29ydElkOiB0aGlzLnVzZXJQcmVmZXJlbmNlLnN0YXRlLnNvcnRJZCB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoYW5nZVJvdXRlRm9yKHBhdGg6IEdhbGxlcnlQYXRoKTogdm9pZCB7XG4gICAgY29uc3Qgcm91dGU6IGFueVtdID0gcGF0aCAmJiBwYXRoLmxlbmd0aCA+IDAgPyBbJy9nYWxsZXJ5LXZpZXcnXSA6IFsnLyddO1xuICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkgcm91dGUucHVzaCh7IHBhdGg6IEpTT04uc3RyaW5naWZ5KHBhdGgpIH0pO1xuXG4gICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUocm91dGUpO1xuICB9XG59XG4iXX0=
