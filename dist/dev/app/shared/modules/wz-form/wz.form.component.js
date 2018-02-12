"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var forms_1 = require("@angular/forms");
var wz_form_model_1 = require("./wz.form.model");
var wz_form_base_1 = require("./wz.form-base");
var WzFormComponent = (function (_super) {
    __extends(WzFormComponent, _super);
    function WzFormComponent(fb, formModel, element) {
        return _super.call(this, fb, formModel, element) || this;
    }
    WzFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-form',
            templateUrl: 'wz.form.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            wz_form_model_1.FormModel,
            core_1.ElementRef])
    ], WzFormComponent);
    return WzFormComponent;
}(wz_form_base_1.WzFormBase));
exports.WzFormComponent = WzFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LmZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUErRTtBQUMvRSx3Q0FBcUU7QUFDckUsaURBQTRDO0FBRTVDLCtDQUE0QztBQVc1QztJQUFxQyxtQ0FBVTtJQUU3Qyx5QkFDRSxFQUFlLEVBQ2YsU0FBb0IsRUFDcEIsT0FBbUI7ZUFDbkIsa0JBQU0sRUFBRSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQVBVLGVBQWU7UUFQM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsU0FBUztZQUNuQixXQUFXLEVBQUUsY0FBYztZQUMzQixlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtTQUNoRCxDQUFDO3lDQUtNLG1CQUFXO1lBQ0oseUJBQVM7WUFDWCxpQkFBVTtPQUxWLGVBQWUsQ0FRM0I7SUFBRCxzQkFBQztDQVJELEFBUUMsQ0FSb0MseUJBQVUsR0FROUM7QUFSWSwwQ0FBZSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybU1vZGVsIH0gZnJvbSAnLi93ei5mb3JtLm1vZGVsJztcbmltcG9ydCB7IEZvcm1GaWVsZHMsIFNlcnZlckVycm9ycyB9IGZyb20gJy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBXekZvcm1CYXNlIH0gZnJvbSAnLi93ei5mb3JtLWJhc2UnO1xuLyoqXG4gKiBIb21lIHBhZ2UgY29tcG9uZW50IC0gcmVuZGVycyB0aGUgaG9tZSBwYWdlXG4gKi9cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJ3d6LmZvcm0uaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgV3pGb3JtQ29tcG9uZW50IGV4dGVuZHMgV3pGb3JtQmFzZSB7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZmI6IEZvcm1CdWlsZGVyLFxuICAgIGZvcm1Nb2RlbDogRm9ybU1vZGVsLFxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihmYiwgZm9ybU1vZGVsLCBlbGVtZW50KTtcbiAgfVxufVxuIl19
