"use strict";
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
    WzAddressFormComponent.decorators = [
        { type: core_1.Component, args: [{
                    moduleId: module.id,
                    selector: 'wz-address-form-component',
                    templateUrl: './wz.address-form.html',
                    styles: ["\n    .autocomplete{width: 100%; margin-bottom: 20px;}\n    .submit-btn{width: 40%; margin-top: 20px;}\n  "],
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    WzAddressFormComponent.ctorParameters = function () { return [
        { type: forms_1.FormBuilder, },
        { type: google_places_service_1.GooglePlacesService, },
        { type: core_1.ChangeDetectorRef, },
        { type: Document, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
    ]; };
    WzAddressFormComponent.propDecorators = {
        'title': [{ type: core_1.Input },],
        'address': [{ type: core_1.Input },],
        'loaded': [{ type: core_1.Input },],
        'includeCloseButton': [{ type: core_1.Input },],
        'onSaveAddress': [{ type: core_1.Output },],
    };
    return WzAddressFormComponent;
}());
exports.WzAddressFormComponent = WzAddressFormComponent;
//# sourceMappingURL=wz.address-form.component.js.map