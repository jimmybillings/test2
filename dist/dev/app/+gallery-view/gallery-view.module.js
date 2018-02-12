"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var gallery_view_component_1 = require("./gallery-view.component");
var one_level_view_component_1 = require("./components/one-level-view.component");
var shared_module_1 = require("../shared/shared.module");
var gallery_view_resolver_1 = require("./services/gallery-view.resolver");
var GalleryViewModule = (function () {
    function GalleryViewModule() {
    }
    GalleryViewModule = __decorate([
        core_1.NgModule({
            imports: [shared_module_1.SharedModule],
            declarations: [
                gallery_view_component_1.GalleryViewComponent,
                one_level_view_component_1.OneLevelViewComponent
            ],
            exports: [gallery_view_component_1.GalleryViewComponent],
            providers: [gallery_view_resolver_1.GalleryViewResolver]
        })
    ], GalleryViewModule);
    return GalleryViewModule;
}());
exports.GalleryViewModule = GalleryViewModule;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rZ2FsbGVyeS12aWV3L2dhbGxlcnktdmlldy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBeUM7QUFFekMsbUVBQWdFO0FBQ2hFLGtGQUE4RTtBQUM5RSx5REFBdUQ7QUFDdkQsMEVBQXVFO0FBV3ZFO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFUN0IsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUMsNEJBQVksQ0FBQztZQUN2QixZQUFZLEVBQUU7Z0JBQ1osNkNBQW9CO2dCQUNwQixnREFBcUI7YUFDdEI7WUFDRCxPQUFPLEVBQUUsQ0FBQyw2Q0FBb0IsQ0FBQztZQUMvQixTQUFTLEVBQUUsQ0FBQywyQ0FBbUIsQ0FBQztTQUNqQyxDQUFDO09BQ1csaUJBQWlCLENBQUk7SUFBRCx3QkFBQztDQUFsQyxBQUFrQyxJQUFBO0FBQXJCLDhDQUFpQiIsImZpbGUiOiJhcHAvK2dhbGxlcnktdmlldy9nYWxsZXJ5LXZpZXcubW9kdWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgR2FsbGVyeVZpZXdDb21wb25lbnQgfSBmcm9tICcuL2dhbGxlcnktdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT25lTGV2ZWxWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL29uZS1sZXZlbC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZWRNb2R1bGUgfSBmcm9tICcuLi9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5pbXBvcnQgeyBHYWxsZXJ5Vmlld1Jlc29sdmVyIH0gZnJvbSAnLi9zZXJ2aWNlcy9nYWxsZXJ5LXZpZXcucmVzb2x2ZXInO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbU2hhcmVkTW9kdWxlXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgR2FsbGVyeVZpZXdDb21wb25lbnQsXG4gICAgT25lTGV2ZWxWaWV3Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtHYWxsZXJ5Vmlld0NvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW0dhbGxlcnlWaWV3UmVzb2x2ZXJdXG59KVxuZXhwb3J0IGNsYXNzIEdhbGxlcnlWaWV3TW9kdWxlIHsgfVxuIl19
