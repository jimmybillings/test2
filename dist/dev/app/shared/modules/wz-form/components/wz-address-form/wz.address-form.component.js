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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var google_places_service_1 = require("../../services/google-places.service");
var common_functions_1 = require("../../../../utilities/common.functions");
var platform_browser_1 = require("@angular/platform-browser");
var WzAddressFormComponent = (function () {
    function WzAddressFormComponent(fb, google, ref, document) {
        var _this = this;
        this.fb = fb;
        this.google = google;
        this.ref = ref;
        this.document = document;
        this.includeCloseButton = false;
        this.onSaveAddress = new core_1.EventEmitter();
        this.formItems = this.items;
        this.fillInAddress = function () {
            var googleAddress = _this.google.getPlace();
            _this.forEachFormItem(function (item) {
                _this.setControlValue(item, googleAddress);
            });
            _this.ref.detectChanges();
        };
    }
    Object.defineProperty(WzAddressFormComponent.prototype, "address", {
        set: function (address) {
            this.buildForm(address);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzAddressFormComponent.prototype, "loaded", {
        set: function (loaded) {
            if (loaded)
                this.loadGooglePlaces();
        },
        enumerable: true,
        configurable: true
    });
    WzAddressFormComponent.prototype.saveAddress = function () {
        this.onSaveAddress.emit(this.addressForm.value);
    };
    WzAddressFormComponent.prototype.geolocate = function () {
        common_functions_1.Common.setMarginTop('pac-container', this.document);
        if (navigator.geolocation) {
            this.google.geolocate();
        }
    };
    Object.defineProperty(WzAddressFormComponent.prototype, "addressFormValid", {
        get: function () {
            return this.addressForm.valid;
        },
        enumerable: true,
        configurable: true
    });
    WzAddressFormComponent.prototype.setControlValue = function (item, googleAddress) {
        var value = item.googleFields.reduce(function (prev, field) {
            prev.push(googleAddress[field] ? googleAddress[field][item.addressType] : '');
            return prev;
        }, []).join(' ').trim();
        if (value.length)
            this.addressForm.controls[item.name].setValue(value);
    };
    WzAddressFormComponent.prototype.buildForm = function (address) {
        var _this = this;
        var newForm = {};
        this.forEachFormItem(function (item) {
            newForm[item.name] = _this.buildFormControl(item, address);
        });
        this.addressForm = this.fb.group(newForm);
    };
    WzAddressFormComponent.prototype.buildFormControl = function (item, address) {
        var validator = item.validation === 'REQUIRED' ? forms_1.Validators.required : null;
        var value = address && address ? address[item.name] : '';
        return new forms_1.FormControl(value, validator);
    };
    WzAddressFormComponent.prototype.forEachFormItem = function (processor) {
        this.formItems.forEach(function (row) { return row.fields.forEach(processor); });
    };
    WzAddressFormComponent.prototype.loadGooglePlaces = function () {
        this.google.loadPlacesLibrary(this.fillInAddress);
    };
    Object.defineProperty(WzAddressFormComponent.prototype, "items", {
        get: function () {
            return [
                {
                    fields: [
                        {
                            name: 'address',
                            label: 'ADDRESS_FORM.LINE_ONE',
                            type: 'text',
                            value: '',
                            validation: 'REQUIRED',
                            googleFields: ['street_number', 'route'],
                            addressType: 'long_name'
                        }
                    ]
                },
                {
                    fields: [
                        {
                            name: 'address2',
                            label: 'ADDRESS_FORM.LINE_TWO',
                            type: 'text',
                            value: '',
                            validation: 'OPTIONAL',
                            googleFields: [],
                            addressType: ''
                        }
                    ]
                },
                {
                    fields: [
                        {
                            name: 'city',
                            label: 'ADDRESS_FORM.CITY',
                            type: 'text',
                            value: '',
                            validation: 'REQUIRED',
                            googleFields: ['locality'],
                            addressType: 'long_name'
                        },
                        {
                            name: 'state',
                            label: 'ADDRESS_FORM.STATE/PROVINCE',
                            type: 'text',
                            value: '',
                            validation: 'REQUIRED',
                            googleFields: ['administrative_area_level_1'],
                            addressType: 'short_name'
                        }
                    ]
                },
                {
                    fields: [
                        {
                            name: 'zipcode',
                            label: 'ADDRESS_FORM.POSTAL_CODE',
                            type: 'text',
                            value: '',
                            validation: 'REQUIRED',
                            googleFields: ['postal_code'],
                            addressType: 'short_name'
                        },
                        {
                            name: 'country',
                            label: 'ADDRESS_FORM.COUNTRY',
                            type: 'text',
                            value: '',
                            validation: 'REQUIRED',
                            googleFields: ['country'],
                            addressType: 'long_name'
                        }
                    ]
                },
                {
                    fields: [
                        {
                            name: 'phone',
                            label: 'ADDRESS_FORM.PHONE_NUMBER',
                            type: 'text',
                            value: '',
                            validation: 'REQUIRED',
                            googleFields: [],
                            addressType: ''
                        }
                    ]
                }
            ];
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzAddressFormComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], WzAddressFormComponent.prototype, "address", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], WzAddressFormComponent.prototype, "loaded", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WzAddressFormComponent.prototype, "includeCloseButton", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzAddressFormComponent.prototype, "onSaveAddress", void 0);
    WzAddressFormComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'wz-address-form-component',
            templateUrl: './wz.address-form.html',
            styles: ["\n    .autocomplete{width: 100%; margin-bottom: 20px;}\n    .submit-btn{width: 40%; margin-top: 20px;}\n  "],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __param(3, core_1.Inject(platform_browser_1.DOCUMENT)),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            google_places_service_1.GooglePlacesService,
            core_1.ChangeDetectorRef,
            Document])
    ], WzAddressFormComponent);
    return WzAddressFormComponent;
}());
exports.WzAddressFormComponent = WzAddressFormComponent;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otYWRkcmVzcy1mb3JtL3d6LmFkZHJlc3MtZm9ybS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzQ0FHdUI7QUFDdkIsd0NBQWlGO0FBR2pGLDhFQUEyRTtBQUMzRSwyRUFBZ0U7QUFDaEUsOERBQXFEO0FBWXJEO0lBZUUsZ0NBQ1UsRUFBZSxFQUNmLE1BQTJCLEVBQzNCLEdBQXNCLEVBQ0osUUFBa0I7UUFKOUMsaUJBS0s7UUFKSyxPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsV0FBTSxHQUFOLE1BQU0sQ0FBcUI7UUFDM0IsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDSixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBVDlCLHVCQUFrQixHQUFZLEtBQUssQ0FBQztRQUMxQyxrQkFBYSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBRXRDLGNBQVMsR0FBa0IsSUFBSSxDQUFDLEtBQUssQ0FBQztRQXdCckMsa0JBQWEsR0FBRztZQUN0QixJQUFJLGFBQWEsR0FBMkIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUVuRSxLQUFJLENBQUMsZUFBZSxDQUFDLFVBQUMsSUFBZ0I7Z0JBQ3BDLEtBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1lBQzVDLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztRQUMzQixDQUFDLENBQUE7SUF6QkcsQ0FBQztJQWpCTCxzQkFBVywyQ0FBTzthQUFsQixVQUFtQixPQUFnQjtZQUNqQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFCLENBQUM7OztPQUFBO0lBRUQsc0JBQVcsMENBQU07YUFBakIsVUFBa0IsTUFBZTtZQUMvQixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JB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Q0FBbUI7WUFDdEIsd0JBQWlCO1lBQ00sUUFBUTtPQW5CbkMsc0JBQXNCLENBc0tsQztJQUFELDZCQUFDO0NBdEtELEFBc0tDLElBQUE7QUF0S1ksd0RBQXNCIiwiZmlsZSI6ImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL2NvbXBvbmVudHMvd3otYWRkcmVzcy1mb3JtL3d6LmFkZHJlc3MtZm9ybS5jb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIFNpbXBsZUNoYW5nZXMsIENoYW5nZURldGVjdG9yUmVmLCBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtR3JvdXAsIEZvcm1CdWlsZGVyLCBWYWxpZGF0b3JzLCBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFkZHJlc3MsIEZvcm1hdHRlZEdvb2dsZUFkZHJlc3MgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL3VzZXIuaW50ZXJmYWNlJztcbmltcG9ydCB7IFJvd0Zvcm1GaWVsZHMsIEZvcm1Sb3csIEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi8uLi8uLi9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBHb29nbGVQbGFjZXNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZ29vZ2xlLXBsYWNlcy5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbiB9IGZyb20gJy4uLy4uLy4uLy4uL3V0aWxpdGllcy9jb21tb24uZnVuY3Rpb25zJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ3d6LWFkZHJlc3MtZm9ybS1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vd3ouYWRkcmVzcy1mb3JtLmh0bWwnLFxuICBzdHlsZXM6IFtgXG4gICAgLmF1dG9jb21wbGV0ZXt3aWR0aDogMTAwJTsgbWFyZ2luLWJvdHRvbTogMjBweDt9XG4gICAgLnN1Ym1pdC1idG57d2lkdGg6IDQwJTsgbWFyZ2luLXRvcDogMjBweDt9XG4gIGBdLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBXekFkZHJlc3NGb3JtQ29tcG9uZW50IHtcbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcbiAgQElucHV0KClcbiAgcHVibGljIHNldCBhZGRyZXNzKGFkZHJlc3M6IEFkZHJlc3MpIHtcbiAgICB0aGlzLmJ1aWxkRm9ybShhZGRyZXNzKTtcbiAgfVxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IGxvYWRlZChsb2FkZWQ6IGJvb2xlYW4pIHtcbiAgICBpZiAobG9hZGVkKSB0aGlzLmxvYWRHb29nbGVQbGFjZXMoKTtcbiAgfVxuICBASW5wdXQoKSBwdWJsaWMgaW5jbHVkZUNsb3NlQnV0dG9uOiBib29sZWFuID0gZmFsc2U7XG4gIEBPdXRwdXQoKSBvblNhdmVBZGRyZXNzID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgYWRkcmVzc0Zvcm06IEZvcm1Hcm91cDtcbiAgcHVibGljIGZvcm1JdGVtczogUm93Rm9ybUZpZWxkcyA9IHRoaXMuaXRlbXM7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBnb29nbGU6IEdvb2dsZVBsYWNlc1NlcnZpY2UsXG4gICAgcHJpdmF0ZSByZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50XG4gICkgeyB9XG5cbiAgcHVibGljIHNhdmVBZGRyZXNzKCkge1xuICAgIHRoaXMub25TYXZlQWRkcmVzcy5lbWl0KHRoaXMuYWRkcmVzc0Zvcm0udmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGdlb2xvY2F0ZSgpOiB2b2lkIHtcbiAgICBDb21tb24uc2V0TWFyZ2luVG9wKCdwYWMtY29udGFpbmVyJywgdGhpcy5kb2N1bWVudCk7XG4gICAgaWYgKG5hdmlnYXRvci5nZW9sb2NhdGlvbikge1xuICAgICAgdGhpcy5nb29nbGUuZ2VvbG9jYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBhZGRyZXNzRm9ybVZhbGlkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmFkZHJlc3NGb3JtLnZhbGlkO1xuICB9XG5cbiAgcHJpdmF0ZSBmaWxsSW5BZGRyZXNzID0gKCk6IHZvaWQgPT4ge1xuICAgIGxldCBnb29nbGVBZGRyZXNzOiBGb3JtYXR0ZWRHb29nbGVBZGRyZXNzID0gdGhpcy5nb29nbGUuZ2V0UGxhY2UoKTtcblxuICAgIHRoaXMuZm9yRWFjaEZvcm1JdGVtKChpdGVtOiBGb3JtRmllbGRzKSA9PiB7XG4gICAgICB0aGlzLnNldENvbnRyb2xWYWx1ZShpdGVtLCBnb29nbGVBZGRyZXNzKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIHByaXZhdGUgc2V0Q29udHJvbFZhbHVlKGl0ZW06IEZvcm1GaWVsZHMsIGdvb2dsZUFkZHJlc3M6IEZvcm1hdHRlZEdvb2dsZUFkZHJlc3MpOiB2b2lkIHtcbiAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGl0ZW0uZ29vZ2xlRmllbGRzLnJlZHVjZSgocHJldjogQXJyYXk8c3RyaW5nPiwgZmllbGQ6IHN0cmluZykgPT4ge1xuICAgICAgcHJldi5wdXNoKGdvb2dsZUFkZHJlc3NbZmllbGRdID8gZ29vZ2xlQWRkcmVzc1tmaWVsZF1baXRlbS5hZGRyZXNzVHlwZV0gOiAnJyk7XG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCBbXSkuam9pbignICcpLnRyaW0oKTtcbiAgICBpZiAodmFsdWUubGVuZ3RoKSB0aGlzLmFkZHJlc3NGb3JtLmNvbnRyb2xzW2l0ZW0ubmFtZV0uc2V0VmFsdWUodmFsdWUpO1xuICB9XG5cbiAgcHJpdmF0ZSBidWlsZEZvcm0oYWRkcmVzczogQWRkcmVzcyk6IHZvaWQge1xuICAgIGxldCBuZXdGb3JtOiBhbnkgPSB7fTtcblxuICAgIHRoaXMuZm9yRWFjaEZvcm1JdGVtKChpdGVtOiBGb3JtRmllbGRzKSA9PiB7XG4gICAgICBuZXdGb3JtW2l0ZW0ubmFtZV0gPSB0aGlzLmJ1aWxkRm9ybUNvbnRyb2woaXRlbSwgYWRkcmVzcyk7XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZHJlc3NGb3JtID0gdGhpcy5mYi5ncm91cChuZXdGb3JtKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRGb3JtQ29udHJvbChpdGVtOiBGb3JtRmllbGRzLCBhZGRyZXNzOiBBZGRyZXNzKTogRm9ybUNvbnRyb2wge1xuICAgIGxldCB2YWxpZGF0b3IgPSBpdGVtLnZhbGlkYXRpb24gPT09ICdSRVFVSVJFRCcgPyBWYWxpZGF0b3JzLnJlcXVpcmVkIDogbnVsbDtcbiAgICBsZXQgdmFsdWU6IHN0cmluZyA9IGFkZHJlc3MgJiYgYWRkcmVzcyA/IGFkZHJlc3NbaXRlbS5uYW1lXSA6ICcnO1xuICAgIHJldHVybiBuZXcgRm9ybUNvbnRyb2wodmFsdWUsIHZhbGlkYXRvcik7XG4gIH1cblxuICBwcml2YXRlIGZvckVhY2hGb3JtSXRlbShwcm9jZXNzb3I6IChpdGVtOiBGb3JtRmllbGRzKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtSXRlbXMuZm9yRWFjaCgocm93OiBGb3JtUm93KSA9PiByb3cuZmllbGRzLmZvckVhY2gocHJvY2Vzc29yKSk7XG4gIH1cblxuICBwcml2YXRlIGxvYWRHb29nbGVQbGFjZXMoKTogdm9pZCB7XG4gICAgdGhpcy5nb29nbGUubG9hZFBsYWNlc0xpYnJhcnkodGhpcy5maWxsSW5BZGRyZXNzKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGl0ZW1zKCk6IFJvd0Zvcm1GaWVsZHMge1xuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdhZGRyZXNzJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQUREUkVTU19GT1JNLkxJTkVfT05FJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHZhbGlkYXRpb246ICdSRVFVSVJFRCcsXG4gICAgICAgICAgICBnb29nbGVGaWVsZHM6IFsnc3RyZWV0X251bWJlcicsICdyb3V0ZSddLFxuICAgICAgICAgICAgYWRkcmVzc1R5cGU6ICdsb25nX25hbWUnXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBmaWVsZHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnYWRkcmVzczInLFxuICAgICAgICAgICAgbGFiZWw6ICdBRERSRVNTX0ZPUk0uTElORV9UV08nLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ09QVElPTkFMJyxcbiAgICAgICAgICAgIGdvb2dsZUZpZWxkczogW10sXG4gICAgICAgICAgICBhZGRyZXNzVHlwZTogJydcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjaXR5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQUREUkVTU19GT1JNLkNJVFknLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJyxcbiAgICAgICAgICAgIGdvb2dsZUZpZWxkczogWydsb2NhbGl0eSddLFxuICAgICAgICAgICAgYWRkcmVzc1R5cGU6ICdsb25nX25hbWUnXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnc3RhdGUnLFxuICAgICAgICAgICAgbGFiZWw6ICdBRERSRVNTX0ZPUk0uU1RBVEUvUFJPVklOQ0UnLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJyxcbiAgICAgICAgICAgIGdvb2dsZUZpZWxkczogWydhZG1pbmlzdHJhdGl2ZV9hcmVhX2xldmVsXzEnXSxcbiAgICAgICAgICAgIGFkZHJlc3NUeXBlOiAnc2hvcnRfbmFtZSdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICd6aXBjb2RlJyxcbiAgICAgICAgICAgIGxhYmVsOiAnQUREUkVTU19GT1JNLlBPU1RBTF9DT0RFJyxcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0JyxcbiAgICAgICAgICAgIHZhbHVlOiAnJyxcbiAgICAgICAgICAgIHZhbGlkYXRpb246ICdSRVFVSVJFRCcsXG4gICAgICAgICAgICBnb29nbGVGaWVsZHM6IFsncG9zdGFsX2NvZGUnXSxcbiAgICAgICAgICAgIGFkZHJlc3NUeXBlOiAnc2hvcnRfbmFtZSdcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdjb3VudHJ5JyxcbiAgICAgICAgICAgIGxhYmVsOiAnQUREUkVTU19GT1JNLkNPVU5UUlknLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJyxcbiAgICAgICAgICAgIGdvb2dsZUZpZWxkczogWydjb3VudHJ5J10sXG4gICAgICAgICAgICBhZGRyZXNzVHlwZTogJ2xvbmdfbmFtZSdcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGZpZWxkczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdwaG9uZScsXG4gICAgICAgICAgICBsYWJlbDogJ0FERFJFU1NfRk9STS5QSE9ORV9OVU1CRVInLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICAgICAgdmFsdWU6ICcnLFxuICAgICAgICAgICAgdmFsaWRhdGlvbjogJ1JFUVVJUkVEJyxcbiAgICAgICAgICAgIGdvb2dsZUZpZWxkczogW10sXG4gICAgICAgICAgICBhZGRyZXNzVHlwZTogJydcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICBdO1xuICB9XG59XG4iXX0=
