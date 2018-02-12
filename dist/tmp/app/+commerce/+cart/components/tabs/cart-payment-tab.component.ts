import { Component, Inject, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommercePaymentTab } from '../../../components/tabs/commerce-payment-tab';
import { CartService } from '../../../../shared/services/cart.service';
import { AppStore } from '../../../../app.store';

@Component({
  moduleId: module.id,
  selector: 'cart-payment-tab-component',
  templateUrl: 'cart-payment-tab.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CartPaymentTabComponent extends CommercePaymentTab {
  constructor(
    protected _zone: NgZone,
    protected cartService: CartService,
    protected store: AppStore,
    protected ref: ChangeDetectorRef
  ) {
    super(_zone, cartService, store, ref);
  }
}
