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
var ProjectAssetInfoComponent = (function () {
    function ProjectAssetInfoComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ProjectAssetInfoComponent.prototype, "count", void 0);
    ProjectAssetInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-asset-info-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"project-asset-count\">\n      <span *ngIf=\"count == 0\">No Assets</span>\n      <span *ngIf=\"count == 1\">1 Asset</span>\n      <span *ngIf=\"count > 1\">{{ count }} Assets</span>\n    </div>\n  "
        })
    ], ProjectAssetInfoComponent);
    return ProjectAssetInfoComponent;
}());
exports.ProjectAssetInfoComponent = ProjectAssetInfoComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtYXNzZXQtaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEU7QUFjMUU7SUFBQTtJQUVBLENBQUM7SUFEVTtRQUFSLFlBQUssRUFBRTs7NERBQWU7SUFEWix5QkFBeUI7UUFackMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsOEJBQThCO1lBQ3hDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFFBQVEsRUFBRSwwTkFNVDtTQUNGLENBQUM7T0FDVyx5QkFBeUIsQ0FFckM7SUFBRCxnQ0FBQztDQUZELEFBRUMsSUFBQTtBQUZZLDhEQUF5QiIsImZpbGUiOiJhcHAvK2NvbW1lcmNlL2NvbXBvbmVudHMvcHJvamVjdC9wcm9qZWN0LWFzc2V0LWluZm8uY29tcG9uZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncHJvamVjdC1hc3NldC1pbmZvLWNvbXBvbmVudCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJwcm9qZWN0LWFzc2V0LWNvdW50XCI+XG4gICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09IDBcIj5ObyBBc3NldHM8L3NwYW4+XG4gICAgICA8c3BhbiAqbmdJZj1cImNvdW50ID09IDFcIj4xIEFzc2V0PC9zcGFuPlxuICAgICAgPHNwYW4gKm5nSWY9XCJjb3VudCA+IDFcIj57eyBjb3VudCB9fSBBc3NldHM8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdEFzc2V0SW5mb0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGNvdW50OiBudW1iZXI7XG59XG4iXX0=
