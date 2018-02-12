import { Observable } from 'rxjs/Observable';
import {
  PurchaseType,
  Project,
  SendDetails,
  quotesWithoutPricing
} from '../../../../../shared/interfaces/commerce.interface';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Capabilities } from '../../../../../shared/services/capabilities.service';
import { AppStore } from '../../../../../app.store';
import { Tab } from '../../../../components/tabs/tab';

@Component({
  moduleId: module.id,
  selector: 'quote-edit-confirm-tab-component',
  templateUrl: 'quote-edit-confirm-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuoteEditConfirmTabComponent extends Tab {
  @Input() projects: Project[];

  constructor(public userCan: Capabilities, private store: AppStore) {
    super();
  }

  public get sendDetails(): Observable<SendDetails> {
    return this.store.select(state => state.quoteEdit.sendDetails);
  }

  public sendQuote() {
    this.store.dispatch(factory => factory.quoteEdit.sendQuote());
  }

  public get discount(): Observable<number> {
    return this.store.select(state => state.quoteEdit.data.discount);
  }

  public get showDiscount(): boolean {
    return this.store.snapshot(state =>
      state.quoteEdit.data.discount > 0 && !quotesWithoutPricing.includes(state.quoteEdit.data.purchaseType)
    );
  }

  public get subTotal(): Observable<number> {
    return this.store.select(state => state.quoteEdit.data.subTotal);
  }

  public get total(): Observable<number> {
    return this.store.select(state => state.quoteEdit.data.total);
  }

  public get showTotal(): boolean {
    return this.store.snapshot(state =>
      state.quoteEdit.data.total > 0 && !quotesWithoutPricing.includes(state.quoteEdit.data.purchaseType)
    );
  }

  public get quoteType(): Observable<PurchaseType> {
    return this.store.select(state => state.quoteEdit.data.purchaseType);
  }

  public get quoteTypeTranslationKey(): Observable<string> {
    return this.quoteType.map(quoteType => `QUOTE.${quoteType}`);
  }
}
