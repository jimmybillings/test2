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
var material_1 = require("@angular/material");
var WzFormBase = (function () {
    function WzFormBase(fb, formModel, element) {
        this.fb = fb;
        this.formModel = formModel;
        this.element = element;
        this.submitLabel = 'Submit';
        this.includeCancel = false;
        this.includeSubmit = true;
        this.cancelLabel = 'Cancel';
        this.autocomplete = 'on';
        this.formSubmit = new core_1.EventEmitter();
        this.formCancel = new core_1.EventEmitter();
        this.onAction = new core_1.EventEmitter();
        this.blur = new core_1.EventEmitter();
        this.keyUp = new core_1.EventEmitter();
        this.valueChange = new core_1.EventEmitter();
        this.submitAttempt = false;
        this.showRequiredLegend = false;
    }
    WzFormBase.prototype.ngOnChanges = function (changes) {
        if (changes.serverErrors && this.form)
            this.mergeErrors();
        if (changes.items && this.form)
            this.mergeNewValues();
    };
    WzFormBase.prototype.ngOnInit = function () {
        this.form = this.fb.group(this.formModel.create(this.items));
    };
    WzFormBase.prototype.mergeErrors = function () {
        var _this = this;
        this.serverErrors.fieldErrors.forEach(function (error) {
            for (var control in _this.form.controls) {
                if (control.toLowerCase() === error.field.toLowerCase()) {
                    _this.form.controls[control].setErrors({ serverError: error.code });
                }
            }
        });
    };
    WzFormBase.prototype.mergeNewValues = function (formFields) {
        var _this = this;
        if (formFields === void 0) { formFields = this.items; }
        formFields.forEach(function (field) {
            for (var control in _this.form.controls) {
                if (control === field.name) {
                    _this.form.controls[control].patchValue(field.value, { emitEvent: false });
                }
            }
            if (_this.autosize)
                _this.autosize.resizeToFitContent();
        });
    };
    WzFormBase.prototype.disableForm = function () {
        var _this = this;
        this.items.forEach(function (field) {
            for (var control in _this.form.controls) {
                if (control === field.name) {
                    _this.form.controls[control].disable();
                }
            }
        });
    };
    WzFormBase.prototype.getValueForField = function (field) {
        var fieldValue;
        for (var control in this.form.controls) {
            if (control === field) {
                fieldValue = this.form.controls[control].value;
            }
        }
        return (fieldValue) ? fieldValue : '';
    };
    WzFormBase.prototype.setValueForField = function (field, value) {
        this.form.controls[field].patchValue(value, { emitEvent: false });
    };
    WzFormBase.prototype.activateForm = function () {
        var _this = this;
        this.items.forEach(function (field) {
            for (var control in _this.form.controls) {
                if (control === field.name) {
                    _this.form.controls[control].enable();
                }
            }
        });
    };
    WzFormBase.prototype.markFieldsAsDirty = function () {
        for (var control in this.form.controls) {
            this.form.controls[control].markAsDirty();
        }
    };
    WzFormBase.prototype.markFieldsAsTouched = function () {
        for (var control in this.form.controls) {
            this.form.controls[control].markAsTouched();
        }
    };
    WzFormBase.prototype.parseOptions = function (options) {
        return options.split(',');
    };
    WzFormBase.prototype.onSelectChange = function (event, field) {
        if (field.options && field.slaveFieldName && field.slaveFieldValues) {
            var selectedIndex = field.options.split(',').indexOf(event.value);
            this.update(field.slaveFieldName, field.slaveFieldValues[selectedIndex]);
        }
    };
    WzFormBase.prototype.radioSelect = function (fieldName, option) {
        this.update(fieldName, option);
    };
    WzFormBase.prototype.updateDateValueFor = function (fieldName, dateString) {
        this.update(fieldName, this.calculateDateFor(dateString));
    };
    WzFormBase.prototype.isRequiredField = function (field) {
        return 'validation' in field && (field.validation === 'REQUIRED' ||
            field.validation === 'EMAIL' ||
            field.validation === 'MULTIEMAIL' ||
            field.validation === 'PASSWORD' ||
            field.validation === 'TERMS' ||
            field.validation === 'GREATER_THAN' ||
            field.validation === 'LESS_THAN' ||
            field.validation === 'BETWEEN' ||
            field.validation === 'COLLECTION') ? true : false;
    };
    WzFormBase.prototype.hasErrorType = function (field) {
        return (!field.valid && field.pristine && this.submitAttempt) ||
            (!field.valid && !field.pristine && this.submitAttempt) ||
            (!field.valid && !field.pristine && !this.submitAttempt);
    };
    WzFormBase.prototype.hasRequiredFields = function (formFields) {
        var req = formFields.filter(this.isRequiredField);
        return req.length > 0 ? true : false;
    };
    WzFormBase.prototype.onSubmit = function () {
        this.submitAttempt = true;
        this.markFieldsAsDirty();
        if (this.form.valid) {
            this.formSubmit.emit(this.form.value);
        }
    };
    WzFormBase.prototype.resetForm = function () {
        this.internalForm.resetForm();
        if (this.autosize)
            this.autosize.resizeToFitContent();
        this.submitAttempt = false;
    };
    WzFormBase.prototype.onDollarsInput = function (event) {
        var target = event.target;
        var cleaner = new DollarsInputCleaner(target.value, target.selectionStart);
        cleaner.clean();
        target.value = cleaner.inputValue;
        target.selectionStart = target.selectionEnd = cleaner.cursorPosition;
    };
    WzFormBase.prototype.calculateDateFor = function (dateSpec) {
        if (!dateSpec)
            return null;
        var upperDateSpec = dateSpec.toUpperCase().replace(/ /g, '');
        if (upperDateSpec === 'TODAY')
            return new Date().toISOString();
        if (upperDateSpec.match(/^TODAY[+-][0-9]+$/)) {
            var numberOfDaysToAdd = parseInt(upperDateSpec.replace('TODAY', ''));
            var date_1 = new Date();
            date_1.setDate(date_1.getDate() + numberOfDaysToAdd);
            return date_1.toISOString();
        }
        var date;
        try {
            date = new Date(dateSpec);
        }
        catch (error) {
            throw new Error("Could not parse date specification '" + dateSpec + "'");
        }
        return date.toISOString();
    };
    WzFormBase.prototype.shouldShowRequiredError = function (field) {
        var control = this.form.controls[field.name];
        return control.hasError('required') || (control.errors.pattern && control.errors.pattern.requiredPattern === String(/\S/));
    };
    WzFormBase.prototype.shouldShowEmailError = function (field) {
        return this.form.controls[field.name].hasError('pattern') && field.validation === 'EMAIL';
    };
    WzFormBase.prototype.shouldShowLessThanError = function (field) {
        return this.form.controls[field.name].hasError('tooHigh');
    };
    WzFormBase.prototype.shouldShowGreaterThanError = function (field) {
        return this.form.controls[field.name].hasError('tooLow');
    };
    WzFormBase.prototype.onBlur = function () {
        this.blur.emit(this.form.value);
    };
    WzFormBase.prototype.onKeyUp = function () {
        this.keyUp.emit(this.form.value);
    };
    WzFormBase.prototype.onChange = function () {
        this.valueChange.emit(this.form.value);
    };
    WzFormBase.prototype.showDefaultInputFor = function (field) {
        return ['text', 'password', 'email', 'date'].includes(field.type);
    };
    Object.defineProperty(WzFormBase.prototype, "showSubmitAndCancel", {
        get: function () {
            return this.includeCancel && this.includeSubmit;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WzFormBase.prototype, "showSubmit", {
        get: function () {
            return this.includeSubmit && !this.includeCancel;
        },
        enumerable: true,
        configurable: true
    });
    WzFormBase.prototype.updateValidatorsFor = function (field) {
        var control = this.controlFrom(field);
        this.formModel.updateValidatorsFor(control, field);
    };
    WzFormBase.prototype.controlFrom = function (field) {
        var control;
        for (var controlName in this.form.controls) {
            if (controlName === field.name) {
                control = this.form.controls[controlName];
                break;
            }
        }
        return control;
    };
    WzFormBase.prototype.dateToString = function (date) {
        return date.toISOString().slice(0, 10).replace(/-/g, '/');
    };
    WzFormBase.prototype.update = function (fieldName, value) {
        this.form.controls[fieldName].setValue(value);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], WzFormBase.prototype, "items", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], WzFormBase.prototype, "serverErrors", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormBase.prototype, "submitLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WzFormBase.prototype, "includeCancel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], WzFormBase.prototype, "includeSubmit", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormBase.prototype, "cancelLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], WzFormBase.prototype, "autocomplete", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzFormBase.prototype, "formSubmit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzFormBase.prototype, "formCancel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzFormBase.prototype, "onAction", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzFormBase.prototype, "blur", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzFormBase.prototype, "keyUp", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], WzFormBase.prototype, "valueChange", void 0);
    __decorate([
        core_1.ViewChild(material_1.MatTextareaAutosize),
        __metadata("design:type", material_1.MatTextareaAutosize)
    ], WzFormBase.prototype, "autosize", void 0);
    __decorate([
        core_1.ViewChild(forms_1.FormGroupDirective),
        __metadata("design:type", forms_1.FormGroupDirective)
    ], WzFormBase.prototype, "internalForm", void 0);
    return WzFormBase;
}());
exports.WzFormBase = WzFormBase;
var DollarsInputCleaner = (function () {
    function DollarsInputCleaner(inputValue, cursorPosition) {
        this.inputValue = inputValue;
        this.cursorPosition = cursorPosition;
    }
    DollarsInputCleaner.prototype.clean = function () {
        this.removeNonDollarCharacters();
        this.removeLeadingZeros();
        this.removeExcessDecimalPoints();
        this.removeExcessPostDecimalDigits();
    };
    DollarsInputCleaner.prototype.removeNonDollarCharacters = function () {
        this.modifyInputValueWith(function (string) { return string.replace(/[^\d\.]/g, ''); });
    };
    DollarsInputCleaner.prototype.removeLeadingZeros = function () {
        this.modifyInputValueWith(function (string) { return string.replace(/^0*(\d.*)/, '$1'); });
    };
    DollarsInputCleaner.prototype.removeExcessDecimalPoints = function () {
        var _this = this;
        this.modifyInputValueWith(function (string) { return _this.removeExcessDecimalPointsLeftOf(_this.cursorPosition, string); });
        this.modifyInputValueWith(function (string) { return _this.removeExcessDecimalPointsLeftOf(string.length, string); }, false);
    };
    DollarsInputCleaner.prototype.removeExcessPostDecimalDigits = function () {
        this.modifyInputValueWith(function (string) { return string.replace(/^(.*\.\d\d).*$/, '$1'); }, false);
        this.cursorPosition = Math.min(this.cursorPosition, this.inputValue.length);
    };
    DollarsInputCleaner.prototype.modifyInputValueWith = function (pureModifier, recalculateCursorPosition) {
        if (recalculateCursorPosition === void 0) { recalculateCursorPosition = true; }
        var lengthBeforeModification = this.inputValue.length;
        this.inputValue = pureModifier(this.inputValue);
        if (recalculateCursorPosition)
            this.cursorPosition -= (lengthBeforeModification - this.inputValue.length);
    };
    DollarsInputCleaner.prototype.removeExcessDecimalPointsLeftOf = function (position, string) {
        var numberOfDecimalPoints = string.split('.').length - 1;
        var result = string;
        for (var i = position; i >= 0 && numberOfDecimalPoints > 1; i -= 1) {
            if (result.charAt(i) === '.') {
                result = this.removeCharacterAt(i, result);
                numberOfDecimalPoints -= 1;
            }
        }
        return result;
    };
    DollarsInputCleaner.prototype.removeCharacterAt = function (index, string) {
        return string.substr(0, index) + string.substr(index + 1);
    };
    return DollarsInputCleaner;
}());

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LmZvcm0tYmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUFxSDtBQUNySCx3Q0FBMEc7QUFDMUcsOENBQXdEO0FBSXhEO0lBb0JFLG9CQUNVLEVBQWUsRUFDZixTQUFvQixFQUNwQixPQUFtQjtRQUZuQixPQUFFLEdBQUYsRUFBRSxDQUFhO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBcEJwQixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixrQkFBYSxHQUFZLEtBQUssQ0FBQztRQUMvQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUMvQixpQkFBWSxHQUFXLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEMsZUFBVSxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2hDLGFBQVEsR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUM5QixTQUFJLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDMUIsVUFBSyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQzNCLGdCQUFXLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDcEMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFDL0IsdUJBQWtCLEdBQVksS0FBSyxDQUFDO0lBUVYsQ0FBQztJQUVsQyxnQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQztZQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJ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R0FBRyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxxQkFBcUIsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ25FLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDN0IsTUFBTSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQzNDLHFCQUFxQixJQUFJLENBQUMsQ0FBQztZQUM3QixDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUVPLCtDQUFpQixHQUF6QixVQUEwQixLQUFhLEVBQUUsTUFBYztRQUNyRCxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQUNILDBCQUFDO0FBQUQsQ0FqRUEsQUFpRUMsSUFBQSIsImZpbGUiOiJhcHAvc2hhcmVkL21vZHVsZXMvd3otZm9ybS93ei5mb3JtLWJhc2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25DaGFuZ2VzLCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIEZvcm1CdWlsZGVyLCBBYnN0cmFjdENvbnRyb2wsIEZvcm1Hcm91cERpcmVjdGl2ZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFRleHRhcmVhQXV0b3NpemUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBGb3JtTW9kZWwgfSBmcm9tICcuL3d6LmZvcm0ubW9kZWwnO1xuaW1wb3J0IHsgRm9ybUZpZWxkcywgU2VydmVyRXJyb3JzIH0gZnJvbSAnLi4vLi4vLi4vc2hhcmVkL2ludGVyZmFjZXMvZm9ybXMuaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIFd6Rm9ybUJhc2UgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBGb3JtRmllbGRzW107XG4gIEBJbnB1dCgpIHNlcnZlckVycm9yczogU2VydmVyRXJyb3JzO1xuICBASW5wdXQoKSBzdWJtaXRMYWJlbDogc3RyaW5nID0gJ1N1Ym1pdCc7XG4gIEBJbnB1dCgpIGluY2x1ZGVDYW5jZWw6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgaW5jbHVkZVN1Ym1pdDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGNhbmNlbExhYmVsOiBzdHJpbmcgPSAnQ2FuY2VsJztcbiAgQElucHV0KCkgYXV0b2NvbXBsZXRlOiBzdHJpbmcgPSAnb24nO1xuICBAT3V0cHV0KCkgZm9ybVN1Ym1pdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGZvcm1DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBvbkFjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGJsdXIgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBrZXlVcCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBwdWJsaWMgc3VibWl0QXR0ZW1wdDogYm9vbGVhbiA9IGZhbHNlO1xuICBwdWJsaWMgc2hvd1JlcXVpcmVkTGVnZW5kOiBib29sZWFuID0gZmFsc2U7XG4gIHB1YmxpYyBmb3JtOiBGb3JtR3JvdXA7XG4gIEBWaWV3Q2hpbGQoTWF0VGV4dGFyZWFBdXRvc2l6ZSkgcHJpdmF0ZSBhdXRvc2l6ZTogTWF0VGV4dGFyZWFBdXRvc2l6ZTtcbiAgQFZpZXdDaGlsZChGb3JtR3JvdXBEaXJlY3RpdmUpIHByaXZhdGUgaW50ZXJuYWxGb3JtOiBGb3JtR3JvdXBEaXJlY3RpdmU7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBmb3JtTW9kZWw6IEZvcm1Nb2RlbCxcbiAgICBwcml2YXRlIGVsZW1lbnQ6IEVsZW1lbnRSZWYpIHsgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlcy5zZXJ2ZXJFcnJvcnMgJiYgdGhpcy5mb3JtKSB0aGlzLm1lcmdlRXJyb3JzKCk7XG4gICAgaWYgKGNoYW5nZXMuaXRlbXMgJiYgdGhpcy5mb3JtKSB0aGlzLm1lcmdlTmV3VmFsdWVzKCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmZvcm0gPSB0aGlzLmZiLmdyb3VwKHRoaXMuZm9ybU1vZGVsLmNyZWF0ZSh0aGlzLml0ZW1zKSk7XG4gIH1cblxuICBwdWJsaWMgbWVyZ2VFcnJvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvcnMuZmllbGRFcnJvcnMuZm9yRWFjaCgoZXJyb3IpID0+IHtcbiAgICAgIGZvciAobGV0IGNvbnRyb2wgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAgIGlmIChjb250cm9sLnRvTG93ZXJDYXNlKCkgPT09IGVycm9yLmZpZWxkLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAoPEZvcm1Db250cm9sPnRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sXSkuc2V0RXJyb3JzKHsgc2VydmVyRXJyb3I6IGVycm9yLmNvZGUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBtZXJnZU5ld1ZhbHVlcyhmb3JtRmllbGRzOiBBcnJheTxGb3JtRmllbGRzPiA9IHRoaXMuaXRlbXMpOiB2b2lkIHtcbiAgICBmb3JtRmllbGRzLmZvckVhY2goKGZpZWxkOiBhbnkpID0+IHtcbiAgICAgIGZvciAobGV0IGNvbnRyb2wgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAgIGlmIChjb250cm9sID09PSBmaWVsZC5uYW1lKSB7XG4gICAgICAgICAgKDxGb3JtQ29udHJvbD50aGlzLmZvcm0uY29udHJvbHNbY29udHJvbF0pLnBhdGNoVmFsdWUoZmllbGQudmFsdWUsIHsgZW1pdEV2ZW50OiBmYWxzZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHRoaXMuYXV0b3NpemUpIHRoaXMuYXV0b3NpemUucmVzaXplVG9GaXRDb250ZW50KCk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZGlzYWJsZUZvcm0oKTogdm9pZCB7XG4gICAgdGhpcy5pdGVtcy5mb3JFYWNoKChmaWVsZDogYW55KSA9PiB7XG4gICAgICBmb3IgKGxldCBjb250cm9sIGluIHRoaXMuZm9ybS5jb250cm9scykge1xuICAgICAgICBpZiAoY29udHJvbCA9PT0gZmllbGQubmFtZSkge1xuICAgICAgICAgICg8Rm9ybUNvbnRyb2w+dGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2xdKS5kaXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRWYWx1ZUZvckZpZWxkKGZpZWxkOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBmaWVsZFZhbHVlOiBzdHJpbmc7XG4gICAgZm9yIChsZXQgY29udHJvbCBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgIGlmIChjb250cm9sID09PSBmaWVsZCkge1xuICAgICAgICBmaWVsZFZhbHVlID0gKDxGb3JtQ29udHJvbD50aGlzLmZvcm0uY29udHJvbHNbY29udHJvbF0pLnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gKGZpZWxkVmFsdWUpID8gZmllbGRWYWx1ZSA6ICcnO1xuICB9XG5cbiAgcHVibGljIHNldFZhbHVlRm9yRmllbGQoZmllbGQ6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHZvaWQge1xuICAgICg8Rm9ybUNvbnRyb2w+dGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkXSkucGF0Y2hWYWx1ZSh2YWx1ZSwgeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICB9XG5cbiAgcHVibGljIGFjdGl2YXRlRm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLml0ZW1zLmZvckVhY2goKGZpZWxkOiBhbnkpID0+IHtcbiAgICAgIGZvciAobGV0IGNvbnRyb2wgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAgIGlmIChjb250cm9sID09PSBmaWVsZC5uYW1lKSB7XG4gICAgICAgICAgKDxGb3JtQ29udHJvbD50aGlzLmZvcm0uY29udHJvbHNbY29udHJvbF0pLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgbWFya0ZpZWxkc0FzRGlydHkoKTogdm9pZCB7XG4gICAgZm9yIChsZXQgY29udHJvbCBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgICg8Rm9ybUNvbnRyb2w+dGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2xdKS5tYXJrQXNEaXJ0eSgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXJrRmllbGRzQXNUb3VjaGVkKCk6IHZvaWQge1xuICAgIGZvciAobGV0IGNvbnRyb2wgaW4gdGhpcy5mb3JtLmNvbnRyb2xzKSB7XG4gICAgICAoPEZvcm1Db250cm9sPnRoaXMuZm9ybS5jb250cm9sc1tjb250cm9sXSkubWFya0FzVG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBwYXJzZU9wdGlvbnMob3B0aW9uczogYW55KTogYW55W10ge1xuICAgIHJldHVybiBvcHRpb25zLnNwbGl0KCcsJyk7XG4gIH1cblxuICBwdWJsaWMgb25TZWxlY3RDaGFuZ2UoZXZlbnQ6IGFueSwgZmllbGQ6IEZvcm1GaWVsZHMpOiB2b2lkIHtcbiAgICBpZiAoZmllbGQub3B0aW9ucyAmJiBmaWVsZC5zbGF2ZUZpZWxkTmFtZSAmJiBmaWVsZC5zbGF2ZUZpZWxkVmFsdWVzKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSBmaWVsZC5vcHRpb25zLnNwbGl0KCcsJykuaW5kZXhPZihldmVudC52YWx1ZSk7XG5cbiAgICAgIHRoaXMudXBkYXRlKGZpZWxkLnNsYXZlRmllbGROYW1lLCBmaWVsZC5zbGF2ZUZpZWxkVmFsdWVzW3NlbGVjdGVkSW5kZXhdKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmFkaW9TZWxlY3QoZmllbGROYW1lOiBzdHJpbmcsIG9wdGlvbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoZmllbGROYW1lLCBvcHRpb24pO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZURhdGVWYWx1ZUZvcihmaWVsZE5hbWU6IHN0cmluZywgZGF0ZVN0cmluZzogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoZmllbGROYW1lLCB0aGlzLmNhbGN1bGF0ZURhdGVGb3IoZGF0ZVN0cmluZykpO1xuICB9XG5cbiAgLyoqXG4gICAqIHNpbXBsZSBjaGVjayBpZiBhIGdpdmVuIGZpZWxkIGhhcyBhIHJlcXVpcmVkIHZhbGlkYXRpb24gcnVsZSBvciBub3RcbiAgICogQHBhcmFtIGZpZWxkIGlzIGEgZm9ybSBmaWVsZCBjb250cm9sLlxuICAgKi9cbiAgcHVibGljIGlzUmVxdWlyZWRGaWVsZChmaWVsZDogRm9ybUZpZWxkcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAndmFsaWRhdGlvbicgaW4gZmllbGQgJiYgKFxuICAgICAgZmllbGQudmFsaWRhdGlvbiA9PT0gJ1JFUVVJUkVEJyB8fFxuICAgICAgZmllbGQudmFsaWRhdGlvbiA9PT0gJ0VNQUlMJyB8fFxuICAgICAgZmllbGQudmFsaWRhdGlvbiA9PT0gJ01VTFRJRU1BSUwnIHx8XG4gICAgICBmaWVsZC52YWxpZGF0aW9uID09PSAnUEFTU1dPUkQnIHx8XG4gICAgICBmaWVsZC52YWxpZGF0aW9uID09PSAnVEVSTVMnIHx8XG4gICAgICBmaWVsZC52YWxpZGF0aW9uID09PSAnR1JFQVRFUl9USEFOJyB8fFxuICAgICAgZmllbGQudmFsaWRhdGlvbiA9PT0gJ0xFU1NfVEhBTicgfHxcbiAgICAgIGZpZWxkLnZhbGlkYXRpb24gPT09ICdCRVRXRUVOJyB8fFxuICAgICAgZmllbGQudmFsaWRhdGlvbiA9PT0gJ0NPTExFQ1RJT04nXG4gICAgKSA/IHRydWUgOiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBoYXNFcnJvclR5cGUoZmllbGQ6IEZvcm1Db250cm9sIHwgQWJzdHJhY3RDb250cm9sKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghZmllbGQudmFsaWQgJiYgZmllbGQucHJpc3RpbmUgJiYgdGhpcy5zdWJtaXRBdHRlbXB0KSB8fFxuICAgICAgKCFmaWVsZC52YWxpZCAmJiAhZmllbGQucHJpc3RpbmUgJiYgdGhpcy5zdWJtaXRBdHRlbXB0KSB8fFxuICAgICAgKCFmaWVsZC52YWxpZCAmJiAhZmllbGQucHJpc3RpbmUgJiYgIXRoaXMuc3VibWl0QXR0ZW1wdCk7XG4gIH1cblxuICAvKipcbiAgICogYm9vbGVhbiBmbGFnIHVzZWQgaW4gdGhlIHVpIHRvIGRyYXcgJyppbmRpY2F0ZXMgcmVxdWlyZWQgZmllbGQnXG4gICAqIHdlIGZpbHRlciB0aHJvdWdoIHRoZSBmb3JtIGZpZWxkcyBjaGVja2luZyB2YWxpZGF0aW9uLiBJdCdzIHRydWUgd2hlbiBhdCBsZWFzdCAxIGZpZWxkIGlzIHJlcXVpcmVkXG4gICAqIEBwYXJhbSBmb3JtRmllbGRzIGlzIGFuIGFycmF5IG9mIGZvcm0gZmllbGRzLlxuICAgKi9cbiAgcHVibGljIGhhc1JlcXVpcmVkRmllbGRzKGZvcm1GaWVsZHM6IEZvcm1GaWVsZHNbXSk6IGJvb2xlYW4ge1xuICAgIGxldCByZXEgPSBmb3JtRmllbGRzLmZpbHRlcih0aGlzLmlzUmVxdWlyZWRGaWVsZCk7XG4gICAgcmV0dXJuIHJlcS5sZW5ndGggPiAwID8gdHJ1ZSA6IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIG9uU3VibWl0KCk6IHZvaWQge1xuICAgIHRoaXMuc3VibWl0QXR0ZW1wdCA9IHRydWU7XG4gICAgdGhpcy5tYXJrRmllbGRzQXNEaXJ0eSgpO1xuICAgIGlmICh0aGlzLmZvcm0udmFsaWQpIHtcbiAgICAgIHRoaXMuZm9ybVN1Ym1pdC5lbWl0KHRoaXMuZm9ybS52YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHJlc2V0Rm9ybSgpOiB2b2lkIHtcbiAgICB0aGlzLmludGVybmFsRm9ybS5yZXNldEZvcm0oKTtcbiAgICBpZiAodGhpcy5hdXRvc2l6ZSkgdGhpcy5hdXRvc2l6ZS5yZXNpemVUb0ZpdENvbnRlbnQoKTtcbiAgICB0aGlzLnN1Ym1pdEF0dGVtcHQgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBvbkRvbGxhcnNJbnB1dChldmVudDogYW55KTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0OiBhbnkgPSBldmVudC50YXJnZXQ7XG4gICAgY29uc3QgY2xlYW5lcjogRG9sbGFyc0lucHV0Q2xlYW5lciA9IG5ldyBEb2xsYXJzSW5wdXRDbGVhbmVyKHRhcmdldC52YWx1ZSwgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0KTtcblxuICAgIGNsZWFuZXIuY2xlYW4oKTtcbiAgICB0YXJnZXQudmFsdWUgPSBjbGVhbmVyLmlucHV0VmFsdWU7XG4gICAgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID0gdGFyZ2V0LnNlbGVjdGlvbkVuZCA9IGNsZWFuZXIuY3Vyc29yUG9zaXRpb247XG4gIH1cblxuICBwdWJsaWMgY2FsY3VsYXRlRGF0ZUZvcihkYXRlU3BlYzogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoIWRhdGVTcGVjKSByZXR1cm4gbnVsbDtcblxuICAgIGNvbnN0IHVwcGVyRGF0ZVNwZWMgPSBkYXRlU3BlYy50b1VwcGVyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJycpO1xuXG4gICAgaWYgKHVwcGVyRGF0ZVNwZWMgPT09ICdUT0RBWScpIHJldHVybiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCk7XG5cbiAgICBpZiAodXBwZXJEYXRlU3BlYy5tYXRjaCgvXlRPREFZWystXVswLTldKyQvKSkge1xuICAgICAgY29uc3QgbnVtYmVyT2ZEYXlzVG9BZGQ6IG51bWJlciA9IHBhcnNlSW50KHVwcGVyRGF0ZVNwZWMucmVwbGFjZSgnVE9EQVknLCAnJykpO1xuICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICBkYXRlLnNldERhdGUoZGF0ZS5nZXREYXRlKCkgKyBudW1iZXJPZkRheXNUb0FkZCk7XG5cbiAgICAgIHJldHVybiBkYXRlLnRvSVNPU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgbGV0IGRhdGU6IERhdGU7XG5cbiAgICB0cnkge1xuICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGVTcGVjKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBDb3VsZCBub3QgcGFyc2UgZGF0ZSBzcGVjaWZpY2F0aW9uICcke2RhdGVTcGVjfSdgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dSZXF1aXJlZEVycm9yKGZpZWxkOiBGb3JtRmllbGRzKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY29udHJvbDogQWJzdHJhY3RDb250cm9sID0gdGhpcy5mb3JtLmNvbnRyb2xzW2ZpZWxkLm5hbWVdO1xuICAgIHJldHVybiBjb250cm9sLmhhc0Vycm9yKCdyZXF1aXJlZCcpIHx8IChjb250cm9sLmVycm9ycy5wYXR0ZXJuICYmIGNvbnRyb2wuZXJyb3JzLnBhdHRlcm4ucmVxdWlyZWRQYXR0ZXJuID09PSBTdHJpbmcoL1xcUy8pKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG91bGRTaG93RW1haWxFcnJvcihmaWVsZDogRm9ybUZpZWxkcyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmZvcm0uY29udHJvbHNbZmllbGQubmFtZV0uaGFzRXJyb3IoJ3BhdHRlcm4nKSAmJiBmaWVsZC52YWxpZGF0aW9uID09PSAnRU1BSUwnO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dMZXNzVGhhbkVycm9yKGZpZWxkOiBGb3JtRmllbGRzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5uYW1lXS5oYXNFcnJvcigndG9vSGlnaCcpO1xuICB9XG5cbiAgcHVibGljIHNob3VsZFNob3dHcmVhdGVyVGhhbkVycm9yKGZpZWxkOiBGb3JtRmllbGRzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybS5jb250cm9sc1tmaWVsZC5uYW1lXS5oYXNFcnJvcigndG9vTG93Jyk7XG4gIH1cblxuICBwdWJsaWMgb25CbHVyKCk6IHZvaWQge1xuICAgIHRoaXMuYmx1ci5lbWl0KHRoaXMuZm9ybS52YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgb25LZXlVcCgpOiB2b2lkIHtcbiAgICB0aGlzLmtleVVwLmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBvbkNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQodGhpcy5mb3JtLnZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBzaG93RGVmYXVsdElucHV0Rm9yKGZpZWxkOiBGb3JtRmllbGRzKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIFsndGV4dCcsICdwYXNzd29yZCcsICdlbWFpbCcsICdkYXRlJ10uaW5jbHVkZXMoZmllbGQudHlwZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dTdWJtaXRBbmRDYW5jZWwoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5jbHVkZUNhbmNlbCAmJiB0aGlzLmluY2x1ZGVTdWJtaXQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IHNob3dTdWJtaXQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaW5jbHVkZVN1Ym1pdCAmJiAhdGhpcy5pbmNsdWRlQ2FuY2VsO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZVZhbGlkYXRvcnNGb3IoZmllbGQ6IEZvcm1GaWVsZHMpOiB2b2lkIHtcbiAgICBjb25zdCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wgPSB0aGlzLmNvbnRyb2xGcm9tKGZpZWxkKTtcblxuICAgIHRoaXMuZm9ybU1vZGVsLnVwZGF0ZVZhbGlkYXRvcnNGb3IoY29udHJvbCwgZmllbGQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb250cm9sRnJvbShmaWVsZDogRm9ybUZpZWxkcyk6IEFic3RyYWN0Q29udHJvbCB7XG4gICAgbGV0IGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbDtcbiAgICBmb3IgKGxldCBjb250cm9sTmFtZSBpbiB0aGlzLmZvcm0uY29udHJvbHMpIHtcbiAgICAgIGlmIChjb250cm9sTmFtZSA9PT0gZmllbGQubmFtZSkge1xuICAgICAgICBjb250cm9sID0gdGhpcy5mb3JtLmNvbnRyb2xzW2NvbnRyb2xOYW1lXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgcHJpdmF0ZSBkYXRlVG9TdHJpbmcoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKS5zbGljZSgwLCAxMCkucmVwbGFjZSgvLS9nLCAnLycpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoZmllbGROYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpIHtcbiAgICAoPEZvcm1Db250cm9sPnRoaXMuZm9ybS5jb250cm9sc1tmaWVsZE5hbWVdKS5zZXRWYWx1ZSh2YWx1ZSk7XG4gIH1cbn1cblxuLy8gVXNlZCBpbnRlcm5hbGx5IG9ubHkuXG5jbGFzcyBEb2xsYXJzSW5wdXRDbGVhbmVyIHtcbiAgY29uc3RydWN0b3IocHVibGljIGlucHV0VmFsdWU6IHN0cmluZywgcHVibGljIGN1cnNvclBvc2l0aW9uOiBudW1iZXIpIHsgfVxuXG4gIHB1YmxpYyBjbGVhbigpOiB2b2lkIHtcbiAgICB0aGlzLnJlbW92ZU5vbkRvbGxhckNoYXJhY3RlcnMoKTtcbiAgICB0aGlzLnJlbW92ZUxlYWRpbmdaZXJvcygpO1xuICAgIHRoaXMucmVtb3ZlRXhjZXNzRGVjaW1hbFBvaW50cygpO1xuICAgIHRoaXMucmVtb3ZlRXhjZXNzUG9zdERlY2ltYWxEaWdpdHMoKTtcbiAgfVxuXG4gIC8vLy8gTWFpbiBjbGVhbmVyIG1ldGhvZHNcblxuICBwcml2YXRlIHJlbW92ZU5vbkRvbGxhckNoYXJhY3RlcnMoKTogdm9pZCB7XG4gICAgdGhpcy5tb2RpZnlJbnB1dFZhbHVlV2l0aChzdHJpbmcgPT4gc3RyaW5nLnJlcGxhY2UoL1teXFxkXFwuXS9nLCAnJykpO1xuICB9XG5cbiAgcHJpdmF0ZSByZW1vdmVMZWFkaW5nWmVyb3MoKTogdm9pZCB7XG4gICAgdGhpcy5tb2RpZnlJbnB1dFZhbHVlV2l0aChzdHJpbmcgPT4gc3RyaW5nLnJlcGxhY2UoL14wKihcXGQuKikvLCAnJDEnKSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUV4Y2Vzc0RlY2ltYWxQb2ludHMoKTogdm9pZCB7XG4gICAgLy8gUmVtb3ZlIGFsbCBkZWNpbWFsIHBvaW50cyBsZWZ0IG9mIHRoZSBjdXJzb3JQb3NpdGlvbiB1bnRpbCB3ZSBoaXQgdGhlIGxlZnQgZWRnZSBvclxuICAgIC8vIHdlIGFyZSBkb3duIHRvIG9uZSBkZWNpbWFsIHBvaW50LCB3aGljaGV2ZXIgY29tZXMgZmlyc3QuICBUaGlzIGxldHMgdXMgcmVtb3ZlIGEgbmV3bHlcbiAgICAvLyBpbnNlcnRlZCBzZWNvbmQgZGVjaW1hbCBwb2ludCBpZiBhbm90aGVyIG9uZSBhbHJlYWR5IGV4aXN0ZWQgc29tZXdoZXJlIHRvIHRoZSByaWdodCBvZlxuICAgIC8vIHRoZSBjdXJzb3IuICBJZiB3ZSBqdXN0IGFsd2F5cyBrZXB0IHRoZSBsZWZ0bW9zdCBkZWNpbWFsIHBvaW50LCB0aGVuIHdlIG1pZ2h0IFwibW92ZVwiIHRoZVxuICAgIC8vIG9yaWdpbmFsIGRlY2ltYWwgcG9pbnQsIHdoaWNoIGlzIGNvbmZ1c2luZyBmb3IgdGhlIHVzZXIuXG4gICAgdGhpcy5tb2RpZnlJbnB1dFZhbHVlV2l0aChzdHJpbmcgPT4gdGhpcy5yZW1vdmVFeGNlc3NEZWNpbWFsUG9pbnRzTGVmdE9mKHRoaXMuY3Vyc29yUG9zaXRpb24sIHN0cmluZykpO1xuXG4gICAgLy8gSWYgdGhlcmUgYXJlIHN0aWxsIHR3byBvciBtb3JlIGRlY2ltYWwgcG9pbnRzLCB0aGVuIHRoZXkgYXJlIHRvIHRoZSByaWdodCBvZiB0aGUgY3Vyc29yUG9zaXRpb24uXG4gICAgLy8gVGhlcmUgZG9lc24ndCBzZWVtIHRvIGJlIGEgd2F5IHRoYXQgY291bGQgaGFwcGVuIGluIHJlYWwgbGlmZSB3aXRoIGEgdGV4dCBpbnB1dCwgYnV0IHdlJ2xsIGNvdmVyXG4gICAgLy8gdGhlIGVkZ2UgY2FzZSAoanVzdCBpbiBjYXNlKSBieSBkZWxldGluZyBleGNlc3MgZGVjaW1hbCBwb2ludHMgc3RhcnRpbmcgZnJvbSB0aGUgcmlnaHQgZWRnZSBvZiB0aGUgc3RyaW5nLlxuICAgIHRoaXMubW9kaWZ5SW5wdXRWYWx1ZVdpdGgoc3RyaW5nID0+IHRoaXMucmVtb3ZlRXhjZXNzRGVjaW1hbFBvaW50c0xlZnRPZihzdHJpbmcubGVuZ3RoLCBzdHJpbmcpLCBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUV4Y2Vzc1Bvc3REZWNpbWFsRGlnaXRzKCk6IHZvaWQge1xuICAgIHRoaXMubW9kaWZ5SW5wdXRWYWx1ZVdpdGgoc3RyaW5nID0+IHN0cmluZy5yZXBsYWNlKC9eKC4qXFwuXFxkXFxkKS4qJC8sICckMScpLCBmYWxzZSk7XG4gICAgdGhpcy5jdXJzb3JQb3NpdGlvbiA9IE1hdGgubWluKHRoaXMuY3Vyc29yUG9zaXRpb24sIHRoaXMuaW5wdXRWYWx1ZS5sZW5ndGgpO1xuICB9XG5cbiAgLy8vLyBVdGlsaXR5IG1ldGhvZHNcblxuICBwcml2YXRlIG1vZGlmeUlucHV0VmFsdWVXaXRoKHB1cmVNb2RpZmllcjogKChzdHJpbmc6IHN0cmluZykgPT4gc3RyaW5nKSwgcmVjYWxjdWxhdGVDdXJzb3JQb3NpdGlvbjogYm9vbGVhbiA9IHRydWUpOiB2b2lkIHtcbiAgICBjb25zdCBsZW5ndGhCZWZvcmVNb2RpZmljYXRpb246IG51bWJlciA9IHRoaXMuaW5wdXRWYWx1ZS5sZW5ndGg7XG5cbiAgICB0aGlzLmlucHV0VmFsdWUgPSBwdXJlTW9kaWZpZXIodGhpcy5pbnB1dFZhbHVlKTtcbiAgICBpZiAocmVjYWxjdWxhdGVDdXJzb3JQb3NpdGlvbikgdGhpcy5jdXJzb3JQb3NpdGlvbiAtPSAobGVuZ3RoQmVmb3JlTW9kaWZpY2F0aW9uIC0gdGhpcy5pbnB1dFZhbHVlLmxlbmd0aCk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUV4Y2Vzc0RlY2ltYWxQb2ludHNMZWZ0T2YocG9zaXRpb246IG51bWJlciwgc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGxldCBudW1iZXJPZkRlY2ltYWxQb2ludHM6IG51bWJlciA9IHN0cmluZy5zcGxpdCgnLicpLmxlbmd0aCAtIDE7XG4gICAgbGV0IHJlc3VsdDogc3RyaW5nID0gc3RyaW5nO1xuXG4gICAgZm9yIChsZXQgaSA9IHBvc2l0aW9uOyBpID49IDAgJiYgbnVtYmVyT2ZEZWNpbWFsUG9pbnRzID4gMTsgaSAtPSAxKSB7XG4gICAgICBpZiAocmVzdWx0LmNoYXJBdChpKSA9PT0gJy4nKSB7XG4gICAgICAgIHJlc3VsdCA9IHRoaXMucmVtb3ZlQ2hhcmFjdGVyQXQoaSwgcmVzdWx0KTtcbiAgICAgICAgbnVtYmVyT2ZEZWNpbWFsUG9pbnRzIC09IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgcmVtb3ZlQ2hhcmFjdGVyQXQoaW5kZXg6IG51bWJlciwgc3RyaW5nOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyKDAsIGluZGV4KSArIHN0cmluZy5zdWJzdHIoaW5kZXggKyAxKTtcbiAgfVxufVxuIl19
