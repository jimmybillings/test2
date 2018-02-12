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
var WzNotificationDialogComponent = (function () {
    function WzNotificationDialogComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzNotificationDialogComponent.prototype, "strings", void 0);
    WzNotificationDialogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-notification-dialog',
            template: "\n    <h1 mat-dialog-title>{{ strings.title | translate }}</h1>\n    <mat-dialog-content layout=\"row\">\n      <div flex>{{ strings.message | translate }}</div>\n    </mat-dialog-content>\n    <mat-dialog-actions layout=\"row\" layout-align=\"end end\">\n      <button mat-button mat-dialog-close color=\"primary\" title=\"{{ strings.prompt | translate }}\">\n        {{ strings.prompt | translate }}\n      </button>\n    </mat-dialog-actions>\n  "
        })
    ], WzNotificationDialogComponent);
    return WzNotificationDialogComponent;
}());
exports.WzNotificationDialogComponent = WzNotificationDialogComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1kaWFsb2cvY29tcG9uZW50cy93ei5ub3RpZmljYXRpb24tZGlhbG9nLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFpRDtBQWlCakQ7SUFBQTtJQUVBLENBQUM7SUFEVTtRQUFSLFlBQUssRUFBRTs7a0VBQWM7SUFEWCw2QkFBNkI7UUFmekMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsd0JBQXdCO1lBQ2xDLFFBQVEsRUFBRSxtY0FVVDtTQUNGLENBQUM7T0FDVyw2QkFBNkIsQ0FFekM7SUFBRCxvQ0FBQztDQUZELEFBRUMsSUFBQTtBQUZZLHNFQUE2QiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZGlhbG9nL2NvbXBvbmVudHMvd3oubm90aWZpY2F0aW9uLWRpYWxvZy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LW5vdGlmaWNhdGlvbi1kaWFsb2cnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxoMSBtYXQtZGlhbG9nLXRpdGxlPnt7IHN0cmluZ3MudGl0bGUgfCB0cmFuc2xhdGUgfX08L2gxPlxuICAgIDxtYXQtZGlhbG9nLWNvbnRlbnQgbGF5b3V0PVwicm93XCI+XG4gICAgICA8ZGl2IGZsZXg+e3sgc3RyaW5ncy5tZXNzYWdlIHwgdHJhbnNsYXRlIH19PC9kaXY+XG4gICAgPC9tYXQtZGlhbG9nLWNvbnRlbnQ+XG4gICAgPG1hdC1kaWFsb2ctYWN0aW9ucyBsYXlvdXQ9XCJyb3dcIiBsYXlvdXQtYWxpZ249XCJlbmQgZW5kXCI+XG4gICAgICA8YnV0dG9uIG1hdC1idXR0b24gbWF0LWRpYWxvZy1jbG9zZSBjb2xvcj1cInByaW1hcnlcIiB0aXRsZT1cInt7IHN0cmluZ3MucHJvbXB0IHwgdHJhbnNsYXRlIH19XCI+XG4gICAgICAgIHt7IHN0cmluZ3MucHJvbXB0IHwgdHJhbnNsYXRlIH19XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L21hdC1kaWFsb2ctYWN0aW9ucz5cbiAgYFxufSlcbmV4cG9ydCBjbGFzcyBXek5vdGlmaWNhdGlvbkRpYWxvZ0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIHN0cmluZ3M6IGFueTtcbn1cbiJdfQ==
