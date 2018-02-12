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
var ProjectPriceInfoComponent = (function () {
    function ProjectPriceInfoComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ProjectPriceInfoComponent.prototype, "subtotal", void 0);
    ProjectPriceInfoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'project-price-info-component',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"project-subtotal mat-caption\">\n      <strong>{{ 'CART.PROJECTS.PROJECT_SUBTOTAL' | translate }}</strong> \n      <span>{{ subtotal | currency:'USD':true:'1.2-2' }}</span>\n    </div>\n  "
        })
    ], ProjectPriceInfoComponent);
    return ProjectPriceInfoComponent;
}());
exports.ProjectPriceInfoComponent = ProjectPriceInfoComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvY29tcG9uZW50cy9wcm9qZWN0L3Byb2plY3QtcHJpY2UtaW5mby5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMEU7QUFhMUU7SUFBQTtJQUVBLENBQUM7SUFEVTtRQUFSLFlBQUssRUFBRTs7K0RBQWtCO0lBRGYseUJBQXlCO1FBWHJDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLDhCQUE4QjtZQUN4QyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtZQUMvQyxRQUFRLEVBQUUsaU5BS1Q7U0FDRixDQUFDO09BQ1cseUJBQXlCLENBRXJDO0lBQUQsZ0NBQUM7Q0FGRCxBQUVDLElBQUE7QUFGWSw4REFBeUIiLCJmaWxlIjoiYXBwLytjb21tZXJjZS9jb21wb25lbnRzL3Byb2plY3QvcHJvamVjdC1wcmljZS1pbmZvLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3Byb2plY3QtcHJpY2UtaW5mby1jb21wb25lbnQnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC1zdWJ0b3RhbCBtYXQtY2FwdGlvblwiPlxuICAgICAgPHN0cm9uZz57eyAnQ0FSVC5QUk9KRUNUUy5QUk9KRUNUX1NVQlRPVEFMJyB8IHRyYW5zbGF0ZSB9fTwvc3Ryb25nPiBcbiAgICAgIDxzcGFuPnt7IHN1YnRvdGFsIHwgY3VycmVuY3k6J1VTRCc6dHJ1ZTonMS4yLTInIH19PC9zcGFuPlxuICAgIDwvZGl2PlxuICBgXG59KVxuZXhwb3J0IGNsYXNzIFByb2plY3RQcmljZUluZm9Db21wb25lbnQge1xuICBASW5wdXQoKSBzdWJ0b3RhbDogbnVtYmVyO1xufVxuIl19
