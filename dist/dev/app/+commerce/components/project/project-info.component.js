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
var ProjectInfoComponent = (function () {
    function ProjectInfoComponent() {
        this.readOnly = false;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectInfoComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectInfoComponent.prototype, "clientName", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ProjectInfoComponent.prototype, "licenseStartDate", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ProjectInfoComponent.prototype, "readOnly", void 0);
    ProjectInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-info-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <section>\n      <h5 mat-display-1>\n        <span class=\"project-label mat-caption\">{{ 'CART.PROJECTS.PROJECT_NAME' | translate }}</span>\n        <span class=\"project-name\">{{ name }}</span>\n      </h5>\n\n      <span class=\"project-client mat-caption\">\n        <strong>{{ 'CART.PROJECTS.CLIENT_NAME' | translate }}</strong> \n        {{ clientName }}\n      </span><br/>\n\n      <span class=\"project-client mat-caption\">\n        <strong>{{ 'CART.PROJECTS.LICENSE_START_DATE' | translate }}</strong> \n        {{ (licenseStartDate | date:'yyyy-MM-dd') || ('CART.PROJECTS.DEFAULT_LICENSE_START_DATE' | translate ) }}\n      </span>\n    <section>\n  "
        })
    ], ProjectInfoComponent);
    return ProjectInfoComponent;
}());
exports.ProjectInfoComponent = ProjectInfoComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBZ0c7QUF5QmhHO0lBdkJBO1FBMkJXLGFBQVEsR0FBWSxLQUFLLENBQUM7SUFDckMsQ0FBQztJQUpVO1FBQVIsWUFBSyxFQUFFOztzREFBYztJQUNiO1FBQVIsWUFBSyxFQUFFOzs0REFBb0I7SUFDbkI7UUFBUixZQUFLLEVBQUU7O2tFQUEwQjtJQUN6QjtRQUFSLFlBQUssRUFBRTs7MERBQTJCO0lBSnhCLG9CQUFvQjtRQXZCaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1lBQy9DLFFBQVEsRUFBRSwrcEJBaUJUO1NBQ0YsQ0FBQztPQUNXLG9CQUFvQixDQUtoQztJQUFELDJCQUFDO0NBTEQsQUFLQyxJQUFBO0FBTFksb0RBQW9CIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtaW5mby5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAncHJvamVjdC1pbmZvLWNvbXBvbmVudCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzZWN0aW9uPlxuICAgICAgPGg1IG1hdC1kaXNwbGF5LTE+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJvamVjdC1sYWJlbCBtYXQtY2FwdGlvblwiPnt7ICdDQVJULlBST0pFQ1RTLlBST0pFQ1RfTkFNRScgfCB0cmFuc2xhdGUgfX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwicHJvamVjdC1uYW1lXCI+e3sgbmFtZSB9fTwvc3Bhbj5cbiAgICAgIDwvaDU+XG5cbiAgICAgIDxzcGFuIGNsYXNzPVwicHJvamVjdC1jbGllbnQgbWF0LWNhcHRpb25cIj5cbiAgICAgICAgPHN0cm9uZz57eyAnQ0FSVC5QUk9KRUNUUy5DTElFTlRfTkFNRScgfCB0cmFuc2xhdGUgfX08L3N0cm9uZz4gXG4gICAgICAgIHt7IGNsaWVudE5hbWUgfX1cbiAgICAgIDwvc3Bhbj48YnIvPlxuXG4gICAgICA8c3BhbiBjbGFzcz1cInByb2plY3QtY2xpZW50IG1hdC1jYXB0aW9uXCI+XG4gICAgICAgIDxzdHJvbmc+e3sgJ0NBUlQuUFJPSkVDVFMuTElDRU5TRV9TVEFSVF9EQVRFJyB8IHRyYW5zbGF0ZSB9fTwvc3Ryb25nPiBcbiAgICAgICAge3sgKGxpY2Vuc2VTdGFydERhdGUgfCBkYXRlOid5eXl5LU1NLWRkJykgfHwgKCdDQVJULlBST0pFQ1RTLkRFRkFVTFRfTElDRU5TRV9TVEFSVF9EQVRFJyB8IHRyYW5zbGF0ZSApIH19XG4gICAgICA8L3NwYW4+XG4gICAgPHNlY3Rpb24+XG4gIGBcbn0pXG5leHBvcnQgY2xhc3MgUHJvamVjdEluZm9Db21wb25lbnQge1xuICBASW5wdXQoKSBuYW1lOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNsaWVudE5hbWU6IHN0cmluZztcbiAgQElucHV0KCkgbGljZW5zZVN0YXJ0RGF0ZTogc3RyaW5nO1xuICBASW5wdXQoKSByZWFkT25seTogYm9vbGVhbiA9IGZhbHNlO1xufVxuIl19
