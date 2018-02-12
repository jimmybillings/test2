import { Component, Inject, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommerceBillingTab } from '../../../components/tabs/commerce-billing-tab';
import { CartService } from '../../../../shared/services/cart.service';
import { UserService } from '../../../../shared/services/user.service';
import { CurrentUserService } from '../../../../shared/services/current-user.service';
import { CommerceCapabilities } from '../../../services/commerce.capabilities';
import { WzDialogService } from '../../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'cart-billing-tab-component',
  templateUrl: '../../../components/tabs/commerce-billing-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CartBillingTabComponent extends CommerceBillingTab implements OnInit {
  constructor(
    public userCan: CommerceCapabilities,
    protected cartService: CartService,
    protected user: UserService,
    protected currentUser: CurrentUserService,
    protected dialog: WzDialogService,
    protected store: AppStore
  ) {
    super(userCan, cartService, user, currentUser, dialog, store);
  }

  ngOnInit() {
    this.quoteBillingAccountInfo = null;
    this.quoteInvoiceContactInfo = null;
    this.fetchAddresses().subscribe();
    this.orderInProgress = this.store.select(state => state.checkout);
  }
}
