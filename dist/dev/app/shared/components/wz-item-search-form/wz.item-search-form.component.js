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
var forms_1 = require("@angular/forms");
var WzItemSearchFormComponent = (function () {
    function WzItemSearchFormComponent(fb) {
        this.fb = fb;
        this.query = new core_1.EventEmitter();
        this.closeSearch = new core_1.EventEmitter();
        this.setForm();
    }
    WzItemSearchFormComponent.prototype.setForm = function () {
        this.itemSearch = this.fb.group({ q: ['', forms_1.Validators.required] });
    };
    WzItemSearchFormComponent.prototype.onSubmit = function () {
        this.query.emit(this.itemSearch.value);
    };
    WzItemSearchFormComponent.prototype.resetSearch = function () {
        this.itemSearch.controls['q'].reset('');
        this.onSubmit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzItemSearchFormComponent.prototype, "currentSearchQuery", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzItemSearchFormComponent.prototype, "placeholderTxt", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzItemSearchFormComponent.prototype, "query", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzItemSearchFormComponent.prototype, "closeSearch", void 0);
    WzItemSearchFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-item-search-form',
            templateUrl: 'wz.item-search-form.html',
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder])
    ], WzItemSearchFormComponent);
    return WzItemSearchFormComponent;
}());
exports.WzItemSearchFormComponent = WzItemSearchFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvY29tcG9uZW50cy93ei1pdGVtLXNlYXJjaC1mb3JtL3d6Lml0ZW0tc2VhcmNoLWZvcm0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsc0NBQWdHO0FBQ2hHLHdDQUFvRTtBQVNwRTtJQU9FLG1DQUNTLEVBQWU7UUFBZixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBSmQsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFJekMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFFTSwyQ0FBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRU0sNENBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVNLCtDQUFXLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQixDQUFDO0lBckJRO1FBQVIsWUFBSyxFQUFFOzt5RUFBeUI7SUFDeEI7UUFBUixZQUFLLEVBQUU7O3FFQUFxQjtJQUNuQjtRQUFULGFBQU0sRUFBRTs7NERBQTRCO0lBQzNCO1FBQVQsYUFBTSxFQUFFOztrRUFBa0M7SUFMaEMseUJBQXlCO1FBUHJDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLHFCQUFxQjtZQUMvQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO1NBQ2hELENBQUM7eUNBVWEsbUJBQVc7T0FSYix5QkFBeUIsQ0F3QnJDO0lBQUQsZ0NBQUM7Q0F4QkQsQUF3QkMsSUFBQTtBQXhCWSw4REFBeUIiLCJmaWxlIjoiYXBwL3NoYXJlZC9jb21wb25lbnRzL3d6LWl0ZW0tc2VhcmNoLWZvcm0vd3ouaXRlbS1zZWFyY2gtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBPdXRwdXQsIElucHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LWl0ZW0tc2VhcmNoLWZvcm0nLFxuICB0ZW1wbGF0ZVVybDogJ3d6Lml0ZW0tc2VhcmNoLWZvcm0uaHRtbCcsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuXG5leHBvcnQgY2xhc3MgV3pJdGVtU2VhcmNoRm9ybUNvbXBvbmVudCB7XG4gIHB1YmxpYyBpdGVtU2VhcmNoOiBGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIGN1cnJlbnRTZWFyY2hRdWVyeTogYW55O1xuICBASW5wdXQoKSBwbGFjZWhvbGRlclR4dDogYW55O1xuICBAT3V0cHV0KCkgcXVlcnkgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBjbG9zZVNlYXJjaCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgZmI6IEZvcm1CdWlsZGVyKSB7XG4gICAgdGhpcy5zZXRGb3JtKCk7XG4gIH1cblxuICBwdWJsaWMgc2V0Rm9ybSgpIHtcbiAgICB0aGlzLml0ZW1TZWFyY2ggPSB0aGlzLmZiLmdyb3VwKHsgcTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblN1Ym1pdCgpIHtcbiAgICB0aGlzLnF1ZXJ5LmVtaXQodGhpcy5pdGVtU2VhcmNoLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldFNlYXJjaCgpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1TZWFyY2guY29udHJvbHNbJ3EnXS5yZXNldCgnJyk7XG4gICAgdGhpcy5vblN1Ym1pdCgpO1xuICB9XG59XG4iXX0=
