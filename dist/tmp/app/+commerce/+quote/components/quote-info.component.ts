import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  SendDetails, SendDetailsBillingAccount, SendDetailsInvoiceContact, SendDetailsSalesManager, SendDetailsUser
} from '../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'quote-info-component',
  templateUrl: 'quote-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuoteInfoComponent {
  @Input() billingAccount: SendDetailsBillingAccount;
  @Input() invoiceContact: SendDetailsInvoiceContact;
  @Input() salesManager: SendDetailsSalesManager;
  @Input() user: SendDetailsUser;

  public get isExpired(): boolean {
    return new Date() > new Date(this.salesManager.expirationDate);
  }
}
