import { Component, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormModel } from './wz.form.model';
import { FormFields, ServerErrors } from '../../../shared/interfaces/forms.interface';
import { WzFormBase } from './wz.form-base';
/**
 * Home page component - renders the home page
 */
@Component({
  moduleId: module.id,
  selector: 'wz-cc-form',
  templateUrl: 'wz.cc.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WzCcFormComponent extends WzFormBase {
  public allowEdit: boolean = false;
  @Input()
  set successfullyVerified(formSent: boolean) {
    if (formSent) {
      this.allowEdit = true;
      if (this.form) this.disableForm();
    } else {
      this.allowEdit = false;
      if (this.form) this.activateForm();
    }
  }

  @Output() onEdit: any = new EventEmitter();

  constructor(
    fb: FormBuilder,
    formModel: FormModel,
    element: ElementRef) {
    super(fb, formModel, element);
  }

  public editCard() {
    this.onEdit.emit();
  }
}
