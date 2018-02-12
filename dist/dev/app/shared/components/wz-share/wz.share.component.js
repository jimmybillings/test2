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
var wz_form_component_1 = require("../../modules/wz-form/wz.form.component");
var WzShareComponent = (function () {
    function WzShareComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this.allowShareLink = true;
        this.shareLinkRequest = new core_1.EventEmitter();
        this.closeRequest = new core_1.EventEmitter();
        this.formSubmit = new core_1.EventEmitter();
        this.shareLinkIsOpen = false;
    }
    WzShareComponent.prototype.ngOnDestroy = function () {
        this.close();
    };
    WzShareComponent.prototype.openShareLink = function () {
        this.shareLinkRequest.emit();
        this.shareLinkIsOpen = true;
    };
    WzShareComponent.prototype.onShareLinkCloseRequest = function () {
        this.shareLinkIsOpen = false;
    };
    WzShareComponent.prototype.onFormSubmit = function (shareParameters) {
        this.formSubmit.emit(shareParameters);
        this.close();
    };
    WzShareComponent.prototype.onFormCancel = function () {
        this.close();
    };
    WzShareComponent.prototype.close = function () {
        this.wzForm.resetForm();
        this.closeRequest.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzShareComponent.prototype, "titleKey", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WzShareComponent.prototype, "formFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WzShareComponent.prototype, "allowShareLink", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzShareComponent.prototype, "shareLink", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzShareComponent.prototype, "shareLinkRequest", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzShareComponent.prototype, "closeRequest", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzShareComponent.prototype, "formSubmit", void 0);
    __decorate([
        core_1.ViewChild(wz_form_component_1.WzFormComponent),
        __metadata("design:type", wz_form_component_1.WzFormComponent)
    ], WzShareComponent.prototype, "wzForm", void 0);
    WzShareComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-share',
            templateUrl: 'wz.share.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
    ], WzShareComponent);
    return WzShareComponent;
}());
exports.WzShareComponent = WzShareComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1zaGFyZS93ei5zaGFyZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FFdUI7QUFJdkIsNkVBQTBFO0FBVTFFO0lBYUUsMEJBQW9CLGNBQWlDO1FBQWpDLG1CQUFjLEdBQWQsY0FBYyxDQUFtQjtRQVY1QyxtQkFBYyxHQUFZLElBQUksQ0FBQztRQUc5QixxQkFBZ0IsR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUQsaUJBQVksR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDdEQsZUFBVSxHQUF1QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUd2RCxvQkFBZSxHQUFZLEtBQUssQ0FBQztJQUVpQixDQUFDO0lBRW5ELHNDQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVNLHdDQUFhLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFTSxrREFBdUIsR0FBOUI7UUFDRSxJQUFJLENBQUMsZUFBZSxHQUFHLEtBQUssQ0FBQztJQUMvQixDQUFDO0lBRU0sdUNBQVksR0FBbkIsVUFBb0IsZUFBcUI7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVNLHVDQUFZLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVPLGdDQUFLLEdBQWI7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQXZDUTtRQUFSLFlBQUssRUFBRTs7c0RBQWtCO0lBQ2pCO1FBQVIsWUFBSyxFQUFFOzt3REFBMEI7SUFDekI7UUFBUixZQUFLLEVBQUU7OzREQUFnQztJQUMvQjtRQUFSLFlBQUssRUFBRTs7dURBQW1CO0lBRWpCO1FBQVQsYUFBTSxFQUFFO2tDQUFtQixtQkFBWTs4REFBNEI7SUFDMUQ7UUFBVCxhQUFNLEVBQUU7a0NBQWUsbUJBQVk7MERBQTRCO0lBQ3REO1FBQVQsYUFBTSxFQUFFO2tDQUFhLG1CQUFZO3dEQUE0QjtJQUVsQztRQUEzQixnQkFBUyxDQUFDLG1DQUFlLENBQUM7a0NBQWdCLG1DQUFlO29EQUFDO0lBVmhELGdCQUFnQjtRQVA1QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSxlQUFlO1lBQzVCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBZW9DLHdCQUFpQjtPQWIxQyxnQkFBZ0IsQ0F5QzVCO0lBQUQsdUJBQUM7Q0F6Q0QsQUF5Q0MsSUFBQTtBQXpDWSw0Q0FBZ0IiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LXNoYXJlL3d6LnNoYXJlLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIEV2ZW50RW1pdHRlciwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENoYW5nZURldGVjdG9yUmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbmltcG9ydCB7IEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBXekZvcm1Db21wb25lbnQgfSBmcm9tICcuLi8uLi9tb2R1bGVzL3d6LWZvcm0vd3ouZm9ybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUG9qbyB9IGZyb20gJy4uLy4uL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LXNoYXJlJyxcbiAgdGVtcGxhdGVVcmw6ICd3ei5zaGFyZS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBXelNoYXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQElucHV0KCkgdGl0bGVLZXk6IHN0cmluZztcbiAgQElucHV0KCkgZm9ybUZpZWxkczogRm9ybUZpZWxkc1tdO1xuICBASW5wdXQoKSBhbGxvd1NoYXJlTGluazogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNoYXJlTGluazogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBzaGFyZUxpbmtSZXF1ZXN0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjbG9zZVJlcXVlc3Q6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvcm1TdWJtaXQ6IEV2ZW50RW1pdHRlcjxQb2pvPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKFd6Rm9ybUNvbXBvbmVudCkgcHVibGljIHd6Rm9ybTogV3pGb3JtQ29tcG9uZW50O1xuICBwdWJsaWMgc2hhcmVMaW5rSXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjaGFuZ2VEZXRlY3RvcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHsgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBwdWJsaWMgb3BlblNoYXJlTGluaygpOiB2b2lkIHtcbiAgICB0aGlzLnNoYXJlTGlua1JlcXVlc3QuZW1pdCgpO1xuICAgIHRoaXMuc2hhcmVMaW5rSXNPcGVuID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyBvblNoYXJlTGlua0Nsb3NlUmVxdWVzdCgpIHtcbiAgICB0aGlzLnNoYXJlTGlua0lzT3BlbiA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIG9uRm9ybVN1Ym1pdChzaGFyZVBhcmFtZXRlcnM6IFBvam8pOiB2b2lkIHtcbiAgICB0aGlzLmZvcm1TdWJtaXQuZW1pdChzaGFyZVBhcmFtZXRlcnMpO1xuICAgIHRoaXMuY2xvc2UoKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkZvcm1DYW5jZWwoKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnd6Rm9ybS5yZXNldEZvcm0oKTtcbiAgICB0aGlzLmNsb3NlUmVxdWVzdC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==
