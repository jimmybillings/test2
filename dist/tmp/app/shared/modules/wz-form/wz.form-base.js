"use strict";
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
    WzFormBase.propDecorators = {
        'items': [{ type: core_1.Input },],
        'serverErrors': [{ type: core_1.Input },],
        'submitLabel': [{ type: core_1.Input },],
        'includeCancel': [{ type: core_1.Input },],
        'includeSubmit': [{ type: core_1.Input },],
        'cancelLabel': [{ type: core_1.Input },],
        'autocomplete': [{ type: core_1.Input },],
        'formSubmit': [{ type: core_1.Output },],
        'formCancel': [{ type: core_1.Output },],
        'onAction': [{ type: core_1.Output },],
        'blur': [{ type: core_1.Output },],
        'keyUp': [{ type: core_1.Output },],
        'valueChange': [{ type: core_1.Output },],
        'autosize': [{ type: core_1.ViewChild, args: [material_1.MatTextareaAutosize,] },],
        'internalForm': [{ type: core_1.ViewChild, args: [forms_1.FormGroupDirective,] },],
    };
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
//# sourceMappingURL=wz.form-base.js.map