import { Component, Inject, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CommercePaymentTab } from '../../../components/tabs/commerce-payment-tab';
import { QuoteService } from '../../../../shared/services/quote.service';
import { QuoteState, PaymentOptions } from '../../../../shared/interfaces/commerce.interface';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'quote-payment-tab',
  templateUrl: 'quote-payment-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuotePaymentTabComponent extends CommercePaymentTab {
  constructor(
    protected _zone: NgZone,
    protected quoteService: QuoteService,
    protected store: AppStore,
    protected ref: ChangeDetectorRef
  ) {
    super(_zone, quoteService, store, ref);
  }

  public get showTrialMessage(): Observable<boolean> {
    return this.quoteService.paymentOptionsEqual(['Trial']);
  }

  public get showDeliveryOnlyMessage(): Observable<boolean> {
    return this.quoteService.paymentOptionsEqual(['DeliveryOnly']);
  }
}
