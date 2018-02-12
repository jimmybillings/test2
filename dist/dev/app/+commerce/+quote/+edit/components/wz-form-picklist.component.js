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
var BehaviorSubject_1 = require("rxjs/BehaviorSubject");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var wz_form_model_1 = require("../../../../shared/modules/wz-form/wz.form.model");
var wz_form_base_1 = require("../../../../shared/modules/wz-form/wz.form-base");
var WzFormPicklistComponent = (function (_super) {
    __extends(WzFormPicklistComponent, _super);
    function WzFormPicklistComponent(fb, formModel, element) {
        var _this = _super.call(this, fb, formModel, element) || this;
        _this.propertiesToIgnore = ['contacts', 'name', 'id'];
        _this.selectContact = new core_1.EventEmitter();
        _this.checkboxChange = new core_1.EventEmitter();
        return _this;
    }
    Object.defineProperty(WzFormPicklistComponent.prototype, "displayProperties", {
        set: function (properties) {
            var _this = this;
            var tempLabels = Object.keys(properties || [])
                .filter(function (property) { return !_this.propertiesToIgnore.includes(property); })
                .map(function (property) {
                var label = property.replace(/([A-Z])/g, function (str) { return "_" + str.toLowerCase(); });
                label = "QUOTE.EDIT." + label.toUpperCase() + "_KEY";
                return { label: label, value: properties[property] };
            });
            this.labels = new BehaviorSubject_1.BehaviorSubject(tempLabels);
        },
        enumerable: true,
        configurable: true
    });
    WzFormPicklistComponent.prototype.onSelectChange = function (suggestion) {
        this.selectContact.emit(suggestion);
    };
    WzFormPicklistComponent.prototype.onCheckboxChange = function (event) {
        this.checkboxChange.emit(event);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormPicklistComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzFormPicklistComponent.prototype, "displayProperties", null);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzFormPicklistComponent.prototype, "selectContact", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], WzFormPicklistComponent.prototype, "checkboxChange", void 0);
    WzFormPicklistComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-form-picklist-component',
            templateUrl: 'wz-form-picklist.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, wz_form_model_1.FormModel, core_1.ElementRef])
    ], WzFormPicklistComponent);
    return WzFormPicklistComponent;
}(wz_form_base_1.WzFormBase));
exports.WzFormPicklistComponent = WzFormPicklistComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvd3otZm9ybS1waWNrbGlzdC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXVEO0FBRXZELHNDQUE0RztBQUM1Ryx3Q0FBNkM7QUFHN0Msa0ZBQTZFO0FBQzdFLGdGQUE2RTtBQVM3RTtJQUE2QywyQ0FBVTtJQWtCckQsaUNBQVksRUFBZSxFQUFFLFNBQW9CLEVBQUUsT0FBbUI7UUFBdEUsWUFDRSxrQkFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUM5QjtRQWxCTSx3QkFBa0IsR0FBYSxDQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFhdkQsbUJBQWEsR0FBdUIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDdkQsb0JBQWMsR0FBb0MsSUFBSSxtQkFBWSxFQUFFLENBQUM7O0lBSS9FLENBQUM7SUFmRCxzQkFBSSxzREFBaUI7YUFBckIsVUFBc0IsVUFBZ0I7WUFEdEMsaUJBVUM7WUFSQyxJQUFNLFVBQVUsR0FBVyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7aUJBQ3JELE1BQU0sQ0FBQyxVQUFDLFFBQWdCLElBQUssT0FBQSxDQUFDLEtBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQTNDLENBQTJDLENBQUM7aUJBQ3pFLEdBQUcsQ0FBQyxVQUFDLFFBQWdCO2dCQUNwQixJQUFJLEtBQUssR0FBVyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBSSxHQUFHLENBQUMsV0FBVyxFQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckcsS0FBSyxHQUFHLGdCQUFjLEtBQUssQ0FBQyxXQUFXLEVBQUUsU0FBTSxDQUFDO2dCQUNoRCxNQUFNLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsUUFBZSxDQUFDLEVBQUUsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQztZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7OztPQUFBO0lBUU0sZ0RBQWMsR0FBckIsVUFBc0IsVUFBZ0I7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVNLGtEQUFnQixHQUF2QixVQUF3QixLQUF3QjtRQUM5QyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBekJRO1FBQVIsWUFBSyxFQUFFOzswREFBZTtJQUV2QjtRQURDLFlBQUssRUFBRTs7O29FQVVQO0lBQ1M7UUFBVCxhQUFNLEVBQUU7a0NBQWdCLG1CQUFZO2tFQUE0QjtJQUN2RDtRQUFULGFBQU0sRUFBRTtrQ0FBaUIsbUJBQVk7bUVBQXlDO0lBaEJwRSx1QkFBdUI7UUFObkMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FtQmdCLG1CQUFXLEVBQWEseUJBQVMsRUFBVyxpQkFBVTtPQWxCM0QsdUJBQXVCLENBNkJuQztJQUFELDhCQUFDO0NBN0JELEFBNkJDLENBN0I0Qyx5QkFBVSxHQTZCdEQ7QUE3QlksMERBQXVCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvd3otZm9ybS1waWNrbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBNYXRDaGVja2JveENoYW5nZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEVsZW1lbnRSZWYsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IFBvam8gfSBmcm9tICcuLi8uLi8uLi8uLi9zaGFyZWQvaW50ZXJmYWNlcy9jb21tb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEZvcm1Nb2RlbCB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vd3ouZm9ybS5tb2RlbCc7XG5pbXBvcnQgeyBXekZvcm1CYXNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5mb3JtLWJhc2UnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LWZvcm0tcGlja2xpc3QtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICd3ei1mb3JtLXBpY2tsaXN0Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXekZvcm1QaWNrbGlzdENvbXBvbmVudCBleHRlbmRzIFd6Rm9ybUJhc2Uge1xuICBwdWJsaWMgbGFiZWxzOiBCZWhhdmlvclN1YmplY3Q8UG9qb1tdPjtcbiAgcHVibGljIHByb3BlcnRpZXNUb0lnbm9yZTogc3RyaW5nW10gPSBbJ2NvbnRhY3RzJywgJ25hbWUnLCAnaWQnXTtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgc2V0IGRpc3BsYXlQcm9wZXJ0aWVzKHByb3BlcnRpZXM6IFBvam8pIHtcbiAgICBjb25zdCB0ZW1wTGFiZWxzOiBQb2pvW10gPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzIHx8IFtdKVxuICAgICAgLmZpbHRlcigocHJvcGVydHk6IHN0cmluZykgPT4gIXRoaXMucHJvcGVydGllc1RvSWdub3JlLmluY2x1ZGVzKHByb3BlcnR5KSlcbiAgICAgIC5tYXAoKHByb3BlcnR5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGxhYmVsOiBzdHJpbmcgPSBwcm9wZXJ0eS5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIGBfJHtzdHIudG9Mb3dlckNhc2UoKX1gOyB9KTtcbiAgICAgICAgbGFiZWwgPSBgUVVPVEUuRURJVC4ke2xhYmVsLnRvVXBwZXJDYXNlKCl9X0tFWWA7XG4gICAgICAgIHJldHVybiB7IGxhYmVsOiBsYWJlbCwgdmFsdWU6IHByb3BlcnRpZXNbcHJvcGVydHkgYXMgYW55XSB9O1xuICAgICAgfSk7XG4gICAgdGhpcy5sYWJlbHMgPSBuZXcgQmVoYXZpb3JTdWJqZWN0KHRlbXBMYWJlbHMpO1xuICB9XG4gIEBPdXRwdXQoKSBzZWxlY3RDb250YWN0OiBFdmVudEVtaXR0ZXI8UG9qbz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjaGVja2JveENoYW5nZTogRXZlbnRFbWl0dGVyPE1hdENoZWNrYm94Q2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihmYjogRm9ybUJ1aWxkZXIsIGZvcm1Nb2RlbDogRm9ybU1vZGVsLCBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoZmIsIGZvcm1Nb2RlbCwgZWxlbWVudCk7XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3RDaGFuZ2Uoc3VnZ2VzdGlvbjogUG9qbykge1xuICAgIHRoaXMuc2VsZWN0Q29udGFjdC5lbWl0KHN1Z2dlc3Rpb24pO1xuICB9XG5cbiAgcHVibGljIG9uQ2hlY2tib3hDaGFuZ2UoZXZlbnQ6IE1hdENoZWNrYm94Q2hhbmdlKTogdm9pZCB7XG4gICAgdGhpcy5jaGVja2JveENoYW5nZS5lbWl0KGV2ZW50KTtcbiAgfVxufVxuIl19
