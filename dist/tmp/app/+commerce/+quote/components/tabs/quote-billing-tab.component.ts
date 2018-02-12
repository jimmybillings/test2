import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommerceBillingTab } from '../../../components/tabs/commerce-billing-tab';
import { QuoteService } from '../../../../shared/services/quote.service';
import { CommerceCapabilities } from '../../../services/commerce.capabilities';
import { UserService } from '../../../../shared/services/user.service';
import { CurrentUserService } from '../../../../shared/services/current-user.service';
import { WzDialogService } from '../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { AppStore } from '../../../../app.store';
import { ViewAddress } from '../../../../shared/interfaces/user.interface';
import { Common } from '../../../../shared/utilities/common.functions';
import { Quote } from '../../../../shared/interfaces/commerce.interface';

@Component({
  moduleId: module.id,
  selector: 'quote-billing-tab',
  templateUrl: '../../../components/tabs/commerce-billing-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuoteBillingTabComponent extends CommerceBillingTab implements OnInit {
  constructor(
    public userCan: CommerceCapabilities,
    protected quoteService: QuoteService,
    protected user: UserService,
    protected currentUser: CurrentUserService,
    protected dialog: WzDialogService,
    protected store: AppStore
  ) {
    super(userCan, quoteService, user, currentUser, dialog, store);
  }

  ngOnInit() {
    const quote: Quote = this.store.snapshot(state => state.quoteShow.data);

    this.quoteBillingAccountInfo = this.store.select(state => state.quoteShow.data.billingAccountData);
    this.quoteInvoiceContactInfo = this.store.select(state => state.quoteShow.data.invoiceContact);
    this.orderInProgress = this.store.select(state => state.checkout);
    if (!quote.billingAccountId || !quote.invoiceContact) {
      this.fetchAddresses().subscribe();
    }
  }
}
