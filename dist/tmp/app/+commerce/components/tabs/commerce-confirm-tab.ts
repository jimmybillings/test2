import { Output, EventEmitter } from '@angular/core';
import { CartService } from '../../../shared/services/cart.service';
import { QuoteService } from '../../../shared/services/quote.service';
import { Tab } from './tab';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { ViewAddress } from '../../../shared/interfaces/user.interface';
import { CartState, QuoteState, PaymentOption, Project } from '../../../shared/interfaces/commerce.interface';
import { CommerceCapabilities } from '../../services/commerce.capabilities';
import { WzDialogService } from '../../../shared/modules/wz-dialog/services/wz.dialog.service';
import { Common } from '../../../shared/utilities/common.functions';
import { AppStore, CheckoutState } from '../../../app.store';

export class CommerceConfirmTab extends Tab {
  @Output() tabNotify: EventEmitter<Object> = this.notify;
  public storeSubscription: Subscription;
  public licensesAreAgreedTo: boolean = false;

  constructor(
    protected router: Router,
    public commerceService: CartService | QuoteService,
    protected dialogService: WzDialogService,
    public userCan: CommerceCapabilities,
    protected store: AppStore
  ) {
    super();
  }

  public get hasDiscount(): boolean {
    return !!this.commerceService.state.data.discount;
  }

  public get orderInProgress(): Observable<CheckoutState> {
    return this.store.select(state => state.checkout);
  }

  public get data(): Observable<any> {
    return this.commerceService.data.map((state: QuoteState | CartState) => state.data);
  }

  public get projects(): Observable<Project[]> {
    return this.commerceService.projects;
  }

  public get paymentType(): Observable<PaymentOption> {
    return this.store.select(state => state.checkout.selectedPaymentType);
  }

  public get purchaseOrderId(): Observable<string> {
    return this.store.select(state => state.checkout.purchaseOrderId);
  }

  public get showPurchaseBtn(): Observable<boolean> {
    return this.store.select(state => state.checkout.selectedPaymentType === 'CreditCard');
  }

  public get showPurchaseOnCreditBtn(): Observable<boolean> {
    return this.store.select(state => state.checkout.selectedPaymentType === 'PurchaseOnCredit');
  }

  public purchase(): void {
    this.commerceService.purchase().subscribe((orderId: Number) =>
      this.router.navigate(['/orders', orderId])
      , (error: any) => { });
  }

  public format(address: ViewAddress): string {
    if (address.address) {
      return Object.keys(address.address).reduce((previous: string, current: string) => {
        if (current === 'address' || current === 'zipcode' || current === 'phone') {
          previous += `${address.address[current]}<br>`;
        } else {
          previous += `${address.address[current]}, `;
        }
        return previous;
      }, '');
    } else {
      return `There is no address on record for this ${address.type}`;
    }
  }

  public lineOneFor(address: ViewAddress): string {
    return this.addressJoinSegment(address, 'address', 'address2');
  }

  public cityFor(address: ViewAddress): string {
    return this.addressSegmentWithComma(address, 'city');
  }

  public stateFor(address: ViewAddress): string {
    return this.addressSegment(address, 'state');
  }

  public zipcodeFor(address: ViewAddress): string {
    return this.addressSegmentWithComma(address, 'zipcode');
  }

  public countryFor(address: ViewAddress): string {
    return this.addressSegment(address, 'country');
  }

  public phoneFor(address: ViewAddress): string {
    return this.addressSegment(address, 'phone');
  }

  private addressSegment(address: ViewAddress, segment: string): string | null {
    return address.address && address.address[segment] ? address.address[segment] : null;
  }

  private addressSegmentWithComma(address: ViewAddress, segment: string): string {
    return this.addressSegment(address, segment) ? this.addressSegment(address, segment) + ',' : '';
  }

  private addressJoinSegment(address: ViewAddress, segmentOne: string, segmentTwo: string): string {
    return (address.address[segmentOne] ? address.address[segmentOne] : '') +
      (address.address[segmentTwo] ? ', ' + address.address[segmentTwo] : '');
  }
}
