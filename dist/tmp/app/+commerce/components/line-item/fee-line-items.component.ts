import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { FeeLineItem } from '../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'fee-line-items-component',
  templateUrl: './fee-line-items.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeeLineItemsComponent {
  @Input() feeLineItems: FeeLineItem[];
  @Input() readOnly: boolean = false;
  @Output() feeLineItemsNotify: EventEmitter<Object> = new EventEmitter<Object>();

  public onRemove(feeLineItem: FeeLineItem): void {
    this.feeLineItemsNotify.emit({ type: 'REMOVE_QUOTE_FEE', payload: feeLineItem });
  }
}
