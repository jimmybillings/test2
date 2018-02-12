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
var WzFormAutoCompleteViewComponent = (function (_super) {
    __extends(WzFormAutoCompleteViewComponent, _super);
    function WzFormAutoCompleteViewComponent(fb, formModel, element) {
        var _this = _super.call(this, fb, formModel, element) || this;
        _this.propertiesToIgnore = [
            'name', 'id', 'email', 'invoiceContactId', 'salesOwner', 'paymentTermsDays', 'readonlyPaymentTermsDays'
        ];
        return _this;
    }
    Object.defineProperty(WzFormAutoCompleteViewComponent.prototype, "displayProperties", {
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
    WzFormAutoCompleteViewComponent.prototype.onSelectSuggestion = function (suggestion) {
        this.formSubmit.emit(suggestion);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormAutoCompleteViewComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormAutoCompleteViewComponent.prototype, "matchOnProperty", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzFormAutoCompleteViewComponent.prototype, "displayProperties", null);
    WzFormAutoCompleteViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-form-autocomplete-view',
            templateUrl: 'wz-form-autocomplete-view.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, wz_form_model_1.FormModel, core_1.ElementRef])
    ], WzFormAutoCompleteViewComponent);
    return WzFormAutoCompleteViewComponent;
}(wz_form_base_1.WzFormBase));
exports.WzFormAutoCompleteViewComponent = WzFormAutoCompleteViewComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvd3otZm9ybS1hdXRvY29tcGxldGUtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0RBQXVEO0FBRXZELHNDQUE0RztBQUM1Ryx3Q0FBcUU7QUFDckUsa0ZBQTZFO0FBRTdFLGdGQUE2RTtBQVE3RTtJQUFxRCxtREFBVTtJQW1CN0QseUNBQVksRUFBZSxFQUFFLFNBQW9CLEVBQUUsT0FBbUI7UUFBdEUsWUFDRSxrQkFBTSxFQUFFLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxTQUM5QjtRQW5CTSx3QkFBa0IsR0FBYTtZQUNwQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsMEJBQTBCO1NBQ3hHLENBQUM7O0lBaUJGLENBQUM7SUFiRCxzQkFBSSw4REFBaUI7YUFBckIsVUFBc0IsVUFBZ0I7WUFEdEMsaUJBVUM7WUFSQyxJQUFNLFVBQVUsR0FBdUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO2lCQUNqRixNQUFNLENBQUMsVUFBQyxRQUFnQixJQUFLLE9BQUEsQ0FBQyxLQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUEzQyxDQUEyQyxDQUFDO2lCQUN6RSxHQUFHLENBQUMsVUFBQyxRQUFnQjtnQkFDcEIsSUFBSSxLQUFLLEdBQVcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQUksR0FBRyxDQUFDLFdBQVcsRUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JHLEtBQUssR0FBRyxnQkFBYyxLQUFLLENBQUMsV0FBVyxFQUFFLFNBQU0sQ0FBQztnQkFDaEQsTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUM7WUFDdkQsQ0FBQyxDQUFDLENBQUM7WUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksaUNBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQU1NLDREQUFrQixHQUF6QixVQUEwQixVQUFnQjtRQUN4QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBcEJRO1FBQVIsWUFBSyxFQUFFOztrRUFBZTtJQUNkO1FBQVIsWUFBSyxFQUFFOzs0RUFBeUI7SUFFakM7UUFEQyxZQUFLLEVBQUU7Ozs0RUFVUDtJQWpCVSwrQkFBK0I7UUFOM0MsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsMkJBQTJCO1lBQ3JDLFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0MsZUFBZSxFQUFFLDhCQUF1QixDQUFDLE1BQU07U0FDaEQsQ0FBQzt5Q0FvQmdCLG1CQUFXLEVBQWEseUJBQVMsRUFBVyxpQkFBVTtPQW5CM0QsK0JBQStCLENBMEIzQztJQUFELHNDQUFDO0NBMUJELEFBMEJDLENBMUJvRCx5QkFBVSxHQTBCOUQ7QUExQlksMEVBQStCIiwiZmlsZSI6ImFwcC8rY29tbWVyY2UvK3F1b3RlLytlZGl0L2NvbXBvbmVudHMvd3otZm9ybS1hdXRvY29tcGxldGUtdmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBQb2pvIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvY29tbW9uLmludGVyZmFjZSc7XG5pbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBFbGVtZW50UmVmLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1CdWlsZGVyIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRm9ybU1vZGVsIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5mb3JtLm1vZGVsJztcbmltcG9ydCB7IEZvcm1GaWVsZHMsIFNlcnZlckVycm9ycyB9IGZyb20gJy4uLy4uLy4uLy4uL3NoYXJlZC9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBXekZvcm1CYXNlIH0gZnJvbSAnLi4vLi4vLi4vLi4vc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5mb3JtLWJhc2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgc2VsZWN0b3I6ICd3ei1mb3JtLWF1dG9jb21wbGV0ZS12aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICd3ei1mb3JtLWF1dG9jb21wbGV0ZS12aWV3Lmh0bWwnLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXekZvcm1BdXRvQ29tcGxldGVWaWV3Q29tcG9uZW50IGV4dGVuZHMgV3pGb3JtQmFzZSB7XG4gIHB1YmxpYyBsYWJlbHM6IEJlaGF2aW9yU3ViamVjdDxQb2pvW10+O1xuICBwdWJsaWMgcHJvcGVydGllc1RvSWdub3JlOiBzdHJpbmdbXSA9IFtcbiAgICAnbmFtZScsICdpZCcsICdlbWFpbCcsICdpbnZvaWNlQ29udGFjdElkJywgJ3NhbGVzT3duZXInLCAncGF5bWVudFRlcm1zRGF5cycsICdyZWFkb25seVBheW1lbnRUZXJtc0RheXMnXG4gIF07XG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1hdGNoT25Qcm9wZXJ0eTogc3RyaW5nO1xuICBASW5wdXQoKVxuICBzZXQgZGlzcGxheVByb3BlcnRpZXMocHJvcGVydGllczogUG9qbykge1xuICAgIGNvbnN0IHRlbXBMYWJlbHM6IHsgbGFiZWw6IHN0cmluZywgdmFsdWU6IHN0cmluZyB9W10gPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzIHx8IFtdKVxuICAgICAgLmZpbHRlcigocHJvcGVydHk6IHN0cmluZykgPT4gIXRoaXMucHJvcGVydGllc1RvSWdub3JlLmluY2x1ZGVzKHByb3BlcnR5KSlcbiAgICAgIC5tYXAoKHByb3BlcnR5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGxhYmVsOiBzdHJpbmcgPSBwcm9wZXJ0eS5yZXBsYWNlKC8oW0EtWl0pL2csIGZ1bmN0aW9uIChzdHIpIHsgcmV0dXJuIGBfJHtzdHIudG9Mb3dlckNhc2UoKX1gOyB9KTtcbiAgICAgICAgbGFiZWwgPSBgUVVPVEUuRURJVC4ke2xhYmVsLnRvVXBwZXJDYXNlKCl9X0tFWWA7XG4gICAgICAgIHJldHVybiB7IGxhYmVsOiBsYWJlbCwgdmFsdWU6IHByb3BlcnRpZXNbcHJvcGVydHldIH07XG4gICAgICB9KTtcbiAgICB0aGlzLmxhYmVscyA9IG5ldyBCZWhhdmlvclN1YmplY3QodGVtcExhYmVscyk7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihmYjogRm9ybUJ1aWxkZXIsIGZvcm1Nb2RlbDogRm9ybU1vZGVsLCBlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgc3VwZXIoZmIsIGZvcm1Nb2RlbCwgZWxlbWVudCk7XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3RTdWdnZXN0aW9uKHN1Z2dlc3Rpb246IFBvam8pOiB2b2lkIHtcbiAgICB0aGlzLmZvcm1TdWJtaXQuZW1pdChzdWdnZXN0aW9uKTtcbiAgfVxufVxuIl19
