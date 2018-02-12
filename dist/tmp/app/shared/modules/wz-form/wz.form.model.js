"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FormModel = (function () {
    function FormModel() {
    }
    FormModel.prototype.create = function (form) {
        var _this = this;
        var newForm = {};
        form.forEach(function (field) {
            if (field.type === 'wzdate') {
                newForm[field.name] = [field.value || _this.calculateDateFor(field.default)];
            }
            else {
                newForm[field.name] = [field.value];
            }
            newForm[field.name].push(_this._getValidator(field));
        });
        return newForm;
    };
    FormModel.prototype.updateForm = function (form, values) {
        for (var controlName in form.controls) {
            if (values.hasOwnProperty(controlName))
                form.controls[controlName].setValue(values[controlName]);
            form.controls[controlName].setValue('');
        }
    };
    FormModel.prototype.markFormAsUntouched = function (form) {
        form.markAsUntouched();
        form.markAsPristine();
        for (var controlName in form.controls) {
            form.controls[controlName].markAsUntouched();
            form.controls[controlName].markAsPristine();
        }
    };
    FormModel.prototype.updateValidatorsFor = function (control, field) {
        control.clearValidators();
        control.setValidators(this._getValidator(field));
    };
    FormModel.prototype._getValidator = function (field) {
        switch (field.validation) {
            case 'REQUIRED':
                return this._getRequiredValidator();
            case 'EMAIL':
                return this._getEmailValidator();
            case 'PASSWORD':
                return this._getPasswordValidator();
            case 'COLLECTION':
                return this._getCollectionValidator();
            case 'MULTIEMAIL':
                return this._getMultiEmailValidator();
            case 'TERMS':
                return this._getTermsValidator();
            case 'GREATER_THAN':
                return this._getGreaterThanValidator(field.min);
            case 'LESS_THAN':
                return this._getLessThanValidator(field.max);
            case 'BETWEEN':
                return this._getBetweenValidator(field.min, field.max);
            case 'MIN_LENGTH':
                return this._getMinLengthValidator(field.min);
            case 'MAX_LENGTH':
                return this._getMaxLengthValidator(field.max);
            default:
                return this._getOptionalValidator;
        }
    };
    FormModel.prototype._getOptionalValidator = function () {
        return forms_1.Validators.nullValidator;
    };
    FormModel.prototype._getRequiredValidator = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.pattern(/\S/)
        ]);
    };
    FormModel.prototype._getEmailValidator = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.minLength(5),
            forms_1.Validators.pattern('[a-zA-Z0-9!#$%&`*+\/=?^_`{|}~.-]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?' +
                '(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9]){1,}?)*')
        ]);
    };
    FormModel.prototype._getMultiEmailValidator = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.pattern('\\s*(([a-z0-9!#$%&`*+\/=?^_`{|}~.-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)' +
                '|(([a-zA-Z0-9\\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)(\\s*(;|,)\\s*|\\s*$))*')
        ]);
    };
    FormModel.prototype._getPasswordValidator = function () {
        return forms_1.Validators.compose([
            forms_1.Validators.required,
            forms_1.Validators.minLength(8)
        ]);
    };
    FormModel.prototype._getCollectionValidator = function () {
        return forms_1.Validators.compose([forms_1.Validators.required]);
    };
    FormModel.prototype._getTermsValidator = function () {
        return this.checkboxRequired;
    };
    FormModel.prototype._getGreaterThanValidator = function (testValue) {
        return function (control) { return (parseFloat(control.value) < parseFloat(testValue)) ? { tooLow: 'number too low' } : null; };
    };
    FormModel.prototype._getLessThanValidator = function (testValue) {
        return forms_1.Validators.compose([
            function (control) { return (parseFloat(control.value) > parseFloat(testValue)) ? { tooHigh: 'number too high' } : null; },
            forms_1.Validators.required
        ]);
    };
    FormModel.prototype._getBetweenValidator = function (min, max) {
        return forms_1.Validators.compose([
            this._getGreaterThanValidator(min),
            this._getLessThanValidator(max)
        ]);
    };
    FormModel.prototype._getMinLengthValidator = function (length) {
        return forms_1.Validators.minLength(parseInt(length));
    };
    FormModel.prototype._getMaxLengthValidator = function (length) {
        return forms_1.Validators.maxLength(parseInt(length));
    };
    FormModel.prototype.checkboxRequired = function (control) {
        return function (control) { return control.value ? null : { mustBeCheckedError: 'Must be Checked' }; };
    };
    FormModel.prototype.calculateDateFor = function (dateSpec) {
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
    FormModel.decorators = [
        { type: core_1.Injectable },
    ];
    FormModel.ctorParameters = function () { return []; };
    return FormModel;
}());
exports.FormModel = FormModel;
//# sourceMappingURL=wz.form.model.js.map