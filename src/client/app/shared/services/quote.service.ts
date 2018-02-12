import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { Api, ApiResponse } from '../interfaces/api.interface';
import { User } from '../interfaces/user.interface';
import { Observable } from 'rxjs/Observable';
import {
  Quote,
  Order,
  QuoteOptions,
  PaymentType,
  PurchaseOptions,
  PaymentOptions,
  PaymentOption,
  Project,
  LicenseAgreements,
  AssetLineItem
} from '../interfaces/commerce.interface';
import { AppStore, QuoteShowState, CheckoutState } from '../../app.store';
import { enhanceAsset } from '../interfaces/enhanced-asset';

@Injectable()
export class QuoteService {
  constructor(
    private api: ApiService,
    private cartService: CartService,
    private store: AppStore,
    private userService: UserService
  ) { }

  // Store Accessors

  public get data(): Observable<QuoteShowState> {
    return this.store.select(state => state.quoteShow);
  }

  public get state(): QuoteShowState {
    return this.store.snapshot(state => state.quoteShow);
  }

  public get quote(): Observable<Quote> {
    return this.store.select(state => state.quoteShow.data);
  }

  public get projects(): Observable<Project[]> {
    return this.quote.map((data: Quote) => {
      return data.projects.map((project: Project) => {
        if (project.lineItems) {
          project.lineItems = project.lineItems.map((lineItem: AssetLineItem) => {
            lineItem.asset = enhanceAsset(Object.assign(
              lineItem.asset, { uuid: lineItem.id }),
              'quoteShow', data.id
            );
            return lineItem;
          });
        }
        return project;
      });
    });
  }

  public get checkoutData(): Observable<CheckoutState> {
    return this.store.select(state => state.checkout);
  }

  public get checkoutState(): CheckoutState {
    return this.store.snapshot(state => state.checkout);
  }

  public get total(): Observable<number> {
    return this.data.map((state: QuoteShowState) => state.data.total);
  }

  public get paymentType(): Observable<PaymentOption> {
    return this.checkoutData.map((state: CheckoutState) => state.selectedPaymentType);
  }

  public get paymentOptions(): Observable<PaymentOptions> {
    return this.checkoutData.map((data: CheckoutState) => data.paymentOptions);
  }

  public get hasAssets(): Observable<boolean> {
    return this.data.map((state: QuoteShowState) => (state.data.itemCount || 0) > 0);
  }

  public get hasAssetLineItems(): Observable<boolean> {
    return this.data.map((state: QuoteShowState) => {
      return state.data.projects.reduce((previous: number, current: Project) => {
        return current.lineItems ? previous += current.lineItems.length : 0;
      }, 0) > 0;
    });
  }

  // Public Interface
  public purchase(): Observable<number> {
    switch (this.checkoutState.selectedPaymentType) {
      case 'CreditCard':
        return this.purchaseWithCreditCard();
      case 'PurchaseOnCredit':
        return this.purchaseOnCredit();
      default:
        return this.purchaseQuoteType();
    }
  }

  public getPaymentOptions() {
    this.api.get(Api.Orders, `quote/paymentOptions/${this.state.data.id}`)
      .subscribe((options: PaymentOptions) => {
        this.store.dispatch(factory => factory.checkout.setAvailablePaymentOptions(options));
        this.store.dispatch(factory => factory.checkout.setSelectedPaymentType(this.defaultPaymentTypeFor(options)));
      });
  }

  public paymentOptionsEqual(options: Array<PaymentOption>): Observable<boolean> {
    return this.paymentOptions.map((pmtOpts: PaymentOptions) => {
      if (!pmtOpts) return false;
      pmtOpts.paymentOptions.sort();
      return options.length === pmtOpts.paymentOptions.length &&
        options.sort().every((option: PaymentOption, index: number) => option === pmtOpts.paymentOptions[index]);
    });
  }

  public retrieveLicenseAgreements(): Observable<LicenseAgreements> {
    return this.api.get(Api.Orders, `quote/licensing/${this.state.data.id}`, { loadingIndicator: true });
  }

  public expireQuote(): Observable<Quote> {
    let newQuote: Quote = Object.assign({}, this.state.data, { expirationDate: new Date().toISOString() });
    return this.update(this.state.data.id, newQuote);
  }

  public rejectQuote(): Observable<Quote> {
    return this.api.put(Api.Orders, `quote/reject/${this.state.data.id}`, { loadingIndicator: true });
  }

  public extendExpirationDate(newDate: string): Observable<Quote> {
    const newQuote: Quote = Object.assign(
      {},
      this.state.data,
      { expirationDate: new Date(newDate).toISOString(), quoteStatus: 'ACTIVE' }
    );

    return this.update(this.state.data.id, newQuote)
      .do(quote => this.store.dispatch(factory => factory.quoteShow.loadSuccess(quote)));
  }

  // Private Methods
  private defaultPaymentTypeFor(options: PaymentOptions): PaymentOption {
    if (options.paymentOptions.length === 1) {
      return options.paymentOptions[0];
    }
    return 'CreditCard';
  }

  private update(id: number, quote: Quote): Observable<Quote> {
    return this.api.put(Api.Orders, `quote/${id}`, { body: quote, loadingIndicator: 'onBeforeRequest' });
  }

  private purchaseWithCreditCard(): Observable<number> {
    const options: PurchaseOptions = this.purchaseOptions;
    return this.api.post(
      Api.Orders,
      `quote/${this.state.data.id}/stripe/process`,
      { body: { options }, loadingIndicator: true }
    ).map(_ => _ as number);
  }

  private purchaseOnCredit(): Observable<number> {
    const options: PurchaseOptions = this.addressPurchaseOptions;
    return this.api.post(
      Api.Orders,
      `quote/${this.state.data.id}/checkout/convertToOrder`,
      { body: { options }, loadingIndicator: true }
    ).map((order: Order) => order.id);
  }

  private purchaseQuoteType(): Observable<number> {
    const options: PurchaseOptions = Object.assign(
      {}, { orderType: this.state.data.purchaseType },
      this.addressPurchaseOptions
    );
    return this.api.post(
      Api.Orders,
      `quote/${this.state.data.id}/checkout/convertToOrder`,
      { body: { options }, loadingIndicator: true }
    ).map((order: Order) => order.id);
  }

  private get purchaseOptions(): PurchaseOptions {
    return Object.assign({}, this.addressPurchaseOptions, this.creditCardPurchaseOptions) as PurchaseOptions;
  }

  private get addressPurchaseOptions(): PurchaseOptions {
    return {
      orderAddressId: this.checkoutState.selectedAddress.addressEntityId,
      orderAddressType: this.checkoutState.selectedAddress.type,
      poNumber: this.checkoutState.purchaseOrderId
    };
  }

  private get creditCardPurchaseOptions(): PurchaseOptions {
    return {
      stripeToken: this.checkoutState.authorization.id,
      stripeTokenType: this.checkoutState.authorization.type
    };
  }
}
