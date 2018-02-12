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
var WzCcFormComponent = (function (_super) {
    __extends(WzCcFormComponent, _super);
    function WzCcFormComponent(fb, formModel, element) {
        var _this = _super.call(this, fb, formModel, element) || this;
        _this.allowEdit = false;
        _this.onEdit = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(WzCcFormComponent.prototype, "successfullyVerified", {
        set: function (formSent) {
            if (formSent) {
                this.allowEdit = true;
                if (this.form)
                    this.disableForm();
            }
            else {
                this.allowEdit = false;
                if (this.form)
                    this.activateForm();
            }
        },
        enumerable: true,
        configurable: true
    });
    WzCcFormComponent.prototype.editCard = function () {
        this.onEdit.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], WzCcFormComponent.prototype, "successfullyVerified", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzCcFormComponent.prototype, "onEdit", void 0);
    WzCcFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-cc-form',
            templateUrl: 'wz.cc.form.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            wz_form_model_1.FormModel,
            core_1.ElementRef])
    ], WzCcFormComponent);
    return WzCcFormComponent;
}(wz_form_base_1.WzFormBase));
exports.WzCcFormComponent = WzCcFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LmNjLmZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHNDQUE0RztBQUM1Ryx3Q0FBcUU7QUFDckUsaURBQTRDO0FBRTVDLCtDQUE0QztBQVc1QztJQUF1QyxxQ0FBVTtJQWUvQywyQkFDRSxFQUFlLEVBQ2YsU0FBb0IsRUFDcEIsT0FBbUI7UUFIckIsWUFJRSxrQkFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUM5QjtRQW5CTSxlQUFTLEdBQVksS0FBSyxDQUFDO1FBWXhCLFlBQU0sR0FBUSxJQUFJLG1CQUFZLEVBQUUsQ0FBQzs7SUFPM0MsQ0FBQztJQWpCRCxzQkFBSSxtREFBb0I7YUFBeEIsVUFBeUIsUUFBaUI7WUFDeEMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztnQkFDdEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztvQkFBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDcEMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO29CQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyQyxDQUFDO1FBQ0gsQ0FBQzs7O09BQUE7SUFXTSxvQ0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBckJEO1FBREMsWUFBSyxFQUFFOzs7aUVBU1A7SUFFUztRQUFULGFBQU0sRUFBRTs7cURBQWtDO0lBYmhDLGlCQUFpQjtRQVA3QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFdBQVcsRUFBRSxpQkFBaUI7WUFDOUIsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FrQk0sbUJBQVc7WUFDSix5QkFBUztZQUNYLGlCQUFVO09BbEJWLGlCQUFpQixDQXlCN0I7SUFBRCx3QkFBQztDQXpCRCxBQXlCQyxDQXpCc0MseUJBQVUsR0F5QmhEO0FBekJZLDhDQUFpQiIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5jYy5mb3JtLmNvbXBvbmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUdyb3VwLCBGb3JtQ29udHJvbCwgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb3JtTW9kZWwgfSBmcm9tICcuL3d6LmZvcm0ubW9kZWwnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcywgU2VydmVyRXJyb3JzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcbmltcG9ydCB7IFd6Rm9ybUJhc2UgfSBmcm9tICcuL3d6LmZvcm0tYmFzZSc7XG4vKipcbiAqIEhvbWUgcGFnZSBjb21wb25lbnQgLSByZW5kZXJzIHRoZSBob21lIHBhZ2VcbiAqL1xuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiAnd3otY2MtZm9ybScsXG4gIHRlbXBsYXRlVXJsOiAnd3ouY2MuZm9ybS5odG1sJyxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2hcbn0pXG5cbmV4cG9ydCBjbGFzcyBXekNjRm9ybUNvbXBvbmVudCBleHRlbmRzIFd6Rm9ybUJhc2Uge1xuICBwdWJsaWMgYWxsb3dFZGl0OiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpXG4gIHNldCBzdWNjZXNzZnVsbHlWZXJpZmllZChmb3JtU2VudDogYm9vbGVhbikge1xuICAgIGlmIChmb3JtU2VudCkge1xuICAgICAgdGhpcy5hbGxvd0VkaXQgPSB0cnVlO1xuICAgICAgaWYgKHRoaXMuZm9ybSkgdGhpcy5kaXNhYmxlRm9ybSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFsbG93RWRpdCA9IGZhbHNlO1xuICAgICAgaWYgKHRoaXMuZm9ybSkgdGhpcy5hY3RpdmF0ZUZvcm0oKTtcbiAgICB9XG4gIH1cblxuICBAT3V0cHV0KCkgb25FZGl0OiBhbnkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZmI6IEZvcm1CdWlsZGVyLFxuICAgIGZvcm1Nb2RlbDogRm9ybU1vZGVsLFxuICAgIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHtcbiAgICBzdXBlcihmYiwgZm9ybU1vZGVsLCBlbGVtZW50KTtcbiAgfVxuXG4gIHB1YmxpYyBlZGl0Q2FyZCgpIHtcbiAgICB0aGlzLm9uRWRpdC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==
