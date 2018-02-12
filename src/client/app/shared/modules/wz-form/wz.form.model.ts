import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FormFields } from '../../interfaces/forms.interface';
import { ValidatorFn, ValidationErrors } from '@angular/forms/src/directives/validators';

/**
 * Service that creates a dynamic model to drive a form.
 */
@Injectable()
export class FormModel {

  create(form: FormFields[]): FormGroup {
    let newForm: any = {};
    form.forEach((field: FormFields) => {
      if (field.type === 'wzdate') {
        newForm[field.name] = [field.value || this.calculateDateFor(field.default)];
      } else {
        newForm[field.name] = [field.value];
      }
      newForm[field.name].push(this._getValidator(field));
    });
    return newForm;
  }

  public updateForm(form: FormGroup, values: any): void {
    for (let controlName in form.controls) {
      if (values.hasOwnProperty(controlName))
        (<FormControl>form.controls[controlName]).setValue(values[controlName]);
      (<FormControl>form.controls[controlName]).setValue('');
    }
  }

  public markFormAsUntouched(form: FormGroup): void {
    form.markAsUntouched();
    form.markAsPristine();
    for (var controlName in form.controls) {
      (<FormControl>form.controls[controlName]).markAsUntouched();
      (<FormControl>form.controls[controlName]).markAsPristine();
    }
  }

  public updateValidatorsFor(control: AbstractControl, field: FormFields): void {
    control.clearValidators();
    control.setValidators(this._getValidator(field));
  }

  private _getValidator(field: FormFields): ValidatorFn {
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
  }

  private _getOptionalValidator(): ValidationErrors {
    return Validators.nullValidator;
  }

  private _getRequiredValidator(): ValidatorFn {
    return Validators.compose([
      Validators.required,
      Validators.pattern(/\S/)
    ]);
  }

  private _getEmailValidator(): ValidatorFn {
    return Validators.compose([
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('[a-zA-Z0-9!#$%&`*+\/=?^_`{|}~.-]+@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?' +
        '(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9]){1,}?)*')
    ]);
  }

  private _getMultiEmailValidator(): ValidatorFn {
    return Validators.compose([
      Validators.required,
      Validators.pattern(
        '\\s*(([a-z0-9!#$%&`*+\/=?^_`{|}~.-]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)' +
        '|(([a-zA-Z0-9\\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)(\\s*(;|,)\\s*|\\s*$))*')
    ]);
  }

  private _getPasswordValidator(): ValidatorFn {
    return Validators.compose([
      Validators.required,
      Validators.minLength(8)
    ]);
  }

  private _getCollectionValidator(): ValidatorFn {
    return Validators.compose([Validators.required]);
  }

  private _getTermsValidator(): ValidatorFn {
    return this.checkboxRequired;
  }

  private _getGreaterThanValidator(testValue: string): ValidatorFn {
    return (control: FormControl) => (parseFloat(control.value) < parseFloat(testValue)) ? { tooLow: 'number too low' } : null;
  }

  private _getLessThanValidator(testValue: string): ValidatorFn {
    return Validators.compose([
      (control: FormControl) => (parseFloat(control.value) > parseFloat(testValue)) ? { tooHigh: 'number too high' } : null,
      Validators.required
    ]);
  }

  private _getBetweenValidator(min: string, max: string): ValidatorFn {
    return Validators.compose([
      this._getGreaterThanValidator(min),
      this._getLessThanValidator(max)
    ]);
  }

  private _getMinLengthValidator(length: string): ValidatorFn {
    return Validators.minLength(parseInt(length));
  }

  private _getMaxLengthValidator(length: string): ValidatorFn {
    return Validators.maxLength(parseInt(length));
  }

  private checkboxRequired(control: FormGroup): ValidatorFn {
    return (control: FormControl) => control.value ? null : { mustBeCheckedError: 'Must be Checked' };
  }

  private calculateDateFor(dateSpec: string): string {
    if (!dateSpec) return null;

    const upperDateSpec = dateSpec.toUpperCase().replace(/ /g, '');

    if (upperDateSpec === 'TODAY') return new Date().toISOString();

    if (upperDateSpec.match(/^TODAY[+-][0-9]+$/)) {
      const numberOfDaysToAdd: number = parseInt(upperDateSpec.replace('TODAY', ''));
      const date: Date = new Date();
      date.setDate(date.getDate() + numberOfDaysToAdd);

      return date.toISOString();
    }

    let date: Date;

    try {
      date = new Date(dateSpec);
    } catch (error) {
      throw new Error(`Could not parse date specification '${dateSpec}'`);
    }

    return date.toISOString();
  }
}
