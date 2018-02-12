import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatSelectChange } from '@angular/material';
import { MdSelectOption } from '../../../shared/interfaces/forms.interface';
import { PurchaseType } from '../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'quote-purchase-type-component',
  template: `
    <mat-form-field class="quote-purchase-types">  
      <mat-select 
      (change)="onSelectChange($event)" 
      [(ngModel)]="selectedType" 
      placeholder="{{ 'QUOTE.PURCHASE_TYPE_SELECT' | translate }}">
      <mat-option
      *ngFor="let type of types"
      [value]="type.value">{{ type.viewValue }}
      </mat-option>
      </mat-select>
    </mat-form-field>  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `mat-form-field { width: 200px; padding: 20px 5px 0 5px;}`,
    `:host { margin-bottom: -48px; min-width: 284px; }`
  ]
})
export class QuotePurchaseTypeComponent {
  public types: MdSelectOption[];
  @Output() selectQuoteType: EventEmitter<{ purchaseType: PurchaseType }> = new EventEmitter();
  @Input() selectedType: string = null;
  @Input()
  public set quoteTypes(types: MdSelectOption[]) {
    this.types = types;
    if (!this.selectedType) this.selectedType = this.types[0].value;
  }

  public onSelectChange(event: MatSelectChange): void {
    this.selectQuoteType.emit({ purchaseType: event.value });
  }
}
