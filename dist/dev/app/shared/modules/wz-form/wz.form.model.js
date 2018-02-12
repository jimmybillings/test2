"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
    FormModel = __decorate([
        core_1.Injectable()
    ], FormModel);
    return FormModel;
}());
exports.FormModel = FormModel;

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9zaGFyZWQvbW9kdWxlcy93ei1mb3JtL3d6LmZvcm0ubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msd0NBQXFGO0FBUXJGO0lBQUE7SUFxS0EsQ0FBQztJQW5LQywwQkFBTSxHQUFOLFVBQU8sSUFBa0I7UUFBekIsaUJBV0M7UUFWQyxJQUFJLE9BQU8sR0FBUSxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQWlCO1lBQzdCLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUIsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzlFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFTSw4QkFBVSxHQUFqQixVQUFrQixJQUFlLEVBQUUsTUFBVztRQUM1QyxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBRSxDQUFDLFFB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QUFhLEtBQUssT0FBTyxDQUFDO1lBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFFL0QsRUFBRSxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFNLGlCQUFpQixHQUFXLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQy9FLElBQU0sTUFBSSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7WUFDOUIsTUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsaUJBQWlCLENBQUMsQ0FBQztZQUVqRCxNQUFNLENBQUMsTUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFFRCxJQUFJLElBQVUsQ0FBQztRQUVmLElBQUksQ0FBQztZQUNILElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMseUNBQXVDLFFBQVEsTUFBRyxDQUFDLENBQUM7UUFDdEUsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQXBLVSxTQUFTO1FBRHJCLGlCQUFVLEVBQUU7T0FDQSxTQUFTLENBcUtyQjtJQUFELGdCQUFDO0NBcktELEFBcUtDLElBQUE7QUFyS1ksOEJBQVMiLCJmaWxlIjoiYXBwL3NoYXJlZC9tb2R1bGVzL3d6LWZvcm0vd3ouZm9ybS5tb2RlbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1Hcm91cCwgRm9ybUNvbnRyb2wsIFZhbGlkYXRvcnMsIEFic3RyYWN0Q29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvcm1GaWVsZHMgfSBmcm9tICcuLi8uLi9pbnRlcmZhY2VzL2Zvcm1zLmludGVyZmFjZSc7XG5pbXBvcnQgeyBWYWxpZGF0b3JGbiwgVmFsaWRhdGlvbkVycm9ycyB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL3ZhbGlkYXRvcnMnO1xuXG4vKipcbiAqIFNlcnZpY2UgdGhhdCBjcmVhdGVzIGEgZHluYW1pYyBtb2RlbCB0byBkcml2ZSBhIGZvcm0uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGb3JtTW9kZWwge1xuXG4gIGNyZWF0ZShmb3JtOiBGb3JtRmllbGRzW10pOiBGb3JtR3JvdXAge1xuICAgIGxldCBuZXdGb3JtOiBhbnkgPSB7fTtcbiAgICBmb3JtLmZvckVhY2goKGZpZWxkOiBGb3JtRmllbGRzKSA9PiB7XG4gICAgICBpZiAoZmllbGQudHlwZSA9PT0gJ3d6ZGF0ZScpIHtcbiAgICAgICAgbmV3Rm9ybVtmaWVsZC5uYW1lXSA9IFtmaWVsZC52YWx1ZSB8fCB0aGlzLmNhbGN1bGF0ZURhdGVGb3IoZmllbGQuZGVmYXVsdCldO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3Rm9ybVtmaWVsZC5uYW1lXSA9IFtmaWVsZC52YWx1ZV07XG4gICAgICB9XG4gICAgICBuZXdGb3JtW2ZpZWxkLm5hbWVdLnB1c2godGhpcy5fZ2V0VmFsaWRhdG9yKGZpZWxkKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIG5ld0Zvcm07XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlRm9ybShmb3JtOiBGb3JtR3JvdXAsIHZhbHVlczogYW55KTogdm9pZCB7XG4gICAgZm9yIChsZXQgY29udHJvbE5hbWUgaW4gZm9ybS5jb250cm9scykge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShjb250cm9sTmFtZSkpXG4gICAgICAgICg8Rm9ybUNvbnRyb2w+Zm9ybS5jb250cm9sc1tjb250cm9sTmFtZV0pLnNldFZhbHVlKHZhbHVlc1tjb250cm9sTmFtZV0pO1xuICAgICAgKDxGb3JtQ29udHJvbD5mb3JtLmNvbnRyb2xzW2NvbnRyb2xOYW1lXSkuc2V0VmFsdWUoJycpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtYXJrRm9ybUFzVW50b3VjaGVkKGZvcm06IEZvcm1Hcm91cCk6IHZvaWQge1xuICAgIGZvcm0ubWFya0FzVW50b3VjaGVkKCk7XG4gICAgZm9ybS5tYXJrQXNQcmlzdGluZSgpO1xuICAgIGZvciAodmFyIGNvbnRyb2xOYW1lIGluIGZvcm0uY29udHJvbHMpIHtcbiAgICAgICg8Rm9ybUNvbnRyb2w+Zm9ybS5jb250cm9sc1tjb250cm9sTmFtZV0pLm1hcmtBc1VudG91Y2hlZCgpO1xuICAgICAgKDxGb3JtQ29udHJvbD5mb3JtLmNvbnRyb2xzW2NvbnRyb2xOYW1lXSkubWFya0FzUHJpc3RpbmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlVmFsaWRhdG9yc0Zvcihjb250cm9sOiBBYnN0cmFjdENvbnRyb2wsIGZpZWxkOiBGb3JtRmllbGRzKTogdm9pZCB7XG4gICAgY29udHJvbC5jbGVhclZhbGlkYXRvcnMoKTtcbiAgICBjb250cm9sLnNldFZhbGlkYXRvcnModGhpcy5fZ2V0VmFsaWRhdG9yKGZpZWxkKSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRWYWxpZGF0b3IoZmllbGQ6IEZvcm1GaWVsZHMpOiBWYWxpZGF0b3JGbiB7XG4gICAgc3dpdGNoIChmaWVsZC52YWxpZGF0aW9uKSB7XG4gICAgICBjYXNlICdSRVFVSVJFRCc6XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRSZXF1aXJlZFZhbGlkYXRvcigpO1xuICAgICAgY2FzZSAnRU1BSUwnOlxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0RW1haWxWYWxpZGF0b3IoKTtcbiAgICAgIGNhc2UgJ1BBU1NXT1JEJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldFBhc3N3b3JkVmFsaWRhdG9yKCk7XG4gICAgICBjYXNlICdDT0xMRUNUSU9OJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldENvbGxlY3Rpb25WYWxpZGF0b3IoKTtcbiAgICAgIGNhc2UgJ01VTFRJRU1BSUwnOlxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TXVsdGlFbWFpbFZhbGlkYXRvcigpO1xuICAgICAgY2FzZSAnVEVSTVMnOlxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0VGVybXNWYWxpZGF0b3IoKTtcbiAgICAgIGNhc2UgJ0dSRUFURVJfVEhBTic6XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRHcmVhdGVyVGhhblZhbGlkYXRvcihmaWVsZC5taW4pO1xuICAgICAgY2FzZSAnTEVTU19USEFOJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldExlc3NUaGFuVmFsaWRhdG9yKGZpZWxkLm1heCk7XG4gICAgICBjYXNlICdCRVRXRUVOJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuX2dldEJldHdlZW5WYWxpZGF0b3IoZmllbGQubWluLCBmaWVsZC5tYXgpO1xuICAgICAgY2FzZSAnTUlOX0xFTkdUSCc6XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRNaW5MZW5ndGhWYWxpZGF0b3IoZmllbGQubWluKTtcbiAgICAgIGNhc2UgJ01BWF9MRU5HVEgnOlxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0TWF4TGVuZ3RoVmFsaWRhdG9yKGZpZWxkLm1heCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0T3B0aW9uYWxWYWxpZGF0b3I7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0T3B0aW9uYWxWYWxpZGF0b3IoKTogVmFsaWRhdGlvbkVycm9ycyB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMubnVsbFZhbGlkYXRvcjtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFJlcXVpcmVkVmFsaWRhdG9yKCk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oL1xcUy8pXG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRFbWFpbFZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICBWYWxpZGF0b3JzLnJlcXVpcmVkLFxuICAgICAgVmFsaWRhdG9ycy5taW5MZW5ndGgoNSksXG4gICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oJ1thLXpBLVowLTkhIyQlJmAqK1xcLz0/Xl9ge3x9fi4tXStAW2EtekEtWjAtOV0oW2EtekEtWjAtOS1dKlthLXpBLVowLTldKT8nICtcbiAgICAgICAgJyhcXC5bYS16QS1aMC05XShbYS16QS1aMC05LV0qW2EtekEtWjAtOV0pezEsfT8pKicpXG4gICAgXSk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRNdWx0aUVtYWlsVmFsaWRhdG9yKCk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICBWYWxpZGF0b3JzLnBhdHRlcm4oXG4gICAgICAgICdcXFxccyooKFthLXowLTkhIyQlJmAqK1xcLz0/Xl9ge3x9fi4tXSspQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuKScgK1xuICAgICAgICAnfCgoW2EtekEtWjAtOVxcXFwtXStcXC4pKykpKFthLXpBLVpdezIsNH18WzAtOV17MSwzfSkoXFxcXF0/KShcXFxccyooO3wsKVxcXFxzKnxcXFxccyokKSkqJylcbiAgICBdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFBhc3N3b3JkVmFsaWRhdG9yKCk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5jb21wb3NlKFtcbiAgICAgIFZhbGlkYXRvcnMucmVxdWlyZWQsXG4gICAgICBWYWxpZGF0b3JzLm1pbkxlbmd0aCg4KVxuICAgIF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q29sbGVjdGlvblZhbGlkYXRvcigpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZShbVmFsaWRhdG9ycy5yZXF1aXJlZF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0VGVybXNWYWxpZGF0b3IoKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiB0aGlzLmNoZWNrYm94UmVxdWlyZWQ7XG4gIH1cblxuICBwcml2YXRlIF9nZXRHcmVhdGVyVGhhblZhbGlkYXRvcih0ZXN0VmFsdWU6IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gKGNvbnRyb2w6IEZvcm1Db250cm9sKSA9PiAocGFyc2VGbG9hdChjb250cm9sLnZhbHVlKSA8IHBhcnNlRmxvYXQodGVzdFZhbHVlKSkgPyB7IHRvb0xvdzogJ251bWJlciB0b28gbG93JyB9IDogbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldExlc3NUaGFuVmFsaWRhdG9yKHRlc3RWYWx1ZTogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLmNvbXBvc2UoW1xuICAgICAgKGNvbnRyb2w6IEZvcm1Db250cm9sKSA9PiAocGFyc2VGbG9hdChjb250cm9sLnZhbHVlKSA+IHBhcnNlRmxvYXQodGVzdFZhbHVlKSkgPyB7IHRvb0hpZ2g6ICdudW1iZXIgdG9vIGhpZ2gnIH0gOiBudWxsLFxuICAgICAgVmFsaWRhdG9ycy5yZXF1aXJlZFxuICAgIF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0QmV0d2VlblZhbGlkYXRvcihtaW46IHN0cmluZywgbWF4OiBzdHJpbmcpOiBWYWxpZGF0b3JGbiB7XG4gICAgcmV0dXJuIFZhbGlkYXRvcnMuY29tcG9zZShbXG4gICAgICB0aGlzLl9nZXRHcmVhdGVyVGhhblZhbGlkYXRvcihtaW4pLFxuICAgICAgdGhpcy5fZ2V0TGVzc1RoYW5WYWxpZGF0b3IobWF4KVxuICAgIF0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0TWluTGVuZ3RoVmFsaWRhdG9yKGxlbmd0aDogc3RyaW5nKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiBWYWxpZGF0b3JzLm1pbkxlbmd0aChwYXJzZUludChsZW5ndGgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldE1heExlbmd0aFZhbGlkYXRvcihsZW5ndGg6IHN0cmluZyk6IFZhbGlkYXRvckZuIHtcbiAgICByZXR1cm4gVmFsaWRhdG9ycy5tYXhMZW5ndGgocGFyc2VJbnQobGVuZ3RoKSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrYm94UmVxdWlyZWQoY29udHJvbDogRm9ybUdyb3VwKTogVmFsaWRhdG9yRm4ge1xuICAgIHJldHVybiAoY29udHJvbDogRm9ybUNvbnRyb2wpID0+IGNvbnRyb2wudmFsdWUgPyBudWxsIDogeyBtdXN0QmVDaGVja2VkRXJyb3I6ICdNdXN0IGJlIENoZWNrZWQnIH07XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZURhdGVGb3IoZGF0ZVNwZWM6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFkYXRlU3BlYykgcmV0dXJuIG51bGw7XG5cbiAgICBjb25zdCB1cHBlckRhdGVTcGVjID0gZGF0ZVNwZWMudG9VcHBlckNhc2UoKS5yZXBsYWNlKC8gL2csICcnKTtcblxuICAgIGlmICh1cHBlckRhdGVTcGVjID09PSAnVE9EQVknKSByZXR1cm4gbmV3IERhdGUoKS50b0lTT1N0cmluZygpO1xuXG4gICAgaWYgKHVwcGVyRGF0ZVNwZWMubWF0Y2goL15UT0RBWVsrLV1bMC05XSskLykpIHtcbiAgICAgIGNvbnN0IG51bWJlck9mRGF5c1RvQWRkOiBudW1iZXIgPSBwYXJzZUludCh1cHBlckRhdGVTcGVjLnJlcGxhY2UoJ1RPREFZJywgJycpKTtcbiAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgbnVtYmVyT2ZEYXlzVG9BZGQpO1xuXG4gICAgICByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpO1xuICAgIH1cblxuICAgIGxldCBkYXRlOiBEYXRlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGRhdGUgPSBuZXcgRGF0ZShkYXRlU3BlYyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ291bGQgbm90IHBhcnNlIGRhdGUgc3BlY2lmaWNhdGlvbiAnJHtkYXRlU3BlY30nYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGUudG9JU09TdHJpbmcoKTtcbiAgfVxufVxuIl19
