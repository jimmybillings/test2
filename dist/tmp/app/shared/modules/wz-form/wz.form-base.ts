import { Input, Output, EventEmitter, OnInit, OnChanges, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, FormGroupDirective } from '@angular/forms';
import { MatTextareaAutosize } from '@angular/material';
import { FormModel } from './wz.form.model';
import { FormFields, ServerErrors } from '../../../shared/interfaces/forms.interface';

export class WzFormBase implements OnInit, OnChanges {
  @Input() items: FormFields[];
  @Input() serverErrors: ServerErrors;
  @Input() submitLabel: string = 'Submit';
  @Input() includeCancel: boolean = false;
  @Input() includeSubmit: boolean = true;
  @Input() cancelLabel: string = 'Cancel';
  @Input() autocomplete: string = 'on';
  @Output() formSubmit = new EventEmitter();
  @Output() formCancel = new EventEmitter();
  @Output() onAction = new EventEmitter();
  @Output() blur = new EventEmitter();
  @Output() keyUp = new EventEmitter();
  @Output() valueChange = new EventEmitter();
  public submitAttempt: boolean = false;
  public showRequiredLegend: boolean = false;
  public form: FormGroup;
  @ViewChild(MatTextareaAutosize) private autosize: MatTextareaAutosize;
  @ViewChild(FormGroupDirective) private internalForm: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private formModel: FormModel,
    private element: ElementRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.serverErrors && this.form) this.mergeErrors();
    if (changes.items && this.form) this.mergeNewValues();
  }

  ngOnInit() {
    this.form = this.fb.group(this.formModel.create(this.items));
  }

  public mergeErrors(): void {
    this.serverErrors.fieldErrors.forEach((error) => {
      for (let control in this.form.controls) {
        if (control.toLowerCase() === error.field.toLowerCase()) {
          (<FormControl>this.form.controls[control]).setErrors({ serverError: error.code });
        }
      }
    });
  }

  public mergeNewValues(formFields: Array<FormFields> = this.items): void {
    formFields.forEach((field: any) => {
      for (let control in this.form.controls) {
        if (control === field.name) {
          (<FormControl>this.form.controls[control]).patchValue(field.value, { emitEvent: false });
        }
      }
      if (this.autosize) this.autosize.resizeToFitContent();
    });
  }

  public disableForm(): void {
    this.items.forEach((field: any) => {
      for (let control in this.form.controls) {
        if (control === field.name) {
          (<FormControl>this.form.controls[control]).disable();
        }
      }
    });
  }

  public getValueForField(field: string): string {
    let fieldValue: string;
    for (let control in this.form.controls) {
      if (control === field) {
        fieldValue = (<FormControl>this.form.controls[control]).value;
      }
    }
    return (fieldValue) ? fieldValue : '';
  }

  public setValueForField(field: string, value: string): void {
    (<FormControl>this.form.controls[field]).patchValue(value, { emitEvent: false });
  }

  public activateForm(): void {
    this.items.forEach((field: any) => {
      for (let control in this.form.controls) {
        if (control === field.name) {
          (<FormControl>this.form.controls[control]).enable();
        }
      }
    });
  }

  public markFieldsAsDirty(): void {
    for (let control in this.form.controls) {
      (<FormControl>this.form.controls[control]).markAsDirty();
    }
  }

  public markFieldsAsTouched(): void {
    for (let control in this.form.controls) {
      (<FormControl>this.form.controls[control]).markAsTouched();
    }
  }

  public parseOptions(options: any): any[] {
    return options.split(',');
  }

  public onSelectChange(event: any, field: FormFields): void {
    if (field.options && field.slaveFieldName && field.slaveFieldValues) {
      const selectedIndex: number = field.options.split(',').indexOf(event.value);

      this.update(field.slaveFieldName, field.slaveFieldValues[selectedIndex]);
    }
  }

  public radioSelect(fieldName: string, option: any): void {
    this.update(fieldName, option);
  }

  public updateDateValueFor(fieldName: string, dateString: string): void {
    this.update(fieldName, this.calculateDateFor(dateString));
  }

  /**
   * simple check if a given field has a required validation rule or not
   * @param field is a form field control.
   */
  public isRequiredField(field: FormFields): boolean {
    return 'validation' in field && (
      field.validation === 'REQUIRED' ||
      field.validation === 'EMAIL' ||
      field.validation === 'MULTIEMAIL' ||
      field.validation === 'PASSWORD' ||
      field.validation === 'TERMS' ||
      field.validation === 'GREATER_THAN' ||
      field.validation === 'LESS_THAN' ||
      field.validation === 'BETWEEN' ||
      field.validation === 'COLLECTION'
    ) ? true : false;
  }

  public hasErrorType(field: FormControl | AbstractControl): boolean {
    return (!field.valid && field.pristine && this.submitAttempt) ||
      (!field.valid && !field.pristine && this.submitAttempt) ||
      (!field.valid && !field.pristine && !this.submitAttempt);
  }

  /**
   * boolean flag used in the ui to draw '*indicates required field'
   * we filter through the form fields checking validation. It's true when at least 1 field is required
   * @param formFields is an array of form fields.
   */
  public hasRequiredFields(formFields: FormFields[]): boolean {
    let req = formFields.filter(this.isRequiredField);
    return req.length > 0 ? true : false;
  }

  public onSubmit(): void {
    this.submitAttempt = true;
    this.markFieldsAsDirty();
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
    }
  }

  public resetForm(): void {
    this.internalForm.resetForm();
    if (this.autosize) this.autosize.resizeToFitContent();
    this.submitAttempt = false;
  }

  public onDollarsInput(event: any): void {
    const target: any = event.target;
    const cleaner: DollarsInputCleaner = new DollarsInputCleaner(target.value, target.selectionStart);

    cleaner.clean();
    target.value = cleaner.inputValue;
    target.selectionStart = target.selectionEnd = cleaner.cursorPosition;
  }

  public calculateDateFor(dateSpec: string): string {
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

  public shouldShowRequiredError(field: FormFields): boolean {
    const control: AbstractControl = this.form.controls[field.name];
    return control.hasError('required') || (control.errors.pattern && control.errors.pattern.requiredPattern === String(/\S/));
  }

  public shouldShowEmailError(field: FormFields): boolean {
    return this.form.controls[field.name].hasError('pattern') && field.validation === 'EMAIL';
  }

  public shouldShowLessThanError(field: FormFields): boolean {
    return this.form.controls[field.name].hasError('tooHigh');
  }

  public shouldShowGreaterThanError(field: FormFields): boolean {
    return this.form.controls[field.name].hasError('tooLow');
  }

  public onBlur(): void {
    this.blur.emit(this.form.value);
  }

  public onKeyUp(): void {
    this.keyUp.emit(this.form.value);
  }

  public onChange(): void {
    this.valueChange.emit(this.form.value);
  }

  public showDefaultInputFor(field: FormFields): boolean {
    return ['text', 'password', 'email', 'date'].includes(field.type);
  }

  public get showSubmitAndCancel(): boolean {
    return this.includeCancel && this.includeSubmit;
  }

  public get showSubmit(): boolean {
    return this.includeSubmit && !this.includeCancel;
  }

  public updateValidatorsFor(field: FormFields): void {
    const control: AbstractControl = this.controlFrom(field);

    this.formModel.updateValidatorsFor(control, field);
  }

  private controlFrom(field: FormFields): AbstractControl {
    let control: AbstractControl;
    for (let controlName in this.form.controls) {
      if (controlName === field.name) {
        control = this.form.controls[controlName];
        break;
      }
    }
    return control;
  }

  private dateToString(date: Date): string {
    return date.toISOString().slice(0, 10).replace(/-/g, '/');
  }

  private update(fieldName: string, value: any) {
    (<FormControl>this.form.controls[fieldName]).setValue(value);
  }
}

