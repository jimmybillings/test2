import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Pojo } from '../../../../shared/interfaces/common.interface';
import { Component, ChangeDetectionStrategy, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { FormModel } from '../../../../shared/modules/wz-form/wz.form.model';
import { FormFields, ServerErrors } from '../../../../shared/interfaces/forms.interface';
import { WzFormBase } from '../../../../shared/modules/wz-form/wz.form-base';

@Component({
  moduleId: module.id,
  selector: 'wz-form-autocomplete-view',
  templateUrl: 'wz-form-autocomplete-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WzFormAutoCompleteViewComponent extends WzFormBase {
  public labels: BehaviorSubject<Pojo[]>;
  public propertiesToIgnore: string[] = [
    'name', 'id', 'email', 'invoiceContactId', 'salesOwner', 'paymentTermsDays', 'readonlyPaymentTermsDays'
  ];
  @Input() title: string;
  @Input() matchOnProperty: string;
  @Input()
  set displayProperties(properties: Pojo) {
    const tempLabels: { label: string, value: string }[] = Object.keys(properties || [])
      .filter((property: string) => !this.propertiesToIgnore.includes(property))
      .map((property: string) => {
        let label: string = property.replace(/([A-Z])/g, function (str) { return `_${str.toLowerCase()}`; });
        label = `QUOTE.EDIT.${label.toUpperCase()}_KEY`;
        return { label: label, value: properties[property] };
      });
    this.labels = new BehaviorSubject(tempLabels);
  }

  constructor(fb: FormBuilder, formModel: FormModel, element: ElementRef) {
    super(fb, formModel, element);
  }

  public onSelectSuggestion(suggestion: Pojo): void {
    this.formSubmit.emit(suggestion);
  }
}
