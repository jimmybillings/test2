import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { StateMapper, AppStore } from '../../../app.store';
import { FormFields } from '../../../shared/interfaces/forms.interface';
import { Pojo } from '../../../shared/interfaces/common.interface';

@Component({
  moduleId: module.id,
  selector: 'purchase-order-input-component',
  template: `
    <wz-form
      [includeSubmit]="false"
      [includeCancel]="false"
      [items]="PurchaseOrderFormConfig"
      (blur)="onBlur($event)">
    </wz-form>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PurchaseOrderInputComponent implements OnInit {
  public PurchaseOrderFormConfig: Array<FormFields>;

  constructor(private store: AppStore) { }

  public ngOnInit(): void {
    this.PurchaseOrderFormConfig = this.store.snapshotCloned(state => state.uiConfig.components.cart.config.addPurchaseOrderId.items);
  }
  public onBlur(form: Pojo): void {
    this.store.dispatch(factory => factory.checkout.setPurchaseOrderId(form.purchaseOrderId));
  }
}