// Used internally only.
class DollarsInputCleaner {
  constructor(public inputValue: string, public cursorPosition: number) { }

  public clean(): void {
    this.removeNonDollarCharacters();
    this.removeLeadingZeros();
    this.removeExcessDecimalPoints();
    this.removeExcessPostDecimalDigits();
  }

  //// Main cleaner methods

  private removeNonDollarCharacters(): void {
    this.modifyInputValueWith(string => string.replace(/[^\d\.]/g, ''));
  }

  private removeLeadingZeros(): void {
    this.modifyInputValueWith(string => string.replace(/^0*(\d.*)/, '$1'));
  }

  private removeExcessDecimalPoints(): void {
    // Remove all decimal points left of the cursorPosition until we hit the left edge or
    // we are down to one decimal point, whichever comes first.  This lets us remove a newly
    // inserted second decimal point if another one already existed somewhere to the right of
    // the cursor.  If we just always kept the leftmost decimal point, then we might "move" the
    // original decimal point, which is confusing for the user.
    this.modifyInputValueWith(string => this.removeExcessDecimalPointsLeftOf(this.cursorPosition, string));

    // If there are still two or more decimal points, then they are to the right of the cursorPosition.
    // There doesn't seem to be a way that could happen in real life with a text input, but we'll cover
    // the edge case (just in case) by deleting excess decimal points starting from the right edge of the string.
    this.modifyInputValueWith(string => this.removeExcessDecimalPointsLeftOf(string.length, string), false);
  }

  private removeExcessPostDecimalDigits(): void {
    this.modifyInputValueWith(string => string.replace(/^(.*\.\d\d).*$/, '$1'), false);
    this.cursorPosition = Math.min(this.cursorPosition, this.inputValue.length);
  }

  //// Utility methods

  private modifyInputValueWith(pureModifier: ((string: string) => string), recalculateCursorPosition: boolean = true): void {
    const lengthBeforeModification: number = this.inputValue.length;

    this.inputValue = pureModifier(this.inputValue);
    if (recalculateCursorPosition) this.cursorPosition -= (lengthBeforeModification - this.inputValue.length);
  }

  private removeExcessDecimalPointsLeftOf(position: number, string: string): string {
    let numberOfDecimalPoints: number = string.split('.').length - 1;
    let result: string = string;

    for (let i = position; i >= 0 && numberOfDecimalPoints > 1; i -= 1) {
      if (result.charAt(i) === '.') {
        result = this.removeCharacterAt(i, result);
        numberOfDecimalPoints -= 1;
      }
    }

    return result;
  }

  private removeCharacterAt(index: number, string: string): string {
    return string.substr(0, index) + string.substr(index + 1);
  }
}
