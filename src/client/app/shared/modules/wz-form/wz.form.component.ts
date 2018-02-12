import { Component, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormModel } from './wz.form.model';
import { FormFields, ServerErrors } from '../../../shared/interfaces/forms.interface';
import { WzFormBase } from './wz.form-base';
/**
 * Home page component - renders the home page
 */
@Component({
  moduleId: module.id,
  selector: 'wz-form',
  templateUrl: 'wz.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzFormComponent extends WzFormBase {

  constructor(
    fb: FormBuilder,
    formModel: FormModel,
    element: ElementRef) {
    super(fb, formModel, element);
  }
}
